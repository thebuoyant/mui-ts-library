import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{F as n,G as r,I as i,L as a,Q as o,U as s,Z as c,t as l}from"./iframe-Bb8mcAY9.js";import{n as u,t as d}from"./ColorPicker-IuOeZeMY.js";function f(e){let[t,n]=(0,g.useState)(e.initialValue??`#1976d2`);return(0,_.jsx)(d,{...e,value:t,onChange:(t,r)=>{e.onChange?.(t,r),n(t)}})}function p(e){let[t,n]=(0,g.useState)(`#1976d2`),[i,o]=(0,g.useState)(0),[c,l]=(0,g.useState)(0),[u,f]=(0,g.useState)(`#1976d2`);return(0,_.jsxs)(a,{sx:{display:`flex`,gap:3,alignItems:`flex-start`},children:[(0,_.jsx)(d,{...e,value:t,onChange:e=>{n(e),o(e=>e+1)},onChangeCommitted:e=>{l(e=>e+1),f(e)}}),(0,_.jsxs)(r,{variant:`outlined`,sx:{p:2,width:200},children:[(0,_.jsx)(s,{variant:`caption`,sx:{display:`block`,color:`text.secondary`},children:`onChange calls (every drag frame / keystroke)`}),(0,_.jsx)(s,{variant:`h6`,children:i}),(0,_.jsx)(s,{variant:`caption`,sx:{display:`block`,color:`text.secondary`,mt:1.5},children:`onChangeCommitted calls (per gesture — drag release, blur, swatch/eyedropper pick)`}),(0,_.jsx)(s,{variant:`h6`,children:c}),(0,_.jsxs)(s,{variant:`caption`,sx:{display:`block`,color:`text.secondary`,mt:1.5},children:[`Last committed: `,u]})]})]})}function m(e){let[t,n]=(0,g.useState)(`#1976d2`),[i,o]=(0,g.useState)(null);return(0,_.jsxs)(a,{sx:{display:`flex`,gap:3,alignItems:`flex-start`},children:[(0,_.jsx)(d,{...e,value:t,onChange:(e,t)=>{n(e),o(t)},savedColors:[`#1976d2`,`#388e3c`,`#d32f2f`,`#f57c00`,`#7b1fa2`]}),(0,_.jsxs)(r,{variant:`outlined`,sx:{p:2,width:220},children:[(0,_.jsx)(s,{variant:`subtitle2`,sx:{mb:1},children:`Live preview`}),(0,_.jsx)(a,{sx:{height:80,borderRadius:1,backgroundColor:t,border:`1px solid`,borderColor:`divider`,mb:1.5}}),(0,_.jsx)(s,{variant:`caption`,sx:{display:`block`,color:`text.secondary`},children:i&&`rgb(${i.rgb.r}, ${i.rgb.g}, ${i.rgb.b})`}),(0,_.jsx)(s,{variant:`caption`,sx:{display:`block`,color:`text.secondary`},children:t})]})]})}function h(e){let[t,r]=(0,g.useState)(`#1976d2`),[o,c]=(0,g.useState)(`hex`);return(0,_.jsx)(a,{sx:{display:`flex`,gap:3,alignItems:`flex-start`},children:(0,_.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:1.5},children:[(0,_.jsx)(s,{variant:`caption`,sx:{color:`text.secondary`},children:`Active format (controlled from outside):`}),(0,_.jsx)(n,{size:`small`,children:[`hex`,`rgb`,`hsl`].map(e=>(0,_.jsx)(i,{variant:o===e?`contained`:`outlined`,onClick:()=>c(e),children:e.toUpperCase()},e))}),(0,_.jsx)(d,{...e,value:t,format:o,onFormatChange:c,onChange:e=>r(e)})]})})}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{l(),g=t(o(),1),u(),_=c(),{fn:v}=__STORYBOOK_MODULE_TEST__,y={title:`Components/ColorPicker`,component:d,args:{colorGradientSize:`medium`,disabled:!1,defaultFormat:`hex`,inputSize:`medium`,showAlpha:!0,showEyeDropper:!0,showInputSection:!0,showSliderSection:!0,width:280,onChange:v()},argTypes:{colorGradientSize:{control:`radio`,options:[`small`,`medium`]},defaultFormat:{control:`radio`,options:[`hex`,`rgb`,`hsl`]},disabled:{control:`boolean`},format:{control:!1},inputSize:{control:`radio`,options:[`small`,`medium`]},name:{control:!1},savedColors:{control:!1},showAlpha:{control:`boolean`},showEyeDropper:{control:`boolean`},showInputSection:{control:`boolean`},showSliderSection:{control:`boolean`},translation:{control:!1},value:{control:!1},width:{control:`number`},onChange:{control:!1},onChangeCommitted:{control:!1},onFormatChange:{control:!1}},parameters:{controls:{sort:`alpha`}}},b={render:e=>(0,_.jsx)(f,{...e})},x={parameters:{docs:{description:{story:"`showAlpha={false}` hides the alpha slider and the opacity field — only RGB/hue is adjustable."}}},args:{showAlpha:!1},render:e=>(0,_.jsx)(f,{...e})},S={args:{colorGradientSize:`small`,width:240},render:e=>(0,_.jsx)(f,{...e})},C={parameters:{docs:{description:{story:"`inputSize` controls the format dropdown and value/alpha fields independently of `size` (which scales the gradient area, sliders, and swatches) — useful for matching a denser form layout without shrinking the picker itself."}}},args:{inputSize:`small`},render:e=>(0,_.jsx)(f,{...e})},w={parameters:{docs:{description:{story:"`showInputSection={false}` hides the format dropdown and value/alpha fields — gradient area and sliders only."}}},args:{showInputSection:!1},render:e=>(0,_.jsx)(f,{...e})},T={parameters:{docs:{description:{story:"`showSliderSection={false}` hides the eyedropper and the hue/alpha sliders — a compact picker driven entirely by the gradient area plus typed values."}}},args:{showSliderSection:!1},render:e=>(0,_.jsx)(f,{...e})},E={parameters:{docs:{description:{story:"`disabled={true}` mutes all interactions (drag, typing, swatch clicks) and reduces opacity."}}},args:{disabled:!0},render:e=>(0,_.jsx)(f,{...e,initialValue:`#9c27b0`})},D={args:{defaultFormat:`rgb`},render:e=>(0,_.jsx)(f,{...e})},O={args:{defaultFormat:`hsl`},render:e=>(0,_.jsx)(f,{...e})},k={parameters:{docs:{description:{story:"`savedColors` renders a click-to-select swatch grid below the picker — a purely display/select prop, the caller owns persisting the list (e.g. recently used or brand colors)."}}},args:{savedColors:[`#f44336`,`#e91e63`,`#9c27b0`,`#673ab7`,`#3f51b5`,`#2196f3`,`#03a9f4`,`#00bcd4`,`#4caf50`,`#ffeb3b`,`#ff9800`,`#795548`,`#000000`,`#ffffff80`]},render:e=>(0,_.jsx)(f,{...e})},A={parameters:{docs:{description:{story:"`name` renders a hidden `<input>` carrying the current hex value, so the picker participates in native form submission, React Hook Form, or Formik without extra wiring."}}},args:{name:`brandColor`},render:e=>(0,_.jsx)(f,{...e})},j={parameters:{docs:{description:{story:'`onChangeCommitted` fires once per "gesture" (drag release, field blur, swatch/eyedropper pick) — compare the two counters while dragging the gradient area: `onChange` climbs on every frame, `onChangeCommitted` only increments once you release. Use it instead of debouncing `onChange` yourself for expensive side effects like persisting to a backend — same dual-callback pattern as MUI\'s own `Slider` (`onChange` / `onChangeCommitted`).'}}},render:e=>(0,_.jsx)(p,{...e})},M={args:{translation:{formatLabel:`Farbformat`,hexFieldLabel:`Hex-Wert`,redLabel:`Rot`,greenLabel:`Grün`,blueLabel:`Blau`,hueFieldLabel:`Farbton`,saturationFieldLabel:`Sättigung`,lightnessFieldLabel:`Helligkeit`,alphaFieldLabel:`Deckkraft`,eyeDropperLabel:`Farbe vom Bildschirm aufnehmen`,savedColorsLabel:`Gespeicherte Farben`,gradientAreaLabel:`Sättigung und Helligkeit`,hueSliderLabel:`Farbton`},savedColors:[`#1976d2`,`#388e3c`,`#d32f2f`]},render:e=>(0,_.jsx)(f,{...e})},N={parameters:{docs:{description:{story:`**Real-world use case: picking a brand/accent color for live theming.** The preview panel updates immediately as you drag, type, or pick a saved swatch — exactly the kind of "pick a color, see it applied instantly" flow a theme customizer or design-system playground needs.`}}},render:e=>(0,_.jsx)(m,{...e})},P={parameters:{docs:{description:{story:"**Controlled `format` prop** — the parent owns the active display format (HEX / RGB / HSL). Switch the format via the buttons above the picker, or via the dropdown inside it — both routes call `onFormatChange` and update the same state. Use this when a form reset needs to programmatically restore a specific format, or when an external toolbar controls the view. Omitting `format` falls back to uncontrolled behaviour via `defaultFormat`."}}},render:e=>(0,_.jsx)(h,{...e})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <ControlledColorPicker {...args} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showAlpha={false}\` hides the alpha slider and the opacity field — only RGB/hue is adjustable.'
      }
    }
  },
  args: {
    showAlpha: false
  },
  render: args => <ControlledColorPicker {...args} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    colorGradientSize: "small",
    width: 240
  },
  render: args => <ControlledColorPicker {...args} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`inputSize\` controls the format dropdown and value/alpha fields independently of \`size\` ' + '(which scales the gradient area, sliders, and swatches) — useful for matching a denser form layout ' + 'without shrinking the picker itself.'
      }
    }
  },
  args: {
    inputSize: "small"
  },
  render: args => <ControlledColorPicker {...args} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showInputSection={false}\` hides the format dropdown and value/alpha fields — gradient area and sliders only.'
      }
    }
  },
  args: {
    showInputSection: false
  },
  render: args => <ControlledColorPicker {...args} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showSliderSection={false}\` hides the eyedropper and the hue/alpha sliders — a compact picker driven ' + 'entirely by the gradient area plus typed values.'
      }
    }
  },
  args: {
    showSliderSection: false
  },
  render: args => <ControlledColorPicker {...args} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`disabled={true}\` mutes all interactions (drag, typing, swatch clicks) and reduces opacity.'
      }
    }
  },
  args: {
    disabled: true
  },
  render: args => <ControlledColorPicker {...args} initialValue="#9c27b0" />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    defaultFormat: "rgb"
  },
  render: args => <ControlledColorPicker {...args} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    defaultFormat: "hsl"
  },
  render: args => <ControlledColorPicker {...args} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`savedColors\` renders a click-to-select swatch grid below the picker — a purely display/select prop, ' + 'the caller owns persisting the list (e.g. recently used or brand colors).'
      }
    }
  },
  args: {
    savedColors: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800", "#795548", "#000000", "#ffffff80"]
  },
  render: args => <ControlledColorPicker {...args} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`name\` renders a hidden \`<input>\` carrying the current hex value, so the picker participates in ' + 'native form submission, React Hook Form, or Formik without extra wiring.'
      }
    }
  },
  args: {
    name: "brandColor"
  },
  render: args => <ControlledColorPicker {...args} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: '`onChangeCommitted` fires once per \"gesture\" (drag release, field blur, swatch/eyedropper pick) — ' + 'compare the two counters while dragging the gradient area: `onChange` climbs on every frame, ' + '`onChangeCommitted` only increments once you release. Use it instead of debouncing `onChange` ' + 'yourself for expensive side effects like persisting to a backend — same dual-callback pattern as ' + \"MUI's own `Slider` (`onChange` / `onChangeCommitted`).\"\n      }\n    }\n  },\n  render: args => <ChangeCommittedStory {...args} />\n}",...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    translation: {
      formatLabel: "Farbformat",
      hexFieldLabel: "Hex-Wert",
      redLabel: "Rot",
      greenLabel: "Grün",
      blueLabel: "Blau",
      hueFieldLabel: "Farbton",
      saturationFieldLabel: "Sättigung",
      lightnessFieldLabel: "Helligkeit",
      alphaFieldLabel: "Deckkraft",
      eyeDropperLabel: "Farbe vom Bildschirm aufnehmen",
      savedColorsLabel: "Gespeicherte Farben",
      gradientAreaLabel: "Sättigung und Helligkeit",
      hueSliderLabel: "Farbton"
    },
    savedColors: ["#1976d2", "#388e3c", "#d32f2f"]
  },
  render: args => <ControlledColorPicker {...args} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: picking a brand/accent color for live theming.** ' + 'The preview panel updates immediately as you drag, type, or pick a saved swatch — exactly the kind ' + 'of "pick a color, see it applied instantly" flow a theme customizer or design-system playground needs.'
      }
    }
  },
  render: args => <BrandColorThemeStory {...args} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Controlled \`format\` prop** — the parent owns the active display format (HEX / RGB / HSL). ' + 'Switch the format via the buttons above the picker, or via the dropdown inside it — both routes ' + 'call \`onFormatChange\` and update the same state. ' + 'Use this when a form reset needs to programmatically restore a specific format, or when an external ' + 'toolbar controls the view. Omitting \`format\` falls back to uncontrolled behaviour via \`defaultFormat\`.'
      }
    }
  },
  render: args => <ControlledFormatStory {...args} />
}`,...P.parameters?.docs?.source}}},F=[`Default`,`WithoutAlpha`,`SmallSize`,`SmallInputSize`,`SlidersOnly`,`InputsOnly`,`Disabled`,`RgbFormat`,`HslFormat`,`WithSavedColors`,`FormIntegration`,`WithChangeCommitted`,`GermanTranslation`,`BrandColorTheming`,`WithControlledFormat`]}))();export{N as BrandColorTheming,b as Default,E as Disabled,A as FormIntegration,M as GermanTranslation,O as HslFormat,T as InputsOnly,D as RgbFormat,w as SlidersOnly,C as SmallInputSize,S as SmallSize,j as WithChangeCommitted,P as WithControlledFormat,k as WithSavedColors,x as WithoutAlpha,F as __namedExportsOrder,y as default};