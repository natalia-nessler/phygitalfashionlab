bl_info = {
    'name': 'Denim Edge Studio — Raw Denim Edges for CLO (English)',
    'author': 'Natalia Nessler',
    'version': (1, 0, 1),
    'blender': (4, 0, 0),
    'location': '3D View > Sidebar > Denim Edge',
    'description': 'Short frayed fibers and loose threads along raw edges; lightweight OBJ export for CLO',
    'category': 'Object',
}

import json
import math
import os
from pathlib import Path
from types import SimpleNamespace
import bpy
import bmesh
from mathutils import Vector, Matrix
from bpy.props import BoolProperty, EnumProperty, FloatProperty, FloatVectorProperty, IntProperty, PointerProperty, StringProperty
from bpy_extras.io_utils import ImportHelper, ExportHelper
from . import geometry


class DENIM_Settings(bpy.types.PropertyGroup):
    enabled: BoolProperty(default=False)
    short_length_mm: FloatProperty(name='Short Fiber Length, mm', default=2.0, min=.2, max=30,
        description='Average short fiber length; Irregularity varies individual lengths')
    spacing_mm: FloatProperty(name='Fiber Spacing, mm', default=.65, min=.15, max=10)
    diameter_mm: FloatProperty(name='Thread Thickness, mm', default=.13, min=.03, max=1)
    irregularity: FloatProperty(name='Irregularity', default=.8, min=0, max=1)
    scatter: FloatProperty(name='Direction Scatter', default=.7, min=0, max=1)
    edge_yarns: BoolProperty(name='Fine Yarn Along Edge', default=True)
    long_density: FloatProperty(name='Long Threads per 10 cm', default=6, min=0, max=60,
        description='Set to 0 to keep only the short fibers')
    long_length_mm: FloatProperty(name='Long Thread Length, mm', default=18, min=2, max=100,
        description='Approximate straightened length; curls reduce how far threads extend beyond the edge')
    curl: FloatProperty(name='Curl Amount', default=.7, min=0, max=1)
    loop_fraction: FloatProperty(name='Loop Fraction', default=.35, min=0, max=1, subtype='FACTOR')
    loft_mm: FloatProperty(name='Out-of-Plane Bend, mm', default=.35, min=0, max=5)
    seed: IntProperty(name='Random Seed', default=24, min=0, max=100000)
    quality: EnumProperty(name='Geometry', items=[
        ('LITE','Lightweight 3D','Thin triangular tubes with smooth shading'),
        ('RIBBON','Minimal Flat','Ribbons with no thickness; almost invisible when viewed edge-on')], default='LITE')
    surface_object: PointerProperty(name='Garment Surface', type=bpy.types.Object, poll=lambda self,obj: obj.type=='MESH',
        description='Uses the garment surface to orient fibers across the edge')
    plane: EnumProperty(name='Fallback Plane', items=[('XZ','XZ — Vertical','+Y normal'),
        ('XY','XY — Horizontal','+Z normal'),('YZ','YZ — Side','+X normal')], default='XZ')
    flip_side: BoolProperty(name='Flip Edge Side', default=False)
    offset_mm: FloatProperty(name='Across-Edge Offset, mm', default=0, min=-20, max=20)
    lift_mm: FloatProperty(name='Surface Offset, mm', default=.12, min=-10, max=10,
        description='Increase if threads sink into the fabric; reverse the sign for flipped surface normals')
    cotton_color: FloatVectorProperty(name='Light Threads', subtype='COLOR', size=3, min=0,max=1,default=(.68,.72,.66))
    blue_color: FloatVectorProperty(name='Blue Threads', subtype='COLOR', size=3, min=0,max=1,default=(.018,.04,.075))
    blue_fraction: FloatProperty(name='Blue Thread Fraction', default=.12, min=0,max=1,subtype='FACTOR')
    max_triangles: IntProperty(name='Triangle Limit per Curve', default=60000,min=1000,max=500000,
        description='Checks complexity before building. Increase spacing or use Minimal Flat if the limit is exceeded')
    result: PointerProperty(type=bpy.types.Object)


def settings(source):
    p = source.denim_settings
    return SimpleNamespace(short_length=p.short_length_mm/1000, spacing=p.spacing_mm/1000,
        diameter=p.diameter_mm/1000, irregularity=p.irregularity, scatter=p.scatter,
        edge_yarns=p.edge_yarns, long_density=p.long_density, long_length=p.long_length_mm/1000,
        curl=p.curl, loop_fraction=p.loop_fraction, loft=p.loft_mm/1000, seed=p.seed,
        quality=p.quality, surface_object=p.surface_object, plane=p.plane, flip_side=p.flip_side,
        offset=p.offset_mm/1000, lift=p.lift_mm/1000, blue_fraction=p.blue_fraction,max_triangles=p.max_triangles)


def ensure_units(context):
    if not math.isclose(context.scene.unit_settings.scale_length,1,rel_tol=1e-6):
        raise ValueError('Set Unit Scale to 1 in Scene > Units. Start with a new scene and import using this panel.')


def source_for(context):
    obj = context.active_object
    if obj and obj.type=='CURVE':
        return obj
    if obj and obj.get('denim_generated'):
        return obj.denim_source
    return None


def activate(context,obj):
    for other in context.selected_objects:
        other.select_set(False)
    obj.hide_set(False)
    obj.select_set(True)
    context.view_layer.objects.active=obj


def cotton_material(source,index,color):
    result=source.denim_settings.result
    mat = None
    if result and result.denim_source==source and result.type=='MESH' and len(result.data.materials)>index:
        candidate=result.data.materials[index]
        if candidate and candidate.get('denim_material') and candidate.users==1:
            mat=candidate
    if mat is None:
        mat=bpy.data.materials.new('Denim Cotton' if index==0 else 'Denim Indigo')
    mat['denim_material']=True
    mat.diffuse_color=(*color,1)
    mat.use_nodes=True
    bsdf=mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value=(*color,1)
    bsdf.inputs['Roughness'].default_value=.86
    bsdf.inputs['Specular IOR Level'].default_value=.18
    return mat


def rebuild(source,context=None):
    context=context or bpy.context
    ensure_units(context)
    if source.type!='CURVE':
        raise ValueError('Select an edge curve.')
    context.view_layer.update()
    mesh,stats=geometry.build(source,settings(source))
    p=source.denim_settings
    mesh.materials.append(cotton_material(source,0,p.cotton_color))
    mesh.materials.append(cotton_material(source,1,p.blue_color))
    result=p.result
    if result is None or not result.get('denim_generated') or result.denim_source!=source or result.type!='MESH':
        result=bpy.data.objects.new('Denim Edge | '+source.name,mesh)
        collection=source.users_collection[0] if source.users_collection else context.collection
        collection.objects.link(result)
    else:
        old=result.data
        result.data=mesh
        if old.users==0:
            bpy.data.meshes.remove(old)
    result.parent=None
    result.matrix_world=Matrix.Identity(4)
    result['denim_generated']=True
    result['denim_triangles']=stats['triangles']
    result.denim_source=source
    p.result=result
    p.enabled=True
    source.hide_render=True
    source['denim_stats']=json.dumps(stats)
    return result


def selected_edge_chains(obj):
    bm=bmesh.from_edit_mesh(obj.data)
    bm.verts.ensure_lookup_table()
    bm.verts.index_update()
    selected=[e for e in bm.edges if e.select]
    if not selected:
        raise ValueError('Select the mesh edges along the desired cut.')
    adjacency={}
    edges={}
    for edge in selected:
        a,b=edge.verts
        adjacency.setdefault(a,[]).append(b)
        adjacency.setdefault(b,[]).append(a)
        edges[frozenset((a,b))]=edge
    if any(len(v)>2 for v in adjacency.values()):
        raise ValueError('The selection contains branches. Select only the edge paths, without cross edges.')
    remaining=set(adjacency)
    chains=[]
    while remaining:
        # Find a connected component before choosing its endpoint.
        component=set()
        stack=[min(remaining,key=lambda v:v.index)]
        while stack:
            vertex=stack.pop()
            if vertex in component:
                continue
            component.add(vertex)
            stack.extend(v for v in adjacency[vertex] if v not in component)
        ends=[v for v in component if len(adjacency[v])==1]
        start=min(ends or component,key=lambda v:v.index)
        chain=[]
        previous=None
        current=start
        cyclic=False
        while current in remaining:
            chain.append(current)
            remaining.remove(current)
            nxt=[v for v in adjacency[current] if v!=previous]
            if not nxt:
                break
            following=min(nxt,key=lambda v:v.index)
            if following==start:
                cyclic=True
                break
            previous,current=current,following
        # For a true boundary, orient outward using the adjacent face, independent of vertex order.
        for a,b in zip(chain,chain[1:]):
            edge=edges[frozenset((a,b))]
            if len(edge.link_faces)==1:
                face=edge.link_faces[0]
                world=[obj.matrix_world@v.co for v in face.verts]
                n=Vector((0,0,0))
                origin=world[0]
                for u,v in zip(world[1:],world[2:]):
                    n+=(u-origin).cross(v-origin)
                a_world,b_world=obj.matrix_world@a.co,obj.matrix_world@b.co
                center=sum(world,Vector())/len(world)
                if n.cross(b_world-a_world).dot(center-(a_world+b_world)/2)>0:
                    chain.reverse()
                break
        chains.append(([obj.matrix_world@v.co for v in chain],cyclic))
    return chains


def new_curve(name,chains,context=None):
    context=context or bpy.context
    data=bpy.data.curves.new(name,'CURVE')
    data.dimensions='3D'
    for coords,cyclic in chains:
        spline=data.splines.new('POLY')
        spline.points.add(len(coords)-1)
        for p,co in zip(spline.points,coords):
            p.co=(*co,1)
        spline.use_cyclic_u=cyclic
    obj=bpy.data.objects.new(name,data)
    context.collection.objects.link(obj)
    obj.denim_settings.enabled=True
    return obj


class DENIM_OT_sample(bpy.types.Operator):
    bl_idname='denim.sample'
    bl_label='Create 16 cm Sample Edge'
    bl_options={'REGISTER','UNDO'}

    @classmethod
    def poll(cls,context): return context.mode=='OBJECT'

    def execute(self,context):
        try:
            ensure_units(context)
            obj=new_curve('Curve | 16 cm Sample Edge',[([(-.08,0,0),(.08,0,0)],False)],context)
            rebuild(obj,context)
            activate(context,obj)
            context.scene.unit_settings.system='METRIC'
            context.scene.unit_settings.length_unit='MILLIMETERS'
        except (ValueError,RuntimeError) as exc:
            self.report({'ERROR'},str(exc)); return {'CANCELLED'}
        return {'FINISHED'}


class DENIM_OT_from_edges(bpy.types.Operator):
    bl_idname='denim.from_edges'
    bl_label='Curve from Selected Edges'
    bl_options={'REGISTER','UNDO'}

    @classmethod
    def poll(cls,context): return context.mode=='EDIT_MESH'

    def execute(self,context):
        original=context.edit_object
        try:
            ensure_units(context)
            chains=selected_edge_chains(original)
        except (ValueError,RuntimeError) as exc:
            self.report({'ERROR'},str(exc)); return {'CANCELLED'}
        obj=new_curve('Edge | '+original.name,chains,context)
        if original.data.polygons:
            obj.denim_settings.surface_object=original
        obj.parent=original
        obj.matrix_parent_inverse=original.matrix_world.inverted_safe()
        bpy.ops.object.mode_set(mode='OBJECT')
        activate(context,obj)
        self.report({'INFO'},'Curve created. Adjust the settings, then click Build / Update Edge.')
        return {'FINISHED'}


class DENIM_OT_build(bpy.types.Operator):
    bl_idname='denim.build'
    bl_label='Build / Update Edge'
    bl_options={'REGISTER','UNDO'}

    @classmethod
    def poll(cls,context): return context.mode=='OBJECT' and source_for(context) is not None

    def execute(self,context):
        try:
            result=rebuild(source_for(context),context)
        except (ValueError,RuntimeError) as exc:
            self.report({'ERROR'},str(exc)); return {'CANCELLED'}
        self.report({'INFO'},f"Done: {result['denim_triangles']:,} triangles.")
        return {'FINISHED'}


class DENIM_OT_preset(bpy.types.Operator):
    bl_idname='denim.preset'
    bl_label='Apply Edge Style'
    bl_options={'REGISTER','UNDO'}
    kind: EnumProperty(items=[('REFERENCE','Reference Style',''),('SUBTLE','Subtle',''),('WORN','Worn','')])

    @classmethod
    def poll(cls,context): return context.mode=='OBJECT' and source_for(context) is not None

    def execute(self,context):
        source=source_for(context)
        p=source.denim_settings
        values={'REFERENCE':(2,.65,6,18,.7,.35,.8), 'SUBTLE':(1.1,.8,2,9,.35,.2,.6),
                'WORN':(4,.55,10,28,.8,.45,.9)}[self.kind]
        for key,value in zip(('short_length_mm','spacing_mm','long_density','long_length_mm','curl','loop_fraction','irregularity'),values):
            setattr(p,key,value)
        try:
            rebuild(source,context)
        except (ValueError,RuntimeError) as exc:
            self.report({'ERROR'},str(exc)); return {'CANCELLED'}
        return {'FINISHED'}


class DENIM_OT_import(bpy.types.Operator,ImportHelper):
    bl_idname='denim.import_clo'
    bl_label='Import Garment from CLO (.obj)'
    filename_ext='.obj'
    filter_glob: StringProperty(default='*.obj',options={'HIDDEN'})
    units: EnumProperty(name='CLO OBJ Units',items=[('MM','Millimeters',''),('CM','Centimeters',''),('M','Meters','')],default='MM')

    @classmethod
    def poll(cls,context): return context.mode=='OBJECT'

    def execute(self,context):
        try:
            ensure_units(context)
            before=set(bpy.data.objects)
            bpy.ops.wm.obj_import(filepath=self.filepath,forward_axis='NEGATIVE_Z',up_axis='Y')
            scale={'MM':.001,'CM':.01,'M':1}[self.units]
            for obj in set(bpy.data.objects)-before:
                if obj.parent is None:
                    obj.matrix_world=Matrix.Scale(scale,4)@obj.matrix_world
            context.scene.unit_settings.system='METRIC'
            context.scene.unit_settings.length_unit='MILLIMETERS'
        except (ValueError,RuntimeError) as exc:
            self.report({'ERROR'},str(exc)); return {'CANCELLED'}
        self.report({'INFO'},'Garment imported. Check its size, then select the cut edges in Edit Mode.')
        return {'FINISHED'}


def srgb(x):
    return 12.92*x if x <= .0031308 else 1.055*x**(1/2.4)-.055


def export_obj(context,filepath,sources=None):
    """Export rebuilt meshes only, preserving world placement, mm and Y-up axes.

    A small explicit OBJ writer avoids exporter version-dependent material names
    and avoids touching the user's selection or collection visibility.
    """
    if context.mode!='OBJECT':
        raise ValueError('Press Tab to leave Edit Mode before exporting.')
    sources=list(sources) if sources is not None else [o for o in context.scene.objects if o.type=='CURVE' and o.denim_settings.enabled]
    if not sources:
        raise ValueError('There are no edge curves in this scene.')
    results=[rebuild(source,context) for source in sources]
    target=Path(filepath).with_suffix('.obj')
    target.parent.mkdir(parents=True,exist_ok=True)
    mtl=target.with_suffix('.mtl')
    # Generate all geometry before opening either output file.
    with target.open('w',encoding='utf-8',newline='\n') as obj_file, mtl.open('w',encoding='utf-8',newline='\n') as mat_file:
        obj_file.write('# Denim Edge Studio 1.0 | millimetres | Y up | CLO Load as Trim\n')
        obj_file.write(f'mtllib {mtl.name}\n')
        vertex_offset=0
        loop_offset=0
        for k,result in enumerate(results):
            mesh=result.data
            mesh.calc_loop_triangles()
            if hasattr(mesh,'calc_normals_split'):
                mesh.calc_normals_split()
            obj_file.write(f'o DenimEdge_{k+1:03d}\n')
            for vertex in mesh.vertices:
                x,y,z=vertex.co
                obj_file.write(f'v {x*1000:.7f} {z*1000:.7f} {-y*1000:.7f}\n')
            for uv in mesh.uv_layers.active.data:
                obj_file.write(f'vt {uv.uv.x:.7f} {uv.uv.y:.7f}\n')
            for loop in mesh.loops:
                normal=loop.normal if hasattr(loop,'normal') else mesh.corner_normals[loop.index].vector
                x,y,z=normal
                obj_file.write(f'vn {x:.7f} {z:.7f} {-y:.7f}\n')
            names=[]
            for i,material in enumerate(mesh.materials):
                name=f'DenimEdge_{k+1:03d}_{i}'
                names.append(name)
                rgb=[srgb(c) for c in material.diffuse_color[:3]]
                mat_file.write(f'newmtl {name}\nKa 0 0 0\nKd {rgb[0]:.6f} {rgb[1]:.6f} {rgb[2]:.6f}\nKs 0.04 0.04 0.04\nNs 8\nd 1\nillum 2\n\n')
            current=None
            obj_file.write('s 1\n')
            for tri in mesh.loop_triangles:
                if tri.material_index!=current:
                    current=tri.material_index
                    obj_file.write(f'usemtl {names[current]}\n')
                refs=[f'{v+vertex_offset+1}/{l+loop_offset+1}/{l+loop_offset+1}' for v,l in zip(tri.vertices,tri.loops)]
                obj_file.write('f '+' '.join(refs)+'\n')
            vertex_offset+=len(mesh.vertices)
            loop_offset+=len(mesh.loops)
    return results


class DENIM_OT_export(bpy.types.Operator,ExportHelper):
    bl_idname='denim.export_clo'
    bl_label='Export Edges to CLO (.obj)'
    filename_ext='.obj'
    filter_glob: StringProperty(default='*.obj',options={'HIDDEN'})
    scope: EnumProperty(name='Export Scope',items=[('ACTIVE','Active Edge','The active edge curve or its generated mesh'),
        ('ALL','All Scene Edges','All Denim Edge Studio curves, including hidden curves')],default='ACTIVE')

    @classmethod
    def poll(cls,context): return context.mode=='OBJECT'

    def execute(self,context):
        source=source_for(context)
        if self.scope=='ACTIVE' and source is None:
            self.report({'ERROR'},'Select an edge curve or choose All Scene Edges.'); return {'CANCELLED'}
        try:
            results=export_obj(context,self.filepath,[source] if self.scope=='ACTIVE' else None)
        except (ValueError,RuntimeError,OSError) as exc:
            self.report({'ERROR'},str(exc)); return {'CANCELLED'}
        total=sum(o['denim_triangles'] for o in results)
        self.report({'INFO'},f'Exported {len(results)} edges, {total:,} triangles. In CLO: Trim, mm.')
        return {'FINISHED'}


class DENIM_PT_panel(bpy.types.Panel):
    bl_label='Raw Denim Edge'
    bl_idname='DENIM_PT_panel'
    bl_space_type='VIEW_3D'
    bl_region_type='UI'
    bl_category='Denim Edge'

    def draw(self,context):
        layout=self.layout
        layout.operator('denim.import_clo',icon='IMPORT')
        layout.operator('denim.sample',icon='CURVE_PATH')
        layout.operator('denim.from_edges',icon='EDGESEL')
        source=source_for(context)
        if source is None:
            layout.label(text='Select an edge curve or garment edges.')
            return
        p=source.denim_settings
        layout.label(text=source.name,icon='CURVE_DATA')
        layout.operator_menu_enum('denim.preset','kind',text='Edge Style')
        box=layout.box(); box.label(text='Short Fibers')
        for key in ('short_length_mm','spacing_mm','diameter_mm','irregularity','scatter','edge_yarns'):
            box.prop(p,key)
        box=layout.box(); box.label(text='Loose Threads')
        for key in ('long_density','long_length_mm','curl','loop_fraction','loft_mm'):
            box.prop(p,key)
        box=layout.box(); box.label(text='Edge Placement')
        box.prop(p,'surface_object')
        if p.surface_object is None: box.prop(p,'plane')
        for key in ('flip_side','offset_mm','lift_mm'):
            box.prop(p,key)
        row=layout.row(align=True); row.prop(p,'cotton_color',text=''); row.prop(p,'blue_color',text='')
        layout.prop(p,'blue_fraction')
        layout.prop(p,'seed')
        layout.prop(p,'quality')
        layout.prop(p,'max_triangles')
        layout.operator('denim.build',icon='FILE_REFRESH')
        if p.result:
            layout.label(text=f"Last build: {p.result.get('denim_triangles',0):,} triangles")
        layout.label(text='Click Build / Update after changes.')
        layout.operator('denim.export_clo',icon='EXPORT')


CLASSES=(DENIM_Settings,DENIM_OT_sample,DENIM_OT_from_edges,DENIM_OT_build,DENIM_OT_preset,DENIM_OT_import,DENIM_OT_export,DENIM_PT_panel)


def register():
    for cls in CLASSES: bpy.utils.register_class(cls)
    bpy.types.Object.denim_settings=PointerProperty(type=DENIM_Settings)
    bpy.types.Object.denim_source=PointerProperty(type=bpy.types.Object)


def unregister():
    del bpy.types.Object.denim_source
    del bpy.types.Object.denim_settings
    for cls in reversed(CLASSES): bpy.utils.unregister_class(cls)


if __name__=='__main__':
    register()
