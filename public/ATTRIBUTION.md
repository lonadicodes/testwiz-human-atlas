# Anatomy data attribution

Testwiz interface, edition controls, and web-performance adaptations © 2026 Testwiz. These additions do not replace or relicense the original atlas code or anatomy data; the upstream notices and license terms below still apply.

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

- License: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html (updated 2025-02-27)
- Dataset: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- License terms: https://creativecommons.org/licenses/by/4.0/
- Source geometry: `isa_BP3D_4.0_obj_99.zip`, BodyParts3D 4.0.
- English names and relationships: IS-A and PART-OF concept, element, and inclusion tables from the same archive.
- Publication: Mitsuhashi et al. (2009), BodyParts3D: 3D structure database for anatomical concepts. https://doi.org/10.1093/nar/gkn613

Adaptations: axes and units converted from millimeters/Z-up to meters/Y-up; translated to rest at the stage; geometry simplified using meshoptimizer with 0.2% relative error limit per structure; normals quantized to signed 16-bit; packed into binary chunks; curated display system groupings and colors. The source contains 2,234 individual OBJ meshes; all remain represented. The combined hierarchy contains 3,432 named FMA concepts, which may reference multiple meshes. Original source identity is preserved in the manifest.

Source OBJ comments mention an older CC BY-SA 2.1 Japan license. The official current database license linked above supersedes that legacy text and explicitly permits redistribution and adaptation under CC BY 4.0.

BodyParts3D represents an adult male reference anatomy based on TARO MRI and anatomical illustration refinements. It is not a complete model of every possible human anatomical structure or variation. This interface is educational and is not a clinical tool.

## Active female edition

The female edition uses Kristen Browne and Heidi Schlehlein’s HuBMAP Human Reference Atlas *3D Reference Organ Set for Female v1.10*, with eight pelvic structures retained from the same reference body’s v1.5 release. Both releases are distributed under CC BY 4.0.

- v1.10 reference library: https://humanatlas.io/3d-reference-library
- v1.10 dataset: https://lod.humanatlas.io/ref-organ/united-female/v1.10
- v1.10 source GLB: https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.10/assets/3d-vh-f-united.glb
- v1.5 supplement dataset: https://lod.humanatlas.io/ref-organ/united-female/v1.5
- v1.5 supplement GLB: https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/assets/3d-vh-f-united.glb
- License: https://creativecommons.org/licenses/by/4.0/
- Source publication: https://doi.org/10.1038/s41597-022-01905-2

Adaptations: native meter/Y-up coordinates and node transforms are baked into the stage, source hierarchy and identifiers are retained as concepts, coincident vertices are welded and source normals averaged before simplification, geometry is simplified with a 0.2% per-structure relative error bound, normals are quantized to signed 16-bit, and chunks are gzip-compressed. The female source is a complete-body orientation surface with selected organs and incomplete skeletal/muscular coverage; it is not a complete model of every human structure or a single-person scan. The translucent body surface is shown initially to provide a whole-body frame, while pregnancy reference structures remain hidden until enabled. Female reproductive anatomy remains in the normal Reproductive layer. No male-derived bones or second-donor muscles are included.
