export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac'|'brain'|'pregnancy';
export type Sex = 'male'|'female';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Skeleton',color:'#e2d9ba',description:'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.'},
 {id:'muscular',name:'Muscles',color:'#a85b50',description:'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.'},
 {id:'cardiac',name:'Heart',color:'#b96760',description:'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.'},
 {id:'sensory',name:'Sensory organs',color:'#b0c8ce',description:'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.'},
 {id:'arterial',name:'Arteries',color:'#c05245',description:'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.'},
 {id:'venous',name:'Veins',color:'#527c9f',description:'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.'},
 {id:'nervous',name:'Nervous system',color:'#d8b565',description:'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.'},
 {id:'respiratory',name:'Respiratory',color:'#b98991',description:'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.'},
 {id:'digestive',name:'Digestive',color:'#b8916b',description:'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.'},
 {id:'urinary',name:'Urinary',color:'#b47961',description:'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.'},
 {id:'lymphatic',name:'Lymphatic',color:'#879f7c',description:'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.'},
 {id:'endocrine',name:'Endocrine',color:'#c5a09a',description:'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.'},
 {id:'reproductive',name:'Reproductive',color:'#bda098',description:'The reproductive structures represented here produce gametes and sex hormones, and provide the passages that carry them.'},
 {id:'integumentary',name:'Body surface',color:'#ba9b7d',description:'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.'},
 {id:'connective',name:'Connective tissue',color:'#aec3bb',description:'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.'},
 {id:'brain',name:'Brain regions',color:'#b3a8c6',description:'The brain is subdivided here into individually selectable regions. Each one can be isolated on its own, while the spinal cord and nerves outside the brain stay under the nervous system.'},
 {id:'pregnancy',name:'Pregnancy reference',color:'#c8a6ae',description:'The placenta, membranes, and umbilical cord shown here belong to a pregnancy reference and are not part of the non-pregnant body. They are hidden until you switch them on.'},
];
/** Stable ring order used by the original male atlas; female-only systems follow it. */
export const EXPLOSION_ORDER:SystemId[] = ['skeletal','muscular','cardiac','sensory','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','integumentary','connective','brain','pregnancy'];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface Atlas {version:string;sex:Sex;source:string;scope:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export interface Edition {sex:Sex;label:string;caption:string;manifest:string;dataset:string;summary:string;limits:string;credit:string;licence:string;download:string;supplement?:string;publication?:string;suggestions:string[];hidden:SystemId[]}
export const EDITIONS:Edition[] = [
 {sex:'male',label:'Male',caption:'ADULT HUMAN · MALE',manifest:'/models/atlas.json',dataset:'BodyParts3D 4.0',summary:'2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.',limits:'A whole-body reference covering every modeled system, built from MRI and anatomical illustration. Named concepts can contain multiple pieces; each source mesh is rendered once.',credit:'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.',licence:'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',download:'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html',publication:'https://academic.oup.com/nar/article/37/suppl_1/D782/1000752',suggestions:['heart','brain','liver','stomach','spleen','pancreas','urinary bladder','trachea'],hidden:['brain','integumentary','pregnancy']},
 {sex:'female',label:'Female',caption:'ADULT HUMAN · FEMALE',manifest:'/models/atlas-female.json',dataset:'Human Reference Atlas female v1.10',summary:'964 individual meshes and 1,173 named concepts from the official HRA female reference, with eight pelvic structures retained from v1.5.',limits:'A complete-body orientation shell with selected organs and incomplete skeletal and muscular coverage. The translucent surface is shown by default so the female edition reads as a whole body while its available internal layers remain visible. It does not represent every human structure or variation; pregnancy reference structures stay hidden until enabled.',credit:'3D Reference Organ Set for Female v1.10 by Kristen Browne and Heidi Schlehlein, HuBMAP Human Reference Atlas, built on the Visible Human Dataset of the U.S. National Library of Medicine. The eight carried-over pelvic structures are from the same reference body’s v1.5 release. Licensed under CC Attribution 4.0 International.',licence:'https://creativecommons.org/licenses/by/4.0/',download:'https://humanatlas.io/3d-reference-library',supplement:'https://lod.humanatlas.io/ref-organ/united-female/v1.5',publication:'https://doi.org/10.1038/s41597-022-01905-2',suggestions:['heart','brain','uterus','ovary','liver','kidney','mammary gland'],hidden:['pregnancy']},
];
export const edition=(sex:Sex)=>EDITIONS.find(item=>item.sex===sex)??EDITIONS[0];
export const defaultVisible=(sex:Sex):SystemId[]=>DEFAULT_VISIBLE.filter(id=>!edition(sex).hidden.includes(id));
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','brain','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','integumentary','pregnancy','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
 'liver':'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
 'brain':'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
 'stomach':'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
 'spleen':'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
 'pancreas':'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
 'urinary bladder':'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
 'trachea':'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
 'diaphragm':'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
 'kidney':'A paired organ in the back of the abdomen. It filters blood, adjusts fluid and electrolyte balance, and drains urine through the renal pelvis into the ureter.',
 'uterus':'A muscular pelvic organ that receives an embryo from the uterine tube, houses and nourishes a developing fetus, and contracts during birth.',
 'ovary':'The paired female gonad. It holds the ovarian follicles, releases an oocyte in each cycle, and produces oestrogen and progesterone.',
 'fallopian tube':'The paired tube carrying an oocyte from the ovary toward the uterus. Fertilization normally takes place along its length.',
 'vagina':'The muscular canal between the cervix and the vulva. It carries menstrual flow and forms the birth canal.',
 'cervix':'The lower, narrow part of the uterus opening into the vagina. Its canal and mucus change across the cycle and dilate during labour.',
 'mammary gland':'The glandular tissue of the breast. Its lobes drain through lactiferous ducts to the nipple and produce milk after childbirth.',
 'placenta':'The organ formed in pregnancy at the wall of the uterus. It exchanges oxygen, nutrients, and waste between the pregnant person and the fetus.',
 'umbilical cord':'The cord linking the fetus to the placenta. Its vein carries oxygenated blood to the fetus and its two arteries carry blood back.',
};
export function explanation(name:string,system:SystemId){return EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
