import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,U as i,Y as a,Z as o,c as s,t as c}from"./iframe-Bb8mcAY9.js";import{O as l,S as u,f as ee,m as te,o as ne,t as d,u as re,y as ie}from"./src-BuH4pCkW.js";var f,p=e((()=>{f={noData:`No data`}}));function m(e,t=0,n=`.`,r=`,`){if(e==null||!isFinite(e))return`0`;let[i,a]=e.toFixed(Math.max(0,t)).split(`.`),o=i.replace(/\B(?=(\d{3})+(?!\d))/g,r);return a?`${o}${n}${a}`:o}function ae(e,t){let n=Math.floor(t/b);return n<=0?``:e.length<=n?e:n<x?``:e.slice(0,n-1)+`…`}function oe({node:e,valueDecimalCount:t,valueDecimalSep:r,valueThousandsSep:a,valueFormatter:o}){let s=(e.value??0)>0,c=e.ancestors().map(e=>e.data.name).reverse().join(` › `);return(0,_.jsxs)(n,{sx:{py:.25},children:[(0,_.jsx)(i,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`},children:e.data.name}),s&&(0,_.jsx)(i,{variant:`caption`,sx:{display:`block`,opacity:.85},children:(e=>o?o(e):m(e,t,r,a))(e.value??0)}),e.depth>0&&(0,_.jsx)(i,{variant:`caption`,sx:{display:`block`,opacity:.65,mt:.25},children:c})]})}function h({data:e,size:t=500,showSegmentLabels:r=!0,innerRadius:i=0,sortBy:o=`value`,chartColors:c,showRootLabel:d=!0,onSegmentClick:p,onSegmentHover:m,onZoomChange:h,valueDecimalCount:b=0,valueDecimalSeparator:x=`.`,valueThousandsSeparator:se=`,`,valueFormatter:S,zoomable:C=!1,duration:w=750,disabled:T=!1,translation:E}){let D=a(),O={...f,...E},k=!e.children?.length&&!e.value,A=(0,g.useRef)(null),[j,M]=(0,g.useState)(`-${t/2} -${t/2} ${t} ${t}`),[N,P]=(0,g.useState)(1),F=(0,g.useMemo)(()=>{if(N===1)return j;let[e,t,n,r]=j.split(` `).map(Number),i=n/N,a=r/N;return`${e+(n-i)/2} ${t+(r-a)/2} ${i} ${a}`},[j,N]),I=t/2,L=Math.max(0,Math.min(i,Math.max(0,I-1))),R=Math.max(1,I-L),z=[D.palette.primary.main,D.palette.secondary.main,D.palette.error.main,D.palette.warning.main,D.palette.success.main,D.palette.info.main],B=c&&c.length>0?c:z,{root:V,ringThickness:H}=(0,g.useMemo)(()=>{let t=te(e).sum(e=>e.value??0);o===`value`?t.sort((e,t)=>(t.value??0)-(e.value??0)):t.sort((e,t)=>String(e.data.name).localeCompare(String(t.data.name),void 0,{numeric:!0,sensitivity:`base`}));let n=ee().size([v,R])(t),r=l(n.descendants(),e=>e.depth)??0,i=r>0?R/r:R;return r>0&&n.descendants().forEach(e=>{e.depth===0?(e.y0=0,e.y1=0):(e.y0=(e.depth-1)*i,e.y1=e.depth*i)}),{root:n,ringThickness:i}},[e,R,o]),[U,ce]=(0,g.useState)(V),[le,ue]=(0,g.useState)(V),W=e=>({x0:e.x0,x1:e.x1,yShift:e.depth===0?0:(e.depth-1)*H}),[G,K]=(0,g.useState)(()=>W(V)),q=(0,g.useRef)(G);if(le!==V){ue(V),ce(V);let e=W(V);q.current=e,K(e)}let de=(0,g.useMemo)(()=>V.children?.map(e=>e.data.name)??[V.data.name],[V]),fe=(0,g.useMemo)(()=>re().domain(de).range(B),[B,de]),pe=e=>{if(e.data.colorConfig?.fill)return e.data.colorConfig.fill;let t=e;for(;t.depth>1;)t=t.parent;return fe(t.data.name)},me=(0,g.useMemo)(()=>ne().startAngle(e=>e.x0).endAngle(e=>e.x1).padAngle(e=>Math.min((e.x1-e.x0)/2,.005)).padRadius(I/2).innerRadius(e=>L+e.y0).outerRadius(e=>L+e.y1-1),[I,L]),he=(0,g.useCallback)(e=>{let t=v/(G.x1-G.x0);return{x0:Math.max(0,Math.min(v,(e.x0-G.x0)*t)),x1:Math.max(0,Math.min(v,(e.x1-G.x0)*t)),y0:Math.max(0,e.y0-G.yShift),y1:Math.max(0,e.y1-G.yShift)}},[G]);(0,g.useEffect)(()=>{let e=W(U),t=q.current;if(t.x0===e.x0&&t.x1===e.x1&&t.yShift===e.yShift)return;if(w<=0){q.current=e,K(e);return}let n=null,r=u(t.x0,e.x0),i=u(t.x1,e.x1),a=u(t.yShift,e.yShift),o=performance.now(),s=e=>{let t=Math.min(1,(e-o)/w),c=ie(t),l={x0:r(c),x1:i(c),yShift:a(c)};q.current=l,K(l),n=t<1?requestAnimationFrame(s):null};return n=requestAnimationFrame(s),()=>{n!=null&&cancelAnimationFrame(n)}},[U,H,w]);let ge=e=>e.x1>e.x0&&e.y1>e.y0,_e=e=>(L+(e.y0+e.y1)/2)*(e.x1-e.x0)>12,ve=e=>{let t=(e.x0+e.x1)/2*180/Math.PI,n=L+(e.y0+e.y1)/2,r=t<180?0:180;return`rotate(${t-90}) translate(${n},0) rotate(${r})`},ye=(0,g.useCallback)(e=>e.ancestors().includes(U),[U]),J=(0,g.useCallback)(e=>{let t=e.ancestors().reverse(),n=e.value??0,r=V.value??0;return{id:e.data.id,name:e.data.name,value:n||null,percentage:r>0?Math.round(n/r*1e4)/100:0,depth:e.depth,path:t.map(e=>e.data.name),pathIds:t.map(e=>e.data.id),childrenCount:e.children?.length??0,data:e.data}},[V]),Y=(0,g.useCallback)(e=>{ce(e),h&&h({focusNode:J(e),isRoot:e===V})},[V,J,h]);(0,g.useLayoutEffect)(()=>{let e=A.current;if(!e)return;let n=requestAnimationFrame(()=>{try{let t=e.getBBox();M(`${t.x-8} ${t.y-8} ${t.width+16} ${t.height+16}`)}catch{M(`-${t/2} -${t/2} ${t} ${t}`)}});return()=>cancelAnimationFrame(n)},[t,V,U,L,H,d]);let X=(0,g.useRef)(null),be=e=>{X.current&&=(clearTimeout(X.current),null),X.current=setTimeout(()=>{e(),X.current=null},250)},Z=()=>{X.current&&=(clearTimeout(X.current),null)};(0,g.useLayoutEffect)(()=>{if(T)return;let e=e=>{e.key===`Escape`&&(Z(),Y(V),P(1))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[T,V,Y]);let xe=(0,g.useCallback)(e=>{if(!C||T||!e.ctrlKey)return;e.preventDefault();let t=e.deltaY<0?1.15:1/1.15;P(e=>Math.max(.25,Math.min(8,e*t)))},[C,T]),Q=V.descendants().filter(e=>e.depth>0),Se=e=>{if(T)return;let t=Q[Number(e.currentTarget.getAttribute(`data-idx`))];if(t){if(e.ctrlKey||e.metaKey){t.children&&be(()=>Y(t));return}p?.(J(t),e)}},Ce=e=>{T||(e.ctrlKey||e.metaKey)&&(Z(),Y(U.parent??V))},we=e=>{if(!T){if(e.ctrlKey||e.metaKey){Z(),Y(U.parent??V);return}p?.(J(U.parent??V),e)}},$={followCursor:!0,enterDelay:50,enterNextDelay:0,disableHoverListener:T,slotProps:{tooltip:{sx:{maxWidth:260}}}},Te=D.palette.text.primary,Ee=D.typography.fontFamily;return(0,_.jsx)(n,{sx:{display:`inline-flex`,opacity:T?.5:1,cursor:T?`not-allowed`:`default`,userSelect:`none`},children:(0,_.jsx)(`svg`,{width:t,height:t,viewBox:F,onWheel:xe,style:{fontFamily:Ee??`sans-serif`,overflow:C&&N>1?`hidden`:`visible`},role:`img`,"aria-label":e.name,children:(0,_.jsxs)(`g`,{ref:A,children:[k&&(0,_.jsx)(`text`,{textAnchor:`middle`,dy:`0.35em`,fontSize:13,fill:D.palette.text.secondary,children:O.noData}),L>0&&(0,_.jsx)(s,{...$,title:U.data.name,placement:`top`,children:(0,_.jsx)(`circle`,{cx:0,cy:0,r:L,fill:`transparent`,pointerEvents:T?`none`:`auto`,onClick:we,style:{cursor:T?`not-allowed`:`pointer`},onMouseEnter:e=>{T||m?.(J(U.parent??V),e)},onMouseLeave:e=>{m?.(null,e)}})}),(0,_.jsx)(`g`,{children:Q.map((e,t)=>{let n=he(e),r=ge(n),i=!!e.children;return(0,_.jsx)(s,{...$,placement:`top`,title:r?(0,_.jsx)(oe,{node:e,valueDecimalCount:b,valueDecimalSep:x,valueThousandsSep:se,valueFormatter:S}):``,children:(0,_.jsx)(`path`,{"data-idx":t,d:me(n)||``,fill:pe(e),fillOpacity:r?i?.75:.5:0,style:{pointerEvents:r&&!T?`auto`:`none`,cursor:i&&!T?`pointer`:`default`,transition:`fill-opacity 0.15s`},onClick:Se,onDoubleClick:Ce,onMouseEnter:e=>{if(T||!r)return;let t=Q[Number(e.currentTarget.getAttribute(`data-idx`))];t&&m?.(J(t),e)},onMouseLeave:e=>{r&&m?.(null,e)}})},`tt-${e.data.id}-${t}`)})}),r&&(0,_.jsx)(`g`,{pointerEvents:`none`,textAnchor:`middle`,fill:Te,children:Q.map((e,t)=>{if(!ye(e))return null;let n=he(e);if(!_e(n))return null;let r=(L+(n.y0+n.y1)/2)*(n.x1-n.x0)*.88,i=ae(e.data.name,r);return i?(0,_.jsx)(`text`,{transform:ve(n),dy:`0.35em`,fontSize:y,children:i},`lbl-${e.data.id}-${t}`):null})}),d&&!k&&(0,_.jsx)(s,{...$,placement:`top`,title:``,children:(0,_.jsx)(`g`,{textAnchor:`middle`,fill:Te,pointerEvents:T?`none`:`auto`,onClick:we,style:{cursor:U!==V&&!T?`pointer`:`default`},children:(0,_.jsx)(`text`,{fontSize:13,dy:`0.35em`,fontWeight:`bold`,children:U.data.name})})})]})})})}var g,_,v,y,b,x,se=e((()=>{g=t(r(),1),d(),c(),p(),_=o(),v=2*Math.PI,y=11,b=y*.5,x=5,h.displayName=`SunburstChart`,h.__docgenInfo={description:``,methods:[],displayName:`SunburstChart`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  id:           string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    SunburstChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`SunburstChartData`}],raw:`SunburstChartData[]`,required:!1}}]}},description:`Hierarchical data tree — root node with optional nested children`},size:{required:!1,tsType:{name:`number`},description:`Width and height of the SVG in pixels (default: 500)`,defaultValue:{value:`500`,computed:!1}},showSegmentLabels:{required:!1,tsType:{name:`boolean`},description:`Show name labels on segments (default: true)`,defaultValue:{value:`true`,computed:!1}},innerRadius:{required:!1,tsType:{name:`number`},description:`Inner hole radius in px — 0 = solid sunburst, > 0 = donut style (default: 0)`,defaultValue:{value:`0`,computed:!1}},sortBy:{required:!1,tsType:{name:`union`,raw:`'value' | 'name'`,elements:[{name:`literal`,value:`'value'`},{name:`literal`,value:`'name'`}]},description:`Sort segments by value (largest first) or by name (default: 'value')`,defaultValue:{value:`"value"`,computed:!1}},chartColors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Custom color palette for top-level segments — falls back to MUI theme palette`},showRootLabel:{required:!1,tsType:{name:`boolean`},description:`Show the root node name in the center (default: true)`,defaultValue:{value:`true`,computed:!1}},onSegmentClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: SunburstSegmentInfo, event: React.MouseEvent<SVGPathElement | SVGCircleElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Node ID — direct access, same as \`data.id\` */
  id:            string;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — \`(value / root.value) * 100\` */
  percentage:    number;
  depth:         number;
  /** Breadcrumb path from root — array of node names */
  path:          string[];
  /** Breadcrumb path from root — array of node IDs (for backend linking) */
  pathIds:       string[];
  childrenCount: number;
  /** Original data node as passed to the chart */
  data:          SunburstChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Node ID — direct access, same as `data.id`"},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0},description:`D3 aggregate value — sum of all descendant leaf values`},{key:`percentage`,value:{name:`number`,required:!0},description:"Percentage of root total — `(value / root.value) * 100`"},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb path from root — array of node names`},{key:`pathIds`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb path from root — array of node IDs (for backend linking)`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:           string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    SunburstChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`SunburstChartData`}],raw:`SunburstChartData[]`,required:!1}}]},required:!0},description:`Original data node as passed to the chart`}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGPathElement | SVGCircleElement>`,elements:[{name:`union`,raw:`SVGPathElement | SVGCircleElement`,elements:[{name:`SVGPathElement`},{name:`SVGCircleElement`}]}]},name:`event`}],return:{name:`void`}}},description:`Fired on single-click on any segment`},onSegmentHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: SunburstSegmentInfo | null, event: React.MouseEvent<SVGPathElement | SVGCircleElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`SunburstSegmentInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Node ID — direct access, same as \`data.id\` */
  id:            string;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — \`(value / root.value) * 100\` */
  percentage:    number;
  depth:         number;
  /** Breadcrumb path from root — array of node names */
  path:          string[];
  /** Breadcrumb path from root — array of node IDs (for backend linking) */
  pathIds:       string[];
  childrenCount: number;
  /** Original data node as passed to the chart */
  data:          SunburstChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Node ID — direct access, same as `data.id`"},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0},description:`D3 aggregate value — sum of all descendant leaf values`},{key:`percentage`,value:{name:`number`,required:!0},description:"Percentage of root total — `(value / root.value) * 100`"},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb path from root — array of node names`},{key:`pathIds`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb path from root — array of node IDs (for backend linking)`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:           string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    SunburstChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`SunburstChartData`}],raw:`SunburstChartData[]`,required:!1}}]},required:!0},description:`Original data node as passed to the chart`}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGPathElement | SVGCircleElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGPathElement | SVGCircleElement>`,elements:[{name:`union`,raw:`SVGPathElement | SVGCircleElement`,elements:[{name:`SVGPathElement`},{name:`SVGCircleElement`}]}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave — `null` on leave. Use for linked-view highlighting."},onZoomChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(zoom: SunburstZoomInfo) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** The node that is now the focus center */
  focusNode: SunburstSegmentInfo;
  /** True when zoom has been reset to root */
  isRoot:    boolean;
}`,signature:{properties:[{key:`focusNode`,value:{name:`signature`,type:`object`,raw:`{
  /** Node ID — direct access, same as \`data.id\` */
  id:            string;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — \`(value / root.value) * 100\` */
  percentage:    number;
  depth:         number;
  /** Breadcrumb path from root — array of node names */
  path:          string[];
  /** Breadcrumb path from root — array of node IDs (for backend linking) */
  pathIds:       string[];
  childrenCount: number;
  /** Original data node as passed to the chart */
  data:          SunburstChartData;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:"Node ID — direct access, same as `data.id`"},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0},description:`D3 aggregate value — sum of all descendant leaf values`},{key:`percentage`,value:{name:`number`,required:!0},description:"Percentage of root total — `(value / root.value) * 100`"},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb path from root — array of node names`},{key:`pathIds`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb path from root — array of node IDs (for backend linking)`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  id:           string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: { fill?: string; textColor?: string; stroke?: string } | null;
  children?:    SunburstChartData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`{ fill?: string; textColor?: string; stroke?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string; textColor?: string; stroke?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`SunburstChartData`}],raw:`SunburstChartData[]`,required:!1}}]},required:!0},description:`Original data node as passed to the chart`}]},required:!0},description:`The node that is now the focus center`},{key:`isRoot`,value:{name:`boolean`,required:!0},description:`True when zoom has been reset to root`}]}},name:`zoom`}],return:{name:`void`}}},description:`Fired when zoom focus changes (Ctrl+Click in/out, Escape reset)`},valueDecimalCount:{required:!1,tsType:{name:`number`},description:`Decimal places for value display in tooltips (default: 0)`,defaultValue:{value:`0`,computed:!1}},valueDecimalSeparator:{required:!1,tsType:{name:`string`},description:`Decimal separator for values (default: '.')`,defaultValue:{value:`"."`,computed:!1}},valueThousandsSeparator:{required:!1,tsType:{name:`string`},description:`Thousands separator for values (default: ',')`,defaultValue:{value:`","`,computed:!1}},valueFormatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => string`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`string`}}},description:"Custom formatter for numeric values in tooltips. Overrides `valueDecimalCount`,\n`valueDecimalSeparator`, and `valueThousandsSeparator`.\nExample: `(v) => \\`${v.toLocaleString('de-DE')} MB\\``\n@since 3.22.0"},zoomable:{required:!1,tsType:{name:`boolean`},description:"Enable Ctrl+Scroll zoom — content outside `size` is clipped (default: false)",defaultValue:{value:`false`,computed:!1}},duration:{required:!1,tsType:{name:`number`},description:`Drill-down/out transition duration in ms — set to 0 to disable animation (default: 750)`,defaultValue:{value:`750`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables all interactions (default: false)`,defaultValue:{value:`false`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Shown when data has no children and no value */
  noData: string;
}`,signature:{properties:[{key:`noData`,value:{name:`string`,required:!0},description:`Shown when data has no children and no value`}]}}],raw:`Partial<SunburstChartTranslation>`},description:`Override any translation string`}}}})),S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V;e((()=>{se(),{fn:S,fireEvent:C}=__STORYBOOK_MODULE_TEST__,w={title:`Components/SunburstChart`,component:h,argTypes:{chartColors:{control:!1},data:{control:!1},disabled:{control:`boolean`},duration:{control:`number`},innerRadius:{control:`number`},showRootLabel:{control:`boolean`},showSegmentLabels:{control:`boolean`},size:{control:`number`},sortBy:{control:`radio`,options:[`value`,`name`]},translation:{control:!1},valueDecimalCount:{control:`number`},valueDecimalSeparator:{control:`text`},valueThousandsSeparator:{control:`text`},zoomable:{control:`boolean`},onSegmentClick:{control:!1},onZoomChange:{control:!1},valueFormatter:{control:!1}},args:{size:500,showSegmentLabels:!0,innerRadius:0,sortBy:`value`,showRootLabel:!0,zoomable:!1,duration:750,disabled:!1,valueDecimalCount:0,valueDecimalSeparator:`.`,valueThousandsSeparator:`,`,onSegmentClick:S(),onSegmentHover:S()},parameters:{controls:{sort:`alpha`}}},T={id:`company`,name:`Company`,children:[{id:`engineering`,name:`Engineering`,children:[{id:`frontend`,name:`Frontend`,value:480},{id:`backend`,name:`Backend`,value:620},{id:`devops`,name:`DevOps`,value:210},{id:`qa`,name:`QA`,value:190}]},{id:`sales`,name:`Sales`,children:[{id:`emea`,name:`EMEA`,value:540},{id:`americas`,name:`Americas`,value:490},{id:`apac`,name:`APAC`,value:220}]},{id:`operations`,name:`Operations`,children:[{id:`hr`,name:`HR`,value:180},{id:`finance`,name:`Finance`,value:240},{id:`legal`,name:`Legal`,value:130},{id:`it`,name:`IT`,value:160}]},{id:`product`,name:`Product`,children:[{id:`design`,name:`Design`,value:290},{id:`research`,name:`Research`,value:200},{id:`management`,name:`Management`,value:150}]},{id:`marketing`,name:`Marketing`,children:[{id:`content`,name:`Content`,value:180},{id:`seo`,name:`SEO`,value:120},{id:`ads`,name:`Ads`,value:310}]}]},E={parameters:{docs:{description:{story:"Full sunburst chart with company budget data. **Click** any segment → fires `onSegmentClick` immediately (no delay). **Ctrl+Click** a segment with children → zoom in. **Ctrl+Double-click** any segment → zoom out one level. **Escape** → reset zoom to root."}}},args:{data:T}},D={parameters:{docs:{description:{story:"`innerRadius={120}` creates a donut-style hole in the center. The center area is clickable — single-click fires `onSegmentClick` for the parent node, double-click zooms out."}}},args:{data:T,innerRadius:120}},O={parameters:{docs:{description:{story:'`sortBy="name"` sorts all segments alphabetically at every depth level.'}}},args:{data:T,sortBy:`name`}},k={parameters:{docs:{description:{story:"`showSegmentLabels={false}` hides all text labels — tooltips (native SVG `<title>`) still work on hover."}}},args:{data:T,showSegmentLabels:!1}},A={parameters:{docs:{description:{story:"`chartColors` overrides the default MUI-theme palette with a custom array. Colors repeat cyclically if there are more top-level segments than colors."}}},args:{data:T,chartColors:[`#1565C0`,`#6A1B9A`,`#00695C`,`#E65100`,`#AD1457`]}},j={parameters:{docs:{description:{story:"`disabled={true}` mutes all interactions (click, double-click) and reduces opacity. Useful for read-only dashboards or loading states."}}},args:{data:T,disabled:!0}},M={parameters:{docs:{description:{story:'When `data` has no `children` and no `value`, the chart renders the `translation.noData` message (default `"No data"`) centered in the SVG instead of an empty circle. Override it via `translation={{ noData: "..." }}`.'}}},args:{data:{id:`root`,name:`Root`},translation:{noData:`Nothing to show yet`}}},N={id:`company`,name:`Company`,children:[{id:`engineering`,name:`Engineering`,colorConfig:{fill:`#1565C0`},children:[{id:`fe`,name:`Frontend`,value:480,colorConfig:{fill:`#1976D2`}},{id:`be`,name:`Backend`,value:620,colorConfig:{fill:`#0D47A1`}},{id:`devops`,name:`DevOps`,value:210,colorConfig:{fill:`#42A5F5`}},{id:`qa`,name:`QA`,value:190,colorConfig:{fill:`#90CAF9`}}]},{id:`sales`,name:`Sales`,colorConfig:{fill:`#6A1B9A`},children:[{id:`emea`,name:`EMEA`,value:540,colorConfig:{fill:`#7B1FA2`}},{id:`americas`,name:`Americas`,value:490,colorConfig:{fill:`#AB47BC`}},{id:`apac`,name:`APAC`,value:220,colorConfig:{fill:`#CE93D8`}}]},{id:`product`,name:`Product`,colorConfig:{fill:`#00695C`},children:[{id:`design`,name:`Design`,value:290,colorConfig:{fill:`#00796B`}},{id:`research`,name:`Research`,value:200,colorConfig:{fill:`#26A69A`}},{id:`strategy`,name:`Strategy`,value:150}]},{id:`ops`,name:`Operations`,children:[{id:`hr`,name:`HR`,value:180},{id:`finance`,name:`Finance`,value:240},{id:`legal`,name:`Legal`,value:130}]}]},P={parameters:{docs:{description:{story:"`colorConfig` in the data — each node can override its fill color independently. Engineering (blues), Sales (purples), Product (teals) use brand colors via `colorConfig: { fill }`. Operations has no `colorConfig` and falls back to the default MUI palette."}}},args:{data:N}},F={id:`root`,name:`Portfolio`,children:[{id:`p1`,name:`Platform`,children:[{id:`p1-a`,name:`Frontend`,children:[{id:`p1-a1`,name:`Web App`,children:[{id:`p1-a1-x`,name:`Dashboard`,value:1200},{id:`p1-a1-y`,name:`Reports`,value:800},{id:`p1-a1-z`,name:`Settings`,value:400}]},{id:`p1-a2`,name:`Mobile`,children:[{id:`p1-a2-x`,name:`iOS`,value:950},{id:`p1-a2-y`,name:`Android`,value:870}]}]},{id:`p1-b`,name:`Backend`,children:[{id:`p1-b1`,name:`API Gateway`,value:1100},{id:`p1-b2`,name:`Auth Service`,value:700},{id:`p1-b3`,name:`Data Service`,value:900}]}]},{id:`p2`,name:`Products`,children:[{id:`p2-a`,name:`Analytics`,children:[{id:`p2-a1`,name:`Realtime`,value:1500},{id:`p2-a2`,name:`Historical`,value:1100}]},{id:`p2-b`,name:`Commerce`,children:[{id:`p2-b1`,name:`Checkout`,value:2e3},{id:`p2-b2`,name:`Catalog`,value:1300},{id:`p2-b3`,name:`Search`,value:900}]},{id:`p2-c`,name:`Messaging`,children:[{id:`p2-c1`,name:`Email`,value:600},{id:`p2-c2`,name:`Push`,value:450},{id:`p2-c3`,name:`In-App`,value:380}]}]},{id:`p3`,name:`Infrastructure`,children:[{id:`p3-a`,name:`Cloud`,children:[{id:`p3-a1`,name:`Compute`,value:2200},{id:`p3-a2`,name:`Storage`,value:1400},{id:`p3-a3`,name:`Network`,value:800}]},{id:`p3-b`,name:`Security`,children:[{id:`p3-b1`,name:`IAM`,value:500},{id:`p3-b2`,name:`Encryption`,value:400},{id:`p3-b3`,name:`Audit`,value:350}]}]}]},I={parameters:{docs:{description:{story:"**5 depth levels — combines Ctrl+Click drill-down with Ctrl+Scroll zoom.** `Ctrl+Click` any ring segment → drill-down into that subtree. `Ctrl+Scroll` → visual zoom (content outside `size` is clipped). `Escape` resets both zoom and drill-down to root. This story auto-runs a Ctrl+Click on the first segment so you land already drilled in."}}},args:{data:F,size:520,sortBy:`value`,zoomable:!0,showSegmentLabels:!0},play:async({canvasElement:e})=>{let t=e.querySelector(`path[data-idx="0"]`);t&&C.click(t,{ctrlKey:!0})}},L={parameters:{docs:{description:{story:"Drill-down (`Ctrl+Click`) and drill-out (`Ctrl+Click` the center, or `Escape`) animate smoothly between focus levels instead of jump-cutting — set via `duration` (ms). This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. Set `duration={0}` to disable the animation entirely."}}},args:{data:F,size:500,duration:2e3}},R={id:`disk`,name:`Macintosh HD — 1 TB`,children:[{id:`users`,name:`Users`,children:[{id:`documents`,name:`Documents`,value:42},{id:`desktop`,name:`Desktop`,value:8},{id:`downloads`,name:`Downloads`,value:65},{id:`movies`,name:`Movies`,value:210},{id:`photos`,name:`Photos`,value:156},{id:`music`,name:`Music`,value:38}]},{id:`applications`,name:`Applications`,children:[{id:`xcode`,name:`Xcode`,value:48},{id:`adobe`,name:`Adobe CC`,value:32},{id:`docker`,name:`Docker Desktop`,value:12},{id:`browsers`,name:`Browsers`,value:6},{id:`other-apps`,name:`Other Apps`,value:28}]},{id:`system`,name:`System`,children:[{id:`macos`,name:`macOS`,value:18},{id:`caches`,name:`Caches`,value:24},{id:`logs`,name:`System Logs`,value:4}]},{id:`vms`,name:`Virtual Machines`,children:[{id:`ubuntu-vm`,name:`Ubuntu VM`,value:80},{id:`windows-vm`,name:`Windows VM`,value:120}]}]},z={parameters:{docs:{description:{story:"`valueFormatter` replaces the built-in decimal/separator formatting in tooltips — here disk-usage values (raw bytes) are converted to a human-readable `GB` string."}}},args:{valueFormatter:e=>`${(e/1024).toFixed(1)} GB`,valueDecimalCount:0,showSegmentLabels:!0}},B={parameters:{docs:{description:{story:"**Real-world use case: a disk-usage analyzer.** Values are GB — `Movies` and `Windows VM` immediately stand out as the biggest space hogs. This is the classic sunburst use case (think DaisyDisk / WizTree) — proportional space at a glance, with `Ctrl+Click` to drill into any folder."}}},args:{data:R,size:500,sortBy:`value`,zoomable:!0,valueDecimalCount:0,showSegmentLabels:!0}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Full sunburst chart with company budget data. ' + '**Click** any segment → fires \`onSegmentClick\` immediately (no delay). ' + '**Ctrl+Click** a segment with children → zoom in. ' + '**Ctrl+Double-click** any segment → zoom out one level. ' + '**Escape** → reset zoom to root.'
      }
    }
  },
  args: {
    data: BUDGET_DATA
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`innerRadius={120}\` creates a donut-style hole in the center. ' + 'The center area is clickable — single-click fires \`onSegmentClick\` for the parent node, ' + 'double-click zooms out.'
      }
    }
  },
  args: {
    data: BUDGET_DATA,
    innerRadius: 120
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`sortBy="name"\` sorts all segments alphabetically at every depth level.'
      }
    }
  },
  args: {
    data: BUDGET_DATA,
    sortBy: "name"
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showSegmentLabels={false}\` hides all text labels — tooltips (native SVG \`<title>\`) ' + 'still work on hover.'
      }
    }
  },
  args: {
    data: BUDGET_DATA,
    showSegmentLabels: false
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`chartColors\` overrides the default MUI-theme palette with a custom array. ' + 'Colors repeat cyclically if there are more top-level segments than colors.'
      }
    }
  },
  args: {
    data: BUDGET_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C", "#E65100", "#AD1457"]
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`disabled={true}\` mutes all interactions (click, double-click) and reduces opacity. ' + 'Useful for read-only dashboards or loading states.'
      }
    }
  },
  args: {
    data: BUDGET_DATA,
    disabled: true
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'When \`data\` has no \`children\` and no \`value\`, the chart renders the \`translation.noData\` ' + 'message (default \`"No data"\`) centered in the SVG instead of an empty circle. ' + 'Override it via \`translation={{ noData: "..." }}\`.'
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
        story: '\`colorConfig\` in the data — each node can override its fill color independently. ' + 'Engineering (blues), Sales (purples), Product (teals) use brand colors via \`colorConfig: { fill }\`. ' + 'Operations has no \`colorConfig\` and falls back to the default MUI palette.'
      }
    }
  },
  args: {
    data: COLOR_CONFIG_DATA
  }
}`,...P.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**5 depth levels — combines Ctrl+Click drill-down with Ctrl+Scroll zoom.** ' + '\`Ctrl+Click\` any ring segment → drill-down into that subtree. ' + '\`Ctrl+Scroll\` → visual zoom (content outside \`size\` is clipped). ' + '\`Escape\` resets both zoom and drill-down to root. ' + 'This story auto-runs a Ctrl+Click on the first segment so you land already drilled in.'
      }
    }
  },
  args: {
    data: DEEP_DATA,
    size: 520,
    sortBy: "value",
    zoomable: true,
    showSegmentLabels: true
  },
  play: async ({
    canvasElement
  }) => {
    const firstSegment = canvasElement.querySelector<SVGPathElement>('path[data-idx="0"]');
    if (firstSegment) fireEvent.click(firstSegment, {
      ctrlKey: true
    });
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Drill-down (\`Ctrl+Click\`) and drill-out (\`Ctrl+Click\` the center, or \`Escape\`) animate smoothly ' + 'between focus levels instead of jump-cutting — set via \`duration\` (ms). ' + 'This story slows it down to 2000ms so the effect is easy to see; the default is 750ms. ' + 'Set \`duration={0}\` to disable the animation entirely.'
      }
    }
  },
  args: {
    data: DEEP_DATA,
    size: 500,
    duration: 2000
  }
}`,...L.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`valueFormatter\` replaces the built-in decimal/separator formatting in tooltips — " + "here disk-usage values (raw bytes) are converted to a human-readable \`GB\` string."
      }
    }
  },
  args: {
    valueFormatter: v => \`\${(v / 1024).toFixed(1)} GB\`,
    valueDecimalCount: 0,
    showSegmentLabels: true
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a disk-usage analyzer.** ' + 'Values are GB — \`Movies\` and \`Windows VM\` immediately stand out as the biggest space hogs. ' + 'This is the classic sunburst use case (think DaisyDisk / WizTree) — proportional space at a glance, ' + 'with \`Ctrl+Click\` to drill into any folder.'
      }
    }
  },
  args: {
    data: DISK_USAGE_DATA,
    size: 500,
    sortBy: "value",
    zoomable: true,
    valueDecimalCount: 0,
    showSegmentLabels: true
  }
}`,...B.parameters?.docs?.source}}},V=[`Default`,`DonutStyle`,`SortedByName`,`NoLabels`,`CustomPalette`,`Disabled`,`EmptyData`,`WithColorConfig`,`DeepHierarchy`,`AnimatedTransitions`,`WithValueFormatter`,`DiskUsageBreakdown`]}))();export{L as AnimatedTransitions,A as CustomPalette,I as DeepHierarchy,E as Default,j as Disabled,B as DiskUsageBreakdown,D as DonutStyle,M as EmptyData,k as NoLabels,O as SortedByName,P as WithColorConfig,z as WithValueFormatter,V as __namedExportsOrder,w as default};