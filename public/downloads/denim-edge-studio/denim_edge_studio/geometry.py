"""Lightweight cotton ends, broken edge yarns and sparse pulled denim threads.

No hair particles, modifiers, alpha planes or dependencies on Fringe Studio.
Lengths and thickness are measured in metres, in world space.
"""
import math
import random
import bpy
from mathutils import Vector
from . import paths


class Buffers:
    def __init__(self, quality):
        self.quality = quality
        self.verts, self.faces, self.uvs, self.materials, self.normals = [], [], [], [], []

    def face(self, vertices, uv, material, normals):
        self.faces.append(vertices)
        self.uvs.extend(uv)
        self.materials.append(material)
        self.normals.extend(normals)

    def yarn(self, points, diameter, surface_normal, material=0, taper=True):
        if len(points) < 2:
            return
        base = len(self.verts)
        sides = 3 if self.quality == 'LITE' else 2
        distances, tangents, side_vectors, radials = [0.0], [], [], []
        for i, point in enumerate(points):
            t = points[min(i+1, len(points)-1)] - points[max(0, i-1)]
            if t.length < 1e-12:
                raise ValueError('The thread is too short. Increase the edge size.')
            t.normalize()
            if i:
                side = tangents[-1].rotation_difference(t) @ side_vectors[-1]
                side = side - t * side.dot(t)
            else:
                side = surface_normal.cross(t)
            if side.length < 1e-8:
                axis = Vector((1, 0, 0)) if abs(t.x) < .8 else Vector((0, 1, 0))
                side = axis - t * axis.dot(t)
            side.normalize()
            tangents.append(t)
            side_vectors.append(side)
            other = t.cross(side).normalized()
            if i:
                distances.append(distances[-1] + (point-points[i-1]).length)
            f = i / (len(points)-1)
            radius = diameter * .5 * (1 - .68 * f**3 if taper else 1)
            ring = []
            for j in range(sides):
                radial = (side * math.cos(2*math.pi*j/sides) + other * math.sin(2*math.pi*j/sides)) if sides == 3 else side * (1 if j == 0 else -1)
                self.verts.append(tuple(point + radial * radius))
                ring.append(radial if sides == 3 else other)
            radials.append(ring)
        for i in range(len(points)-1):
            v0, v1 = distances[i] / .002, distances[i+1] / .002
            for j in range(3 if sides == 3 else 1):
                k = (j+1) % sides
                self.face((base+i*sides+j, base+i*sides+k, base+(i+1)*sides+k, base+(i+1)*sides+j),
                          ((j/sides, v0), ((j+1)/sides, v0), ((j+1)/sides, v1), (j/sides, v1)),
                          material, (radials[i][j], radials[i][k], radials[i+1][k], radials[i+1][j]))
        if sides == 3:
            self.face((base+2, base+1, base), ((0,0),(1,0),(.5,1)), material, (-tangents[0],)*3)
            end = base + (len(points)-1)*3
            self.face((end, end+1, end+2), ((0,0),(1,0),(.5,1)), material, (tangents[-1],)*3)

    def mesh(self):
        mesh = bpy.data.meshes.new('Denim_Edge_Mesh')
        try:
            mesh.from_pydata(self.verts, [], self.faces)
            mesh.update()
            uv = mesh.uv_layers.new(name='CottonUV')
            for loop, coord in zip(uv.data, self.uvs):
                loop.uv = coord
            for face, material in zip(mesh.polygons, self.materials):
                face.material_index = material
                face.use_smooth = True
            if hasattr(mesh, 'use_auto_smooth'):
                mesh.use_auto_smooth = True
                mesh.auto_smooth_angle = math.pi
            mesh.normals_split_custom_set(self.normals)
            return mesh
        except Exception:
            bpy.data.meshes.remove(mesh)
            raise


def build(source, p):
    arcs = paths.curves(source, p.spacing)
    lookup = paths.normal_lookup(p.surface_object, p.plane)
    counts = [(max(1, math.ceil(a.length/p.spacing)), round(a.length/.1*p.long_density),
               max(1, math.ceil(a.length/.0012)) if p.edge_yarns else 0) for a in arcs]
    # Conservative upper bound, checked before allocating geometry.
    weights = (20, 110, 8) if p.quality == 'LITE' else (6, 36, 2)
    estimate = sum(sum(n*w for n,w in zip(c, weights)) for c in counts)
    if estimate > p.max_triangles:
        raise ValueError(f'Estimated maximum: {estimate:,} triangles (limit: {p.max_triangles:,}). Increase spacing, reduce long threads, or use Minimal Flat.')
    rng = random.Random(p.seed)
    buf = Buffers(p.quality)
    stats = dict(short_threads=0, long_threads=0, loops=0, edge_segments=0,
                 edge_length_mm=round(sum(a.length for a in arcs)*1000, 3), quality=p.quality)

    def f(arc, d):
        return paths.frame(arc, d, lookup, p.flip_side)

    def material():
        return 1 if rng.random() < p.blue_fraction else 0

    for arc, (short_count, long_count, edge_count) in zip(arcs, counts):
        step = arc.length / short_count
        # Dense, very short broken warp/weft ends; no uniform fringe curtain.
        for i in range(short_count):
            d = (i + .5 + rng.uniform(-.35,.35)*p.irregularity)*step
            root, tangent, outward, normal = f(arc,d)
            l = p.short_length * (1 + p.irregularity*rng.uniform(-.85,.8))
            cluster = .75 + .25*math.sin(d/.006 + p.seed)
            l *= 1 - p.irregularity*(1-cluster)
            angle = rng.uniform(-1,1)*p.scatter
            bend = rng.uniform(-1,1)*p.scatter
            phase = rng.uniform(0,math.tau)
            root += outward*(p.offset - min(.00035, l*.22)) + normal*p.lift
            points = []
            for j in range(4):
                t = j/3
                points.append(root + outward*l*t + tangent*l*(angle*t + .22*bend*math.sin(math.pi*t))
                              + normal*p.loft*t*(.35+.65*math.sin(math.pi*t+phase)))
            buf.yarn(points, p.diameter*rng.uniform(.65,1.1), normal, material())
            stats['short_threads'] += 1
        # A broken fine yarn lying along the actual edge ties the short fibres together.
        if edge_count:
            edge_step = arc.length/edge_count
            for i in range(edge_count):
                if rng.random() < .16:
                    continue
                points = []
                for d in (i*edge_step, (i+.96)*edge_step):
                    root, _, outward, normal = f(arc,d)
                    points.append(root + outward*(p.offset + .00011*math.sin(d/.0017)) + normal*(p.lift+.00003))
                buf.yarn(points,p.diameter*.78,normal,material(),taper=False)
                stats['edge_segments'] += 1
        # Sparse pulled yarns: either a loose free end or a bowed two-root loop.
        # Uniform random roots naturally leave both clusters and quiet areas.
        for d in sorted(rng.uniform(0,arc.length) for _ in range(long_count)):
            root, tangent, outward, normal = f(arc,d)
            l = p.long_length*rng.uniform(.4,1.0)
            is_loop = rng.random() < p.loop_fraction and arc.length > l*.25
            phase, sign = rng.uniform(-math.pi,math.pi), rng.choice((-1,1))
            points = []
            if is_loop:
                span = min(arc.length*.35, l*rng.uniform(.24,.45))
                start = d if arc.cyclic else min(max(d-span*.5,0),arc.length-span)
                a, _, out_a, n_a = f(arc,start)
                b, _, out_b, n_b = f(arc,start+span)
                chord = (b-a).normalized()
                if chord.length < 1e-8:
                    chord = tangent.copy()
                bow_scale = rng.uniform(.26,.39)
                for j in range(19):
                    t = j/18
                    local_n = n_a.lerp(n_b,t).normalized()
                    local_out = local_n.cross(chord).normalized()
                    if p.flip_side:
                        local_out.negate()
                    # Use the smooth chord: tiny jaggedness of the cut must not kink a hanging loop.
                    point = (a+out_a*p.offset+n_a*p.lift).lerp(b+out_b*p.offset+n_b*p.lift,t)
                    # Rounded, irregular loop with both roots on the line.
                    bow = math.sin(math.pi*t)
                    bulge = l*bow_scale*bow*(1+.18*p.curl*math.sin(math.tau*t+phase))
                    point += local_out*bulge + chord*(l*.07*p.curl*math.sin(math.tau*t)*bow)
                    point += local_n*(p.loft*2*bow)
                    points.append(point)
                stats['loops'] += 1
                buf.yarn(points,p.diameter*rng.uniform(.8,1.2),normal,material(),taper=False)
            else:
                # Integrating heading makes curled yarns have a controlled contour length.
                point = root + outward*(p.offset-.0002) + normal*p.lift
                points.append(point.copy())
                turn = rng.uniform(.15,1.15)
                heading = rng.uniform(-.5,.5)*p.curl
                for j in range(1,19):
                    t = (j-.5)/18
                    theta = heading + sign*(p.curl*turn*math.tau*t**1.25) + .45*math.sin(3*math.pi*t+phase)*p.curl*t
                    delta = (outward*math.cos(theta)+tangent*math.sin(theta))*(l/18)
                    delta += normal*(p.loft/18*math.sin(math.tau*t+phase))
                    point += delta
                    points.append(point.copy())
                buf.yarn(points,p.diameter*rng.uniform(.8,1.2),normal,material())
            stats['long_threads'] += 1
    mesh = buf.mesh()
    mesh.calc_loop_triangles()
    stats.update(vertices=len(mesh.vertices), triangles=len(mesh.loop_triangles))
    return mesh, stats
