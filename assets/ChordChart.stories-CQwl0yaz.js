import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,U as i,Y as a,Z as o,c as s,t as c}from"./iframe-Bb8mcAY9.js";import{A as ee,D as te,E as l,M as u,T as ne,_ as re,g as ie,h as ae,j as d,o as oe,t as f,u as se,v as ce}from"./src-BuH4pCkW.js";var p,m=e((()=>{p={noData:`No data`}}));function le(e,t=0,n=`.`,r=`,`){if(!isFinite(e))return String(e);let[i,a]=e.toFixed(Math.max(0,t)).split(`.`),o=i.replace(/\B(?=(\d{3})+(?!\d))/g,r);return a?`${o}${n}${a}`:o}function ue({name:e,valueOut:t,valueIn:r,fmt:a}){return(0,_.jsxs)(n,{sx:{py:.25},children:[(0,_.jsx)(i,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`},children:e}),(0,_.jsxs)(i,{variant:`caption`,sx:{display:`block`,opacity:.85},children:[a(t),` outgoing →`]}),(0,_.jsxs)(i,{variant:`caption`,sx:{display:`block`,opacity:.85},children:[a(r),` incoming ←`]})]})}function de({sourceName:e,targetName:t,sourceValue:r,targetValue:a,directed:o,fmt:s}){return(0,_.jsxs)(n,{sx:{py:.25},children:[(0,_.jsxs)(i,{variant:`caption`,sx:{fontWeight:`bold`,display:`block`},children:[e,` → `,t]}),(0,_.jsx)(i,{variant:`caption`,sx:{display:`block`,opacity:.85},children:s(r)}),o&&a>0&&a!==r&&(0,_.jsxs)(i,{variant:`caption`,sx:{display:`block`,opacity:.7,mt:.25},children:[t,` → `,e,`: `,s(a)]})]})}function h({data:e,size:t=500,innerRadius:r,ringThickness:i=20,padAngle:o,ribbonPadAngle:c,sortSubgroups:f=`descending`,sortChords:m=`descending`,chartColors:h,groupColorConfigs:v,showGroupLabels:y=!0,labelOffset:b=8,ribbonOpacity:x=.75,ribbonBlendMode:S,directed:C=!0,valueDecimalCount:w=0,valueDecimalSeparator:T=`.`,valueThousandsSeparator:E=`,`,valueFormatter:D,onGroupClick:O,onGroupHover:k,onChordClick:A,onChordHover:j,zoomable:M=!1,disabled:N=!1,translation:fe}){let P=a(),pe={...p,...fe},me=e.length===0,he=S??(P.palette.mode===`dark`?`normal`:`multiply`),ge=[P.palette.primary.main,P.palette.secondary.main,P.palette.error.main,P.palette.warning.main,P.palette.success.main,P.palette.info.main],F=h&&h.length>0?h:ge,_e=r??Math.min(t,t)*.5-90,I=Math.max(10,_e),L=I+Math.max(1,i),R=o??10/I,z=c??1/I,B=(0,g.useCallback)(e=>D?D(e):le(e,w,T,E),[D,w,T,E]),{names:V,matrix:H}=(0,g.useMemo)(()=>{let t=ee(ne(e.map(e=>e.source),e.map(e=>e.target))),n=new Map(t.map((e,t)=>[e,t])),r=Array.from({length:t.length},()=>Array(t.length).fill(0));for(let{source:t,target:i,value:a}of e){let e=n.get(t),o=n.get(i);e==null||o==null||(r[e][o]+=a)}return{names:t,matrix:r}},[e]),U=(0,g.useMemo)(()=>{let e=(C?re():ce()).padAngle(R);return f===`ascending`&&(e=e.sortSubgroups(u)),f===`descending`&&(e=e.sortSubgroups(d)),m===`ascending`&&(e=e.sortChords(u)),m===`descending`&&(e=e.sortChords(d)),e(H)},[H,R,C,f,m]),ve=(0,g.useMemo)(()=>oe().innerRadius(I).outerRadius(L),[I,L]),W=(0,g.useMemo)(()=>(C?ae():ie()).radius(I-1).padAngle(z),[I,z,C]),ye=(0,g.useCallback)(e=>W({source:{startAngle:e.source.startAngle,endAngle:e.source.endAngle,radius:I-1},target:{startAngle:e.target.startAngle,endAngle:e.target.endAngle,radius:I-1}})??``,[W,I]),G=(0,g.useMemo)(()=>se().domain(te(V.length)).range(F.length>=V.length?F:[...Array(Math.ceil(V.length/F.length))].flatMap(()=>F).slice(0,V.length)),[F,V.length]),K=(0,g.useCallback)(e=>v?.[V[e]]?.fill??G(e),[v,V,G]),q=(0,g.useRef)(null),[J,Y]=(0,g.useState)(`-${t/2} -${t/2} ${t} ${t}`),[X,Z]=(0,g.useState)(1),be=(0,g.useMemo)(()=>{if(X===1)return J;let[e,t,n,r]=J.split(` `).map(Number),i=n/X,a=r/X;return`${e+(n-i)/2} ${t+(r-a)/2} ${i} ${a}`},[J,X]);(0,g.useLayoutEffect)(()=>{let e=q.current;if(!e)return;let n=requestAnimationFrame(()=>{try{let t=e.getBBox();Y(`${t.x-8} ${t.y-8} ${t.width+16} ${t.height+16}`)}catch{Y(`-${t/2} -${t/2} ${t} ${t}`)}});return()=>cancelAnimationFrame(n)},[t,I,L,V.length,U]);let[Q,$]=(0,g.useState)(null),xe=(0,g.useCallback)(e=>({name:V[e.index],index:e.index,valueOut:l(U,t=>(t.source.index===e.index?t.source.value:0)+(!C&&t.target.index===e.index?t.target.value:0)),valueIn:l(U,t=>(t.target.index===e.index?t.source.value:0)+(!C&&t.source.index===e.index?t.target.value:0))}),[V,U,C]),Se=(0,g.useCallback)(e=>({source:{name:V[e.source.index],index:e.source.index,value:e.source.value},target:{name:V[e.target.index],index:e.target.index,value:e.target.value}}),[V]),Ce=e=>{let t=(e.startAngle+e.endAngle)/2,n=t*180/Math.PI-90,r=t>Math.PI?` rotate(180)`:``;return`rotate(${n}) translate(${L+b})${r}`},we=e=>(e.startAngle+e.endAngle)/2>Math.PI?`end`:`start`,Te=(0,g.useCallback)(e=>{if(!M||N||!e.ctrlKey)return;e.preventDefault();let t=e.deltaY<0?1.15:1/1.15;Z(e=>Math.max(.25,Math.min(8,e*t)))},[M,N]);(0,g.useLayoutEffect)(()=>{if(!M)return;let e=e=>{e.key===`Escape`&&Z(1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[M]);let Ee={followCursor:!0,enterDelay:50,enterNextDelay:0,disableHoverListener:N,slotProps:{tooltip:{sx:{maxWidth:240}}}},De=P.palette.text.primary,Oe=P.typography.fontFamily;return(0,_.jsx)(n,{sx:{display:`inline-flex`,opacity:N?.5:1,cursor:N?`not-allowed`:`default`,userSelect:`none`},children:(0,_.jsx)(`svg`,{width:t,height:t,viewBox:be,onWheel:Te,style:{fontFamily:Oe??`sans-serif`,overflow:M&&X>1?`hidden`:`visible`},role:`img`,"aria-label":`Chord chart`,children:(0,_.jsxs)(`g`,{ref:q,children:[me&&(0,_.jsx)(`text`,{textAnchor:`middle`,dy:`0.35em`,fontSize:13,fill:P.palette.text.secondary,children:pe.noData}),(0,_.jsx)(`g`,{children:U.groups.map(e=>{let t=xe(e),n=Q===e.index,r=Q!==null&&!n;return(0,_.jsx)(s,{...Ee,title:(0,_.jsx)(ue,{name:t.name,valueOut:t.valueOut,valueIn:t.valueIn,fmt:B}),children:(0,_.jsxs)(`g`,{style:{cursor:N?`not-allowed`:`pointer`},onMouseEnter:n=>{N||($(e.index),k?.(t,n))},onMouseLeave:e=>{$(null),k?.(null,e)},onClick:e=>!N&&O?.(t,e),children:[(0,_.jsx)(`path`,{d:ve(e)||``,fill:K(e.index),stroke:P.palette.divider,opacity:r?.35:1,style:{transition:`opacity 0.15s`}}),y&&(0,_.jsx)(`text`,{dy:`0.35em`,fontSize:11,fill:De,transform:Ce(e),textAnchor:we(e),pointerEvents:`none`,children:V[e.index]})]})},`grp-tt-${e.index}`)})}),(0,_.jsx)(`g`,{fillOpacity:x,style:{mixBlendMode:he},children:U.map((e,t)=>{let n=Se(e),r=Q===null||e.source.index===Q||e.target.index===Q;return(0,_.jsx)(s,{...Ee,title:(0,_.jsx)(de,{sourceName:n.source.name,targetName:n.target.name,sourceValue:n.source.value,targetValue:n.target.value,directed:C,fmt:B}),children:(0,_.jsx)(`path`,{d:ye(e),fill:K(e.target.index),stroke:`none`,opacity:r?1:.12,style:{cursor:N?`not-allowed`:`pointer`,transition:`opacity 0.15s`},onMouseEnter:e=>{N||j?.(n,e)},onMouseLeave:e=>{j?.(null,e)},onClick:e=>!N&&A?.(n,e)})},`chord-tt-${t}`)})})]})})})}var g,_,v=e((()=>{g=t(r(),1),f(),c(),m(),_=o(),h.displayName=`ChordChart`,h.__docgenInfo={description:``,methods:[],displayName:`ChordChart`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  source: string;
  target: string;
  value:  number;
}`,signature:{properties:[{key:`source`,value:{name:`string`,required:!0}},{key:`target`,value:{name:`string`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]}}],raw:`ChordChartData[]`},description:"Array of directed or undirected flows — `{ source, target, value }`"},size:{required:!1,tsType:{name:`number`},description:`Width and height of the SVG in pixels (default: 500)`,defaultValue:{value:`500`,computed:!1}},innerRadius:{required:!1,tsType:{name:`number`},description:`Inner radius of the arc ring in px — auto-computed when omitted`},ringThickness:{required:!1,tsType:{name:`number`},description:`Thickness of the arc ring in px (default: 20)`,defaultValue:{value:`20`,computed:!1}},padAngle:{required:!1,tsType:{name:`number`},description:`Padding angle between arc groups in radians (auto-computed when omitted)`},ribbonPadAngle:{required:!1,tsType:{name:`number`},description:`Padding angle inside ribbons in radians (auto-computed when omitted)`},sortSubgroups:{required:!1,tsType:{name:`union`,raw:`'ascending' | 'descending' | 'none'`,elements:[{name:`literal`,value:`'ascending'`},{name:`literal`,value:`'descending'`},{name:`literal`,value:`'none'`}]},description:`Sort order for subgroups within each arc (default: 'descending')`,defaultValue:{value:`"descending"`,computed:!1}},sortChords:{required:!1,tsType:{name:`union`,raw:`'ascending' | 'descending' | 'none'`,elements:[{name:`literal`,value:`'ascending'`},{name:`literal`,value:`'descending'`},{name:`literal`,value:`'none'`}]},description:`Sort order for ribbons (default: 'descending')`,defaultValue:{value:`"descending"`,computed:!1}},chartColors:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Custom color palette — falls back to MUI theme palette when omitted`},groupColorConfigs:{required:!1,tsType:{name:`Record`,elements:[{name:`string`},{name:`union`,raw:`{
  fill?:      string;
  textColor?: string;
  stroke?:    string;
} | null`,elements:[{name:`signature`,type:`object`,raw:`{
  fill?:      string;
  textColor?: string;
  stroke?:    string;
}`,signature:{properties:[{key:`fill`,value:{name:`string`,required:!1}},{key:`textColor`,value:{name:`string`,required:!1}},{key:`stroke`,value:{name:`string`,required:!1}}]}},{name:`null`}]}],raw:`Record<string, {
  fill?:      string;
  textColor?: string;
  stroke?:    string;
} | null>`},description:"Per-group color overrides keyed by group name — overrides `chartColors` for specific groups"},showGroupLabels:{required:!1,tsType:{name:`boolean`},description:`Show group name labels outside the arc ring (default: true)`,defaultValue:{value:`true`,computed:!1}},labelOffset:{required:!1,tsType:{name:`number`},description:`Gap between arc outer edge and label text in px (default: 8)`,defaultValue:{value:`8`,computed:!1}},ribbonOpacity:{required:!1,tsType:{name:`number`},description:`Opacity of ribbons — 0 to 1 (default: 0.75)`,defaultValue:{value:`0.75`,computed:!1}},ribbonBlendMode:{required:!1,tsType:{name:`ReactCSSProperties['mixBlendMode']`,raw:`React.CSSProperties['mixBlendMode']`},description:`CSS mix-blend-mode for ribbons (default: 'multiply')`},directed:{required:!1,tsType:{name:`boolean`},description:`When true, ribbons are directional arrows (default: true)`,defaultValue:{value:`true`,computed:!1}},valueDecimalCount:{required:!1,tsType:{name:`number`},description:`Decimal places for values in tooltip (default: 0)`,defaultValue:{value:`0`,computed:!1}},valueDecimalSeparator:{required:!1,tsType:{name:`string`},description:`Decimal separator (default: '.')`,defaultValue:{value:`"."`,computed:!1}},valueThousandsSeparator:{required:!1,tsType:{name:`string`},description:`Thousands separator (default: ',')`,defaultValue:{value:`","`,computed:!1}},valueFormatter:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number) => string`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`string`}}},description:"Custom formatter for all numeric values shown in tooltips. Overrides\n`valueDecimalCount`, `valueDecimalSeparator`, and `valueThousandsSeparator`.\nExample: `(v) => \\`${v.toLocaleString('de-DE')} kg\\``\n@since 3.22.0"},onGroupClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: ChordGroupInfo, event: React.MouseEvent<SVGGElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  /** Group name */
  name:     string;
  /** Zero-based index in the sorted names array */
  index:    number;
  /** Total outgoing flow from this group */
  valueOut: number;
  /** Total incoming flow into this group */
  valueIn:  number;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0},description:`Group name`},{key:`index`,value:{name:`number`,required:!0},description:`Zero-based index in the sorted names array`},{key:`valueOut`,value:{name:`number`,required:!0},description:`Total outgoing flow from this group`},{key:`valueIn`,value:{name:`number`,required:!0},description:`Total incoming flow into this group`}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGGElement>`,elements:[{name:`SVGGElement`}]},name:`event`}],return:{name:`void`}}},description:`Fired on click of a group arc`},onGroupHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: ChordGroupInfo | null, event: React.MouseEvent<SVGGElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`ChordGroupInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Group name */
  name:     string;
  /** Zero-based index in the sorted names array */
  index:    number;
  /** Total outgoing flow from this group */
  valueOut: number;
  /** Total incoming flow into this group */
  valueIn:  number;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0},description:`Group name`},{key:`index`,value:{name:`number`,required:!0},description:`Zero-based index in the sorted names array`},{key:`valueOut`,value:{name:`number`,required:!0},description:`Total outgoing flow from this group`},{key:`valueIn`,value:{name:`number`,required:!0},description:`Total incoming flow into this group`}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGGElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGGElement>`,elements:[{name:`SVGGElement`}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave a group arc — `null` on leave. Use for linked-view highlighting."},onChordClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: ChordInfo, event: React.MouseEvent<SVGPathElement>) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  source: { name: string; index: number; value: number };
  target: { name: string; index: number; value: number };
}`,signature:{properties:[{key:`source`,value:{name:`signature`,type:`object`,raw:`{ name: string; index: number; value: number }`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`index`,value:{name:`number`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]},required:!0}},{key:`target`,value:{name:`signature`,type:`object`,raw:`{ name: string; index: number; value: number }`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`index`,value:{name:`number`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]},required:!0}}]}},name:`info`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGPathElement>`,elements:[{name:`SVGPathElement`}]},name:`event`}],return:{name:`void`}}},description:`Fired on click of a ribbon`},onChordHover:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(info: ChordInfo | null, event: React.MouseEvent<SVGPathElement> | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`ChordInfo | null`,elements:[{name:`signature`,type:`object`,raw:`{
  source: { name: string; index: number; value: number };
  target: { name: string; index: number; value: number };
}`,signature:{properties:[{key:`source`,value:{name:`signature`,type:`object`,raw:`{ name: string; index: number; value: number }`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`index`,value:{name:`number`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]},required:!0}},{key:`target`,value:{name:`signature`,type:`object`,raw:`{ name: string; index: number; value: number }`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`index`,value:{name:`number`,required:!0}},{key:`value`,value:{name:`number`,required:!0}}]},required:!0}}]}},{name:`null`}]},name:`info`},{type:{name:`union`,raw:`React.MouseEvent<SVGPathElement> | null`,elements:[{name:`ReactMouseEvent`,raw:`React.MouseEvent<SVGPathElement>`,elements:[{name:`SVGPathElement`}]},{name:`null`}]},name:`event`}],return:{name:`void`}}},description:"Fired on mouse enter/leave a ribbon — `null` on leave. Use for linked-view highlighting."},zoomable:{required:!1,tsType:{name:`boolean`},description:"Enable Ctrl / Cmd ⌘ + Scroll visual zoom — clips content at `size` boundary (default: false)",defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:`Disables all interactions (default: false)`,defaultValue:{value:`false`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Shown when data is empty */
  noData: string;
}`,signature:{properties:[{key:`noData`,value:{name:`string`,required:!0},description:`Shown when data is empty`}]}}],raw:`Partial<ChordChartTranslation>`},description:`Override translation strings`}}}})),y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;e((()=>{v(),{fn:y,userEvent:b}=__STORYBOOK_MODULE_TEST__,x={title:`Components/ChordChart`,component:h,argTypes:{chartColors:{control:!1},data:{control:!1},directed:{control:`boolean`},disabled:{control:`boolean`},groupColorConfigs:{control:!1},innerRadius:{control:`number`},labelOffset:{control:`number`},padAngle:{control:!1},ribbonBlendMode:{control:`text`},ribbonOpacity:{control:{type:`range`,min:0,max:1,step:.05}},ribbonPadAngle:{control:!1},ringThickness:{control:`number`},showGroupLabels:{control:`boolean`},size:{control:`number`},sortChords:{control:`radio`,options:[`ascending`,`descending`,`none`]},sortSubgroups:{control:`radio`,options:[`ascending`,`descending`,`none`]},translation:{control:!1},valueDecimalCount:{control:`number`},valueDecimalSeparator:{control:`text`},valueThousandsSeparator:{control:`text`},zoomable:{control:`boolean`},onChordClick:{control:!1},onGroupClick:{control:!1},valueFormatter:{control:!1}},args:{directed:!0,disabled:!1,innerRadius:160,labelOffset:8,ribbonBlendMode:`multiply`,ribbonOpacity:.75,ringThickness:20,showGroupLabels:!0,size:500,sortChords:`descending`,sortSubgroups:`descending`,valueDecimalCount:0,valueDecimalSeparator:`.`,valueThousandsSeparator:`,`,zoomable:!1,onChordClick:y(),onChordHover:y(),onGroupClick:y(),onGroupHover:y()},parameters:{controls:{sort:`alpha`}}},S=[{source:`Frontend`,target:`Backend`,value:45},{source:`Frontend`,target:`Design`,value:30},{source:`Backend`,target:`Frontend`,value:20},{source:`Backend`,target:`DevOps`,value:35},{source:`Backend`,target:`Data`,value:25},{source:`Design`,target:`Frontend`,value:18},{source:`DevOps`,target:`Backend`,value:12},{source:`DevOps`,target:`Data`,value:20},{source:`Data`,target:`Backend`,value:30},{source:`Data`,target:`Analytics`,value:40},{source:`Analytics`,target:`Frontend`,value:22},{source:`Analytics`,target:`Data`,value:28}],C={parameters:{docs:{description:{story:"Chord chart showing team dependency flows. **Hover** any arc group to highlight its ribbons and dim the rest. **Click** a group arc → `onGroupClick` with `{ name, valueOut, valueIn }`. **Click** a ribbon → `onChordClick` with `{ source, target }`. Tooltip appears near the cursor with name and flow values. This story auto-hovers the first group so you can see the highlight effect immediately."}}},args:{data:S},play:async({canvasElement:e})=>{let t=e.querySelector(`g[style*='cursor']`);t&&await b.hover(t)}},w={parameters:{docs:{description:{story:"`directed={false}` — ribbons are symmetric (no arrowheads). Use for bidirectional relationships where direction is irrelevant."}}},args:{data:S,directed:!1}},T={parameters:{docs:{description:{story:"`showGroupLabels={false}` hides the text labels outside the arc ring. Full group names still appear in the tooltip on hover."}}},args:{data:S,showGroupLabels:!1}},E={parameters:{docs:{description:{story:"`chartColors` overrides the default MUI-theme palette. Colors are assigned to groups in sorted order and repeat cyclically."}}},args:{data:S,chartColors:[`#1565C0`,`#6A1B9A`,`#00695C`,`#E65100`,`#AD1457`,`#37474F`]}},D={parameters:{docs:{description:{story:"`groupColorConfigs` maps **group names** to color overrides — more granular than `chartColors`. Each group can have its own `fill` color while others fall back to the palette. Ribbons automatically use the target group's color."}}},args:{data:S,groupColorConfigs:{Frontend:{fill:`#1565C0`},Backend:{fill:`#0D47A1`},Design:{fill:`#6A1B9A`},DevOps:{fill:`#00695C`},Data:{fill:`#E65100`},Analytics:{fill:`#AD1457`}}}},O={parameters:{docs:{description:{story:"`disabled={true}` mutes all interactions (hover highlight, click callbacks) and reduces opacity to 0.5."}}},args:{data:S,disabled:!0}},k={parameters:{docs:{description:{story:'When `data` is an empty array, the chart renders the `translation.noData` message (default `"No data"`) centered in the SVG instead of an empty ring. Override it via `translation={{ noData: "..." }}`.'}}},args:{data:[],translation:{noData:`Nothing to show yet`}}},A=[{source:`China`,target:`USA`,value:536},{source:`USA`,target:`China`,value:154},{source:`China`,target:`EU`,value:472},{source:`EU`,target:`China`,value:230},{source:`USA`,target:`EU`,value:350},{source:`EU`,target:`USA`,value:380},{source:`China`,target:`Japan`,value:165},{source:`Japan`,target:`China`,value:142},{source:`USA`,target:`Mexico`,value:290},{source:`Mexico`,target:`USA`,value:310},{source:`EU`,target:`Japan`,value:88},{source:`Japan`,target:`EU`,value:76},{source:`China`,target:`Mexico`,value:45}],j={parameters:{docs:{description:{story:"`valueFormatter` replaces the built-in `valueDecimalCount`/`valueDecimalSeparator` formatting for all numbers shown in tooltips — here trade flows are displayed in billions with a `$` prefix."}}},args:{valueFormatter:e=>`$${e.toFixed(1)} B`}},M={parameters:{docs:{description:{story:`**Real-world use case: bilateral trade flows in $B between major economies.** A classic chord diagram application — visualizing import/export volume between countries or regions. Hover "China" to see at a glance which partners dominate its trade, both incoming and outgoing.`}}},args:{data:A,valueDecimalCount:0,valueThousandsSeparator:`,`,sortChords:`descending`}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Chord chart showing team dependency flows. **Hover** any arc group to highlight its ribbons and dim the rest. ' + '**Click** a group arc → \`onGroupClick\` with \`{ name, valueOut, valueIn }\`. ' + '**Click** a ribbon → \`onChordClick\` with \`{ source, target }\`. ' + 'Tooltip appears near the cursor with name and flow values. ' + 'This story auto-hovers the first group so you can see the highlight effect immediately.'
      }
    }
  },
  args: {
    data: TEAM_DATA
  },
  play: async ({
    canvasElement
  }) => {
    const firstGroup = canvasElement.querySelector<SVGGElement>("g[style*='cursor']");
    if (firstGroup) await userEvent.hover(firstGroup);
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`directed={false}\` — ribbons are symmetric (no arrowheads). ' + 'Use for bidirectional relationships where direction is irrelevant.'
      }
    }
  },
  args: {
    data: TEAM_DATA,
    directed: false
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showGroupLabels={false}\` hides the text labels outside the arc ring. ' + 'Full group names still appear in the tooltip on hover.'
      }
    }
  },
  args: {
    data: TEAM_DATA,
    showGroupLabels: false
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`chartColors\` overrides the default MUI-theme palette. Colors are assigned to groups in sorted order and repeat cyclically.'
      }
    }
  },
  args: {
    data: TEAM_DATA,
    chartColors: ["#1565C0", "#6A1B9A", "#00695C", "#E65100", "#AD1457", "#37474F"]
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`groupColorConfigs\` maps **group names** to color overrides — more granular than \`chartColors\`. ' + 'Each group can have its own \`fill\` color while others fall back to the palette. ' + 'Ribbons automatically use the target group\\'s color.'
      }
    }
  },
  args: {
    data: TEAM_DATA,
    groupColorConfigs: {
      "Frontend": {
        fill: "#1565C0"
      },
      // brand blue
      "Backend": {
        fill: "#0D47A1"
      },
      // darker blue
      "Design": {
        fill: "#6A1B9A"
      },
      // brand purple
      "DevOps": {
        fill: "#00695C"
      },
      // brand teal
      "Data": {
        fill: "#E65100"
      },
      // brand orange
      "Analytics": {
        fill: "#AD1457"
      } // brand pink
      // "Sales" has no entry → uses default palette color
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`disabled={true}\` mutes all interactions (hover highlight, click callbacks) and reduces opacity to 0.5.'
      }
    }
  },
  args: {
    data: TEAM_DATA,
    disabled: true
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'When \`data\` is an empty array, the chart renders the \`translation.noData\` message ' + '(default \`"No data"\`) centered in the SVG instead of an empty ring. ' + 'Override it via \`translation={{ noData: "..." }}\`.'
      }
    }
  },
  args: {
    data: [],
    translation: {
      noData: "Nothing to show yet"
    }
  }
}`,...k.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`valueFormatter\` replaces the built-in \`valueDecimalCount\`/\`valueDecimalSeparator\` formatting " + "for all numbers shown in tooltips — here trade flows are displayed in billions with a \`$\` prefix."
      }
    }
  },
  args: {
    valueFormatter: v => \`$\${v.toFixed(1)} B\`
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: bilateral trade flows in $B between major economies.** ' + 'A classic chord diagram application — visualizing import/export volume between countries or regions. ' + 'Hover "China" to see at a glance which partners dominate its trade, both incoming and outgoing.'
      }
    }
  },
  args: {
    data: TRADE_DATA,
    valueDecimalCount: 0,
    valueThousandsSeparator: ",",
    sortChords: "descending"
  }
}`,...M.parameters?.docs?.source}}},N=[`Default`,`Undirected`,`NoLabels`,`CustomPalette`,`WithColorConfig`,`Disabled`,`EmptyData`,`WithValueFormatter`,`TradeRelationships`]}))();export{E as CustomPalette,C as Default,O as Disabled,k as EmptyData,T as NoLabels,M as TradeRelationships,w as Undirected,D as WithColorConfig,j as WithValueFormatter,N as __namedExportsOrder,x as default};