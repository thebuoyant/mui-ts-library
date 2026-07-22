import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{B as n,L as r,Q as i,U as a,V as o,W as s,Z as c,a as l,c as u,i as d,m as ee,s as te,t as f}from"./iframe-Bb8mcAY9.js";import{n as p,t as m}from"./muiTsClasses-B0c6njAh.js";import{i as h,n as ne,r as g,t as _}from"./esm-cz_NIqIn.js";import{n as re,t as ie}from"./Check-vwhw-nWw.js";import{n as v,t as ae}from"./Close-_25kxp1f.js";var y,b=e((()=>{y={root:`MuiTsTagSelection-root`,selectedTags:`MuiTsTagSelection-selectedTags`,selectedTagsLabel:`MuiTsTagSelection-selectedTagsLabel`,chipsStack:`MuiTsTagSelection-chipsStack`,chip:`MuiTsTagSelection-chip`,overflowChip:`MuiTsTagSelection-overflowChip`,overflowPopover:`MuiTsTagSelection-overflowPopover`,autocomplete:`MuiTsTagSelection-autocomplete`,option:`MuiTsTagSelection-option`,createPanel:`MuiTsTagSelection-createPanel`}}));function oe(e){return g(t=>({tags:e,searchValue:``,setTags:e=>{t({tags:e})},setSearchValue:e=>{t({searchValue:e})},selectTag:e=>{t(t=>({tags:t.tags.map(t=>t.id===e&&!t.disabled?{...t,selected:!0}:t),searchValue:``}))},deleteTag:e=>{t(t=>({tags:t.tags.map(t=>t.id===e?{...t,selected:!1}:t)}))},addTag:e=>{t(t=>({tags:[...t.tags,{...e,selected:!0}],searchValue:``}))}}))}var x=e((()=>{h()}));function se(e){return/^#[0-9A-Fa-f]{6}$/.test(e)}function ce(e){let t=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16);return(.299*t+.587*n+.114*r)/255>.5?`#000000`:`#ffffff`}function le(e,t){let n=t.trim();if(!n)return e;let r=e.toLowerCase().indexOf(n.toLowerCase());return r===-1?e:(0,w.jsxs)(w.Fragment,{children:[e.slice(0,r),(0,w.jsx)(`strong`,{children:e.slice(r,r+n.length)}),e.slice(r+n.length)]})}function ue({color:e,selected:t,onClick:n}){return(0,w.jsx)(r,{onClick:n,sx:{width:24,height:24,borderRadius:.5,backgroundColor:e,cursor:`pointer`,border:`2px solid`,borderColor:t?`primary.main`:`transparent`,outline:t?`1px solid`:`none`,outlineColor:`primary.main`,outlineOffset:1,flexShrink:0,"&:hover":{transform:`scale(1.2)`,borderColor:`primary.main`},transition:`transform 0.1s`}})}function de({value:e,onChange:t,disabled:n=!1}){return(0,w.jsx)(d,{size:`small`,fullWidth:!0,value:e,onChange:e=>t(e.target.value),placeholder:`#rrggbb`,disabled:n,error:!n&&e.length>1&&!se(e),sx:{"& .MuiInputBase-root":{height:28},"& .MuiInputBase-input":{py:0,px:.5,fontSize:`0.72rem`,fontFamily:`monospace`}},slotProps:{input:{startAdornment:(0,w.jsx)(r,{sx:{width:12,height:12,borderRadius:.25,flexShrink:0,mr:.5,backgroundColor:se(e)?e:`action.disabledBackground`,border:`1px solid`,borderColor:`divider`}})}}})}function S({availableTags:e,searchValue:t,translation:i,onSearchChange:c,onTagSelect:ee,onTagCreate:f,inputSize:p=`medium`,chipSize:m=`medium`,chipVariant:h=`filled`,disabled:ne=!1,loading:g=!1,isMaxReached:_=!1,allowCreate:re=!1,listboxMaxHeight:v,serverSideFilter:b=!1}){let[oe,x]=(0,C.useState)(`default`),[S,T]=(0,C.useState)(null),[E,D]=(0,C.useState)(null),[O,me]=(0,C.useState)(!0),[he,k]=(0,C.useState)(!1),[ge,_e]=(0,C.useState)(!1),[ve,A]=(0,C.useState)(`#1976d2`),[ye,j]=(0,C.useState)(`#ffffff`),M=ne||_,N=S!==null,be=b?e:e.filter(e=>e.label.toLowerCase().includes(t.trim().toLowerCase())),P=re&&t.trim()!==``&&be.length===0,xe=ge&&!P,Se=N?O?ce(S):E??`#000000`:void 0,Ce=()=>{if(M)return;let e=t.trim(),n=e.toLowerCase().replace(/\s+/g,`-`);f?.(N&&S?{id:n,label:e,selected:!0,color:`default`,backgroundColor:S,foregroundColor:Se}:{id:n,label:e,selected:!0,color:oe}),x(`default`),T(null),D(null),me(!0),k(!1),c(``)},we=()=>{c(``),x(`default`),T(null),D(null),me(!0),k(!1)},Te=e=>{T(e),A(e),x(`default`)},Ee=e=>{A(e),se(e)&&(T(e),x(`default`))},F=e=>{D(e),j(e)},I=e=>{j(e),se(e)&&D(e)},L=e=>{if(me(e),e)D(null);else if(S){let e=ce(S);D(e),j(e)}},R=e=>e.preventDefault();return(0,w.jsxs)(r,{sx:{mb:2},className:y.autocomplete,children:[(0,w.jsx)(n,{options:e,filterOptions:b?e=>e:void 0,value:null,open:xe,onOpen:()=>{P||_e(!0)},onClose:()=>_e(!1),size:p,disabled:M,loading:g,getOptionLabel:e=>e.label,inputValue:t,onInputChange:(e,t,n)=>{n===`input`&&c(t)},onChange:(e,t)=>{t&&ee(t)},slotProps:{listbox:{sx:{display:`flex`,flexWrap:`wrap`,gap:1,padding:1,...v!==void 0&&{maxHeight:v,overflowY:`auto`}}}},renderInput:e=>(0,w.jsx)(d,{...e,label:i.autoCompleteLabel,placeholder:i.placeholder,helperText:_&&!ne?i.maxTagsReachedText:void 0,onKeyDown:e=>{P&&!M&&e.key===`Enter`&&(e.preventDefault(),Ce())},slotProps:{...e.slotProps,input:{...e.slotProps?.input,endAdornment:(0,w.jsxs)(w.Fragment,{children:[P&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{size:`small`,sx:{color:`success.main`},onMouseDown:R,onClick:Ce,disabled:M,"aria-label":i.confirmCreateLabel,children:(0,w.jsx)(ie,{fontSize:`small`})}),(0,w.jsx)(s,{size:`small`,onMouseDown:R,onClick:we,"aria-label":i.cancelCreateLabel,children:(0,w.jsx)(ae,{fontSize:`small`})})]}),e.slotProps?.input?.endAdornment]})}}}),renderOption:({key:e,...n},r)=>{let i=!!(r.foregroundColor||r.backgroundColor);return(0,w.jsx)(`li`,{...n,style:{width:`auto`,padding:0,margin:0},children:(0,w.jsx)(o,{size:m,variant:h,label:le(r.label,t),color:i?void 0:r.color??`default`,className:y.option,sx:i?{color:r.foregroundColor??`inherit`,backgroundColor:r.backgroundColor??`transparent`}:void 0})},e)},isOptionEqualToValue:(e,t)=>e.id===t.id,noOptionsText:i.noAvailableTagsText,loadingText:i.loadingText}),P&&(0,w.jsxs)(r,{sx:{position:`relative`},onMouseDown:R,className:y.createPanel,children:[(0,w.jsxs)(te,{direction:`row`,sx:{mt:.5,flexWrap:`wrap`,gap:.5,alignItems:`center`},children:[fe.map(e=>(0,w.jsx)(o,{size:m,color:e,label:e,variant:!N&&oe===e?`filled`:`outlined`,onClick:()=>{x(e),T(null),D(null),k(!1)},clickable:!0},e)),(0,w.jsx)(u,{title:i.colorPickerLabel,children:(0,w.jsx)(o,{size:m,label:N?S:`···`,variant:`outlined`,onClick:()=>{k(e=>!e),S&&A(S),E&&j(E)},sx:e=>({cursor:`pointer`,fontFamily:`monospace`,fontSize:`0.7rem`,...N?{backgroundColor:S,color:Se,border:`1.5px solid transparent`,backgroundImage:`linear-gradient(${S}, ${S}), linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)`,backgroundOrigin:`border-box`,backgroundClip:`padding-box, border-box`}:{border:`1.5px solid transparent`,backgroundImage:`linear-gradient(${e.palette.background.paper}, ${e.palette.background.paper}), linear-gradient(90deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)`,backgroundOrigin:`border-box`,backgroundClip:`padding-box, border-box`}}),clickable:!0})})]}),he&&(0,w.jsx)(r,{sx:{position:`absolute`,top:`calc(100% + 4px)`,left:0,zIndex:1400,backgroundColor:`background.paper`,border:`1px solid`,borderColor:`divider`,borderRadius:1,boxShadow:8,p:1.25,width:`max-content`},children:(0,w.jsxs)(r,{sx:{display:`grid`,gridTemplateColumns:`auto auto`,gap:2},children:[(0,w.jsxs)(r,{children:[(0,w.jsx)(a,{variant:`caption`,sx:{fontWeight:700,color:`text.primary`,display:`block`,mb:.5},children:i.backgroundColorLabel}),(0,w.jsxs)(r,{sx:{display:`grid`,gridTemplateColumns:`repeat(5, 24px)`,gap:.5},children:[pe.map(e=>(0,w.jsx)(ue,{color:e,selected:S===e,onClick:()=>Te(e)},e)),(0,w.jsx)(r,{sx:{gridColumn:`span 5`,mt:.25},children:(0,w.jsx)(de,{value:ve,onChange:Ee})})]})]}),(0,w.jsxs)(r,{children:[(0,w.jsx)(a,{variant:`caption`,sx:{fontWeight:700,color:`text.primary`,display:`block`,mb:.5},children:i.textColorLabel}),(0,w.jsxs)(r,{sx:{display:`grid`,gridTemplateColumns:`repeat(5, 24px)`,gap:.5,opacity:O?.3:1,pointerEvents:O?`none`:`auto`,transition:`opacity 0.15s`},children:[pe.map(e=>(0,w.jsx)(ue,{color:e,selected:E===e,onClick:()=>F(e)},e)),(0,w.jsx)(r,{sx:{gridColumn:`span 5`,mt:.25},children:(0,w.jsx)(de,{value:O?Se??`#000000`:ye,onChange:I,disabled:O})})]}),(0,w.jsxs)(te,{direction:`row`,sx:{width:`100%`,alignItems:`center`,justifyContent:`flex-end`,gap:.5,mt:.25},children:[(0,w.jsx)(a,{variant:`caption`,color:`text.secondary`,children:i.autoTextColorLabel}),(0,w.jsx)(l,{size:`small`,checked:O,onChange:e=>L(e.target.checked)})]})]})]})})]})]})}var C,w,fe,pe,T=e((()=>{f(),re(),v(),C=t(i(),1),b(),w=c(),fe=[`default`,`primary`,`secondary`,`error`,`info`,`success`,`warning`],pe=[`#f44336`,`#e91e63`,`#9c27b0`,`#673ab7`,`#3f51b5`,`#2196f3`,`#03a9f4`,`#00bcd4`,`#009688`,`#4caf50`,`#8bc34a`,`#cddc39`,`#ffeb3b`,`#ffc107`,`#ff9800`,`#ff5722`,`#795548`,`#9e9e9e`,`#607d8b`,`#000000`],S.__docgenInfo={description:``,methods:[],displayName:`TagSelectionAutocomplete`,props:{inputSize:{required:!1,tsType:{name:`union`,raw:`"medium" | "small"`,elements:[{name:`literal`,value:`"medium"`},{name:`literal`,value:`"small"`}]},description:``,defaultValue:{value:`"medium"`,computed:!1}},chipSize:{required:!1,tsType:{name:`union`,raw:`"medium" | "small"`,elements:[{name:`literal`,value:`"medium"`},{name:`literal`,value:`"small"`}]},description:``,defaultValue:{value:`"medium"`,computed:!1}},chipVariant:{required:!1,tsType:{name:`union`,raw:`"filled" | "outlined"`,elements:[{name:`literal`,value:`"filled"`},{name:`literal`,value:`"outlined"`}]},description:``,defaultValue:{value:`"filled"`,computed:!1}},availableTags:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},description:``},searchValue:{required:!0,tsType:{name:`string`},description:``},translation:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  selectedTagsLabel: string;
  autoCompleteLabel: string;
  noSelectedTagsText: string;
  noAvailableTagsText: string;
  placeholder: string;
  loadingText: string;
  maxTagsReachedText: string;
  colorPickerLabel: string;
  backgroundColorLabel: string;
  textColorLabel: string;
  autoTextColorLabel: string;
  /** @since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed. */
  confirmCreateLabel?: string;
  /** @since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed. */
  cancelCreateLabel?: string;
}`,signature:{properties:[{key:`selectedTagsLabel`,value:{name:`string`,required:!0}},{key:`autoCompleteLabel`,value:{name:`string`,required:!0}},{key:`noSelectedTagsText`,value:{name:`string`,required:!0}},{key:`noAvailableTagsText`,value:{name:`string`,required:!0}},{key:`placeholder`,value:{name:`string`,required:!0}},{key:`loadingText`,value:{name:`string`,required:!0}},{key:`maxTagsReachedText`,value:{name:`string`,required:!0}},{key:`colorPickerLabel`,value:{name:`string`,required:!0}},{key:`backgroundColorLabel`,value:{name:`string`,required:!0}},{key:`textColorLabel`,value:{name:`string`,required:!0}},{key:`autoTextColorLabel`,value:{name:`string`,required:!0}},{key:`confirmCreateLabel`,value:{name:`string`,required:!1},description:`@since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed.`},{key:`cancelCreateLabel`,value:{name:`string`,required:!1},description:`@since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed.`}]}}],raw:`Required<TagSelectionTranslation>`},description:``},onSearchChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},onTagSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(tag: TagSelectionItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`}],return:{name:`void`}}},description:``},onTagCreate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tag: TagSelectionItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`}],return:{name:`void`}}},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},isMaxReached:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},allowCreate:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},listboxMaxHeight:{required:!1,tsType:{name:`number`},description:``},serverSideFilter:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}}));function E({tag:e,onDelete:t,onClick:n,chipSize:r=`medium`,chipVariant:i=`filled`,disabled:a=!1}){let s=!!(e.foregroundColor||e.backgroundColor),c=a||e.disabled;return(0,D.jsx)(o,{size:r,label:e.label,onDelete:t?()=>t(e):void 0,onClick:n?()=>n(e):void 0,clickable:!!n&&!e.disabled&&!a,disabled:c,variant:i,color:s?void 0:e.color??`default`,className:[y.chip,c&&p.disabled].filter(Boolean).join(` `),sx:{...s&&{color:e.foregroundColor??`inherit`,backgroundColor:e.backgroundColor??`transparent`,borderColor:e.backgroundColor??void 0,"& .MuiChip-deleteIcon":{color:e.foregroundColor?`${e.foregroundColor}99`:`inherit`,"&:hover":{color:e.foregroundColor??`inherit`}}},cursor:n&&!e.disabled&&!c?`pointer`:`default`}})}var D,O=e((()=>{f(),b(),m(),D=c(),E.__docgenInfo={description:``,methods:[],displayName:`TagSelectionChip`,props:{tag:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},description:``},onDelete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tag: TagSelectionItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`}],return:{name:`void`}}},description:``},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tag: TagSelectionItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`}],return:{name:`void`}}},description:``},chipSize:{required:!1,tsType:{name:`union`,raw:`"small" | "medium"`,elements:[{name:`literal`,value:`"small"`},{name:`literal`,value:`"medium"`}]},description:``,defaultValue:{value:`"medium"`,computed:!1}},chipVariant:{required:!1,tsType:{name:`union`,raw:`"filled" | "outlined"`,elements:[{name:`literal`,value:`"filled"`},{name:`literal`,value:`"outlined"`}]},description:``,defaultValue:{value:`"filled"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}}));function me({selectedTags:e,translation:t,onTagDelete:n,showSelectedTagsLabel:i,chipSize:s=`medium`,chipVariant:c=`filled`,disabled:l=!1,maxVisibleChips:u,popoverPlacement:d=`bottom`}){let[f,p]=(0,he.useState)(null),m=u===void 0?e:e.slice(0,u),h=u===void 0?[]:e.slice(u),ne=!!f&&h.length>0,g=d===`top`?{vertical:`top`,horizontal:`left`}:{vertical:`bottom`,horizontal:`left`},_=d===`top`?{vertical:`bottom`,horizontal:`left`}:{vertical:`top`,horizontal:`left`};return(0,k.jsxs)(r,{sx:{mb:2},className:y.selectedTags,children:[i&&(0,k.jsx)(a,{variant:`subtitle2`,gutterBottom:!0,className:y.selectedTagsLabel,children:t.selectedTagsLabel}),e.length===0?(0,k.jsx)(a,{variant:`body2`,color:`text.secondary`,children:t.noSelectedTagsText}):(0,k.jsxs)(te,{direction:`row`,sx:{flexWrap:`wrap`,gap:1},className:y.chipsStack,children:[m.map(e=>(0,k.jsx)(E,{tag:e,onDelete:n,chipSize:s,chipVariant:c,disabled:l},e.id)),h.length>0&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{size:s,label:`+${h.length}`,variant:`outlined`,clickable:!0,onClick:e=>p(e.currentTarget),className:y.overflowChip}),(0,k.jsx)(ee,{open:ne,anchorEl:f,onClose:()=>p(null),anchorOrigin:g,transformOrigin:_,children:(0,k.jsx)(r,{sx:{p:1,display:`flex`,flexWrap:`wrap`,gap:.5,maxWidth:320},className:y.overflowPopover,children:h.map(e=>(0,k.jsx)(E,{tag:e,onDelete:l?void 0:n,chipSize:s,chipVariant:c,disabled:l},e.id))})})]})]})]})}var he,k,ge=e((()=>{f(),he=t(i(),1),O(),b(),k=c(),me.__docgenInfo={description:``,methods:[],displayName:`TagSelectionSelectedTags`,props:{selectedTags:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},description:``},translation:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  selectedTagsLabel: string;
  autoCompleteLabel: string;
  noSelectedTagsText: string;
  noAvailableTagsText: string;
  placeholder: string;
  loadingText: string;
  maxTagsReachedText: string;
  colorPickerLabel: string;
  backgroundColorLabel: string;
  textColorLabel: string;
  autoTextColorLabel: string;
  /** @since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed. */
  confirmCreateLabel?: string;
  /** @since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed. */
  cancelCreateLabel?: string;
}`,signature:{properties:[{key:`selectedTagsLabel`,value:{name:`string`,required:!0}},{key:`autoCompleteLabel`,value:{name:`string`,required:!0}},{key:`noSelectedTagsText`,value:{name:`string`,required:!0}},{key:`noAvailableTagsText`,value:{name:`string`,required:!0}},{key:`placeholder`,value:{name:`string`,required:!0}},{key:`loadingText`,value:{name:`string`,required:!0}},{key:`maxTagsReachedText`,value:{name:`string`,required:!0}},{key:`colorPickerLabel`,value:{name:`string`,required:!0}},{key:`backgroundColorLabel`,value:{name:`string`,required:!0}},{key:`textColorLabel`,value:{name:`string`,required:!0}},{key:`autoTextColorLabel`,value:{name:`string`,required:!0}},{key:`confirmCreateLabel`,value:{name:`string`,required:!1},description:`@since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed.`},{key:`cancelCreateLabel`,value:{name:`string`,required:!1},description:`@since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed.`}]}}],raw:`Required<TagSelectionTranslation>`},description:``},onTagDelete:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(tag: TagSelectionItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`}],return:{name:`void`}}},description:``},showSelectedTagsLabel:{required:!0,tsType:{name:`boolean`},description:``},chipSize:{required:!1,tsType:{name:`union`,raw:`"small" | "medium"`,elements:[{name:`literal`,value:`"small"`},{name:`literal`,value:`"medium"`}]},description:``,defaultValue:{value:`"medium"`,computed:!1}},chipVariant:{required:!1,tsType:{name:`union`,raw:`"filled" | "outlined"`,elements:[{name:`literal`,value:`"filled"`},{name:`literal`,value:`"outlined"`}]},description:``,defaultValue:{value:`"filled"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},maxVisibleChips:{required:!1,tsType:{name:`number`},description:``},popoverPlacement:{required:!1,tsType:{name:`union`,raw:`"top" | "bottom"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"bottom"`}]},description:``,defaultValue:{value:`"bottom"`,computed:!1}}}}})),_e,ve=e((()=>{_e={selectedTagsLabel:`Selected tags`,autoCompleteLabel:`Search and add tags`,noSelectedTagsText:`No tags selected.`,noAvailableTagsText:`No tags available.`,placeholder:`Type to search...`,loadingText:`Loading...`,maxTagsReachedText:`Maximum number of tags reached.`,colorPickerLabel:`Custom color`,backgroundColorLabel:`Background color`,textColorLabel:`Text color`,autoTextColorLabel:`Auto`,confirmCreateLabel:`Confirm new tag`,cancelCreateLabel:`Cancel new tag`}}));function A(e){let t=(0,M.useContext)(be);if(!t)throw Error(`TagSelectionStoreContext is missing.`);return ne(t,e)}function ye({tags:e,showSelectedTags:t=!0,showSelectedTagsLabel:n=!0,showAutoComplete:i=!0,inputSize:a=`medium`,chipSize:o=`small`,chipVariant:s=`filled`,disabled:c=!1,loading:l=!1,maxTags:u,allowCreate:d=!1,maxVisibleChips:ee,popoverPlacement:f=`bottom`,listboxMaxHeight:m,searchDebounceMs:h,serverSideFilter:ne=!1,translation:g,onTagSelect:_,onTagDelete:re,onTagsChange:ie,onSearchChange:v,onTagCreate:ae}){let b=A(e=>e.tags),oe=A(e=>e.searchValue),x=A(e=>e.setTags),se=A(e=>e.setSearchValue),ce=A(e=>e.selectTag),le=A(e=>e.deleteTag),ue=A(e=>e.addTag);(0,M.useEffect)(()=>{x(e)},[e,x]);let de=(0,M.useMemo)(()=>b.filter(e=>e.selected).sort((e,t)=>e.label.localeCompare(t.label)),[b]),C=(0,M.useMemo)(()=>b.filter(e=>!e.selected&&!e.disabled).sort((e,t)=>e.label.localeCompare(t.label)),[b]),w=u!==void 0&&de.length>=u,fe=e=>{ie&&ie(e.filter(e=>e.selected),e)},pe=e=>{if(e.disabled||e.selected)return;ce(e.id);let t=b.map(t=>t.id===e.id?{...t,selected:!0}:t),n=t.filter(e=>e.selected),r=t.find(t=>t.id===e.id);r&&_&&_(r,n,t),fe(t)},T=e=>{le(e.id);let t=b.map(t=>t.id===e.id?{...t,selected:!1}:t),n=t.filter(e=>e.selected),r=t.find(t=>t.id===e.id);r&&re&&re(r,n,t),fe(t)},E=(0,M.useRef)(null);return(0,M.useEffect)(()=>()=>{E.current&&clearTimeout(E.current)},[]),(0,N.jsx)(r,{sx:{width:`100%`},className:[y.root,c&&p.disabled].filter(Boolean).join(` `),children:(0,N.jsxs)(te,{children:[t&&(0,N.jsx)(me,{selectedTags:de,translation:g,onTagDelete:T,showSelectedTagsLabel:n,chipSize:o,chipVariant:s,disabled:c,maxVisibleChips:ee,popoverPlacement:f}),i&&(0,N.jsx)(S,{availableTags:C,searchValue:oe,translation:g,onSearchChange:e=>{if(se(e),v){if(E.current&&=(clearTimeout(E.current),null),!h){v(e);return}E.current=setTimeout(()=>{v(e),E.current=null},h)}},onTagSelect:pe,onTagCreate:e=>{ue(e),fe([...b,e]),ae&&ae(e)},inputSize:a,chipSize:o,chipVariant:s,disabled:c,loading:l,isMaxReached:w,allowCreate:d,listboxMaxHeight:m,serverSideFilter:ne})]})})}function j({tags:e,showSelectedTags:t=!0,showSelectedTagsLabel:n=!0,showAutoComplete:r=!0,translation:i,inputSize:a=`medium`,chipSize:o=`small`,chipVariant:s=`filled`,disabled:c=!1,loading:l=!1,maxTags:u,allowCreate:d=!1,maxVisibleChips:ee,popoverPlacement:te=`bottom`,listboxMaxHeight:f,searchDebounceMs:p,serverSideFilter:m=!1,onTagSelect:h,onTagDelete:ne,onTagsChange:g,onSearchChange:_,onTagCreate:re}){let ie={..._e,...i},[v]=(0,M.useState)(()=>oe(e));return(0,N.jsx)(be.Provider,{value:v,children:(0,N.jsx)(ye,{tags:e,showSelectedTags:t,showSelectedTagsLabel:n,showAutoComplete:r,translation:ie,inputSize:a,chipSize:o,chipVariant:s,disabled:c,loading:l,maxTags:u,allowCreate:d,maxVisibleChips:ee,popoverPlacement:te,listboxMaxHeight:f,searchDebounceMs:p,serverSideFilter:m,onTagSelect:h,onTagDelete:ne,onTagsChange:g,onSearchChange:_,onTagCreate:re})})}var M,N,be,P=e((()=>{M=t(i(),1),f(),_(),b(),m(),x(),T(),ge(),ve(),N=c(),be=(0,M.createContext)(null),j.__docgenInfo={description:``,methods:[],displayName:`TagSelection`,props:{allowCreate:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},chipSize:{required:!1,tsType:{name:`union`,raw:`"small" | "medium"`,elements:[{name:`literal`,value:`"small"`},{name:`literal`,value:`"medium"`}]},description:``,defaultValue:{value:`"small"`,computed:!1}},chipVariant:{required:!1,tsType:{name:`union`,raw:`"filled" | "outlined"`,elements:[{name:`literal`,value:`"filled"`},{name:`literal`,value:`"outlined"`}]},description:"Controls the MUI Chip variant for selected tag chips and autocomplete option chips.\nUseful for consumers with a custom design system that prefer `outlined` chips.\nDefault: `'filled'`.\n@since 3.21.0",defaultValue:{value:`"filled"`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},inputSize:{required:!1,tsType:{name:`union`,raw:`"small" | "medium"`,elements:[{name:`literal`,value:`"small"`},{name:`literal`,value:`"medium"`}]},description:``,defaultValue:{value:`"medium"`,computed:!1}},listboxMaxHeight:{required:!1,tsType:{name:`number`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},maxTags:{required:!1,tsType:{name:`number`},description:``},maxVisibleChips:{required:!1,tsType:{name:`number`},description:``},popoverPlacement:{required:!1,tsType:{name:`union`,raw:`"top" | "bottom"`,elements:[{name:`literal`,value:`"top"`},{name:`literal`,value:`"bottom"`}]},description:``,defaultValue:{value:`"bottom"`,computed:!1}},searchDebounceMs:{required:!1,tsType:{name:`number`},description:``},serverSideFilter:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showAutoComplete:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showSelectedTags:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showSelectedTagsLabel:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},tags:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},description:``},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  selectedTagsLabel: string;
  autoCompleteLabel: string;
  noSelectedTagsText: string;
  noAvailableTagsText: string;
  placeholder: string;
  loadingText: string;
  maxTagsReachedText: string;
  colorPickerLabel: string;
  backgroundColorLabel: string;
  textColorLabel: string;
  autoTextColorLabel: string;
  /** @since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed. */
  confirmCreateLabel?: string;
  /** @since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed. */
  cancelCreateLabel?: string;
}`,signature:{properties:[{key:`selectedTagsLabel`,value:{name:`string`,required:!0}},{key:`autoCompleteLabel`,value:{name:`string`,required:!0}},{key:`noSelectedTagsText`,value:{name:`string`,required:!0}},{key:`noAvailableTagsText`,value:{name:`string`,required:!0}},{key:`placeholder`,value:{name:`string`,required:!0}},{key:`loadingText`,value:{name:`string`,required:!0}},{key:`maxTagsReachedText`,value:{name:`string`,required:!0}},{key:`colorPickerLabel`,value:{name:`string`,required:!0}},{key:`backgroundColorLabel`,value:{name:`string`,required:!0}},{key:`textColorLabel`,value:{name:`string`,required:!0}},{key:`autoTextColorLabel`,value:{name:`string`,required:!0}},{key:`confirmCreateLabel`,value:{name:`string`,required:!1},description:`@since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed.`},{key:`cancelCreateLabel`,value:{name:`string`,required:!1},description:`@since 3.4.0 — optional for backward compatibility with full-literal objects typed before this field existed.`}]}}],raw:`Partial<TagSelectionTranslation>`},description:``},onSearchChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(searchValue: string) => void`,signature:{arguments:[{type:{name:`string`},name:`searchValue`}],return:{name:`void`}}},description:``},onTagCreate:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tag: TagSelectionItem) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`}],return:{name:`void`}}},description:``},onTagDelete:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  tag: TagSelectionItem,
  selectedTags: TagSelectionItem[],
  allTags: TagSelectionItem[],
) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},name:`selectedTags`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},name:`allTags`}],return:{name:`void`}}},description:``},onTagSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  tag: TagSelectionItem,
  selectedTags: TagSelectionItem[],
  allTags: TagSelectionItem[],
) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}},name:`tag`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},name:`selectedTags`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},name:`allTags`}],return:{name:`void`}}},description:``},onTagsChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  selectedTags: TagSelectionItem[],
  allTags: TagSelectionItem[],
) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},name:`selectedTags`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Wird intern als React-Key und für Store-Operationen (select/delete) verwendet.
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  // Semantische Theme-Farbe – empfohlener Weg für konsistente, Dark-Mode-fähige Chips.
  color?: TagColor;
  // Escape-Hatch für komplett individuelle Farben (z. B. Branding-Farben).
  // Wenn gesetzt, überschreibt dies den color-Prop.
  foregroundColor?: string;
  backgroundColor?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`selected`,value:{name:`boolean`,required:!1}},{key:`disabled`,value:{name:`boolean`,required:!1}},{key:`color`,value:{name:`union`,raw:`| "default"
| "primary"
| "secondary"
| "error"
| "info"
| "success"
| "warning"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"info"`},{name:`literal`,value:`"success"`},{name:`literal`,value:`"warning"`}],required:!1}},{key:`foregroundColor`,value:{name:`string`,required:!1}},{key:`backgroundColor`,value:{name:`string`,required:!1}}]}}],raw:`TagSelectionItem[]`},name:`allTags`}],return:{name:`void`}}},description:``}}}}));function xe(e){let[t,n]=(0,F.useState)(Oe);return(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e,tags:t,onTagCreate:t=>{e.onTagCreate?.(t),n(e=>[...e,t])}})})}function Se(e){let[t,n]=(0,F.useState)([{id:`design`,label:`Design`,color:`secondary`}]);return(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e,tags:t,onTagCreate:t=>{e.onTagCreate?.(t)},onTagsChange:(t,r)=>{e.onTagsChange?.(t,r),n(r)}})})}async function Ce(e){await new Promise(e=>setTimeout(e,400));let t=e.trim().toLowerCase();return t?je.filter(e=>e.label.toLowerCase().includes(t)||Me[e.id]?.some(e=>e.includes(t))):je}function we(e){let[t,n]=(0,F.useState)(je),[i,a]=(0,F.useState)(!1),o=async e=>{a(!0),n(await Ce(e)),a(!1)};return(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e,tags:t,loading:i,onSearchChange:o})})}function Te(e){let[t,n]=(0,F.useState)(Pe);return(0,I.jsx)(r,{sx:{maxWidth:460},children:(0,I.jsx)(j,{...e,tags:t,onTagsChange:(t,r)=>{n(r),e.onTagsChange?.(t,r)}})})}function Ee(e){let[t,n]=(0,F.useState)(Ie);return(0,I.jsx)(r,{sx:{maxWidth:460},children:(0,I.jsx)(j,{...e,tags:t,onTagsChange:(t,r)=>{n(r),e.onTagsChange?.(t,r)}})})}var F,I,L,R,De,Oe,ke,z,B,V,H,U,W,Ae,G,K,q,J,Y,X,Z,Q,je,Me,$,Ne,Pe,Fe,Ie,Le,Re;e((()=>{f(),F=t(i(),1),P(),I=c(),{fn:L,userEvent:R,within:De}=__STORYBOOK_MODULE_TEST__,Oe=[{id:`javascript`,label:`JavaScript`,selected:!0,color:`warning`},{id:`typescript`,label:`TypeScript`,selected:!0,color:`info`},{id:`react`,label:`React`,color:`primary`},{id:`mui`,label:`MUI`,color:`secondary`},{id:`css`,label:`CSS`,color:`info`},{id:`html`,label:`HTML`,color:`error`},{id:`python`,label:`Python`,color:`success`},{id:`golang`,label:`Golang`,color:`primary`},{id:`jquery`,label:`jQuery`,disabled:!0,color:`default`},{id:`dotnet`,label:`.Net`,disabled:!0,color:`default`}],ke={title:`Components/TagSelection`,component:j,args:{allowCreate:!0,chipSize:`small`,chipVariant:`filled`,disabled:!1,inputSize:`medium`,listboxMaxHeight:300,loading:!1,maxTags:10,maxVisibleChips:10,popoverPlacement:`bottom`,showAutoComplete:!0,showSelectedTags:!0,showSelectedTagsLabel:!0,tags:Oe,onSearchChange:L(),onTagCreate:L(),onTagDelete:L(),onTagSelect:L(),onTagsChange:L()},argTypes:{allowCreate:{control:`boolean`},chipSize:{control:`radio`,options:[`small`,`medium`]},chipVariant:{control:`radio`,options:[`filled`,`outlined`]},disabled:{control:`boolean`},inputSize:{control:`radio`,options:[`small`,`medium`]},listboxMaxHeight:{control:`number`},loading:{control:`boolean`},maxTags:{control:`number`},maxVisibleChips:{control:`number`},popoverPlacement:{control:`radio`,options:[`top`,`bottom`]},searchDebounceMs:{control:`number`},serverSideFilter:{control:`boolean`},showAutoComplete:{control:`boolean`},showSelectedTags:{control:`boolean`},showSelectedTagsLabel:{control:`boolean`},tags:{control:!1},translation:{control:!1},onSearchChange:{control:!1},onTagCreate:{control:!1},onTagDelete:{control:!1},onTagSelect:{control:!1},onTagsChange:{control:!1}},parameters:{controls:{sort:`alpha`}}},z={render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},B={args:{chipVariant:`outlined`},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},V={args:{inputSize:`small`},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},H={args:{showSelectedTags:!1},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},U={args:{showAutoComplete:!1},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},W={args:{translation:{selectedTagsLabel:`Ausgewählte Tags`,autoCompleteLabel:`Tags suchen und hinzufügen`,noSelectedTagsText:`Keine Tags ausgewählt.`,noAvailableTagsText:`Keine Tags verfügbar.`,placeholder:`Suchen...`,loadingText:`Laden...`,maxTagsReachedText:`Maximale Anzahl an Tags erreicht.`,colorPickerLabel:`Eigene Farbe`,backgroundColorLabel:`Hintergrundfarbe`}},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},Ae=[{id:`brand-primary`,label:`Branding Primär`,selected:!0,foregroundColor:`#ffffff`,backgroundColor:`#6200ea`},{id:`brand-secondary`,label:`Branding Sekundär`,selected:!0,foregroundColor:`#ffffff`,backgroundColor:`#00897b`},{id:`highlight`,label:`Highlight`,foregroundColor:`#1a1a1a`,backgroundColor:`#ffea00`},{id:`accent`,label:`Akzent`,foregroundColor:`#ffffff`,backgroundColor:`#e64a19`}],G={args:{tags:Ae},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},K={args:{disabled:!0},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},q={args:{tags:[],loading:!0},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},J={args:{maxTags:2},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},Y={render:e=>(0,I.jsx)(xe,{...e})},X={parameters:{docs:{description:{story:"Type a new tag name that does not match any existing tag, then pick from the **7 semantic theme colors** or click the **rainbow circle** to open the native color picker for any hex color. Custom hex colors are stored as `backgroundColor`/`foregroundColor` on the tag with auto-contrast text (black or white)."}}},render:e=>(0,I.jsx)(Se,{...e})},Z={parameters:{docs:{description:{story:"`maxTags` is enforced even while a custom-color tag is being created — starting with 1 tag and `maxTags={2}`, you can create exactly one more tag, then the input disables and the create-mode confirm checkmark/Enter no longer create additional tags, regardless of color choice."}}},args:{maxTags:2},render:e=>(0,I.jsx)(Se,{...e})},Q={parameters:{docs:{description:{story:'While typing, the matching portion of each tag label is rendered **bold**. The match is case-insensitive. This story auto-types `"Reac"` to show the effect immediately.'}}},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})}),play:async({canvasElement:e})=>{let t=De(e).getByRole(`combobox`);await R.click(t),await R.type(t,`Reac`,{delay:80})}},je=[{id:`javascript`,label:`JavaScript`},{id:`typescript`,label:`TypeScript`},{id:`python`,label:`Python`},{id:`golang`,label:`Golang`}],Me={javascript:[`ecma`,`ecmascript`,`node`],typescript:[`ts`,`ms`],python:[`py`],golang:[`go`]},$={parameters:{docs:{description:{story:'Simulates server-side search with `searchDebounceMs={300}` (waits for a typing pause before calling `onSearchChange`, instead of firing per keystroke) and `serverSideFilter` (trusts the returned `tags` as-is — no client-side re-filtering). Try typing **"ecma"** — it matches "JavaScript" via a server-side alias (ECMAScript) that the label itself never contains, which only works because `serverSideFilter` is on.'}}},args:{searchDebounceMs:300,serverSideFilter:!0},render:e=>(0,I.jsx)(we,{...e})},Ne={args:{maxVisibleChips:3,popoverPlacement:`bottom`,tags:Oe.map(e=>({...e,selected:!0}))},render:e=>(0,I.jsx)(r,{sx:{maxWidth:420},children:(0,I.jsx)(j,{...e})})},Pe=[{id:`react`,label:`React`,color:`info`,selected:!0},{id:`typescript`,label:`TypeScript`,color:`info`,selected:!0},{id:`nodejs`,label:`Node.js`,color:`success`},{id:`python`,label:`Python`,color:`success`},{id:`go`,label:`Go`,color:`success`},{id:`postgresql`,label:`PostgreSQL`,color:`warning`},{id:`redis`,label:`Redis`,color:`warning`},{id:`docker`,label:`Docker`,color:`secondary`,selected:!0},{id:`kubernetes`,label:`Kubernetes`,color:`secondary`},{id:`aws`,label:`AWS`,color:`error`},{id:`terraform`,label:`Terraform`,color:`error`}],Fe={parameters:{docs:{description:{story:"**Real-world use case: a developer profile skill picker.** Colors group skills by category (languages, infra, cloud) — a pattern common in hiring tools and team-directory apps. `allowCreate` lets a developer add a skill that is not yet in the list."}}},args:{allowCreate:!0,showSelectedTagsLabel:!0,translation:{selectedTagsLabel:`Your skills`,autoCompleteLabel:`Add a skill`,placeholder:`e.g. GraphQL, Rust …`}},render:e=>(0,I.jsx)(Te,{...e})},Ie=[{id:`alice`,label:`alice@company.com`,color:`primary`,selected:!0},{id:`bob`,label:`bob@company.com`,color:`primary`,selected:!0},{id:`carol`,label:`carol@partner.io`},{id:`dave`,label:`dave@partner.io`},{id:`eng`,label:`engineering-team@company.com`,color:`secondary`},{id:`design`,label:`design-team@company.com`,color:`secondary`},{id:`sales`,label:`sales-team@company.com`,color:`secondary`}],Le={parameters:{docs:{description:{story:`**Real-world use case: a "To" field in an email composer or invite dialog.** Mixing individual addresses with team distribution lists, plus free-text entry for one-off addresses not yet in the address book.`}}},args:{allowCreate:!0,maxTags:10,translation:{selectedTagsLabel:`To`,autoCompleteLabel:`Add recipients`,placeholder:`Type a name or email…`,maxTagsReachedText:`Maximum of 10 recipients reached.`}},render:e=>(0,I.jsx)(Ee,{...e})},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    chipVariant: "outlined"
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    inputSize: "small"
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    showSelectedTags: false
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    showAutoComplete: false
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    translation: {
      selectedTagsLabel: "Ausgewählte Tags",
      autoCompleteLabel: "Tags suchen und hinzufügen",
      noSelectedTagsText: "Keine Tags ausgewählt.",
      noAvailableTagsText: "Keine Tags verfügbar.",
      placeholder: "Suchen...",
      loadingText: "Laden...",
      maxTagsReachedText: "Maximale Anzahl an Tags erreicht.",
      colorPickerLabel: "Eigene Farbe",
      backgroundColorLabel: "Hintergrundfarbe"
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    tags: customColorTags
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    tags: [],
    loading: true
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    maxTags: 2
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => <CreatableStory {...args} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Type a new tag name that does not match any existing tag, then pick from the **7 semantic theme colors** or click the **rainbow circle** to open the native color picker for any hex color. ' + 'Custom hex colors are stored as \`backgroundColor\`/\`foregroundColor\` on the tag with auto-contrast text (black or white).'
      }
    }
  },
  render: args => <CustomColorCreationStory {...args} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`maxTags\` is enforced even while a custom-color tag is being created — starting with 1 tag ' + 'and \`maxTags={2}\`, you can create exactly one more tag, then the input disables and the ' + 'create-mode confirm checkmark/Enter no longer create additional tags, regardless of color choice.'
      }
    }
  },
  args: {
    maxTags: 2
  },
  render: args => <CustomColorCreationStory {...args} />
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'While typing, the matching portion of each tag label is rendered **bold**. ' + 'The match is case-insensitive. This story auto-types \`"Reac"\` to show the effect immediately.'
      }
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.type(input, "Reac", {
      delay: 80
    });
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Simulates server-side search with \`searchDebounceMs={300}\` (waits for a typing pause ' + 'before calling \`onSearchChange\`, instead of firing per keystroke) and \`serverSideFilter\` ' + '(trusts the returned \`tags\` as-is — no client-side re-filtering). Try typing **"ecma"** — ' + 'it matches "JavaScript" via a server-side alias (ECMAScript) that the label itself never ' + 'contains, which only works because \`serverSideFilter\` is on.'
      }
    }
  },
  args: {
    searchDebounceMs: 300,
    serverSideFilter: true
  },
  render: args => <AsyncServerSearchStory {...args} />
}`,...$.parameters?.docs?.source}}},Ne.parameters={...Ne.parameters,docs:{...Ne.parameters?.docs,source:{originalSource:`{
  args: {
    maxVisibleChips: 3,
    popoverPlacement: "bottom",
    tags: sampleTags.map(t => ({
      ...t,
      selected: true
    }))
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <TagSelection {...args} />
    </Box>
}`,...Ne.parameters?.docs?.source}}},Fe.parameters={...Fe.parameters,docs:{...Fe.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a developer profile skill picker.** ' + 'Colors group skills by category (languages, infra, cloud) — a pattern common in hiring tools and ' + 'team-directory apps. \`allowCreate\` lets a developer add a skill that is not yet in the list.'
      }
    }
  },
  args: {
    allowCreate: true,
    showSelectedTagsLabel: true,
    translation: {
      selectedTagsLabel: "Your skills",
      autoCompleteLabel: "Add a skill",
      placeholder: "e.g. GraphQL, Rust …"
    }
  },
  render: args => <SkillSelectorStory {...args} />
}`,...Fe.parameters?.docs?.source}}},Le.parameters={...Le.parameters,docs:{...Le.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a "To" field in an email composer or invite dialog.** ' + 'Mixing individual addresses with team distribution lists, plus free-text entry for one-off addresses ' + 'not yet in the address book.'
      }
    }
  },
  args: {
    allowCreate: true,
    maxTags: 10,
    translation: {
      selectedTagsLabel: "To",
      autoCompleteLabel: "Add recipients",
      placeholder: "Type a name or email…",
      maxTagsReachedText: "Maximum of 10 recipients reached."
    }
  },
  render: args => <RecipientPickerStory {...args} />
}`,...Le.parameters?.docs?.source}}},Re=[`Default`,`OutlinedChips`,`SmallInput`,`NoSelectedTags`,`NoAutoComplete`,`GermanTranslation`,`CustomColors`,`Disabled`,`Loading`,`MaxTags`,`Creatable`,`WithCustomColorCreation`,`MaxTagsWithCustomColorCreation`,`SearchHighlight`,`AsyncServerSearch`,`OverflowChips`,`SkillSelector`,`EmailRecipients`]}))();export{$ as AsyncServerSearch,Y as Creatable,G as CustomColors,z as Default,K as Disabled,Le as EmailRecipients,W as GermanTranslation,q as Loading,J as MaxTags,Z as MaxTagsWithCustomColorCreation,U as NoAutoComplete,H as NoSelectedTags,B as OutlinedChips,Ne as OverflowChips,Q as SearchHighlight,Fe as SkillSelector,V as SmallInput,X as WithCustomColorCreation,Re as __namedExportsOrder,ke as default};