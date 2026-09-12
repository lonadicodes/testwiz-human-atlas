import fs from 'node:fs';
import assert from 'node:assert/strict';

const filename=process.argv[2]??'atlas.json';
const base=new URL('../public/models/',import.meta.url),atlas=JSON.parse(fs.readFileSync(new URL(filename,base)));
const expected=atlas.sex==='male'?{parts:2234,concepts:3432,source:'BodyParts3D'}:{parts:964,concepts:1173,source:'humanatlas.io/ref-organ/united-female'};
assert.ok(atlas.sex==='male'||atlas.sex==='female','Manifest sex must be male or female');
assert.equal(atlas.parts.length,expected.parts,`${filename}: unexpected source mesh total`);
assert.equal(atlas.concepts.length,expected.concepts,`${filename}: unexpected concept total`);
assert.equal(typeof atlas.source,'string');assert.match(atlas.source,new RegExp(expected.source.replace(/[.]/g,'\\.')));
assert.equal(typeof atlas.scope,'string');assert.ok(atlas.scope.length>10);
assert.ok(Array.isArray(atlas.chunks)&&atlas.chunks.length>0);
const ids=new Set(atlas.parts.map(p=>p.id));assert.equal(ids.size,atlas.parts.length);
const conceptIds=new Set(atlas.concepts.map(c=>c.id));
const files=atlas.chunks.map((c,index)=>{assert.ok(typeof c.url==='string'&&c.url.startsWith('/models/'));assert.ok(Number.isInteger(c.bytes)&&c.bytes>0);const b=fs.readFileSync(new URL(c.url.split('/').pop(),base));assert.equal(b.length,c.bytes,`${filename}: chunk ${index} byte length`);assert.ok(typeof c.gzip==='string'&&c.gzip.endsWith('.gz'));assert.ok(Number.isInteger(c.gzipBytes)&&c.gzipBytes>0);const gz=fs.readFileSync(new URL(c.gzip.split('/').pop(),base));assert.equal(gz.length,c.gzipBytes,`${filename}: chunk ${index} gzip length`);return b;});
let tris=0;
for(const p of atlas.parts){assert.ok(p.name.trim()&&p.name!=='-'&&!p.name.includes('Bounds('));assert.ok(p.conceptId!=='-');assert.ok(conceptIds.has(p.conceptId),`${p.id}: missing concept ${p.conceptId}`);assert.ok(typeof p.system==='string');assert.ok(Number.isInteger(p.chunk)&&p.chunk>=0&&p.chunk<files.length);const b=files[p.chunk];assert.ok(Number.isInteger(p.positions)&&Number.isInteger(p.normals)&&Number.isInteger(p.indices));assert.ok(p.positions%4===0&&p.normals%2===0&&p.indices%4===0);assert.ok(p.positions+p.vertexCount*3*4<=b.length);assert.ok(p.normals+p.vertexCount*3*2<=b.length);assert.ok(p.indices+p.indexCount*4<=b.length);assert.ok(Number.isInteger(p.vertexCount)&&p.vertexCount>0&&Number.isInteger(p.indexCount)&&p.indexCount>=3&&p.indexCount%3===0);const pos=new Float32Array(b.buffer,b.byteOffset+p.positions,p.vertexCount*3),indices=new Uint32Array(b.buffer,b.byteOffset+p.indices,p.indexCount);for(const i of indices)assert.ok(i<p.vertexCount,`${p.id}: invalid vertex`);for(const value of pos)assert.ok(Number.isFinite(value));assert.equal(p.bounds.length,2);for(const point of p.bounds)for(const value of point)assert.ok(Number.isFinite(value));tris+=p.indexCount/3;}
for(const c of atlas.concepts){assert.ok(c.id&&c.name.trim()&&Array.isArray(c.elements)&&c.elements.length);for(const id of c.elements)assert.ok(ids.has(id),`${c.id}: missing ${id}`);}
assert.equal(tris,atlas.triangles);assert.ok(Number.isFinite(atlas.triangles)&&atlas.triangles>0);
console.log(`Verified ${filename}: ${ids.size} meshes, ${atlas.concepts.length} concepts, ${tris.toLocaleString()} triangles, source identity, finite geometry, chunk offsets, and gzip metadata.`);
