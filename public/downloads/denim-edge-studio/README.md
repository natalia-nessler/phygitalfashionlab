# Denim Edge Studio 

Create raw denim edges in Blender with short, uneven fibers, a fine yarn along the cut, and sparse loose threads with free ends or loops. 

Tested in **Blender 4.0.2**. 

## Download

[Download denim_edge_studio.zip](denim_edge_studio.zip?raw=true)

Install the ZIP in Blender without extracting it.

## Package contents

- **denim_edge_studio.zip** — installable add-on.

## Install and try

1. In Blender 4.0, open **Edit → Preferences → Add-ons → Install**.
2. Select **denim_edge_studio.zip**, then enable **Denim Edge Studio **.
3. In the 3D Viewport, press **N** and open the **Denim Edge** tab.
4. Click **Create 16 cm Sample Edge**.
5. Adjust the settings, then click **Build / Update Edge**. Moving a slider does not rebuild the geometry automatically.

Settings are available when you select either the source curve or its generated threads. Each curve has its own settings. **Edge Style** offers **Reference Style**, **Subtle** and **Worn** presets. Presets preserve the edge side, offsets, colors, garment surface and geometry mode.

## Create an edge on your garment

Workflow: **finish fitting in CLO → export the garment as OBJ → import into Blender → select the cut edges → generate threads → export the threads as OBJ → import into CLO as Trim**.

1. Finish fitting and simulation in CLO. Export the required pattern pieces as **OBJ, mm, Thin, Multiple Objects, Unweld**. Keep the usual CLO axes without additional rotation.
2. Start a new Blender scene. In **Denim Edge**, click **Import Garment from CLO (.obj)** and choose **Millimeters**. Check the garment size. Keep its position unchanged if you want the trim to return to its original coordinates in CLO.
3. Select the garment piece, press **Tab**, then switch to edge selection with **2** on the main keyboard row. Deselect everything and select only the desired cut edge, without branches or cross edges.
4. Click **Curve from Selected Edges**. This creates a separate curve without changing the garment mesh. For boundary edges, the adjacent face determines the outward side.
5. Click **Build / Update Edge**. If the fibers point inward, enable **Flip Edge Side** and rebuild. This changes the side within the fabric plane; the offset above the fabric is controlled separately.
6. Adjust the short fibers, loose threads and placement. Create separate curves for sections that need different settings.
7. Click **Export Edges to CLO (.obj)**. **Active Edge** is selected by default. In the save dialog, choose **All Scene Edges** to export every managed curve, including hidden ones.

Export rebuilds the threads from their settings and writes **OBJ + MTL**. Rebuilding or exporting replaces manual edits to the generated thread mesh. Edit the source curve to change the edge shape.

## Settings

| Setting | Effect |
|---|---|
| Short Fiber Length, mm | Average short fiber length; default 2 mm |
| Fiber Spacing, mm | Smaller spacing produces more fibers and more geometry; default 0.65 mm |
| Thread Thickness, mm | Overall thread thickness; default 0.13 mm |
| Irregularity | Variation in short fiber lengths and root positions |
| Direction Scatter | Variation around the direction perpendicular to the cut edge |
| Fine Yarn Along Edge | Adds a broken fine yarn along the cut |
| Long Threads per 10 cm | Number of loose threads; set to 0 to disable them |
| Long Thread Length, mm | Approximate straightened length; curls reduce the distance beyond the edge |
| Curl Amount | Curvature of free-ended threads |
| Loop Fraction | Proportion of long threads with two roots instead of one free end |
| Out-of-Plane Bend, mm | How far threads bend away from the fabric plane |
| Surface Offset, mm | Moves all fibers along the surface normal; useful if they sink into the fabric |
| Across-Edge Offset, mm | Moves thread roots across the cut line |
| Random Seed | Changes the fiber arrangement while keeping the same size settings |
| Light Threads / Blue Threads | Colors of the two thread materials |
| Blue Thread Fraction | Proportion of blue threads |
| Garment Surface | Mesh used to orient the fibers along the garment surface |
| Fallback Plane | XZ, XY or YZ plane used when no garment surface is assigned |
| Flip Edge Side | Reverses which side of the curve the fibers extend toward |
| Geometry | Lightweight 3D tubes or Minimal Flat ribbons |
| Triangle Limit per Curve | Stops a build that is estimated to exceed the chosen limit |

Manually drawn **Poly** and **Bezier** curves are also supported. Assign a **Garment Surface** to orient the fibers using the garment mesh. Without one, choose an **XZ / XY / YZ Fallback Plane**. A mesh without faces cannot be used as a garment surface. Convert **NURBS** to a mesh first, then create a curve from its edges.

## Geometry weight

Measured in Blender for a **16 cm wide** test sample, with a slightly uneven curve about **16.19 cm** long. It contains 250 short fibers and 10 long threads.

| Mode | Triangles | Appearance |
|---|---:|---|
| Lightweight 3D | **7,012** | Retains thickness from different viewpoints; recommended starting mode |
| Minimal Flat | **2,088** | About 3.4 times fewer triangles; almost invisible when viewed edge-on |

The visible threads and loops are real geometry. They do not need textures or opacity maps. Individual microfibers and detailed yarn twists are omitted, so extreme close-ups look simplified. Loop shapes are approximate and do not simulate the physical behavior of real threads.

The panel shows the triangle count after each build. The default limit is **60,000 per curve**. Increase spacing or choose **Minimal Flat** if the estimate exceeds this limit. The check uses a conservative upper bound and may stop a build slightly before the actual count would reach the limit. Longer total edges produce more geometry; triangle count alone does not guarantee performance in CLO.

## Import into CLO

1. Use the **OBJ** file you exported with **Export Edges to CLO (.obj)**. Keep the matching **.mtl** file beside it.
2. Choose **File → Import (Add) → OBJ → Load as Trim** in CLO.
3. Use **mm**, set translation to **0**, and leave axis conversion, Auto Scale and Align Bottom to Ground disabled. If your version offers a position reset, preserve the original coordinates.
4. If the MTL colors are not loaded, manually assign a light gray cotton color and a muted blue to the trim materials.
5. To save it to your library, choose **File → Save As → Trim**.

See the [CLO trim guide](https://support.clo3d.com/hc/en-us/articles/360001060807-Open-Save-Trim) for OBJ-as-Trim import and library saving, and the [CLO OBJ guide](https://support.clo3d.com/hc/en-us/articles/115000494107-3D-File-OBJ-Import-Export) for units, axes and garment export options.

## Limitations

- This is a static trim for a garment whose fit is already finalized. The add-on does not create physically simulated threads or make the full edge deform with a new CLO simulation. If the fit changes, update the garment and rebuild the edge.
- A curve created from mesh edges captures their shape at creation time and follows object-level movement of the garment. It does not automatically follow vertex edits or modifier deformation; recreate the curve after those changes. Rebuild the threads after moving a curve.
- Threads can intersect at sharp corners, tight folds or neighboring pieces, and the nearest garment surface may be ambiguous. Split the area into separate curves and adjust the side or offsets. There is no collision avoidance.
- A long free thread may curl back onto the fabric. Reduce **Curl Amount** or change **Random Seed** if needed.
- The scene must use **Unit Scale = 1**: one Blender unit represents one meter. Importing through the panel converts OBJ millimeters to this scale. The add-on stops in scenes with a different unit scale to avoid incorrect dimensions.

## License

Denim Edge Studio is distributed under the GNU General Public License v3. See [LICENSE.txt](LICENSE.txt). This license applies to the add-on and its source files, not to the rest of the Phygital Fashion Lab website.
