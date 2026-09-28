const K='issk_demo_v1';
const seed={users:[{id:'u-admin',login:'admin',password:'12345678',firstName:'Administrator',lastName:'Systemu',email:'admin@example.invalid',role:'admin',active:true,tramPermission:true},{id:'u-k',login:'koordynator',password:'12345678',firstName:'Anna',lastName:'Koordynator',email:'koord@example.invalid',role:'coordinator',active:true,tramPermission:true},{id:'u-c',login:'konduktor',password:'12345678',firstName:'Jan',lastName:'Konduktor',email:'kon@example.invalid',role:'conductor',active:true,tramPermission:false}],invites:[],registrations:[],announcements:[],days:{},session:null};
export function load(){let x;try{x=JSON.parse(localStorage.getItem(K))}catch{};if(!x){x=structuredClone(seed);save(x);return x}
for(const u of x.users||[]){if(['u-admin','u-k','u-c'].includes(u.id)&&u.password==='1234')u.password='12345678';if(typeof u.tramPermission!=='boolean')u.tramPermission=u.role!=='conductor'}
if(!Array.isArray(x.announcements))x.announcements=[];
// Usunięcie starego demonstracyjnego komunikatu.
x.announcements=x.announcements.filter(a=>a.title!=='Uruchomienie wersji demonstracyjnej');
if(!Array.isArray(x.registrations))x.registrations=[];
for(const day of Object.values(x.days||{})){if(typeof day.firstCome!=='boolean')day.firstCome=false;if(!Array.isArray(day.reserve))day.reserve=[];if(!day.coordination)day.coordination={};for(const t of ['tram','bus'])if(!day.coordination[t])day.coordination[t]={enabled:t==='tram'?!!day.tram:!!day.bus,userId:'',manual:''};(day.services||[]).forEach((svc,i)=>{if(typeof svc.order!=='number')svc.order=i;if(!Array.isArray(svc.applications))svc.applications=[];if(!Array.isArray(svc.assigned))svc.assigned=[];if(!Array.isArray(svc.rejected))svc.rejected=[];if(!Array.isArray(svc.withdrawnAssigned))svc.withdrawnAssigned=[];if(!Array.isArray(svc.manualAssigned))svc.manualAssigned=[];if(!svc.changePlace)svc.changePlace=''})}save(x);return x}
export function save(x){localStorage.setItem(K,JSON.stringify(x))}
export function uid(p='id'){return p+'-'+crypto.getRandomValues(new Uint32Array(2)).join('-')}
export function current(){const d=load();return d.users.find(u=>u.id===d.session)||null}
export function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
export function dateKey(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
export function mins(a,b){const [h1,m1]=a.split(':').map(Number),[h2,m2]=b.split(':').map(Number);let n=(h2*60+m2)-(h1*60+m1);if(n<0)n+=1440;return n}
