import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{L as n,Q as r,S as i,U as a,Z as o,i as s,t as c}from"./iframe-Bb8mcAY9.js";import{n as l,t as u}from"./muiTsClasses-B0c6njAh.js";var d,f=e((()=>{d={fromLabel:`From`,toLabel:`To`,endBeforeStartError:`End date must be after start date`,startRequiredError:`Start date is required`,endRequiredError:`End date is required`}})),p,m=e((()=>{p={root:`MuiTsDateRangePicker-root`,inputs:`MuiTsDateRangePicker-inputs`,startInput:`MuiTsDateRangePicker-startInput`,separator:`MuiTsDateRangePicker-separator`,endInput:`MuiTsDateRangePicker-endInput`,helperText:`MuiTsDateRangePicker-helperText`}}));function h(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function g(e){if(!e)return null;let t=new Date(`${e}T00:00:00`);return isNaN(t.getTime())?null:t}function _(e){return e?{date:e,iso:h(e)}:null}function v(e,t,n,r){let i=``,a=``;return e.start&&e.end&&e.end<e.start&&(a=r.endBeforeStartError),n&&!e.start&&t.start&&(i=r.startRequiredError),n&&!e.end&&t.end&&!a&&(a=r.endRequiredError),{startError:i,endError:a}}function y({value:e,defaultValue:t,onChange:r,minDate:a,maxDate:o,disabled:c=!1,required:u=!1,error:f=!1,helperText:m,inputSize:y=`small`,inputMinWidth:C=170,translation:w}){let T={...d,...w},E=e!==void 0,[D,O]=(0,b.useState)(t??S),[k,A]=(0,b.useState)({start:!1,end:!1}),j=E?e:D,{startError:M,endError:N}=v(j,k,u,T);function P(e,t){E||O({start:e,end:t}),r?.({start:_(e),end:_(t)})}function F(e){A(e=>({...e,start:!0})),P(g(e.target.value),j.end)}function I(e){A(e=>({...e,end:!0})),P(j.start,g(e.target.value))}function L(){A(e=>({...e,start:!0}))}function R(){A(e=>({...e,end:!0}))}let z=a?h(a):void 0,B=o?h(o):void 0,V=j.start?h(j.start):z,H=f||!!M||!!N;return(0,x.jsxs)(n,{className:[p.root,c&&l.disabled,H&&l.error].filter(Boolean).join(` `),sx:{display:`inline-flex`,flexDirection:`column`,gap:.25},children:[(0,x.jsxs)(n,{className:p.inputs,sx:{display:`inline-flex`,alignItems:`flex-start`,gap:1},children:[(0,x.jsx)(s,{className:p.startInput,type:`date`,label:T.fromLabel,value:j.start?h(j.start):``,onChange:F,onBlur:L,disabled:c,required:u,error:!!M||f,helperText:M||` `,size:y,sx:{width:C},slotProps:{inputLabel:{shrink:!0},htmlInput:{min:z,max:B,"data-testid":`date-range-start`}}}),(0,x.jsx)(n,{component:`span`,className:p.separator,"aria-hidden":!0,sx:{color:`text.disabled`,userSelect:`none`,flexShrink:0,lineHeight:1,mt:y===`small`?`12px`:`20px`},children:`–`}),(0,x.jsx)(s,{className:p.endInput,type:`date`,label:T.toLabel,value:j.end?h(j.end):``,onChange:I,onBlur:R,disabled:c,required:u,error:!!N||f,helperText:N||` `,size:y,sx:{width:C},slotProps:{inputLabel:{shrink:!0},htmlInput:{min:V,max:B,"data-testid":`date-range-end`}}})]}),m&&(0,x.jsx)(i,{className:p.helperText,error:f,sx:{mx:`14px`},children:m})]})}var b,x,S,C=e((()=>{b=t(r(),1),c(),f(),m(),u(),x=o(),S={start:null,end:null},y.__docgenInfo={description:``,methods:[],displayName:`DateRangePicker`,props:{value:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  start: Date | null;
  end:   Date | null;
}`,signature:{properties:[{key:`start`,value:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}],required:!0}},{key:`end`,value:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}],required:!0}}]}},description:"Controlled value — pass simple `Date` objects. Omit to use uncontrolled mode via `defaultValue`."},defaultValue:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  start: Date | null;
  end:   Date | null;
}`,signature:{properties:[{key:`start`,value:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}],required:!0}},{key:`end`,value:{name:`union`,raw:`Date | null`,elements:[{name:`Date`},{name:`null`}],required:!0}}]}},description:`Initial value for uncontrolled mode.`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(range: DateRange) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  start: DateRangeEntry | null;
  end:   DateRangeEntry | null;
}`,signature:{properties:[{key:`start`,value:{name:`union`,raw:`DateRangeEntry | null`,elements:[{name:`signature`,type:`object`,raw:`{
  date: Date;
  /** ISO date string in local time: "YYYY-MM-DD" */
  iso:  string;
}`,signature:{properties:[{key:`date`,value:{name:`Date`,required:!0}},{key:`iso`,value:{name:`string`,required:!0},description:`ISO date string in local time: "YYYY-MM-DD"`}]}},{name:`null`}],required:!0}},{key:`end`,value:{name:`union`,raw:`DateRangeEntry | null`,elements:[{name:`signature`,type:`object`,raw:`{
  date: Date;
  /** ISO date string in local time: "YYYY-MM-DD" */
  iso:  string;
}`,signature:{properties:[{key:`date`,value:{name:`Date`,required:!0}},{key:`iso`,value:{name:`string`,required:!0},description:`ISO date string in local time: "YYYY-MM-DD"`}]}},{name:`null`}],required:!0}}]}},name:`range`}],return:{name:`void`}}},description:"Called on every change — receives both `Date` and ISO string per date."},minDate:{required:!1,tsType:{name:`Date`},description:`Earliest selectable date (inclusive).`},maxDate:{required:!1,tsType:{name:`Date`},description:`Latest selectable date (inclusive).`},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},required:{required:!1,tsType:{name:`boolean`},description:`Marks both inputs as required — shows error after the user has interacted with a field.`,defaultValue:{value:`false`,computed:!1}},error:{required:!1,tsType:{name:`boolean`},description:`External error state — turns the helper text red.`,defaultValue:{value:`false`,computed:!1}},helperText:{required:!1,tsType:{name:`string`},description:`General hint or error message displayed below the picker.`},inputSize:{required:!1,tsType:{name:`union`,raw:`"small" | "medium"`,elements:[{name:`literal`,value:`"small"`},{name:`literal`,value:`"medium"`}]},description:``,defaultValue:{value:`"small"`,computed:!1}},inputMinWidth:{required:!1,tsType:{name:`number`},description:`Minimum (and fixed) width of each date input in pixels. Prevents the field from stretching when a helperText or error message appears. Default: 170.`,defaultValue:{value:`170`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  fromLabel:           string;
  toLabel:             string;
  endBeforeStartError: string;
  startRequiredError:  string;
  endRequiredError:    string;
}`,signature:{properties:[{key:`fromLabel`,value:{name:`string`,required:!0}},{key:`toLabel`,value:{name:`string`,required:!0}},{key:`endBeforeStartError`,value:{name:`string`,required:!0}},{key:`startRequiredError`,value:{name:`string`,required:!0}},{key:`endRequiredError`,value:{name:`string`,required:!0}}]}}],raw:`Partial<DateRangePickerTranslation>`},description:`Override any translation key — rest falls back to English defaults.`}}}}));function w(e){let[t,r]=(0,T.useState)({start:new Date(`2026-06-01T00:00:00`),end:new Date(`2026-08-31T00:00:00`)});function i(t){r({start:t.start?.date??null,end:t.end?.date??null}),e.onChange?.(t)}return(0,E.jsxs)(n,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,E.jsx)(y,{...e,value:t,onChange:i}),(0,E.jsxs)(a,{variant:`body2`,color:`text.secondary`,children:[`Start: `,t.start?.toLocaleDateString()??`—`,`\xA0\xA0·\xA0\xA0 End: `,t.end?.toLocaleDateString()??`—`]})]})}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;e((()=>{T=t(r(),1),c(),C(),E=o(),{fn:D}=__STORYBOOK_MODULE_TEST__,O={title:`Components/DateRangePicker`,component:y,args:{disabled:!1,error:!1,helperText:``,inputMinWidth:170,inputSize:`small`,required:!1,onChange:D()},argTypes:{disabled:{control:`boolean`},error:{control:`boolean`},helperText:{control:`text`},inputMinWidth:{control:`number`},inputSize:{control:`radio`,options:[`small`,`medium`]},required:{control:`boolean`},defaultValue:{control:!1},maxDate:{control:!1},minDate:{control:!1},translation:{control:!1},value:{control:!1},onChange:{control:!1}},parameters:{controls:{sort:`alpha`}}},k={name:`Default (uncontrolled)`,args:{defaultValue:{start:new Date(`2026-01-01T00:00:00`),end:new Date(`2026-03-31T00:00:00`)}}},A={name:`Controlled`,render:e=>(0,E.jsx)(w,{...e})},j={name:`Min / Max Date`,args:{minDate:new Date(`2026-01-01T00:00:00`),maxDate:new Date(`2026-12-31T00:00:00`),defaultValue:{start:new Date(`2026-03-01T00:00:00`),end:new Date(`2026-06-30T00:00:00`)}}},M={name:`German labels`,args:{translation:{fromLabel:`Von`,toLabel:`Bis`},defaultValue:{start:new Date(`2026-01-01T00:00:00`),end:new Date(`2026-12-31T00:00:00`)}}},N={args:{disabled:!0,defaultValue:{start:new Date(`2026-01-01T00:00:00`),end:new Date(`2026-03-31T00:00:00`)}}},P={name:`Empty (no dates selected)`,args:{defaultValue:{start:null,end:null}}},F={name:`Validation — End before Start`,args:{value:{start:new Date(`2026-06-01T00:00:00`),end:new Date(`2026-03-01T00:00:00`)}}},I={name:`Validation — Required (blur to trigger)`,args:{required:!0,defaultValue:{start:null,end:null}}},L={name:`External error + helperText`,args:{error:!0,helperText:`The selected range overlaps with an existing booking.`,defaultValue:{start:new Date(`2026-03-01T00:00:00`),end:new Date(`2026-03-15T00:00:00`)}}},R={name:`German — validation messages`,args:{translation:{fromLabel:`Von`,toLabel:`Bis`,endBeforeStartError:`Enddatum muss nach dem Startdatum liegen`,startRequiredError:`Startdatum ist erforderlich`,endRequiredError:`Enddatum ist erforderlich`},required:!0,value:{start:new Date(`2026-06-01T00:00:00`),end:new Date(`2026-03-01T00:00:00`)}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: "Default (uncontrolled)",
  args: {
    defaultValue: {
      start: new Date("2026-01-01T00:00:00"),
      end: new Date("2026-03-31T00:00:00")
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: "Controlled",
  render: args => <ControlledStory {...args} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: "Min / Max Date",
  args: {
    minDate: new Date("2026-01-01T00:00:00"),
    maxDate: new Date("2026-12-31T00:00:00"),
    defaultValue: {
      start: new Date("2026-03-01T00:00:00"),
      end: new Date("2026-06-30T00:00:00")
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: "German labels",
  args: {
    translation: {
      fromLabel: "Von",
      toLabel: "Bis"
    },
    defaultValue: {
      start: new Date("2026-01-01T00:00:00"),
      end: new Date("2026-12-31T00:00:00")
    }
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: {
      start: new Date("2026-01-01T00:00:00"),
      end: new Date("2026-03-31T00:00:00")
    }
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: "Empty (no dates selected)",
  args: {
    defaultValue: {
      start: null,
      end: null
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: "Validation — End before Start",
  args: {
    value: {
      start: new Date("2026-06-01T00:00:00"),
      end: new Date("2026-03-01T00:00:00")
    }
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: "Validation — Required (blur to trigger)",
  args: {
    required: true,
    defaultValue: {
      start: null,
      end: null
    }
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: "External error + helperText",
  args: {
    error: true,
    helperText: "The selected range overlaps with an existing booking.",
    defaultValue: {
      start: new Date("2026-03-01T00:00:00"),
      end: new Date("2026-03-15T00:00:00")
    }
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: "German — validation messages",
  args: {
    translation: {
      fromLabel: "Von",
      toLabel: "Bis",
      endBeforeStartError: "Enddatum muss nach dem Startdatum liegen",
      startRequiredError: "Startdatum ist erforderlich",
      endRequiredError: "Enddatum ist erforderlich"
    },
    required: true,
    value: {
      start: new Date("2026-06-01T00:00:00"),
      end: new Date("2026-03-01T00:00:00")
    }
  }
}`,...R.parameters?.docs?.source}}},z=[`Default`,`Controlled`,`WithMinMaxDate`,`GermanLabels`,`Disabled`,`EmptyRange`,`EndBeforeStart`,`Required`,`ExternalError`,`GermanValidation`]}))();export{A as Controlled,k as Default,N as Disabled,P as EmptyRange,F as EndBeforeStart,L as ExternalError,M as GermanLabels,R as GermanValidation,I as Required,j as WithMinMaxDate,z as __namedExportsOrder,O as default};