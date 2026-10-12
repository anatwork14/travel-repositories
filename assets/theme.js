/* Accessible site-wide theme picker. No external calls or cookies. */
const STORAGE_KEY='travel-notebook-color-theme-v1';
const THEMES=[
  {id:'forest',name:'Forest',description:'Xanh rừng · giấy ấm',colors:['#244b3a','#f8f7f2','#bb6b49']},
  {id:'ocean',name:'Ocean',description:'Xanh biển · cát sáng',colors:['#20536e','#f2f8fb','#dc9760']},
  {id:'sunset',name:'Sunset',description:'Đất nung · kem đào',colors:['#915139','#fff5ed','#ce7852']},
  {id:'lavender',name:'Lavender',description:'Tím khói · hồng nhạt',colors:['#655583','#f9f5fc','#aa7299']},
  {id:'sakura',name:'Sakura',description:'Hồng anh đào · mực trà',colors:['#8e5361','#fff7f5','#cc8190']},
  {id:'midnight',name:'Midnight',description:'Xanh đen · vàng cát',colors:['#18333a','#15242b','#e0b875']}
];
const safeId=x=>THEMES.some(t=>t.id===x)?x:'forest';
function stored(){try{return safeId(localStorage.getItem(STORAGE_KEY));}catch{return 'forest';}}
function theme(){return safeId(document.documentElement.dataset.colorTheme||stored());}
function updateMeta(id){const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',id==='midnight'?'#15242b':id==='ocean'?'#f2f8fb':id==='lavender'?'#f9f5fc':id==='sakura'?'#fff7f5':id==='sunset'?'#fff5ed':'#f8f7f2');}
function draw(){
 const current=theme();
 const panel=document.querySelector('#theme-panel');
 if(panel){
   panel.querySelectorAll('[data-theme-choice]').forEach(b=>{
     const picked=b.dataset.themeChoice===current;
     b.setAttribute('aria-pressed',String(picked));
     b.classList.toggle('chosen',picked);
   });
 }
 const label=document.querySelector('#theme-trigger-label');
 if(label)label.textContent=THEMES.find(t=>t.id===current).name;
 updateMeta(current);
}
function setTheme(id){
 const current=safeId(id);document.documentElement.dataset.colorTheme=current;
 try{localStorage.setItem(STORAGE_KEY,current);}catch{}
 draw();
}
function panelMarkup(){
 return '<div class="theme-panel-head"><div><strong>Chọn bảng màu</strong><p>Đổi ngay toàn bộ website · ghi nhớ trên thiết bị</p></div><button class="theme-close" type="button" aria-label="Đóng bảng màu">×</button></div>'+
 '<div class="theme-options" role="group" aria-label="Các bảng màu">'+THEMES.map(t=>
  '<button type="button" class="theme-choice" data-theme-choice="'+t.id+'" aria-pressed="false">'+
  '<span class="theme-swatches"><i style="background:'+t.colors[0]+'"></i><i style="background:'+t.colors[1]+'"></i><i style="background:'+t.colors[2]+'"></i></span>'+
  '<span class="theme-option-copy"><strong>'+t.name+'</strong><small>'+t.description+'</small></span><span class="theme-check" aria-hidden="true">✓</span></button>'
 ).join('')+'</div><p class="theme-privacy">Không cần tài khoản, không gửi sở thích màu lên máy chủ. Nhấn Esc để đóng.</p>';
}
function init(){
 if(document.getElementById('theme-switcher'))return;
 const header=document.querySelector('.v3-header')||document.querySelector('.lab-nav')||document.querySelector('header');
 if(!header)return;
 const root=document.createElement('div');root.id='theme-switcher';root.className='theme-switcher';
 root.innerHTML='<button class="theme-trigger" id="theme-trigger" type="button" aria-label="Đổi bảng màu" aria-controls="theme-panel" aria-expanded="false"><span class="theme-trigger-icon" aria-hidden="true">◐</span><span id="theme-trigger-label">Forest</span><span aria-hidden="true">⌄</span></button>'+
 '<div id="theme-panel" class="theme-panel" hidden>'+panelMarkup()+'</div>';
 header.append(root);
 const opener=root.querySelector('#theme-trigger'),panel=root.querySelector('#theme-panel');
 const close=()=>{panel.hidden=true;opener.setAttribute('aria-expanded','false');};
 const open=()=>{panel.hidden=false;opener.setAttribute('aria-expanded','true');draw();};
 opener.addEventListener('click',()=>panel.hidden?open():close());
 root.querySelector('.theme-close').addEventListener('click',()=>{close();opener.focus();});
 panel.querySelectorAll('[data-theme-choice]').forEach(button=>{
   button.addEventListener('click',()=>{setTheme(button.dataset.themeChoice);close();opener.focus();});
 });
 document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!root.contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();opener.focus();}});
 window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)setTheme(safeId(e.newValue));});
 draw();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
