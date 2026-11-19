"""World-space curve sampling and non-destructive garment normal lookup."""
import bisect
import math
from mathutils import Vector
from mathutils.geometry import interpolate_bezier
from mathutils.bvhtree import BVHTree
import bpy

EPS = 1e-10


class Arc:
    def __init__(self, points, cyclic=False):
        self.points = []
        for point in points:
            if not all(math.isfinite(x) for x in point):
                raise ValueError('The curve contains invalid coordinates.')
            if not self.points or (point - self.points[-1]).length > EPS:
                self.points.append(point.copy())
        self.cyclic = cyclic
        if cyclic and len(self.points) > 1 and (self.points[-1] - self.points[0]).length > EPS:
            self.points.append(self.points[0].copy())
        self.distances = [0.0]
        for a, b in zip(self.points, self.points[1:]):
            self.distances.append(self.distances[-1] + (b - a).length)
        self.length = self.distances[-1]

    def at(self, distance):
        d = distance % self.length if self.cyclic else max(0, min(self.length, distance))
        i = min(len(self.points) - 2, max(0, bisect.bisect_right(self.distances, d) - 1))
        t = (d - self.distances[i]) / (self.distances[i + 1] - self.distances[i])
        return self.points[i].lerp(self.points[i + 1], t), (self.points[i + 1] - self.points[i]).normalized()


def curves(obj, spacing):
    arcs = []
    for spline in obj.data.splines:
        points = []
        if spline.type == 'POLY':
            points = [obj.matrix_world @ Vector(p.co[:3]) for p in spline.points]
        elif spline.type == 'BEZIER':
            controls = spline.bezier_points
            for i in range(len(controls) if spline.use_cyclic_u else len(controls) - 1):
                a, b = controls[i], controls[(i + 1) % len(controls)]
                p = [obj.matrix_world @ v for v in (a.co, a.handle_right, b.handle_left, b.co)]
                extent = sum((v - u).length for u, v in zip(p, p[1:]))
                count = max(8, min(2048, math.ceil(extent / max(spacing, .0001)) + 1))
                samples = interpolate_bezier(*p, count)
                points.extend(samples[1:] if points else samples)
        else:
            raise ValueError('Poly and Bezier curves are supported. Convert NURBS to a mesh first.')
        arc = Arc(points, spline.use_cyclic_u)
        if len(arc.points) >= 2 and arc.length > EPS:
            arcs.append(arc)
    if not arcs:
        raise ValueError('The curve needs at least two different points.')
    return arcs


def normal_lookup(surface, plane):
    if surface is None:
        normal = Vector({'XZ': (0, 1, 0), 'XY': (0, 0, 1), 'YZ': (1, 0, 0)}[plane])
        return lambda point: normal.copy()
    if surface.type != 'MESH':
        raise ValueError('Garment Surface must be a mesh object.')
    evaluated = surface.evaluated_get(bpy.context.evaluated_depsgraph_get())
    if abs(evaluated.matrix_world.to_3x3().determinant()) < 1e-12:
        raise ValueError('The garment object has a zero scale.')
    mesh = evaluated.to_mesh()
    try:
        # World-space BVH is correct for mirrored and non-uniformly scaled cloth.
        vertices = [evaluated.matrix_world @ v.co for v in mesh.vertices]
        faces = [tuple(p.vertices) for p in mesh.polygons]
        if not faces:
            raise ValueError('The garment mesh has no faces. Clear Garment Surface and choose a Fallback Plane.')
        tree = BVHTree.FromPolygons(vertices, faces)
    finally:
        evaluated.to_mesh_clear()

    def lookup(point):
        _, normal, _, _ = tree.find_nearest(point)
        if normal is None or normal.length < EPS:
            raise ValueError('Could not find a usable garment surface near the edge.')
        return normal.normalized()
    return lookup


def frame(arc, distance, lookup, flip):
    point, tangent = arc.at(distance)
    normal = lookup(point)
    outward = normal.cross(tangent)
    if outward.length < 1e-6:
        raise ValueError('The curve is perpendicular to the selected plane. Choose another plane or a garment surface.')
    outward.normalize()
    if flip:
        outward.negate()
    # Project the normal perpendicular to the path, keeping an orthogonal frame.
    normal = (normal - tangent * normal.dot(tangent)).normalized()
    return point, tangent, outward, normal
