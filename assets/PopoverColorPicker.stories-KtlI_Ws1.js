import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,T as i,U as a,Y as o,Z as s,m as c,s as l,t as u}from"./iframe-Bb8mcAY9.js";import{i as d,n as f,r as p,t as m}from"./ColorPicker-IuOeZeMY.js";import{n as h,t as g}from"./muiTsClasses-B0c6njAh.js";var _,v=e((()=>{_={root:`MuiTsPopoverColorPicker-root`,swatch:`MuiTsPopoverColorPicker-swatch`}}));function y({value:e,onChange:t,onChangeCommitted:r,swatchSize:i=28,swatchShape:a=`square`,disabled:s=!1,translation:l,...u}){let d=o(),f={...p,...l},[g,v]=(0,b.useState)(null),y=!!g,C=a===`circle`?`50%`:`${d.shape.borderRadius}px`;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(n,{component:`button`,type:`button`,disabled:s,"aria-label":f.openLabel,"aria-expanded":y,"aria-haspopup":`dialog`,onClick:e=>v(e.currentTarget),className:[_.root,s?h.disabled:void 0].filter(Boolean).join(` `),sx:{width:i,height:i,minWidth:i,p:0,borderRadius:C,border:`1px solid ${d.palette.divider}`,cursor:s?`default`:`pointer`,overflow:`hidden`,flexShrink:0,...S,"&:hover:not(:disabled)":{borderColor:d.palette.primary.main},"&:focus-visible":{outline:`2px solid ${d.palette.primary.main}`,outlineOffset:2}},children:(0,x.jsx)(n,{className:_.swatch,sx:{width:`100%`,height:`100%`,borderRadius:`inherit`,backgroundColor:e}})}),(0,x.jsx)(c,{open:y,anchorEl:g,onClose:()=>v(null),anchorOrigin:{vertical:`bottom`,horizontal:`left`},transformOrigin:{vertical:`top`,horizontal:`left`},slotProps:{paper:{sx:{p:1.5},"data-testid":`popover-color-picker`}},children:(0,x.jsx)(m,{value:e,onChange:t,onChangeCommitted:r,disabled:s,translation:l,...u})})]})}var b,x,S,C=e((()=>{b=t(r(),1),u(),f(),v(),g(),d(),x=s(),S={backgroundImage:`linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,backgroundSize:`8px 8px`,backgroundPosition:`0 0, 0 4px, 4px -4px, -4px 0px`},y.__docgenInfo={description:``,methods:[],displayName:`PopoverColorPicker`,props:{swatchSize:{required:!1,tsType:{name:`number`},description:`Size of the swatch trigger button in px (default: 28).`,defaultValue:{value:`28`,computed:!1}},swatchShape:{required:!1,tsType:{name:`union`,raw:`"square" | "circle"`,elements:[{name:`literal`,value:`"square"`},{name:`literal`,value:`"circle"`}]},description:"Shape of the swatch button (default: `'square'`).",defaultValue:{value:`"square"`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`intersection`,raw:`ColorPickerTranslation & PopoverColorPickerTranslation`,elements:[{name:`signature`,type:`object`,raw:`{
  formatLabel:           string;
  hexFieldLabel:         string;
  redLabel:               string;
  greenLabel:             string;
  blueLabel:              string;
  hueFieldLabel:          string;
  saturationFieldLabel:   string;
  lightnessFieldLabel:    string;
  alphaFieldLabel:        string;
  eyeDropperLabel:        string;
  savedColorsLabel:       string;
  gradientAreaLabel:      string;
  hueSliderLabel:         string;
}`,signature:{properties:[{key:`formatLabel`,value:{name:`string`,required:!0}},{key:`hexFieldLabel`,value:{name:`string`,required:!0}},{key:`redLabel`,value:{name:`string`,required:!0}},{key:`greenLabel`,value:{name:`string`,required:!0}},{key:`blueLabel`,value:{name:`string`,required:!0}},{key:`hueFieldLabel`,value:{name:`string`,required:!0}},{key:`saturationFieldLabel`,value:{name:`string`,required:!0}},{key:`lightnessFieldLabel`,value:{name:`string`,required:!0}},{key:`alphaFieldLabel`,value:{name:`string`,required:!0}},{key:`eyeDropperLabel`,value:{name:`string`,required:!0}},{key:`savedColorsLabel`,value:{name:`string`,required:!0}},{key:`gradientAreaLabel`,value:{name:`string`,required:!0}},{key:`hueSliderLabel`,value:{name:`string`,required:!0}}]}},{name:`signature`,type:`object`,raw:`{
  /** aria-label for the swatch trigger button. */
  openLabel: string;
}`,signature:{properties:[{key:`openLabel`,value:{name:`string`,required:!0},description:`aria-label for the swatch trigger button.`}]}}]}],raw:`Partial<ColorPickerTranslation & PopoverColorPickerTranslation>`},description:`i18n strings — merged with the inner ColorPicker translation.`},disabled:{defaultValue:{value:`false`,computed:!1},required:!1}}}}));function w(e){let[t,n]=(0,E.useState)(e.initialValue??`#1976d2`);return(0,D.jsx)(y,{...e,value:t,onChange:(t,r)=>{e.onChange?.(t,r),n(t)},onChangeCommitted:(t,n)=>{e.onChangeCommitted?.(t,n)}})}function T(){let[e,t]=(0,E.useState)(`#1976d2`),[r,o]=(0,E.useState)(`#ffffff`),[s,c]=(0,E.useState)(`#f57c00`);return(0,D.jsxs)(l,{spacing:3,sx:{maxWidth:480},children:[(0,D.jsx)(a,{variant:`body2`,color:`text.secondary`,children:`Click any swatch to open the picker. The swatch and preview update live while you drag.`}),(0,D.jsxs)(l,{direction:`row`,spacing:2,sx:{alignItems:`center`},children:[(0,D.jsx)(y,{value:e,onChange:t}),(0,D.jsx)(a,{variant:`body2`,children:`Background color`})]}),(0,D.jsxs)(l,{direction:`row`,spacing:2,sx:{alignItems:`center`},children:[(0,D.jsx)(y,{value:r,onChange:o}),(0,D.jsx)(a,{variant:`body2`,children:`Text color`})]}),(0,D.jsxs)(l,{direction:`row`,spacing:2,sx:{alignItems:`center`},children:[(0,D.jsx)(y,{value:s,onChange:c,swatchShape:`circle`,swatchSize:32}),(0,D.jsx)(a,{variant:`body2`,children:`Accent color (circle, size 32)`})]}),(0,D.jsx)(i,{}),(0,D.jsxs)(n,{sx:{p:3,borderRadius:2,backgroundColor:e,border:`1px solid`,borderColor:`divider`},children:[(0,D.jsx)(a,{variant:`subtitle1`,sx:{color:r,fontWeight:600},children:`Live preview`}),(0,D.jsx)(a,{variant:`body2`,sx:{color:r,mt:.5},children:`Adjust the colors above to see this box update in real time.`}),(0,D.jsx)(n,{sx:{mt:1.5,display:`inline-block`,px:2,py:.5,borderRadius:1,backgroundColor:s,color:`#fff`,fontSize:12,fontWeight:600},children:`Accent button`})]})]})}var E,D,O,k,A,j,M,N,P,F;e((()=>{u(),E=t(r(),1),C(),D=s(),{fn:O}=__STORYBOOK_MODULE_TEST__,k={title:`Components/PopoverColorPicker`,component:y,args:{colorGradientSize:`medium`,disabled:!1,inputSize:`medium`,showAlpha:!0,showEyeDropper:!0,showInputSection:!0,showSliderSection:!0,swatchShape:`square`,swatchSize:28,width:280,onChange:O(),onChangeCommitted:O()},argTypes:{swatchShape:{control:`radio`,options:[`square`,`circle`]},swatchSize:{control:`number`},colorGradientSize:{control:`radio`,options:[`small`,`medium`]},defaultFormat:{control:!1},disabled:{control:`boolean`},format:{control:!1},inputSize:{control:`radio`,options:[`small`,`medium`]},name:{control:!1},savedColors:{control:!1},showAlpha:{control:`boolean`},showEyeDropper:{control:`boolean`},showInputSection:{control:`boolean`},showSliderSection:{control:`boolean`},translation:{control:!1},value:{control:!1},width:{control:`number`},onChange:{control:!1},onChangeCommitted:{control:!1},onFormatChange:{control:!1}},parameters:{controls:{sort:`alpha`}}},A={parameters:{docs:{description:{story:"**`PopoverColorPicker`** — a convenience wrapper that combines a colored swatch trigger button with a popover containing the full `ColorPicker`. No `Popover`, `anchorEl`, or open/close state needed — just `value` + `onChange`. All `ColorPicker` props pass through directly."}}},render:e=>(0,D.jsx)(w,{...e})},j={parameters:{docs:{description:{story:'`swatchShape="circle"` renders the trigger as a circle — typical for color swatches in toolbars and design tools. Combine with `swatchSize` to match your icon grid.'}}},args:{swatchShape:`circle`,swatchSize:32},render:e=>(0,D.jsx)(w,{...e,initialValue:`#f57c00`})},M={parameters:{docs:{description:{story:"`disabled={true}` prevents opening the popover and mutes the swatch button visually."}}},args:{disabled:!0},render:e=>(0,D.jsx)(w,{...e,initialValue:`#9c27b0`})},N={parameters:{docs:{description:{story:"All `ColorPicker` props pass through — here `savedColors` adds a swatch palette inside the popover."}}},args:{savedColors:[`#f44336`,`#e91e63`,`#9c27b0`,`#3f51b5`,`#2196f3`,`#4caf50`,`#ff9800`,`#795548`]},render:e=>(0,D.jsx)(w,{...e})},P={parameters:{docs:{description:{story:`**Real-world use case: multi-picker live theming.** Each swatch controls one color role — background, text, accent — and the preview box updates immediately. This is the typical pattern for theme customizers or settings pages.`}},controls:{disable:!0}},render:()=>(0,D.jsx)(T,{})},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: '**`PopoverColorPicker`** — a convenience wrapper that combines a colored swatch trigger button with ' + 'a popover containing the full `ColorPicker`. No `Popover`, `anchorEl`, or open/close state needed — ' + 'just `value` + `onChange`. All `ColorPicker` props pass through directly.'\n      }\n    }\n  },\n  render: args => <Controlled {...args} />\n}",...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`swatchShape="circle"\` renders the trigger as a circle — typical for color swatches in toolbars ' + 'and design tools. Combine with \`swatchSize\` to match your icon grid.'
      }
    }
  },
  args: {
    swatchShape: "circle",
    swatchSize: 32
  },
  render: args => <Controlled {...args} initialValue="#f57c00" />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`disabled={true}\` prevents opening the popover and mutes the swatch button visually.'
      }
    }
  },
  args: {
    disabled: true
  },
  render: args => <Controlled {...args} initialValue="#9c27b0" />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'All \`ColorPicker\` props pass through — here \`savedColors\` adds a swatch palette inside the popover.'
      }
    }
  },
  args: {
    savedColors: ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#4caf50", "#ff9800", "#795548"]
  },
  render: args => <Controlled {...args} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: multi-picker live theming.** Each swatch controls one color role — ' + 'background, text, accent — and the preview box updates immediately. ' + 'This is the typical pattern for theme customizers or settings pages.'
      }
    },
    controls: {
      disable: true
    }
  },
  render: () => <LiveThemingStory />
}`,...P.parameters?.docs?.source}}},F=[`Default`,`CircleSwatch`,`Disabled`,`WithSavedColors`,`LiveTheming`]}))();export{j as CircleSwatch,A as Default,M as Disabled,P as LiveTheming,N as WithSavedColors,F as __namedExportsOrder,k as default};