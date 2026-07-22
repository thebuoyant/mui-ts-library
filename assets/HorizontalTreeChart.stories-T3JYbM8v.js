import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,T as i,U as a,Y as o,Z as s,c as ee,m as te,t as c,z as l}from"./iframe-Bb8mcAY9.js";import{M as u,O as d,d as ne,m as f,t as re,y as ie}from"./src-BuH4pCkW.js";var ae,oe=e((()=>{ae={noData:`No data`,specialValueA:`Value A`,specialValueB:`Value B`}}));function se({path:e,size:t}){let n=t/2;return(0,h.jsx)(`g`,{transform:`translate(${-n},${-n})`,pointerEvents:`none`,children:(0,h.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,overflow:`visible`,children:(0,h.jsx)(`path`,{d:e,fill:`white`})})})}function ce({info:e,labelA:t,labelB:r}){return(0,h.jsxs)(n,{sx:{p:2,minWidth:200,maxWidth:280},children:[(0,h.jsxs)(n,{sx:{display:`flex`,alignItems:`center`,gap:1.5,mb:1.5},children:[(0,h.jsx)(l,{sx:{bgcolor:`primary.main`,width:40,height:40},children:e.name.charAt(0).toUpperCase()}),(0,h.jsxs)(n,{children:[(0,h.jsx)(a,{variant:`body2`,sx:{fontWeight:`bold`},children:e.name}),e.subname&&(0,h.jsx)(a,{variant:`caption`,color:`text.secondary`,children:e.subname})]})]}),(e.specialValueA!=null||e.specialValueB!=null)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{sx:{mb:1.5}}),e.specialValueA!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,mb:.5},children:[(0,h.jsx)(a,{variant:`caption`,color:`text.secondary`,children:t}),(0,h.jsx)(a,{variant:`caption`,children:String(e.specialValueA)})]}),e.specialValueB!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`},children:[(0,h.jsx)(a,{variant:`caption`,color:`text.secondary`,children:r}),(0,h.jsx)(a,{variant:`caption`,children:String(e.specialValueB)})]})]})]})}function p({data:e,orientation:t=`LR`,width:r=800,height:i=500,levelSpacing:s=200,nodeRadius:c=10,sortBy:l=`name`,showLabels:re=!0,labelFontSize:oe=12,labelColor:p,showIcons:_=!0,chartColors:v,linkStrokeOpacity:y=1,linkStrokeWidth:b=1.5,linkColor:x,zoomable:S=!1,drillable:C=!1,onFocusChange:w,showNodePopover:T=!1,renderNodePopoverContent:E,onNodeClick:D,onNodeHover:O,duration:k=750,disabled:A=!1,translation:j}){let M=o(),N={...ae,...j},P=[M.palette.primary.main,M.palette.secondary.main,M.palette.error.main,M.palette.warning.main,M.palette.success.main,M.palette.info.main],F=v&&v.length>0?v:P,le=p||M.palette.text.primary,ue=x||M.palette.text.secondary,de=M.palette.background.paper,fe=M.typography.fontFamily,pe=!e.children?.length&&!e.value,me=t===`TB`||t===`BT`,I=me?i:r,L=me?r:i,[R,z]=(0,m.useState)([e]),B=R[R.length-1],[he,ge]=(0,m.useState)(e),[_e,ve]=(0,m.useState)(!1);he!==e&&(ge(e),z([e]),ve(!0));let V=(0,m.useMemo)(()=>{let e=f(B);l===`value`?(e.sum(e=>e.value??0),e.sort((e,t)=>(t.value??0)-(e.value??0))):e.sort((e,t)=>u(String(e.data.name),String(t.data.name)));let t=d(e.descendants(),e=>e.depth)??1;return ne().size([I*.8,Math.min(t*s,L*.85)])(e)},[B,l,I,L,s]),H=(0,m.useMemo)(()=>{let e=d(f(B).descendants(),e=>e.depth)??1;return Math.min(e*s,L*.85)},[B,s,L]),ye=V.descendants(),be=V.links(),U=(0,m.useRef)(V),W=(0,m.useRef)(null),[xe,G]=(0,m.useState)(null),[Se,Ce]=(0,m.useState)(0);(0,m.useEffect)(()=>{let e=U.current;if(U.current=V,e===V)return;if(W.current!=null&&(cancelAnimationFrame(W.current),W.current=null),_e||k<=0){ve(!1),G(null);return}G(e),Ce(1);let t=performance.now(),n=e=>{let r=Math.min(1,(e-t)/k);Ce(1-ie(r)),r<1?W.current=requestAnimationFrame(n):(W.current=null,G(null))};return W.current=requestAnimationFrame(n),()=>{W.current!=null&&cancelAnimationFrame(W.current)}},[V,k,_e]);let K=(0,m.useCallback)(e=>e.data.colorConfig?.fill??F[e.depth%F.length],[F]),q=(0,m.useCallback)(e=>{switch(t){case`LR`:return{x:e.y,y:e.x-I*.4};case`RL`:return{x:H-e.y,y:e.x-I*.4};case`TB`:return{x:e.x-I*.4,y:e.y};case`BT`:return{x:e.x-I*.4,y:H-e.y}}},[t,I,H]),we=(0,m.useCallback)(e=>{let n=q(e.source),r=q(e.target);if(t===`LR`||t===`RL`){let e=(n.x+r.x)/2;return`M${n.x},${n.y} C${e},${n.y} ${e},${r.y} ${r.x},${r.y}`}let i=(n.y+r.y)/2;return`M${n.x},${n.y} C${n.x},${i} ${r.x},${i} ${r.x},${r.y}`},[q,t]),J=(0,m.useCallback)(e=>({id:e.data.id??null,name:e.data.name,subname:e.data.subname??null,value:e.value??e.data.value??null,specialValueA:e.data.specialValueA??null,specialValueB:e.data.specialValueB??null,depth:e.depth,path:e.ancestors().map(e=>e.data.name).reverse(),childrenCount:e.children?.length??0,data:e.data}),[]),[Y,Te]=(0,m.useState)(`0 -${i/2} ${r} ${i}`),[X,Ee]=(0,m.useState)(1),De=(0,m.useRef)(null),Oe=(0,m.useMemo)(()=>{if(X===1)return Y;let[e,t,n,r]=Y.split(` `).map(Number),i=n/X,a=r/X;return`${e+(n-i)/2} ${t+(r-a)/2} ${i} ${a}`},[Y,X]);(0,m.useLayoutEffect)(()=>{let e=De.current;if(!e)return;let t=requestAnimationFrame(()=>{try{let t=e.getBBox();Te(`${t.x-24} ${t.y-24} ${t.width+48} ${t.height+48}`)}catch{Te(`0 -${i/2} ${r} ${i}`)}});return()=>cancelAnimationFrame(t)},[V,r,i,t]);let ke=(0,m.useCallback)(e=>{if(!S||A||!e.ctrlKey)return;e.preventDefault();let t=e.deltaY<0?1.15:1/1.15;Ee(e=>Math.max(.25,Math.min(8,e*t)))},[S,A]),Z=(0,m.useRef)(null),Ae=e=>{Z.current&&=(clearTimeout(Z.current),null),Z.current=setTimeout(()=>{e(),Z.current=null},250)},Q=()=>{Z.current&&=(clearTimeout(Z.current),null)};(0,m.useEffect)(()=>()=>Q(),[]);let je=(0,m.useCallback)(()=>{z(e=>{if(e.length<=1)return e;let t=e.slice(0,-1);return w?.({focusedNode:{id:t[t.length-1].id??null,name:t[t.length-1].name,subname:t[t.length-1].subname??null,value:null,specialValueA:null,specialValueB:null,depth:t.length-1,path:t.map(e=>e.name),childrenCount:t[t.length-1].children?.length??0,data:t[t.length-1]},isRoot:t.length<=1}),t})},[w]);(0,m.useLayoutEffect)(()=>{if(!S&&!C)return;let t=t=>{t.key===`Escape`&&(S&&Ee(1),C&&(Q(),z([e]),w?.({focusedNode:{id:e.id??null,name:e.name,subname:e.subname??null,value:null,specialValueA:null,specialValueB:null,depth:0,path:[e.name],childrenCount:e.children?.length??0,data:e},isRoot:!0})))};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[S,C,e,w]);let Me=(0,m.useRef)(null),Ne=(0,m.useRef)(null),[Pe,Fe]=(0,m.useState)(!1),[Ie,Le]=(0,m.useState)(null),[Re,ze]=(0,m.useState)({left:0,top:0}),[$,Be]=(0,m.useState)(null),Ve=(e,t)=>{if(A)return;let n=J(e);if((t.ctrlKey||t.metaKey)&&C&&e.children){Ae(()=>{z(t=>[...t,e.data]),w?.({focusedNode:n,isRoot:!1})});return}if((t.ctrlKey||t.metaKey)&&C){Q(),je();return}if(T){let e=Me.current?.getBoundingClientRect();ze({left:e?t.clientX-e.left:t.clientX,top:e?t.clientY-e.top:t.clientY}),Le(Ne.current),Be(n),Fe(!0)}D?.(n,t)},He=(e,t)=>{A||!C||(t.ctrlKey||t.metaKey)&&(Q(),je())},Ue={followCursor:!0,enterDelay:50,enterNextDelay:0,disableHoverListener:A,slotProps:{tooltip:{sx:{maxWidth:240}}}},We=Math.round(c*1.3);return(0,h.jsxs)(n,{ref:Me,sx:{display:`inline-flex`,position:`relative`,opacity:A?.5:1,cursor:A?`not-allowed`:`default`,userSelect:`none`},children:[(0,h.jsx)(n,{ref:Ne,sx:{position:`absolute`,left:Re.left,top:Re.top,width:0,height:0}}),C&&R.length>1&&(0,h.jsx)(n,{sx:{position:`absolute`,top:4,left:0,right:0,display:`flex`,justifyContent:`center`,pointerEvents:`none`,zIndex:1},children:(0,h.jsx)(a,{variant:`caption`,sx:{bgcolor:`action.hover`,borderRadius:1,px:1,py:.25,color:`text.secondary`,fontSize:`0.7rem`},children:R.map(e=>e.name).join(` › `)})}),(0,h.jsx)(`svg`,{width:r,height:i,viewBox:Oe,onWheel:ke,style:{fontFamily:fe??`sans-serif`,overflow:S&&X>1?`hidden`:`visible`},role:`img`,"aria-label":e.name,children:(0,h.jsxs)(`g`,{ref:De,children:[pe&&(0,h.jsx)(`text`,{textAnchor:`middle`,dy:`0.35em`,fontSize:13,fill:le,children:N.noData}),(0,h.jsx)(`g`,{fill:`none`,stroke:ue,strokeOpacity:y,strokeWidth:b,children:be.map((e,t)=>(0,h.jsx)(`path`,{d:we(e)},`link-${t}`))}),ye.map((e,r)=>{let i=q(e),o=K(e),s=J(e),te=e.children?g.folder:g.person,l=t===`LR`,u=t===`RL`,d=l?c+6:u?-(c+6):0,ne=!l&&!u?t===`TB`?c+16:-(c+6):0,f=l?`start`:u?`end`:`middle`,ie=(0,h.jsxs)(n,{sx:{py:.5,minWidth:140},children:[(0,h.jsx)(a,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`,fontSize:`0.8rem`},children:e.data.name}),e.data.subname&&(0,h.jsx)(a,{variant:`caption`,sx:{display:`block`,opacity:.85},children:e.data.subname}),(s.specialValueA!=null||s.specialValueB!=null||e.children)&&(0,h.jsxs)(n,{sx:{mt:.75,borderTop:`1px solid rgba(255,255,255,0.2)`,pt:.75},children:[s.specialValueA!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,h.jsx)(a,{variant:`caption`,sx:{opacity:.6},children:N.specialValueA??`A`}),(0,h.jsx)(a,{variant:`caption`,children:String(s.specialValueA)})]}),s.specialValueB!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,h.jsx)(a,{variant:`caption`,sx:{opacity:.6},children:N.specialValueB??`B`}),(0,h.jsx)(a,{variant:`caption`,children:String(s.specialValueB)})]}),e.children&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,h.jsx)(a,{variant:`caption`,sx:{opacity:.6},children:`Reports`}),(0,h.jsx)(a,{variant:`caption`,children:e.children.length})]})]})]});return(0,h.jsx)(ee,{...Ue,title:ie,children:(0,h.jsxs)(`g`,{transform:`translate(${i.x},${i.y})`,onClick:t=>Ve(e,t),onDoubleClick:t=>He(e,t),onMouseEnter:t=>{A||O?.(J(e),t)},onMouseLeave:e=>{O?.(null,e)},style:{cursor:A?`not-allowed`:`pointer`},children:[(0,h.jsx)(`circle`,{r:c+8,fill:`transparent`}),(0,h.jsx)(`circle`,{r:c+2,fill:o,fillOpacity:.15}),(0,h.jsx)(`circle`,{r:c,fill:o}),_&&(0,h.jsx)(se,{path:te,size:We}),re&&(0,h.jsx)(`text`,{x:d,y:ne,dy:`0.35em`,textAnchor:f,fontSize:oe,fontWeight:e.children?`bold`:`normal`,fill:e.data.colorConfig?.textColor??le,paintOrder:`stroke`,stroke:de,strokeWidth:3,pointerEvents:`none`,children:e.data.name})]})},`node-${r}`)}),xe&&((e,t)=>(0,h.jsxs)(`g`,{"data-testid":`drill-ghost-layer`,opacity:t,pointerEvents:`none`,children:[(0,h.jsx)(`g`,{fill:`none`,stroke:ue,strokeOpacity:y,strokeWidth:b,children:e.links().map((e,t)=>(0,h.jsx)(`path`,{d:we(e)},`ghost-link-${t}`))}),(0,h.jsx)(`g`,{children:e.descendants().map((e,t)=>{let n=q(e);return(0,h.jsxs)(`g`,{transform:`translate(${n.x},${n.y})`,children:[(0,h.jsx)(`circle`,{r:c+2,fill:K(e),fillOpacity:.15}),(0,h.jsx)(`circle`,{r:c,fill:K(e)}),_&&(0,h.jsx)(se,{path:e.children?g.folder:g.person,size:We})]},`ghost-node-${t}`)})})]}))(xe,Se)]})}),T&&(0,h.jsx)(te,{open:Pe,anchorEl:Ie,onClose:()=>Fe(!1),anchorOrigin:{vertical:`top`,horizontal:`right`},transformOrigin:{vertical:`top`,horizontal:`left`},slotProps:{paper:{elevation:4}},children:$&&(E?E($):(0,h.jsx)(ce,{info:$,labelA:N.specialValueA??`Value A`,labelB:N.specialValueB??`Value B`}))})]})}var m,h,g,_=e((()=>{m=t(r(),1),re(),c(),oe(),h=s(),g={folder:`M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z`,person:`M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z`},p.displayName=`HorizontalTreeChart`,p.__docgenInfo={description:``,methods:[],displayName:`HorizontalTreeChart`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id?:          string;
  name:         string;
  subname?:     string;
  value?:       number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  /** Per-node color overrides */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    HorizontalTreeData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1}},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides`},{key:`children`,value:{name:`Array`,elements:[{name:`HorizontalTreeData`}],raw:`HorizontalTreeData[]`,required:!1}}]}},description:`Root node of the hierarchy`},orientation:{required:!1,tsType:{name:`union`,raw:`'LR' | 'RL' | 'TB' | 'BT'`,elements:[{name:`literal`,value:`'LR'`},{name:`literal`,value:`'RL'`},{name:`literal`,value:`'TB'`},{name:`literal`,value:`'BT'`}]},description:`Tree growth direction (default: 'LR')
- 'LR' left → right
- 'RL' right → left
- 'TB' top → bottom
- 'BT' bottom → top`,defaultValue:{value:`"LR"`,computed:!1}},width:{required:!1,tsType:{name:`number`},description:`Chart width in px (default: 800)`,defaultValue:{value:`800`,computed:!1}},height:{required:!1,tsType:{name:`number`},description:`Chart height in px (default: 500)`,defaultValue:{value:`500`,computed:!1}},levelSpacing:{required:!1,tsType:{name:`number`},description:`Horizontal distance between depth levels in px (default: 200)`,defaultValue:{value:`200`,computed:!1}},nodeRadius:{required:!1,tsType:{name:`number`},description:`Node circle radius in px (default: 10)`,defaultValue:{value:`10`,computed:!1}},sortBy:{required:!1,tsType:{name:`union`,raw:`'name' | 'value'`,elements:[{name:`literal`,value:`'name'`},{name:`literal`,value:`'value'`}]},description:`Sort children alphabetically or by value (default: 'name')`,defaultValue:{value:`"name"`,computed:!1}},showLabels:{required:!1,tsType:{name:`boolean`},description:`Show name labels on nodes (default: true)`,defaultValue:{value:`true`,computed:!1}},labelFontSize:{required:!1,tsType:{name:`number`},description:`Label font size in px (default: 12)`,defaultValue:{value:`12`,computed:!1}},labelColor:{required:!1,tsType:{name:`string`},description:`Label color — defaults to theme.palette.text.primary`},showIcons:{required:!1,tsType:{name:`boolean`},description:`Show icons inside node circles (default: true)`,defaultValue:{value:`true`,computed:!1}},chartColors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Per-depth color palette — falls back to MUI theme palette`},linkStrokeOpacity:{required:!1,tsType:{name:`number`},description:`Link stroke opacity (default: 1)`,defaultValue:{value:`1`,computed:!1}},linkStrokeWidth:{required:!1,tsType:{name:`number`},description:`Link stroke width in px (default: 1.5)`,defaultValue:{value:`1.5`,computed:!1}},linkColor:{required:!1,tsType:{name:`string`},description:`Link color — defaults to theme.palette.text.secondary`},zoomable:{required:!1,tsType:{name:`boolean`},description:`Enable Ctrl / Cmd ⌘ + Scroll visual zoom (default: false)`,defaultValue:{value:`false`,computed:!1}},drillable:{required:!1,tsType:{name:`boolean`},description:`Enable Ctrl / Cmd ⌘ + Click drill-down into subtrees (default: false)`,defaultValue:{value:`false`,computed:!1}},onFocusChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: HorizontalTreeZoomInfo) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  focusedNode: HorizontalTreeNodeInfo;
  isRoot:      boolean;
}`,signature:{properties:[{key:`focusedNode`,value:{name:`signature`,type:`object`,raw:`{
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root */
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
}`,signature:{properties:[{key:`id`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id?:          string;
  name:         string;
  subname?:     string;
  value?:       number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  /** Per-node color overrides */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    HorizontalTreeData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1}},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides`},{key:`children`,value:{name:`Array`,elements:[{name:`HorizontalTreeData`}],raw:`HorizontalTreeData[]`,required:!1}}]},required:!0}}]},required:!0}},{key:`isRoot`,value:{name:`boolean`,required:!0}}]}},name:`info`}],return:{name:`void`}}},description:`Fires when drill-down focus changes`},showNodePopover:{required:!1,tsType:{name:`boolean`},description:`Show built-in MUI Popover on node click (default: false)`,defaultValue:{value:`false`,computed:!1}},renderNodePopoverContent:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: HorizontalTreeNodeInfo) => React.ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root */
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
}`,signature:{properties:[{key:`id`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id?:          string;
  name:         string;
  subname?:     string;
  value?:       number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  /** Per-node color overrides */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    HorizontalTreeData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1}},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides`},{key:`children`,value:{name:`Array`,elements:[{name:`HorizontalTreeData`}],raw:`HorizontalTreeData[]`,required:!1}}]},required:!0}}]}},name:`info`}],return:{name:`ReactReactNode`,raw:`React.ReactNode`}}},description:`Custom popover content`},onNodeClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: HorizontalTreeNodeInfo, event: React.MouseEvent<SVGGElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root */
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
}`,signature:{properties:[{key:`id`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id?:          string;
  name:         string;
  subname?:     string;
  value?:       number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  /** Per-node color overrides */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    HorizontalTreeData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1}},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides`},{key:`children`,value:{name:`Array`,elements:[{name:`HorizontalTreeData`}],raw:`HorizontalTreeData[]`,required:!1}}]},required:!0}}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGGElement>`,elements:[{name:`SVGGElement`}]},name:`event`}],return:{name:`void`}}},description:`Fires on every node click`},onNodeHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: HorizontalTreeNodeInfo | null, event: React.MouseEvent<SVGGElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`HorizontalTreeNodeInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root */
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
}`,signature:{properties:[{key:`id`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id?:          string;
  name:         string;
  subname?:     string;
  value?:       number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  /** Per-node color overrides */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    HorizontalTreeData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1}},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides`},{key:`children`,value:{name:`Array`,elements:[{name:`HorizontalTreeData`}],raw:`HorizontalTreeData[]`,required:!1}}]},required:!0}}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGGElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGGElement>`,elements:[{name:`SVGGElement`}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave a node — `null` on leave. Use for linked-view highlighting."},duration:{required:!1,tsType:{name:`number`},description:`Drill-down/out crossfade duration in ms — set to 0 to disable (default: 750)`,defaultValue:{value:`750`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables all interactions (default: false)`,defaultValue:{value:`false`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  noData:         string;
  specialValueA?: string;
  specialValueB?: string;
}`,signature:{properties:[{key:`noData`,value:{name:`string`,required:!0}},{key:`specialValueA`,value:{name:`string`,required:!1}},{key:`specialValueB`,value:{name:`string`,required:!1}}]}}],raw:`Partial<HorizontalTreeTranslation>`},description:`Override translation strings`}}}})),v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{_(),{fn:v,fireEvent:y,within:b}=__STORYBOOK_MODULE_TEST__,x={title:`Components/HorizontalTreeChart`,component:p,argTypes:{chartColors:{control:!1},data:{control:!1},disabled:{control:`boolean`},drillable:{control:`boolean`},duration:{control:`number`},height:{control:`number`},labelColor:{control:`color`},labelFontSize:{control:`number`},levelSpacing:{control:`number`},linkColor:{control:`color`},linkStrokeOpacity:{control:{type:`range`,min:0,max:1,step:.05}},linkStrokeWidth:{control:`number`},nodeRadius:{control:`number`},orientation:{control:`radio`,options:[`LR`,`RL`,`TB`,`BT`]},renderNodePopoverContent:{control:!1},showIcons:{control:`boolean`},showLabels:{control:`boolean`},showNodePopover:{control:`boolean`},sortBy:{control:`radio`,options:[`name`,`value`]},translation:{control:!1},width:{control:`number`},zoomable:{control:`boolean`},onFocusChange:{control:!1},onNodeClick:{control:!1}},args:{disabled:!1,drillable:!1,duration:750,height:500,labelColor:``,labelFontSize:12,levelSpacing:200,linkColor:``,linkStrokeOpacity:.4,linkStrokeWidth:1.5,nodeRadius:10,orientation:`LR`,showIcons:!0,showLabels:!0,showNodePopover:!1,sortBy:`name`,width:800,zoomable:!1,onFocusChange:v(),onNodeClick:v(),onNodeHover:v()},parameters:{controls:{sort:`alpha`}}},S={id:`platform`,name:`Platform`,subname:`v2.5 Architecture`,children:[{id:`frontend`,name:`Frontend`,subname:`React / TypeScript`,specialValueA:`React 19`,specialValueB:`TypeScript 5`,children:[{id:`web`,name:`Web App`,subname:`Next.js 15`,specialValueA:`SSR`,specialValueB:`18 screens`},{id:`mobile`,name:`Mobile`,subname:`React Native`,specialValueA:`iOS/Android`,specialValueB:`12 screens`},{id:`desktop`,name:`Desktop`,subname:`Electron`,specialValueA:`Win/Mac/Linux`,specialValueB:`8 screens`}]},{id:`backend`,name:`Backend`,subname:`Node.js / Go`,specialValueA:`Node 22 + Go 1.22`,specialValueB:`REST + gRPC`,children:[{id:`api-gw`,name:`API Gateway`,subname:`Kong`,specialValueA:`Rate limiting`,specialValueB:`5k req/s`},{id:`auth`,name:`Auth Service`,subname:`OAuth 2.0`,specialValueA:`JWT + OIDC`,specialValueB:`SSO`},{id:`core`,name:`Core API`,subname:`Node.js`,specialValueA:`REST`,specialValueB:`220 endpoints`,children:[{id:`users`,name:`Users`,subname:`CRUD`,specialValueA:`PostgreSQL`},{id:`billing`,name:`Billing`,subname:`Stripe`,specialValueA:`PCI DSS`},{id:`notifications`,name:`Notifications`,subname:`Email/Push`,specialValueA:`AWS SES`}]},{id:`search`,name:`Search`,subname:`Elasticsearch`,specialValueA:`Full-text`,specialValueB:`< 50ms`}]},{id:`data`,name:`Data`,subname:`Analytics & ML`,specialValueA:`Python 3.12`,specialValueB:`Snowflake`,children:[{id:`pipeline`,name:`Pipeline`,subname:`Apache Kafka`,specialValueA:`Streaming`,specialValueB:`1M events/h`},{id:`warehouse`,name:`Warehouse`,subname:`Snowflake`,specialValueA:`Batch`,specialValueB:`10TB`},{id:`ml`,name:`ML Platform`,subname:`PyTorch`,specialValueA:`Training`,specialValueB:`GPU cluster`}]},{id:`infra`,name:`Infrastructure`,subname:`AWS / Kubernetes`,specialValueA:`EKS + ECS`,specialValueB:`Multi-region`,children:[{id:`k8s`,name:`Kubernetes`,subname:`EKS`,specialValueA:`3 clusters`},{id:`ci-cd`,name:`CI/CD`,subname:`GitHub Actions`,specialValueA:`500 builds/d`},{id:`monitoring`,name:`Monitoring`,subname:`Datadog`,specialValueA:`Metrics + Traces`}]}]},C={parameters:{docs:{description:{story:"**Left → Right** (default) — classic horizontal tree layout. **Click** any node → `onNodeClick`. **Hover** → MUI tooltip with name, subname, and data values. Bold labels for branch nodes, normal for leaves."}}},args:{data:S}},w={parameters:{docs:{description:{story:'`orientation="RL"` — tree grows right → left. Root on the right, leaves on the left.'}}},args:{data:S,orientation:`RL`}},T={parameters:{docs:{description:{story:'`orientation="TB"` — classic top-down org chart layout. Root at the top.'}}},args:{data:S,orientation:`TB`,width:900,height:600}},E={parameters:{docs:{description:{story:'`orientation="BT"` — tree grows bottom → top. Useful for dependency pyramids.'}}},args:{data:S,orientation:`BT`,width:900,height:600}},D={parameters:{docs:{description:{story:'`drillable={true}` + `zoomable={true}`. `Ctrl / Cmd ⌘+Click` on a branch node → drill into that subtree. `Ctrl / Cmd ⌘+DblClick` → zoom out. `Escape` → reset. Breadcrumb shows current position. This story auto-runs a Ctrl+Click on the "Frontend" node so you land already drilled in.'}}},args:{data:S,drillable:!0,zoomable:!0},play:async({canvasElement:e})=>{let t=b(e);y.click(t.getByText(`Frontend`),{ctrlKey:!0})}},O={parameters:{docs:{description:{story:"Drilling in/out (`Ctrl+Click` / `Ctrl+DblClick` / `Escape`) now crossfades the previous layout out on top of the new one instead of jump-cutting, via `duration` (ms). Unlike `SunburstChart` — which reuses one hierarchy and just animates the view window — drilling here re-roots the hierarchy entirely (a different node set per focus level), so a position-tween isn't straightforward without enter/update/exit node matching. A crossfade gets rid of the hard cut with much less complexity. This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. Set `duration={0}` to disable it entirely."}}},args:{data:S,drillable:!0,duration:2e3},play:async({canvasElement:e})=>{let t=b(e);y.click(t.getByText(`Frontend`),{ctrlKey:!0})}},k={parameters:{docs:{description:{story:"`colorConfig: { fill }` per node overrides the default depth palette. Frontend = blue, Backend = purple, Data = teal, Infrastructure = orange."}}},args:{data:{...S,children:[{...S.children[0],colorConfig:{fill:`#1565C0`},children:S.children[0].children?.map(e=>({...e,colorConfig:{fill:`#42A5F5`}}))},{...S.children[1],colorConfig:{fill:`#6A1B9A`},children:S.children[1].children?.map(e=>({...e,colorConfig:{fill:`#AB47BC`}}))},{...S.children[2],colorConfig:{fill:`#00695C`},children:S.children[2].children?.map(e=>({...e,colorConfig:{fill:`#26A69A`}}))},{...S.children[3],colorConfig:{fill:`#E65100`},children:S.children[3].children?.map(e=>({...e,colorConfig:{fill:`#FFA726`}}))}]}}},A={parameters:{docs:{description:{story:"`showNodePopover={true}` — clicking a node opens a MUI Popover with name, subname, and data values."}}},args:{data:S,showNodePopover:!0,translation:{specialValueA:`Tech Stack`,specialValueB:`Details`}}},j={parameters:{docs:{description:{story:"`disabled={true}` mutes all interactions and reduces opacity."}}},args:{data:S,disabled:!0}},M={parameters:{docs:{description:{story:'When `data` has no `children` and no `value`, the chart renders the `translation.noData` message (default `"No data"`) centered in the SVG instead of an empty tree. Override it via `translation={{ noData: "..." }}`.'}}},args:{data:{id:`root`,name:`Root`},translation:{noData:`Nothing to show yet`}}},N={name:`New Support Ticket`,children:[{name:`Billing question?`,subname:`Keyword match`,children:[{name:`Refund request`,subname:`→ Billing team`,specialValueA:`SLA: 4h`},{name:`Plan upgrade`,subname:`→ Sales team`,specialValueA:`SLA: 8h`},{name:`Invoice mismatch`,subname:`→ Billing team`,specialValueA:`SLA: 4h`}]},{name:`Technical issue?`,subname:`Keyword match`,children:[{name:`Severity check`,subname:`Auto-triage`,children:[{name:`Outage / data loss`,subname:`→ On-call engineer`,specialValueA:`SLA: 15min`},{name:`Bug, non-blocking`,subname:`→ Engineering queue`,specialValueA:`SLA: 2d`}]},{name:`How-to question`,subname:`→ Knowledge base bot`,specialValueA:`SLA: instant`}]},{name:`Account access?`,subname:`Keyword match`,children:[{name:`Password reset`,subname:`→ Self-service flow`,specialValueA:`SLA: instant`},{name:`2FA locked out`,subname:`→ Identity team`,specialValueA:`SLA: 1h`}]}]},P={parameters:{docs:{description:{story:"**Real-world use case: a support-ticket routing tree** for an internal ops dashboard. Each leaf shows the resulting queue and SLA via `specialValueA` — exactly the kind of automation flow this chart is well suited for (decision logic, escalation paths, triage rules)."}}},args:{data:N,orientation:`LR`,width:900,height:480,showNodePopover:!0,translation:{specialValueA:`Routing`}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Left → Right** (default) — classic horizontal tree layout. ' + '**Click** any node → \`onNodeClick\`. ' + '**Hover** → MUI tooltip with name, subname, and data values. ' + 'Bold labels for branch nodes, normal for leaves.'
      }
    }
  },
  args: {
    data: ARCH_DATA
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`orientation="RL"\` — tree grows right → left. Root on the right, leaves on the left.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    orientation: "RL"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`orientation="TB"\` — classic top-down org chart layout. Root at the top.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    orientation: "TB",
    width: 900,
    height: 600
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`orientation="BT"\` — tree grows bottom → top. Useful for dependency pyramids.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    orientation: "BT",
    width: 900,
    height: 600
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`drillable={true}\` + \`zoomable={true}\`. ' + '\`Ctrl / Cmd ⌘+Click\` on a branch node → drill into that subtree. ' + '\`Ctrl / Cmd ⌘+DblClick\` → zoom out. \`Escape\` → reset. ' + 'Breadcrumb shows current position. ' + 'This story auto-runs a Ctrl+Click on the "Frontend" node so you land already drilled in.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    drillable: true,
    zoomable: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByText("Frontend"), {
      ctrlKey: true
    });
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Drilling in/out (\`Ctrl+Click\` / \`Ctrl+DblClick\` / \`Escape\`) now crossfades the previous layout ' + 'out on top of the new one instead of jump-cutting, via \`duration\` (ms). ' + 'Unlike \`SunburstChart\` — which reuses one hierarchy and just animates the view window — drilling here ' + 're-roots the hierarchy entirely (a different node set per focus level), so a position-tween isn\\'t ' + 'straightforward without enter/update/exit node matching. A crossfade gets rid of the hard cut with much ' + 'less complexity. This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. ' + 'Set \`duration={0}\` to disable it entirely.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    drillable: true,
    duration: 2000
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    fireEvent.click(canvas.getByText("Frontend"), {
      ctrlKey: true
    });
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`colorConfig: { fill }\` per node overrides the default depth palette. ' + 'Frontend = blue, Backend = purple, Data = teal, Infrastructure = orange.'
      }
    }
  },
  args: {
    data: {
      ...ARCH_DATA,
      children: [{
        ...ARCH_DATA.children![0],
        colorConfig: {
          fill: "#1565C0"
        },
        children: ARCH_DATA.children![0].children?.map(c => ({
          ...c,
          colorConfig: {
            fill: "#42A5F5"
          }
        }))
      }, {
        ...ARCH_DATA.children![1],
        colorConfig: {
          fill: "#6A1B9A"
        },
        children: ARCH_DATA.children![1].children?.map(c => ({
          ...c,
          colorConfig: {
            fill: "#AB47BC"
          }
        }))
      }, {
        ...ARCH_DATA.children![2],
        colorConfig: {
          fill: "#00695C"
        },
        children: ARCH_DATA.children![2].children?.map(c => ({
          ...c,
          colorConfig: {
            fill: "#26A69A"
          }
        }))
      }, {
        ...ARCH_DATA.children![3],
        colorConfig: {
          fill: "#E65100"
        },
        children: ARCH_DATA.children![3].children?.map(c => ({
          ...c,
          colorConfig: {
            fill: "#FFA726"
          }
        }))
      }]
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showNodePopover={true}\` — clicking a node opens a MUI Popover with name, subname, and data values.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    showNodePopover: true,
    translation: {
      specialValueA: "Tech Stack",
      specialValueB: "Details"
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`disabled={true}\` mutes all interactions and reduces opacity.'
      }
    }
  },
  args: {
    data: ARCH_DATA,
    disabled: true
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'When \`data\` has no \`children\` and no \`value\`, the chart renders the \`translation.noData\` ' + 'message (default \`"No data"\`) centered in the SVG instead of an empty tree. ' + 'Override it via \`translation={{ noData: "..." }}\`.'
      }
    }
  },
  args: {
    data: {
      id: "root",
      name: "Root"
    },
    translation: {
      noData: "Nothing to show yet"
    }
  }
}`,...M.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a support-ticket routing tree** for an internal ops dashboard. ' + 'Each leaf shows the resulting queue and SLA via \`specialValueA\` — exactly the kind of automation flow ' + 'this chart is well suited for (decision logic, escalation paths, triage rules).'
      }
    }
  },
  args: {
    data: DECISION_TREE_DATA,
    orientation: "LR",
    width: 900,
    height: 480,
    showNodePopover: true,
    translation: {
      specialValueA: "Routing"
    }
  }
}`,...P.parameters?.docs?.source}}},F=[`Default`,`RightToLeft`,`TopToBottom`,`BottomToTop`,`WithDrillDown`,`AnimatedDrillTransitions`,`WithColorConfig`,`WithPopover`,`Disabled`,`EmptyData`,`DecisionTree`]}))();export{O as AnimatedDrillTransitions,E as BottomToTop,P as DecisionTree,C as Default,j as Disabled,M as EmptyData,w as RightToLeft,T as TopToBottom,k as WithColorConfig,D as WithDrillDown,A as WithPopover,F as __namedExportsOrder,x as default};