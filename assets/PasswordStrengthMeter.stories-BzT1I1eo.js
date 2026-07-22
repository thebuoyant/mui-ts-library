import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{I as n,L as r,Q as i,S as a,U as o,W as s,Z as c,b as l,c as u,d as ee,i as d,q as f,s as p,t as m,w as te,x as ne}from"./iframe-Bb8mcAY9.js";import{t as h}from"./createSvgIcon-CmGEPqU-.js";import{n as re,t as ie}from"./muiTsClasses-B0c6njAh.js";import{n as g,t as ae}from"./ContentCopy-CzZq8IqG.js";import{n as oe,t as se}from"./Check-vwhw-nWw.js";import{n as _,t as ce}from"./AutoFixHigh-DqUBn4nY.js";import{n as le,t as ue}from"./useTimedFlag-D5YEca7v.js";import{i as de,n as fe,r as pe,t as me}from"./ErrorOutlined-DfbWpwP9.js";var v,y=e((()=>{v={root:`MuiTsPasswordStrengthMeter-root`,input:`MuiTsPasswordStrengthMeter-input`,generatorButton:`MuiTsPasswordStrengthMeter-generatorButton`,confirmInput:`MuiTsPasswordStrengthMeter-confirmInput`,strengthBar:`MuiTsPasswordStrengthMeter-strengthBar`,strengthBarWeak:`MuiTsPasswordStrengthMeter-strengthBarWeak`,strengthBarOk:`MuiTsPasswordStrengthMeter-strengthBarOk`,strengthBarGood:`MuiTsPasswordStrengthMeter-strengthBarGood`,strengthBarVeryGood:`MuiTsPasswordStrengthMeter-strengthBarVeryGood`,summary:`MuiTsPasswordStrengthMeter-summary`,requirementItem:`MuiTsPasswordStrengthMeter-requirementItem`}})),he,ge,_e=e((()=>{h(),he=c(),ge=f((0,he.jsx)(`path`,{d:`M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z`}),`CheckCircle`)})),b,ve,x=e((()=>{h(),b=c(),ve=f((0,b.jsx)(`path`,{d:`M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z`}),`Cancel`)})),S,ye,be=e((()=>{h(),S=c(),ye=f((0,S.jsx)(`path`,{d:`M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3`}),`Visibility`)})),xe,Se,C=e((()=>{h(),xe=c(),Se=f((0,xe.jsx)(`path`,{d:`M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z`}),`VisibilityOff`)}));function Ce(e,t){let n=e??``,r=n.length,i=/[a-z]/.test(n),a=/[A-Z]/.test(n),o=/\d/.test(n),s=/[^A-Za-z0-9]/.test(n),c=[i,a,o,s].filter(Boolean).length;if(r<t){let e=r===0?0:1;return{score:e,percent:e*25,meterStatus:`weak`,length:r,hasLower:i,hasUpper:a,hasDigit:o,hasSymbol:s}}let l=0;l+=1,r>=t+4&&(l+=1),c>=2&&(l+=1),c>=3&&(l+=1),/^(.)\1+$/.test(n)&&(l-=2),/1234|abcd|qwer|password|passwort|admin/i.test(n)&&(l-=2);let u=w(l),ee=u<=1?`weak`:u===2?`ok`:u===3?`good`:`very good`;return{score:u,percent:u*25,meterStatus:ee,length:r,hasLower:i,hasUpper:a,hasDigit:o,hasSymbol:s}}var w,T=e((()=>{w=e=>Math.max(0,Math.min(4,Math.round(e)))}));function we({percent:e,color:t,ariaLabel:n,segments:i=!1,className:a}){if(i){let i=Math.round(e/25);return(0,E.jsx)(r,{role:`progressbar`,"aria-label":n,"aria-valuenow":e,"aria-valuemin":0,"aria-valuemax":100,className:a,sx:{width:`100%`,display:`flex`,gap:`3px`,mt:.5},children:[0,1,2,3].map(e=>(0,E.jsx)(r,{"data-testid":e<i?`psm-meter-segment-active`:`psm-meter-segment`,sx:{flex:1,height:`8px`,borderRadius:`3px`,border:`1px solid`,borderColor:`divider`,backgroundColor:e<i?t:`transparent`,transition:`background-color 0.3s ease-in-out`}},e))})}return(0,E.jsx)(r,{role:`progressbar`,"aria-label":n,"aria-valuenow":e,"aria-valuemin":0,"aria-valuemax":100,className:a,sx:{width:`100%`,height:`8px`,border:`1px solid`,borderColor:`divider`,borderRadius:`6px`,mt:.5,display:`flex`},children:(0,E.jsx)(r,{"data-testid":`psm-meter`,sx:{height:`100%`,width:`${e}%`,backgroundColor:t,borderRadius:`6px`,transition:`width 0.2s ease-in-out`}})})}var E,D=e((()=>{m(),E=c(),we.__docgenInfo={description:`Visuelle Fortschrittsleiste für die Passwortstärke.
role="progressbar" macht die Anzeige für Screenreader zugänglich —
ohne aria-Attribute wäre sie für assistive Technologien unsichtbar.`,methods:[],displayName:`PasswordStrengthBar`,props:{percent:{required:!0,tsType:{name:`number`},description:``},color:{required:!0,tsType:{name:`string`},description:``},ariaLabel:{required:!0,tsType:{name:`string`},description:``},segments:{required:!1,tsType:{name:`boolean`},description:`When true, renders 4 separate animated segments instead of a single bar.`,defaultValue:{value:`false`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``}}}})),Te,Ee,De,Oe=e((()=>{Te={label:`Password`,summaryHeaderLabel:`Requirements for your password`,summaryMinChars:`At least {n} characters`,summaryCapitalLetter:`At least 1 capital letter`,summaryLowerCaseLetter:`At least 1 lowercase letter`,summaryNumber:`At least 1 number`,summarySpecialChar:`At least 1 special character`,showPasswordLabel:`Show password`,hidePasswordLabel:`Hide password`,meterAriaLabel:`Password strength`,generatePasswordLabel:`Generate secure password`,confirmLabel:`Confirm password`,confirmMatchLabel:`Passwords match`,confirmMismatchLabel:`Passwords do not match`,copyPasswordLabel:`Copy password`,copiedLabel:`Copied!`},Ee={weak:`#cc0000`,ok:`#fdc010`,good:`#8bc34a`,veryGood:`#43a047`},De={failure:`#cc0000`,success:`#43a047`}}));function ke(e){let t=[];e.upper&&t.push(`ABCDEFGHIJKLMNOPQRSTUVWXYZ`),e.lower&&t.push(`abcdefghijklmnopqrstuvwxyz`),e.numbers&&t.push(`0123456789`),e.symbols&&t.push(`!@#$%^&*()-_=+[]{}|;:,.<>?`),t.length===0&&t.push(`abcdefghijklmnopqrstuvwxyz`);let n=t.join(``),r=Math.max(e.length,t.length),i=new Uint32Array(Math.max(0,r-t.length));crypto.getRandomValues(i);let a=t.map(e=>e[crypto.getRandomValues(new Uint32Array(1))[0]%e.length]),o=Array.from(i).map(e=>n[e%n.length]),s=[...a,...o];for(let e=s.length-1;e>0;e--){let t=crypto.getRandomValues(new Uint32Array(1))[0]%(e+1);[s[e],s[t]]=[s[t],s[e]]}return s.join(``)}function O({label:e,fulfilled:t,checkColors:n}){return(0,j.jsxs)(p,{direction:`row`,sx:{alignItems:`center`,mb:.25},spacing:.5,className:v.requirementItem,children:[(0,j.jsx)(o,{variant:`caption`,children:e}),t?(0,j.jsx)(pe,{"data-testid":`psm-req-success`,style:{fontSize:16,color:n.success}}):(0,j.jsx)(me,{"data-testid":`psm-req-failure`,style:{fontSize:16,color:n.failure}})]})}function k({value:e,confirmValue:t,name:i,inputRef:c,disabled:d=!1,error:f=!1,helperText:m,autoComplete:h,customRequirements:ie,generatorOptions:g,showConfirmField:oe=!1,showPasswordAdornment:_=!0,showMeter:ue=!0,showPasswordGenerator:de=!1,showSegmentedBar:fe=!1,showSummary:pe=!0,showCopyButton:me=!1,inputSize:y=`medium`,translation:he,meterColors:_e,passwordMinLength:b=8,checkColors:x=De,onPasswordChange:S,onConfirmChange:be,onPasswordGenerated:xe}){let C={...Te,...he},w={...Ee,..._e},T=(0,A.useId)(),E=`${T}-password`,[D,Oe]=(0,A.useState)(!1),[k,Ae]=(0,A.useState)(!1),[je,M]=(0,A.useState)(``),[N,P]=(0,A.useState)(``),[F,I]=le(),L=e===void 0?je:e,R=t===void 0?N:t,z=oe&&R.length>0,B=z&&L===R,V=(0,A.useMemo)(()=>Ce(L,b),[L,b]),H=()=>{Oe(e=>!e)},U=e=>{e.preventDefault()},W=e=>{e.preventDefault()},G=t=>{let n=t.target.value;e===void 0&&M(n),S&&S(n,Ce(n,b))},K=e=>{let n=e.target.value;t===void 0&&P(n),be?.(n,n===L)},q=()=>{let n=ke({length:g?.length??Math.max(16,b),upper:g?.upper??!0,lower:g?.lower??!0,numbers:g?.numbers??!0,symbols:g?.symbols??!0});e===void 0&&M(n),t===void 0&&P(``),S?.(n,Ce(n,b)),xe?.(n),Oe(!0)},J=()=>{navigator.clipboard.writeText(L).then(()=>{I()})},Y=e=>{switch(e.meterStatus){case`weak`:return w.weak;case`ok`:return w.ok;case`good`:return w.good;case`very good`:return w.veryGood;default:return`transparent`}},X=[v.strengthBar,V.meterStatus===`weak`&&v.strengthBarWeak,V.meterStatus===`ok`&&v.strengthBarOk,V.meterStatus===`good`&&v.strengthBarGood,V.meterStatus===`very good`&&v.strengthBarVeryGood].filter(Boolean).join(` `);return(0,j.jsxs)(p,{className:[v.root,d&&re.disabled,f&&re.error].filter(Boolean).join(` `),children:[(0,j.jsxs)(te,{variant:`outlined`,fullWidth:!0,error:f,className:v.input,children:[(0,j.jsx)(l,{htmlFor:E,size:y,children:C.label}),(0,j.jsx)(ee,{id:E,type:D?`text`:`password`,fullWidth:!0,size:y,value:L,onChange:G,disabled:d,inputRef:c,inputProps:{"data-testid":`psm-input`,name:i,autoComplete:h},endAdornment:_||me&&L.length>0?(0,j.jsxs)(ne,{position:`end`,children:[me&&L.length>0&&(0,j.jsx)(u,{title:F?C.copiedLabel:C.copyPasswordLabel,arrow:!0,children:(0,j.jsx)(`span`,{children:(0,j.jsx)(s,{"data-testid":`psm-copy`,disabled:d,"aria-label":F?C.copiedLabel:C.copyPasswordLabel,onClick:J,onMouseDown:U,onMouseUp:W,edge:_?!1:`end`,children:F?(0,j.jsx)(se,{fontSize:`small`,color:`success`}):(0,j.jsx)(ae,{fontSize:`small`})})})}),_&&(0,j.jsx)(s,{"data-testid":`psm-toggle`,disabled:d,"aria-label":D?C.hidePasswordLabel:C.showPasswordLabel,onClick:H,onMouseDown:U,onMouseUp:W,edge:`end`,children:D?(0,j.jsx)(Se,{}):(0,j.jsx)(ye,{})})]}):null,label:C.label}),m&&(0,j.jsx)(a,{children:m})]}),de&&(0,j.jsx)(u,{title:C.generatePasswordLabel,arrow:!0,children:(0,j.jsx)(`span`,{children:(0,j.jsx)(n,{"data-testid":`psm-generate`,size:`small`,variant:`text`,startIcon:(0,j.jsx)(ce,{fontSize:`small`}),disabled:d,onClick:q,className:v.generatorButton,sx:{mt:.5,alignSelf:`flex-start`,textTransform:`none`},children:C.generatePasswordLabel})})}),oe&&(0,j.jsxs)(te,{variant:`outlined`,fullWidth:!0,error:z&&!B,sx:{mt:1},className:v.confirmInput,children:[(0,j.jsx)(l,{htmlFor:`${T}-confirm`,size:y,children:C.confirmLabel}),(0,j.jsx)(ee,{id:`${T}-confirm`,type:k?`text`:`password`,fullWidth:!0,size:y,value:R,onChange:K,disabled:d,inputProps:{"data-testid":`psm-confirm-input`},endAdornment:(0,j.jsxs)(ne,{position:`end`,children:[z&&(B?(0,j.jsx)(ge,{"data-testid":`psm-confirm-match`,sx:{color:x.success,mr:.5},fontSize:`small`}):(0,j.jsx)(ve,{"data-testid":`psm-confirm-mismatch`,sx:{color:x.failure,mr:.5},fontSize:`small`})),(0,j.jsx)(s,{size:`small`,disabled:d,onClick:()=>Ae(e=>!e),onMouseDown:e=>e.preventDefault(),edge:`end`,"aria-label":k?C.hidePasswordLabel:C.showPasswordLabel,children:k?(0,j.jsx)(Se,{}):(0,j.jsx)(ye,{})})]}),label:C.confirmLabel}),z&&(0,j.jsx)(a,{sx:{color:B?x.success:x.failure},children:B?C.confirmMatchLabel:C.confirmMismatchLabel})]}),ue&&(0,j.jsx)(we,{percent:V.percent,color:Y(V),ariaLabel:C.meterAriaLabel,segments:fe,className:X}),pe&&(0,j.jsxs)(r,{"data-testid":`psm-summary`,sx:{mt:.5,p:.5},className:v.summary,children:[(0,j.jsx)(o,{variant:`caption`,gutterBottom:!0,sx:{display:`block`,fontSize:14},children:C.summaryHeaderLabel}),(0,j.jsxs)(p,{direction:`row`,spacing:6,children:[(0,j.jsxs)(p,{direction:`column`,children:[(0,j.jsx)(O,{label:C.summaryMinChars.replace(`{n}`,String(b)),fulfilled:V.length>=b,checkColors:x}),(0,j.jsx)(O,{label:C.summaryCapitalLetter,fulfilled:V.hasUpper,checkColors:x}),(0,j.jsx)(O,{label:C.summaryLowerCaseLetter,fulfilled:V.hasLower,checkColors:x})]}),(0,j.jsxs)(p,{direction:`column`,children:[(0,j.jsx)(O,{label:C.summaryNumber,fulfilled:V.hasDigit,checkColors:x}),(0,j.jsx)(O,{label:C.summarySpecialChar,fulfilled:V.hasSymbol,checkColors:x}),ie?.map((e,t)=>(0,j.jsx)(O,{label:e.label,fulfilled:typeof e.fulfilled==`function`?e.fulfilled(L):e.fulfilled,checkColors:x},t))]})]})]})]})}var A,j,Ae=e((()=>{m(),y(),ie(),_(),_e(),x(),be(),C(),g(),oe(),fe(),de(),A=t(i(),1),T(),D(),ue(),Oe(),j=c(),k.__docgenInfo={description:``,methods:[],displayName:`PasswordStrengthMeter`,props:{autoComplete:{required:!1,tsType:{name:`string`},description:``},checkColors:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  failure: string;
  success: string;
}`,signature:{properties:[{key:`failure`,value:{name:`string`,required:!0}},{key:`success`,value:{name:`string`,required:!0}}]}},description:``,defaultValue:{value:`{
  failure: "#cc0000",
  success: "#43a047",
}`,computed:!1}},customRequirements:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  label:     string;
  fulfilled: boolean | ((password: string) => boolean);
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`fulfilled`,value:{name:`union`,raw:`boolean | ((password: string) => boolean)`,elements:[{name:`boolean`},{name:`unknown`}],required:!0}}]}}],raw:`CustomRequirement[]`},description:`Additional custom requirements shown alongside the built-in ones.`},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},error:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},confirmValue:{required:!1,tsType:{name:`string`},description:`Value of the confirm input in controlled mode.`},generatorOptions:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  /** Total password length (default: 16) */
  length?:  number;
  /** Include uppercase letters A–Z (default: true) */
  upper?:   boolean;
  /** Include lowercase letters a–z (default: true) */
  lower?:   boolean;
  /** Include digits 0–9 (default: true) */
  numbers?: boolean;
  /** Include symbols !@#$%^&*... (default: true) */
  symbols?: boolean;
}`,signature:{properties:[{key:`length`,value:{name:`number`,required:!1},description:`Total password length (default: 16)`},{key:`upper`,value:{name:`boolean`,required:!1},description:`Include uppercase letters A–Z (default: true)`},{key:`lower`,value:{name:`boolean`,required:!1},description:`Include lowercase letters a–z (default: true)`},{key:`numbers`,value:{name:`boolean`,required:!1},description:`Include digits 0–9 (default: true)`},{key:`symbols`,value:{name:`boolean`,required:!1},description:`Include symbols !@#$%^&*... (default: true)`}]}},description:`Options for the built-in password generator (used when showPasswordGenerator=true).`},helperText:{required:!1,tsType:{name:`string`},description:``},inputRef:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:``},inputSize:{required:!1,tsType:{name:`union`,raw:`"small" | "medium"`,elements:[{name:`literal`,value:`"small"`},{name:`literal`,value:`"medium"`}]},description:``,defaultValue:{value:`"medium"`,computed:!1}},meterColors:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  weak: string;
  ok: string;
  good: string;
  veryGood: string;
}`,signature:{properties:[{key:`weak`,value:{name:`string`,required:!0}},{key:`ok`,value:{name:`string`,required:!0}},{key:`good`,value:{name:`string`,required:!0}},{key:`veryGood`,value:{name:`string`,required:!0}}]}}],raw:`Partial<MeterColors>`},description:``},name:{required:!1,tsType:{name:`string`},description:``},passwordMinLength:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`8`,computed:!1}},showMeter:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showPasswordAdornment:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showConfirmField:{required:!1,tsType:{name:`boolean`},description:`Show a second "Confirm password" input with match validation indicator.`,defaultValue:{value:`false`,computed:!1}},showPasswordGenerator:{required:!1,tsType:{name:`boolean`},description:`Show a "Generate secure password" button — generates and fills a strong password on click.`,defaultValue:{value:`false`,computed:!1}},showSummary:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},showSegmentedBar:{required:!1,tsType:{name:`boolean`},description:`Render the strength bar as 4 animated segments instead of a single growing bar.`,defaultValue:{value:`false`,computed:!1}},showCopyButton:{required:!1,tsType:{name:`boolean`},description:`Show a copy-to-clipboard button next to the password field (visible once a password is entered).`,defaultValue:{value:`false`,computed:!1}},translation:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  label: string;
  summaryHeaderLabel: string;
  // {n} wird zur Laufzeit durch passwordMinLength ersetzt, z. B. "Mindestens 8 Zeichen".
  summaryMinChars: string;
  summaryCapitalLetter: string;
  summaryLowerCaseLetter: string;
  summaryNumber: string;
  summarySpecialChar: string;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  meterAriaLabel: string;
  /** Tooltip for the password generator button */
  generatePasswordLabel: string;
  /** Label for the confirm password input */
  confirmLabel: string;
  /** Shown when passwords match */
  confirmMatchLabel: string;
  /** Shown when passwords do not match */
  confirmMismatchLabel: string;
  /** Tooltip for the copy-to-clipboard button @since 3.9.0 */
  copyPasswordLabel?: string;
  /** Tooltip shown briefly after a successful copy @since 3.9.0 */
  copiedLabel?:       string;
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`summaryHeaderLabel`,value:{name:`string`,required:!0}},{key:`summaryMinChars`,value:{name:`string`,required:!0}},{key:`summaryCapitalLetter`,value:{name:`string`,required:!0}},{key:`summaryLowerCaseLetter`,value:{name:`string`,required:!0}},{key:`summaryNumber`,value:{name:`string`,required:!0}},{key:`summarySpecialChar`,value:{name:`string`,required:!0}},{key:`showPasswordLabel`,value:{name:`string`,required:!0}},{key:`hidePasswordLabel`,value:{name:`string`,required:!0}},{key:`meterAriaLabel`,value:{name:`string`,required:!0}},{key:`generatePasswordLabel`,value:{name:`string`,required:!0},description:`Tooltip for the password generator button`},{key:`confirmLabel`,value:{name:`string`,required:!0},description:`Label for the confirm password input`},{key:`confirmMatchLabel`,value:{name:`string`,required:!0},description:`Shown when passwords match`},{key:`confirmMismatchLabel`,value:{name:`string`,required:!0},description:`Shown when passwords do not match`},{key:`copyPasswordLabel`,value:{name:`string`,required:!1},description:`Tooltip for the copy-to-clipboard button @since 3.9.0`},{key:`copiedLabel`,value:{name:`string`,required:!1},description:`Tooltip shown briefly after a successful copy @since 3.9.0`}]}}],raw:`Partial<PasswordStrengthMeterTranslation>`},description:``},value:{required:!1,tsType:{name:`string`},description:``},onPasswordChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(password: string, strengthResult: StrengthResult) => void`,signature:{arguments:[{type:{name:`string`},name:`password`},{type:{name:`signature`,type:`object`,raw:`{
  score: StrengthScore;
  percent: number; // 0..100, immer score * 25
  meterStatus: MeterStatus;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
}`,signature:{properties:[{key:`score`,value:{name:`union`,raw:`0 | 1 | 2 | 3 | 4`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`1`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`}],required:!0}},{key:`percent`,value:{name:`number`,required:!0}},{key:`meterStatus`,value:{name:`union`,raw:`"weak" | "ok" | "good" | "very good"`,elements:[{name:`literal`,value:`"weak"`},{name:`literal`,value:`"ok"`},{name:`literal`,value:`"good"`},{name:`literal`,value:`"very good"`}],required:!0}},{key:`length`,value:{name:`number`,required:!0}},{key:`hasLower`,value:{name:`boolean`,required:!0}},{key:`hasUpper`,value:{name:`boolean`,required:!0}},{key:`hasDigit`,value:{name:`boolean`,required:!0}},{key:`hasSymbol`,value:{name:`boolean`,required:!0}}]}},name:`strengthResult`}],return:{name:`void`}}},description:``},onConfirmChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(confirmValue: string, matches: boolean) => void`,signature:{arguments:[{type:{name:`string`},name:`confirmValue`},{type:{name:`boolean`},name:`matches`}],return:{name:`void`}}},description:`Fired when the confirm field value changes — includes whether the passwords match.`},onPasswordGenerated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(password: string) => void`,signature:{arguments:[{type:{name:`string`},name:`password`}],return:{name:`void`}}},description:`Fired when a password was generated — receives the generated password.`}}}}));function je(e){let[t,n]=(0,M.useState)(``);return(0,N.jsxs)(r,{sx:{maxWidth:420,display:`flex`,flexDirection:`column`,gap:2},children:[(0,N.jsx)(d,{label:`External password field`,size:`small`,value:t,onChange:e=>n(e.target.value),helperText:`This field drives the PasswordStrengthMeter from outside.`}),(0,N.jsx)(k,{...e,value:t,showPasswordAdornment:!1,onPasswordChange:(t,n)=>{e.onPasswordChange?.(t,n)}}),(0,N.jsxs)(o,{variant:`caption`,color:`text.secondary`,children:[`Current value: "`,t,`"`]})]})}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,Me;e((()=>{m(),M=t(i(),1),Ae(),N=c(),{fn:P}=__STORYBOOK_MODULE_TEST__,F={title:`Components/PasswordStrengthMeter`,component:k,args:{disabled:!1,error:!1,helperText:``,inputSize:`medium`,passwordMinLength:8,showConfirmField:!1,showMeter:!0,showPasswordAdornment:!0,showPasswordGenerator:!1,showSegmentedBar:!1,showSummary:!0,showCopyButton:!1,onPasswordChange:P(),onPasswordGenerated:P()},argTypes:{autoComplete:{control:!1},checkColors:{control:!1},confirmValue:{control:!1},customRequirements:{control:!1},disabled:{control:`boolean`},error:{control:`boolean`},generatorOptions:{control:!1},helperText:{control:`text`},inputRef:{control:!1},inputSize:{control:`radio`,options:[`small`,`medium`]},meterColors:{control:!1},name:{control:!1},passwordMinLength:{control:`number`},showConfirmField:{control:`boolean`},showMeter:{control:`boolean`},showPasswordAdornment:{control:`boolean`},showPasswordGenerator:{control:`boolean`},showSegmentedBar:{control:`boolean`},showSummary:{control:`boolean`},showCopyButton:{control:`boolean`},translation:{control:!1},value:{control:!1},onConfirmChange:{control:!1},onPasswordChange:{control:!1},onPasswordGenerated:{control:!1}},parameters:{controls:{sort:`alpha`}}},I={render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},L={args:{inputSize:`small`},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},R={args:{showMeter:!1},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},z={args:{showSummary:!1},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},B={args:{showPasswordAdornment:!1},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},V={args:{translation:{label:`Passwort`,summaryHeaderLabel:`Anforderungen an Ihr Passwort`,summaryMinChars:`Mindestens {n} Zeichen`,summaryCapitalLetter:`Mindestens 1 Großbuchstabe`,summaryLowerCaseLetter:`Mindestens 1 Kleinbuchstabe`,summaryNumber:`Mindestens 1 Zahl`,summarySpecialChar:`Mindestens 1 Sonderzeichen`,showPasswordLabel:`Passwort anzeigen`,hidePasswordLabel:`Passwort verbergen`,meterAriaLabel:`Passwortstärke`,generatePasswordLabel:`Sicheres Passwort generieren`}},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},H={args:{meterColors:{weak:`#e91e63`,ok:`#ff9800`,good:`#2196f3`,veryGood:`#9c27b0`},checkColors:{failure:`#e91e63`,success:`#9c27b0`}},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},U={args:{disabled:!0},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},W={args:{error:!0,helperText:`Password does not meet the requirements.`},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},G={render:e=>(0,N.jsx)(je,{...e})},K={parameters:{docs:{description:{story:"`showSegmentedBar` replaces the single growing strength bar with **4 individually animated segments**. Each segment lights up as the password strength increases. The pre-filled password already shows 3 active segments — try changing it to see the segments animate."}}},args:{value:`MyP@ssw0rd`,showSegmentedBar:!0},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},q={parameters:{docs:{description:{story:'`customRequirements` adds your own password rules below the built-in 5. Each entry has a `label` and a `fulfilled` value — either a static `boolean` or a **live function** `(password: string) => boolean` that is re-evaluated on every keystroke. The pre-filled password intentionally violates the "no spaces" rule so you can see both ✅ and ❌ states. Try removing the space to watch both custom requirements turn green.'}}},args:{value:`hello world`,customRequirements:[{label:`No spaces allowed`,fulfilled:e=>!e.includes(` `)},{label:`Must start with a letter`,fulfilled:e=>/^[a-zA-Z]/.test(e)}]},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},J={parameters:{docs:{description:{story:'`showPasswordGenerator={true}` — shows a "Generate secure password" button below the input. Clicking it fills the field with a cryptographically strong password (16 chars by default: uppercase + lowercase + digits + symbols). The password is revealed automatically. `generatorOptions` lets you customize length and character classes. `onPasswordGenerated` fires with the generated password.'}}},args:{showPasswordGenerator:!0,showSegmentedBar:!0,generatorOptions:{length:20,upper:!0,lower:!0,numbers:!0,symbols:!0}},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},Y={parameters:{docs:{description:{story:'Requesting a `generatorOptions.length` shorter than the number of active character classes — here `length: 3` with all 4 classes (upper/lower/numbers/symbols) active. The generator guarantees one character per active class, so the actual length is the larger of the two: it never produces fewer characters than active classes, and never silently exceeds that guaranteed minimum either. Click "Generate secure password" repeatedly to confirm the length stays consistent.'}}},args:{showPasswordGenerator:!0,showSegmentedBar:!0,generatorOptions:{length:3,upper:!0,lower:!0,numbers:!0,symbols:!0}},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},X={parameters:{docs:{description:{story:"`showCopyButton={true}` — adds a copy-to-clipboard icon next to the password field, visible once a password is present. Pairs naturally with `showPasswordGenerator`: without a copy button, a generated password is awkward to get out of the field on mobile, where selecting text manually is fiddly. Shows a brief checkmark confirmation after copying."}}},args:{showPasswordGenerator:!0,showCopyButton:!0,generatorOptions:{length:20}},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},Z={parameters:{docs:{description:{story:'`showConfirmField={true}` adds a second "Confirm password" input. A green ✓ + "Passwords match" appears when both values are identical. A red ✗ + "Passwords do not match" appears when they differ. Works in controlled (`confirmValue`) and uncontrolled mode. `onConfirmChange(value, matches)` fires on every keystroke.'}}},args:{showConfirmField:!0,showSegmentedBar:!0,showPasswordGenerator:!0},render:e=>(0,N.jsx)(r,{sx:{maxWidth:420},children:(0,N.jsx)(k,{...e})})},Q={parameters:{docs:{description:{story:`**Real-world use case: an account signup form.** Friendly defaults — segmented bar for quick visual feedback, a generator for users who want a strong password without thinking about it, and a confirm field to catch typos before submit.`}}},args:{showSegmentedBar:!0,showPasswordGenerator:!0,showConfirmField:!0,passwordMinLength:10},render:e=>(0,N.jsxs)(r,{sx:{maxWidth:420},children:[(0,N.jsx)(o,{variant:`h6`,sx:{mb:.5},children:`Create your account`}),(0,N.jsx)(o,{variant:`body2`,color:`text.secondary`,sx:{mb:2},children:`Free 14-day trial, no credit card required.`}),(0,N.jsx)(k,{...e})]})},$={parameters:{docs:{description:{story:"**Real-world use case: an enterprise admin console enforcing a strict security policy** (e.g. SOC 2 / ISO 27001 compliance). `customRequirements` adds organization-specific rules — no dictionary words, no reused passwords — on top of the built-in checks, with a higher minimum length."}}},args:{passwordMinLength:14,showSegmentedBar:!0,customRequirements:[{label:`Must not contain your username`,fulfilled:e=>!e.toLowerCase().includes(`admin`)},{label:`Must differ from your last 5 passwords`,fulfilled:!0}]},render:e=>(0,N.jsxs)(r,{sx:{maxWidth:420},children:[(0,N.jsx)(o,{variant:`h6`,sx:{mb:.5},children:`Reset Required`}),(0,N.jsx)(o,{variant:`body2`,color:`text.secondary`,sx:{mb:2},children:`Your organization requires a password reset every 90 days.`}),(0,N.jsx)(k,{...e})]})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    inputSize: "small"
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    showMeter: false
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    showSummary: false
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    showPasswordAdornment: false
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    translation: {
      label: "Passwort",
      summaryHeaderLabel: "Anforderungen an Ihr Passwort",
      summaryMinChars: "Mindestens {n} Zeichen",
      summaryCapitalLetter: "Mindestens 1 Großbuchstabe",
      summaryLowerCaseLetter: "Mindestens 1 Kleinbuchstabe",
      summaryNumber: "Mindestens 1 Zahl",
      summarySpecialChar: "Mindestens 1 Sonderzeichen",
      showPasswordLabel: "Passwort anzeigen",
      hidePasswordLabel: "Passwort verbergen",
      meterAriaLabel: "Passwortstärke",
      generatePasswordLabel: "Sicheres Passwort generieren"
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    meterColors: {
      weak: "#e91e63",
      ok: "#ff9800",
      good: "#2196f3",
      veryGood: "#9c27b0"
    },
    checkColors: {
      failure: "#e91e63",
      success: "#9c27b0"
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    error: true,
    helperText: "Password does not meet the requirements."
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <ControlledStory {...args} />
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showSegmentedBar\` replaces the single growing strength bar with **4 individually animated segments**. ' + 'Each segment lights up as the password strength increases. ' + 'The pre-filled password already shows 3 active segments — try changing it to see the segments animate.'
      }
    }
  },
  args: {
    // Pre-filled so the segmented bar effect is immediately visible without typing.
    value: "MyP@ssw0rd",
    showSegmentedBar: true
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`customRequirements\` adds your own password rules below the built-in 5. ' + 'Each entry has a \`label\` and a \`fulfilled\` value — either a static \`boolean\` or a **live function** ' + '\`(password: string) => boolean\` that is re-evaluated on every keystroke. ' + 'The pre-filled password intentionally violates the "no spaces" rule so you can see both ✅ and ❌ states. ' + 'Try removing the space to watch both custom requirements turn green.'
      }
    }
  },
  args: {
    // "hello world" → "No spaces allowed" ❌, "Must start with a letter" ✅ — shows mixed state immediately.
    value: "hello world",
    customRequirements: [{
      label: "No spaces allowed",
      fulfilled: pw => !pw.includes(" ")
    }, {
      label: "Must start with a letter",
      fulfilled: pw => /^[a-zA-Z]/.test(pw)
    }]
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showPasswordGenerator={true}\` — shows a "Generate secure password" button below the input. ' + 'Clicking it fills the field with a cryptographically strong password (16 chars by default: ' + 'uppercase + lowercase + digits + symbols). The password is revealed automatically. ' + '\`generatorOptions\` lets you customize length and character classes. ' + '\`onPasswordGenerated\` fires with the generated password.'
      }
    }
  },
  args: {
    showPasswordGenerator: true,
    showSegmentedBar: true,
    generatorOptions: {
      length: 20,
      upper: true,
      lower: true,
      numbers: true,
      symbols: true
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Requesting a \`generatorOptions.length\` shorter than the number of active character classes ' + '— here \`length: 3\` with all 4 classes (upper/lower/numbers/symbols) active. The generator ' + 'guarantees one character per active class, so the actual length is the larger of the two: ' + 'it never produces fewer characters than active classes, and never silently exceeds that ' + 'guaranteed minimum either. Click "Generate secure password" repeatedly to confirm the length ' + 'stays consistent.'
      }
    }
  },
  args: {
    showPasswordGenerator: true,
    showSegmentedBar: true,
    generatorOptions: {
      length: 3,
      upper: true,
      lower: true,
      numbers: true,
      symbols: true
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showCopyButton={true}\` — adds a copy-to-clipboard icon next to the password field, ' + 'visible once a password is present. Pairs naturally with \`showPasswordGenerator\`: ' + 'without a copy button, a generated password is awkward to get out of the field on mobile, ' + 'where selecting text manually is fiddly. Shows a brief checkmark confirmation after copying.'
      }
    }
  },
  args: {
    showPasswordGenerator: true,
    showCopyButton: true,
    generatorOptions: {
      length: 20
    }
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showConfirmField={true}\` adds a second "Confirm password" input. ' + 'A green ✓ + "Passwords match" appears when both values are identical. ' + 'A red ✗ + "Passwords do not match" appears when they differ. ' + 'Works in controlled (\`confirmValue\`) and uncontrolled mode. ' + '\`onConfirmChange(value, matches)\` fires on every keystroke.'
      }
    }
  },
  args: {
    showConfirmField: true,
    showSegmentedBar: true,
    showPasswordGenerator: true
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: an account signup form.** ' + 'Friendly defaults — segmented bar for quick visual feedback, a generator for users who want a strong ' + 'password without thinking about it, and a confirm field to catch typos before submit.'
      }
    }
  },
  args: {
    showSegmentedBar: true,
    showPasswordGenerator: true,
    showConfirmField: true,
    passwordMinLength: 10
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <Typography variant="h6" sx={{
      mb: 0.5
    }}>Create your account</Typography>
      <Typography variant="body2" color="text.secondary" sx={{
      mb: 2
    }}>
        Free 14-day trial, no credit card required.
      </Typography>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: an enterprise admin console enforcing a strict security policy** ' + '(e.g. SOC 2 / ISO 27001 compliance). \`customRequirements\` adds organization-specific rules — ' + 'no dictionary words, no reused passwords — on top of the built-in checks, with a higher minimum length.'
      }
    }
  },
  args: {
    passwordMinLength: 14,
    showSegmentedBar: true,
    customRequirements: [{
      label: "Must not contain your username",
      fulfilled: pw => !pw.toLowerCase().includes("admin")
    }, {
      label: "Must differ from your last 5 passwords",
      fulfilled: true
    }]
  },
  render: args => <Box sx={{
    maxWidth: 420
  }}>
      <Typography variant="h6" sx={{
      mb: 0.5
    }}>Reset Required</Typography>
      <Typography variant="body2" color="text.secondary" sx={{
      mb: 2
    }}>
        Your organization requires a password reset every 90 days.
      </Typography>
      <PasswordStrengthMeter {...args} />
    </Box>
}`,...$.parameters?.docs?.source}}},Me=[`Default`,`SmallInput`,`NoMeter`,`NoSummary`,`NoAdornment`,`GermanTranslation`,`CustomColors`,`Disabled`,`WithError`,`Controlled`,`SegmentedBar`,`WithCustomRequirements`,`WithPasswordGenerator`,`GeneratorShortLength`,`WithCopyButton`,`WithConfirmField`,`SignupForm`,`AdminPasswordReset`]}))();export{$ as AdminPasswordReset,G as Controlled,H as CustomColors,I as Default,U as Disabled,Y as GeneratorShortLength,V as GermanTranslation,B as NoAdornment,R as NoMeter,z as NoSummary,K as SegmentedBar,Q as SignupForm,L as SmallInput,Z as WithConfirmField,X as WithCopyButton,q as WithCustomRequirements,W as WithError,J as WithPasswordGenerator,Me as __namedExportsOrder,F as default};