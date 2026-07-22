import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,U as i,Y as a,Z as o,c as s,t as c}from"./iframe-Bb8mcAY9.js";import{C as l,O as ee,b as te,m as ne,p as re,s as ie,t as u,w as ae,x as oe,y as d}from"./src-BuH4pCkW.js";var f,p=e((()=>{f={noData:`No data`}}));function se(e,t,n){return e.length*n*_<=t?e:t>=3*n*_+n*2?`…`:``}function m({data:e,size:t=600,padding:r=3,sortBy:o=`value`,showLabels:c=!0,showAllLabels:u=!1,labelFontSize:p=13,innerLabelFontSize:m=9,labelColor:_,chartColors:v,depthColorStart:y,depthColorEnd:b,background:x,duration:S=750,zoomable:C=!1,disabled:w=!1,onCircleClick:T,onCircleHover:E,onZoomChange:D,valueFormatter:O,translation:k}){let A=a(),j={...f,...k},M=!e.children?.length&&!e.value,N=[A.palette.primary.main,A.palette.secondary.main,A.palette.error.main,A.palette.warning.main,A.palette.success.main,A.palette.info.main],P=_||A.palette.text.primary,F=x||A.palette.background.default,I=A.typography.fontFamily,L=(0,h.useMemo)(()=>{let n=ne(e).sum(e=>e.value??0);return o===`value`?n.sort((e,t)=>(t.value??0)-(e.value??0)):n.sort((e,t)=>String(e.data.name).localeCompare(String(t.data.name),void 0,{numeric:!0,sensitivity:`base`})),re().size([t,t]).padding(r)(n)},[e,t,r,o]),R=L.descendants(),z=(0,h.useMemo)(()=>ee(R,e=>e.depth)??0,[R]),B=!!(y&&b),V=(0,h.useMemo)(()=>B?ie(te(y,b)).domain([0,Math.max(1,z)]):null,[B,y,b,z]),H=v&&v.length>0?v:N,ce=(0,h.useCallback)(e=>e.data.colorConfig?.fill?e.data.colorConfig.fill:B&&V?e.children?V(e.depth):A.palette.background.paper:H[e.depth%H.length],[B,V,H,A]),[U,W]=(0,h.useState)(1),le=(0,h.useCallback)(e=>{if(!C||w||!e.ctrlKey)return;e.preventDefault();let t=e.deltaY<0?1.15:1/1.15;W(e=>Math.max(.25,Math.min(8,e*t)))},[C,w]);(0,h.useLayoutEffect)(()=>{if(!C)return;let e=e=>{e.key===`Escape`&&W(1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[C]);let ue=(0,h.useMemo)(()=>{let e=`${-t/2} ${-t/2} ${t} ${t}`;if(U===1)return e;let n=t/U,r=(t-n)/2;return`${-t/2+r} ${-t/2+r} ${n} ${n}`},[t,U]),de=(0,h.useCallback)(e=>{let t=e.value??0,n=L.value??0;return{id:e.data.id??null,name:e.data.name,value:t||null,percentage:n>0?Math.round(t/n*1e4)/100:0,depth:e.depth,path:e.ancestors().map(e=>e.data.name).reverse(),childrenCount:e.children?.length??0,data:e.data}},[L]),G=(0,h.useRef)(null),K=(0,h.useRef)([L.x,L.y,L.r*2]),q=(0,h.useRef)(L),[J,fe]=(0,h.useState)(L),Y=(0,h.useCallback)(e=>{q.current=e,fe(e)},[]),[pe,me]=(0,h.useState)(L);pe!==L&&(me(L),Y(L),q.current=L);let X=(0,h.useCallback)(e=>{let n=G.current;if(!n)return;K.current=e;let r=t/e[2],i=q.current,a=n.querySelectorAll(`g[data-role='nodes'] > g`),o=n.querySelectorAll(`g[data-role='nodes'] > g > circle`);for(let t=0;t<R.length;t++){let n=R[t],i=a[t];i&&i.setAttribute(`transform`,`translate(${(n.x-e[0])*r},${(n.y-e[1])*r})`);let s=t-1;s>=0&&o[s]&&o[s].setAttribute(`r`,String(n.r*r))}if(c){let t=n.querySelectorAll(`g[data-role='labels'] > text`);for(let n=0;n<R.length;n++){let i=R[n],a=t[n];a&&(a.setAttribute(`transform`,`translate(${(i.x-e[0])*r},${(i.y-e[1])*r})`),a.setAttribute(`font-weight`,i.children?`bold`:`normal`))}}if(u){let t=n.querySelectorAll(`g[data-role='inner-labels'] > text`);for(let n=0;n<R.length;n++){let a=R[n],o=t[n];if(!o)continue;let s=a.r*r,c=s*1.6,l=i===L?a!==L:a.ancestors().includes(i),ee=a.parent===i;if(l&&!ee&&s>=14){let t=se(a.data.name,c,m);t?(o.textContent=t,o.setAttribute(`transform`,`translate(${(a.x-e[0])*r},${(a.y-e[1])*r})`),o.setAttribute(`font-weight`,a.children?`bold`:`normal`),o.style.display=`inline`):o.style.display=`none`}else o.style.display=`none`}}},[R,t,c,u,m,L]);(0,h.useLayoutEffect)(()=>{X([J.x,J.y,J.r*2])},[L,t,J,X]);let Z=(0,h.useCallback)((e,t)=>{let n=G.current;if(!n)return;let r=J,i=K.current,a=[e.x,e.y,e.r*2];Y(e),ae(n).transition().duration(t).ease(d).tween(`zoom`,()=>{let e=oe(i,a);return t=>X(e(t))}),l(n.querySelectorAll(`g[data-role='labels'] > text`)).transition().duration(t).ease(d).style(`fill-opacity`,(t,n)=>+(R[n].parent===e)).on(`start`,function(t,n){R[n].parent===e&&(this.style.display=`inline`)}).on(`end`,function(t,n){R[n].parent!==e&&(this.style.display=`none`)}),D?.({previousName:r.data.name,currentName:e.data.name,currentDepth:e.depth,isRoot:e===L})},[J,R,L,X,D,Y]),Q=(0,h.useRef)(null),he=e=>{Q.current&&=(clearTimeout(Q.current),null),Q.current=setTimeout(()=>{e(),Q.current=null},250)},$=()=>{Q.current&&=(clearTimeout(Q.current),null)},ge=(0,h.useRef)(Z);(0,h.useEffect)(()=>{ge.current=Z},[Z]),(0,h.useLayoutEffect)(()=>{if(w)return;let e=e=>{e.key===`Escape`&&($(),ge.current(L,S))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[w,L,S]);let _e=e=>{if(w||!(e.ctrlKey||e.metaKey))return;$(),e.preventDefault();let t=J.parent??L;t!==J&&Z(t,e.altKey?Math.max(250,S*10):S)},ve={followCursor:!0,enterDelay:50,enterNextDelay:0,disableHoverListener:w,slotProps:{tooltip:{sx:{maxWidth:220}}}};return(0,g.jsxs)(n,{sx:{display:`inline-flex`,position:`relative`,opacity:w?.5:1,cursor:w?`not-allowed`:`default`,userSelect:`none`},children:[(0,g.jsxs)(`svg`,{ref:G,width:t,height:t,viewBox:ue,onWheel:le,style:{display:`block`,background:F,fontFamily:I??`sans-serif`,overflow:C&&U>1?`hidden`:`visible`},role:`img`,"aria-label":e.name,onDoubleClick:_e,children:[M&&(0,g.jsx)(`text`,{textAnchor:`middle`,dy:`0.35em`,fontSize:13,fill:A.palette.text.secondary,children:j.noData}),(0,g.jsx)(`g`,{"data-role":`nodes`,children:R.map((e,r)=>{let a=de(e),o=(0,g.jsxs)(n,{sx:{py:.5,minWidth:160},children:[(0,g.jsx)(i,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`,fontSize:`0.8rem`},children:e.data.name}),(e.value??0)>0&&(0,g.jsxs)(n,{sx:{mt:.75,borderTop:`1px solid rgba(255,255,255,0.2)`,pt:.75},children:[(0,g.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,g.jsx)(i,{variant:`caption`,sx:{opacity:.6},children:`Value`}),(0,g.jsx)(i,{variant:`caption`,children:O?O(e.value??0):(e.value??0).toLocaleString()})]}),(0,g.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,g.jsx)(i,{variant:`caption`,sx:{opacity:.6},children:`Share`}),(0,g.jsxs)(i,{variant:`caption`,children:[a.percentage,`%`]})]}),e.children&&(0,g.jsxs)(n,{sx:{display:`flex`,justifyContent:`space-between`,gap:2},children:[(0,g.jsx)(i,{variant:`caption`,sx:{opacity:.6},children:`Children`}),(0,g.jsx)(i,{variant:`caption`,children:e.children.length})]})]})]});return(0,g.jsx)(`g`,{transform:`translate(${e.x-t/2},${e.y-t/2})`,children:r===0?null:(0,g.jsx)(s,{...ve,title:o,children:(0,g.jsx)(`circle`,{r:e.r,fill:ce(e),stroke:e.data.colorConfig?.stroke??A.palette.background.paper,strokeWidth:.75,style:{cursor:w?`not-allowed`:e.children?`pointer`:`default`,transition:`stroke-width 0.1s`},onMouseEnter:e=>{w||(e.currentTarget.style.strokeWidth=`2`,E?.(a,e))},onMouseLeave:e=>{e.currentTarget.style.strokeWidth=`0.75`,E?.(null,e)},onClick:t=>{if(!w){if(t.ctrlKey||t.metaKey){if(e.children){let n=t.altKey?Math.max(250,S*10):S;he(()=>Z(e,n))}return}T?.(a,t)}},onDoubleClick:e=>{if(!w&&(e.ctrlKey||e.metaKey)){$(),e.preventDefault(),e.stopPropagation();let t=J.parent??L;t!==J&&Z(t,e.altKey?Math.max(250,S*10):S)}}})})},`n-${r}`)})}),c&&(0,g.jsx)(`g`,{"data-role":`labels`,textAnchor:`middle`,dominantBaseline:`middle`,pointerEvents:`none`,fontSize:p,fill:P,children:R.map((e,n)=>(0,g.jsx)(`text`,{transform:`translate(${e.x-t/2},${e.y-t/2})`,style:{display:e.parent===L?`inline`:`none`,fillOpacity:+(e.parent===L)},children:e.data.name},`lbl-${n}`))}),u&&(0,g.jsx)(`g`,{"data-role":`inner-labels`,textAnchor:`middle`,dominantBaseline:`middle`,pointerEvents:`none`,fontSize:m,fill:P,children:R.map((e,n)=>(0,g.jsx)(`text`,{transform:`translate(${e.x-t/2},${e.y-t/2})`,style:{display:`none`}},`inner-lbl-${n}`))})]}),J!==L&&!w&&(0,g.jsx)(n,{sx:{position:`absolute`,bottom:6,left:0,right:0,display:`flex`,justifyContent:`center`,pointerEvents:`none`},children:(0,g.jsxs)(i,{variant:`caption`,sx:{bgcolor:`action.hover`,borderRadius:1,px:1,py:.25,color:`text.secondary`,fontSize:`0.7rem`},children:[J.ancestors().map(e=>e.data.name).reverse().join(` › `),` · Ctrl / Cmd ⌘+DblClick to zoom out · Escape to reset`]})})]})}var h,g,_,v=e((()=>{h=t(r(),1),u(),c(),p(),g=o(),_=.56,m.displayName=`CirclePackingChart`,m.__docgenInfo={description:``,methods:[],displayName:`CirclePackingChart`,props:{data:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  /** Optional ID for backend linking */
  id?:          string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: NodeColorConfig | null;
  children?:    CirclePackingData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1},description:`Optional ID for backend linking`},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`NodeColorConfig | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Fill / background color of the circle or arc segment */
  fill?:      string;
  /** Label text color (overrides chart-level \`labelColor\`) */
  textColor?: string;
  /** Stroke / border color */
  stroke?:    string;
}`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1},description:`Fill / background color of the circle or arc segment`},{key:`textColor`,value:{name:`string`,required:!1},description:"Label text color (overrides chart-level `labelColor`)"},{key:`stroke`,value:{name:`string`,required:!1},description:`Stroke / border color`}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`CirclePackingData`}],raw:`CirclePackingData[]`,required:!1}}]}},description:`Root node of the hierarchy`},size:{required:!1,tsType:{name:`number`},description:`Width and height of the SVG in pixels — always square (default: 600)`,defaultValue:{value:`600`,computed:!1}},padding:{required:!1,tsType:{name:`number`},description:`Padding between nested circles in px (default: 3)`,defaultValue:{value:`3`,computed:!1}},sortBy:{required:!1,tsType:{name:`union`,raw:`'value' | 'name'`,elements:[{name:`literal`,value:`'value'`},{name:`literal`,value:`'name'`}]},description:`Sort children by value or alphabetically (default: 'value')`,defaultValue:{value:`"value"`,computed:!1}},showLabels:{required:!1,tsType:{name:`boolean`},description:`Show name labels on the outer (focused) ring circles (default: true)`,defaultValue:{value:`true`,computed:!1}},showAllLabels:{required:!1,tsType:{name:`boolean`},description:`Show labels on ALL visible inner circles too — truncated with "…" when the
text doesn't fit inside the circle. Outer-ring labels stay bold; inner labels
use a smaller font. (default: false)`,defaultValue:{value:`false`,computed:!1}},labelFontSize:{required:!1,tsType:{name:`number`},description:`Outer-ring label font size in px (default: 13, bold)`,defaultValue:{value:`13`,computed:!1}},innerLabelFontSize:{required:!1,tsType:{name:`number`},description:"Inner circle label font size in px — used when `showAllLabels` is true (default: 9)",defaultValue:{value:`9`,computed:!1}},labelColor:{required:!1,tsType:{name:`string`},description:"Label text color — defaults to `theme.palette.text.primary`"},chartColors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Custom depth-based color palette — overrides the default MUI theme palette.
colors[depth % length] per node. Falls back to MUI palette when not set.`},depthColorStart:{required:!1,tsType:{name:`string`},description:"HCL gradient start color — when set together with `depthColorEnd`,\noverrides `chartColors` and the MUI palette with a smooth gradient."},depthColorEnd:{required:!1,tsType:{name:`string`},description:"HCL gradient end color — see `depthColorStart`."},background:{required:!1,tsType:{name:`string`},description:"SVG background fill. Default: `theme.palette.background.default`"},duration:{required:!1,tsType:{name:`number`},description:`Zoom animation duration in ms (default: 750).
Alt+Ctrl / Alt+Cmd+Click uses 10× for slow-motion demos.`,defaultValue:{value:`750`,computed:!1}},zoomable:{required:!1,tsType:{name:`boolean`},description:"Enable Ctrl / Cmd ⌘ + Scroll visual zoom — clips content at `size` boundary (default: false)",defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables all interactions (default: false)`,defaultValue:{value:`false`,computed:!1}},onCircleClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: CirclePackingNodeInfo, event: React.MouseEvent<SVGCircleElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Node id — same as data.id when provided */
  id:            string | null;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — (value / root.value) * 100 */
  percentage:    number;
  depth:         number;
  /** Breadcrumb from root to this node — array of names */
  path:          string[];
  childrenCount: number;
  data:          CirclePackingData;
}`,signature:{properties:[{key:`id`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0},description:`Node id — same as data.id when provided`},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0},description:`D3 aggregate value — sum of all descendant leaf values`},{key:`percentage`,value:{name:`number`,required:!0},description:`Percentage of root total — (value / root.value) * 100`},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root to this node — array of names`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  /** Optional ID for backend linking */
  id?:          string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: NodeColorConfig | null;
  children?:    CirclePackingData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1},description:`Optional ID for backend linking`},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`NodeColorConfig | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Fill / background color of the circle or arc segment */
  fill?:      string;
  /** Label text color (overrides chart-level \`labelColor\`) */
  textColor?: string;
  /** Stroke / border color */
  stroke?:    string;
}`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1},description:`Fill / background color of the circle or arc segment`},{key:`textColor`,value:{name:`string`,required:!1},description:"Label text color (overrides chart-level `labelColor`)"},{key:`stroke`,value:{name:`string`,required:!1},description:`Stroke / border color`}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`CirclePackingData`}],raw:`CirclePackingData[]`,required:!1}}]},required:!0}}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGCircleElement>`,elements:[{name:`SVGCircleElement`}]},name:`event`}],return:{name:`void`}}},description:`Fires on regular click — immediately, no delay`},onCircleHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: CirclePackingNodeInfo | null, event: React.MouseEvent<SVGCircleElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`CirclePackingNodeInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Node id — same as data.id when provided */
  id:            string | null;
  name:          string;
  /** D3 aggregate value — sum of all descendant leaf values */
  value:         number | null;
  /** Percentage of root total — (value / root.value) * 100 */
  percentage:    number;
  depth:         number;
  /** Breadcrumb from root to this node — array of names */
  path:          string[];
  childrenCount: number;
  data:          CirclePackingData;
}`,signature:{properties:[{key:`id`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0},description:`Node id — same as data.id when provided`},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}],required:!0},description:`D3 aggregate value — sum of all descendant leaf values`},{key:`percentage`,value:{name:`number`,required:!0},description:`Percentage of root total — (value / root.value) * 100`},{key:`depth`,value:{name:`number`,required:!0}},{key:`path`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0},description:`Breadcrumb from root to this node — array of names`},{key:`childrenCount`,value:{name:`number`,required:!0}},{key:`data`,value:{name:`signature`,type:`object`,raw:`{
  /** Optional ID for backend linking */
  id?:          string;
  name:         string;
  value?:       number;
  /** Per-node color overrides — null / omit = use chart default palette */
  colorConfig?: NodeColorConfig | null;
  children?:    CirclePackingData[];
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!1},description:`Optional ID for backend linking`},{key:`name`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!1}},{key:`colorConfig`,value:{name:`union`,raw:`NodeColorConfig | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Fill / background color of the circle or arc segment */
  fill?:      string;
  /** Label text color (overrides chart-level \`labelColor\`) */
  textColor?: string;
  /** Stroke / border color */
  stroke?:    string;
}`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1},description:`Fill / background color of the circle or arc segment`},{key:`textColor`,value:{name:`string`,required:!1},description:"Label text color (overrides chart-level `labelColor`)"},{key:`stroke`,value:{name:`string`,required:!1},description:`Stroke / border color`}]}},{name:`null`}],required:!1},description:`Per-node color overrides — null / omit = use chart default palette`},{key:`children`,value:{name:`Array`,elements:[{name:`CirclePackingData`}],raw:`CirclePackingData[]`,required:!1}}]},required:!0}}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGCircleElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGCircleElement>`,elements:[{name:`SVGCircleElement`}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave a circle — `null` on leave. Use for linked-view highlighting."},onZoomChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(zoom: CirclePackingZoomInfo) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  previousName:  string;
  currentName:   string;
  currentDepth:  number;
  /** true when zoomed back to root */
  isRoot:        boolean;
}`,signature:{properties:[{key:`previousName`,value:{name:`string`,required:!0}},{key:`currentName`,value:{name:`string`,required:!0}},{key:`currentDepth`,value:{name:`number`,required:!0}},{key:`isRoot`,value:{name:`boolean`,required:!0},description:`true when zoomed back to root`}]}},name:`zoom`}],return:{name:`void`}}},description:`Fires when the zoom focus changes`},valueFormatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => string`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`string`}}},description:"Custom formatter for numeric node values shown in tooltips.\nWhen omitted, values are formatted with `toLocaleString()`.\nExample: `(v) => \\`${v.toLocaleString('de-DE')} MB\\``\n@since 3.22.0"},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  noData: string;
}`,signature:{properties:[{key:`noData`,value:{name:`string`,required:!0}}]}}],raw:`Partial<CirclePackingTranslation>`},description:`Override translation strings`}}}})),y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I;e((()=>{v(),{fn:y,fireEvent:b}=__STORYBOOK_MODULE_TEST__,x={title:`Components/CirclePackingChart`,component:m,argTypes:{background:{control:`color`},chartColors:{control:!1},data:{control:!1},depthColorEnd:{control:`color`},depthColorStart:{control:`color`},disabled:{control:`boolean`},duration:{control:`number`},innerLabelFontSize:{control:`number`},labelColor:{control:`color`},labelFontSize:{control:`number`},padding:{control:`number`},showAllLabels:{control:`boolean`},showLabels:{control:`boolean`},size:{control:`number`},sortBy:{control:`radio`,options:[`value`,`name`]},translation:{control:!1},zoomable:{control:`boolean`},onCircleClick:{control:!1},onZoomChange:{control:!1},valueFormatter:{control:!1}},args:{background:``,depthColorEnd:``,depthColorStart:``,disabled:!1,duration:750,innerLabelFontSize:9,labelColor:``,labelFontSize:13,padding:3,showAllLabels:!1,showLabels:!0,size:600,sortBy:`value`,zoomable:!1,onCircleClick:y(),onCircleHover:y(),onZoomChange:y()},parameters:{controls:{sort:`alpha`}}},S={id:`root`,name:`Global Software Market`,children:[{id:`cloud`,name:`Cloud & Infrastructure`,children:[{id:`aws`,name:`AWS`,value:90757},{id:`azure`,name:`Azure`,value:75e3},{id:`gcp`,name:`Google Cloud`,value:33e3},{id:`ibm`,name:`IBM Cloud`,value:21200},{id:`oracle`,name:`Oracle Cloud`,value:19800}]},{id:`saas`,name:`SaaS Platforms`,children:[{id:`salesforce`,name:`Salesforce`,value:34900},{id:`sap`,name:`SAP`,value:31600},{id:`workday`,name:`Workday`,value:7300},{id:`servicenow`,name:`ServiceNow`,value:8970},{id:`adobe`,name:`Adobe`,value:19400},{id:`hubspot`,name:`HubSpot`,value:2170}]},{id:`collab`,name:`Collaboration & Productivity`,children:[{id:`msoffice`,name:`Microsoft 365`,value:63e3},{id:`google-w`,name:`Google Workspace`,value:12e3},{id:`slack`,name:`Slack`,value:1500},{id:`zoom`,name:`Zoom`,value:4600},{id:`atlassian`,name:`Atlassian`,value:3570},{id:`notion`,name:`Notion`,value:800}]},{id:`dev`,name:`Developer Tools`,children:[{id:`github`,name:`GitHub`,value:2e3},{id:`gitlab`,name:`GitLab`,value:580},{id:`jfrog`,name:`JFrog`,value:350},{id:`hashicorp`,name:`HashiCorp`,value:520},{id:`datadog`,name:`Datadog`,value:2100},{id:`pagerduty`,name:`PagerDuty`,value:400}]},{id:`security`,name:`Cybersecurity`,children:[{id:`crowdstrike`,name:`CrowdStrike`,value:3100},{id:`palo-alto`,name:`Palo Alto`,value:7800},{id:`fortinet`,name:`Fortinet`,value:5300},{id:`zscaler`,name:`Zscaler`,value:1900},{id:`okta`,name:`Okta`,value:2260}]},{id:`data`,name:`Data & Analytics`,children:[{id:`snowflake`,name:`Snowflake`,value:2800},{id:`databricks`,name:`Databricks`,value:1600},{id:`tableau`,name:`Tableau`,value:2e3},{id:`palantir`,name:`Palantir`,value:2230},{id:`dbt`,name:`dbt Labs`,value:300}]}]},C={id:`oss`,name:`Open Source Ecosystem`,children:[{id:`frontend`,name:`Frontend`,children:[{id:`react-eco`,name:`React Ecosystem`,children:[{id:`react`,name:`React`,value:48e3},{id:`next`,name:`Next.js`,value:28e3},{id:`remix`,name:`Remix`,value:5e3},{id:`gatsby`,name:`Gatsby`,value:4e3}]},{id:`vue-eco`,name:`Vue Ecosystem`,children:[{id:`vue`,name:`Vue`,value:22e3},{id:`nuxt`,name:`Nuxt`,value:12e3}]},{id:`build`,name:`Build Tools`,children:[{id:`vite`,name:`Vite`,value:18e3},{id:`webpack`,name:`Webpack`,value:14e3},{id:`esbuild`,name:`esbuild`,value:9e3},{id:`turbo`,name:`Turborepo`,value:5e3}]}]},{id:`backend`,name:`Backend`,children:[{id:`node-fw`,name:`Node.js Frameworks`,children:[{id:`express`,name:`Express`,value:25e3},{id:`fastify`,name:`Fastify`,value:8e3},{id:`nestjs`,name:`NestJS`,value:12e3}]},{id:`go-fw`,name:`Go Frameworks`,children:[{id:`gin`,name:`Gin`,value:7e3},{id:`echo`,name:`Echo`,value:4500},{id:`fiber`,name:`Fiber`,value:5200}]},{id:`py-fw`,name:`Python Frameworks`,children:[{id:`fastapi`,name:`FastAPI`,value:11e3},{id:`django`,name:`Django`,value:9e3},{id:`flask`,name:`Flask`,value:7500}]}]},{id:`infra-oss`,name:`Infrastructure`,children:[{id:`k8s`,name:`Kubernetes`,value:35e3},{id:`docker`,name:`Docker`,value:22e3},{id:`terraform`,name:`Terraform`,value:12e3},{id:`prometheus`,name:`Prometheus`,value:9e3},{id:`grafana`,name:`Grafana`,value:8500}]}]},w={parameters:{docs:{description:{story:"**Global Software Market** — annual revenue in $M by category. `Ctrl / Cmd ⌘+Click` any circle with children → animated zoom in. `Ctrl / Cmd ⌘+Double-click` → zoom out one level. `Escape` → reset to root. Regular click fires `onCircleClick` with name, value, percentage, and path. This story auto-runs a Ctrl+Click on the first eligible circle so you see the zoom animation."}}},args:{data:S},play:async({canvasElement:e})=>{let t=e.querySelector(`circle[style*="cursor: pointer"]`);t&&b.click(t,{ctrlKey:!0})}},T={parameters:{docs:{description:{story:`**Open-Source Ecosystem** — 4 depth levels, npm weekly downloads in thousands. Shows how D3 circle packing handles deep hierarchies with the animated zoom.`}}},args:{data:C,size:650}},E={parameters:{docs:{description:{story:"`chartColors` overrides the default MUI theme palette with a custom per-depth color array."}}},args:{data:S,chartColors:[`#1A237E`,`#1565C0`,`#0288D1`,`#00ACC1`,`#00897B`,`#43A047`],background:`#0D1B2A`,labelColor:`#FFFFFF`}},D={parameters:{docs:{description:{story:'`depthColorStart` + `depthColorEnd` enable HCL gradient mode — perceptually uniform color progression across depth levels. Only circles **with children** participate in the gradient (leaf circles stay background-colored so labels on top stay readable) — a deeper hierarchy like this one shows the progression much more clearly than a shallow, mostly-leaves dataset would. A larger `padding` also helps: it widens the colored "ring" each parent circle shows around its children.'}}},args:{data:C,size:650,padding:8,depthColorStart:`hsl(195, 100%, 80%)`,depthColorEnd:`hsl(265, 75%, 35%)`,background:`#F8F9FA`}},O={id:`company`,name:`Company`,children:[{id:`engineering`,name:`Engineering`,colorConfig:{fill:`#1565C0`},children:[{id:`fe`,name:`Frontend`,value:480,colorConfig:{fill:`#1976D2`}},{id:`be`,name:`Backend`,value:620,colorConfig:{fill:`#0D47A1`}},{id:`devops`,name:`DevOps`,value:210,colorConfig:{fill:`#42A5F5`}},{id:`mobile`,name:`Mobile`,value:340,colorConfig:{fill:`#90CAF9`}}]},{id:`sales`,name:`Sales`,colorConfig:{fill:`#6A1B9A`},children:[{id:`emea`,name:`EMEA`,value:540,colorConfig:{fill:`#7B1FA2`}},{id:`amer`,name:`Americas`,value:490,colorConfig:{fill:`#AB47BC`}},{id:`apac`,name:`APAC`,value:220,colorConfig:{fill:`#CE93D8`}},{id:`partner`,name:`Partners`,value:180,colorConfig:{fill:`#E1BEE7`}}]},{id:`product`,name:`Product`,colorConfig:{fill:`#00695C`},children:[{id:`design`,name:`Design`,value:290,colorConfig:{fill:`#00796B`}},{id:`research`,name:`Research`,value:200,colorConfig:{fill:`#26A69A`}},{id:`strategy`,name:`Strategy`,value:150,colorConfig:{fill:`#80CBC4`}}]},{id:`ops`,name:`Operations`,children:[{id:`hr`,name:`HR`,value:180},{id:`finance`,name:`Finance`,value:240},{id:`legal`,name:`Legal`,value:130},{id:`it`,name:`IT`,value:160}]},{id:`marketing`,name:`Marketing`,colorConfig:{fill:`#E65100`},children:[{id:`content`,name:`Content`,value:180,colorConfig:{fill:`#EF6C00`}},{id:`seo`,name:`SEO`,value:120,colorConfig:{fill:`#FB8C00`}},{id:`ads`,name:`Ads`,value:310,colorConfig:{fill:`#FFA726`}}]}]},k={parameters:{docs:{description:{story:'`colorConfig: { fill }` per node in the data — each department and its sub-items use brand colors. "Operations" has no `colorConfig` and falls back to the default MUI palette. This works alongside `showAllLabels` to show a richly colored hierarchy.'}}},args:{data:O,showAllLabels:!0,size:620}},A={parameters:{docs:{description:{story:"`showAllLabels={true}` shows labels on ALL visible inner circles — truncated with `…` if the text doesn't fit inside the circle. Outer-ring labels stay **bold** and larger. Inner labels use `innerLabelFontSize` (default 9px). Labels disappear automatically for circles that are too small."}}},args:{data:S,showAllLabels:!0,size:650}},j={parameters:{docs:{description:{story:"`disabled={true}` mutes all interactions and reduces opacity."}}},args:{data:S,disabled:!0}},M={parameters:{docs:{description:{story:'When `data` has no `children` and no `value`, the chart renders the `translation.noData` message (default `"No data"`) centered in the SVG instead of an empty circle. Override it via `translation={{ noData: "..." }}`.'}}},args:{data:{name:`Root`},translation:{noData:`Nothing to show yet`}}},N={name:`Macintosh HD — 1 TB`,children:[{name:`Users`,children:[{name:`Movies`,value:210},{name:`Photos`,value:156},{name:`Downloads`,value:65},{name:`Music`,value:38},{name:`Documents`,value:42}]},{name:`Applications`,children:[{name:`Xcode`,value:48},{name:`Adobe CC`,value:32},{name:`Docker`,value:12},{name:`Other Apps`,value:28}]},{name:`Virtual Machines`,children:[{name:`Windows VM`,value:120},{name:`Ubuntu VM`,value:80}]},{name:`System`,children:[{name:`macOS`,value:18},{name:`Caches`,value:24}]}]},P={parameters:{docs:{description:{story:"`valueFormatter` customizes how numeric node values appear in tooltips — here disk-usage raw values are converted to a human-readable `GB` string."}}},args:{valueFormatter:e=>`${(e/1024).toFixed(1)} GB`}},F={parameters:{docs:{description:{story:"**Real-world use case: a disk-usage analyzer (think DaisyDisk / WizTree).** Circle area scales with GB — the biggest space hogs (`Movies`, `Windows VM`) are instantly obvious. `Ctrl/Cmd+Click` any folder to zoom in for a closer look."}}},args:{data:N,size:550,showAllLabels:!0}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Global Software Market** — annual revenue in $M by category. ' + '\`Ctrl / Cmd ⌘+Click\` any circle with children → animated zoom in. ' + '\`Ctrl / Cmd ⌘+Double-click\` → zoom out one level. ' + '\`Escape\` → reset to root. ' + 'Regular click fires \`onCircleClick\` with name, value, percentage, and path. ' + 'This story auto-runs a Ctrl+Click on the first eligible circle so you see the zoom animation.'
      }
    }
  },
  args: {
    data: GLOBAL_SOFTWARE
  },
  play: async ({
    canvasElement
  }) => {
    const firstZoomable = canvasElement.querySelector<SVGCircleElement>('circle[style*="cursor: pointer"]');
    if (firstZoomable) fireEvent.click(firstZoomable, {
      ctrlKey: true
    });
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Open-Source Ecosystem** — 4 depth levels, npm weekly downloads in thousands. ' + 'Shows how D3 circle packing handles deep hierarchies with the animated zoom.'
      }
    }
  },
  args: {
    data: OSS_ECOSYSTEM,
    size: 650
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`chartColors\` overrides the default MUI theme palette with a custom per-depth color array.'
      }
    }
  },
  args: {
    data: GLOBAL_SOFTWARE,
    chartColors: ["#1A237E", "#1565C0", "#0288D1", "#00ACC1", "#00897B", "#43A047"],
    background: "#0D1B2A",
    labelColor: "#FFFFFF"
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`depthColorStart\` + \`depthColorEnd\` enable HCL gradient mode — perceptually uniform color ' + 'progression across depth levels. Only circles **with children** participate in the gradient ' + '(leaf circles stay background-colored so labels on top stay readable) — a deeper hierarchy like ' + 'this one shows the progression much more clearly than a shallow, mostly-leaves dataset would. ' + 'A larger \`padding\` also helps: it widens the colored "ring" each parent circle shows around its children.'
      }
    }
  },
  args: {
    data: OSS_ECOSYSTEM,
    size: 650,
    padding: 8,
    depthColorStart: "hsl(195, 100%, 80%)",
    depthColorEnd: "hsl(265, 75%, 35%)",
    background: "#F8F9FA"
  }
}`,...D.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`colorConfig: { fill }\` per node in the data — each department and its sub-items use brand colors. ' + '"Operations" has no \`colorConfig\` and falls back to the default MUI palette. ' + 'This works alongside \`showAllLabels\` to show a richly colored hierarchy.'
      }
    }
  },
  args: {
    data: COLOR_CONFIG_BUDGET,
    showAllLabels: true,
    size: 620
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showAllLabels={true}\` shows labels on ALL visible inner circles — truncated with \`…\` if the text doesn\\'t fit inside the circle. ' + 'Outer-ring labels stay **bold** and larger. Inner labels use \`innerLabelFontSize\` (default 9px). ' + 'Labels disappear automatically for circles that are too small.'
      }
    }
  },
  args: {
    data: GLOBAL_SOFTWARE,
    showAllLabels: true,
    size: 650
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
    data: GLOBAL_SOFTWARE,
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
        story: "\`valueFormatter\` customizes how numeric node values appear in tooltips — " + "here disk-usage raw values are converted to a human-readable \`GB\` string."
      }
    }
  },
  args: {
    valueFormatter: v => \`\${(v / 1024).toFixed(1)} GB\`
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a disk-usage analyzer (think DaisyDisk / WizTree).** ' + 'Circle area scales with GB — the biggest space hogs (\`Movies\`, \`Windows VM\`) are instantly obvious. ' + '\`Ctrl/Cmd+Click\` any folder to zoom in for a closer look.'
      }
    }
  },
  args: {
    data: DISK_USAGE,
    size: 550,
    showAllLabels: true
  }
}`,...F.parameters?.docs?.source}}},I=[`Default`,`DeepHierarchy`,`CustomPalette`,`GradientMode`,`WithColorConfig`,`WithAllLabels`,`Disabled`,`EmptyData`,`WithValueFormatter`,`DiskUsageBreakdown`]}))();export{E as CustomPalette,T as DeepHierarchy,w as Default,j as Disabled,F as DiskUsageBreakdown,M as EmptyData,D as GradientMode,A as WithAllLabels,k as WithColorConfig,P as WithValueFormatter,I as __namedExportsOrder,x as default};