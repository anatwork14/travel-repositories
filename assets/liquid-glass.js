/* Travel Notebook Liquid Glass: progressive, restrained highlight tracking.
 * No animation loop, scroll listener, tracking, telemetry or injected canvas.
 * Simulates a small localized specular reflection, not native optical refraction.
 */
(() => {
 const fine = window.matchMedia?.('(pointer: fine) and (prefers-reduced-motion: no-preference)');
 if(!fine?.matches) return;
 let pending = false, last = null;
 const selector = '.v3-hero-search,.v3-filters,.v3-moods,.theme-trigger,.theme-panel,body[data-page="city"] .guide-toolbar';
 const paint = () => {
  pending = false;
  if(!last) return;
  const {item, x, y} = last;
  if(!item.isConnected) return;
  const rect = item.getBoundingClientRect();
  if(rect.width<1 || rect.height<1) return;
  const px = Math.max(0, Math.min(100, 100 * (x-rect.left)/rect.width));
  const py = Math.max(0, Math.min(100, 100 * (y-rect.top)/rect.height));
  item.style.setProperty('--lg-x', px.toFixed(1)+'%');
  item.style.setProperty('--lg-y', py.toFixed(1)+'%');
 };
 document.addEventListener('pointermove', e => {
  const item=e.target instanceof Element ? e.target.closest(selector) : null;
  if(!item) return;
  last={item,x:e.clientX,y:e.clientY};
  if(!pending){pending=true;requestAnimationFrame(paint);}
 },{passive:true});
 document.addEventListener('pointerout',e=>{
  const el=e.target instanceof Element ? e.target.closest(selector) : null;
  if(el && !el.contains(e.relatedTarget)) {
    el.style.removeProperty('--lg-x');
    el.style.removeProperty('--lg-y');
  }
 },{passive:true});
})();
