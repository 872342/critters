import{F as a,s as y,G as m,H as q,I as w}from"./index-27d95453.js";const o=[];function z(n,i){return{subscribe:A(n,i).subscribe}}function A(n,i=a){let u;const t=new Set;function f(e){if(y(n,e)&&(n=e,u)){const r=!o.length;for(const s of t)s[1](),o.push(s,n);if(r){for(let s=0;s<o.length;s+=2)o[s][0](o[s+1]);o.length=0}}}function l(e){f(e(n))}function b(e,r=a){const s=[e,r];return t.add(s),t.size===1&&(u=i(f)||a),e(n),()=>{t.delete(s),t.size===0&&(u(),u=null)}}return{set:f,update:l,subscribe:b}}function F(n,i,u){const t=!Array.isArray(n),f=t?[n]:n,l=i.length<2;return z(u,b=>{let e=!1;const r=[];let s=0,d=a;const g=()=>{if(s)return;d();const c=i(t?r[0]:r,b);l?b(c):d=w(c)?c:a},_=f.map((c,p)=>m(c,h=>{r[p]=h,s&=~(1<<p),e&&g()},()=>{s|=1<<p}));return e=!0,g(),function(){q(_),d()}})}export{F as d,z as r,A as w};
