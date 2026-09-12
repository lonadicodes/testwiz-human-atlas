/** Display naming and system grouping for the official Human Reference Atlas
 * female source. Grouping follows source hierarchy instead of name guesses. */
const SOURCE_SYSTEMS=[
 ['VH_F_digestive_system','digestive'],['VH_F_respiratory_system','respiratory'],
 ['VH_F_urinary_system','urinary'],['VH_F_reproductive_system','reproductive'],
 ['VH_F_lymphatic_system','lymphatic'],['VH_F_muscular_system','muscular'],
 ['VH_F_nervous_system','nervous'],['VH_F_integumentary_system','integumentary'],
];
const JOINT_TISSUE=/ligament|meniscus|cartilage|enthesis|perichondular|intervertebral_disk|nucleus_pulposus/;
const BONE_GROUPS=['VH_F_skeletal_system','VH_F_lower_limb'];
/** Pelvic structures retained from the same reference body's v1.5 release. */
export const CARRIED_OVER=new Set(['VH_F_ischium','VH_F_pubis']);
const VENOUS=/_vein|_veins|vena_cava|coronary_sinus/;
export function classify(name,ancestry){
 const path=ancestry.join('/');
 if(path.includes('VH_F_placenta'))return 'pregnancy';
 if(path.includes('VH_F_eyes'))return 'sensory';
 if(path.includes('Allen_brain'))return 'brain';
 if(path.includes('VH_F_heart'))return 'cardiac';
 if(path.includes('VH_F_blood_vasculature')||path.includes('VH_F_circulatory_system'))return VENOUS.test(name)?'venous':'arterial';
 if(BONE_GROUPS.some(group=>path.includes(group)))return JOINT_TISSUE.test(name)?'connective':'skeletal';
 for(const [node,system] of SOURCE_SYSTEMS)if(path.includes(node))return system;
 return 'connective';
}
const PREFIX=/^(VH_F|VH|Allen|Yao)(_|$)/;
const EXPANSION={inf:'inferior',sup:'superior',ant:'anterior',pos:'posterior',med:'medial',lat:'lateral',antlat:'anterolateral',posmed:'posteromedial'};
const SPELLING={fibria:'fimbriae',jejenum:'jejunum',eigth:'eighth',opthalmic:'ophthalmic',heptopancreatic:'hepatopancreatic',hepataduodenal:'hepatoduodenal',ucinate:'uncinate',schlemms:"Schlemm's",segm:'segment',segmennt:'segment',segmt:'segment'};
export function label(raw){
 let tokens=raw.replace(PREFIX,'').split('_').filter(Boolean),side='',enumerator='';
 const takeEnumerator=()=>{if(tokens.length>1&&/^[a-z]$/.test(tokens[tokens.length-1]))enumerator=tokens.pop();};
 takeEnumerator();
 tokens=tokens.filter(token=>{if(token==='L'||token==='R'){side=token==='L'?'left':'right';return false;}return true;});
 if(!enumerator)takeEnumerator();
 const words=tokens.map(token=>{const fixed=SPELLING[token.toLowerCase()]??EXPANSION[token]??token;return fixed.replace(/([A-Za-z])(\d+)$/,'$1 $2');});
 let text=words.join(' ').replace(/\s+/g,' ').trim();
 if(!text)return 'Whole body';
 if(raw.startsWith('Yao_')&&!/lymph/.test(text))text+=' of lymph node';
 text=text.charAt(0).toUpperCase()+text.slice(1);
 if(enumerator)text+=` ${enumerator}`;
 if(side)text+=` (${side})`;
 return text;
}
export const conceptId=raw=>`HRA:${raw.replace(PREFIX,'')||'body'}`;
