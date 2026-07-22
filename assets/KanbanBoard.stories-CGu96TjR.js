import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{A as n,C as r,D as i,E as a,I as o,J as s,K as c,L as l,M as u,N as d,O as f,P as p,Q as m,U as h,V as g,W as _,X as v,Z as y,c as b,f as x,i as S,j as C,k as w,q as T,s as E,t as D,x as ee,y as O}from"./iframe-Bb8mcAY9.js";import{t as k}from"./createSvgIcon-CmGEPqU-.js";import{n as A,t as j}from"./muiTsClasses-B0c6njAh.js";import{n as M,t as te}from"./Add-DetvY5lx.js";import{n as ne,t as N}from"./Delete-Bf4asqrk.js";import{n as re,t as ie}from"./Search-COSJ8gaA.js";import{n as P,t as F}from"./Close-_25kxp1f.js";function ae(){var e=[...arguments];return(0,B.useMemo)(()=>t=>{e.forEach(e=>e(t))},e)}function I(e){let t=Object.prototype.toString.call(e);return t===`[object Window]`||t===`[object global]`}function oe(e){return`nodeType`in e}function L(e){return e?I(e)?e:oe(e)?e.ownerDocument?.defaultView??window:window:window}function R(e){let{Document:t}=L(e);return e instanceof t}function se(e){return I(e)?!1:e instanceof L(e).HTMLElement}function ce(e){return e instanceof L(e).SVGElement}function le(e){return e?I(e)?e.document:oe(e)?R(e)?e:se(e)||ce(e)?e.ownerDocument:document:document:document}function ue(e){let t=(0,B.useRef)(e);return Ce(()=>{t.current=e}),(0,B.useCallback)(function(){var e=[...arguments];return t.current==null?void 0:t.current(...e)},[])}function de(){let e=(0,B.useRef)(null);return[(0,B.useCallback)((t,n)=>{e.current=setInterval(t,n)},[]),(0,B.useCallback)(()=>{e.current!==null&&(clearInterval(e.current),e.current=null)},[])]}function fe(e,t){t===void 0&&(t=[e]);let n=(0,B.useRef)(e);return Ce(()=>{n.current!==e&&(n.current=e)},t),n}function z(e,t){let n=(0,B.useRef)();return(0,B.useMemo)(()=>{let t=e(n.current);return n.current=t,t},[...t])}function pe(e){let t=ue(e),n=(0,B.useRef)(null);return[n,(0,B.useCallback)(e=>{e!==n.current&&t?.(e,n.current),n.current=e},[])]}function me(e){let t=(0,B.useRef)();return(0,B.useEffect)(()=>{t.current=e},[e]),t.current}function he(e,t){return(0,B.useMemo)(()=>{if(t)return t;let n=we[e]==null?0:we[e]+1;return we[e]=n,e+`-`+n},[e,t])}function ge(e){return function(t){return[...arguments].slice(1).reduce((t,n)=>{let r=Object.entries(n);for(let[n,i]of r){let r=t[n];r!=null&&(t[n]=r+e*i)}return t},{...t})}}function _e(e){return`clientX`in e&&`clientY`in e}function ve(e){if(!e)return!1;let{KeyboardEvent:t}=L(e.target);return t&&e instanceof t}function ye(e){if(!e)return!1;let{TouchEvent:t}=L(e.target);return t&&e instanceof t}function be(e){if(ye(e)){if(e.touches&&e.touches.length){let{clientX:t,clientY:n}=e.touches[0];return{x:t,y:n}}else if(e.changedTouches&&e.changedTouches.length){let{clientX:t,clientY:n}=e.changedTouches[0];return{x:t,y:n}}}return _e(e)?{x:e.clientX,y:e.clientY}:null}function xe(e){return e.matches(De)?e:e.querySelector(De)}var B,Se,Ce,we,Te,V,Ee,De,Oe=e((()=>{B=t(m()),Se=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ce=Se?B.useLayoutEffect:B.useEffect,we={},Te=ge(1),V=ge(-1),Ee=Object.freeze({Translate:{toString(e){if(!e)return;let{x:t,y:n}=e;return`translate3d(`+(t?Math.round(t):0)+`px, `+(n?Math.round(n):0)+`px, 0)`}},Scale:{toString(e){if(!e)return;let{scaleX:t,scaleY:n}=e;return`scaleX(`+t+`) scaleY(`+n+`)`}},Transform:{toString(e){if(e)return[Ee.Translate.toString(e),Ee.Scale.toString(e)].join(` `)}},Transition:{toString(e){let{property:t,duration:n,easing:r}=e;return t+` `+n+`ms `+r}}}),De=`a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]`}));function ke(e){let{id:t,value:n}=e;return Me.createElement(`div`,{id:t,style:Ne},n)}function Ae(e){let{id:t,announcement:n,ariaLiveType:r=`assertive`}=e;return Me.createElement(`div`,{id:t,style:{position:`fixed`,top:0,left:0,width:1,height:1,margin:-1,border:0,padding:0,overflow:`hidden`,clip:`rect(0 0 0 0)`,clipPath:`inset(100%)`,whiteSpace:`nowrap`},role:`status`,"aria-live":r,"aria-atomic":!0},n)}function je(){let[e,t]=(0,Me.useState)(``);return{announce:(0,Me.useCallback)(e=>{e!=null&&t(e)},[]),announcement:e}}var Me,Ne,Pe=e((()=>{Me=t(m()),Ne={display:`none`}}));function Fe(e){let t=(0,H.useContext)(sn);(0,H.useEffect)(()=>{if(!t)throw Error(`useDndMonitor must be used within a children of <DndContext>`);return t(e)},[e,t])}function Ie(){let[e]=(0,H.useState)(()=>new Set),t=(0,H.useCallback)(t=>(e.add(t),()=>e.delete(t)),[e]);return[(0,H.useCallback)(t=>{let{type:n,event:r}=t;e.forEach(e=>e[n]?.call(e,r))},[e]),t]}function Le(e){let{announcements:t=ln,container:n,hiddenTextDescribedById:r,screenReaderInstructions:i=cn}=e,{announce:a,announcement:o}=je(),s=he(`DndLiveRegion`),[c,l]=(0,H.useState)(!1);if((0,H.useEffect)(()=>{l(!0)},[]),Fe((0,H.useMemo)(()=>({onDragStart(e){let{active:n}=e;a(t.onDragStart({active:n}))},onDragMove(e){let{active:n,over:r}=e;t.onDragMove&&a(t.onDragMove({active:n,over:r}))},onDragOver(e){let{active:n,over:r}=e;a(t.onDragOver({active:n,over:r}))},onDragEnd(e){let{active:n,over:r}=e;a(t.onDragEnd({active:n,over:r}))},onDragCancel(e){let{active:n,over:r}=e;a(t.onDragCancel({active:n,over:r}))}}),[a,t])),!c)return null;let u=H.createElement(H.Fragment,null,H.createElement(ke,{id:r,value:i.draggable}),H.createElement(Ae,{id:s,announcement:o}));return n?(0,on.createPortal)(u,n):u}function Re(){}function ze(e,t){return(0,H.useMemo)(()=>({sensor:e,options:t??{}}),[e,t])}function Be(){var e=[...arguments];return(0,H.useMemo)(()=>[...e].filter(e=>e!=null),[...e])}function Ve(e,t){return Math.sqrt((e.x-t.x)**2+(e.y-t.y)**2)}function He(e,t){let n=be(e);if(!n)return`0 0`;let r={x:(n.x-t.left)/t.width*100,y:(n.y-t.top)/t.height*100};return r.x+`% `+r.y+`%`}function Ue(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return n-r}function We(e,t){let{data:{value:n}}=e,{data:{value:r}}=t;return r-n}function Ge(e){let{left:t,top:n,height:r,width:i}=e;return[{x:t,y:n},{x:t+i,y:n},{x:t,y:n+r},{x:t+i,y:n+r}]}function Ke(e,t){if(!e||e.length===0)return null;let[n]=e;return t?n[t]:n}function qe(e,t){let n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),i=Math.min(t.left+t.width,e.left+e.width),a=Math.min(t.top+t.height,e.top+e.height),o=i-r,s=a-n;if(r<i&&n<a){let n=t.width*t.height,r=e.width*e.height,i=o*s,a=i/(n+r-i);return Number(a.toFixed(4))}return 0}function Je(e,t,n){return{...e,scaleX:t&&n?t.width/n.width:1,scaleY:t&&n?t.height/n.height:1}}function Ye(e,t){return e&&t?{x:e.left-t.left,y:e.top-t.top}:un}function Xe(e){return function(t){return[...arguments].slice(1).reduce((t,n)=>({...t,top:t.top+e*n.y,bottom:t.bottom+e*n.y,left:t.left+e*n.x,right:t.right+e*n.x}),{...t})}}function Ze(e){if(e.startsWith(`matrix3d(`)){let t=e.slice(9,-1).split(/, /);return{x:+t[12],y:+t[13],scaleX:+t[0],scaleY:+t[5]}}else if(e.startsWith(`matrix(`)){let t=e.slice(7,-1).split(/, /);return{x:+t[4],y:+t[5],scaleX:+t[0],scaleY:+t[3]}}return null}function Qe(e,t,n){let r=Ze(t);if(!r)return e;let{scaleX:i,scaleY:a,x:o,y:s}=r,c=e.left-o-(1-i)*parseFloat(n),l=e.top-s-(1-a)*parseFloat(n.slice(n.indexOf(` `)+1)),u=i?e.width/i:e.width,d=a?e.height/a:e.height;return{width:u,height:d,top:l,right:c+u,bottom:l+d,left:c}}function $e(e,t){t===void 0&&(t=mn);let n=e.getBoundingClientRect();if(t.ignoreTransform){let{transform:t,transformOrigin:r}=L(e).getComputedStyle(e);t&&(n=Qe(n,t,r))}let{top:r,left:i,width:a,height:o,bottom:s,right:c}=n;return{top:r,left:i,width:a,height:o,bottom:s,right:c}}function et(e){return $e(e,{ignoreTransform:!0})}function tt(e){let t=e.innerWidth,n=e.innerHeight;return{top:0,left:0,right:t,bottom:n,width:t,height:n}}function nt(e,t){return t===void 0&&(t=L(e).getComputedStyle(e)),t.position===`fixed`}function rt(e,t){t===void 0&&(t=L(e).getComputedStyle(e));let n=/(auto|scroll|overlay)/;return[`overflow`,`overflowX`,`overflowY`].some(e=>{let r=t[e];return typeof r==`string`?n.test(r):!1})}function it(e,t){let n=[];function r(i){if(t!=null&&n.length>=t||!i)return n;if(R(i)&&i.scrollingElement!=null&&!n.includes(i.scrollingElement))return n.push(i.scrollingElement),n;if(!se(i)||ce(i)||n.includes(i))return n;let a=L(e).getComputedStyle(i);return i!==e&&rt(i,a)&&n.push(i),nt(i,a)?n:r(i.parentNode)}return e?r(e):n}function at(e){let[t]=it(e,1);return t??null}function ot(e){return!Se||!e?null:I(e)?e:oe(e)?R(e)||e===le(e).scrollingElement?window:se(e)?e:null:null}function st(e){return I(e)?e.scrollX:e.scrollLeft}function ct(e){return I(e)?e.scrollY:e.scrollTop}function lt(e){return{x:st(e),y:ct(e)}}function ut(e){return!Se||!e?!1:e===document.scrollingElement}function dt(e){let t={x:0,y:0},n=ut(e)?{height:window.innerHeight,width:window.innerWidth}:{height:e.clientHeight,width:e.clientWidth},r={x:e.scrollWidth-n.width,y:e.scrollHeight-n.height};return{isTop:e.scrollTop<=t.y,isLeft:e.scrollLeft<=t.x,isBottom:e.scrollTop>=r.y,isRight:e.scrollLeft>=r.x,maxScroll:r,minScroll:t}}function ft(e,t,n,r,i){let{top:a,left:o,right:s,bottom:c}=n;r===void 0&&(r=10),i===void 0&&(i=hn);let{isTop:l,isBottom:u,isLeft:d,isRight:f}=dt(e),p={x:0,y:0},m={x:0,y:0},h={height:t.height*i.y,width:t.width*i.x};return!l&&a<=t.top+h.height?(p.y=W.Backward,m.y=r*Math.abs((t.top+h.height-a)/h.height)):!u&&c>=t.bottom-h.height&&(p.y=W.Forward,m.y=r*Math.abs((t.bottom-h.height-c)/h.height)),!f&&s>=t.right-h.width?(p.x=W.Forward,m.x=r*Math.abs((t.right-h.width-s)/h.width)):!d&&o<=t.left+h.width&&(p.x=W.Backward,m.x=r*Math.abs((t.left+h.width-o)/h.width)),{direction:p,speed:m}}function pt(e){if(e===document.scrollingElement){let{innerWidth:e,innerHeight:t}=window;return{top:0,left:0,right:e,bottom:t,width:e,height:t}}let{top:t,left:n,right:r,bottom:i}=e.getBoundingClientRect();return{top:t,left:n,right:r,bottom:i,width:e.clientWidth,height:e.clientHeight}}function mt(e){return e.reduce((e,t)=>Te(e,lt(t)),un)}function ht(e){return e.reduce((e,t)=>e+st(t),0)}function gt(e){return e.reduce((e,t)=>e+ct(t),0)}function _t(e,t){if(t===void 0&&(t=$e),!e)return;let{top:n,left:r,bottom:i,right:a}=t(e);at(e)&&(i<=0||a<=0||n>=window.innerHeight||r>=window.innerWidth)&&e.scrollIntoView({block:`center`,inline:`center`})}function vt(e){let{EventTarget:t}=L(e);return e instanceof t?e:le(e)}function yt(e,t){let n=Math.abs(e.x),r=Math.abs(e.y);return typeof t==`number`?Math.sqrt(n**2+r**2)>t:`x`in t&&`y`in t?n>t.x&&r>t.y:`x`in t?n>t.x:`y`in t?r>t.y:!1}function bt(e){e.preventDefault()}function xt(e){e.stopPropagation()}function St(e){return!!(e&&`distance`in e)}function Ct(e){return!!(e&&`delay`in e)}function wt(e){let{acceleration:t,activator:n=jn.Pointer,canScroll:r,draggingRect:i,enabled:a,interval:o=5,order:s=Mn.TreeOrder,pointerCoordinates:c,scrollableAncestors:l,scrollableAncestorRects:u,delta:d,threshold:f}=e,p=Tt({delta:d,disabled:!a}),[m,h]=de(),g=(0,H.useRef)({x:0,y:0}),_=(0,H.useRef)({x:0,y:0}),v=(0,H.useMemo)(()=>{switch(n){case jn.Pointer:return c?{top:c.y,bottom:c.y,left:c.x,right:c.x}:null;case jn.DraggableRect:return i}},[n,i,c]),y=(0,H.useRef)(null),b=(0,H.useCallback)(()=>{let e=y.current;if(!e)return;let t=g.current.x*_.current.x,n=g.current.y*_.current.y;e.scrollBy(t,n)},[]),x=(0,H.useMemo)(()=>s===Mn.TreeOrder?[...l].reverse():l,[s,l]);(0,H.useEffect)(()=>{if(!a||!l.length||!v){h();return}for(let e of x){if(r?.(e)===!1)continue;let n=u[l.indexOf(e)];if(!n)continue;let{direction:i,speed:a}=ft(e,n,v,t,f);for(let e of[`x`,`y`])p[e][i[e]]||(a[e]=0,i[e]=0);if(a.x>0||a.y>0){h(),y.current=e,m(b,o),g.current=a,_.current=i;return}}g.current={x:0,y:0},_.current={x:0,y:0},h()},[t,b,r,h,a,o,JSON.stringify(v),JSON.stringify(p),m,l,x,u,JSON.stringify(f)])}function Tt(e){let{delta:t,disabled:n}=e,r=me(t);return z(e=>{if(n||!r||!e)return Nn;let i={x:Math.sign(t.x-r.x),y:Math.sign(t.y-r.y)};return{x:{[W.Backward]:e.x[W.Backward]||i.x===-1,[W.Forward]:e.x[W.Forward]||i.x===1},y:{[W.Backward]:e.y[W.Backward]||i.y===-1,[W.Forward]:e.y[W.Forward]||i.y===1}}},[n,t,r])}function Et(e,t){let n=t==null?void 0:e.get(t),r=n?n.node.current:null;return z(e=>t==null?null:r??e??null,[r,t])}function Dt(e,t){return(0,H.useMemo)(()=>e.reduce((e,n)=>{let{sensor:r}=n,i=r.activators.map(e=>({eventName:e.eventName,handler:t(e.handler,n)}));return[...e,...i]},[]),[e,t])}function Ot(e,t){let{dragging:n,dependencies:r,config:i}=t,[a,o]=(0,H.useState)(null),{frequency:s,measure:c,strategy:l}=i,u=(0,H.useRef)(e),d=g(),f=fe(d),p=(0,H.useCallback)(function(e){e===void 0&&(e=[]),!f.current&&o(t=>t===null?e:t.concat(e.filter(e=>!t.includes(e))))},[f]),m=(0,H.useRef)(null),h=z(t=>{if(d&&!n)return In;if(!t||t===In||u.current!==e||a!=null){let t=new Map;for(let n of e){if(!n)continue;if(a&&a.length>0&&!a.includes(n.id)&&n.rect.current){t.set(n.id,n.rect.current);continue}let e=n.node.current,r=e?new _n(c(e),e):null;n.rect.current=r,r&&t.set(n.id,r)}return t}return t},[e,a,n,d,c]);return(0,H.useEffect)(()=>{u.current=e},[e]),(0,H.useEffect)(()=>{d||p()},[n,d]),(0,H.useEffect)(()=>{a&&a.length>0&&o(null)},[JSON.stringify(a)]),(0,H.useEffect)(()=>{d||typeof s!=`number`||m.current!==null||(m.current=setTimeout(()=>{p(),m.current=null},s))},[s,d,p,...r]),{droppableRects:h,measureDroppableContainers:p,measuringScheduled:a!=null};function g(){switch(l){case Pn.Always:return!1;case Pn.BeforeDragging:return n;default:return!n}}}function kt(e,t){return z(n=>e?n||(typeof t==`function`?t(e):e):null,[t,e])}function At(e,t){return kt(e,t)}function jt(e){let{callback:t,disabled:n}=e,r=ue(t),i=(0,H.useMemo)(()=>{if(n||typeof window>`u`||window.MutationObserver===void 0)return;let{MutationObserver:e}=window;return new e(r)},[r,n]);return(0,H.useEffect)(()=>()=>i?.disconnect(),[i]),i}function Mt(e){let{callback:t,disabled:n}=e,r=ue(t),i=(0,H.useMemo)(()=>{if(n||typeof window>`u`||window.ResizeObserver===void 0)return;let{ResizeObserver:e}=window;return new e(r)},[n]);return(0,H.useEffect)(()=>()=>i?.disconnect(),[i]),i}function Nt(e){return new _n($e(e),e)}function Pt(e,t,n){t===void 0&&(t=Nt);let[r,i]=(0,H.useState)(null);function a(){i(r=>{if(!e)return null;if(e.isConnected===!1)return r??n??null;let i=t(e);return JSON.stringify(r)===JSON.stringify(i)?r:i})}let o=jt({callback(t){if(e)for(let n of t){let{type:t,target:r}=n;if(t===`childList`&&r instanceof HTMLElement&&r.contains(e)){a();break}}}}),s=Mt({callback:a});return Ce(()=>{a(),e?(s?.observe(e),o?.observe(document.body,{childList:!0,subtree:!0})):(s?.disconnect(),o?.disconnect())},[e]),r}function Ft(e){return Ye(e,kt(e))}function It(e){let t=(0,H.useRef)(e),n=z(n=>e?n&&n!==Ln&&e&&t.current&&e.parentNode===t.current.parentNode?n:it(e):Ln,[e]);return(0,H.useEffect)(()=>{t.current=e},[e]),n}function Lt(e){let[t,n]=(0,H.useState)(null),r=(0,H.useRef)(e),i=(0,H.useCallback)(e=>{let t=ot(e.target);t&&n(e=>e?(e.set(t,lt(t)),new Map(e)):null)},[]);return(0,H.useEffect)(()=>{let t=r.current;if(e!==t){a(t);let o=e.map(e=>{let t=ot(e);return t?(t.addEventListener(`scroll`,i,{passive:!0}),[t,lt(t)]):null}).filter(e=>e!=null);n(o.length?new Map(o):null),r.current=e}return()=>{a(e),a(t)};function a(e){e.forEach(e=>{ot(e)?.removeEventListener(`scroll`,i)})}},[i,e]),(0,H.useMemo)(()=>e.length?t?Array.from(t.values()).reduce((e,t)=>Te(e,t),un):mt(e):un,[e,t])}function Rt(e,t){t===void 0&&(t=[]);let n=(0,H.useRef)(null);return(0,H.useEffect)(()=>{n.current=null},t),(0,H.useEffect)(()=>{let t=e!==un;t&&!n.current&&(n.current=e),!t&&n.current&&(n.current=null)},[e]),n.current?V(e,n.current):un}function zt(e){(0,H.useEffect)(()=>{if(!Se)return;let t=e.map(e=>{let{sensor:t}=e;return t.setup==null?void 0:t.setup()});return()=>{for(let e of t)e?.()}},e.map(e=>{let{sensor:t}=e;return t}))}function Bt(e,t){return(0,H.useMemo)(()=>e.reduce((e,n)=>{let{eventName:r,handler:i}=n;return e[r]=e=>{i(e,t)},e},{}),[e,t])}function Vt(e){return(0,H.useMemo)(()=>e?tt(e):null,[e])}function Ht(e,t){t===void 0&&(t=$e);let[n]=e,r=Vt(n?L(n):null),[i,a]=(0,H.useState)(Rn);function o(){a(()=>e.length?e.map(e=>ut(e)?r:new _n(t(e),e)):Rn)}let s=Mt({callback:o});return Ce(()=>{s?.disconnect(),o(),e.forEach(e=>s?.observe(e))},[e]),i}function Ut(e){if(!e)return null;if(e.children.length>1)return e;let t=e.children[0];return se(t)?t:e}function Wt(e){let{measure:t}=e,[n,r]=(0,H.useState)(null),i=Mt({callback:(0,H.useCallback)(e=>{for(let{target:n}of e)if(se(n)){r(e=>{let r=t(n);return e?{...e,width:r.width,height:r.height}:r});break}},[t])}),[a,o]=pe((0,H.useCallback)(e=>{let n=Ut(e);i?.disconnect(),n&&i?.observe(n),r(n?t(n):null)},[t,i]));return(0,H.useMemo)(()=>({nodeRef:a,rect:n,setRef:o}),[n,a,o])}function Gt(){return{draggable:{active:null,initialCoordinates:{x:0,y:0},nodes:new Map,translate:{x:0,y:0}},droppable:{containers:new Hn}}}function Kt(e,t){switch(t.type){case U.DragStart:return{...e,draggable:{...e.draggable,initialCoordinates:t.initialCoordinates,active:t.active}};case U.DragMove:return e.draggable.active==null?e:{...e,draggable:{...e.draggable,translate:{x:t.coordinates.x-e.draggable.initialCoordinates.x,y:t.coordinates.y-e.draggable.initialCoordinates.y}}};case U.DragEnd:case U.DragCancel:return{...e,draggable:{...e.draggable,active:null,initialCoordinates:{x:0,y:0},translate:{x:0,y:0}}};case U.RegisterDroppable:{let{element:n}=t,{id:r}=n,i=new Hn(e.droppable.containers);return i.set(r,n),{...e,droppable:{...e.droppable,containers:i}}}case U.SetDroppableDisabled:{let{id:n,key:r,disabled:i}=t,a=e.droppable.containers.get(n);if(!a||r!==a.key)return e;let o=new Hn(e.droppable.containers);return o.set(n,{...a,disabled:i}),{...e,droppable:{...e.droppable,containers:o}}}case U.UnregisterDroppable:{let{id:n,key:r}=t,i=e.droppable.containers.get(n);if(!i||r!==i.key)return e;let a=new Hn(e.droppable.containers);return a.delete(n),{...e,droppable:{...e.droppable,containers:a}}}default:return e}}function qt(e){let{disabled:t}=e,{active:n,activatorEvent:r,draggableNodes:i}=(0,H.useContext)(Gn),a=me(r),o=me(n?.id);return(0,H.useEffect)(()=>{if(!t&&!r&&a&&o!=null){if(!ve(a)||document.activeElement===a.target)return;let e=i.get(o);if(!e)return;let{activatorNode:t,node:n}=e;if(!t.current&&!n.current)return;requestAnimationFrame(()=>{for(let e of[t.current,n.current]){if(!e)continue;let t=xe(e);if(t){t.focus();break}}})}},[r,t,i,o,a]),null}function Jt(e,t){let{transform:n,...r}=t;return e!=null&&e.length?e.reduce((e,t)=>t({transform:e,...r}),n):n}function Yt(e){return(0,H.useMemo)(()=>({draggable:{...Vn.draggable,...e?.draggable},droppable:{...Vn.droppable,...e?.droppable},dragOverlay:{...Vn.dragOverlay,...e?.dragOverlay}}),[e?.draggable,e?.droppable,e?.dragOverlay])}function Xt(e){let{activeNode:t,measure:n,initialRect:r,config:i=!0}=e,a=(0,H.useRef)(!1),{x:o,y:s}=typeof i==`boolean`?{x:i,y:i}:i;Ce(()=>{if(!o&&!s||!t){a.current=!1;return}if(a.current||!r)return;let e=t?.node.current;if(!e||e.isConnected===!1)return;let i=Ye(n(e),r);if(o||(i.x=0),s||(i.y=0),a.current=!0,Math.abs(i.x)>0||Math.abs(i.y)>0){let t=at(e);t&&t.scrollBy({top:i.y,left:i.x})}},[t,o,s,r,n])}function Zt(e){let{id:t,data:n,disabled:r=!1,attributes:i}=e,a=he(Qn),{activators:o,activatorEvent:s,active:c,activeNodeRect:l,ariaDescribedById:u,draggableNodes:d,over:f}=(0,H.useContext)(Gn),{role:p=Zn,roleDescription:m=`draggable`,tabIndex:h=0}=i??{},g=c?.id===t,_=(0,H.useContext)(g?qn:Xn),[v,y]=pe(),[b,x]=pe(),S=Bt(o,t),C=fe(n);return Ce(()=>(d.set(t,{id:t,key:a,node:v,activatorNode:b,data:C}),()=>{let e=d.get(t);e&&e.key===a&&d.delete(t)}),[d,t]),{active:c,activatorEvent:s,activeNodeRect:l,attributes:(0,H.useMemo)(()=>({role:p,tabIndex:h,"aria-disabled":r,"aria-pressed":g&&p===Zn?!0:void 0,"aria-roledescription":m,"aria-describedby":u.draggable}),[r,p,h,g,m,u.draggable]),isDragging:g,listeners:r?void 0:S,node:v,over:f,setNodeRef:y,setActivatorNodeRef:x,transform:_}}function Qt(){return(0,H.useContext)(Kn)}function $t(e){let{data:t,disabled:n=!1,id:r,resizeObserverConfig:i}=e,a=he($n),{active:o,dispatch:s,over:c,measureDroppableContainers:l}=(0,H.useContext)(Gn),u=(0,H.useRef)({disabled:n}),d=(0,H.useRef)(!1),f=(0,H.useRef)(null),p=(0,H.useRef)(null),{disabled:m,updateMeasurementsFor:h,timeout:g}={...er,...i},_=fe(h??r),v=Mt({callback:(0,H.useCallback)(()=>{if(!d.current){d.current=!0;return}p.current!=null&&clearTimeout(p.current),p.current=setTimeout(()=>{l(Array.isArray(_.current)?_.current:[_.current]),p.current=null},g)},[g]),disabled:m||!o}),[y,b]=pe((0,H.useCallback)((e,t)=>{v&&(t&&(v.unobserve(t),d.current=!1),e&&v.observe(e))},[v])),x=fe(t);return(0,H.useEffect)(()=>{!v||!y.current||(v.disconnect(),d.current=!1,v.observe(y.current))},[y,v]),(0,H.useEffect)(()=>(s({type:U.RegisterDroppable,element:{id:r,key:a,disabled:n,node:y,rect:f,data:x}}),()=>s({type:U.UnregisterDroppable,key:a,id:r})),[r]),(0,H.useEffect)(()=>{n!==u.current.disabled&&(s({type:U.SetDroppableDisabled,id:r,key:a,disabled:n}),u.current.disabled=n)},[r,a,n,s]),{active:o,rect:f,isOver:c?.id===r,node:y,over:c,setNodeRef:b}}function en(e){let{animation:t,children:n}=e,[r,i]=(0,H.useState)(null),[a,o]=(0,H.useState)(null),s=me(n);return!n&&!r&&s&&i(s),Ce(()=>{if(!a)return;let e=r?.key,n=r?.props.id;if(e==null||n==null){i(null);return}Promise.resolve(t(n,a)).then(()=>{i(null)})},[t,r,a]),H.createElement(H.Fragment,null,n,r?(0,H.cloneElement)(r,{ref:o}):null)}function tn(e){let{children:t}=e;return H.createElement(Gn.Provider,{value:Wn},H.createElement(qn.Provider,{value:tr},t))}function nn(e){let{config:t,draggableNodes:n,droppableContainers:r,measuringConfiguration:i}=e;return ue((e,a)=>{if(t===null)return;let o=n.get(e);if(!o)return;let s=o.node.current;if(!s)return;let c=Ut(a);if(!c)return;let{transform:l}=L(a).getComputedStyle(a),u=Ze(l);if(!u)return;let d=typeof t==`function`?t:rn(t);return _t(s,i.draggable.measure),d({active:{id:e,data:o.data,node:s,rect:i.draggable.measure(s)},draggableNodes:n,dragOverlay:{node:a,rect:i.dragOverlay.measure(c)},droppableContainers:r,measuringConfiguration:i,transform:u})})}function rn(e){let{duration:t,easing:n,sideEffects:r,keyframes:i}={...sr,...e};return e=>{let{active:a,dragOverlay:o,transform:s,...c}=e;if(!t)return;let l={x:o.rect.left-a.rect.left,y:o.rect.top-a.rect.top},u={scaleX:s.scaleX===1?1:a.rect.width*s.scaleX/o.rect.width,scaleY:s.scaleY===1?1:a.rect.height*s.scaleY/o.rect.height},d={x:s.x-l.x,y:s.y-l.y,...u},f=i({...c,active:a,dragOverlay:o,transform:{initial:s,final:d}}),[p]=f,m=f[f.length-1];if(JSON.stringify(p)===JSON.stringify(m))return;let h=r?.({active:a,dragOverlay:o,...c}),g=o.node.animate(f,{duration:t,easing:n,fill:`forwards`});return new Promise(e=>{g.onfinish=()=>{h?.(),e()}})}}function an(e){return(0,H.useMemo)(()=>{if(e!=null)return cr++,cr},[e])}var H,on,sn,cn,ln,U,un,dn,fn,pn,mn,W,hn,gn,_n,vn,yn,G,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur=e((()=>{H=t(m()),on=t(c()),Oe(),Pe(),sn=(0,H.createContext)(null),cn={draggable:`
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `},ln={onDragStart(e){let{active:t}=e;return`Picked up draggable item `+t.id+`.`},onDragOver(e){let{active:t,over:n}=e;return n?`Draggable item `+t.id+` was moved over droppable area `+n.id+`.`:`Draggable item `+t.id+` is no longer over a droppable area.`},onDragEnd(e){let{active:t,over:n}=e;return n?`Draggable item `+t.id+` was dropped over droppable area `+n.id:`Draggable item `+t.id+` was dropped.`},onDragCancel(e){let{active:t}=e;return`Dragging was cancelled. Draggable item `+t.id+` was dropped.`}},(function(e){e.DragStart=`dragStart`,e.DragMove=`dragMove`,e.DragEnd=`dragEnd`,e.DragCancel=`dragCancel`,e.DragOver=`dragOver`,e.RegisterDroppable=`registerDroppable`,e.SetDroppableDisabled=`setDroppableDisabled`,e.UnregisterDroppable=`unregisterDroppable`})(U||={}),un=Object.freeze({x:0,y:0}),dn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,i=Ge(t),a=[];for(let e of r){let{id:t}=e,r=n.get(t);if(r){let n=Ge(r),o=i.reduce((e,t,r)=>e+Ve(n[r],t),0),s=Number((o/4).toFixed(4));a.push({id:t,data:{droppableContainer:e,value:s}})}}return a.sort(Ue)},fn=e=>{let{collisionRect:t,droppableRects:n,droppableContainers:r}=e,i=[];for(let e of r){let{id:r}=e,a=n.get(r);if(a){let n=qe(a,t);n>0&&i.push({id:r,data:{droppableContainer:e,value:n}})}}return i.sort(We)},pn=Xe(1),mn={ignoreTransform:!1},(function(e){e[e.Forward=1]=`Forward`,e[e.Backward=-1]=`Backward`})(W||={}),hn={x:.2,y:.2},gn=[[`x`,[`left`,`right`],ht],[`y`,[`top`,`bottom`],gt]],_n=class{constructor(e,t){this.rect=void 0,this.width=void 0,this.height=void 0,this.top=void 0,this.bottom=void 0,this.right=void 0,this.left=void 0;let n=it(t),r=mt(n);this.rect={...e},this.width=e.width,this.height=e.height;for(let[e,t,i]of gn)for(let a of t)Object.defineProperty(this,a,{get:()=>{let t=i(n),o=r[e]-t;return this.rect[a]+o},enumerable:!0});Object.defineProperty(this,`rect`,{enumerable:!1})}},vn=class{constructor(e){this.target=void 0,this.listeners=[],this.removeAll=()=>{this.listeners.forEach(e=>this.target?.removeEventListener(...e))},this.target=e}add(e,t,n){var r;(r=this.target)==null||r.addEventListener(e,t,n),this.listeners.push([e,t,n])}},(function(e){e.Click=`click`,e.DragStart=`dragstart`,e.Keydown=`keydown`,e.ContextMenu=`contextmenu`,e.Resize=`resize`,e.SelectionChange=`selectionchange`,e.VisibilityChange=`visibilitychange`})(yn||={}),(function(e){e.Space=`Space`,e.Down=`ArrowDown`,e.Right=`ArrowRight`,e.Left=`ArrowLeft`,e.Up=`ArrowUp`,e.Esc=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`})(G||={}),bn={start:[G.Space,G.Enter],cancel:[G.Esc],end:[G.Space,G.Enter,G.Tab]},xn=(e,t)=>{let{currentCoordinates:n}=t;switch(e.code){case G.Right:return{...n,x:n.x+25};case G.Left:return{...n,x:n.x-25};case G.Down:return{...n,y:n.y+25};case G.Up:return{...n,y:n.y-25}}},Sn=class{constructor(e){this.props=void 0,this.autoScrollEnabled=!1,this.referenceCoordinates=void 0,this.listeners=void 0,this.windowListeners=void 0,this.props=e;let{event:{target:t}}=e;this.props=e,this.listeners=new vn(le(t)),this.windowListeners=new vn(L(t)),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleCancel=this.handleCancel.bind(this),this.attach()}attach(){this.handleStart(),this.windowListeners.add(yn.Resize,this.handleCancel),this.windowListeners.add(yn.VisibilityChange,this.handleCancel),setTimeout(()=>this.listeners.add(yn.Keydown,this.handleKeyDown))}handleStart(){let{activeNode:e,onStart:t}=this.props,n=e.node.current;n&&_t(n),t(un)}handleKeyDown(e){if(ve(e)){let{active:t,context:n,options:r}=this.props,{keyboardCodes:i=bn,coordinateGetter:a=xn,scrollBehavior:o=`smooth`}=r,{code:s}=e;if(i.end.includes(s)){this.handleEnd(e);return}if(i.cancel.includes(s)){this.handleCancel(e);return}let{collisionRect:c}=n.current,l=c?{x:c.left,y:c.top}:un;this.referenceCoordinates||=l;let u=a(e,{active:t,context:n.current,currentCoordinates:l});if(u){let t=V(u,l),r={x:0,y:0},{scrollableAncestors:i}=n.current;for(let n of i){let i=e.code,{isTop:a,isRight:s,isLeft:c,isBottom:l,maxScroll:d,minScroll:f}=dt(n),p=pt(n),m={x:Math.min(i===G.Right?p.right-p.width/2:p.right,Math.max(i===G.Right?p.left:p.left+p.width/2,u.x)),y:Math.min(i===G.Down?p.bottom-p.height/2:p.bottom,Math.max(i===G.Down?p.top:p.top+p.height/2,u.y))},h=i===G.Right&&!s||i===G.Left&&!c,g=i===G.Down&&!l||i===G.Up&&!a;if(h&&m.x!==u.x){let e=n.scrollLeft+t.x,a=i===G.Right&&e<=d.x||i===G.Left&&e>=f.x;if(a&&!t.y){n.scrollTo({left:e,behavior:o});return}a?r.x=n.scrollLeft-e:r.x=i===G.Right?n.scrollLeft-d.x:n.scrollLeft-f.x,r.x&&n.scrollBy({left:-r.x,behavior:o});break}else if(g&&m.y!==u.y){let e=n.scrollTop+t.y,a=i===G.Down&&e<=d.y||i===G.Up&&e>=f.y;if(a&&!t.x){n.scrollTo({top:e,behavior:o});return}a?r.y=n.scrollTop-e:r.y=i===G.Down?n.scrollTop-d.y:n.scrollTop-f.y,r.y&&n.scrollBy({top:-r.y,behavior:o});break}}this.handleMove(e,Te(V(u,this.referenceCoordinates),r))}}}handleMove(e,t){let{onMove:n}=this.props;e.preventDefault(),n(t)}handleEnd(e){let{onEnd:t}=this.props;e.preventDefault(),this.detach(),t()}handleCancel(e){let{onCancel:t}=this.props;e.preventDefault(),this.detach(),t()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll()}},Sn.activators=[{eventName:`onKeyDown`,handler:(e,t,n)=>{let{keyboardCodes:r=bn,onActivation:i}=t,{active:a}=n,{code:o}=e.nativeEvent;if(r.start.includes(o)){let t=a.activatorNode.current;return t&&e.target!==t?!1:(e.preventDefault(),i?.({event:e.nativeEvent}),!0)}return!1}}],Cn=class{constructor(e,t,n){n===void 0&&(n=vt(e.event.target)),this.props=void 0,this.events=void 0,this.autoScrollEnabled=!0,this.document=void 0,this.activated=!1,this.initialCoordinates=void 0,this.timeoutId=null,this.listeners=void 0,this.documentListeners=void 0,this.windowListeners=void 0,this.props=e,this.events=t;let{event:r}=e,{target:i}=r;this.props=e,this.events=t,this.document=le(i),this.documentListeners=new vn(this.document),this.listeners=new vn(n),this.windowListeners=new vn(L(i)),this.initialCoordinates=be(r)??un,this.handleStart=this.handleStart.bind(this),this.handleMove=this.handleMove.bind(this),this.handleEnd=this.handleEnd.bind(this),this.handleCancel=this.handleCancel.bind(this),this.handleKeydown=this.handleKeydown.bind(this),this.removeTextSelection=this.removeTextSelection.bind(this),this.attach()}attach(){let{events:e,props:{options:{activationConstraint:t,bypassActivationConstraint:n}}}=this;if(this.listeners.add(e.move.name,this.handleMove,{passive:!1}),this.listeners.add(e.end.name,this.handleEnd),e.cancel&&this.listeners.add(e.cancel.name,this.handleCancel),this.windowListeners.add(yn.Resize,this.handleCancel),this.windowListeners.add(yn.DragStart,bt),this.windowListeners.add(yn.VisibilityChange,this.handleCancel),this.windowListeners.add(yn.ContextMenu,bt),this.documentListeners.add(yn.Keydown,this.handleKeydown),t){if(n!=null&&n({event:this.props.event,activeNode:this.props.activeNode,options:this.props.options}))return this.handleStart();if(Ct(t)){this.timeoutId=setTimeout(this.handleStart,t.delay),this.handlePending(t);return}if(St(t)){this.handlePending(t);return}}this.handleStart()}detach(){this.listeners.removeAll(),this.windowListeners.removeAll(),setTimeout(this.documentListeners.removeAll,50),this.timeoutId!==null&&(clearTimeout(this.timeoutId),this.timeoutId=null)}handlePending(e,t){let{active:n,onPending:r}=this.props;r(n,e,this.initialCoordinates,t)}handleStart(){let{initialCoordinates:e}=this,{onStart:t}=this.props;e&&(this.activated=!0,this.documentListeners.add(yn.Click,xt,{capture:!0}),this.removeTextSelection(),this.documentListeners.add(yn.SelectionChange,this.removeTextSelection),t(e))}handleMove(e){let{activated:t,initialCoordinates:n,props:r}=this,{onMove:i,options:{activationConstraint:a}}=r;if(!n)return;let o=be(e)??un,s=V(n,o);if(!t&&a){if(St(a)){if(a.tolerance!=null&&yt(s,a.tolerance))return this.handleCancel();if(yt(s,a.distance))return this.handleStart()}if(Ct(a)&&yt(s,a.tolerance))return this.handleCancel();this.handlePending(a,s);return}e.cancelable&&e.preventDefault(),i(o)}handleEnd(){let{onAbort:e,onEnd:t}=this.props;this.detach(),this.activated||e(this.props.active),t()}handleCancel(){let{onAbort:e,onCancel:t}=this.props;this.detach(),this.activated||e(this.props.active),t()}handleKeydown(e){e.code===G.Esc&&this.handleCancel()}removeTextSelection(){var e;(e=this.document.getSelection())==null||e.removeAllRanges()}},wn={cancel:{name:`pointercancel`},move:{name:`pointermove`},end:{name:`pointerup`}},Tn=class extends Cn{constructor(e){let{event:t}=e,n=le(t.target);super(e,wn,n)}},Tn.activators=[{eventName:`onPointerDown`,handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return!n.isPrimary||n.button!==0?!1:(r?.({event:n}),!0)}}],En={move:{name:`mousemove`},end:{name:`mouseup`}},(function(e){e[e.RightClick=2]=`RightClick`})(Dn||={}),On=class extends Cn{constructor(e){super(e,En,le(e.event.target))}},On.activators=[{eventName:`onMouseDown`,handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t;return n.button===Dn.RightClick?!1:(r?.({event:n}),!0)}}],kn={cancel:{name:`touchcancel`},move:{name:`touchmove`},end:{name:`touchend`}},An=class extends Cn{constructor(e){super(e,kn)}static setup(){return window.addEventListener(kn.move.name,e,{capture:!1,passive:!1}),function(){window.removeEventListener(kn.move.name,e)};function e(){}}},An.activators=[{eventName:`onTouchStart`,handler:(e,t)=>{let{nativeEvent:n}=e,{onActivation:r}=t,{touches:i}=n;return i.length>1?!1:(r?.({event:n}),!0)}}],(function(e){e[e.Pointer=0]=`Pointer`,e[e.DraggableRect=1]=`DraggableRect`})(jn||={}),(function(e){e[e.TreeOrder=0]=`TreeOrder`,e[e.ReversedTreeOrder=1]=`ReversedTreeOrder`})(Mn||={}),Nn={x:{[W.Backward]:!1,[W.Forward]:!1},y:{[W.Backward]:!1,[W.Forward]:!1}},(function(e){e[e.Always=0]=`Always`,e[e.BeforeDragging=1]=`BeforeDragging`,e[e.WhileDragging=2]=`WhileDragging`})(Pn||={}),(function(e){e.Optimized=`optimized`})(Fn||={}),In=new Map,Ln=[],Rn=[],zn=[{sensor:Tn,options:{}},{sensor:Sn,options:{}}],Bn={current:{}},Vn={draggable:{measure:et},droppable:{measure:et,strategy:Pn.WhileDragging,frequency:Fn.Optimized},dragOverlay:{measure:$e}},Hn=class extends Map{get(e){return e==null?void 0:super.get(e)??void 0}toArray(){return Array.from(this.values())}getEnabled(){return this.toArray().filter(e=>{let{disabled:t}=e;return!t})}getNodeFor(e){return this.get(e)?.node.current??void 0}},Un={activatorEvent:null,active:null,activeNode:null,activeNodeRect:null,collisions:null,containerNodeRect:null,draggableNodes:new Map,droppableRects:new Map,droppableContainers:new Hn,over:null,dragOverlay:{nodeRef:{current:null},rect:null,setRef:Re},scrollableAncestors:[],scrollableAncestorRects:[],measuringConfiguration:Vn,measureDroppableContainers:Re,windowRect:null,measuringScheduled:!1},Wn={activatorEvent:null,activators:[],active:null,activeNodeRect:null,ariaDescribedById:{draggable:``},dispatch:Re,draggableNodes:new Map,over:null,measureDroppableContainers:Re},Gn=(0,H.createContext)(Wn),Kn=(0,H.createContext)(Un),qn=(0,H.createContext)({...un,scaleX:1,scaleY:1}),(function(e){e[e.Uninitialized=0]=`Uninitialized`,e[e.Initializing=1]=`Initializing`,e[e.Initialized=2]=`Initialized`})(Jn||={}),Yn=(0,H.memo)(function(e){let{id:t,accessibility:n,autoScroll:r=!0,children:i,sensors:a=zn,collisionDetection:o=fn,measuring:s,modifiers:c,...l}=e,[u,d]=(0,H.useReducer)(Kt,void 0,Gt),[f,p]=Ie(),[m,h]=(0,H.useState)(Jn.Uninitialized),g=m===Jn.Initialized,{draggable:{active:_,nodes:v,translate:y},droppable:{containers:b}}=u,x=_==null?null:v.get(_),S=(0,H.useRef)({initial:null,translated:null}),C=(0,H.useMemo)(()=>_==null?null:{id:_,data:x?.data??Bn,rect:S},[_,x]),w=(0,H.useRef)(null),[T,E]=(0,H.useState)(null),[D,ee]=(0,H.useState)(null),O=fe(l,Object.values(l)),k=he(`DndDescribedBy`,t),A=(0,H.useMemo)(()=>b.getEnabled(),[b]),j=Yt(s),{droppableRects:M,measureDroppableContainers:te,measuringScheduled:ne}=Ot(A,{dragging:g,dependencies:[y.x,y.y],config:j.droppable}),N=Et(v,_),re=(0,H.useMemo)(()=>D?be(D):null,[D]),ie=Ne(),P=At(N,j.draggable.measure);Xt({activeNode:_==null?null:v.get(_),config:ie.layoutShiftCompensation,initialRect:P,measure:j.draggable.measure});let F=Pt(N,j.draggable.measure,P),ae=Pt(N?N.parentElement:null),I=(0,H.useRef)({activatorEvent:null,active:null,activeNode:N,collisionRect:null,collisions:null,droppableRects:M,draggableNodes:v,draggingNode:null,draggingNodeRect:null,droppableContainers:b,over:null,scrollableAncestors:[],scrollAdjustedTranslate:null}),oe=b.getNodeFor(I.current.over?.id),R=Wt({measure:j.dragOverlay.measure}),se=R.nodeRef.current??N,ce=g?R.rect??F:null,le=!!(R.nodeRef.current&&R.rect),ue=Ft(le?null:F),de=Vt(se?L(se):null),z=It(g?oe??N:null),pe=Ht(z),me=Jt(c,{transform:{x:y.x-ue.x,y:y.y-ue.y,scaleX:1,scaleY:1},activatorEvent:D,active:C,activeNodeRect:F,containerNodeRect:ae,draggingNodeRect:ce,over:I.current.over,overlayNodeRect:R.rect,scrollableAncestors:z,scrollableAncestorRects:pe,windowRect:de}),ge=re?Te(re,y):null,_e=Lt(z),ve=Rt(_e),ye=Rt(_e,[F]),xe=Te(me,ve),B=ce?pn(ce,me):null,Se=C&&B?o({active:C,collisionRect:B,droppableRects:M,droppableContainers:A,pointerCoordinates:ge}):null,we=Ke(Se,`id`),[V,Ee]=(0,H.useState)(null),De=Je(le?me:Te(me,ye),V?.rect??null,F),Oe=(0,H.useRef)(null),ke=(0,H.useCallback)((e,t)=>{let{sensor:n,options:r}=t;if(w.current==null)return;let i=v.get(w.current);if(!i)return;let a=e.nativeEvent;Oe.current=new n({active:w.current,activeNode:i,event:a,options:r,context:I,onAbort(e){if(!v.get(e))return;let{onDragAbort:t}=O.current,n={id:e};t?.(n),f({type:`onDragAbort`,event:n})},onPending(e,t,n,r){if(!v.get(e))return;let{onDragPending:i}=O.current,a={id:e,constraint:t,initialCoordinates:n,offset:r};i?.(a),f({type:`onDragPending`,event:a})},onStart(e){let t=w.current;if(t==null)return;let n=v.get(t);if(!n)return;let{onDragStart:r}=O.current,i={activatorEvent:a,active:{id:t,data:n.data,rect:S}};(0,on.unstable_batchedUpdates)(()=>{r?.(i),h(Jn.Initializing),d({type:U.DragStart,initialCoordinates:e,active:t}),f({type:`onDragStart`,event:i}),E(Oe.current),ee(a)})},onMove(e){d({type:U.DragMove,coordinates:e})},onEnd:o(U.DragEnd),onCancel:o(U.DragCancel)});function o(e){return async function(){let{active:t,collisions:n,over:r,scrollAdjustedTranslate:i}=I.current,o=null;if(t&&i){let{cancelDrop:s}=O.current;o={activatorEvent:a,active:t,collisions:n,delta:i,over:r},e===U.DragEnd&&typeof s==`function`&&await Promise.resolve(s(o))&&(e=U.DragCancel)}w.current=null,(0,on.unstable_batchedUpdates)(()=>{d({type:e}),h(Jn.Uninitialized),Ee(null),E(null),ee(null),Oe.current=null;let t=e===U.DragEnd?`onDragEnd`:`onDragCancel`;if(o){let e=O.current[t];e?.(o),f({type:t,event:o})}})}}},[v]),Ae=Dt(a,(0,H.useCallback)((e,t)=>(n,r)=>{let i=n.nativeEvent,a=v.get(r);if(w.current!==null||!a||i.dndKit||i.defaultPrevented)return;let o={active:a};e(n,t.options,o)===!0&&(i.dndKit={capturedBy:t.sensor},w.current=r,ke(n,t))},[v,ke]));zt(a),Ce(()=>{F&&m===Jn.Initializing&&h(Jn.Initialized)},[F,m]),(0,H.useEffect)(()=>{let{onDragMove:e}=O.current,{active:t,activatorEvent:n,collisions:r,over:i}=I.current;if(!t||!n)return;let a={active:t,activatorEvent:n,collisions:r,delta:{x:xe.x,y:xe.y},over:i};(0,on.unstable_batchedUpdates)(()=>{e?.(a),f({type:`onDragMove`,event:a})})},[xe.x,xe.y]),(0,H.useEffect)(()=>{let{active:e,activatorEvent:t,collisions:n,droppableContainers:r,scrollAdjustedTranslate:i}=I.current;if(!e||w.current==null||!t||!i)return;let{onDragOver:a}=O.current,o=r.get(we),s=o&&o.rect.current?{id:o.id,rect:o.rect.current,data:o.data,disabled:o.disabled}:null,c={active:e,activatorEvent:t,collisions:n,delta:{x:i.x,y:i.y},over:s};(0,on.unstable_batchedUpdates)(()=>{Ee(s),a?.(c),f({type:`onDragOver`,event:c})})},[we]),Ce(()=>{I.current={activatorEvent:D,active:C,activeNode:N,collisionRect:B,collisions:Se,droppableRects:M,draggableNodes:v,draggingNode:se,draggingNodeRect:ce,droppableContainers:b,over:V,scrollableAncestors:z,scrollAdjustedTranslate:xe},S.current={initial:ce,translated:B}},[C,N,Se,B,v,se,ce,M,b,V,z,xe]),wt({...ie,delta:y,draggingRect:B,pointerCoordinates:ge,scrollableAncestors:z,scrollableAncestorRects:pe});let je=(0,H.useMemo)(()=>({active:C,activeNode:N,activeNodeRect:F,activatorEvent:D,collisions:Se,containerNodeRect:ae,dragOverlay:R,draggableNodes:v,droppableContainers:b,droppableRects:M,over:V,measureDroppableContainers:te,scrollableAncestors:z,scrollableAncestorRects:pe,measuringConfiguration:j,measuringScheduled:ne,windowRect:de}),[C,N,F,D,Se,ae,R,v,b,M,V,te,z,pe,j,ne,de]),Me=(0,H.useMemo)(()=>({activatorEvent:D,activators:Ae,active:C,activeNodeRect:F,ariaDescribedById:{draggable:k},dispatch:d,draggableNodes:v,over:V,measureDroppableContainers:te}),[D,Ae,C,F,d,k,v,V,te]);return H.createElement(sn.Provider,{value:p},H.createElement(Gn.Provider,{value:Me},H.createElement(Kn.Provider,{value:je},H.createElement(qn.Provider,{value:De},i)),H.createElement(qt,{disabled:n?.restoreFocus===!1})),H.createElement(Le,{...n,hiddenTextDescribedById:k}));function Ne(){let e=T?.autoScrollEnabled===!1,t=typeof r==`object`?r.enabled===!1:r===!1,n=g&&!e&&!t;return typeof r==`object`?{...r,enabled:n}:{enabled:n}}}),Xn=(0,H.createContext)(null),Zn=`button`,Qn=`Draggable`,$n=`Droppable`,er={timeout:25},tr={x:0,y:0,scaleX:1,scaleY:1},nr={position:`fixed`,touchAction:`none`},rr=e=>ve(e)?`transform 250ms ease`:void 0,ir=(0,H.forwardRef)((e,t)=>{let{as:n,activatorEvent:r,adjustScale:i,children:a,className:o,rect:s,style:c,transform:l,transition:u=rr}=e;if(!s)return null;let d=i?l:{...l,scaleX:1,scaleY:1},f={...nr,width:s.width,height:s.height,top:s.top,left:s.left,transform:Ee.Transform.toString(d),transformOrigin:i&&r?He(r,s):void 0,transition:typeof u==`function`?u(r):u,...c};return H.createElement(n,{className:o,style:f,ref:t},a)}),ar=e=>t=>{let{active:n,dragOverlay:r}=t,i={},{styles:a,className:o}=e;if(a!=null&&a.active)for(let[e,t]of Object.entries(a.active))t!==void 0&&(i[e]=n.node.style.getPropertyValue(e),n.node.style.setProperty(e,t));if(a!=null&&a.dragOverlay)for(let[e,t]of Object.entries(a.dragOverlay))t!==void 0&&r.node.style.setProperty(e,t);return o!=null&&o.active&&n.node.classList.add(o.active),o!=null&&o.dragOverlay&&r.node.classList.add(o.dragOverlay),function(){for(let[e,t]of Object.entries(i))n.node.style.setProperty(e,t);o!=null&&o.active&&n.node.classList.remove(o.active)}},or=e=>{let{transform:{initial:t,final:n}}=e;return[{transform:Ee.Transform.toString(t)},{transform:Ee.Transform.toString(n)}]},sr={duration:250,easing:`ease`,keyframes:or,sideEffects:ar({styles:{active:{opacity:`0`}}})},cr=0,lr=H.memo(e=>{let{adjustScale:t=!1,children:n,dropAnimation:r,style:i,transition:a,modifiers:o,wrapperElement:s=`div`,className:c,zIndex:l=999}=e,{activatorEvent:u,active:d,activeNodeRect:f,containerNodeRect:p,draggableNodes:m,droppableContainers:h,dragOverlay:g,over:_,measuringConfiguration:v,scrollableAncestors:y,scrollableAncestorRects:b,windowRect:x}=Qt(),S=(0,H.useContext)(qn),C=an(d?.id),w=Jt(o,{activatorEvent:u,active:d,activeNodeRect:f,containerNodeRect:p,draggingNodeRect:g.rect,over:_,overlayNodeRect:g.rect,scrollableAncestors:y,scrollableAncestorRects:b,transform:S,windowRect:x}),T=kt(f),E=nn({config:r,draggableNodes:m,droppableContainers:h,measuringConfiguration:v}),D=T?g.setRef:void 0;return H.createElement(tn,null,H.createElement(en,{animation:E},d&&C?H.createElement(ir,{key:C,id:d.id,ref:D,as:s,activatorEvent:u,adjustScale:t,className:c,transition:a,rect:T,style:{zIndex:l,...i},transform:w},n):null))})}));function dr(e,t,n){let r=e.slice();return r.splice(n<0?r.length+n:n,0,r.splice(t,1)[0]),r}function fr(e,t){return e.reduce((e,n,r)=>{let i=t.get(n);return i&&(e[r]=i),e},Array(e.length))}function pr(e){return e!==null&&e>=0}function mr(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function hr(e){return typeof e==`boolean`?{draggable:e,droppable:e}:e}function gr(e,t,n){let r=e[t],i=e[t-1],a=e[t+1];return r?n<t?i?r.top-(i.top+i.height):a?a.top-(r.top+r.height):0:a?a.top-(r.top+r.height):i?r.top-(i.top+i.height):0:0}function _r(e){let{children:t,id:n,items:r,strategy:i=wr,disabled:a=!1}=e,{active:o,dragOverlay:s,droppableRects:c,over:l,measureDroppableContainers:u}=Qt(),d=he(Dr,n),f=s.rect!==null,p=(0,K.useMemo)(()=>r.map(e=>typeof e==`object`&&`id`in e?e.id:e),[r]),m=o!=null,h=o?p.indexOf(o.id):-1,g=l?p.indexOf(l.id):-1,_=(0,K.useRef)(p),v=!mr(p,_.current),y=g!==-1&&h===-1||v,b=hr(a);Ce(()=>{v&&m&&u(p)},[v,p,m,u]),(0,K.useEffect)(()=>{_.current=p},[p]);let x=(0,K.useMemo)(()=>({activeIndex:h,containerId:d,disabled:b,disableTransforms:y,items:p,overIndex:g,useDragOverlay:f,sortedRects:fr(p,c),strategy:i}),[h,d,b.draggable,b.droppable,y,p,g,c,f,i]);return K.createElement(Or.Provider,{value:x},t)}function vr(e){let{disabled:t,index:n,node:r,rect:i}=e,[a,o]=(0,K.useState)(null),s=(0,K.useRef)(n);return Ce(()=>{if(!t&&n!==s.current&&r.current){let e=i.current;if(e){let t=$e(r.current,{ignoreTransform:!0}),n={x:e.left-t.left,y:e.top-t.top,scaleX:e.width/t.width,scaleY:e.height/t.height};(n.x||n.y)&&o(n)}}n!==s.current&&(s.current=n)},[t,n,r,i]),(0,K.useEffect)(()=>{a&&o(null)},[a]),a}function yr(e){let{animateLayoutChanges:t=Ar,attributes:n,disabled:r,data:i,getNewIndex:a=kr,id:o,strategy:s,resizeObserverConfig:c,transition:l=jr}=e,{items:u,containerId:d,activeIndex:f,disabled:p,disableTransforms:m,sortedRects:h,overIndex:g,useDragOverlay:_,strategy:v}=(0,K.useContext)(Or),y=br(r,p),b=u.indexOf(o),x=(0,K.useMemo)(()=>({sortable:{containerId:d,index:b,items:u},...i}),[d,i,b,u]),S=(0,K.useMemo)(()=>u.slice(u.indexOf(o)),[u,o]),{rect:C,node:w,isOver:T,setNodeRef:E}=$t({id:o,data:x,disabled:y.droppable,resizeObserverConfig:{updateMeasurementsFor:S,...c}}),{active:D,activatorEvent:ee,activeNodeRect:O,attributes:k,setNodeRef:A,listeners:j,isDragging:M,over:te,setActivatorNodeRef:ne,transform:N}=Zt({id:o,data:x,attributes:{...Pr,...n},disabled:y.draggable}),re=ae(E,A),ie=!!D,P=ie&&!m&&pr(f)&&pr(g),F=!_&&M,I=P?(F&&P?N:null)??(s??v)({rects:h,activeNodeRect:O,activeIndex:f,overIndex:g,index:b}):null,oe=pr(f)&&pr(g)?a({id:o,items:u,activeIndex:f,overIndex:g}):b,L=D?.id,R=(0,K.useRef)({activeId:L,items:u,newIndex:oe,containerId:d}),se=u!==R.current.items,ce=t({active:D,containerId:d,isDragging:M,isSorting:ie,id:o,index:b,items:u,newIndex:R.current.newIndex,previousItems:R.current.items,previousContainerId:R.current.containerId,transition:l,wasDragging:R.current.activeId!=null}),le=vr({disabled:!ce,index:b,node:w,rect:C});return(0,K.useEffect)(()=>{ie&&R.current.newIndex!==oe&&(R.current.newIndex=oe),d!==R.current.containerId&&(R.current.containerId=d),u!==R.current.items&&(R.current.items=u)},[ie,oe,d,u]),(0,K.useEffect)(()=>{if(L===R.current.activeId)return;if(L!=null&&R.current.activeId==null){R.current.activeId=L;return}let e=setTimeout(()=>{R.current.activeId=L},50);return()=>clearTimeout(e)},[L]),{active:D,activeIndex:f,attributes:k,data:x,rect:C,index:b,newIndex:oe,items:u,isOver:T,isSorting:ie,isDragging:M,listeners:j,node:w,overIndex:g,over:te,setNodeRef:re,setActivatorNodeRef:ne,setDroppableNodeRef:E,setDraggableNodeRef:A,transform:le??I,transition:ue()};function ue(){if(le||se&&R.current.newIndex===b)return Nr;if(!(F&&!ve(ee)||!l)&&(ie||ce))return Ee.Transition.toString({...l,property:Mr})}}function br(e,t){return typeof e==`boolean`?{draggable:e,droppable:!1}:{draggable:e?.draggable??t.draggable,droppable:e?.droppable??t.droppable}}function xr(e){if(!e)return!1;let t=e.data.current;return!!(t&&`sortable`in t&&typeof t.sortable==`object`&&`containerId`in t.sortable&&`items`in t.sortable&&`index`in t.sortable)}function Sr(e,t){return!xr(e)||!xr(t)?!1:e.data.current.sortable.containerId===t.data.current.sortable.containerId}function Cr(e,t){return!xr(e)||!xr(t)||!Sr(e,t)?!1:e.data.current.sortable.index<t.data.current.sortable.index}var K,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr=e((()=>{K=t(m()),ur(),Oe(),wr=e=>{let{rects:t,activeIndex:n,overIndex:r,index:i}=e,a=dr(t,r,n),o=t[i],s=a[i];return!s||!o?null:{x:s.left-o.left,y:s.top-o.top,scaleX:s.width/o.width,scaleY:s.height/o.height}},Tr={scaleX:1,scaleY:1},Er=e=>{let{activeIndex:t,activeNodeRect:n,index:r,rects:i,overIndex:a}=e,o=i[t]??n;if(!o)return null;if(r===t){let e=i[a];return e?{x:0,y:t<a?e.top+e.height-(o.top+o.height):e.top-o.top,...Tr}:null}let s=gr(i,r,t);return r>t&&r<=a?{x:0,y:-o.height-s,...Tr}:r<t&&r>=a?{x:0,y:o.height+s,...Tr}:{x:0,y:0,...Tr}},Dr=`Sortable`,Or=K.createContext({activeIndex:-1,containerId:Dr,disableTransforms:!1,items:[],overIndex:-1,useDragOverlay:!1,sortedRects:[],strategy:wr,disabled:{draggable:!1,droppable:!1}}),kr=e=>{let{id:t,items:n,activeIndex:r,overIndex:i}=e;return dr(n,r,i).indexOf(t)},Ar=e=>{let{containerId:t,isSorting:n,wasDragging:r,index:i,items:a,newIndex:o,previousItems:s,previousContainerId:c,transition:l}=e;return!l||!r||s!==a&&i===o?!1:n?!0:o!==i&&t===c},jr={duration:200,easing:`ease`},Mr=`transform`,Nr=Ee.Transition.toString({property:Mr,duration:0,easing:`linear`}),Pr={roleDescription:`sortable`},Fr=[G.Down,G.Right,G.Up,G.Left],Ir=(e,t)=>{let{context:{active:n,collisionRect:r,droppableRects:i,droppableContainers:a,over:o,scrollableAncestors:s}}=t;if(Fr.includes(e.code)){if(e.preventDefault(),!n||!r)return;let t=[];a.getEnabled().forEach(n=>{if(!n||n!=null&&n.disabled)return;let a=i.get(n.id);if(a)switch(e.code){case G.Down:r.top<a.top&&t.push(n);break;case G.Up:r.top>a.top&&t.push(n);break;case G.Left:r.left>a.left&&t.push(n);break;case G.Right:r.left<a.left&&t.push(n);break}});let c=dn({active:n,collisionRect:r,droppableRects:i,droppableContainers:t,pointerCoordinates:null}),l=Ke(c,`id`);if(l===o?.id&&c.length>1&&(l=c[1].id),l!=null){let e=a.get(n.id),t=a.get(l),o=t?i.get(t.id):null,c=t?.node.current;if(c&&o&&e&&t){let n=it(c).some((e,t)=>s[t]!==e),i=Sr(e,t),a=Cr(e,t),l=n||!i?{x:0,y:0}:{x:a?r.width-o.width:0,y:a?r.height-o.height:0},u={x:o.left,y:o.top};return l.x&&l.y?u:V(u,l)}}}}})),Rr,zr=e((()=>{Rr={addCardLabel:`Add card`,dialogAddTitle:`Add card`,dialogEditTitle:`Edit card`,dialogDeleteTitle:`Delete card`,dialogSave:`Save`,dialogCancel:`Cancel`,dialogDelete:`Delete`,dialogDeleteConfirm:`Delete "{title}"?`,dialogFieldTitle:`Title`,dialogFieldDescription:`Description`,dialogFieldAssignee:`Assignee`,dialogFieldDueDate:`Due date`,dialogFieldStatus:`Status`,noCardsLabel:`No cards`,searchFieldPlaceholder:`Search by title or assignee…`,dialogFieldSubtasks:`Subtasks`,dialogSubtaskAdd:`Add subtask`,cardSubtaskAdd:`Add subtask`,columnAddLabel:`Add column`,columnAddPlaceholder:`Column name`,columnDeleteConfirm:`Delete column "{label}"?`,columnDeleteCardsWarning:`{count} card(s) in this column will also be deleted.`,columnRenameTooltip:`Rename`,columnDeleteTooltip:`Delete column`}})),Br,Vr,Hr=e((()=>{k(),Br=y(),Vr=T((0,Br.jsx)(`path`,{d:`M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z`}),`CalendarToday`)})),Ur,Wr,Gr=e((()=>{k(),Ur=y(),Wr=T((0,Ur.jsx)(`path`,{d:`M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4`}),`Person`)})),q,Kr=e((()=>{q={root:`MuiTsKanbanBoard-root`,columns:`MuiTsKanbanBoard-columns`,column:`MuiTsKanbanBoard-column`,columnHeader:`MuiTsKanbanBoard-columnHeader`,columnTitle:`MuiTsKanbanBoard-columnTitle`,columnCount:`MuiTsKanbanBoard-columnCount`,columnBody:`MuiTsKanbanBoard-columnBody`,card:`MuiTsKanbanBoard-card`,cardTitle:`MuiTsKanbanBoard-cardTitle`,cardMeta:`MuiTsKanbanBoard-cardMeta`,cardAssignee:`MuiTsKanbanBoard-cardAssignee`,cardDueDate:`MuiTsKanbanBoard-cardDueDate`,cardPriorityDot:`MuiTsKanbanBoard-cardPriorityDot`,addButton:`MuiTsKanbanBoard-addButton`,searchFieldWrapper:`MuiTsKanbanBoard-searchFieldWrapper`,searchField:`MuiTsKanbanBoard-searchField`,cardSubtasks:`MuiTsKanbanBoard-cardSubtasks`,cardSubtasksBar:`MuiTsKanbanBoard-cardSubtasksBar`,columnActions:`MuiTsKanbanBoard-columnActions`,columnAddButton:`MuiTsKanbanBoard-columnAddButton`}}));function qr({task:e,showPriority:t,showAssignee:n,showDueDate:r,showDueDateWarning:i,showSubtasks:a,enableBuiltinDialogs:o,chipVariant:s,t:c,onCardClick:f,isOverlay:m=!1}){let{attributes:y,listeners:x,setNodeRef:S,transform:C,transition:w,isDragging:T}=yr({id:e.id,disabled:m}),E=m?void 0:{transform:Ee.Transform.toString(C),transition:w,opacity:+!T},D=n&&!!e.assignee||r&&!!e.dueDate,ee=a&&!!e.subtasks?.length,k=e.subtasks?.length??0,j=e.subtasks?.filter(e=>e.done).length??0,M=e.dueDate?e.dueDate.toLocaleDateString(void 0,{day:`2-digit`,month:`short`,year:`numeric`}):null,ne=new Date;ne.setHours(0,0,0,0);let N=i&&!!e.dueDate&&e.dueDate<ne;return(0,J.jsx)(p,{ref:m?void 0:S,style:E,elevation:0,className:[q.card,T&&A.selected].filter(Boolean).join(` `),sx:{mb:1,border:`1px solid`,borderColor:N&&!e.color?`error.light`:`divider`,borderLeft:e.color?`4px solid ${e.color}`:N?e=>`4px solid ${e.palette.error.main}`:void 0,userSelect:`none`,cursor:m?`grabbing`:`grab`,bgcolor:e=>N?e.palette.mode===`dark`?v(e.palette.error.main,.12):v(e.palette.error.main,.04):e.palette.mode===`dark`?e.palette.grey[800]:e.palette.background.paper,boxShadow:e=>e.palette.mode===`dark`?`0 1px 3px rgba(0,0,0,0.4)`:`0 1px 3px rgba(0,0,0,0.08)`,transition:`box-shadow 0.15s ease, transform 0.15s ease`,...!T&&!m&&{"&:hover":{boxShadow:e=>e.palette.mode===`dark`?`0 4px 14px rgba(0,0,0,0.5)`:`0 4px 14px rgba(0,0,0,0.12)`,transform:`translateY(-1px)`}},"&:active":{cursor:`grabbing`}},...m?{}:{...y,...x},onClick:()=>!T&&f(e),"aria-label":e.title,children:(0,J.jsx)(d,{component:`div`,sx:{cursor:`inherit`},children:(0,J.jsxs)(u,{sx:{p:1.5,"&:last-child":{pb:1.5}},children:[(0,J.jsxs)(l,{sx:{display:`flex`,alignItems:`flex-start`,gap:.75,mb:D||ee?1:0},children:[t&&e.priority&&(0,J.jsx)(l,{className:q.cardPriorityDot,role:`img`,"aria-label":`Priority: ${e.priority}`,sx:{width:8,height:8,minWidth:8,borderRadius:`50%`,bgcolor:Jr[e.priority],mt:`5px`,flexShrink:0}}),(0,J.jsx)(h,{className:q.cardTitle,variant:`body2`,sx:{lineHeight:1.4,fontWeight:700,letterSpacing:`-0.01em`},children:e.title})]}),D&&(0,J.jsxs)(l,{className:q.cardMeta,sx:{display:`flex`,gap:1,flexWrap:`wrap`,alignItems:`center`},children:[n&&e.assignee&&(0,J.jsx)(g,{className:q.cardAssignee,icon:(0,J.jsx)(Wr,{}),label:e.assignee,size:`small`,variant:s,"aria-label":`${c.dialogFieldAssignee}: ${e.assignee}`,sx:Yr}),r&&M&&(0,J.jsx)(g,{className:q.cardDueDate,icon:(0,J.jsx)(Vr,{}),label:M,size:`small`,variant:s,color:N?`error`:`default`,"aria-label":`${c.dialogFieldDueDate}: ${M}`,sx:Yr})]}),ee&&(0,J.jsxs)(l,{className:q.cardSubtasks,sx:{display:`flex`,alignItems:`center`,gap:1,mt:D?.75:0},children:[(0,J.jsx)(O,{className:q.cardSubtasksBar,variant:`determinate`,value:j/k*100,sx:{flex:1,height:4,borderRadius:2},"aria-label":`${j} of ${k} subtasks done`}),(0,J.jsxs)(h,{variant:`caption`,sx:{whiteSpace:`nowrap`,color:`text.secondary`,fontSize:`0.65rem`,lineHeight:1},children:[j,` / `,k,` ✓`]}),o&&!m&&(0,J.jsx)(b,{title:c.cardSubtaskAdd,placement:`top`,arrow:!0,children:(0,J.jsx)(_,{size:`small`,"aria-label":c.cardSubtaskAdd,onClick:t=>{t.stopPropagation(),f(e)},sx:{p:.25,opacity:0,transition:`opacity 0.15s`,[`.${q.card}:hover &`]:{opacity:1}},children:(0,J.jsx)(te,{sx:{fontSize:`0.85rem`}})})})]})]})})})}var J,Jr,Yr,Xr=e((()=>{Lr(),Oe(),M(),Hr(),Gr(),D(),s(),Kr(),j(),J=y(),Jr={low:`#4caf50`,medium:`#ff9800`,high:`#f44336`,critical:`#9c27b0`},Yr={fontSize:`0.7rem`,height:22,"& .MuiChip-icon":{fontSize:`0.75rem`,width:`0.75rem`,height:`0.75rem`,ml:`8px`,mr:`4px`},"& .MuiChip-label":{pl:`2px`,pr:`10px`}},qr.__docgenInfo={description:``,methods:[],displayName:`KanbanBoardCard`,props:{task:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},description:``},showPriority:{required:!0,tsType:{name:`boolean`},description:``},showAssignee:{required:!0,tsType:{name:`boolean`},description:``},showDueDate:{required:!0,tsType:{name:`boolean`},description:``},showDueDateWarning:{required:!0,tsType:{name:`boolean`},description:``},showSubtasks:{required:!0,tsType:{name:`boolean`},description:``},enableBuiltinDialogs:{required:!0,tsType:{name:`boolean`},description:``},chipVariant:{required:!0,tsType:{name:`union`,raw:`"outlined" | "filled"`,elements:[{name:`literal`,value:`"outlined"`},{name:`literal`,value:`"filled"`}]},description:``},t:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  addCardLabel: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  /** "{title}" is replaced with the card title. */
  dialogDeleteConfirm: string;
  dialogFieldTitle: string;
  dialogFieldDescription: string;
  dialogFieldAssignee: string;
  dialogFieldDueDate: string;
  dialogFieldStatus: string;
  noCardsLabel: string;
  /** Placeholder text for the built-in search field (\`showSearchField={true}\`). */
  searchFieldPlaceholder: string;
  /** Section label for the subtask checklist in the edit/add dialog. */
  dialogFieldSubtasks: string;
  /** Placeholder for the "add subtask" input in the dialog. */
  dialogSubtaskAdd: string;
  /** Tooltip for the "+" button on the card's subtask progress bar. */
  cardSubtaskAdd: string;
  /** Button label for the "Add column" ghost button (\`enableColumnManagement\`). */
  columnAddLabel: string;
  /** Placeholder inside the add-column dialog text field. */
  columnAddPlaceholder: string;
  /** Confirmation dialog title when deleting a column. "{label}" → column name. */
  columnDeleteConfirm: string;
  /** Warning line shown when the column being deleted still has cards. "{count}" → number of cards. */
  columnDeleteCardsWarning: string;
  /** Tooltip on the rename icon in the column header. */
  columnRenameTooltip: string;
  /** Tooltip on the delete icon in the column header. */
  columnDeleteTooltip: string;
}`,signature:{properties:[{key:`addCardLabel`,value:{name:`string`,required:!0}},{key:`dialogAddTitle`,value:{name:`string`,required:!0}},{key:`dialogEditTitle`,value:{name:`string`,required:!0}},{key:`dialogDeleteTitle`,value:{name:`string`,required:!0}},{key:`dialogSave`,value:{name:`string`,required:!0}},{key:`dialogCancel`,value:{name:`string`,required:!0}},{key:`dialogDelete`,value:{name:`string`,required:!0}},{key:`dialogDeleteConfirm`,value:{name:`string`,required:!0},description:`"{title}" is replaced with the card title.`},{key:`dialogFieldTitle`,value:{name:`string`,required:!0}},{key:`dialogFieldDescription`,value:{name:`string`,required:!0}},{key:`dialogFieldAssignee`,value:{name:`string`,required:!0}},{key:`dialogFieldDueDate`,value:{name:`string`,required:!0}},{key:`dialogFieldStatus`,value:{name:`string`,required:!0}},{key:`noCardsLabel`,value:{name:`string`,required:!0}},{key:`searchFieldPlaceholder`,value:{name:`string`,required:!0},description:"Placeholder text for the built-in search field (`showSearchField={true}`)."},{key:`dialogFieldSubtasks`,value:{name:`string`,required:!0},description:`Section label for the subtask checklist in the edit/add dialog.`},{key:`dialogSubtaskAdd`,value:{name:`string`,required:!0},description:`Placeholder for the "add subtask" input in the dialog.`},{key:`cardSubtaskAdd`,value:{name:`string`,required:!0},description:`Tooltip for the "+" button on the card's subtask progress bar.`},{key:`columnAddLabel`,value:{name:`string`,required:!0},description:'Button label for the "Add column" ghost button (`enableColumnManagement`).'},{key:`columnAddPlaceholder`,value:{name:`string`,required:!0},description:`Placeholder inside the add-column dialog text field.`},{key:`columnDeleteConfirm`,value:{name:`string`,required:!0},description:`Confirmation dialog title when deleting a column. "{label}" → column name.`},{key:`columnDeleteCardsWarning`,value:{name:`string`,required:!0},description:`Warning line shown when the column being deleted still has cards. "{count}" → number of cards.`},{key:`columnRenameTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the rename icon in the column header.`},{key:`columnDeleteTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the delete icon in the column header.`}]}}],raw:`Required<KanbanBoardTranslation>`},description:``},onCardClick:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:``},isOverlay:{required:!1,tsType:{name:`boolean`},description:`True when this card is the drag overlay ghost — rendered without transform/listeners.`,defaultValue:{value:`false`,computed:!1}}}}}));function Zr({state:e,columns:t,t:s,showSubtasks:c,onSave:u,onDelete:d,onClose:p,onRequestDelete:m}){let g=e?.mode===`add`,v=e?.mode===`edit`,y=e?.mode===`delete`,b=v?e.task:null,T=y?e.task:null,D=g?e.columnId:null,[O,k]=(0,Qr.useState)(()=>v&&b?{...b}:g&&D?{id:``,title:``,status:D}:{id:``,title:``,status:t[0]?.id??``}),[A,j]=(0,Qr.useState)(``);function M(){let e=A.trim();if(!e)return;let t={id:crypto.randomUUID(),title:e,done:!1};k(e=>({...e,subtasks:[...e.subtasks??[],t]})),j(``)}function ne(e){k(t=>({...t,subtasks:t.subtasks?.map(t=>t.id===e?{...t,done:!t.done}:t)}))}function re(e){k(t=>({...t,subtasks:t.subtasks?.filter(t=>t.id!==e)}))}function ie(){let e=O.title.trim();e&&u({...O,title:e,id:v?O.id:crypto.randomUUID()})}function P(e,t){k(n=>({...n,[e]:t}))}let ae=g?s.dialogAddTitle:v?s.dialogEditTitle:s.dialogDeleteTitle;return(0,Y.jsxs)(n,{open:!!e,onClose:p,maxWidth:`xs`,fullWidth:!0,children:[(0,Y.jsx)(a,{children:ae}),y&&T?(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(f,{children:(0,Y.jsx)(i,{children:s.dialogDeleteConfirm.replace(`{title}`,T.title)})}),(0,Y.jsxs)(w,{children:[(0,Y.jsx)(o,{onClick:p,children:s.dialogCancel}),(0,Y.jsx)(o,{color:`error`,startIcon:(0,Y.jsx)(N,{}),onClick:()=>d(T.id),children:s.dialogDelete})]})]}):(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(f,{children:(0,Y.jsxs)(E,{spacing:2,sx:{pt:.5},children:[(0,Y.jsx)(S,{label:s.dialogFieldTitle,value:O.title,onChange:e=>P(`title`,e.target.value),required:!0,fullWidth:!0,size:`small`,autoFocus:!0,onKeyDown:e=>e.key===`Enter`&&ie()}),(0,Y.jsx)(S,{label:s.dialogFieldDescription,value:O.description??``,onChange:e=>P(`description`,e.target.value||void 0),fullWidth:!0,size:`small`,multiline:!0,rows:3}),(0,Y.jsx)(S,{label:s.dialogFieldAssignee,value:O.assignee??``,onChange:e=>P(`assignee`,e.target.value||void 0),fullWidth:!0,size:`small`}),(0,Y.jsx)(S,{label:s.dialogFieldDueDate,type:`date`,value:O.dueDate?O.dueDate.toISOString().split(`T`)[0]:``,onChange:e=>P(`dueDate`,e.target.value?new Date(e.target.value+`T00:00:00`):void 0),fullWidth:!0,size:`small`,slotProps:{inputLabel:{shrink:!0}}}),(0,Y.jsx)(S,{select:!0,label:s.dialogFieldStatus,value:O.status,onChange:e=>P(`status`,e.target.value),fullWidth:!0,size:`small`,children:t.map(e=>(0,Y.jsx)(x,{value:e.id,children:e.label},e.id))}),c&&(0,Y.jsxs)(l,{children:[(0,Y.jsx)(h,{variant:`caption`,color:`text.secondary`,sx:{display:`block`,mb:.5},children:s.dialogFieldSubtasks}),(0,Y.jsx)(E,{spacing:.25,children:(O.subtasks??[]).map(e=>(0,Y.jsxs)(l,{sx:{display:`flex`,alignItems:`center`},children:[(0,Y.jsx)(r,{sx:{flex:1,m:0},control:(0,Y.jsx)(C,{size:`small`,checked:e.done,onChange:()=>ne(e.id),sx:{p:.5}}),label:(0,Y.jsx)(h,{variant:`body2`,sx:{textDecoration:e.done?`line-through`:`none`,color:e.done?`text.disabled`:`text.primary`},children:e.title})}),(0,Y.jsx)(_,{size:`small`,onClick:()=>re(e.id),"aria-label":`Remove ${e.title}`,children:(0,Y.jsx)(F,{fontSize:`small`})})]},e.id))}),(0,Y.jsx)(S,{size:`small`,placeholder:s.dialogSubtaskAdd,value:A,onChange:e=>j(e.target.value),onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),M())},fullWidth:!0,sx:{mt:1},slotProps:{input:{endAdornment:(0,Y.jsx)(ee,{position:`end`,children:(0,Y.jsx)(_,{size:`small`,onClick:M,disabled:!A.trim(),"aria-label":s.dialogSubtaskAdd,children:(0,Y.jsx)(te,{fontSize:`small`})})})}}})]})]})}),(0,Y.jsxs)(w,{sx:{justifyContent:v?`space-between`:`flex-end`},children:[v&&b&&(0,Y.jsx)(o,{color:`error`,startIcon:(0,Y.jsx)(N,{}),onClick:()=>m(b),children:s.dialogDelete}),(0,Y.jsxs)(E,{direction:`row`,spacing:1,children:[(0,Y.jsx)(o,{onClick:p,children:s.dialogCancel}),(0,Y.jsx)(o,{variant:`contained`,onClick:ie,disabled:!O.title.trim(),children:s.dialogSave})]})]})]})]})}var Qr,Y,$r=e((()=>{M(),P(),ne(),D(),Qr=t(m(),1),Y=y(),Zr.__docgenInfo={description:``,methods:[],displayName:`KanbanBoardCardDialog`,props:{state:{required:!0,tsType:{name:`union`,raw:`KanbanDialogState | null`,elements:[{name:`union`,raw:`| { mode: "add"; columnId: string }
| { mode: "edit"; task: KanbanTask }
| { mode: "delete"; task: KanbanTask }`,elements:[{name:`signature`,type:`object`,raw:`{ mode: "add"; columnId: string }`,signature:{properties:[{key:`mode`,value:{name:`literal`,value:`"add"`,required:!0}},{key:`columnId`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ mode: "edit"; task: KanbanTask }`,signature:{properties:[{key:`mode`,value:{name:`literal`,value:`"edit"`,required:!0}},{key:`task`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]},required:!0}}]}},{name:`signature`,type:`object`,raw:`{ mode: "delete"; task: KanbanTask }`,signature:{properties:[{key:`mode`,value:{name:`literal`,value:`"delete"`,required:!0}},{key:`task`,value:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]},required:!0}}]}}]},{name:`null`}]},description:``},columns:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}}],raw:`KanbanColumn[]`},description:``},t:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  addCardLabel: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  /** "{title}" is replaced with the card title. */
  dialogDeleteConfirm: string;
  dialogFieldTitle: string;
  dialogFieldDescription: string;
  dialogFieldAssignee: string;
  dialogFieldDueDate: string;
  dialogFieldStatus: string;
  noCardsLabel: string;
  /** Placeholder text for the built-in search field (\`showSearchField={true}\`). */
  searchFieldPlaceholder: string;
  /** Section label for the subtask checklist in the edit/add dialog. */
  dialogFieldSubtasks: string;
  /** Placeholder for the "add subtask" input in the dialog. */
  dialogSubtaskAdd: string;
  /** Tooltip for the "+" button on the card's subtask progress bar. */
  cardSubtaskAdd: string;
  /** Button label for the "Add column" ghost button (\`enableColumnManagement\`). */
  columnAddLabel: string;
  /** Placeholder inside the add-column dialog text field. */
  columnAddPlaceholder: string;
  /** Confirmation dialog title when deleting a column. "{label}" → column name. */
  columnDeleteConfirm: string;
  /** Warning line shown when the column being deleted still has cards. "{count}" → number of cards. */
  columnDeleteCardsWarning: string;
  /** Tooltip on the rename icon in the column header. */
  columnRenameTooltip: string;
  /** Tooltip on the delete icon in the column header. */
  columnDeleteTooltip: string;
}`,signature:{properties:[{key:`addCardLabel`,value:{name:`string`,required:!0}},{key:`dialogAddTitle`,value:{name:`string`,required:!0}},{key:`dialogEditTitle`,value:{name:`string`,required:!0}},{key:`dialogDeleteTitle`,value:{name:`string`,required:!0}},{key:`dialogSave`,value:{name:`string`,required:!0}},{key:`dialogCancel`,value:{name:`string`,required:!0}},{key:`dialogDelete`,value:{name:`string`,required:!0}},{key:`dialogDeleteConfirm`,value:{name:`string`,required:!0},description:`"{title}" is replaced with the card title.`},{key:`dialogFieldTitle`,value:{name:`string`,required:!0}},{key:`dialogFieldDescription`,value:{name:`string`,required:!0}},{key:`dialogFieldAssignee`,value:{name:`string`,required:!0}},{key:`dialogFieldDueDate`,value:{name:`string`,required:!0}},{key:`dialogFieldStatus`,value:{name:`string`,required:!0}},{key:`noCardsLabel`,value:{name:`string`,required:!0}},{key:`searchFieldPlaceholder`,value:{name:`string`,required:!0},description:"Placeholder text for the built-in search field (`showSearchField={true}`)."},{key:`dialogFieldSubtasks`,value:{name:`string`,required:!0},description:`Section label for the subtask checklist in the edit/add dialog.`},{key:`dialogSubtaskAdd`,value:{name:`string`,required:!0},description:`Placeholder for the "add subtask" input in the dialog.`},{key:`cardSubtaskAdd`,value:{name:`string`,required:!0},description:`Tooltip for the "+" button on the card's subtask progress bar.`},{key:`columnAddLabel`,value:{name:`string`,required:!0},description:'Button label for the "Add column" ghost button (`enableColumnManagement`).'},{key:`columnAddPlaceholder`,value:{name:`string`,required:!0},description:`Placeholder inside the add-column dialog text field.`},{key:`columnDeleteConfirm`,value:{name:`string`,required:!0},description:`Confirmation dialog title when deleting a column. "{label}" → column name.`},{key:`columnDeleteCardsWarning`,value:{name:`string`,required:!0},description:`Warning line shown when the column being deleted still has cards. "{count}" → number of cards.`},{key:`columnRenameTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the rename icon in the column header.`},{key:`columnDeleteTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the delete icon in the column header.`}]}}],raw:`Required<KanbanBoardTranslation>`},description:``},showSubtasks:{required:!0,tsType:{name:`boolean`},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:``},onDelete:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(taskId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`taskId`}],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onRequestDelete:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:`Switch from edit to delete confirmation — handled in parent.`}}}}));function ei({state:e,t,onAdd:r,onDelete:i,onClose:s}){let[c,u]=(0,ti.useState)(``);if(!e)return null;function d(){let e=c.trim();e&&(r({id:crypto.randomUUID(),label:e}),u(``))}if(e.mode===`add`)return(0,X.jsxs)(n,{open:!0,onClose:s,maxWidth:`xs`,fullWidth:!0,children:[(0,X.jsx)(a,{children:t.columnAddLabel}),(0,X.jsx)(f,{children:(0,X.jsx)(S,{autoFocus:!0,fullWidth:!0,size:`small`,placeholder:t.columnAddPlaceholder,value:c,onChange:e=>u(e.target.value),onKeyDown:e=>{e.key===`Enter`&&d(),e.key===`Escape`&&s()},sx:{mt:1}})}),(0,X.jsxs)(w,{children:[(0,X.jsx)(o,{onClick:s,children:t.dialogCancel}),(0,X.jsx)(o,{variant:`contained`,onClick:d,disabled:!c.trim(),children:t.dialogSave})]})]});let p=t.columnDeleteConfirm.replace(`{label}`,e.column.label),m=e.cardCount>0;return(0,X.jsxs)(n,{open:!0,onClose:s,maxWidth:`xs`,fullWidth:!0,children:[(0,X.jsx)(a,{children:p}),m&&(0,X.jsx)(f,{children:(0,X.jsx)(l,{sx:{display:`flex`,flexDirection:`column`,gap:1},children:(0,X.jsx)(h,{variant:`body2`,color:`text.secondary`,children:t.columnDeleteCardsWarning.replace(`{count}`,String(e.cardCount))})})}),(0,X.jsxs)(w,{children:[(0,X.jsx)(o,{onClick:s,children:t.dialogCancel}),(0,X.jsx)(o,{color:`error`,variant:`contained`,onClick:()=>i(e.column.id),children:t.dialogDelete})]})]})}var ti,X,ni=e((()=>{ti=t(m(),1),D(),X=y(),ei.__docgenInfo={description:``,methods:[],displayName:`KanbanBoardColumnDialog`,props:{state:{required:!0,tsType:{name:`union`,raw:`KanbanColumnDialogState | null`,elements:[{name:`union`,raw:`| { mode: "add" }
| { mode: "delete"; column: KanbanColumn; cardCount: number }`,elements:[{name:`signature`,type:`object`,raw:`{ mode: "add" }`,signature:{properties:[{key:`mode`,value:{name:`literal`,value:`"add"`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{ mode: "delete"; column: KanbanColumn; cardCount: number }`,signature:{properties:[{key:`mode`,value:{name:`literal`,value:`"delete"`,required:!0}},{key:`column`,value:{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]},required:!0}},{key:`cardCount`,value:{name:`number`,required:!0}}]}}]},{name:`null`}]},description:``},t:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  addCardLabel: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  /** "{title}" is replaced with the card title. */
  dialogDeleteConfirm: string;
  dialogFieldTitle: string;
  dialogFieldDescription: string;
  dialogFieldAssignee: string;
  dialogFieldDueDate: string;
  dialogFieldStatus: string;
  noCardsLabel: string;
  /** Placeholder text for the built-in search field (\`showSearchField={true}\`). */
  searchFieldPlaceholder: string;
  /** Section label for the subtask checklist in the edit/add dialog. */
  dialogFieldSubtasks: string;
  /** Placeholder for the "add subtask" input in the dialog. */
  dialogSubtaskAdd: string;
  /** Tooltip for the "+" button on the card's subtask progress bar. */
  cardSubtaskAdd: string;
  /** Button label for the "Add column" ghost button (\`enableColumnManagement\`). */
  columnAddLabel: string;
  /** Placeholder inside the add-column dialog text field. */
  columnAddPlaceholder: string;
  /** Confirmation dialog title when deleting a column. "{label}" → column name. */
  columnDeleteConfirm: string;
  /** Warning line shown when the column being deleted still has cards. "{count}" → number of cards. */
  columnDeleteCardsWarning: string;
  /** Tooltip on the rename icon in the column header. */
  columnRenameTooltip: string;
  /** Tooltip on the delete icon in the column header. */
  columnDeleteTooltip: string;
}`,signature:{properties:[{key:`addCardLabel`,value:{name:`string`,required:!0}},{key:`dialogAddTitle`,value:{name:`string`,required:!0}},{key:`dialogEditTitle`,value:{name:`string`,required:!0}},{key:`dialogDeleteTitle`,value:{name:`string`,required:!0}},{key:`dialogSave`,value:{name:`string`,required:!0}},{key:`dialogCancel`,value:{name:`string`,required:!0}},{key:`dialogDelete`,value:{name:`string`,required:!0}},{key:`dialogDeleteConfirm`,value:{name:`string`,required:!0},description:`"{title}" is replaced with the card title.`},{key:`dialogFieldTitle`,value:{name:`string`,required:!0}},{key:`dialogFieldDescription`,value:{name:`string`,required:!0}},{key:`dialogFieldAssignee`,value:{name:`string`,required:!0}},{key:`dialogFieldDueDate`,value:{name:`string`,required:!0}},{key:`dialogFieldStatus`,value:{name:`string`,required:!0}},{key:`noCardsLabel`,value:{name:`string`,required:!0}},{key:`searchFieldPlaceholder`,value:{name:`string`,required:!0},description:"Placeholder text for the built-in search field (`showSearchField={true}`)."},{key:`dialogFieldSubtasks`,value:{name:`string`,required:!0},description:`Section label for the subtask checklist in the edit/add dialog.`},{key:`dialogSubtaskAdd`,value:{name:`string`,required:!0},description:`Placeholder for the "add subtask" input in the dialog.`},{key:`cardSubtaskAdd`,value:{name:`string`,required:!0},description:`Tooltip for the "+" button on the card's subtask progress bar.`},{key:`columnAddLabel`,value:{name:`string`,required:!0},description:'Button label for the "Add column" ghost button (`enableColumnManagement`).'},{key:`columnAddPlaceholder`,value:{name:`string`,required:!0},description:`Placeholder inside the add-column dialog text field.`},{key:`columnDeleteConfirm`,value:{name:`string`,required:!0},description:`Confirmation dialog title when deleting a column. "{label}" → column name.`},{key:`columnDeleteCardsWarning`,value:{name:`string`,required:!0},description:`Warning line shown when the column being deleted still has cards. "{count}" → number of cards.`},{key:`columnRenameTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the rename icon in the column header.`},{key:`columnDeleteTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the delete icon in the column header.`}]}}],raw:`Required<KanbanBoardTranslation>`},description:``},onAdd:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(column: KanbanColumn) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}},name:`column`}],return:{name:`void`}}},description:``},onDelete:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(columnId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`columnId`}],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),ri,ii,ai=e((()=>{k(),ri=y(),ii=T((0,ri.jsx)(`path`,{d:`M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z`}),`DeleteOutlined`)})),oi,si,ci=e((()=>{k(),oi=y(),si=T((0,oi.jsx)(`path`,{d:`m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z`}),`EditOutlined`)}));function li({column:e,tasks:t,totalCount:n,showPriority:r,showAssignee:i,showDueDate:a,showDueDateWarning:s,showSubtasks:c,chipVariant:u,t:d,enableBuiltinDialogs:f,enableColumnManagement:p,onCardClick:m,onAddClick:v,onColumnRename:y,onColumnDeleteRequest:x}){let{setNodeRef:C,isOver:w}=$t({id:e.id}),[T,E]=(0,ui.useState)(!1),[D,ee]=(0,ui.useState)(e.label);function O(){let t=D.trim();t&&t!==e.label?y(e.id,t):ee(e.label),E(!1)}function k(){ee(e.label),E(!0)}let A=e.wipLimit!==void 0&&n>e.wipLimit,j=e.wipLimit===void 0?`${t.length}`:`${t.length} / ${e.wipLimit}`,M=e.color??`primary.main`;return(0,Z.jsxs)(l,{className:q.column,sx:{display:`flex`,flexDirection:`column`,minWidth:240,maxWidth:320,flex:`1 1 240px`,bgcolor:`background.paper`,borderRadius:2,overflow:`hidden`,border:`1px solid`,borderColor:`divider`},children:[(0,Z.jsxs)(l,{className:q.columnHeader,sx:{px:2,py:1.25,display:`flex`,alignItems:`center`,gap:1,borderBottom:`1px solid`,borderColor:`divider`,borderTop:`3px solid ${e.color??`transparent`}`,bgcolor:e=>e.palette.mode===`dark`?`grey.800`:`grey.300`},children:[T?(0,Z.jsx)(S,{autoFocus:!0,size:`small`,value:D,onChange:e=>ee(e.target.value),onBlur:O,onKeyDown:t=>{t.key===`Enter`&&(t.preventDefault(),O()),t.key===`Escape`&&(ee(e.label),E(!1))},sx:{flex:1,"& .MuiInputBase-input":{fontWeight:700,fontSize:`0.875rem`,py:.5}},slotProps:{htmlInput:{"aria-label":d.columnRenameTooltip}}}):(0,Z.jsx)(h,{className:q.columnTitle,variant:`subtitle2`,sx:{flex:1,fontWeight:700},children:e.label}),(0,Z.jsx)(g,{className:q.columnCount,label:j,size:`small`,color:A?`error`:`default`,sx:{height:20,fontSize:`0.7rem`,...!A&&e.color&&{bgcolor:e.color,color:`#fff`}},"aria-label":`${t.length} cards${e.wipLimit?` of ${e.wipLimit} limit`:``}${t.length===n?``:` (${n} total)`}`}),p&&!T&&(0,Z.jsxs)(l,{className:q.columnActions,sx:{display:`flex`,gap:.25},children:[(0,Z.jsx)(b,{title:d.columnRenameTooltip,children:(0,Z.jsx)(_,{size:`small`,onClick:k,sx:{p:.25},children:(0,Z.jsx)(si,{sx:{fontSize:18}})})}),(0,Z.jsx)(b,{title:d.columnDeleteTooltip,children:(0,Z.jsx)(_,{size:`small`,onClick:()=>x(e.id),sx:{p:.25,color:`error.main`},children:(0,Z.jsx)(ii,{sx:{fontSize:18}})})})]})]}),(0,Z.jsx)(_r,{items:t.map(e=>e.id),strategy:Er,children:(0,Z.jsxs)(l,{ref:C,className:q.columnBody,sx:{flex:1,overflowY:`auto`,scrollbarWidth:`none`,"&::-webkit-scrollbar":{display:`none`},p:1,minHeight:80,bgcolor:e=>w?e.palette.action.selected:e.palette.mode===`dark`?e.palette.grey[900]:e.palette.grey[100],transition:`background-color 0.15s`},children:[t.length===0&&!w&&(0,Z.jsx)(h,{variant:`caption`,color:`text.disabled`,sx:{display:`block`,textAlign:`center`,mt:2},children:d.noCardsLabel}),t.map(e=>(0,Z.jsx)(qr,{task:e,showPriority:r,showAssignee:i,showDueDate:a,showDueDateWarning:s,showSubtasks:c,enableBuiltinDialogs:f,chipVariant:u,t:d,onCardClick:m},e.id))]})}),f&&(0,Z.jsx)(l,{sx:{p:1,borderTop:`1px solid`,borderColor:`divider`},children:(0,Z.jsx)(o,{className:q.addButton,startIcon:(0,Z.jsx)(te,{}),size:`small`,fullWidth:!0,onClick:()=>v(e.id),sx:{justifyContent:`flex-start`,color:M,border:`1px dashed`,borderColor:M,borderRadius:1,py:.75,fontWeight:600,letterSpacing:.5,"&:hover":{bgcolor:`action.hover`,borderStyle:`dashed`}},children:d.addCardLabel})})]})}var ui,Z,di=e((()=>{ui=t(m(),1),ur(),Lr(),M(),ai(),ci(),D(),Xr(),Kr(),Z=y(),li.__docgenInfo={description:``,methods:[],displayName:`KanbanBoardColumn`,props:{column:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}},description:``},tasks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}}],raw:`KanbanTask[]`},description:``},totalCount:{required:!0,tsType:{name:`number`},description:`Total tasks in this column before any filter — used for WIP-limit checking.`},showPriority:{required:!0,tsType:{name:`boolean`},description:``},showAssignee:{required:!0,tsType:{name:`boolean`},description:``},showDueDate:{required:!0,tsType:{name:`boolean`},description:``},showDueDateWarning:{required:!0,tsType:{name:`boolean`},description:``},showSubtasks:{required:!0,tsType:{name:`boolean`},description:``},chipVariant:{required:!0,tsType:{name:`union`,raw:`"outlined" | "filled"`,elements:[{name:`literal`,value:`"outlined"`},{name:`literal`,value:`"filled"`}]},description:``},t:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  addCardLabel: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  /** "{title}" is replaced with the card title. */
  dialogDeleteConfirm: string;
  dialogFieldTitle: string;
  dialogFieldDescription: string;
  dialogFieldAssignee: string;
  dialogFieldDueDate: string;
  dialogFieldStatus: string;
  noCardsLabel: string;
  /** Placeholder text for the built-in search field (\`showSearchField={true}\`). */
  searchFieldPlaceholder: string;
  /** Section label for the subtask checklist in the edit/add dialog. */
  dialogFieldSubtasks: string;
  /** Placeholder for the "add subtask" input in the dialog. */
  dialogSubtaskAdd: string;
  /** Tooltip for the "+" button on the card's subtask progress bar. */
  cardSubtaskAdd: string;
  /** Button label for the "Add column" ghost button (\`enableColumnManagement\`). */
  columnAddLabel: string;
  /** Placeholder inside the add-column dialog text field. */
  columnAddPlaceholder: string;
  /** Confirmation dialog title when deleting a column. "{label}" → column name. */
  columnDeleteConfirm: string;
  /** Warning line shown when the column being deleted still has cards. "{count}" → number of cards. */
  columnDeleteCardsWarning: string;
  /** Tooltip on the rename icon in the column header. */
  columnRenameTooltip: string;
  /** Tooltip on the delete icon in the column header. */
  columnDeleteTooltip: string;
}`,signature:{properties:[{key:`addCardLabel`,value:{name:`string`,required:!0}},{key:`dialogAddTitle`,value:{name:`string`,required:!0}},{key:`dialogEditTitle`,value:{name:`string`,required:!0}},{key:`dialogDeleteTitle`,value:{name:`string`,required:!0}},{key:`dialogSave`,value:{name:`string`,required:!0}},{key:`dialogCancel`,value:{name:`string`,required:!0}},{key:`dialogDelete`,value:{name:`string`,required:!0}},{key:`dialogDeleteConfirm`,value:{name:`string`,required:!0},description:`"{title}" is replaced with the card title.`},{key:`dialogFieldTitle`,value:{name:`string`,required:!0}},{key:`dialogFieldDescription`,value:{name:`string`,required:!0}},{key:`dialogFieldAssignee`,value:{name:`string`,required:!0}},{key:`dialogFieldDueDate`,value:{name:`string`,required:!0}},{key:`dialogFieldStatus`,value:{name:`string`,required:!0}},{key:`noCardsLabel`,value:{name:`string`,required:!0}},{key:`searchFieldPlaceholder`,value:{name:`string`,required:!0},description:"Placeholder text for the built-in search field (`showSearchField={true}`)."},{key:`dialogFieldSubtasks`,value:{name:`string`,required:!0},description:`Section label for the subtask checklist in the edit/add dialog.`},{key:`dialogSubtaskAdd`,value:{name:`string`,required:!0},description:`Placeholder for the "add subtask" input in the dialog.`},{key:`cardSubtaskAdd`,value:{name:`string`,required:!0},description:`Tooltip for the "+" button on the card's subtask progress bar.`},{key:`columnAddLabel`,value:{name:`string`,required:!0},description:'Button label for the "Add column" ghost button (`enableColumnManagement`).'},{key:`columnAddPlaceholder`,value:{name:`string`,required:!0},description:`Placeholder inside the add-column dialog text field.`},{key:`columnDeleteConfirm`,value:{name:`string`,required:!0},description:`Confirmation dialog title when deleting a column. "{label}" → column name.`},{key:`columnDeleteCardsWarning`,value:{name:`string`,required:!0},description:`Warning line shown when the column being deleted still has cards. "{count}" → number of cards.`},{key:`columnRenameTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the rename icon in the column header.`},{key:`columnDeleteTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the delete icon in the column header.`}]}}],raw:`Required<KanbanBoardTranslation>`},description:``},enableBuiltinDialogs:{required:!0,tsType:{name:`boolean`},description:``},enableColumnManagement:{required:!0,tsType:{name:`boolean`},description:``},onCardClick:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:``},onAddClick:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(columnId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`columnId`}],return:{name:`void`}}},description:``},onColumnRename:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(columnId: string, newLabel: string) => void`,signature:{arguments:[{type:{name:`string`},name:`columnId`},{type:{name:`string`},name:`newLabel`}],return:{name:`void`}}},description:``},onColumnDeleteRequest:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(columnId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`columnId`}],return:{name:`void`}}},description:``}}}}));function fi({tasks:e,columns:t,onTasksChange:n,onCardClick:r,enableBuiltinDialogs:i=!0,enableColumnManagement:a=!1,onTaskCreated:s,onTaskUpdated:c,onTaskDeleted:u,onTaskMoved:d,onColumnsChange:f,onColumnAdd:p,onColumnUpdate:m,onColumnDelete:h,showPriority:g=!0,showAssignee:_=!0,showDueDate:v=!0,showDueDateWarning:y=!0,showSubtasks:b=!0,chipVariant:x=`outlined`,showSearchField:C=!1,filterText:w=``,width:T=`100%`,height:E=`100%`,translation:D}){let O={...Rr,...D},[k,A]=(0,pi.useState)(e);(0,pi.useEffect)(()=>{A(e)},[e]);let[j,M]=(0,pi.useState)(t);(0,pi.useEffect)(()=>{M(t)},[t]);let[ne,N]=(0,pi.useState)(null),[re,P]=(0,pi.useState)(null),[F,ae]=(0,pi.useState)(null),[I,oe]=(0,pi.useState)(``),L=Be(ze(Tn,{activationConstraint:{distance:8}}),ze(Sn,{coordinateGetter:Ir}));function R({active:e}){N(k.find(t=>t.id===e.id)??null)}function se({active:e,over:n}){if(!n)return;let r=e.id,i=n.id,a=k.find(e=>e.id===r);if(!a)return;let o=t.find(e=>e.id===i),s=k.find(e=>e.id===i),c=o?.id??s?.status;!c||a.status===c||A(e=>e.map(e=>e.id===r?{...e,status:c}:e))}function ce({active:t,over:r}){let i=ne?.status;if(N(null),!r){A(e);return}let a=t.id,o=r.id,s=k.findIndex(e=>e.id===a),c=k.findIndex(e=>e.id===o),l;if(l=s!==-1&&c!==-1&&s!==c?dr(k,s,c):[...k],A(l),n?.(l),i){let e=l.find(e=>e.id===a);e&&e.status!==i&&d?.(e,i,e.status)}}function le(e){i?P({mode:`edit`,task:e}):r?.(e)}function ue(e){P({mode:`add`,columnId:e})}function de(e){let t=!k.find(t=>t.id===e.id),r=t?[...k,e]:k.map(t=>t.id===e.id?e:t);A(r),n?.(r),t?s?.(e):c?.(e),P(null)}function fe(e){let t=k.filter(t=>t.id!==e);A(t),n?.(t),u?.(e),P(null)}function z(e){P({mode:`delete`,task:e})}let pe=(w||I).trim().toLowerCase();function me(e){return pe?e.title.toLowerCase().includes(pe)||(e.assignee?.toLowerCase().includes(pe)??!1):!0}function he(e){let t=[...j,e];M(t),p?.(e),f?.(t),ae(null)}function ge(e,t){let n=j.map(n=>n.id===e?{...n,label:t}:n);M(n);let r=n.find(t=>t.id===e);r&&m?.(r),f?.(n)}function _e(e){let t=j.find(t=>t.id===e);if(!t)return;let n=k.filter(t=>t.status===e).length;ae({mode:`delete`,column:t,cardCount:n})}function ve(e){let t=j.filter(t=>t.id!==e),r=k.filter(t=>t.status!==e);M(t),A(r),h?.(e),f?.(t),n?.(r),ae(null)}return(0,Q.jsxs)(l,{className:q.root,sx:{width:T,height:E,display:`flex`,flexDirection:`column`,overflow:`hidden`},children:[C&&(0,Q.jsx)(l,{className:q.searchFieldWrapper,sx:{px:2,pt:1.5,pb:.5},children:(0,Q.jsx)(S,{className:q.searchField,size:`small`,placeholder:O.searchFieldPlaceholder,value:I,onChange:e=>oe(e.target.value),slotProps:{input:{startAdornment:(0,Q.jsx)(ee,{position:`start`,children:(0,Q.jsx)(ie,{fontSize:`small`,sx:{color:`text.disabled`}})})},htmlInput:{"aria-label":O.searchFieldPlaceholder}},sx:{width:280}})}),(0,Q.jsxs)(Yn,{sensors:L,collisionDetection:dn,onDragStart:R,onDragOver:se,onDragEnd:ce,children:[(0,Q.jsxs)(l,{className:q.columns,sx:{flex:1,display:`flex`,gap:2,p:2,overflowX:`auto`,overflowY:`hidden`,alignItems:`stretch`},children:[j.map(e=>{let t=k.filter(t=>t.status===e.id);return(0,Q.jsx)(li,{column:e,tasks:t.filter(me),totalCount:t.length,showPriority:g,showAssignee:_,showDueDate:v,showDueDateWarning:y,showSubtasks:b,chipVariant:x,t:O,enableBuiltinDialogs:i,enableColumnManagement:a&&i,onCardClick:le,onAddClick:ue,onColumnRename:ge,onColumnDeleteRequest:_e},e.id)}),a&&i&&(0,Q.jsx)(l,{sx:{display:`flex`,alignItems:`flex-start`,pt:.5},children:(0,Q.jsx)(o,{className:q.columnAddButton,startIcon:(0,Q.jsx)(te,{}),size:`small`,onClick:()=>ae({mode:`add`}),sx:{minWidth:140,whiteSpace:`nowrap`,color:`text.secondary`,border:`1px dashed`,borderColor:`divider`,borderRadius:2,py:1,px:2,fontWeight:600,"&:hover":{bgcolor:`action.hover`,borderColor:`text.secondary`}},children:O.columnAddLabel})})]}),(0,Q.jsx)(lr,{children:ne&&(0,Q.jsx)(qr,{task:ne,showPriority:g,showAssignee:_,showDueDate:v,showDueDateWarning:y,showSubtasks:b,enableBuiltinDialogs:!1,chipVariant:x,t:O,onCardClick:()=>{},isOverlay:!0})})]}),i&&(0,Q.jsx)(Zr,{state:re,columns:j,t:O,showSubtasks:b,onSave:de,onDelete:fe,onRequestDelete:z,onClose:()=>P(null)},re?`${re.mode}-${re.mode===`add`?re.columnId:re.task.id}`:`closed`),a&&i&&(0,Q.jsx)(ei,{state:F,t:O,onAdd:he,onDelete:ve,onClose:()=>ae(null)})]})}var pi,Q,mi=e((()=>{ur(),Lr(),M(),re(),D(),pi=t(m(),1),zr(),Xr(),$r(),ni(),di(),Kr(),Q=y(),fi.__docgenInfo={description:``,methods:[],displayName:`KanbanBoard`,props:{tasks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}}],raw:`KanbanTask[]`},description:``},columns:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}}],raw:`KanbanColumn[]`},description:``},onTasksChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tasks: KanbanTask[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}}],raw:`KanbanTask[]`},name:`tasks`}],return:{name:`void`}}},description:`Called after every CRUD action and after every drag-and-drop.
Receives the complete updated task list.`},onCardClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:"Called when a card is clicked.\nWhen `enableBuiltinDialogs` is true this opens the Edit dialog instead."},enableBuiltinDialogs:{required:!1,tsType:{name:`boolean`},description:`When true (default), clicking a card opens the built-in Edit dialog and
the "+" button opens the built-in Add dialog.`,defaultValue:{value:`true`,computed:!1}},onTaskCreated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:`Called after a new card is saved via the built-in Add dialog.`},onTaskUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`}],return:{name:`void`}}},description:`Called after an existing card is saved via the built-in Edit dialog.`},onTaskDeleted:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(taskId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`taskId`}],return:{name:`void`}}},description:`Called after a card is deleted via the built-in Delete confirmation.`},onTaskMoved:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: KanbanTask, fromColumnId: string, toColumnId: string) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  /** Must match a \`KanbanColumn.id\`. */
  status: string;
  description?: string;
  assignee?: string;
  /** Overrides the column's default card color for this individual card. Any CSS color value. */
  color?: string;
  dueDate?: Date;
  /** Optional priority level — shown as a colored dot next to the card title when \`showPriority\` is true. */
  priority?: KanbanTaskPriority;
  /** Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog. */
  subtasks?: KanbanSubtask[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`string`,required:!0},description:"Must match a `KanbanColumn.id`."},{key:`description`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1}},{key:`color`,value:{name:`string`,required:!1},description:`Overrides the column's default card color for this individual card. Any CSS color value.`},{key:`dueDate`,value:{name:`Date`,required:!1}},{key:`priority`,value:{name:`union`,raw:`"low" | "medium" | "high" | "critical"`,elements:[{name:`literal`,value:`"low"`},{name:`literal`,value:`"medium"`},{name:`literal`,value:`"high"`},{name:`literal`,value:`"critical"`}],required:!1},description:"Optional priority level — shown as a colored dot next to the card title when `showPriority` is true."},{key:`subtasks`,value:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string;
  title: string;
  done: boolean;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`done`,value:{name:`boolean`,required:!0}}]}}],raw:`KanbanSubtask[]`,required:!1},description:`Optional checklist items — shown as a progress bar on the card and a checklist in the edit dialog.`}]}},name:`task`},{type:{name:`string`},name:`fromColumnId`},{type:{name:`string`},name:`toColumnId`}],return:{name:`void`}}},description:`Called when a card is moved to a different column via drag and drop.
NOT fired for in-column reordering or dialog-based status changes — use
\`onTaskUpdated\` for those. Carries the full updated task plus both column ids
so consumers can issue a targeted API call without diffing the full list.`},showPriority:{required:!1,tsType:{name:`boolean`},description:"Show the priority dot on cards (default: true).\nHas no visual effect when a card has no `priority` field set.",defaultValue:{value:`true`,computed:!1}},showAssignee:{required:!1,tsType:{name:`boolean`},description:`Show the assignee label on cards (default: true).`,defaultValue:{value:`true`,computed:!1}},showDueDate:{required:!1,tsType:{name:`boolean`},description:`Show the due date on cards (default: true).`,defaultValue:{value:`true`,computed:!1}},showDueDateWarning:{required:!1,tsType:{name:`boolean`},description:'Highlight cards whose `dueDate` is in the past (default: true).\nWhen true, the due-date chip turns red (`color="error"`) and the card\nreceives a subtle red background tint and left border stripe.\nHas no effect when `showDueDate` is false or when the card has no `dueDate`.',defaultValue:{value:`true`,computed:!1}},chipVariant:{required:!1,tsType:{name:`union`,raw:`"outlined" | "filled"`,elements:[{name:`literal`,value:`"outlined"`},{name:`literal`,value:`"filled"`}]},description:'MUI Chip variant for assignee and due-date chips on cards.\n`"outlined"` (default) — subtle border, transparent background.\n`"filled"` — solid background, more prominent.',defaultValue:{value:`"outlined"`,computed:!1}},showSubtasks:{required:!1,tsType:{name:`boolean`},description:"Show the subtask progress bar on cards and the subtask checklist in the edit/add dialog (default: true).\nHas no visual effect when a card has no `subtasks` field set.",defaultValue:{value:`true`,computed:!1}},showSearchField:{required:!1,tsType:{name:`boolean`},description:'When `true`, renders a built-in `size="small"` search field above the board columns.\nThe board manages the search state internally — no extra wiring needed.\nCustomize the placeholder via `translation.searchFieldPlaceholder`.\n\nFor full control over placement, styling, or debouncing, leave this `false` (default)\nand pass `filterText` instead.',defaultValue:{value:`false`,computed:!1}},filterText:{required:!1,tsType:{name:`string`},description:`Filters visible cards by title and assignee (case-insensitive substring match).
The consumer is responsible for rendering the search input and passing the string.
An empty string or \`undefined\` shows all cards.
Column counters reflect the filtered count; WIP-limit checks always use the
unfiltered column total so the over-limit warning is never hidden by a filter.

Alternative: set \`showSearchField={true}\` to let the board render a built-in field.`,defaultValue:{value:`""`,computed:!1}},enableColumnManagement:{required:!1,tsType:{name:`boolean`},description:'When `true`, shows inline rename / delete controls on column headers and an\n"Add column" button at the end of the board. Default: `false`.\n\nRequires `enableBuiltinDialogs` to be `true` (the controls are suppressed\nwhen built-in dialogs are disabled).',defaultValue:{value:`false`,computed:!1}},onColumnsChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(columns: KanbanColumn[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}}],raw:`KanbanColumn[]`},name:`columns`}],return:{name:`void`}}},description:"Called after every column add, rename, or delete with the full updated column list.\nMirror of `onTasksChange` for columns."},onColumnAdd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(column: KanbanColumn) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}},name:`column`}],return:{name:`void`}}},description:`Called after a new column is added via the built-in UI.`},onColumnUpdate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(column: KanbanColumn) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Used as the key — must match \`KanbanTask.status\` values. */
  id: string;
  label: string;
  /** Accent color for the column header bar. Any CSS color value. */
  color?: string;
  /** Optional WIP limit — shown as "{count} / {wipLimit}" in the column header. */
  wipLimit?: number;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Used as the key — must match `KanbanTask.status` values."},{key:`label`,value:{name:`string`,required:!0}},{key:`color`,value:{name:`string`,required:!1},description:`Accent color for the column header bar. Any CSS color value.`},{key:`wipLimit`,value:{name:`number`,required:!1},description:`Optional WIP limit — shown as "{count} / {wipLimit}" in the column header.`}]}},name:`column`}],return:{name:`void`}}},description:`Called after a column label is changed via the inline rename.`},onColumnDelete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(columnId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`columnId`}],return:{name:`void`}}},description:`Called after a column (and all its cards) is deleted via the built-in UI.`},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Width of the board. Default: "100%".`,defaultValue:{value:`"100%"`,computed:!1}},height:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Height of the board. Default: "100%".`,defaultValue:{value:`"100%"`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  addCardLabel: string;
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  /** "{title}" is replaced with the card title. */
  dialogDeleteConfirm: string;
  dialogFieldTitle: string;
  dialogFieldDescription: string;
  dialogFieldAssignee: string;
  dialogFieldDueDate: string;
  dialogFieldStatus: string;
  noCardsLabel: string;
  /** Placeholder text for the built-in search field (\`showSearchField={true}\`). */
  searchFieldPlaceholder: string;
  /** Section label for the subtask checklist in the edit/add dialog. */
  dialogFieldSubtasks: string;
  /** Placeholder for the "add subtask" input in the dialog. */
  dialogSubtaskAdd: string;
  /** Tooltip for the "+" button on the card's subtask progress bar. */
  cardSubtaskAdd: string;
  /** Button label for the "Add column" ghost button (\`enableColumnManagement\`). */
  columnAddLabel: string;
  /** Placeholder inside the add-column dialog text field. */
  columnAddPlaceholder: string;
  /** Confirmation dialog title when deleting a column. "{label}" → column name. */
  columnDeleteConfirm: string;
  /** Warning line shown when the column being deleted still has cards. "{count}" → number of cards. */
  columnDeleteCardsWarning: string;
  /** Tooltip on the rename icon in the column header. */
  columnRenameTooltip: string;
  /** Tooltip on the delete icon in the column header. */
  columnDeleteTooltip: string;
}`,signature:{properties:[{key:`addCardLabel`,value:{name:`string`,required:!0}},{key:`dialogAddTitle`,value:{name:`string`,required:!0}},{key:`dialogEditTitle`,value:{name:`string`,required:!0}},{key:`dialogDeleteTitle`,value:{name:`string`,required:!0}},{key:`dialogSave`,value:{name:`string`,required:!0}},{key:`dialogCancel`,value:{name:`string`,required:!0}},{key:`dialogDelete`,value:{name:`string`,required:!0}},{key:`dialogDeleteConfirm`,value:{name:`string`,required:!0},description:`"{title}" is replaced with the card title.`},{key:`dialogFieldTitle`,value:{name:`string`,required:!0}},{key:`dialogFieldDescription`,value:{name:`string`,required:!0}},{key:`dialogFieldAssignee`,value:{name:`string`,required:!0}},{key:`dialogFieldDueDate`,value:{name:`string`,required:!0}},{key:`dialogFieldStatus`,value:{name:`string`,required:!0}},{key:`noCardsLabel`,value:{name:`string`,required:!0}},{key:`searchFieldPlaceholder`,value:{name:`string`,required:!0},description:"Placeholder text for the built-in search field (`showSearchField={true}`)."},{key:`dialogFieldSubtasks`,value:{name:`string`,required:!0},description:`Section label for the subtask checklist in the edit/add dialog.`},{key:`dialogSubtaskAdd`,value:{name:`string`,required:!0},description:`Placeholder for the "add subtask" input in the dialog.`},{key:`cardSubtaskAdd`,value:{name:`string`,required:!0},description:`Tooltip for the "+" button on the card's subtask progress bar.`},{key:`columnAddLabel`,value:{name:`string`,required:!0},description:'Button label for the "Add column" ghost button (`enableColumnManagement`).'},{key:`columnAddPlaceholder`,value:{name:`string`,required:!0},description:`Placeholder inside the add-column dialog text field.`},{key:`columnDeleteConfirm`,value:{name:`string`,required:!0},description:`Confirmation dialog title when deleting a column. "{label}" → column name.`},{key:`columnDeleteCardsWarning`,value:{name:`string`,required:!0},description:`Warning line shown when the column being deleted still has cards. "{count}" → number of cards.`},{key:`columnRenameTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the rename icon in the column header.`},{key:`columnDeleteTooltip`,value:{name:`string`,required:!0},description:`Tooltip on the delete icon in the column header.`}]}}],raw:`Partial<KanbanBoardTranslation>`},description:`Override any label or message — unset keys fall back to English defaults.`}}}}));function hi(e){let[t,n]=(0,yi.useState)(Si);function r(t){n(t),e.onTasksChange?.(t)}return(0,$.jsxs)(l,{sx:{display:`flex`,flexDirection:`column`,height:`100vh`},children:[(0,$.jsx)(fi,{...e,tasks:t,onTasksChange:r}),(0,$.jsxs)(h,{variant:`caption`,color:`text.secondary`,sx:{px:2,py:.5},children:[t.length,` cards total · drag between columns to reorder`]})]})}function gi(e){let[t,n]=(0,yi.useState)(Ni);return(0,$.jsx)(fi,{...e,tasks:t,onTasksChange:t=>{n(t),e.onTasksChange?.(t)},onTaskCreated:t=>e.onTaskCreated?.(t),onTaskUpdated:t=>e.onTaskUpdated?.(t),onTaskDeleted:t=>e.onTaskDeleted?.(t),onTaskMoved:(t,n,r)=>e.onTaskMoved?.(t,n,r)})}function _i(e){let[t,n]=(0,yi.useState)(xi),[r,i]=(0,yi.useState)(Si);return(0,$.jsx)(fi,{...e,columns:t,tasks:r,onColumnsChange:t=>{n(t),e.onColumnsChange?.(t)},onColumnAdd:t=>e.onColumnAdd?.(t),onColumnUpdate:t=>e.onColumnUpdate?.(t),onColumnDelete:t=>e.onColumnDelete?.(t),onTasksChange:t=>{i(t),e.onTasksChange?.(t)},onTaskCreated:t=>e.onTaskCreated?.(t),onTaskUpdated:t=>e.onTaskUpdated?.(t),onTaskDeleted:t=>e.onTaskDeleted?.(t),onTaskMoved:(t,n,r)=>e.onTaskMoved?.(t,n,r)})}function vi(e){let[t,n]=(0,yi.useState)(Si),[r,i]=(0,yi.useState)(``);return(0,$.jsxs)(l,{sx:{display:`flex`,flexDirection:`column`,height:`100vh`,gap:0},children:[(0,$.jsx)(l,{sx:{px:2,pt:2,pb:1},children:(0,$.jsx)(S,{size:`small`,placeholder:`Search by title or assignee…`,value:r,onChange:e=>i(e.target.value),sx:{width:280},slotProps:{input:{startAdornment:(0,$.jsx)(ee,{position:`start`,children:(0,$.jsx)(ie,{fontSize:`small`,sx:{color:`text.disabled`}})})}}})}),(0,$.jsx)(fi,{...e,tasks:t,filterText:r,height:`calc(100vh - 72px)`,onTasksChange:t=>{n(t),e.onTasksChange?.(t)}})]})}var yi,$,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi;e((()=>{yi=t(m(),1),D(),re(),mi(),$=y(),{fn:bi}=__STORYBOOK_MODULE_TEST__,xi=[{id:`todo`,label:`To Do`,color:`#9e9e9e`},{id:`in-progress`,label:`In Progress`,color:`#2196f3`},{id:`review`,label:`In Review`,color:`#ff9800`},{id:`done`,label:`Done`,color:`#4caf50`}],Si=[{id:`1`,title:`Set up project structure`,status:`done`,assignee:`Alice`,dueDate:new Date(`2026-07-01`)},{id:`2`,title:`Design component API`,status:`done`,assignee:`Bob`},{id:`3`,title:`Implement drag and drop`,status:`in-progress`,assignee:`Alice`,dueDate:new Date(`2026-07-20`)},{id:`4`,title:`Write unit tests`,status:`in-progress`,assignee:`Charlie`},{id:`5`,title:`Add Storybook stories`,status:`review`,assignee:`Bob`,dueDate:new Date(`2026-07-22`)},{id:`6`,title:`Write user documentation`,status:`todo`,assignee:`Alice`,dueDate:new Date(`2026-07-25`)},{id:`7`,title:`Accessibility audit`,status:`todo`},{id:`8`,title:`Performance profiling`,status:`todo`,assignee:`Charlie`},{id:`9`,title:`Publish npm release`,status:`todo`,dueDate:new Date(`2026-07-31`)}],Ci={title:`Components/KanbanBoard`,component:fi,args:{columns:xi,tasks:Si,enableBuiltinDialogs:!0,filterText:``,showSearchField:!1,showPriority:!0,showAssignee:!0,showDueDate:!0,showDueDateWarning:!0,showSubtasks:!0,chipVariant:`outlined`,width:`100%`,height:500,onTasksChange:bi(),onTaskCreated:bi(),onTaskUpdated:bi(),onTaskDeleted:bi(),onTaskMoved:bi(),onCardClick:bi(),enableColumnManagement:!1,onColumnsChange:bi(),onColumnAdd:bi(),onColumnUpdate:bi(),onColumnDelete:bi()},argTypes:{chipVariant:{control:`radio`,options:[`outlined`,`filled`]},enableBuiltinDialogs:{control:`boolean`},enableColumnManagement:{control:`boolean`},filterText:{control:`text`},showSearchField:{control:`boolean`},height:{control:`number`},showAssignee:{control:`boolean`},showDueDate:{control:`boolean`},showDueDateWarning:{control:`boolean`},showPriority:{control:`boolean`},showSubtasks:{control:`boolean`},width:{control:`text`},columns:{control:!1},tasks:{control:!1},translation:{control:!1},onCardClick:{control:!1},onTaskCreated:{control:!1},onTaskDeleted:{control:!1},onTaskMoved:{control:!1},onTasksChange:{control:!1},onTaskUpdated:{control:!1},onColumnsChange:{control:!1},onColumnAdd:{control:!1},onColumnUpdate:{control:!1},onColumnDelete:{control:!1}},parameters:{controls:{sort:`alpha`},layout:`fullscreen`}},wi={name:`Default`},Ti={name:`Controlled (drag + CRUD live)`,render:e=>(0,$.jsx)(hi,{...e}),args:{height:`calc(100vh - 32px)`}},Ei={name:`With WIP limits`,args:{columns:[{id:`todo`,label:`Backlog`,color:`#9e9e9e`,wipLimit:10},{id:`in-progress`,label:`In Progress`,color:`#2196f3`,wipLimit:3},{id:`review`,label:`Review`,color:`#ff9800`,wipLimit:2},{id:`done`,label:`Done`,color:`#4caf50`}]}},Di={name:`Cards — no meta (no assignee / no due date)`,args:{showAssignee:!1,showDueDate:!1}},Oi={name:`Cards — individual colors`,args:{tasks:[{id:`a`,title:`High priority bug`,status:`todo`,color:`#f44336`,assignee:`Alice`},{id:`b`,title:`Feature request`,status:`todo`,color:`#2196f3`},{id:`c`,title:`Tech debt cleanup`,status:`in-progress`,color:`#ff9800`,assignee:`Bob`},{id:`d`,title:`Documentation update`,status:`in-progress`},{id:`e`,title:`Security patch`,status:`review`,color:`#9c27b0`},{id:`f`,title:`Released!`,status:`done`,color:`#4caf50`,assignee:`Alice`}]}},ki={name:`Empty columns`,args:{tasks:[]}},Ai={name:`Single column — backlog`,args:{columns:[{id:`backlog`,label:`Backlog`,color:`#607d8b`}],tasks:Si.map(e=>({...e,status:`backlog`}))}},ji={name:`Priority indicators`,args:{columns:[{id:`todo`,label:`To Do`,color:`#9e9e9e`},{id:`in-progress`,label:`In Progress`,color:`#2196f3`},{id:`done`,label:`Done`,color:`#4caf50`}],tasks:[{id:`p1`,title:`Critical — fix prod outage`,status:`todo`,priority:`critical`,assignee:`Alice`},{id:`p2`,title:`High — security patch`,status:`todo`,priority:`high`,assignee:`Bob`},{id:`p3`,title:`Medium — improve performance`,status:`in-progress`,priority:`medium`,assignee:`Alice`},{id:`p4`,title:`Low — update dependencies`,status:`in-progress`,priority:`low`},{id:`p5`,title:`No priority set`,status:`todo`},{id:`p6`,title:`Done — was critical`,status:`done`,priority:`critical`,assignee:`Bob`}],showPriority:!0}},Mi={name:`Overdue due-date warning`,args:{columns:[{id:`todo`,label:`To Do`,color:`#9e9e9e`},{id:`in-progress`,label:`In Progress`,color:`#2196f3`},{id:`done`,label:`Done`,color:`#4caf50`}],tasks:[{id:`a`,title:`Overdue — 2 weeks ago`,status:`todo`,assignee:`Alice`,dueDate:new Date(Date.now()-14*864e5)},{id:`b`,title:`Overdue — yesterday`,status:`in-progress`,assignee:`Bob`,dueDate:new Date(Date.now()-864e5)},{id:`c`,title:`Due tomorrow (on time)`,status:`todo`,assignee:`Charlie`,dueDate:new Date(Date.now()+864e5)},{id:`d`,title:`Due in 7 days`,status:`in-progress`,dueDate:new Date(Date.now()+7*864e5)},{id:`e`,title:`No due date`,status:`todo`},{id:`f`,title:`Completed on time`,status:`done`,assignee:`Alice`,dueDate:new Date(Date.now()+3*864e5)}],showDueDateWarning:!0}},Ni=[{id:`s1`,title:`Set up project`,status:`done`,assignee:`Alice`,subtasks:[{id:`sub1`,title:`Create repo`,done:!0},{id:`sub2`,title:`Install dependencies`,done:!0},{id:`sub3`,title:`Configure CI`,done:!0}]},{id:`s2`,title:`Design component API`,status:`in-progress`,assignee:`Bob`,subtasks:[{id:`sub4`,title:`Define TypeScript types`,done:!0},{id:`sub5`,title:`Write unit tests`,done:!1},{id:`sub6`,title:`Document all props`,done:!1}]},{id:`s3`,title:`Implement drag and drop`,status:`in-progress`,subtasks:[{id:`sub7`,title:`Core DnD logic`,done:!0},{id:`sub8`,title:`UI interactions`,done:!1}]},{id:`s4`,title:`Write documentation`,status:`todo`,assignee:`Alice`,subtasks:[{id:`sub9`,title:`User manual`,done:!1},{id:`sub10`,title:`Storybook stories`,done:!1},{id:`sub11`,title:`README`,done:!1},{id:`sub12`,title:`Changelog`,done:!1}]},{id:`s5`,title:`Publish npm release`,status:`todo`,subtasks:[{id:`sub13`,title:`Version bump`,done:!1},{id:`sub14`,title:`Tag git release`,done:!1}]},{id:`s6`,title:`Regular card — no subtasks`,status:`review`,assignee:`Bob`}],Pi={name:`Subtasks — progress bar on cards (live)`,render:e=>(0,$.jsx)(gi,{...e})},Fi={name:`Column management — add / rename / delete (live)`,render:e=>(0,$.jsx)(_i,{...e}),args:{enableColumnManagement:!0,height:560}},Ii={name:`Filter / Suche — built-in field (showSearchField)`,args:{showSearchField:!0,height:520}},Li={name:`Filter / Suche — external field (filterText)`,render:e=>(0,$.jsx)(vi,{...e})},Ri={name:`German labels`,args:{enableColumnManagement:!0,translation:{addCardLabel:`Karte hinzufügen`,dialogAddTitle:`Karte hinzufügen`,dialogEditTitle:`Karte bearbeiten`,dialogDeleteTitle:`Karte löschen`,dialogSave:`Speichern`,dialogCancel:`Abbrechen`,dialogDelete:`Löschen`,dialogDeleteConfirm:`"{title}" wirklich löschen?`,dialogFieldTitle:`Titel`,dialogFieldDescription:`Beschreibung`,dialogFieldAssignee:`Zuständig`,dialogFieldDueDate:`Fälligkeitsdatum`,dialogFieldStatus:`Status`,noCardsLabel:`Keine Karten`,searchFieldPlaceholder:`Nach Titel oder Zuständigem suchen…`,dialogFieldSubtasks:`Teilaufgaben`,dialogSubtaskAdd:`Teilaufgabe hinzufügen`,cardSubtaskAdd:`Teilaufgabe hinzufügen`,columnAddLabel:`Spalte hinzufügen`,columnAddPlaceholder:`Spaltenname`,columnDeleteConfirm:`Spalte "{label}" löschen?`,columnDeleteCardsWarning:`{count} Karte(n) in dieser Spalte werden ebenfalls gelöscht.`,columnRenameTooltip:`Umbenennen`,columnDeleteTooltip:`Spalte löschen`},columns:[{id:`todo`,label:`Zu erledigen`,color:`#9e9e9e`},{id:`in-progress`,label:`In Arbeit`,color:`#2196f3`},{id:`review`,label:`In Prüfung`,color:`#ff9800`},{id:`done`,label:`Erledigt`,color:`#4caf50`}]}},wi.parameters={...wi.parameters,docs:{...wi.parameters?.docs,source:{originalSource:`{
  name: "Default"
}`,...wi.parameters?.docs?.source}}},Ti.parameters={...Ti.parameters,docs:{...Ti.parameters?.docs,source:{originalSource:`{
  name: "Controlled (drag + CRUD live)",
  render: args => <ControlledStory {...args} />,
  args: {
    height: "calc(100vh - 32px)"
  }
}`,...Ti.parameters?.docs?.source}}},Ei.parameters={...Ei.parameters,docs:{...Ei.parameters?.docs,source:{originalSource:`{
  name: "With WIP limits",
  args: {
    columns: [{
      id: "todo",
      label: "Backlog",
      color: "#9e9e9e",
      wipLimit: 10
    }, {
      id: "in-progress",
      label: "In Progress",
      color: "#2196f3",
      wipLimit: 3
    }, {
      id: "review",
      label: "Review",
      color: "#ff9800",
      wipLimit: 2
    }, {
      id: "done",
      label: "Done",
      color: "#4caf50"
    }]
  }
}`,...Ei.parameters?.docs?.source}}},Di.parameters={...Di.parameters,docs:{...Di.parameters?.docs,source:{originalSource:`{
  name: "Cards — no meta (no assignee / no due date)",
  args: {
    showAssignee: false,
    showDueDate: false
  }
}`,...Di.parameters?.docs?.source}}},Oi.parameters={...Oi.parameters,docs:{...Oi.parameters?.docs,source:{originalSource:`{
  name: "Cards — individual colors",
  args: {
    tasks: [{
      id: "a",
      title: "High priority bug",
      status: "todo",
      color: "#f44336",
      assignee: "Alice"
    }, {
      id: "b",
      title: "Feature request",
      status: "todo",
      color: "#2196f3"
    }, {
      id: "c",
      title: "Tech debt cleanup",
      status: "in-progress",
      color: "#ff9800",
      assignee: "Bob"
    }, {
      id: "d",
      title: "Documentation update",
      status: "in-progress"
    }, {
      id: "e",
      title: "Security patch",
      status: "review",
      color: "#9c27b0"
    }, {
      id: "f",
      title: "Released!",
      status: "done",
      color: "#4caf50",
      assignee: "Alice"
    }]
  }
}`,...Oi.parameters?.docs?.source}}},ki.parameters={...ki.parameters,docs:{...ki.parameters?.docs,source:{originalSource:`{
  name: "Empty columns",
  args: {
    tasks: []
  }
}`,...ki.parameters?.docs?.source}}},Ai.parameters={...Ai.parameters,docs:{...Ai.parameters?.docs,source:{originalSource:`{
  name: "Single column — backlog",
  args: {
    columns: [{
      id: "backlog",
      label: "Backlog",
      color: "#607d8b"
    }],
    tasks: DEFAULT_TASKS.map(t => ({
      ...t,
      status: "backlog"
    }))
  }
}`,...Ai.parameters?.docs?.source}}},ji.parameters={...ji.parameters,docs:{...ji.parameters?.docs,source:{originalSource:`{
  name: "Priority indicators",
  args: {
    columns: [{
      id: "todo",
      label: "To Do",
      color: "#9e9e9e"
    }, {
      id: "in-progress",
      label: "In Progress",
      color: "#2196f3"
    }, {
      id: "done",
      label: "Done",
      color: "#4caf50"
    }],
    tasks: [{
      id: "p1",
      title: "Critical — fix prod outage",
      status: "todo",
      priority: "critical",
      assignee: "Alice"
    }, {
      id: "p2",
      title: "High — security patch",
      status: "todo",
      priority: "high",
      assignee: "Bob"
    }, {
      id: "p3",
      title: "Medium — improve performance",
      status: "in-progress",
      priority: "medium",
      assignee: "Alice"
    }, {
      id: "p4",
      title: "Low — update dependencies",
      status: "in-progress",
      priority: "low"
    }, {
      id: "p5",
      title: "No priority set",
      status: "todo"
    }, {
      id: "p6",
      title: "Done — was critical",
      status: "done",
      priority: "critical",
      assignee: "Bob"
    }],
    // Toggle showPriority in Controls panel to compare on/off.
    showPriority: true
  }
}`,...ji.parameters?.docs?.source}}},Mi.parameters={...Mi.parameters,docs:{...Mi.parameters?.docs,source:{originalSource:`{
  name: "Overdue due-date warning",
  args: {
    columns: [{
      id: "todo",
      label: "To Do",
      color: "#9e9e9e"
    }, {
      id: "in-progress",
      label: "In Progress",
      color: "#2196f3"
    }, {
      id: "done",
      label: "Done",
      color: "#4caf50"
    }],
    tasks: [{
      id: "a",
      title: "Overdue — 2 weeks ago",
      status: "todo",
      assignee: "Alice",
      dueDate: new Date(Date.now() - 14 * 86_400_000)
    }, {
      id: "b",
      title: "Overdue — yesterday",
      status: "in-progress",
      assignee: "Bob",
      dueDate: new Date(Date.now() - 86_400_000)
    }, {
      id: "c",
      title: "Due tomorrow (on time)",
      status: "todo",
      assignee: "Charlie",
      dueDate: new Date(Date.now() + 86_400_000)
    }, {
      id: "d",
      title: "Due in 7 days",
      status: "in-progress",
      dueDate: new Date(Date.now() + 7 * 86_400_000)
    }, {
      id: "e",
      title: "No due date",
      status: "todo"
    }, {
      id: "f",
      title: "Completed on time",
      status: "done",
      assignee: "Alice",
      dueDate: new Date(Date.now() + 3 * 86_400_000)
    }],
    // Toggle showDueDateWarning in Controls panel to compare on/off.
    showDueDateWarning: true
  }
}`,...Mi.parameters?.docs?.source}}},Pi.parameters={...Pi.parameters,docs:{...Pi.parameters?.docs,source:{originalSource:`{
  name: "Subtasks — progress bar on cards (live)",
  render: args => <WithSubtasksStory {...args} />
}`,...Pi.parameters?.docs?.source}}},Fi.parameters={...Fi.parameters,docs:{...Fi.parameters?.docs,source:{originalSource:`{
  name: "Column management — add / rename / delete (live)",
  render: args => <ColumnManagementStory {...args} />,
  args: {
    enableColumnManagement: true,
    height: 560
  }
}`,...Fi.parameters?.docs?.source}}},Ii.parameters={...Ii.parameters,docs:{...Ii.parameters?.docs,source:{originalSource:`{
  name: "Filter / Suche — built-in field (showSearchField)",
  args: {
    showSearchField: true,
    height: 520
  }
}`,...Ii.parameters?.docs?.source}}},Li.parameters={...Li.parameters,docs:{...Li.parameters?.docs,source:{originalSource:`{
  name: "Filter / Suche — external field (filterText)",
  render: args => <ExternalFilterStory {...args} />
}`,...Li.parameters?.docs?.source}}},Ri.parameters={...Ri.parameters,docs:{...Ri.parameters?.docs,source:{originalSource:`{
  name: "German labels",
  args: {
    enableColumnManagement: true,
    translation: {
      addCardLabel: "Karte hinzufügen",
      dialogAddTitle: "Karte hinzufügen",
      dialogEditTitle: "Karte bearbeiten",
      dialogDeleteTitle: "Karte löschen",
      dialogSave: "Speichern",
      dialogCancel: "Abbrechen",
      dialogDelete: "Löschen",
      dialogDeleteConfirm: '"{title}" wirklich löschen?',
      dialogFieldTitle: "Titel",
      dialogFieldDescription: "Beschreibung",
      dialogFieldAssignee: "Zuständig",
      dialogFieldDueDate: "Fälligkeitsdatum",
      dialogFieldStatus: "Status",
      noCardsLabel: "Keine Karten",
      searchFieldPlaceholder: "Nach Titel oder Zuständigem suchen…",
      dialogFieldSubtasks: "Teilaufgaben",
      dialogSubtaskAdd: "Teilaufgabe hinzufügen",
      cardSubtaskAdd: "Teilaufgabe hinzufügen",
      columnAddLabel: "Spalte hinzufügen",
      columnAddPlaceholder: "Spaltenname",
      columnDeleteConfirm: 'Spalte "{label}" löschen?',
      columnDeleteCardsWarning: '{count} Karte(n) in dieser Spalte werden ebenfalls gelöscht.',
      columnRenameTooltip: "Umbenennen",
      columnDeleteTooltip: "Spalte löschen"
    },
    columns: [{
      id: "todo",
      label: "Zu erledigen",
      color: "#9e9e9e"
    }, {
      id: "in-progress",
      label: "In Arbeit",
      color: "#2196f3"
    }, {
      id: "review",
      label: "In Prüfung",
      color: "#ff9800"
    }, {
      id: "done",
      label: "Erledigt",
      color: "#4caf50"
    }]
  }
}`,...Ri.parameters?.docs?.source}}},zi=[`Default`,`Controlled`,`WithWipLimits`,`MinimalCards`,`CardColors`,`EmptyBoard`,`SingleColumn`,`PriorityIndicators`,`OverdueWarning`,`WithSubtasks`,`ColumnManagement`,`FilterSearch`,`FilterSearchExternal`,`GermanLabels`]}))();export{Oi as CardColors,Fi as ColumnManagement,Ti as Controlled,wi as Default,ki as EmptyBoard,Ii as FilterSearch,Li as FilterSearchExternal,Ri as GermanLabels,Di as MinimalCards,Mi as OverdueWarning,ji as PriorityIndicators,Ai as SingleColumn,Pi as WithSubtasks,Ei as WithWipLimits,zi as __namedExportsOrder,Ci as default};