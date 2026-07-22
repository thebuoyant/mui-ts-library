import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,T as i,U as a,Y as o,Z as s,c as ee,m as te,t as c,z as l}from"./iframe-Bb8mcAY9.js";import{M as ne,a as re,d as ie,m as ae,t as u,y as oe}from"./src-BuH4pCkW.js";var d,f=e((()=>{d={noData:`No data`,specialValueA:`Value A`,specialValueB:`Value B`}}));function se({path:e,size:t}){let n=t/2;return(0,h.jsx)(`g`,{transform:`translate(${-n},${-n})`,pointerEvents:`none`,children:(0,h.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 24 24`,overflow:`visible`,children:(0,h.jsx)(`path`,{d:e,fill:`white`})})})}function ce({info:e,labelA:t,labelB:r}){return(0,h.jsxs)(n,{sx:{p:2,minWidth:200,maxWidth:280},children:[(0,h.jsxs)(n,{sx:{display:`flex`,alignItems:`center`,gap:1.5,mb:1.5},children:[(0,h.jsx)(l,{sx:{bgcolor:`primary.main`,width:40,height:40},children:e.name.charAt(0).toUpperCase()}),(0,h.jsxs)(n,{children:[(0,h.jsx)(a,{variant:`body2`,sx:{fontWeight:`bold`},children:e.name}),e.subname&&(0,h.jsx)(a,{variant:`caption`,color:`text.secondary`,children:e.subname})]})]}),(e.specialValueA!=null||e.specialValueB!=null)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{sx:{mb:1.5}}),e.specialValueA!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,mb:.5},children:[(0,h.jsx)(a,{variant:`caption`,color:`text.secondary`,children:t}),(0,h.jsx)(a,{variant:`caption`,children:String(e.specialValueA)})]}),e.specialValueB!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`},children:[(0,h.jsx)(a,{variant:`caption`,color:`text.secondary`,children:r}),(0,h.jsx)(a,{variant:`caption`,children:String(e.specialValueB)})]})]})]})}function p({data:e,size:t=600,autoFit:r=!0,sortBy:i=`name`,showLabels:s=!0,showIcons:c=!0,chartColors:l,rootNodeRadius:u=22,branchNodeRadius:f=16,leafNodeRadius:p=11,linkColor:le,linkStrokeOpacity:_=1,linkStrokeWidth:v=1.5,labelFontSize:y=12,labelColor:b,separationSibling:x=1,separationCousin:S=2,zoomable:C=!1,drillable:w=!1,onFocusChange:T,duration:E=750,showNodePopover:D=!1,renderNodePopoverContent:O,onNodeClick:k,onNodeHover:A,disabled:j=!1,translation:M}){let N=o(),P={...d,...M},ue=[N.palette.primary.main,N.palette.secondary.main,N.palette.info.main,N.palette.success.main,N.palette.warning.main,N.palette.error.main],F=l&&l.length>0?l:ue,I=(0,m.useCallback)(e=>e.depth===0?u:e.children?f:p,[u,f,p]),L=(0,m.useCallback)(e=>e.data.colorConfig?.fill??F[e.depth%F.length],[F]),[R,z]=(0,m.useState)([e]),B=R[R.length-1],[de,fe]=(0,m.useState)(e),[V,H]=(0,m.useState)(!1);de!==e&&(fe(e),z([e]),H(!0));let pe=!e.children?.length&&!e.value,U=Math.max(1,t/2-70),W=(0,m.useMemo)(()=>{let e=ae(B);return i===`value`?(e.sum(e=>e.value??0),e.sort((e,t)=>(t.value??0)-(e.value??0))):e.sort((e,t)=>ne(e.data.name,t.data.name)),ie().size([2*Math.PI,U]).separation((e,t)=>(e.parent===t.parent?x:S)*1.4/Math.max(1,e.depth))(e)},[B,i,U,x,S]),me=W.links(),G=W.descendants(),he=(0,m.useRef)(W),K=(0,m.useRef)(null),[ge,q]=(0,m.useState)(null),[_e,ve]=(0,m.useState)(0);(0,m.useEffect)(()=>{let e=he.current;if(he.current=W,e===W)return;if(K.current!=null&&(cancelAnimationFrame(K.current),K.current=null),V||E<=0){H(!1),q(null);return}q(e),ve(1);let t=performance.now(),n=e=>{let r=Math.min(1,(e-t)/E);ve(1-oe(r)),r<1?K.current=requestAnimationFrame(n):(K.current=null,q(null))};return K.current=requestAnimationFrame(n),()=>{K.current!=null&&cancelAnimationFrame(K.current)}},[W,E,V]);let ye=(0,m.useMemo)(()=>re().angle(e=>e.x).radius(e=>e.y),[]),be=(0,m.useCallback)(e=>({id:e.data.id,name:e.data.name,subname:e.data.subname??null,value:(typeof e.value==`number`?e.value:null)??e.data.value??null,specialValueA:e.data.specialValueA??null,specialValueB:e.data.specialValueB??null,depth:e.depth,path:e.ancestors().map(e=>e.data.name).reverse(),childrenCount:e.children?.length??0,data:e.data}),[]),xe=(0,m.useRef)(null),[J,Y]=(0,m.useState)(`-${t/2} -${t/2} ${t} ${t}`),[X,Se]=(0,m.useState)(1);(0,m.useLayoutEffect)(()=>{if(!r){Y(`-${t/2} -${t/2} ${t} ${t}`);return}let e=xe.current;if(!e)return;let n=requestAnimationFrame(()=>{try{let t=e.getBBox();Y(`${t.x-20} ${t.y-20} ${t.width+40} ${t.height+40}`)}catch{Y(`-${t/2} -${t/2} ${t} ${t}`)}});return()=>cancelAnimationFrame(n)},[t,W,s,r]);let Ce=(0,m.useMemo)(()=>{if(X===1)return J;let[e,t,n,r]=J.split(` `).map(Number),i=n/X,a=r/X;return`${e+(n-i)/2} ${t+(r-a)/2} ${i} ${a}`},[J,X]),we=(0,m.useCallback)(e=>{if(!C||j||!e.ctrlKey)return;e.preventDefault();let t=e.deltaY<0?1.15:1/1.15;Se(e=>Math.max(.25,Math.min(8,e*t)))},[C,j]),Z=(0,m.useRef)(null),Te=e=>{Z.current&&=(clearTimeout(Z.current),null),Z.current=setTimeout(()=>{e(),Z.current=null},250)},Q=()=>{Z.current&&=(clearTimeout(Z.current),null)};(0,m.useEffect)(()=>()=>Q(),[]),(0,m.useLayoutEffect)(()=>{if(!C&&!w)return;let t=t=>{t.key===`Escape`&&(C&&Se(1),w&&(Q(),z([e]),T?.(null)))};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[C,w,e,T]);let[Ee,De]=(0,m.useState)(null),Oe=(0,m.useRef)(null),ke=(0,m.useRef)(null),[Ae,je]=(0,m.useState)(!1),[Me,Ne]=(0,m.useState)(null),[Pe,Fe]=(0,m.useState)({left:0,top:0}),[$,Ie]=(0,m.useState)(null),Le=(0,m.useCallback)(()=>{z(e=>{if(e.length<=1)return e;let t=e.slice(0,-1);return T?.(t.length<=1?null:{id:t[t.length-1].id,name:t[t.length-1].name,subname:t[t.length-1].subname??null,value:null,specialValueA:null,specialValueB:null,depth:t.length-1,path:t.map(e=>e.name),childrenCount:t[t.length-1].children?.length??0,data:t[t.length-1]}),t})},[T]),Re=e=>{j||!w||(e.ctrlKey||e.metaKey)&&(Q(),Le())},ze=e=>{if(j)return;let t=G[Number(e.currentTarget.getAttribute(`data-idx`))];if(!t)return;let n=be(t);if((e.ctrlKey||e.metaKey)&&w&&t.children){Te(()=>{z(e=>[...e,t.data]),T?.(n)});return}if(D){let t=Oe.current?.getBoundingClientRect();Fe({left:t?e.clientX-t.left:e.clientX,top:t?e.clientY-t.top:e.clientY}),Ne(ke.current),Ie(n),je(!0)}k?.(n,e)},Be=b||N.palette.text.primary,Ve=le||N.palette.text.secondary,He=N.palette.background.paper,Ue=N.typography.fontFamily;return(0,h.jsxs)(n,{ref:Oe,sx:{display:`inline-flex`,position:`relative`,opacity:j?.5:1,cursor:j?`not-allowed`:`default`,userSelect:`none`},children:[w&&R.length>1&&(0,h.jsx)(n,{sx:{position:`absolute`,top:4,left:0,right:0,display:`flex`,justifyContent:`center`,gap:.5,pointerEvents:`none`,zIndex:1},children:(0,h.jsx)(a,{variant:`caption`,sx:{bgcolor:`action.hover`,borderRadius:1,px:1,py:.25,color:`text.secondary`,fontSize:`0.7rem`},children:R.map(e=>e.name).join(` › `)})}),(0,h.jsx)(n,{ref:ke,sx:{position:`absolute`,left:Pe.left,top:Pe.top,width:0,height:0}}),(0,h.jsx)(`svg`,{width:t,height:t,viewBox:Ce,onWheel:we,style:{fontFamily:Ue??`sans-serif`,overflow:C&&X>1?`hidden`:`visible`},role:`img`,"aria-label":e.name,children:(0,h.jsxs)(`g`,{ref:xe,children:[pe&&(0,h.jsx)(`text`,{textAnchor:`middle`,dy:`0.35em`,fontSize:13,fill:Be,children:P.noData}),(0,h.jsx)(`g`,{fill:`none`,stroke:Ve,strokeOpacity:_,strokeWidth:v,children:me.map((e,t)=>(0,h.jsx)(`path`,{d:ye(e)},`link-${t}`))}),(0,h.jsx)(`g`,{children:G.map((e,t)=>{let r=I(e),i=L(e),o=be(e),s=Ee===t,te=e.children?g.folder:g.person,l=Math.round(r*1.3);return(0,h.jsx)(ee,{title:(0,h.jsxs)(n,{sx:{py:.5,minWidth:160},children:[(0,h.jsx)(a,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`,fontSize:`0.8rem`},children:e.data.name}),e.data.subname&&(0,h.jsx)(a,{variant:`caption`,sx:{display:`block`,opacity:.85},children:e.data.subname}),(o.specialValueA!=null||o.specialValueB!=null||e.children)&&(0,h.jsxs)(n,{sx:{mt:.75,borderTop:`1px solid rgba(255,255,255,0.2)`,pt:.75},children:[o.specialValueA!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,h.jsx)(a,{variant:`caption`,sx:{opacity:.6},children:P.specialValueA??`A`}),(0,h.jsx)(a,{variant:`caption`,children:String(o.specialValueA)})]}),o.specialValueB!=null&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,h.jsx)(a,{variant:`caption`,sx:{opacity:.6},children:P.specialValueB??`B`}),(0,h.jsx)(a,{variant:`caption`,children:String(o.specialValueB)})]}),e.children&&(0,h.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,h.jsx)(a,{variant:`caption`,sx:{opacity:.6},children:`Reports`}),(0,h.jsx)(a,{variant:`caption`,children:e.children.length})]})]})]}),followCursor:!0,enterDelay:50,enterNextDelay:0,disableHoverListener:j,slotProps:{tooltip:{sx:{maxWidth:260}}},children:(0,h.jsxs)(`g`,{"data-idx":t,transform:`rotate(${e.x*180/Math.PI-90}) translate(${e.y},0)`,onClick:ze,onDoubleClick:Re,onMouseEnter:e=>{j||(De(t),A?.(o,e))},onMouseLeave:e=>{De(null),A?.(null,e)},style:{cursor:j?`not-allowed`:`pointer`},children:[(0,h.jsx)(`circle`,{r:Math.max(r+8,24),fill:`transparent`}),(0,h.jsx)(`circle`,{r:r+2,fill:i,fillOpacity:.15}),(0,h.jsx)(`circle`,{r,fill:i,fillOpacity:s?.85:1,style:{transition:`fill-opacity 0.15s`}}),c&&(0,h.jsx)(se,{path:te,size:l})]})},`node-${e.data.id}-${t}`)})}),ge&&((e,t)=>(0,h.jsxs)(`g`,{"data-testid":`drill-ghost-layer`,opacity:t,pointerEvents:`none`,children:[(0,h.jsx)(`g`,{fill:`none`,stroke:Ve,strokeOpacity:_,strokeWidth:v,children:e.links().map((e,t)=>(0,h.jsx)(`path`,{d:ye(e)},`ghost-link-${t}`))}),(0,h.jsx)(`g`,{children:e.descendants().map((e,t)=>(0,h.jsxs)(`g`,{transform:`rotate(${e.x*180/Math.PI-90}) translate(${e.y},0)`,children:[(0,h.jsx)(`circle`,{r:I(e)+2,fill:L(e),fillOpacity:.15}),(0,h.jsx)(`circle`,{r:I(e),fill:L(e)}),c&&(0,h.jsx)(se,{path:e.children?g.folder:g.person,size:Math.round(I(e)*1.3)})]},`ghost-node-${t}`))})]}))(ge,_e),s&&(0,h.jsx)(`g`,{children:G.map((e,t)=>{let n=I(e),r=e.x<Math.PI==!e.children,i=n+6,a=r?i:-i,o=r?`start`:`end`;return(0,h.jsx)(`text`,{transform:`rotate(${e.x*180/Math.PI-90}) translate(${e.y},0) rotate(${e.x>=Math.PI?180:0})`,dy:`0.35em`,x:a,textAnchor:o,paintOrder:`stroke`,stroke:He,strokeWidth:3,fill:Be,fontSize:y,fontWeight:e.depth===0?`bold`:`normal`,pointerEvents:`none`,children:e.data.name},`lbl-${e.data.id}-${t}`)})})]})}),D&&(0,h.jsx)(te,{open:Ae,anchorEl:Me,onClose:()=>je(!1),anchorOrigin:{vertical:`top`,horizontal:`right`},transformOrigin:{vertical:`top`,horizontal:`left`},slotProps:{paper:{elevation:4}},children:$&&(O?O($):(0,h.jsx)(ce,{info:$,labelA:P.specialValueA??`Value A`,labelB:P.specialValueB??`Value B`}))})]})}var m,h,g,le=e((()=>{m=t(r(),1),u(),c(),f(),h=s(),g={folder:`M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z`,person:`M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z`},p.displayName=`RadialTreeChart`,p.__docgenInfo={description:``,methods:[],displayName:`RadialTreeChart`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  /** Subtitle shown below the name in the built-in node popover */
  subname?:      string;
  value?:        number;
  /** Custom field A — shown in the built-in node popover */
  specialValueA?: string | number;
  /** Custom field B — shown in the built-in node popover */
  specialValueB?: string | number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    RadialTreeChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1},description:`Subtitle shown below the name in the built-in node popover`},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field A — shown in the built-in node popover`},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field B — shown in the built-in node popover`},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`RadialTreeChartData`}],raw:`RadialTreeChartData[]`,required:!1}}]}},description:`Root node of the hierarchy`},size:{required:!1,tsType:{name:`number`},description:`Width and height of the SVG in pixels (default: 600)`,defaultValue:{value:`600`,computed:!1}},autoFit:{required:!1,tsType:{name:`boolean`},description:`Auto-fit viewBox to the rendered content (default: true)`,defaultValue:{value:`true`,computed:!1}},sortBy:{required:!1,tsType:{name:`union`,raw:`'name' | 'value'`,elements:[{name:`literal`,value:`'name'`},{name:`literal`,value:`'value'`}]},description:`Sort child nodes alphabetically ('name') or by value ('value') — default: 'name'`,defaultValue:{value:`"name"`,computed:!1}},showLabels:{required:!1,tsType:{name:`boolean`},description:`Show node name labels (default: true)`,defaultValue:{value:`true`,computed:!1}},chartColors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Per-depth node colors — falls back to MUI theme palette when omitted`},rootNodeRadius:{required:!1,tsType:{name:`number`},description:`Root node circle radius in px (default: 22)`,defaultValue:{value:`22`,computed:!1}},branchNodeRadius:{required:!1,tsType:{name:`number`},description:`Branch node circle radius in px (default: 16)`,defaultValue:{value:`16`,computed:!1}},leafNodeRadius:{required:!1,tsType:{name:`number`},description:`Leaf node circle radius in px (default: 11)`,defaultValue:{value:`11`,computed:!1}},linkColor:{required:!1,tsType:{name:`string`},description:"Link line color — defaults to `theme.palette.text.secondary`"},linkStrokeOpacity:{required:!1,tsType:{name:`number`},description:`Link line opacity — 0 to 1 (default: 1)`,defaultValue:{value:`1`,computed:!1}},linkStrokeWidth:{required:!1,tsType:{name:`number`},description:`Link line width in px (default: 1.5)`,defaultValue:{value:`1.5`,computed:!1}},labelFontSize:{required:!1,tsType:{name:`number`},description:`Label font size in px (default: 12)`,defaultValue:{value:`12`,computed:!1}},labelColor:{required:!1,tsType:{name:`string`},description:"Label text color — defaults to `theme.palette.text.primary`"},separationSibling:{required:!1,tsType:{name:`number`},description:`Separation factor between sibling nodes (default: 1)`,defaultValue:{value:`1`,computed:!1}},separationCousin:{required:!1,tsType:{name:`number`},description:`Separation factor between cousin nodes (default: 2)`,defaultValue:{value:`2`,computed:!1}},showIcons:{required:!1,tsType:{name:`boolean`},description:`Show white icons (folder/person) inside the node circles (default: true)`,defaultValue:{value:`true`,computed:!1}},showNodePopover:{required:!1,tsType:{name:`boolean`},description:`Show a built-in MUI Popover with node details on click (default: false)`,defaultValue:{value:`false`,computed:!1}},renderNodePopoverContent:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: RadialTreeNodeInfo) => React.ReactNode`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root to this node */
  path:          string[];
  childrenCount: number;
  data:          RadialTreeChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root to this node`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  /** Subtitle shown below the name in the built-in node popover */
  subname?:      string;
  value?:        number;
  /** Custom field A — shown in the built-in node popover */
  specialValueA?: string | number;
  /** Custom field B — shown in the built-in node popover */
  specialValueB?: string | number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    RadialTreeChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1},description:`Subtitle shown below the name in the built-in node popover`},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field A — shown in the built-in node popover`},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field B — shown in the built-in node popover`},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`RadialTreeChartData`}],raw:`RadialTreeChartData[]`,required:!1}}]},required:!0}}]}},name:`info`}],return:{name:`ReactReactNode`,raw:`React.ReactNode`}}},description:`Render custom content inside the built-in node popover`},onNodeClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: RadialTreeNodeInfo, event: React.MouseEvent<SVGGElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root to this node */
  path:          string[];
  childrenCount: number;
  data:          RadialTreeChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root to this node`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  /** Subtitle shown below the name in the built-in node popover */
  subname?:      string;
  value?:        number;
  /** Custom field A — shown in the built-in node popover */
  specialValueA?: string | number;
  /** Custom field B — shown in the built-in node popover */
  specialValueB?: string | number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    RadialTreeChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1},description:`Subtitle shown below the name in the built-in node popover`},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field A — shown in the built-in node popover`},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field B — shown in the built-in node popover`},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`RadialTreeChartData`}],raw:`RadialTreeChartData[]`,required:!1}}]},required:!0}}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGGElement>`,elements:[{name:`SVGGElement`}]},name:`event`}],return:{name:`void`}}},description:`Fired on every node click`},onNodeHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: RadialTreeNodeInfo | null, event: React.MouseEvent<SVGGElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`RadialTreeNodeInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root to this node */
  path:          string[];
  childrenCount: number;
  data:          RadialTreeChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root to this node`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  /** Subtitle shown below the name in the built-in node popover */
  subname?:      string;
  value?:        number;
  /** Custom field A — shown in the built-in node popover */
  specialValueA?: string | number;
  /** Custom field B — shown in the built-in node popover */
  specialValueB?: string | number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    RadialTreeChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1},description:`Subtitle shown below the name in the built-in node popover`},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field A — shown in the built-in node popover`},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field B — shown in the built-in node popover`},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`RadialTreeChartData`}],raw:`RadialTreeChartData[]`,required:!1}}]},required:!0}}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGGElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGGElement>`,elements:[{name:`SVGGElement`}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave a node — `null` on leave. Use for linked-view highlighting."},zoomable:{required:!1,tsType:{name:`boolean`},description:`Enable Ctrl+Scroll zoom — Ctrl+Wheel zooms in/out, Escape resets (default: false)`,defaultValue:{value:`false`,computed:!1}},drillable:{required:!1,tsType:{name:`boolean`},description:`Enable Ctrl+Click drill-down into subtrees, Ctrl+DblClick zoom out (default: false)`,defaultValue:{value:`false`,computed:!1}},onFocusChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(focusedNode: RadialTreeNodeInfo | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`RadialTreeNodeInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  /** Breadcrumb from root to this node */
  path:          string[];
  childrenCount: number;
  data:          RadialTreeChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0}},{key:`specialValueA`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`specialValueB`,value:{name:`union`,raw:`string | number | null`,elements:[{name:`string`},{name:`number`},{name:`null`}],required:!0}},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root to this node`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:            string;
  name:          string;
  /** Subtitle shown below the name in the built-in node popover */
  subname?:      string;
  value?:        number;
  /** Custom field A — shown in the built-in node popover */
  specialValueA?: string | number;
  /** Custom field B — shown in the built-in node popover */
  specialValueB?: string | number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    RadialTreeChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`subname`,value:{name:`string`,required:!1},description:`Subtitle shown below the name in the built-in node popover`},{key:`value`,value:{name:`number`,required:!1}},{key:`specialValueA`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field A — shown in the built-in node popover`},{key:`specialValueB`,value:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}],required:!1},description:`Custom field B — shown in the built-in node popover`},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`RadialTreeChartData`}],raw:`RadialTreeChartData[]`,required:!1}}]},required:!0}}]}},{name:`null`}]},name:`focusedNode`}],return:{name:`void`}}},description:`Fired when drill-down focus changes — null when reset to root`},duration:{required:!1,tsType:{name:`number`},description:`Drill-down/out crossfade duration in ms — set to 0 to disable (default: 750)`,defaultValue:{value:`750`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables all interactions (default: false)`,defaultValue:{value:`false`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Shown when data is empty */
  noData:         string;
  /** Label for specialValueA in the built-in node popover */
  specialValueA?: string;
  /** Label for specialValueB in the built-in node popover */
  specialValueB?: string;
}`,signature:{properties:[{key:`noData`,value:{name:`string`,required:!0},description:`Shown when data is empty`},{key:`specialValueA`,value:{name:`string`,required:!1},description:`Label for specialValueA in the built-in node popover`},{key:`specialValueB`,value:{name:`string`,required:!1},description:`Label for specialValueB in the built-in node popover`}]}}],raw:`Partial<RadialTreeChartTranslation>`},description:`Override translation strings`}}}})),_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;e((()=>{le(),{fn:_,fireEvent:v}=__STORYBOOK_MODULE_TEST__,y={title:`Components/RadialTreeChart`,component:p,argTypes:{autoFit:{control:`boolean`},branchNodeRadius:{control:`number`},chartColors:{control:!1},data:{control:!1},disabled:{control:`boolean`},drillable:{control:`boolean`},duration:{control:`number`},labelColor:{control:`color`},labelFontSize:{control:`number`},leafNodeRadius:{control:`number`},linkColor:{control:`color`},linkStrokeOpacity:{control:{type:`range`,min:0,max:1,step:.05}},linkStrokeWidth:{control:`number`},renderNodePopoverContent:{control:!1},rootNodeRadius:{control:`number`},separationCousin:{control:`number`},separationSibling:{control:`number`},showIcons:{control:`boolean`},showLabels:{control:`boolean`},showNodePopover:{control:`boolean`},size:{control:`number`},sortBy:{control:`radio`,options:[`name`,`value`]},translation:{control:!1},zoomable:{control:`boolean`},onFocusChange:{control:!1},onNodeClick:{control:!1}},args:{autoFit:!0,branchNodeRadius:16,disabled:!1,drillable:!1,duration:750,labelColor:``,labelFontSize:12,leafNodeRadius:11,linkColor:``,linkStrokeOpacity:1,linkStrokeWidth:1.5,rootNodeRadius:22,separationCousin:2,separationSibling:1,showIcons:!0,showLabels:!0,showNodePopover:!1,size:600,sortBy:`name`,zoomable:!1,onNodeClick:_(),onNodeHover:_()},parameters:{controls:{sort:`alpha`}}},b={id:`ceo`,name:`CEO`,subname:`Thomas Müller`,specialValueA:`Since 2019`,specialValueB:`15 direct reports`,children:[{id:`cto`,name:`CTO`,subname:`Anna Schmidt`,specialValueA:`Since 2021`,specialValueB:`Technology`,children:[{id:`fe`,name:`Frontend Lead`,subname:`Marc Weber`,specialValueA:`Since 2022`,specialValueB:`8 engineers`},{id:`be`,name:`Backend Lead`,subname:`Julia Fischer`,specialValueA:`Since 2021`,specialValueB:`6 engineers`},{id:`devops`,name:`DevOps Lead`,subname:`Tim Bauer`,specialValueA:`Since 2023`,specialValueB:`4 engineers`},{id:`qa`,name:`QA Lead`,subname:`Sara Klein`,specialValueA:`Since 2022`,specialValueB:`3 engineers`}]},{id:`cpo`,name:`CPO`,subname:`Laura Hoffmann`,specialValueA:`Since 2020`,specialValueB:`Product`,children:[{id:`ux`,name:`UX Lead`,subname:`Nina Schulz`,specialValueA:`Since 2022`,specialValueB:`5 designers`},{id:`pm1`,name:`Product Manager`,subname:`Ben Richter`,specialValueA:`Since 2021`,specialValueB:`Core product`},{id:`pm2`,name:`Product Analyst`,subname:`Eva Wolf`,specialValueA:`Since 2023`,specialValueB:`Insights`}]},{id:`cmo`,name:`CMO`,subname:`Max Braun`,specialValueA:`Since 2022`,specialValueB:`Marketing`,children:[{id:`content`,name:`Content Lead`,subname:`Lea Koch`,specialValueA:`Since 2023`,specialValueB:`3 writers`},{id:`growth`,name:`Growth Lead`,subname:`Jan Meyer`,specialValueA:`Since 2022`,specialValueB:`Acquisition`},{id:`seo`,name:`SEO Lead`,subname:`Mia Lange`,specialValueA:`Since 2023`,specialValueB:`Organic`}]},{id:`cfo`,name:`CFO`,subname:`Klaus Wagner`,specialValueA:`Since 2020`,specialValueB:`Finance`,children:[{id:`controller`,name:`Controller`,subname:`Petra Fuchs`,specialValueA:`Since 2021`,specialValueB:`Accounting`},{id:`fp-and-a`,name:`FP&A Lead`,subname:`Hans Keller`,specialValueA:`Since 2022`,specialValueB:`Planning`}]}]},x={parameters:{docs:{description:{story:"Org chart as a radial tree. **Hover** any node for a rich tooltip — name, person, tenure, department, reports. **Click** any node to fire `onNodeClick`."}}},args:{data:b,translation:{specialValueA:`In Role Since`,specialValueB:`Department`}}},S={parameters:{docs:{description:{story:"`showNodePopover={true}` — clicking a node opens a built-in MUI Popover with name, subname, and special values. The popover content can be fully customized via `renderNodePopoverContent`."}}},args:{data:b,showNodePopover:!0,translation:{specialValueA:`In Role Since`,specialValueB:`Department`}}},C={parameters:{docs:{description:{story:"`chartColors` overrides the default MUI theme palette. Colors are assigned per depth level and repeat cyclically."}}},args:{data:b,chartColors:[`#1565C0`,`#6A1B9A`,`#00695C`]}},w={parameters:{docs:{description:{story:"`showLabels={false}` hides all text labels. Node details are still available via the MUI tooltip on hover."}}},args:{data:b,showLabels:!1}},T={parameters:{docs:{description:{story:"`colorConfig` in the data — each node can define its own `fill` color. Here, each C-level uses a distinct brand color for their subtree. Nodes without `colorConfig` fall back to the depth-based palette."}}},args:{data:{id:`ceo`,name:`CEO`,subname:`Thomas Müller`,specialValueA:`Since 2019`,specialValueB:`15 direct reports`,colorConfig:{fill:`#1A237E`},children:[{id:`cto`,name:`CTO`,subname:`Anna Schmidt`,specialValueA:`Since 2021`,specialValueB:`Technology`,colorConfig:{fill:`#1565C0`},children:[{id:`fe`,name:`Frontend Lead`,subname:`Marc Weber`,specialValueA:`Since 2022`,specialValueB:`8 engineers`,colorConfig:{fill:`#1976D2`}},{id:`be`,name:`Backend Lead`,subname:`Julia Fischer`,specialValueA:`Since 2021`,specialValueB:`6 engineers`,colorConfig:{fill:`#0D47A1`}},{id:`devops`,name:`DevOps Lead`,subname:`Tim Bauer`,specialValueA:`Since 2023`,specialValueB:`4 engineers`,colorConfig:{fill:`#42A5F5`}},{id:`qa`,name:`QA Lead`,subname:`Sara Klein`,specialValueA:`Since 2022`,specialValueB:`3 engineers`,colorConfig:{fill:`#90CAF9`}}]},{id:`cpo`,name:`CPO`,subname:`Laura Hoffmann`,specialValueA:`Since 2020`,specialValueB:`Product`,colorConfig:{fill:`#6A1B9A`},children:[{id:`ux`,name:`UX Lead`,subname:`Nina Schulz`,specialValueA:`Since 2022`,specialValueB:`5 designers`,colorConfig:{fill:`#7B1FA2`}},{id:`pm1`,name:`Product Manager`,subname:`Ben Richter`,specialValueA:`Since 2021`,specialValueB:`Core`,colorConfig:{fill:`#AB47BC`}},{id:`pm2`,name:`Product Analyst`,subname:`Eva Wolf`,specialValueA:`Since 2023`,specialValueB:`Insights`,colorConfig:{fill:`#CE93D8`}}]},{id:`cmo`,name:`CMO`,subname:`Max Braun`,specialValueA:`Since 2022`,specialValueB:`Marketing`,colorConfig:{fill:`#00695C`},children:[{id:`content`,name:`Content Lead`,subname:`Lea Koch`,specialValueA:`Since 2023`,specialValueB:`3 writers`,colorConfig:{fill:`#00796B`}},{id:`growth`,name:`Growth Lead`,subname:`Jan Meyer`,specialValueA:`Since 2022`,specialValueB:`Acquisition`,colorConfig:{fill:`#26A69A`}}]},{id:`cfo`,name:`CFO`,subname:`Klaus Wagner`,specialValueA:`Since 2020`,specialValueB:`Finance`,children:[{id:`controller`,name:`Controller`,subname:`Petra Fuchs`,specialValueA:`Since 2021`,specialValueB:`Accounting`},{id:`fp-and-a`,name:`FP&A Lead`,subname:`Hans Keller`,specialValueA:`Since 2022`,specialValueB:`Planning`}]}]},translation:{specialValueA:`In Role Since`,specialValueB:`Department`},showNodePopover:!0}},E={parameters:{docs:{description:{story:"`disabled={true}` mutes all interactions and reduces opacity to 0.5."}}},args:{data:b,disabled:!0}},D={parameters:{docs:{description:{story:'When `data` has no `children` and no `value`, the chart renders the `translation.noData` message (default `"No data"`) centered in the SVG instead of an empty canvas. Override it via `translation={{ noData: "..." }}`.'}}},args:{data:{id:`root`,name:`Root`},translation:{noData:`Nothing to show yet`}}},O={parameters:{docs:{description:{story:"`autoFit={false}` disables the auto-fit viewBox computation — the chart uses a static, `size`-based viewBox instead of measuring and fitting the rendered content. Compare against **Default** (`autoFit={true}`, the default) to see the difference: with a small tree like this one, auto-fit zooms in tighter around the actual nodes, while the static viewBox always reserves the full `size × size` area."}}},args:{data:b,autoFit:!1}},k={id:`root`,name:`Tech Skills`,subname:`Full taxonomy`,children:[{id:`fe`,name:`Frontend`,subname:`UI Engineering`,children:[{id:`fe-fw`,name:`Frameworks`,subname:`UI libraries`,children:[{id:`fe-fw-react`,name:`React`,subname:`v19`,children:[{id:`fe-fw-react-hooks`,name:`Hooks`,subname:`useState/useEffect`},{id:`fe-fw-react-ctx`,name:`Context`,subname:`State management`},{id:`fe-fw-react-perf`,name:`Performance`,subname:`memo/useMemo`}]},{id:`fe-fw-vue`,name:`Vue`,subname:`v3 Composition`},{id:`fe-fw-angular`,name:`Angular`,subname:`v18 Signals`}]},{id:`fe-style`,name:`Styling`,subname:`CSS & design`,children:[{id:`fe-style-ts`,name:`TypeScript`,subname:`5.x strict`},{id:`fe-style-css`,name:`CSS-in-JS`,subname:`MUI / styled`},{id:`fe-style-tw`,name:`Tailwind`,subname:`v4`}]},{id:`fe-test`,name:`Testing`,subname:`Quality`,children:[{id:`fe-test-vit`,name:`Vitest`,subname:`Unit tests`},{id:`fe-test-play`,name:`Playwright`,subname:`E2E tests`}]}]},{id:`be`,name:`Backend`,subname:`Server Engineering`,children:[{id:`be-lang`,name:`Languages`,subname:`Server-side`,children:[{id:`be-lang-node`,name:`Node.js`,subname:`v22 LTS`},{id:`be-lang-go`,name:`Go`,subname:`1.22`},{id:`be-lang-python`,name:`Python`,subname:`3.12`},{id:`be-lang-rust`,name:`Rust`,subname:`2024 edition`}]},{id:`be-db`,name:`Databases`,subname:`Storage`,children:[{id:`be-db-pg`,name:`PostgreSQL`,subname:`v16`},{id:`be-db-mongo`,name:`MongoDB`,subname:`v7`},{id:`be-db-redis`,name:`Redis`,subname:`Cache / PubSub`}]},{id:`be-api`,name:`APIs`,subname:`Integration`,children:[{id:`be-api-rest`,name:`REST`,subname:`OpenAPI 3.1`},{id:`be-api-gql`,name:`GraphQL`,subname:`Apollo v4`},{id:`be-api-grpc`,name:`gRPC`,subname:`Protobuf`}]}]},{id:`devops`,name:`DevOps`,subname:`Infrastructure`,children:[{id:`devops-ci`,name:`CI/CD`,subname:`Automation`,children:[{id:`devops-ci-gh`,name:`GitHub Actions`,subname:`Workflows`},{id:`devops-ci-argocd`,name:`ArgoCD`,subname:`GitOps`}]},{id:`devops-cloud`,name:`Cloud`,subname:`Platforms`,children:[{id:`devops-cloud-aws`,name:`AWS`,subname:`ECS / Lambda`},{id:`devops-cloud-gcp`,name:`GCP`,subname:`GKE / Cloud Run`},{id:`devops-cloud-az`,name:`Azure`,subname:`AKS / Functions`}]},{id:`devops-obs`,name:`Observability`,subname:`Monitoring`,children:[{id:`devops-obs-prom`,name:`Prometheus`,subname:`Metrics`},{id:`devops-obs-graf`,name:`Grafana`,subname:`Dashboards`},{id:`devops-obs-otel`,name:`OpenTelemetry`,subname:`Traces`}]}]},{id:`data`,name:`Data`,subname:`Analytics & ML`,children:[{id:`data-eng`,name:`Engineering`,subname:`Pipelines`,children:[{id:`data-eng-spark`,name:`Spark`,subname:`Batch processing`},{id:`data-eng-kafka`,name:`Kafka`,subname:`Streaming`},{id:`data-eng-dbt`,name:`dbt`,subname:`Transformations`}]},{id:`data-ml`,name:`Machine Learning`,subname:`AI/ML`,children:[{id:`data-ml-pt`,name:`PyTorch`,subname:`Deep learning`},{id:`data-ml-hf`,name:`HuggingFace`,subname:`LLM / NLP`},{id:`data-ml-sk`,name:`scikit-learn`,subname:`Classical ML`}]}]}]},A={parameters:{docs:{description:{story:"**Stress test: 5 depth levels, ~65 nodes — both `drillable` and `zoomable` enabled.** `Ctrl+Click` on any branch node → drill down into that subtree. `Ctrl+Double-click` → zoom out one level. `Ctrl+Scroll` → visual zoom (content clipped at SVG boundary). `Escape` resets everything. Breadcrumb shown at top when drilled in. This story auto-runs a Ctrl+Click on the first branch node so you land already drilled in."}}},play:async({canvasElement:e})=>{let t=e.querySelector(`g[data-idx="1"]`);t&&v.click(t,{ctrlKey:!0})},args:{data:k,size:750,autoFit:!0,zoomable:!0,drillable:!0,showLabels:!0,labelFontSize:10,branchNodeRadius:13,leafNodeRadius:8,separationCousin:2.5,translation:{specialValueA:`Version`,specialValueB:`Focus area`}}},j={parameters:{docs:{description:{story:"Drilling in/out (`Ctrl+Click` / `Ctrl+DblClick` / `Escape`) now crossfades the previous layout out on top of the new one instead of jump-cutting, via `duration` (ms). Unlike `SunburstChart` — which reuses one hierarchy and just animates the view window — drilling here re-roots the hierarchy entirely (a different node set per focus level), so a position-tween isn't straightforward without enter/update/exit node matching. A crossfade gets rid of the hard cut with much less complexity. This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. Set `duration={0}` to disable it entirely."}}},play:async({canvasElement:e})=>{let t=e.querySelector(`g[data-idx="1"]`);t&&v.click(t,{ctrlKey:!0})},args:{data:k,size:700,drillable:!0,duration:2e3}},M={id:`catalog`,name:`Catalog`,subname:`All Departments`,children:[{id:`electronics`,name:`Electronics`,subname:`1,240 products`,children:[{id:`phones`,name:`Phones`,subname:`180 products`},{id:`laptops`,name:`Laptops`,subname:`95 products`},{id:`audio`,name:`Audio`,subname:`310 products`},{id:`tv`,name:`TVs`,subname:`60 products`}]},{id:`fashion`,name:`Fashion`,subname:`3,890 products`,children:[{id:`mens`,name:`Men's`,subname:`1,120 products`},{id:`womens`,name:`Women's`,subname:`1,680 products`},{id:`kids`,name:`Kids`,subname:`640 products`},{id:`shoes`,name:`Shoes`,subname:`450 products`}]},{id:`home`,name:`Home & Garden`,subname:`2,150 products`,children:[{id:`furniture`,name:`Furniture`,subname:`480 products`},{id:`kitchen`,name:`Kitchen`,subname:`620 products`},{id:`garden`,name:`Garden`,subname:`340 products`}]},{id:`sports`,name:`Sports & Outdoors`,subname:`980 products`,children:[{id:`fitness`,name:`Fitness`,subname:`290 products`},{id:`camping`,name:`Camping`,subname:`210 products`}]}]},N={parameters:{docs:{description:{story:"**Real-world use case: an e-commerce category tree.** Subname shows live product counts per category — useful for catalog admin tools or navigation builders. Try `showNodePopover` together with `renderNodePopoverContent` to surface stock levels or revenue per category."}}},args:{data:M,chartColors:[`#1565C0`,`#AD1457`,`#00695C`,`#E65100`],translation:{specialValueA:`SKU count`}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Org chart as a radial tree. **Hover** any node for a rich tooltip — name, person, tenure, department, reports. ' + '**Click** any node to fire \`onNodeClick\`.'
      }
    }
  },
  args: {
    data: ORG_DATA,
    translation: {
      specialValueA: "In Role Since",
      specialValueB: "Department"
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showNodePopover={true}\` — clicking a node opens a built-in MUI Popover with name, subname, and special values. ' + 'The popover content can be fully customized via \`renderNodePopoverContent\`.'
      }
    }
  },
  args: {
    data: ORG_DATA,
    showNodePopover: true,
    translation: {
      specialValueA: "In Role Since",
      specialValueB: "Department"
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`chartColors\` overrides the default MUI theme palette. Colors are assigned per depth level and repeat cyclically.'
      }
    }
  },
  args: {
    data: ORG_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C"]
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showLabels={false}\` hides all text labels. Node details are still available via the MUI tooltip on hover.'
      }
    }
  },
  args: {
    data: ORG_DATA,
    showLabels: false
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`colorConfig\` in the data — each node can define its own \`fill\` color. ' + 'Here, each C-level uses a distinct brand color for their subtree. ' + 'Nodes without \`colorConfig\` fall back to the depth-based palette.'
      }
    }
  },
  args: {
    data: {
      id: "ceo",
      name: "CEO",
      subname: "Thomas Müller",
      specialValueA: "Since 2019",
      specialValueB: "15 direct reports",
      colorConfig: {
        fill: "#1A237E"
      },
      // deep navy for root
      children: [{
        id: "cto",
        name: "CTO",
        subname: "Anna Schmidt",
        specialValueA: "Since 2021",
        specialValueB: "Technology",
        colorConfig: {
          fill: "#1565C0"
        },
        // blue for tech
        children: [{
          id: "fe",
          name: "Frontend Lead",
          subname: "Marc Weber",
          specialValueA: "Since 2022",
          specialValueB: "8 engineers",
          colorConfig: {
            fill: "#1976D2"
          }
        }, {
          id: "be",
          name: "Backend Lead",
          subname: "Julia Fischer",
          specialValueA: "Since 2021",
          specialValueB: "6 engineers",
          colorConfig: {
            fill: "#0D47A1"
          }
        }, {
          id: "devops",
          name: "DevOps Lead",
          subname: "Tim Bauer",
          specialValueA: "Since 2023",
          specialValueB: "4 engineers",
          colorConfig: {
            fill: "#42A5F5"
          }
        }, {
          id: "qa",
          name: "QA Lead",
          subname: "Sara Klein",
          specialValueA: "Since 2022",
          specialValueB: "3 engineers",
          colorConfig: {
            fill: "#90CAF9"
          }
        }]
      }, {
        id: "cpo",
        name: "CPO",
        subname: "Laura Hoffmann",
        specialValueA: "Since 2020",
        specialValueB: "Product",
        colorConfig: {
          fill: "#6A1B9A"
        },
        // purple for product
        children: [{
          id: "ux",
          name: "UX Lead",
          subname: "Nina Schulz",
          specialValueA: "Since 2022",
          specialValueB: "5 designers",
          colorConfig: {
            fill: "#7B1FA2"
          }
        }, {
          id: "pm1",
          name: "Product Manager",
          subname: "Ben Richter",
          specialValueA: "Since 2021",
          specialValueB: "Core",
          colorConfig: {
            fill: "#AB47BC"
          }
        }, {
          id: "pm2",
          name: "Product Analyst",
          subname: "Eva Wolf",
          specialValueA: "Since 2023",
          specialValueB: "Insights",
          colorConfig: {
            fill: "#CE93D8"
          }
        }]
      }, {
        id: "cmo",
        name: "CMO",
        subname: "Max Braun",
        specialValueA: "Since 2022",
        specialValueB: "Marketing",
        colorConfig: {
          fill: "#00695C"
        },
        // teal for marketing
        children: [{
          id: "content",
          name: "Content Lead",
          subname: "Lea Koch",
          specialValueA: "Since 2023",
          specialValueB: "3 writers",
          colorConfig: {
            fill: "#00796B"
          }
        }, {
          id: "growth",
          name: "Growth Lead",
          subname: "Jan Meyer",
          specialValueA: "Since 2022",
          specialValueB: "Acquisition",
          colorConfig: {
            fill: "#26A69A"
          }
        }]
      }, {
        id: "cfo",
        name: "CFO",
        subname: "Klaus Wagner",
        specialValueA: "Since 2020",
        specialValueB: "Finance",
        // no colorConfig → uses default palette
        children: [{
          id: "controller",
          name: "Controller",
          subname: "Petra Fuchs",
          specialValueA: "Since 2021",
          specialValueB: "Accounting"
        }, {
          id: "fp-and-a",
          name: "FP&A Lead",
          subname: "Hans Keller",
          specialValueA: "Since 2022",
          specialValueB: "Planning"
        }]
      }]
    },
    translation: {
      specialValueA: "In Role Since",
      specialValueB: "Department"
    },
    showNodePopover: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`disabled={true}\` mutes all interactions and reduces opacity to 0.5.'
      }
    }
  },
  args: {
    data: ORG_DATA,
    disabled: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'When \`data\` has no \`children\` and no \`value\`, the chart renders the \`translation.noData\` ' + 'message (default \`"No data"\`) centered in the SVG instead of an empty canvas. ' + 'Override it via \`translation={{ noData: "..." }}\`.'
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`autoFit={false}\` disables the auto-fit viewBox computation — the chart uses a static, ' + '\`size\`-based viewBox instead of measuring and fitting the rendered content. ' + 'Compare against **Default** (\`autoFit={true}\`, the default) to see the difference: with a small ' + 'tree like this one, auto-fit zooms in tighter around the actual nodes, while the static viewBox ' + 'always reserves the full \`size × size\` area.'
      }
    }
  },
  args: {
    data: ORG_DATA,
    autoFit: false
  }
}`,...O.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Stress test: 5 depth levels, ~65 nodes — both \`drillable\` and \`zoomable\` enabled.** ' + '\`Ctrl+Click\` on any branch node → drill down into that subtree. ' + '\`Ctrl+Double-click\` → zoom out one level. ' + '\`Ctrl+Scroll\` → visual zoom (content clipped at SVG boundary). ' + '\`Escape\` resets everything. Breadcrumb shown at top when drilled in. ' + 'This story auto-runs a Ctrl+Click on the first branch node so you land already drilled in.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const firstBranchNode = canvasElement.querySelector<SVGGElement>('g[data-idx="1"]');
    if (firstBranchNode) fireEvent.click(firstBranchNode, {
      ctrlKey: true
    });
  },
  args: {
    data: DEEP_TREE_DATA,
    size: 750,
    autoFit: true,
    zoomable: true,
    drillable: true,
    showLabels: true,
    labelFontSize: 10,
    branchNodeRadius: 13,
    leafNodeRadius: 8,
    separationCousin: 2.5,
    translation: {
      specialValueA: "Version",
      specialValueB: "Focus area"
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Drilling in/out (\`Ctrl+Click\` / \`Ctrl+DblClick\` / \`Escape\`) now crossfades the previous layout ' + 'out on top of the new one instead of jump-cutting, via \`duration\` (ms). ' + 'Unlike \`SunburstChart\` — which reuses one hierarchy and just animates the view window — drilling here ' + 're-roots the hierarchy entirely (a different node set per focus level), so a position-tween isn\\'t ' + 'straightforward without enter/update/exit node matching. A crossfade gets rid of the hard cut with much ' + 'less complexity. This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. ' + 'Set \`duration={0}\` to disable it entirely.'
      }
    }
  },
  play: async ({
    canvasElement
  }) => {
    const firstBranchNode = canvasElement.querySelector<SVGGElement>('g[data-idx="1"]');
    if (firstBranchNode) fireEvent.click(firstBranchNode, {
      ctrlKey: true
    });
  },
  args: {
    data: DEEP_TREE_DATA,
    size: 700,
    drillable: true,
    duration: 2000
  }
}`,...j.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: an e-commerce category tree.** ' + 'Subname shows live product counts per category — useful for catalog admin tools or navigation builders. ' + 'Try \`showNodePopover\` together with \`renderNodePopoverContent\` to surface stock levels or revenue per category.'
      }
    }
  },
  args: {
    data: CATALOG_DATA,
    chartColors: ["#1565C0", "#AD1457", "#00695C", "#E65100"],
    translation: {
      specialValueA: "SKU count"
    }
  }
}`,...N.parameters?.docs?.source}}},P=[`Default`,`WithNodePopover`,`CustomPalette`,`NoLabels`,`WithColorConfig`,`Disabled`,`EmptyData`,`StaticViewBox`,`DeepTree`,`AnimatedDrillTransitions`,`ProductCatalog`]}))();export{j as AnimatedDrillTransitions,C as CustomPalette,A as DeepTree,x as Default,E as Disabled,D as EmptyData,w as NoLabels,N as ProductCatalog,O as StaticViewBox,T as WithColorConfig,S as WithNodePopover,P as __namedExportsOrder,y as default};