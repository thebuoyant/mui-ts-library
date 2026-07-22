import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,U as i,Y as a,Z as o,c as s,t as c}from"./iframe-Bb8mcAY9.js";import{E as l,O as u,c as d,i as f,k as p,l as ee,n as te,o as ne,r as re,t as m}from"./src-BuH4pCkW.js";var h,g=e((()=>{h={noData:`No data`}}));function _(e,t=0,n=`.`,r=`,`){let[i,a]=e.toFixed(Math.max(0,t)).split(`.`),o=i.replace(/\B(?=(\d{3})+(?!\d))/g,r);return a?`${o}${n}${a}`:o}function ie(e){return Math.abs(e)>=1e9?`${(e/1e9).toFixed(1).replace(/\.0$/,``)}B`:Math.abs(e)>=1e6?`${(e/1e6).toFixed(1).replace(/\.0$/,``)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(1).replace(/\.0$/,``)}k`:String(e)}function ae(e){return e.map(e=>typeof e==`string`?{key:e,label:e}:e)}function oe({barData:e,seriesKey:t,seriesLabel:r,decimals:a,decimalSep:o,thousandSep:s,valueFormatter:c}){let u=e.values[t]??0,d=l(Object.values(e.values)),f=d>0?Math.round(u/d*1e3)/10:0,p=(e,t)=>c?c(e,t):_(e,a,o,s);return(0,b.jsxs)(n,{sx:{py:.25},children:[(0,b.jsx)(i,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`},children:e.label}),(0,b.jsxs)(i,{variant:`caption`,sx:{display:`block`,opacity:.85},children:[r,`: `,p(u,t)]}),(0,b.jsxs)(i,{variant:`caption`,sx:{display:`block`,opacity:.65,mt:.25},children:[f,`% · Total: `,p(d,``)]})]})}function v({data:e,keys:t,size:r=500,innerRadius:i,barPadding:o=.12,chartColors:c,colorConfig:m,showLabels:g=!0,showGridLines:_=!0,gridLineCount:v=3,showGridValues:x=!0,showLegend:S=!0,sortBy:C=`none`,valueDecimalCount:w=0,valueDecimalSeparator:T=`.`,valueThousandsSeparator:E=`,`,valueFormatter:D,gridValueFormatter:O,zoomable:k=!1,onBarClick:A,onBarHover:j,disabled:M=!1,translation:N}){let P=a(),F={...h,...N},I=(0,y.useMemo)(()=>ae(t),[t]),L=(0,y.useMemo)(()=>I.map(e=>e.key),[I]),R=e.length===0||I.length===0,z=g?63:16,B=r/2-z,V=i==null?Math.round(r*.18):Math.max(0,Math.min(i,B-1)),H=[P.palette.primary.main,P.palette.secondary.main,P.palette.success.main,P.palette.warning.main,P.palette.error.main,P.palette.info.main,`#8e24aa`,`#00897b`,`#f06292`,`#a1887f`],U=c&&c.length>0?c:H,W=(0,y.useCallback)((e,t)=>{let n=m?.[e];return n?.fill?n.fill:U[t%U.length]},[m,U]),G=(0,y.useMemo)(()=>C===`value`?[...e].sort((e,t)=>l(L,e=>t.values[e]??0)-l(L,t=>e.values[t]??0)):C===`label`?[...e].sort((e,t)=>e.label.localeCompare(t.label,void 0,{numeric:!0,sensitivity:`base`})):e,[e,C,L]),K=(0,y.useMemo)(()=>u(G,e=>l(L,t=>e.values[t]??0))??0,[G,L]),q=(0,y.useMemo)(()=>ee().domain(G.map(e=>e.id)).range([0,2*Math.PI]).padding(o),[G,o]),J=(0,y.useMemo)(()=>d().domain([0,K]).range([V,B]),[V,B,K]),se=(0,y.useMemo)(()=>R?[]:te().keys(L).value((e,t)=>e.values[t]??0).order(re).offset(f)(G),[R,G,L]),ce=(0,y.useMemo)(()=>ne().startAngle(e=>e.x0).endAngle(e=>e.x1).innerRadius(e=>e.y0).outerRadius(e=>e.y1).padAngle(.008).padRadius(V+10),[V]),Y=(0,y.useMemo)(()=>K>0?p(0,K,v).filter(e=>e>0):[],[K,v]),le=O??ie,[X,Z]=(0,y.useState)(1),Q=(0,y.useRef)(null),[$,ue]=(0,y.useState)(`-${r/2} -${r/2} ${r} ${r}`),de=(0,y.useMemo)(()=>{if(X===1)return $;let[e,t,n,r]=$.split(` `).map(Number),i=n/X,a=r/X;return`${e+(n-i)/2} ${t+(r-a)/2} ${i} ${a}`},[$,X]);(0,y.useLayoutEffect)(()=>{let e=Q.current;if(!e)return;let t=requestAnimationFrame(()=>{try{let t=e.getBBox();ue(`${t.x-4} ${t.y-4} ${t.width+8} ${t.height+8}`)}catch{ue(`-${r/2} -${r/2} ${r} ${r}`)}});return()=>cancelAnimationFrame(t)},[r,e,t,V,B,g,_]),(0,y.useLayoutEffect)(()=>{if(M)return;let e=e=>{e.key===`Escape`&&Z(1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[M]);let fe=(0,y.useCallback)(e=>{if(!k||M||!e.ctrlKey)return;e.preventDefault();let t=e.deltaY<0?1.15:1/1.15;Z(e=>Math.max(.25,Math.min(8,e*t)))},[k,M]),pe=-(I.length*16)/2,me=Math.max(0,V*2-10-5-10),he=9*.57,ge=I.reduce((e,t)=>Math.max(e,(t.label??t.key).length),0),_e=-((15+Math.min(ge*he,me))/2),ve=Math.max(1,Math.floor(me/he)),ye=e=>e.length<=ve?e:`${e.slice(0,ve-1)}…`,be={followCursor:!0,enterDelay:50,enterNextDelay:0,disableHoverListener:M,slotProps:{tooltip:{sx:{maxWidth:240}}}},xe=P.palette.text.primary,Se=P.palette.divider,Ce=P.typography.fontFamily;return(0,b.jsx)(n,{style:{opacity:M?.5:1},sx:{display:`inline-flex`,cursor:M?`not-allowed`:`default`,userSelect:`none`},children:(0,b.jsx)(`svg`,{width:r,height:r,viewBox:de,onWheel:fe,style:{fontFamily:Ce??`sans-serif`,overflow:k&&X>1?`hidden`:`visible`},role:`img`,"aria-label":`Radial stacked bar chart`,children:(0,b.jsxs)(`g`,{ref:Q,children:[R&&(0,b.jsx)(`text`,{textAnchor:`middle`,dy:`0.35em`,fontSize:13,fill:P.palette.text.secondary,children:F.noData}),!R&&(0,b.jsxs)(b.Fragment,{children:[_&&Y.map(e=>(0,b.jsx)(`circle`,{r:J(e),fill:`none`,stroke:Se,strokeWidth:.5,strokeDasharray:`3 2`},`grid-${e}`)),_&&(0,b.jsx)(`circle`,{r:V,fill:`none`,stroke:Se,strokeWidth:.75}),_&&x&&Y.map(e=>(0,b.jsx)(`text`,{x:0,y:-J(e),textAnchor:`middle`,dy:`-3`,fontSize:9,fill:P.palette.text.secondary,pointerEvents:`none`,children:le(e)},`gv-${e}`)),se.map((e,t)=>{let n=e.key,r=I[t]?.label??n,i=W(n,t);return e.map((e,t)=>{let a=e.data,o=q(a.id)??0,c=o+q.bandwidth(),u=J(e[0]),d=J(e[1]);if(d-u<.5)return null;let f=ce({x0:o,x1:c,y0:u,y1:d})??``;return(0,b.jsx)(s,{...be,placement:`top`,title:(0,b.jsx)(oe,{barData:a,seriesKey:n,seriesLabel:r,decimals:w,decimalSep:T,thousandSep:E,valueFormatter:D}),children:(0,b.jsx)(`path`,{d:f,fill:i,style:{cursor:M?`not-allowed`:`pointer`,transition:`opacity 0.15s`},onMouseEnter:e=>{if(M)return;e.currentTarget.style.opacity=`0.75`;let t=l(L,e=>a.values[e]??0),r={id:a.id,label:a.label,seriesKey:n,value:a.values[n]??0,total:t,values:a.values};j?.(r,e)},onMouseLeave:e=>{e.currentTarget.style.opacity=`1`,j?.(null,e)},onClick:e=>{if(M)return;let t=l(L,e=>a.values[e]??0),r={id:a.id,label:a.label,seriesKey:n,value:a.values[n]??0,total:t,values:a.values};A?.(r,e)}})},`${n}-${t}`)})}),g&&G.map(e=>{let t=(q(e.id)??0)+q.bandwidth()/2,n=B+8,r=n*Math.sin(t),i=-n*Math.cos(t),a=t*180/Math.PI;return(0,b.jsx)(`text`,{x:r,y:i,transform:`rotate(${a<180?a-90:a+90},${r},${i})`,textAnchor:`middle`,dominantBaseline:`central`,fontSize:11,fill:xe,pointerEvents:`none`,children:e.label},`lbl-${e.id}`)}),S&&(0,b.jsx)(`g`,{pointerEvents:`none`,transform:`translate(${_e},0)`,children:I.map((e,t)=>{let n=W(e.key,t),r=pe+t*16,i=ye(e.label??e.key);return(0,b.jsxs)(`g`,{transform:`translate(0,${r})`,children:[(0,b.jsx)(`rect`,{x:0,y:0,width:10,height:10,fill:n,rx:2}),(0,b.jsx)(`text`,{x:15,y:10/2,dominantBaseline:`central`,fontSize:9,fill:xe,children:i})]},`leg-${e.key}`)})})]})]})})})}var y,b,x=e((()=>{y=t(r(),1),m(),c(),g(),b=o(),v.displayName=`RadialStackedBarChart`,v.__docgenInfo={description:``,methods:[],displayName:`RadialStackedBarChart`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Unique identifier — used as React key and in callback payloads */
  id:     string;
  /** Outer-edge label shown next to the bar */
  label:  string;
  /** Value per series key — missing keys are treated as 0 */
  values: Record<string, number>;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0},description:`Unique identifier — used as React key and in callback payloads`},{key:`label`,value:{name:`string`,required:!0},description:`Outer-edge label shown next to the bar`},{key:`values`,value:{name:`Record`,elements:[{name:`string`},{name:`number`}],raw:`Record<string, number>`,required:!0},description:`Value per series key — missing keys are treated as 0`}]}}],raw:`RadialStackedBarData[]`},description:`Array of bars — each bar has a label and a value per series key`},keys:{required:!0,tsType:{name:`union`,raw:`RadialStackedBarSeries[] | string[]`,elements:[{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  key:    string;
  label?: string;
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!1}}]}}],raw:`RadialStackedBarSeries[]`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:"Series definitions in stack order (innermost first).\nPass `string[]` for quick setup — the string becomes both key and legend label.\nPass `RadialStackedBarSeries[]` to customize the legend label independently from the key."},size:{required:!1,tsType:{name:`number`},description:`Width and height of the SVG in pixels (default: 500)`,defaultValue:{value:`500`,computed:!1}},innerRadius:{required:!1,tsType:{name:`number`},description:`Inner radius of the bar area in px — controls the center hole size (default: size * 0.18)`},barPadding:{required:!1,tsType:{name:`number`},description:`Fractional gap between adjacent bars — 0 = no gap, 1 = all gap (default: 0.12)`,defaultValue:{value:`0.12`,computed:!1}},chartColors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Custom color palette for the series — falls back to MUI theme palette when omitted`},colorConfig:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`union`,raw:`{ fill?: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ fill?: string }`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}}]}},{name:`null`}]}],raw:`Record<string, { fill?: string } | null>`},description:"Per-series color overrides keyed by series key — takes precedence over `chartColors`"},showLabels:{required:!1,tsType:{name:`boolean`},description:`Show bar labels on the outer edge (default: true)`,defaultValue:{value:`true`,computed:!1}},showGridLines:{required:!1,tsType:{name:`boolean`},description:`Show concentric grid rings (default: true)`,defaultValue:{value:`true`,computed:!1}},gridLineCount:{required:!1,tsType:{name:`number`},description:`Number of concentric grid rings (default: 3)`,defaultValue:{value:`3`,computed:!1}},showGridValues:{required:!1,tsType:{name:`boolean`},description:`Show value labels on the outermost grid ring (default: true)`,defaultValue:{value:`true`,computed:!1}},showLegend:{required:!1,tsType:{name:`boolean`},description:`Show the series legend (default: true)`,defaultValue:{value:`true`,computed:!1}},sortBy:{required:!1,tsType:{name:`union`,raw:`'value' | 'label' | 'none'`,elements:[{name:`literal`,value:`'value'`},{name:`literal`,value:`'label'`},{name:`literal`,value:`'none'`}]},description:`Sort bars by total descending ('value'), by label ascending ('label'), or keep original order ('none') — default: 'none'`,defaultValue:{value:`"none"`,computed:!1}},valueDecimalCount:{required:!1,tsType:{name:`number`},description:`Decimal places for values in tooltips (default: 0)`,defaultValue:{value:`0`,computed:!1}},valueDecimalSeparator:{required:!1,tsType:{name:`string`},description:`Decimal separator for values (default: '.')`,defaultValue:{value:`"."`,computed:!1}},valueThousandsSeparator:{required:!1,tsType:{name:`string`},description:`Thousands separator for values (default: ',')`,defaultValue:{value:`","`,computed:!1}},valueFormatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number, seriesKey: string) => string`,signature:{arguments:[{type:{name:`number`},name:`value`},{type:{name:`string`},name:`seriesKey`}],return:{name:`string`}}},description:"Custom formatter for tooltip bar values. Overrides `valueDecimalCount`,\n`valueDecimalSeparator`, and `valueThousandsSeparator` when provided.\n`seriesKey` is the key from `series` — use it to format different series differently.\nExample: `(v, key) => key === 'revenue' ? \\`$${v.toFixed(0)}\\` : \\`${v} kg\\``\n@since 3.22.0"},gridValueFormatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => string`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`string`}}},description:'Custom formatter for the grid ring value labels.\nDefaults to compact notation (e.g. 30000 → "30k", 3000000 → "3M").\nExample: `(v) => \\`${(v / 1e6).toFixed(0)}M\\``'},zoomable:{required:!1,tsType:{name:`boolean`},description:"Enable Ctrl/Cmd+Scroll visual zoom — content outside `size` is clipped (default: false)",defaultValue:{value:`false`,computed:!1}},onBarClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: RadialStackedBarBarInfo, event: React.MouseEvent<SVGPathElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  id:        string;
  label:     string;
  /** Series key that was clicked */
  seriesKey: string;
  /** Value of the clicked segment */
  value:     number;
  /** Total bar value (sum of all series) */
  total:     number;
  /** All values for this bar */
  values:    Record<string, number>;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`seriesKey`,value:{name:`string`,required:!0},description:`Series key that was clicked`},{key:`value`,value:{name:`number`,required:!0},description:`Value of the clicked segment`},{key:`total`,value:{name:`number`,required:!0},description:`Total bar value (sum of all series)`},{key:`values`,value:{name:`Record`,elements:[{name:`string`},{name:`number`}],raw:`Record<string, number>`,required:!0},description:`All values for this bar`}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGPathElement>`,elements:[{name:`SVGPathElement`}]},name:`event`}],return:{name:`void`}}},description:`Fired on click of any bar segment`},onBarHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: RadialStackedBarBarInfo | null, event: React.MouseEvent<SVGPathElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`RadialStackedBarBarInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  id:        string;
  label:     string;
  /** Series key that was clicked */
  seriesKey: string;
  /** Value of the clicked segment */
  value:     number;
  /** Total bar value (sum of all series) */
  total:     number;
  /** All values for this bar */
  values:    Record<string, number>;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`seriesKey`,value:{name:`string`,required:!0},description:`Series key that was clicked`},{key:`value`,value:{name:`number`,required:!0},description:`Value of the clicked segment`},{key:`total`,value:{name:`number`,required:!0},description:`Total bar value (sum of all series)`},{key:`values`,value:{name:`Record`,elements:[{name:`string`},{name:`number`}],raw:`Record<string, number>`,required:!0},description:`All values for this bar`}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGPathElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGPathElement>`,elements:[{name:`SVGPathElement`}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave a bar segment — `null` on leave. Use for linked-view highlighting."},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables all interactions (default: false)`,defaultValue:{value:`false`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  noData: string;
}`,signature:{properties:[{key:`noData`,value:{name:`string`,required:!0}}]}}],raw:`Partial<RadialStackedBarChartTranslation>`},description:`Override any translation string`}}}})),S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H;e((()=>{x(),{fn:S}=__STORYBOOK_MODULE_TEST__,C={title:`Components/RadialStackedBarChart`,component:v,argTypes:{barPadding:{control:{type:`range`,min:0,max:.8,step:.01}},disabled:{control:`boolean`},gridLineCount:{control:{type:`number`,min:1,max:10}},innerRadius:{control:{type:`number`,min:0,max:250,step:5}},showGridLines:{control:`boolean`},showGridValues:{control:`boolean`},showLabels:{control:`boolean`},showLegend:{control:`boolean`},size:{control:{type:`number`,min:200,max:900,step:50}},sortBy:{control:`radio`,options:[`none`,`value`,`label`]},valueDecimalCount:{control:{type:`number`,min:0,max:4}},valueDecimalSeparator:{control:`text`},valueThousandsSeparator:{control:`text`},zoomable:{control:`boolean`},chartColors:{control:!1},colorConfig:{control:!1},data:{control:!1},gridValueFormatter:{control:!1},valueFormatter:{control:!1},keys:{control:!1},translation:{control:!1},onBarClick:{control:!1}},args:{barPadding:.12,disabled:!1,gridLineCount:3,innerRadius:90,showGridLines:!0,showGridValues:!0,showLabels:!0,showLegend:!0,size:500,sortBy:`none`,valueDecimalCount:0,valueDecimalSeparator:`.`,valueThousandsSeparator:`,`,zoomable:!1,onBarClick:S(),onBarHover:S()},parameters:{controls:{sort:`alpha`}}},w=[{key:`under5`,label:`Under 5 Years`},{key:`age5_13`,label:`5 to 13 Years`},{key:`age14_17`,label:`14 to 17 Years`},{key:`age18_24`,label:`18 to 24 Years`},{key:`age25_44`,label:`25 to 44 Years`},{key:`age45_64`,label:`45 to 64 Years`},{key:`age65plus`,label:`65 Years and Over`}],T=[{id:`CA`,label:`CA`,values:{under5:2486e3,age5_13:4926e3,age14_17:1897e3,age18_24:3981e3,age25_44:9109e3,age45_64:7793e3,age65plus:4032e3}},{id:`TX`,label:`TX`,values:{under5:1965e3,age5_13:3773e3,age14_17:1428e3,age18_24:2951e3,age25_44:6823e3,age45_64:536e4,age65plus:2636e3}},{id:`FL`,label:`FL`,values:{under5:1075e3,age5_13:2097e3,age14_17:838e3,age18_24:1769e3,age25_44:412e4,age45_64:4061e3,age65plus:3329e3}},{id:`NY`,label:`NY`,values:{under5:1174e3,age5_13:2202e3,age14_17:861e3,age18_24:1974e3,age25_44:4618e3,age45_64:4213e3,age65plus:2876e3}},{id:`PA`,label:`PA`,values:{under5:701e3,age5_13:1378e3,age14_17:554e3,age18_24:1314e3,age25_44:2734e3,age45_64:2891e3,age65plus:2024e3}},{id:`IL`,label:`IL`,values:{under5:805e3,age5_13:1568e3,age14_17:61e4,age18_24:1296e3,age25_44:3006e3,age45_64:2744e3,age65plus:1766e3}},{id:`OH`,label:`OH`,values:{under5:679e3,age5_13:1382e3,age14_17:559e3,age18_24:127e4,age25_44:2611e3,age45_64:2693e3,age65plus:1852e3}},{id:`GA`,label:`GA`,values:{under5:651e3,age5_13:1291e3,age14_17:514e3,age18_24:1107e3,age25_44:2676e3,age45_64:2282e3,age65plus:1228e3}},{id:`NC`,label:`NC`,values:{under5:605e3,age5_13:1208e3,age14_17:488e3,age18_24:1077e3,age25_44:2375e3,age45_64:231e4,age65plus:1467e3}},{id:`MI`,label:`MI`,values:{under5:57e4,age5_13:1144e3,age14_17:475e3,age18_24:1063e3,age25_44:2175e3,age45_64:2247e3,age65plus:1595e3}},{id:`NJ`,label:`NJ`,values:{under5:522e3,age5_13:1058e3,age14_17:415e3,age18_24:87e4,age25_44:2162e3,age45_64:2028e3,age65plus:1259e3}},{id:`VA`,label:`VA`,values:{under5:492e3,age5_13:978e3,age14_17:388e3,age18_24:912e3,age25_44:2073e3,age45_64:1863e3,age65plus:1102e3}},{id:`WA`,label:`WA`,values:{under5:452e3,age5_13:887e3,age14_17:356e3,age18_24:776e3,age25_44:188e4,age45_64:168e4,age65plus:1006e3}},{id:`AZ`,label:`AZ`,values:{under5:445e3,age5_13:882e3,age14_17:363e3,age18_24:788e3,age25_44:17e5,age45_64:1632e3,age65plus:1135e3}},{id:`MA`,label:`MA`,values:{under5:378e3,age5_13:73e4,age14_17:299e3,age18_24:818e3,age25_44:1756e3,age45_64:1699e3,age65plus:1077e3}},{id:`TN`,label:`TN`,values:{under5:4e5,age5_13:793e3,age14_17:323e3,age18_24:703e3,age25_44:1526e3,age45_64:1494e3,age65plus:921e3}},{id:`IN`,label:`IN`,values:{under5:418e3,age5_13:826e3,age14_17:33e4,age18_24:744e3,age25_44:1481e3,age45_64:1361e3,age65plus:854e3}},{id:`MO`,label:`MO`,values:{under5:363e3,age5_13:72e4,age14_17:293e3,age18_24:68e4,age25_44:1321e3,age45_64:1316e3,age65plus:869e3}},{id:`MD`,label:`MD`,values:{under5:363e3,age5_13:715e3,age14_17:287e3,age18_24:636e3,age25_44:1484e3,age45_64:1367e3,age65plus:778e3}},{id:`WI`,label:`WI`,values:{under5:328e3,age5_13:66e4,age14_17:272e3,age18_24:621e3,age25_44:1218e3,age45_64:1226e3,age65plus:823e3}}],E=[{key:`q1`,label:`Q1`},{key:`q2`,label:`Q2`},{key:`q3`,label:`Q3`},{key:`q4`,label:`Q4`}],D=[{id:`berlin`,label:`Berlin`,values:{q1:120,q2:145,q3:98,q4:175}},{id:`munich`,label:`Munich`,values:{q1:210,q2:185,q3:220,q4:195}},{id:`hamburg`,label:`Hamburg`,values:{q1:95,q2:110,q3:88,q4:130}},{id:`cologne`,label:`Cologne`,values:{q1:80,q2:95,q3:105,q4:90}},{id:`frankfurt`,label:`Frankfurt`,values:{q1:165,q2:150,q3:180,q4:200}},{id:`stuttgart`,label:`Stuttgart`,values:{q1:75,q2:85,q3:70,q4:95}},{id:`dusseldorf`,label:`Düsseldorf`,values:{q1:60,q2:70,q3:65,q4:80}},{id:`leipzig`,label:`Leipzig`,values:{q1:45,q2:55,q3:60,q4:65}}],O={parameters:{docs:{description:{story:`US state population by age group — 20 states, 7 age-group series. Hover over any segment for a tooltip showing the series value, percentage, and total. Grid rings mark 10M and 20M population milestones.`}}},args:{data:T,keys:w,size:600,gridValueFormatter:e=>`${(e/1e6).toFixed(0)}M`}},k={parameters:{docs:{description:{story:`Bars sorted by total value descending — the largest states appear at the top (12 o'clock) and values decrease clockwise.`}}},args:{data:T,keys:w,size:600,sortBy:`value`,gridValueFormatter:e=>`${(e/1e6).toFixed(0)}M`}},A={parameters:{docs:{description:{story:`Quarterly sales per city — a smaller dataset with only 4 series, showing the chart at a more compact size.`}}},args:{data:D,keys:E,size:480}},j={parameters:{docs:{description:{story:"`chartColors` replaces the entire palette. `colorConfig` overrides individual series — here Q2 and Q4 get brand colors while Q1 and Q3 use the custom palette."}}},args:{data:D,keys:E,size:480,chartColors:[`#e8f5e9`,`#a5d6a7`,`#388e3c`,`#1b5e20`],colorConfig:{q2:{fill:`#f57c00`},q4:{fill:`#6a1b9a`}}}},M={parameters:{docs:{description:{story:"`showLabels={false}` removes the outer-edge bar labels — useful in space-constrained layouts or when bar identities are shown elsewhere."}}},args:{data:D,keys:E,size:440,showLabels:!1}},N={parameters:{docs:{description:{story:"`showLegend={false}` removes the center legend — use when a separate legend is rendered outside the chart."}}},args:{data:D,keys:E,size:440,showLegend:!1}},P={args:{data:D,keys:E,size:440,showGridLines:!1}},F={parameters:{docs:{description:{story:"A large `innerRadius` creates a wide donut hole — the legend sits comfortably in the center."}}},args:{data:D,keys:E,size:480,innerRadius:130}},I={parameters:{docs:{description:{story:"`keys` can be a plain `string[]` — the key string is used as both the data field name and the legend label."}}},args:{data:D,keys:[`q1`,`q2`,`q3`,`q4`],size:480}},L={args:{data:D,keys:E,size:440,disabled:!0}},R={parameters:{docs:{description:{story:"`zoomable={true}` enables Ctrl/Cmd+Scroll zoom. Press Escape to reset. Content outside `size` is clipped."}}},args:{data:T,keys:w,size:600,zoomable:!0,gridValueFormatter:e=>`${(e/1e6).toFixed(0)}M`}},z={parameters:{docs:{description:{story:"`valueFormatter` gives full control over tooltip bar values — here quarterly sales are formatted as `€ X,XXX` with locale separators. Use `seriesKey` to apply different units per series."}}},args:{data:D,keys:E,size:480,valueFormatter:e=>`€ ${e.toLocaleString(`de-DE`)}`,gridValueFormatter:e=>`€${e}k`}},B={parameters:{docs:{description:{story:"`gridValueFormatter` controls the text on grid ring labels — here the raw values are formatted as currency."}}},args:{data:D,keys:E,size:480,gridValueFormatter:e=>`€${e}k`}},V={parameters:{docs:{description:{story:"Stress-test for the legend overflow guard: all series labels are intentionally very long. Labels that exceed the available inner-radius width are automatically truncated with '...' — no legend text bleeds into the chart segments. Try reducing `size` or `innerRadius` via the controls to see the truncation kick in earlier."}}},args:{data:[{id:`a`,label:`Alpha`,values:{cat1:120,cat2:95,cat3:60,cat4:40}},{id:`b`,label:`Beta`,values:{cat1:80,cat2:110,cat3:75,cat4:55}},{id:`c`,label:`Gamma`,values:{cat1:100,cat2:70,cat3:90,cat4:30}},{id:`d`,label:`Delta`,values:{cat1:60,cat2:85,cat3:50,cat4:70}}],keys:[{key:`cat1`,label:`This is a Very Long Category Name — Alpha`},{key:`cat2`,label:`This is a Very Long Category Name — Beta`},{key:`cat3`,label:`This is a Very Long Category Name — Gamma`},{key:`cat4`,label:`This is a Very Long Category Name — Delta`}],size:400,innerRadius:70}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "US state population by age group — 20 states, 7 age-group series. " + "Hover over any segment for a tooltip showing the series value, percentage, and total. " + "Grid rings mark 10M and 20M population milestones."
      }
    }
  },
  args: {
    data: US_STATES_DATA,
    keys: AGE_KEYS,
    size: 600,
    gridValueFormatter: v => \`\${(v / 1e6).toFixed(0)}M\`
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Bars sorted by total value descending — the largest states appear at the top (12 o'clock) and values decrease clockwise."
      }
    }
  },
  args: {
    data: US_STATES_DATA,
    keys: AGE_KEYS,
    size: 600,
    sortBy: "value",
    gridValueFormatter: v => \`\${(v / 1e6).toFixed(0)}M\`
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Quarterly sales per city — a smaller dataset with only 4 series, showing the chart at a more compact size."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 480
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`chartColors\` replaces the entire palette. \`colorConfig\` overrides individual series — " + "here Q2 and Q4 get brand colors while Q1 and Q3 use the custom palette."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 480,
    chartColors: ["#e8f5e9", "#a5d6a7", "#388e3c", "#1b5e20"],
    colorConfig: {
      q2: {
        fill: "#f57c00"
      },
      q4: {
        fill: "#6a1b9a"
      }
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`showLabels={false}\` removes the outer-edge bar labels — useful in space-constrained layouts or when bar identities are shown elsewhere."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 440,
    showLabels: false
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`showLegend={false}\` removes the center legend — use when a separate legend is rendered outside the chart."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 440,
    showLegend: false
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 440,
    showGridLines: false
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "A large \`innerRadius\` creates a wide donut hole — the legend sits comfortably in the center."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 480,
    innerRadius: 130
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`keys\` can be a plain \`string[]\` — the key string is used as both the data field name and the legend label."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: ["q1", "q2", "q3", "q4"],
    size: 480
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 440,
    disabled: true
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`zoomable={true}\` enables Ctrl/Cmd+Scroll zoom. Press Escape to reset. Content outside \`size\` is clipped."
      }
    }
  },
  args: {
    data: US_STATES_DATA,
    keys: AGE_KEYS,
    size: 600,
    zoomable: true,
    gridValueFormatter: v => \`\${(v / 1e6).toFixed(0)}M\`
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`valueFormatter\` gives full control over tooltip bar values — " + "here quarterly sales are formatted as \`€ X,XXX\` with locale separators. " + "Use \`seriesKey\` to apply different units per series."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 480,
    valueFormatter: v => \`€ \${v.toLocaleString("de-DE")}\`,
    gridValueFormatter: v => \`€\${v}k\`
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`gridValueFormatter\` controls the text on grid ring labels — here the raw values are formatted as currency."
      }
    }
  },
  args: {
    data: SALES_DATA,
    keys: QUARTERLY_KEYS,
    size: 480,
    gridValueFormatter: v => \`€\${v}k\`
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Stress-test for the legend overflow guard: all series labels are intentionally very long. " + "Labels that exceed the available inner-radius width are automatically truncated with '...' — " + "no legend text bleeds into the chart segments. " + "Try reducing \`size\` or \`innerRadius\` via the controls to see the truncation kick in earlier."
      }
    }
  },
  args: {
    data: [{
      id: "a",
      label: "Alpha",
      values: {
        cat1: 120,
        cat2: 95,
        cat3: 60,
        cat4: 40
      }
    }, {
      id: "b",
      label: "Beta",
      values: {
        cat1: 80,
        cat2: 110,
        cat3: 75,
        cat4: 55
      }
    }, {
      id: "c",
      label: "Gamma",
      values: {
        cat1: 100,
        cat2: 70,
        cat3: 90,
        cat4: 30
      }
    }, {
      id: "d",
      label: "Delta",
      values: {
        cat1: 60,
        cat2: 85,
        cat3: 50,
        cat4: 70
      }
    }],
    keys: [{
      key: "cat1",
      label: "This is a Very Long Category Name — Alpha"
    }, {
      key: "cat2",
      label: "This is a Very Long Category Name — Beta"
    }, {
      key: "cat3",
      label: "This is a Very Long Category Name — Gamma"
    }, {
      key: "cat4",
      label: "This is a Very Long Category Name — Delta"
    }],
    size: 400,
    innerRadius: 70
  }
}`,...V.parameters?.docs?.source}}},H=[`Default`,`SortedByValue`,`SalesQuarterly`,`CustomColors`,`NoLabels`,`NoLegend`,`NoGridLines`,`LargeInnerRadius`,`StringKeys`,`Disabled`,`ZoomableWithCtrlScroll`,`WithValueFormatter`,`CustomGridValueFormatter`,`LegendOverflowProtection`]}))();export{j as CustomColors,B as CustomGridValueFormatter,O as Default,L as Disabled,F as LargeInnerRadius,V as LegendOverflowProtection,P as NoGridLines,M as NoLabels,N as NoLegend,A as SalesQuarterly,k as SortedByValue,I as StringKeys,z as WithValueFormatter,R as ZoomableWithCtrlScroll,H as __namedExportsOrder,C as default};