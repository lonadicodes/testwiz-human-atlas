/** Static hosts may serve .gz as a compressed response or as a gzip file.
 * Fetch already decodes Content-Encoding; inspect the payload to avoid decoding twice.
 */
export async function decodeModelResponse(response:Response,expectedBytes:number,compressed:boolean):Promise<ArrayBuffer>{
 if(!response.ok)throw new Error('An anatomy file could not be loaded.');
 const payload=await response.arrayBuffer(),signature=new Uint8Array(payload,0,Math.min(2,payload.byteLength));
 const gzip=compressed&&signature[0]===0x1f&&signature[1]===0x8b;
 const buffer=gzip?await new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():payload;
 if(buffer.byteLength!==expectedBytes)throw new Error('An anatomy file was incomplete. Please reload the viewer.');
 return buffer;
}

const CACHE_NAME='testwiz-anatomy-models-v1',CACHE_STORE='chunks';
let cacheDbPromise:Promise<IDBDatabase|null>|null=null;
function openCache(){
 if(typeof indexedDB==='undefined')return Promise.resolve(null);
 if(cacheDbPromise)return cacheDbPromise;
 cacheDbPromise=new Promise(resolve=>{try{const request=indexedDB.open(CACHE_NAME,1);request.onupgradeneeded=()=>request.result.createObjectStore(CACHE_STORE,{keyPath:'key'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>resolve(null);}catch{resolve(null);}});
 return cacheDbPromise;
}
function requestValue<T>(request:IDBRequest<T>){return new Promise<T|undefined>(resolve=>{request.onsuccess=()=>resolve(request.result);request.onerror=()=>resolve(undefined);});}
async function readCached(key:string,expectedBytes:number){
 const db=await openCache();if(!db)return null;
 try{const tx=db.transaction(CACHE_STORE,'readonly'),value=await requestValue<{key:string;buffer:ArrayBuffer}>(tx.objectStore(CACHE_STORE).get(key));return value?.buffer instanceof ArrayBuffer&&value.buffer.byteLength===expectedBytes?value.buffer:null;}catch{return null;}
}
async function writeCached(key:string,buffer:ArrayBuffer){
 const db=await openCache();if(!db)return;
 try{const tx=db.transaction(CACHE_STORE,'readwrite');tx.objectStore(CACHE_STORE).put({key,buffer,cachedAt:Date.now()});}catch{/* Storage is optional; loading must still succeed. */}
}
export async function loadModelChunk(url:string,expectedBytes:number,compressed:boolean,signal?:AbortSignal){
 const key=`${url}:${expectedBytes}`,cached=await readCached(key,expectedBytes);if(cached){if(signal?.aborted)throw new DOMException('Aborted','AbortError');return cached;}
 const response=await fetch(compressed?url.replace(/\.bin$/,'.bin.gz'):url,{signal}),buffer=await decodeModelResponse(response,expectedBytes,compressed);void writeCached(key,buffer);return buffer;
}
