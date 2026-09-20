export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac'|'brain'|'pregnancy';
export type Sex = 'male'|'female';
export type RegionId = 'whole-body'|'head-neck'|'thorax'|'abdomen'|'pelvis'|'upper-limb'|'lower-limb';
export const REGIONS:{id:RegionId;label:string;description:string}[]=[
 {id:'whole-body',label:'Whole body',description:'Show the complete reference body.'},
 {id:'head-neck',label:'Head & neck',description:'Focus on the brain, face, neck, and upper airway.'},
 {id:'thorax',label:'Thorax',description:'Focus on the chest, heart, lungs, and mediastinum.'},
 {id:'abdomen',label:'Abdomen',description:'Focus on the abdominal organs and posterior abdominal wall.'},
 {id:'pelvis',label:'Pelvis',description:'Focus on the pelvic organs, vessels, and pelvic floor.'},
 {id:'upper-limb',label:'Upper limb',description:'Focus on the shoulder, arm, forearm, and hand.'},
 {id:'lower-limb',label:'Lower limb',description:'Focus on the hip, thigh, leg, and foot.'},
];
const UPPER_LIMB=/\b(arm|forearm|hand|finger|thumb|humerus|radius|ulna|carpal|metacarp|phalanx|shoulder|scapula|clavicle|deltoid|biceps|triceps|brachial|wrist|elbow)\b/i;
const LOWER_LIMB=/\b(leg|thigh|foot|toe|femur|tibia|fibula|tarsal|metatars|calcane|ankle|knee|patella|quadriceps|hamstring|gastrocnemius|soleus|gluteal|sartorius)\b/i;
export function regionForPart(part:Pick<Part,'name'|'bounds'>):RegionId{
 const name=part.name||'',x=(part.bounds[0][0]+part.bounds[1][0])/2,y=(part.bounds[0][1]+part.bounds[1][1])/2;
 if(UPPER_LIMB.test(name))return 'upper-limb';
 if(LOWER_LIMB.test(name))return 'lower-limb';
 if(y>=1.43)return 'head-neck';
 if(y>=1.08)return 'thorax';
 if(y>=.78)return 'abdomen';
 if(y>=.48)return 'pelvis';
 if(Math.abs(x)>.17&&y>.22)return y>.82?'upper-limb':'lower-limb';
 return 'lower-limb';
}
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
export interface ClinicalNote {location:string;function:string;landmark:string;assessment:string;associations:string}
export const CLINICAL_NOTES:Record<string,ClinicalNote>={
 heart:{location:'Central thorax, between the lungs, behind the sternum.',function:'Pumps blood through the pulmonary and systemic circuits.',landmark:'Apical impulse is usually felt in the left fifth intercostal space at the mid-clavicular line.',assessment:'Relate heart sounds, pulse, blood pressure, and peripheral perfusion to cardiac output.',associations:'Heart failure, arrhythmias, ischemia, and valvular disease.'},
 trachea:{location:'Midline neck and superior thorax, between the larynx and main bronchi.',function:'Maintains an open airway and conducts air to the lungs.',landmark:'The trachea lies anterior to the oesophagus and can be palpated below the cricoid cartilage.',assessment:'Assess airway patency, work of breathing, breath sounds, and tracheal position.',associations:'Airway obstruction, aspiration, intubation, and tracheostomy care.'},
 kidney:{location:'Posterior abdomen, on either side of the vertebral column.',function:'Filters blood and regulates fluid, electrolytes, acid–base balance, and erythropoietin production.',landmark:'The kidneys lie partly under the lower ribs; the costovertebral angle is used for tenderness assessment.',assessment:'Monitor urine output, fluid balance, blood pressure, and renal laboratory results.',associations:'Acute kidney injury, chronic kidney disease, urinary obstruction, and pyelonephritis.'},
 'urinary bladder':{location:'Midline pelvis, behind the pubic symphysis.',function:'Stores urine before voluntary voiding.',landmark:'A distended bladder can rise above the pubic symphysis.',assessment:'Assess voiding pattern, suprapubic discomfort, bladder distension, and catheter drainage.',associations:'Urinary retention, infection, incontinence, and catheter-associated complications.'},
 liver:{location:'Right upper quadrant of the abdomen, beneath the diaphragm.',function:'Processes absorbed nutrients, produces bile, and synthesizes plasma proteins.',landmark:'The lower border may be palpable below the right costal margin during examination.',assessment:'Observe jaundice, abdominal tenderness, nutrition status, and liver-related laboratory changes.',associations:'Hepatitis, cirrhosis, cholestasis, and medication metabolism.'},
 brain:{location:'Within the cranial cavity, continuous with the spinal cord through the foramen magnum.',function:'Integrates sensation, movement, cognition, language, and autonomic regulation.',landmark:'Neurologic examination compares pupils, strength, sensation, speech, and level of consciousness.',assessment:'Trend mental status, pupils, motor responses, sensation, and cranial nerve findings.',associations:'Stroke, seizures, traumatic injury, raised intracranial pressure, and meningitis.'},
 uterus:{location:'Midline pelvis, between the bladder and rectum.',function:'Receives the embryo and supports pregnancy; the myometrium contracts during labour.',landmark:'The fundus is assessed abdominally during pregnancy to estimate gestational growth.',assessment:'Relate bleeding, pelvic pain, uterine tone, and postpartum fundal position to the clinical context.',associations:'Fibroids, endometriosis, pregnancy, postpartum haemorrhage, and uterine infection.'},
 ovary:{location:'Paired pelvic structures lateral to the uterus.',function:'Stores follicles, releases oocytes, and produces ovarian hormones.',landmark:'Ovaries are assessed indirectly through pelvic history and imaging rather than routine palpation.',assessment:'Ask about cycle pattern, pelvic pain, abnormal bleeding, and pregnancy-related symptoms.',associations:'Ovarian cysts, torsion, polycystic ovary syndrome, and ovarian malignancy.'},
 'mammary gland':{location:'Subcutaneous tissue of the anterior chest wall.',function:'Produces and delivers milk through ducts after childbirth.',landmark:'Examination follows a consistent pattern, including the axillary tail and regional lymph nodes.',assessment:'Inspect symmetry and skin changes; assess a new mass, nipple change, or focal tenderness promptly.',associations:'Mastitis, breast abscess, lactation problems, and breast cancer screening.'},
 femur:{location:'The long bone of the thigh between the hip and knee.',function:'Transmits body weight and provides leverage for lower-limb movement.',landmark:'The greater trochanter and femoral pulse region are important surface landmarks.',assessment:'Compare limb alignment, pain, mobility, distal pulses, sensation, and skin temperature after injury.',associations:'Hip fracture, femoral shaft fracture, avascular necrosis, and thromboembolism risk.'},
};
export const clinicalNote=(name:string)=>CLINICAL_NOTES[name.toLowerCase()];
const SEARCH_ALIASES:Record<string,string[]>={
 trachea:['windpipe','airway'],
 'fallopian tube':['uterine tube','oviduct'],
 'mammary gland':['breast','breast tissue'],
 larynx:['voice box'],
 oesophagus:['esophagus','food pipe','gullet'],
 pharynx:['throat'],
 patella:['kneecap'],
 scapula:['shoulder blade'],
 clavicle:['collarbone'],
 pelvis:['hip bone'],
};
export function conceptMatches(concept:Concept,query:string){
 const q=query.toLowerCase().trim();if(!q)return true;
 if(concept.name.toLowerCase().includes(q)||concept.id.toLowerCase().includes(q))return true;
 return Object.entries(SEARCH_ALIASES).some(([canonical,aliases])=>aliases.some(alias=>alias.includes(q)||q.includes(alias))&&(concept.name.toLowerCase().includes(canonical)||aliases.some(alias=>concept.name.toLowerCase().includes(alias))));
}
export interface Atlas {version:string;sex:Sex;source:string;scope:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export interface Edition {sex:Sex;label:string;caption:string;manifest:string;dataset:string;summary:string;limits:string;credit:string;licence:string;download:string;supplement?:string;publication?:string;suggestions:string[];hidden:SystemId[]}
export const EDITIONS:Edition[] = [
 {sex:'male',label:'Male',caption:'ADULT HUMAN · MALE',manifest:'/models/atlas.json',dataset:'BodyParts3D 4.0',summary:'2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.',limits:'A whole-body reference covering every modeled system, built from MRI and anatomical illustration. Named concepts can contain multiple pieces; each source mesh is rendered once.',credit:'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.',licence:'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',download:'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html',publication:'https://academic.oup.com/nar/article/37/suppl_1/D782/1000752',suggestions:['heart','brain','liver','stomach','spleen','pancreas','urinary bladder','trachea'],hidden:['brain','integumentary','pregnancy']},
 {sex:'female',label:'Female',caption:'ADULT HUMAN · FEMALE',manifest:'/models/atlas-female.json',dataset:'Human Reference Atlas female v1.10',summary:'964 individual meshes and 1,173 named concepts from the official HRA female reference, with eight pelvic structures retained from v1.5.',limits:'A complete-body orientation shell with selected organs and incomplete skeletal and muscular coverage. The translucent surface is shown by default so the female edition reads as a whole body while its available internal layers remain visible. It does not represent every human structure or variation; pregnancy reference structures stay hidden until enabled.',credit:'3D Reference Organ Set for Female v1.10 by Kristen Browne and Heidi Schlehlein, HuBMAP Human Reference Atlas, built on the Visible Human Dataset of the U.S. National Library of Medicine. The eight carried-over pelvic structures are from the same reference body’s v1.5 release. Licensed under CC Attribution 4.0 International.',licence:'https://creativecommons.org/licenses/by/4.0/',download:'https://humanatlas.io/3d-reference-library',supplement:'https://lod.humanatlas.io/ref-organ/united-female/v1.5',publication:'https://doi.org/10.1038/s41597-022-01905-2',suggestions:['heart','brain','uterus','ovary','liver','kidney','mammary gland'],hidden:['pregnancy']},
];
export const edition=(sex:Sex)=>EDITIONS.find(item=>item.sex===sex)??EDITIONS[0];
export const defaultVisible=(sex:Sex):SystemId[]=>DEFAULT_VISIBLE.filter(id=>!edition(sex).hidden.includes(id));
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];hidden:string[];isolate:boolean;view:View;rotate:boolean;reset:number;surfaceOpacity:number;region:RegionId;focus:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','brain','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','integumentary','pregnancy','connective'];
export type LearningPresetId = 'overview'|'circulation'|'nervous'|'digestive'|'reproductive';
export interface LearningPreset {id:LearningPresetId;label:string;description:string;systems:SystemId[]}
export const LEARNING_PRESETS:LearningPreset[] = [
 {id:'overview',label:'Overview',description:'Return to the edition’s standard teaching view.',systems:DEFAULT_VISIBLE},
 {id:'circulation',label:'Circulation',description:'Show the heart, arteries, and veins.',systems:['cardiac','arterial','venous']},
 {id:'nervous',label:'Nervous system',description:'Show the brain, nerves, and sensory organs.',systems:['nervous','brain','sensory']},
 {id:'digestive',label:'Digestive system',description:'Show the digestive system.',systems:['digestive']},
 {id:'reproductive',label:'Reproductive system',description:'Show the reproductive system.',systems:['reproductive']},
];
export interface PathwayStep {title:string;prompt:string;structure?:string;systems:SystemId[]}
export interface ClinicalPathway {id:string;label:string;description:string;steps:PathwayStep[]}
export const CLINICAL_PATHWAYS:ClinicalPathway[]=[
 {id:'blood-flow',label:'Blood flow',description:'Follow blood from the heart through the body and back again.',steps:[
  {title:'Pump',prompt:'Start at the heart, the pump that drives both circuits.',structure:'heart',systems:['cardiac']},
  {title:'Outflow',prompt:'Trace arteries as they carry blood away from the heart.',systems:['cardiac','arterial']},
  {title:'Exchange',prompt:'Explore the organs supplied by the systemic circulation.',systems:['arterial','digestive','respiratory','urinary','nervous']},
  {title:'Return',prompt:'Finish with veins returning blood toward the heart.',systems:['cardiac','venous']},
 ]},
 {id:'airway',label:'Air pathway',description:'Trace the route of air from the upper airway to the lungs.',steps:[
  {title:'Entry',prompt:'Find the upper airway where inhaled air enters.',structure:'pharynx',systems:['respiratory','sensory']},
  {title:'Conduction',prompt:'Follow the trachea as it conducts air toward the chest.',structure:'trachea',systems:['respiratory']},
  {title:'Exchange',prompt:'Explore the lungs and the diaphragm that powers ventilation.',systems:['respiratory','muscular']},
 ]},
 {id:'digestion',label:'Digestion',description:'Follow food through the digestive tract and its accessory organs.',steps:[
  {title:'Process',prompt:'Begin where food is chewed and mixed with saliva.',systems:['digestive']},
  {title:'Stomach',prompt:'Find the stomach, which mixes food with acid and enzymes.',structure:'stomach',systems:['digestive']},
  {title:'Absorb',prompt:'Explore the small intestine and the organs that support absorption.',systems:['digestive','endocrine']},
  {title:'Support',prompt:'Locate the liver and pancreas, key accessory digestive organs.',systems:['digestive','endocrine']},
 ]},
 {id:'urinary-flow',label:'Urinary flow',description:'Follow urine formation, drainage, storage, and elimination.',steps:[
  {title:'Filter',prompt:'Start at the kidneys, which filter blood and regulate fluid balance.',structure:'kidney',systems:['urinary','endocrine']},
  {title:'Drain',prompt:'Trace the ureters as they carry urine toward the pelvis.',systems:['urinary']},
  {title:'Store',prompt:'Find the urinary bladder, the temporary urine reservoir.',structure:'urinary bladder',systems:['urinary']},
 ]},
 {id:'reproductive-health',label:'Pelvic anatomy',description:'Explore key female reproductive structures and their relationships.',steps:[
  {title:'Gonad',prompt:'Locate the ovary and its role in oocyte and hormone production.',structure:'ovary',systems:['reproductive','endocrine']},
  {title:'Uterus',prompt:'Find the uterus, the muscular organ that supports pregnancy.',structure:'uterus',systems:['reproductive']},
  {title:'Passage',prompt:'Trace the reproductive tract toward the vagina.',structure:'vagina',systems:['reproductive']},
 ]},
 {id:'cranial-nerves',label:'Cranial nerves',description:'Use the brain and sensory systems to review cranial nerve pathways.',steps:[
  {title:'Origin',prompt:'Begin with the brain, where central processing starts.',structure:'brain',systems:['brain','nervous']},
  {title:'Sensation',prompt:'Explore sensory organs that receive visual, auditory, and balance signals.',systems:['brain','nervous','sensory']},
  {title:'Pathways',prompt:'Follow the nervous system as it carries signals beyond the brain.',systems:['brain','nervous']},
 ]},
];
export interface AnatomyQaQuestion {id:string;prompt:string;options:string[];answer:string;rationale:string}
export const ENTITY_QA_BANK:Record<string,AnatomyQaQuestion[]>={
 heart:[
  {id:'heart-circuit',prompt:'Which circulation does the right side of the heart primarily serve?',options:['Pulmonary circulation','Systemic circulation','Portal circulation','Lymphatic circulation'],answer:'Pulmonary circulation',rationale:'The right ventricle pumps deoxygenated blood through the pulmonary arteries to the lungs.'},
  {id:'heart-assessment',prompt:'Which bedside finding is most directly related to cardiac output?',options:['Peripheral perfusion','Visual acuity','Bowel sounds','Skin turgor only'],answer:'Peripheral perfusion',rationale:'Pulse quality, blood pressure, capillary refill, and skin temperature help assess forward flow and perfusion.'},
 ],
 kidney:[
  {id:'kidney-role',prompt:'Which process is a core function of the kidney?',options:['Filtering blood and regulating fluid balance','Producing bile for fat digestion','Conducting air to the lungs','Storing food before digestion'],answer:'Filtering blood and regulating fluid balance',rationale:'The kidneys filter plasma and adjust water, electrolytes, acid–base status, and waste excretion.'},
  {id:'kidney-landmark',prompt:'Where is renal angle tenderness assessed?',options:['Costovertebral angle','Left fifth intercostal space','Suprasternal notch','Popliteal fossa'],answer:'Costovertebral angle',rationale:'The costovertebral angle overlies the kidneys and is assessed for tenderness when renal inflammation is suspected.'},
 ],
 trachea:[
  {id:'trachea-role',prompt:'What is the trachea’s main role?',options:['Conduct air while keeping the airway open','Exchange oxygen directly with blood','Pump blood to the lungs','Store urine'],answer:'Conduct air while keeping the airway open',rationale:'Cartilaginous rings support the trachea as air moves between the larynx and main bronchi.'},
  {id:'trachea-relation',prompt:'Which structure lies immediately posterior to the trachea?',options:['Oesophagus','Sternum','Thyroid cartilage','Clavicle'],answer:'Oesophagus',rationale:'The oesophagus runs posterior to the trachea through the neck and superior thorax.'},
 ],
 liver:[
  {id:'liver-location',prompt:'Where is most of the liver located?',options:['Right upper quadrant','Left lower quadrant','Posterior pelvis','Mediastinum'],answer:'Right upper quadrant',rationale:'The liver lies beneath the diaphragm, mostly in the right upper quadrant with a portion crossing the midline.'},
  {id:'liver-function',prompt:'Which is a liver function?',options:['Producing bile and plasma proteins','Storing urine','Generating nerve impulses','Moving air into alveoli'],answer:'Producing bile and plasma proteins',rationale:'The liver produces bile, processes absorbed nutrients, and synthesizes many circulating proteins.'},
 ],
 brain:[
  {id:'brain-role',prompt:'Which assessment best reflects brain function?',options:['Level of consciousness and pupil responses','Urine colour alone','Ankle range of motion alone','Bowel frequency alone'],answer:'Level of consciousness and pupil responses',rationale:'Neurologic assessment trends consciousness, pupils, speech, strength, sensation, and cranial nerve findings.'},
  {id:'brain-location',prompt:'Where is the brain housed?',options:['Cranial cavity','Thoracic cavity','Abdominal cavity','Pelvic cavity'],answer:'Cranial cavity',rationale:'The brain occupies the cranial cavity and continues with the spinal cord through the foramen magnum.'},
 ],
 uterus:[
  {id:'uterus-role',prompt:'What is the uterus’s primary reproductive role?',options:['Receive and support an embryo or fetus','Release urine from the bladder','Produce bile','Exchange gases with blood'],answer:'Receive and support an embryo or fetus',rationale:'The uterus receives the embryo, supports gestation, and its myometrium contracts during labour.'},
  {id:'uterus-landmark',prompt:'Which part of the uterus is assessed abdominally during pregnancy?',options:['Fundus','Ureter','Ovary','Vulva'],answer:'Fundus',rationale:'Fundal height is a surface measurement used to follow gestational growth in context.'},
 ],
 ovary:[
  {id:'ovary-role',prompt:'What does the ovary do?',options:['Stores follicles and produces ovarian hormones','Filters blood into urine','Conducts air to the lungs','Pumps blood through arteries'],answer:'Stores follicles and produces ovarian hormones',rationale:'The ovary contains follicles, releases oocytes, and produces hormones including oestrogen and progesterone.'},
 ],
 'urinary bladder':[
  {id:'bladder-role',prompt:'What is the urinary bladder’s role?',options:['Store urine before voiding','Filter plasma','Produce insulin','Exchange oxygen'],answer:'Store urine before voiding',rationale:'The muscular bladder temporarily stores urine delivered by the ureters until voluntary emptying.'},
 ],
 femur:[
  {id:'femur-location',prompt:'Where is the femur located?',options:['Thigh','Forearm','Neck','Chest'],answer:'Thigh',rationale:'The femur is the long bone between the hip and knee and transmits body weight.'},
 ],
 'mammary gland':[
  {id:'mammary-role',prompt:'What is the mammary gland’s main function after childbirth?',options:['Produce and deliver milk','Filter urine','Control pupil size','Move the knee'],answer:'Produce and deliver milk',rationale:'Glandular breast tissue produces milk that drains through ducts to the nipple.'},
 ],
};
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
