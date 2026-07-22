import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{A as n,C as r,D as i,E as a,I as o,K as s,L as c,O as l,Q as u,U as d,V as f,W as p,Y as m,Z as h,b as g,c as _,f as v,i as y,j as b,k as x,l as S,n as C,p as w,q as T,r as E,t as D,u as O,w as ee}from"./iframe-Bb8mcAY9.js";import{t as k}from"./createSvgIcon-CmGEPqU-.js";import{i as A,n as j,r as M,t as te}from"./esm-cz_NIqIn.js";import{n as N,t as P}from"./Add-DetvY5lx.js";import{n as ne,t as re}from"./Delete-Bf4asqrk.js";import{n as F,t as ie}from"./Download-q3Qo5rcP.js";function ae(e){let t=new Date,n=Ee(t),r=De(t);if(e.length===0)return{start:n,end:r};let i=e.map(e=>e.startDate.getTime()),a=e.map(e=>e.endDate.getTime()),o=de(L(new Date(Math.min(...i)),-1)),s=fe(L(new Date(Math.max(...a)),1));return{start:o<n?o:n,end:s>r?s:r}}function oe(e,t){return t===`weeks`?{start:_e(e.start),end:e.end}:t===`quarters`?{start:Ee(e.start),end:De(e.end)}:e}function se(e,t){let n=t.end.getTime()-t.start.getTime();if(n<=0)return{left:0,width:0};let r=(e.startDate.getTime()-t.start.getTime())/n*100,i=(e.endDate.getTime()-e.startDate.getTime())/n*100;return{left:Math.max(0,r),width:Math.max(0,i)}}function I(e){let t=new Map;for(let n of e)t.set(n.id,{...n,children:[],depth:0});let n=[];for(let e of t.values())e.parentId&&t.has(e.parentId)?t.get(e.parentId).children.push(e):n.push(e);return ce(n,0),n}function ce(e,t){for(let n of e)n.depth=t,ce(n.children,t+1)}function le(e,t){let n=[];function r(e){for(let i of e)n.push(i),i.children.length>0&&t.has(i.id)&&r(i.children)}return r(e),n}function ue(e,t){function n(e){return e.assignee===t?!0:e.children.some(n)}return e.filter(n)}function de(e){return new Date(e.getFullYear(),e.getMonth(),1,0,0,0,0)}function fe(e){return new Date(e.getFullYear(),e.getMonth()+1,0,23,59,59,999)}function L(e,t){return new Date(e.getFullYear(),e.getMonth()+t,e.getDate())}function R(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t,0,0,0,0)}function pe(e){let t=new Map;for(let n of e)for(let e of n.dependencies??[])t.has(e)||t.set(e,[]),t.get(e).push(n.id);return t}function me(e,t,n,r,i){if(n===0)return e;let a=(r?.length??0)>0&&i!==void 0,o=pe(e),s=new Map(e.map(e=>[e.id,e])),c=[...o.get(t)??[]],l=new Set;for(;c.length>0;){let e=c.shift();if(l.has(e))continue;l.add(e);let t=s.get(e),u=new Date(t.startDate.getTime()+n),d=new Date(t.endDate.getTime()+n),f=u,p=d;if(a){let e=t.endDate.getTime()-t.startDate.getTime();f=Ce(u,r,i),p=new Date(f.getTime()+e)}s.set(e,{...t,startDate:f,endDate:p}),c.push(...o.get(e)??[])}return e.map(e=>s.get(e.id))}function he(e,t){let n=pe(e),r=new Set,i=[...n.get(t)??[]];for(;i.length>0;){let e=i.shift();r.has(e)||(r.add(e),i.push(...n.get(e)??[]))}return r}function ge(e){let t=[],n=de(e.start);for(;n<=e.end;)t.push(n),n=L(n,1);return t}function _e(e){let t=new Date(e),n=t.getDay(),r=n===0?-6:1-n;return t.setDate(t.getDate()+r),t.setHours(0,0,0,0),t}function ve(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}function ye(e){let t=[],n=_e(e.start);for(;n<=e.end;)t.push(new Date(n)),n=new Date(n.getFullYear(),n.getMonth(),n.getDate()+7);return t}function be(e){return`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`}function xe(e){return new Set(e.map(be))}function Se(e,t,n){return t.includes(e.getDay())?!n.has(be(e)):!1}function Ce(e,t,n){let r=new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0),i=0;for(;!Se(r,t,n)&&i++<14;)r=new Date(r.getFullYear(),r.getMonth(),r.getDate()+1,0,0,0,0);return r}function we(e,t,n){let r=new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0),i=0;for(;!Se(r,t,n)&&i++<14;)r=new Date(r.getFullYear(),r.getMonth(),r.getDate()-1,0,0,0,0);return r}function Te(e){let t=[],n=new Date(e.start.getFullYear(),e.start.getMonth(),e.start.getDate(),0,0,0,0),r=new Date(e.end.getFullYear(),e.end.getMonth(),e.end.getDate(),0,0,0,0).getTime();for(;n.getTime()<=r;)t.push(new Date(n)),n=new Date(n.getFullYear(),n.getMonth(),n.getDate()+1,0,0,0,0);return t}function Ee(e){let t=Math.floor(e.getMonth()/3)*3;return new Date(e.getFullYear(),t,1,0,0,0,0)}function De(e){let t=Math.floor(e.getMonth()/3)*3+2;return fe(new Date(e.getFullYear(),t,1))}function Oe(e){let t=[],n=Ee(e.start);for(;n<=e.end;){let e=Math.floor(n.getMonth()/3)+1;t.push({key:`${n.getFullYear()}-Q${e}`,label:`Q${e} ${n.getFullYear()}`,start:new Date(n)}),n=new Date(n.getFullYear(),n.getMonth()+3,1)}return t}function ke(e){if(e.length===0)return new Set;let t=new Map;for(let n of e)for(let e of n.dependencies??[])t.has(e)||t.set(e,[]),t.get(e).push(n.id);let n=new Map(e.map(e=>[e.id,e])),r=new Map,i=new Set;function a(e){if(r.has(e))return r.get(e);if(i.has(e))return n.get(e)?.endDate.getTime()??0;i.add(e);let o=n.get(e)?.endDate.getTime()??0;for(let n of t.get(e)??[])o=Math.max(o,a(n));return i.delete(e),r.set(e,o),o}for(let t of e)a(t.id);let o=Math.max(...r.values()),s=new Set;for(let t of e)a(t.id)===o&&s.add(t.id);return s}var Ae=e((()=>{}));function je(e,t){let n=t.startDate<e.start?de(L(t.startDate,-1)):e.start,r=t.endDate>e.end?fe(L(t.endDate,1)):e.end;return n===e.start&&r===e.end?e:{start:n,end:r}}function Me(e,t=`months`,n=!1,r,i=!1,a=[],o=new Set){let s=ae(e);return M((c,l)=>({tasks:e,taskTree:I(e),expandedIds:n?new Set(e.map(e=>e.id)):new Set(e.filter(e=>!e.parentId).map(e=>e.id)),timeScale:t,timelineRange:r??s,isRangeCustomized:r!==void 0,cascadeDependencies:i,defaultTimeScale:t,initialExpandAll:n,isExpandedCustomized:!1,assigneeFilter:``,setAssigneeFilter:e=>c({assigneeFilter:e}),setTasks:e=>{c(t=>({tasks:e,taskTree:I(e),...t.isRangeCustomized?{}:{timelineRange:ae(e)}}))},addTask:e=>{c(t=>{let n=[...t.tasks,e];return{tasks:n,taskTree:I(n),timelineRange:je(t.timelineRange,e)}})},updateTask:e=>{c(t=>{let n=t.tasks.find(t=>t.id===e.id),r=t.tasks.map(t=>t.id===e.id?e:t);if(t.cascadeDependencies&&n){let t=e.endDate.getTime()-n.endDate.getTime();r=me(r,e.id,t,a.length>0?a:void 0,a.length>0?o:void 0)}let i=je(t.timelineRange,e);for(let e of r)i=je(i,e);return{tasks:r,taskTree:I(r),timelineRange:i}})},deleteTask:e=>{c(t=>{let n=new Set,r=e=>{n.add(e),t.tasks.filter(t=>t.parentId===e).forEach(e=>r(e.id))};r(e);let i=t.tasks.filter(e=>!n.has(e.id));return{tasks:i,taskTree:I(i)}})},toggleExpand:e=>{c(t=>{let n=new Set(t.expandedIds);return n.has(e)?n.delete(e):n.add(e),{expandedIds:n}})},expandAll:()=>{c(e=>({expandedIds:new Set(e.tasks.map(e=>e.id)),isExpandedCustomized:!0}))},collapseAll:()=>{c({expandedIds:new Set,isExpandedCustomized:!0})},setTimeScale:e=>{c({timeScale:e})},setTimelineRange:e=>{c({timelineRange:e,isRangeCustomized:!0})},resetTimelineRange:()=>{c(e=>({timelineRange:ae(e.tasks),isRangeCustomized:!1}))},resetView:()=>{c(e=>({timeScale:e.defaultTimeScale,timelineRange:ae(e.tasks),isRangeCustomized:!1,isExpandedCustomized:!1,assigneeFilter:``,expandedIds:e.initialExpandAll?new Set(e.tasks.map(e=>e.id)):new Set(e.tasks.filter(e=>!e.parentId).map(e=>e.id))}))},getVisibleTasks:()=>{let{taskTree:e,expandedIds:t}=l();return le(e,t)}}))}var Ne=e((()=>{A(),Ae()})),Pe,Fe=e((()=>{Pe={scaleDays:`Tage`,scaleWeeks:`Wochen`,scaleMonths:`Monate`,scaleQuarters:`Quartale`,rangeFrom:`Von`,rangeTo:`Bis`,rangeResetTooltip:`Bereich zurücksetzen`,columnName:`Name`,columnStatus:`Status`,statusPlanned:`Planned`,statusInProgress:`In Progress`,statusDone:`Done`,statusBlocked:`Blocked`,weekColumnPrefix:`KW`,todayLabel:`Heute`,dateLocale:`de-DE`,dialogAddTitle:`Aufgabe hinzufügen`,dialogEditTitle:`Aufgabe bearbeiten`,dialogDeleteTitle:`Aufgabe löschen`,dialogSave:`Speichern`,dialogCancel:`Abbrechen`,dialogDelete:`Löschen`,dialogFieldName:`Name`,dialogFieldStartDate:`Startdatum`,dialogFieldEndDate:`Enddatum`,dialogFieldStatus:`Status`,dialogFieldMilestone:`Ist Meilenstein`,dialogFieldParent:`Übergeordnete Aufgabe`,dialogFieldParentNone:`— Keine —`,dialogDeleteConfirm:`Soll die Aufgabe "{name}" wirklich gelöscht werden?`,dialogFieldDependencies:`Vorgänger`,dialogFieldDependenciesNone:`— Keine —`,dialogFieldProgress:`Fortschritt (%)`,filterAssigneeAll:`Alle`,filterAssigneeLabel:`Assignee`,scrollToTodayTooltip:`Zum heutigen Tag`,expandAllTooltip:`Alle aufklappen`,collapseAllTooltip:`Alle zuklappen`,resetViewTooltip:`Ansicht zurücksetzen`,columnActions:`Aktionen`,columnAssignee:`Assignee`,exportCsvTooltip:`Als CSV exportieren`,addTaskTooltip:`Aufgabe hinzufügen`,editTaskTooltip:`Aufgabe bearbeiten`,deleteTaskTooltip:`Aufgabe löschen`}}));function Ie(e,t,n){let r=n.initialDeps??[],i,a=!0;function o(){let o;n.key&&n.debug?.call(n)&&(o=Date.now());let s=e();if(!(s.length!==r.length||s.some((e,t)=>r[t]!==e)))return i;r=s;let c;if(n.key&&n.debug?.call(n)&&(c=Date.now()),i=t(...s),n.key&&n.debug?.call(n)){let e=Math.round((Date.now()-o)*100)/100,t=Math.round((Date.now()-c)*100)/100,r=t/16,i=(e,t)=>{for(e=String(e);e.length<t;)e=` `+e;return e};console.info(`%c⏱ ${i(t,5)} /${i(e,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*r,120))}deg 100% 31%);`,n?.key)}return n?.onChange&&!(a&&n.skipInitialOnChange)&&n.onChange(i),a=!1,i}return o.updateDeps=e=>{r=e},o}function Le(e,t){if(e===void 0)throw Error(`Unexpected undefined${t?`: ${t}`:``}`);return e}var Re,ze,Be=e((()=>{Re=(e,t)=>Math.abs(e-t)<1.01,ze=(e,t,n)=>{let r;return function(...i){e.clearTimeout(r),r=e.setTimeout(()=>t.apply(this,i),n)}}}));function Ve({measurements:e,outerSize:t,scrollOffset:n,lanes:r}){let i=e.length-1,a=t=>e[t].start;if(e.length<=r)return{startIndex:0,endIndex:i};let o=Qe(0,i,a,n),s=o;if(r===1)for(;s<i&&e[s].end<n+t;)s++;else if(r>1){let a=Array(r).fill(0);for(;s<i&&a.some(e=>e<n+t);){let t=e[s];a[t.lane]=t.end,s++}let c=Array(r).fill(n+t);for(;o>=0&&c.some(e=>e>=n);){let t=e[o];c[t.lane]=t.start,o--}o=Math.max(0,o-o%r),s=Math.min(i,s+(r-1-s%r))}return{startIndex:o,endIndex:s}}var He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e=e((()=>{Be(),He=e=>{let{offsetWidth:t,offsetHeight:n}=e;return{width:t,height:n}},Ue=e=>e,We=e=>{let t=Math.max(e.startIndex-e.overscan,0),n=Math.min(e.endIndex+e.overscan,e.count-1),r=[];for(let e=t;e<=n;e++)r.push(e);return r},Ge=(e,t)=>{let n=e.scrollElement;if(!n)return;let r=e.targetWindow;if(!r)return;let i=e=>{let{width:n,height:r}=e;t({width:Math.round(n),height:Math.round(r)})};if(i(He(n)),!r.ResizeObserver)return()=>{};let a=new r.ResizeObserver(t=>{let r=()=>{let e=t[0];if(e?.borderBoxSize){let t=e.borderBoxSize[0];if(t){i({width:t.inlineSize,height:t.blockSize});return}}i(He(n))};e.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(r):r()});return a.observe(n,{box:`border-box`}),()=>{a.unobserve(n)}},Ke={passive:!0},qe=typeof window>`u`?!0:`onscrollend`in window,Je=(e,t)=>{let n=e.scrollElement;if(!n)return;let r=e.targetWindow;if(!r)return;let i=0,a=e.options.useScrollendEvent&&qe?()=>void 0:ze(r,()=>{t(i,!1)},e.options.isScrollingResetDelay),o=r=>()=>{let{horizontal:o,isRtl:s}=e.options;i=o?n.scrollLeft*(s&&-1||1):n.scrollTop,a(),t(i,r)},s=o(!0),c=o(!1);n.addEventListener(`scroll`,s,Ke);let l=e.options.useScrollendEvent&&qe;return l&&n.addEventListener(`scrollend`,c,Ke),()=>{n.removeEventListener(`scroll`,s),l&&n.removeEventListener(`scrollend`,c)}},Ye=(e,t,n)=>{if(t?.borderBoxSize){let e=t.borderBoxSize[0];if(e)return Math.round(e[n.options.horizontal?`inlineSize`:`blockSize`])}return e[n.options.horizontal?`offsetWidth`:`offsetHeight`]},Xe=(e,{adjustments:t=0,behavior:n},r)=>{var i,a;let o=e+t;(a=(i=r.scrollElement)?.scrollTo)==null||a.call(i,{[r.options.horizontal?`left`:`top`]:o,behavior:n})},Ze=class{constructor(e){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollState=null,this.measurementsCache=[],this.itemSizeCache=new Map,this.laneAssignments=new Map,this.pendingMeasuredCacheIndexes=[],this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this.elementsCache=new Map,this.now=()=>{var e;return((e=this.targetWindow?.performance)?.now)?.call(e)??Date.now()},this.observer=(()=>{let e=null,t=()=>e||(!this.targetWindow||!this.targetWindow.ResizeObserver?null:e=new this.targetWindow.ResizeObserver(e=>{e.forEach(e=>{let t=()=>{let t=e.target,n=this.indexFromElement(t);if(!t.isConnected){this.observer.unobserve(t);return}this.shouldMeasureDuringScroll(n)&&this.resizeItem(n,this.options.measureElement(t,e,this))};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(t):t()})}));return{disconnect:()=>{var n;(n=t())==null||n.disconnect(),e=null},observe:e=>t()?.observe(e,{box:`border-box`}),unobserve:e=>t()?.unobserve(e)}})(),this.range=null,this.setOptions=e=>{Object.entries(e).forEach(([t,n])=>{n===void 0&&delete e[t]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:Ue,rangeExtractor:We,onChange:()=>{},measureElement:Ye,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:`data-index`,initialMeasurementsCache:[],lanes:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,laneAssignmentMode:`estimate`,...e}},this.notify=e=>{var t,n;(n=(t=this.options).onChange)==null||n.call(t,this,e)},this.maybeNotify=Ie(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.observer.disconnect(),this.rafId!=null&&this.targetWindow&&(this.targetWindow.cancelAnimationFrame(this.rafId),this.rafId=null),this.scrollState=null,this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{let e=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==e){if(this.cleanup(),!e){this.maybeNotify();return}this.scrollElement=e,this.scrollElement&&`ownerDocument`in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=this.scrollElement?.window??null,this.elementsCache.forEach(e=>{this.observer.observe(e)}),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(e,t)=>{this.scrollAdjustments=0,this.scrollDirection=t?this.getScrollOffset()<e?`forward`:`backward`:null,this.scrollOffset=e,this.isScrolling=t,this.scrollState&&this.scheduleScrollReconcile(),this.maybeNotify()})),this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})}},this.rafId=null,this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?`width`:`height`]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??(typeof this.options.initialOffset==`function`?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(e,t)=>{let n=new Map,r=new Map;for(let i=t-1;i>=0;i--){let t=e[i];if(n.has(t.lane))continue;let a=r.get(t.lane);if(a==null||t.end>a.end?r.set(t.lane,t):t.end<a.end&&n.set(t.lane,!0),n.size===this.options.lanes)break}return r.size===this.options.lanes?Array.from(r.values()).sort((e,t)=>e.end===t.end?e.index-t.index:e.end-t.end)[0]:void 0},this.getMeasurementOptions=Ie(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes,this.options.laneAssignmentMode],(e,t,n,r,i,a,o)=>(this.prevLanes!==void 0&&this.prevLanes!==a&&(this.lanesChangedFlag=!0),this.prevLanes=a,this.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:t,scrollMargin:n,getItemKey:r,enabled:i,lanes:a,laneAssignmentMode:o}),{key:!1}),this.getMeasurements=Ie(()=>[this.getMeasurementOptions(),this.itemSizeCache],({count:e,paddingStart:t,scrollMargin:n,getItemKey:r,enabled:i,lanes:a,laneAssignmentMode:o},s)=>{if(!i)return this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>e)for(let t of this.laneAssignments.keys())t>=e&&this.laneAssignments.delete(t);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMeasuredCacheIndexes=[]),this.measurementsCache.length===0&&!this.lanesSettling&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(e=>{this.itemSizeCache.set(e.key,e.size)}));let c=this.lanesSettling?0:this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[],this.lanesSettling&&this.measurementsCache.length===e&&(this.lanesSettling=!1);let l=this.measurementsCache.slice(0,c),u=Array(a).fill(void 0);for(let e=0;e<c;e++){let t=l[e];t&&(u[t.lane]=e)}for(let i=c;i<e;i++){let e=r(i),a=this.laneAssignments.get(i),c,d,f=o===`estimate`||s.has(e);if(a!==void 0&&this.options.lanes>1){c=a;let e=u[c],r=e===void 0?void 0:l[e];d=r?r.end+this.options.gap:t+n}else{let e=this.options.lanes===1?l[i-1]:this.getFurthestMeasurement(l,i);d=e?e.end+this.options.gap:t+n,c=e?e.lane:i%this.options.lanes,this.options.lanes>1&&f&&this.laneAssignments.set(i,c)}let p=s.get(e),m=typeof p==`number`?p:this.options.estimateSize(i),h=d+m;l[i]={index:i,start:d,size:m,end:h,key:e,lane:c},u[c]=i}return this.measurementsCache=l,l},{key:!1,debug:()=>this.options.debug}),this.calculateRange=Ie(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(e,t,n,r)=>this.range=e.length>0&&t>0?Ve({measurements:e,outerSize:t,scrollOffset:n,lanes:r}):null,{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=Ie(()=>{let e=null,t=null,n=this.calculateRange();return n&&(e=n.startIndex,t=n.endIndex),this.maybeNotify.updateDeps([this.isScrolling,e,t]),[this.options.rangeExtractor,this.options.overscan,this.options.count,e,t]},(e,t,n,r,i)=>r===null||i===null?[]:e({startIndex:r,endIndex:i,overscan:t,count:n}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{let t=this.options.indexAttribute,n=e.getAttribute(t);return n?parseInt(n,10):(console.warn(`Missing attribute name '${t}={index}' on measured element.`),-1)},this.shouldMeasureDuringScroll=e=>{if(!this.scrollState||this.scrollState.behavior!==`smooth`)return!0;let t=this.scrollState.index??this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)?.index;if(t!==void 0&&this.range){let n=Math.max(this.options.overscan,Math.ceil((this.range.endIndex-this.range.startIndex)/2)),r=Math.max(0,t-n),i=Math.min(this.options.count-1,t+n);return e>=r&&e<=i}return!0},this.measureElement=e=>{if(!e){this.elementsCache.forEach((e,t)=>{e.isConnected||(this.observer.unobserve(e),this.elementsCache.delete(t))});return}let t=this.indexFromElement(e),n=this.options.getItemKey(t),r=this.elementsCache.get(n);r!==e&&(r&&this.observer.unobserve(r),this.observer.observe(e),this.elementsCache.set(n,e)),(!this.isScrolling||this.scrollState)&&this.shouldMeasureDuringScroll(t)&&this.resizeItem(t,this.options.measureElement(e,void 0,this))},this.resizeItem=(e,t)=>{let n=this.measurementsCache[e];if(!n)return;let r=t-(this.itemSizeCache.get(n.key)??n.size);r!==0&&(this.scrollState?.behavior!==`smooth`&&(this.shouldAdjustScrollPositionOnItemSizeChange===void 0?n.start<this.getScrollOffset()+this.scrollAdjustments:this.shouldAdjustScrollPositionOnItemSizeChange(n,r,this))&&this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=r,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(n.index),this.itemSizeCache=new Map(this.itemSizeCache.set(n.key,t)),this.notify(!1))},this.getVirtualItems=Ie(()=>[this.getVirtualIndexes(),this.getMeasurements()],(e,t)=>{let n=[];for(let r=0,i=e.length;r<i;r++){let i=t[e[r]];n.push(i)}return n},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{let t=this.getMeasurements();if(t.length!==0)return Le(t[Qe(0,t.length-1,e=>Le(t[e]).start,e)])},this.getMaxScrollOffset=()=>{if(!this.scrollElement)return 0;if(`scrollHeight`in this.scrollElement)return this.options.horizontal?this.scrollElement.scrollWidth-this.scrollElement.clientWidth:this.scrollElement.scrollHeight-this.scrollElement.clientHeight;{let e=this.scrollElement.document.documentElement;return this.options.horizontal?e.scrollWidth-this.scrollElement.innerWidth:e.scrollHeight-this.scrollElement.innerHeight}},this.getOffsetForAlignment=(e,t,n=0)=>{if(!this.scrollElement)return 0;let r=this.getSize(),i=this.getScrollOffset();t===`auto`&&(t=e>=i+r?`end`:`start`),t===`center`?e+=(n-r)/2:t===`end`&&(e-=r);let a=this.getMaxScrollOffset();return Math.max(Math.min(a,e),0)},this.getOffsetForIndex=(e,t=`auto`)=>{e=Math.max(0,Math.min(e,this.options.count-1));let n=this.getSize(),r=this.getScrollOffset(),i=this.measurementsCache[e];if(!i)return;if(t===`auto`)if(i.end>=r+n-this.options.scrollPaddingEnd)t=`end`;else if(i.start<=r+this.options.scrollPaddingStart)t=`start`;else return[r,t];if(t===`end`&&e===this.options.count-1)return[this.getMaxScrollOffset(),t];let a=t===`end`?i.end+this.options.scrollPaddingEnd:i.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(a,t,i.size),t]},this.scrollToOffset=(e,{align:t=`start`,behavior:n=`auto`}={})=>{let r=this.getOffsetForAlignment(e,t),i=this.now();this.scrollState={index:null,align:t,behavior:n,startedAt:i,lastTargetOffset:r,stableFrames:0},this._scrollToOffset(r,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollToIndex=(e,{align:t=`auto`,behavior:n=`auto`}={})=>{e=Math.max(0,Math.min(e,this.options.count-1));let r=this.getOffsetForIndex(e,t);if(!r)return;let[i,a]=r,o=this.now();this.scrollState={index:e,align:a,behavior:n,startedAt:o,lastTargetOffset:i,stableFrames:0},this._scrollToOffset(i,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollBy=(e,{behavior:t=`auto`}={})=>{let n=this.getScrollOffset()+e,r=this.now();this.scrollState={index:null,align:`start`,behavior:t,startedAt:r,lastTargetOffset:n,stableFrames:0},this._scrollToOffset(n,{adjustments:void 0,behavior:t}),this.scheduleScrollReconcile()},this.getTotalSize=()=>{let e=this.getMeasurements(),t;if(e.length===0)t=this.options.paddingStart;else if(this.options.lanes===1)t=e[e.length-1]?.end??0;else{let n=Array(this.options.lanes).fill(null),r=e.length-1;for(;r>=0&&n.some(e=>e===null);){let t=e[r];n[t.lane]===null&&(n[t.lane]=t.end),r--}t=Math.max(...n.filter(e=>e!==null))}return Math.max(t-this.options.scrollMargin+this.options.paddingEnd,0)},this._scrollToOffset=(e,{adjustments:t,behavior:n})=>{this.options.scrollToFn(e,{behavior:n,adjustments:t},this)},this.measure=()=>{this.itemSizeCache=new Map,this.laneAssignments=new Map,this.notify(!1)},this.setOptions(e)}scheduleScrollReconcile(){if(!this.targetWindow){this.scrollState=null;return}this.rafId??=this.targetWindow.requestAnimationFrame(()=>{this.rafId=null,this.reconcileScroll()})}reconcileScroll(){if(!this.scrollState||!this.scrollElement)return;if(this.now()-this.scrollState.startedAt>5e3){this.scrollState=null;return}let e=this.scrollState.index==null?void 0:this.getOffsetForIndex(this.scrollState.index,this.scrollState.align),t=e?e[0]:this.scrollState.lastTargetOffset,n=t!==this.scrollState.lastTargetOffset;if(!n&&Re(t,this.getScrollOffset())){if(this.scrollState.stableFrames++,this.scrollState.stableFrames>=1){this.scrollState=null;return}}else this.scrollState.stableFrames=0,n&&(this.scrollState.lastTargetOffset=t,this.scrollState.behavior=`auto`,this._scrollToOffset(t,{adjustments:void 0,behavior:`auto`}));this.scheduleScrollReconcile()}},Qe=(e,t,n,r)=>{for(;e<=t;){let i=(e+t)/2|0,a=n(i);if(a<r)e=i+1;else if(a>r)t=i-1;else return i}return e>0?e-1:0}}));function et({useFlushSync:e=!0,...t}){let n=nt.useReducer(()=>({}),{})[1],r={...t,onChange:(r,i)=>{var a;e&&i?(0,rt.flushSync)(n):n(),(a=t.onChange)==null||a.call(t,r,i)}},[i]=nt.useState(()=>new Ze(r));return i.setOptions(r),it(()=>i._didMount(),[]),it(()=>i._willUpdate()),i}function tt(e){return et({observeElementRect:Ge,observeElementOffset:Je,scrollToFn:Xe,...e})}var nt,rt,it,at=e((()=>{nt=t(u(),1),rt=t(s(),1),$e(),$e(),it=typeof document<`u`?nt.useLayoutEffect:nt.useEffect})),ot,st,ct=e((()=>{k(),ot=h(),st=T((0,ot.jsx)(`path`,{d:`M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z`}),`Edit`)})),lt,ut,dt=e((()=>{lt={planned:`warning.light`,"in-progress":`info.main`,done:`success.main`,blocked:`error.main`},ut={planned:`warning`,"in-progress":`info`,done:`success`,blocked:`error`}}));function ft(e){return e.toISOString().slice(0,10)}function pt(e,t,n){return e<t?t:e>n?n:e}function mt(e){return e.flatMap(e=>[e,...mt(e.children)])}function ht({label:e}){let t=(0,_t.useRef)(null),[n,r]=(0,_t.useState)(!1);return(0,z.jsx)(_,{title:e,disableHoverListener:!n,children:(0,z.jsx)(d,{ref:t,component:`span`,variant:`body2`,noWrap:!0,sx:{display:`block`,overflow:`hidden`,textOverflow:`ellipsis`,minWidth:0},onMouseEnter:()=>{t.current&&r(t.current.scrollWidth>t.current.clientWidth)},children:e})})}function gt({open:e,mode:t,initialTask:i,defaultParentId:s,onSave:u,onClose:f}){let p=xn(),m=K(e=>e.taskTree),h=K(e=>e.timelineRange),_=(0,_t.useMemo)(()=>mt(m),[m]),C=(0,_t.useMemo)(()=>{if(t===`add`||!i)return new Set;let e=t=>[t.id,...t.children.flatMap(e)],n=_.find(e=>e.id===i.id);return new Set(n?e(n):[i.id])},[t,i,_]),w=_.filter(e=>!C.has(e.id)),T=(0,_t.useMemo)(()=>t===`add`||!i?new Set:he(_,i.id),[t,i,_]),E=w.filter(e=>!T.has(e.id)),D=ft(pt(new Date,h.start,h.end)),[k,A]=(0,_t.useState)({name:``,startDate:D,endDate:D,status:`planned`,isMilestone:!1,progress:0,parentId:``,dependencies:[],assignee:``});(0,_t.useEffect)(()=>{if(!e)return;let n=ft(pt(new Date,h.start,h.end));A(t===`edit`&&i?{name:i.name,startDate:ft(i.startDate),endDate:ft(i.endDate),status:i.status,isMilestone:i.isMilestone??!1,progress:i.progress??0,parentId:i.parentId??``,dependencies:i.dependencies??[],assignee:i.assignee??``}:{name:``,startDate:n,endDate:n,status:`planned`,isMilestone:!1,progress:0,parentId:s??``,dependencies:[],assignee:``})},[e,t,i,s,h]);let j=e=>{A(t=>({...t,startDate:e,endDate:t.isMilestone||t.endDate<e?e:t.endDate}))},M=e=>{A(t=>({...t,endDate:e<t.startDate?t.startDate:e}))},te=e=>{A(t=>({...t,isMilestone:e,endDate:e?t.startDate:t.endDate,progress:e?0:t.progress}))},N=k.name.trim()!==``&&k.startDate!==``&&k.endDate!==``&&k.endDate>=k.startDate,P=()=>{N&&u({name:k.name.trim(),startDate:new Date(k.startDate),endDate:new Date(k.endDate),status:k.status,isMilestone:k.isMilestone||void 0,progress:k.progress>0?k.progress:void 0,parentId:k.parentId||void 0,dependencies:k.dependencies.length>0?k.dependencies:void 0,assignee:k.assignee.trim()||void 0})},ne=[`planned`,`in-progress`,`done`,`blocked`],re={planned:p.statusPlanned,"in-progress":p.statusInProgress,done:p.statusDone,blocked:p.statusBlocked};return(0,z.jsxs)(n,{open:e,onClose:f,maxWidth:`xs`,fullWidth:!0,"data-testid":`gantt-task-dialog`,children:[(0,z.jsx)(a,{children:t===`add`?p.dialogAddTitle:p.dialogEditTitle}),(0,z.jsxs)(l,{sx:{display:`flex`,flexDirection:`column`,gap:2,pt:`16px !important`},children:[(0,z.jsx)(y,{label:p.dialogFieldName,value:k.name,onChange:e=>A(t=>({...t,name:e.target.value})),required:!0,fullWidth:!0,size:`small`,autoFocus:!0,slotProps:{htmlInput:{"data-testid":`gantt-dialog-field-name`}}}),(0,z.jsx)(y,{label:p.columnAssignee,value:k.assignee,onChange:e=>A(t=>({...t,assignee:e.target.value})),fullWidth:!0,size:`small`,placeholder:`e.g. Jane Smith`,slotProps:{htmlInput:{"data-testid":`gantt-dialog-field-assignee`}}}),(0,z.jsx)(y,{label:p.dialogFieldStartDate,type:`date`,value:k.startDate,onChange:e=>j(e.target.value),required:!0,fullWidth:!0,size:`small`,slotProps:{inputLabel:{shrink:!0},htmlInput:{"data-testid":`gantt-dialog-field-start`}}}),(0,z.jsx)(y,{label:p.dialogFieldEndDate,type:`date`,value:k.endDate,onChange:e=>M(e.target.value),required:!0,fullWidth:!0,size:`small`,disabled:k.isMilestone,slotProps:{inputLabel:{shrink:!0},htmlInput:{"data-testid":`gantt-dialog-field-end`,min:k.startDate}}}),(0,z.jsxs)(ee,{size:`small`,fullWidth:!0,children:[(0,z.jsx)(g,{children:p.dialogFieldStatus}),(0,z.jsx)(O,{value:k.status,label:p.dialogFieldStatus,onChange:e=>A(t=>({...t,status:e.target.value})),inputProps:{"data-testid":`gantt-dialog-field-status`},children:ne.map(e=>(0,z.jsx)(v,{value:e,children:re[e]},e))})]}),(0,z.jsxs)(c,{"data-testid":`gantt-dialog-field-progress-wrapper`,children:[(0,z.jsxs)(c,{sx:{display:`flex`,justifyContent:`space-between`,alignItems:`baseline`,mb:.25},children:[(0,z.jsx)(d,{variant:`caption`,color:k.isMilestone?`text.disabled`:`text.secondary`,children:p.dialogFieldProgress??`Fortschritt (%)`}),(0,z.jsxs)(d,{variant:`caption`,sx:{fontWeight:600},color:k.isMilestone?`text.disabled`:`text.primary`,children:[k.progress,` %`]})]}),(0,z.jsx)(S,{value:k.progress,onChange:(e,t)=>A(e=>({...e,progress:t})),min:0,max:100,step:1,disabled:k.isMilestone,size:`small`,marks:[{value:0},{value:25},{value:50},{value:75},{value:100}],"aria-label":p.dialogFieldProgress??`Fortschritt (%)`,"data-testid":`gantt-dialog-field-progress`})]}),(0,z.jsx)(r,{control:(0,z.jsx)(b,{checked:k.isMilestone,onChange:e=>te(e.target.checked),size:`small`,"data-testid":`gantt-dialog-field-milestone`}),label:p.dialogFieldMilestone}),(0,z.jsxs)(ee,{size:`small`,fullWidth:!0,children:[(0,z.jsx)(g,{children:p.dialogFieldParent}),(0,z.jsxs)(O,{value:k.parentId,label:p.dialogFieldParent,onChange:e=>A(t=>({...t,parentId:e.target.value})),inputProps:{"data-testid":`gantt-dialog-field-parent`},MenuProps:{slotProps:{paper:{sx:{maxHeight:280}}}},children:[(0,z.jsx)(v,{value:``,children:p.dialogFieldParentNone}),w.map(e=>(0,z.jsx)(v,{value:e.id,sx:{minWidth:0},children:(0,z.jsxs)(c,{sx:{display:`flex`,alignItems:`center`,pl:e.depth*2,gap:.75,minWidth:0,width:`100%`,overflow:`hidden`},children:[e.depth>0&&(0,z.jsx)(d,{component:`span`,variant:`caption`,sx:{color:`text.disabled`,lineHeight:1,flexShrink:0},children:`└`}),(0,z.jsx)(ht,{label:e.name})]})},e.id))]})]}),(0,z.jsxs)(ee,{size:`small`,fullWidth:!0,children:[(0,z.jsx)(g,{children:p.dialogFieldDependencies}),(0,z.jsx)(O,{multiple:!0,value:k.dependencies,label:p.dialogFieldDependencies,onChange:e=>{let t=e.target.value;A(e=>({...e,dependencies:typeof t==`string`?t.split(`,`):t}))},inputProps:{"data-testid":`gantt-dialog-field-dependencies`},renderValue:e=>e.length===0?p.dialogFieldDependenciesNone:e.map(e=>_.find(t=>t.id===e)?.name??e).join(`, `),MenuProps:{slotProps:{paper:{sx:{maxHeight:280}}}},children:E.map(e=>(0,z.jsx)(v,{value:e.id,sx:{minWidth:0},children:(0,z.jsxs)(c,{sx:{display:`flex`,alignItems:`center`,pl:e.depth*2,gap:.75,minWidth:0,width:`100%`,overflow:`hidden`},children:[e.depth>0&&(0,z.jsx)(d,{component:`span`,variant:`caption`,sx:{color:`text.disabled`,lineHeight:1,flexShrink:0},children:`└`}),(0,z.jsx)(ht,{label:e.name})]})},e.id))})]})]}),(0,z.jsxs)(x,{children:[(0,z.jsx)(o,{onClick:f,children:p.dialogCancel}),(0,z.jsx)(o,{onClick:P,variant:`contained`,disabled:!N,"data-testid":`gantt-dialog-save`,children:p.dialogSave})]})]})}var _t,z,vt=e((()=>{_t=t(u(),1),D(),X(),Ae(),z=h(),gt.__docgenInfo={description:``,methods:[],displayName:`GanttTaskDialog`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},mode:{required:!0,tsType:{name:`union`,raw:`"add" | "edit"`,elements:[{name:`literal`,value:`"add"`},{name:`literal`,value:`"edit"`}]},description:``},initialTask:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},description:``},defaultParentId:{required:!1,tsType:{name:`string`},description:``},onSave:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(data: Omit<GanttTask, "id">) => void`,signature:{arguments:[{type:{name:`Omit`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`literal`,value:`"id"`}],raw:`Omit<GanttTask, "id">`},name:`data`}],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function yt({open:e,task:t,onConfirm:r,onClose:s}){let c=xn(),u=c.dialogDeleteConfirm.replace(`{name}`,t?.name??``);return(0,bt.jsxs)(n,{open:e,onClose:s,maxWidth:`xs`,fullWidth:!0,"data-testid":`gantt-delete-dialog`,children:[(0,bt.jsx)(a,{children:c.dialogDeleteTitle}),(0,bt.jsx)(l,{children:(0,bt.jsx)(i,{children:u})}),(0,bt.jsxs)(x,{children:[(0,bt.jsx)(o,{onClick:s,children:c.dialogCancel}),(0,bt.jsx)(o,{onClick:r,variant:`contained`,color:`error`,"data-testid":`gantt-dialog-delete-confirm`,children:c.dialogDelete})]})]})}var bt,xt=e((()=>{D(),X(),bt=h(),yt.__docgenInfo={description:``,methods:[],displayName:`GanttDeleteDialog`,props:{open:{required:!0,tsType:{name:`boolean`},description:``},task:{required:!0,tsType:{name:`union`,raw:`GanttTask | null`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`null`}]},description:``},onConfirm:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function St(e,t){return{planned:t.statusPlanned,"in-progress":t.statusInProgress,done:t.statusDone,blocked:t.statusBlocked}[e]}function Ct({task:e,expandedIds:t,toggleExpand:n,hasActionsColumn:r,showAssigneeColumn:i,onTaskClick:a,onAddTask:o,onEditTask:s,onDeleteTask:l,onStatusChange:u,inlineEdit:m,onInlineRename:h,isSelected:g,onSelect:b}){let[x,S]=(0,Tt.useState)(null),[C,T]=(0,Tt.useState)(null),E=xn(),{statusColors:D}=Sn(),O=()=>{C!==null&&C.trim()&&h?.(e,C.trim()),T(null)};return(0,B.jsxs)(c,{className:`gantt-task-row`,"data-testid":`gantt-task-row-${e.id}`,"aria-selected":g??!1,sx:{height:40,display:`flex`,alignItems:`center`,overflow:`hidden`,borderBottom:`1px solid`,borderRight:`1px solid`,borderColor:`divider`,cursor:a?`pointer`:`default`,bgcolor:g?`action.selected`:void 0,boxShadow:g?e=>`inset 3px 0 0 ${e.palette.primary.main}`:void 0,"&:hover":{bgcolor:g?`action.selected`:a?`action.hover`:void 0}},onClick:()=>{b?.(),a?.(e)},children:[(0,B.jsxs)(c,{sx:{flex:1,minWidth:0,display:`flex`,alignItems:`center`,gap:.75,pl:1+e.depth*2,pr:.5,height:`100%`},children:[(0,B.jsx)(c,{sx:{width:16,flexShrink:0,display:`flex`,justifyContent:`center`},children:e.children.length>0&&(0,B.jsx)(c,{component:`span`,sx:{fontSize:9,userSelect:`none`,cursor:`pointer`},onClick:t=>{t.stopPropagation(),n(e.id)},children:t.has(e.id)?`▼`:`▶`})}),(0,B.jsx)(c,{sx:{width:8,height:8,borderRadius:e.isMilestone?0:`50%`,transform:e.isMilestone?`rotate(45deg)`:void 0,flexShrink:0,bgcolor:e.color??D?.[e.status]??lt[e.status]??`grey.400`}}),C===null?(0,B.jsx)(d,{variant:`body2`,noWrap:!0,sx:{flex:1,minWidth:0,cursor:m?`text`:`inherit`},onDoubleClick:m?t=>{t.stopPropagation(),T(e.name)}:void 0,children:e.name}):(0,B.jsx)(y,{size:`small`,variant:`standard`,value:C,autoFocus:!0,onChange:e=>T(e.target.value),onBlur:O,onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),O()),e.key===`Escape`&&(e.stopPropagation(),T(null))},onClick:e=>e.stopPropagation(),sx:{flex:1,minWidth:0},slotProps:{htmlInput:{"data-testid":`gantt-inline-edit-${e.id}`}}})]}),i&&(0,B.jsx)(c,{sx:{width:110,flexShrink:0,display:`flex`,alignItems:`center`,px:1,overflow:`hidden`},children:(0,B.jsx)(d,{variant:`caption`,noWrap:!0,color:e.assignee?`text.primary`:`text.disabled`,children:e.assignee??`—`})}),r&&(0,B.jsxs)(c,{className:`gantt-row-actions`,sx:{width:96,flexShrink:0,display:`flex`,alignItems:`center`,justifyContent:`flex-end`,pr:.5},children:[s&&(0,B.jsx)(_,{title:E.editTaskTooltip,children:(0,B.jsx)(p,{size:`small`,"aria-label":E.editTaskTooltip,"data-testid":`gantt-edit-task-${e.id}`,onClick:t=>{t.stopPropagation(),s(e)},children:(0,B.jsx)(st,{fontSize:`inherit`})})}),o&&(0,B.jsx)(_,{title:E.addTaskTooltip,children:(0,B.jsx)(p,{size:`small`,"aria-label":E.addTaskTooltip,"data-testid":`gantt-add-task-${e.id}`,onClick:t=>{t.stopPropagation(),o(e)},children:(0,B.jsx)(P,{fontSize:`inherit`})})}),l&&(0,B.jsx)(_,{title:E.deleteTaskTooltip,children:(0,B.jsx)(p,{size:`small`,"aria-label":E.deleteTaskTooltip,"data-testid":`gantt-delete-task-${e.id}`,onClick:t=>{t.stopPropagation(),l(e)},children:(0,B.jsx)(re,{fontSize:`inherit`})})})]}),(0,B.jsxs)(c,{sx:{width:90,flexShrink:0,display:`flex`,alignItems:`center`,justifyContent:`center`},children:[(0,B.jsx)(f,{label:St(e.status,E),size:`small`,variant:`outlined`,color:e.color??D?.[e.status]?`default`:ut[e.status]??`default`,sx:{height:20,fontSize:10,cursor:u?`pointer`:`default`,...(e.color??D?.[e.status])&&{borderColor:e.color??D?.[e.status],color:e.color??D?.[e.status]}},onClick:u?e=>{e.stopPropagation(),S(e.currentTarget)}:void 0}),u&&(0,B.jsx)(w,{anchorEl:x,open:!!x,onClose:()=>S(null),children:[`planned`,`in-progress`,`done`,`blocked`].map(t=>(0,B.jsx)(v,{selected:e.status===t,onClick:()=>{u(e,t),S(null)},children:St(t,E)},t))})]})]})}function wt({scrollRef:e,onScroll:t,panelWidth:n,onTaskClick:r,onAddTask:i,onEditTask:a,onDeleteTask:o,onStatusChange:s,onTasksChange:l,enableBuiltinDialogs:u,onTaskCreated:f,onTaskUpdated:p,onTaskDeleted:m,inlineEdit:h,virtualizeRows:g=!1,showAssigneeColumn:_=!1}){let v=xn(),y=bn(),b=K(e=>e.taskTree),x=K(e=>e.expandedIds),S=K(e=>e.toggleExpand),C=K(e=>e.timeScale),w=K(e=>e.addTask),T=K(e=>e.updateTask),E=K(e=>e.deleteTask),D=K(e=>e.assigneeFilter),O=(0,Tt.useMemo)(()=>{let e=le(b,x);return D?ue(e,D):e},[b,x,D]),ee=tt({count:O.length,getScrollElement:()=>e.current,estimateSize:()=>40,overscan:5}),[k,A]=(0,Tt.useState)(!1),[j,M]=(0,Tt.useState)(!1),[te,N]=(0,Tt.useState)(!1),[P,ne]=(0,Tt.useState)(null),re=e=>{let t={...e,id:crypto.randomUUID()};w(t),l?.(y.getState().tasks),f?.(t),A(!1)},F=e=>{if(!P)return;let t={...e,id:P.id};T(t),l?.(y.getState().tasks),p?.(t),M(!1)},ie=()=>{P&&(E(P.id),l?.(y.getState().tasks),m?.(P.id),N(!1))},ae=(e,t)=>{let n={...e,name:t};T(n),l?.(y.getState().tasks),p?.(n)},oe=u?e=>{ne(e),A(!0)}:i,se=u?e=>{ne(e),M(!0)}:a,I=u?e=>{ne(e),N(!0)}:o,ce=!!(oe||se||I),de=C===`days`?80:40,[fe,L]=(0,Tt.useState)(null),R=fe?O.findIndex(e=>e.id===fe):-1;(0,Tt.useEffect)(()=>{if(R<0||!e.current)return;let t=e.current,n=de+R*40,r=n+40;n<t.scrollTop?t.scrollTop=n:r>t.scrollTop+t.clientHeight&&(t.scrollTop=r-t.clientHeight)},[R,de,e]);function pe(e){if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)return;let t=O.length;t!==0&&(e.key===`ArrowDown`?(e.preventDefault(),L(O[Math.min(R<0?0:R+1,t-1)].id)):e.key===`ArrowUp`?(e.preventDefault(),L(O[Math.max(R<=0?0:R-1,0)].id)):e.key===`Enter`&&R>=0?(e.preventDefault(),se?.(O[R])):e.key===`Escape`&&L(null))}return(0,B.jsxs)(c,{ref:e,onScroll:t,tabIndex:0,"data-testid":`gantt-task-panel`,onKeyDown:pe,sx:{width:n,flexShrink:0,overflowY:`auto`,overflowX:`hidden`,outline:`none`},children:[(0,B.jsxs)(c,{sx:{height:de,position:`sticky`,top:0,bgcolor:`background.paper`,zIndex:1,borderBottom:`1px solid`,borderRight:`1px solid`,borderColor:`divider`,display:`flex`,flexDirection:`column`},children:[(0,B.jsxs)(c,{sx:{height:40,display:`flex`,alignItems:`center`,overflow:`hidden`,borderBottom:C===`days`?`1px solid`:void 0,borderColor:C===`days`?`divider`:void 0},children:[(0,B.jsx)(c,{sx:{flex:1,minWidth:0,pl:2},children:(0,B.jsx)(d,{variant:`caption`,color:`text.secondary`,children:v.columnName})}),_&&(0,B.jsx)(c,{sx:{width:110,flexShrink:0,display:`flex`,alignItems:`center`,px:1},children:(0,B.jsx)(d,{variant:`caption`,color:`text.secondary`,children:v.columnAssignee})}),ce&&(0,B.jsx)(c,{sx:{width:96,flexShrink:0,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,B.jsx)(d,{variant:`caption`,color:`text.secondary`,children:v.columnActions})}),(0,B.jsx)(c,{sx:{width:90,flexShrink:0,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,B.jsx)(d,{variant:`caption`,color:`text.secondary`,children:v.columnStatus})})]}),C===`days`&&(0,B.jsx)(c,{sx:{flex:1}})]}),g?(0,B.jsx)(c,{sx:{position:`relative`,height:ee.getTotalSize()},children:ee.getVirtualItems().map(e=>(0,B.jsx)(c,{style:{position:`absolute`,top:0,left:0,width:`100%`,height:40,transform:`translateY(${e.start}px)`},children:(0,B.jsx)(Ct,{task:O[e.index],expandedIds:x,toggleExpand:S,hasActionsColumn:ce,showAssigneeColumn:_,onTaskClick:r,onAddTask:oe,onEditTask:se,onDeleteTask:I,onStatusChange:s,inlineEdit:h,onInlineRename:h?ae:void 0,isSelected:O[e.index].id===fe,onSelect:()=>L(O[e.index].id)})},e.key))}):O.map(e=>(0,B.jsx)(Ct,{task:e,expandedIds:x,toggleExpand:S,hasActionsColumn:ce,showAssigneeColumn:_,onTaskClick:r,onAddTask:oe,onEditTask:se,onDeleteTask:I,onStatusChange:s,inlineEdit:h,onInlineRename:h?ae:void 0,isSelected:e.id===fe,onSelect:()=>L(e.id)},e.id)),u&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(gt,{open:k,mode:`add`,defaultParentId:P?.id,onSave:re,onClose:()=>A(!1)}),(0,B.jsx)(gt,{open:j,mode:`edit`,initialTask:P??void 0,onSave:F,onClose:()=>M(!1)}),(0,B.jsx)(yt,{open:te,task:P,onConfirm:ie,onClose:()=>N(!1)})]})]})}var Tt,B,Et=e((()=>{Tt=t(u(),1),at(),D(),N(),ne(),ct(),X(),Ae(),dt(),vt(),xt(),B=h(),wt.__docgenInfo={description:``,methods:[],displayName:`GanttTaskPanel`,props:{scrollRef:{required:!0,tsType:{name:`RefObject`,elements:[{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}]}],raw:`RefObject<HTMLDivElement | null>`},description:``},onScroll:{required:!0,tsType:{name:`UIEventHandler`,elements:[{name:`HTMLDivElement`}],raw:`UIEventHandler<HTMLDivElement>`},description:``},panelWidth:{required:!0,tsType:{name:`number`},description:``},onTaskClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onAddTask:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onEditTask:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onDeleteTask:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onStatusChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, status: GanttTaskStatus) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0},name:`status`}],return:{name:`void`}}},description:``},onTasksChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tasks: GanttTask[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}}],raw:`GanttTask[]`},name:`tasks`}],return:{name:`void`}}},description:``},enableBuiltinDialogs:{required:!1,tsType:{name:`boolean`},description:``},onTaskCreated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onTaskUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onTaskDeleted:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(taskId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`taskId`}],return:{name:`void`}}},description:``},inlineEdit:{required:!1,tsType:{name:`boolean`},description:``},virtualizeRows:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showAssigneeColumn:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}}}}}));function Dt({totalWidth:e,displayRange:t,onDragStart:n,onTaskMoved:r,onTaskResized:i,onTasksChange:a}){let o=K(e=>e.updateTask),s=bn(),c=xn(),l=Cn(),u=(0,V.useRef)(1),d=(0,V.useRef)(n),f=(0,V.useRef)(r),p=(0,V.useRef)(i),m=(0,V.useRef)(a),h=(0,V.useRef)(l);(0,V.useLayoutEffect)(()=>{u.current=e>0?e/((t.end.getTime()-t.start.getTime())/Ot):1,d.current=n,f.current=r,p.current=i,m.current=a,h.current=l});let g=(0,V.useRef)(null),_=(0,V.useRef)(null),[v,y]=(0,V.useState)(null),b=(0,V.useRef)(!1),x=(0,V.useRef)(null);return(0,V.useEffect)(()=>()=>{x.current?.()},[]),{activeDrag:v,suppressClickRef:b,handleBarMouseDown:(e,t,n)=>{e.stopPropagation(),b.current=!1,g.current={type:n,taskId:t.id,startX:e.clientX,originalStart:t.startDate,originalEnd:t.endDate},n!==`progress`&&d.current?.(t,n),document.body.style.cursor=n===`resize`?`ew-resize`:`grabbing`;let r=e=>{let t=g.current;if(!t||t.type===`progress`)return;let n=e.clientX-t.startX,r=Math.round(n/u.current);Math.abs(n)>=5&&(b.current=!0);let i={taskId:t.taskId,type:t.type,deltaDays:r};_.current=i,y(i)},i=()=>{document.body.style.cursor=``;let e=g.current,t=_.current;if(e&&t&&b.current&&t.deltaDays!==0){let n=s.getState().tasks.find(t=>t.id===e.taskId);if(n){let{workdays:r,normalizedHolidays:i}=h.current,a=r.length>0;if(t.type===`move`){let s=R(e.originalStart,t.deltaDays),c=R(e.originalEnd,t.deltaDays);if(a){let e=Ce(s,r,i),t=e.getTime()-s.getTime();s=e,c=new Date(c.getTime()+t)}o({...n,startDate:s,endDate:c}),f.current?.(n,s,c)}else{let s=R(e.originalEnd,t.deltaDays),c=s>e.originalStart?s:R(e.originalStart,1);if(a){let t=we(c,r,i);c=t>e.originalStart?t:Ce(R(e.originalStart,1),r,i)}o({...n,endDate:c}),p.current?.(n,c)}m.current?.(s.getState().tasks)}}g.current=null,_.current=null,y(null),document.removeEventListener(`mousemove`,r),document.removeEventListener(`mouseup`,i),x.current=null};document.addEventListener(`mousemove`,r),document.addEventListener(`mouseup`,i),x.current=()=>{document.body.style.cursor=``,document.removeEventListener(`mousemove`,r),document.removeEventListener(`mouseup`,i)}},handleProgressMouseDown:(e,t,n,r)=>{e.stopPropagation(),b.current=!1,g.current={type:`progress`,taskId:t.id,startX:e.clientX,originalStart:t.startDate,originalEnd:t.endDate,initialProgress:n,barWidthPx:r},document.body.style.cursor=`ew-resize`;let i=e=>{let t=g.current;if(!t||t.type!==`progress`)return;let n=e.clientX-t.startX;Math.abs(n)>=5&&(b.current=!0);let r=n/(t.barWidthPx??1)*100,i=Math.round(Math.max(0,Math.min(100,(t.initialProgress??0)+r))),a={taskId:t.taskId,type:`progress`,deltaDays:0,newProgress:i};_.current=a,y(a)},a=()=>{document.body.style.cursor=``;let e=g.current,t=_.current;if(e&&t&&t.type===`progress`&&t.newProgress!==void 0&&b.current){let n=s.getState().tasks.find(t=>t.id===e.taskId);n&&(o({...n,progress:t.newProgress}),m.current?.(s.getState().tasks))}g.current=null,_.current=null,y(null),document.removeEventListener(`mousemove`,i),document.removeEventListener(`mouseup`,a),x.current=null};document.addEventListener(`mousemove`,i),document.addEventListener(`mouseup`,a),x.current=()=>{document.body.style.cursor=``,document.removeEventListener(`mousemove`,i),document.removeEventListener(`mouseup`,a)}},formatDragDate:e=>e.toLocaleDateString(c.dateLocale,{day:`2-digit`,month:`short`})}}var V,Ot,kt=e((()=>{V=t(u(),1),X(),Ae(),Ot=864e5}));function At({items:e}){let{weekendColor:t,holidayColor:n}=Sn(),r=n||Nt,i=t||`action.hover`;return(0,Mt.jsx)(c,{sx:{display:`flex`},children:e.map(e=>{let t=e.isHoliday?r:e.isWeekend?i:`transparent`,n=e.isWeekend||e.isHoliday?`text.disabled`:`text.secondary`;return(0,Mt.jsxs)(c,{sx:{width:e.width,flexShrink:0,height:40,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRight:`1px solid`,borderColor:`divider`,bgcolor:t,position:`relative`},children:[(0,Mt.jsx)(d,{variant:`caption`,color:n,children:e.label}),e.isHoliday&&(0,Mt.jsx)(c,{sx:{position:`absolute`,bottom:2,left:`50%`,transform:`translateX(-50%)`,width:16,height:2,borderRadius:1,bgcolor:`warning.main`,opacity:.75}})]},e.key)})})}function jt({columns:e,groups:t,todayX:n,todayLabel:r,todayTooltip:i,todayColor:a}){let o=m(),s=t?80:40,l=a||o.palette.primary.main,u=o.palette.getContrastText(l);return(0,Mt.jsxs)(c,{sx:{position:`sticky`,top:0,bgcolor:`background.paper`,zIndex:1,borderBottom:`1px solid`,borderColor:`divider`,height:s,overflow:`visible`},children:[t&&(0,Mt.jsx)(c,{sx:{height:40,borderBottom:`1px solid`,borderColor:`divider`,overflow:`visible`},children:(0,Mt.jsx)(At,{items:t})}),(0,Mt.jsx)(At,{items:e}),n!=null&&r&&(0,Mt.jsx)(_,{title:i??``,placement:`top`,arrow:!0,children:(0,Mt.jsx)(f,{"data-testid":`gantt-today-chip`,size:`small`,label:r,sx:{position:`absolute`,bottom:0,left:n,transform:`translateX(-50%) translateY(50%)`,zIndex:3,height:20,fontSize:`0.65rem`,fontWeight:700,letterSpacing:`0.03em`,backgroundColor:l,color:u,border:`1.5px solid ${l}`,boxShadow:o.shadows[2],cursor:`default`,userSelect:`none`,"& .MuiChip-label":{px:`6px`,py:0},"&:hover":{backgroundColor:l,opacity:.9}}})})]})}var Mt,Nt,Pt=e((()=>{D(),dt(),X(),Mt=h(),Nt=`rgba(255, 152, 0, 0.18)`,jt.__docgenInfo={description:``,methods:[],displayName:`GanttTimelineHeader`,props:{columns:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  key: string;
  label: string;
  width: number;
  isWeekend?: boolean;
  /** Markiert einen gesetzlichen Feiertag — erhält denselben Grau-Hintergrund wie Wochenenden. */
  isHoliday?: boolean;
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`width`,value:{name:`number`,required:!0}},{key:`isWeekend`,value:{name:`boolean`,required:!1}},{key:`isHoliday`,value:{name:`boolean`,required:!1},description:`Markiert einen gesetzlichen Feiertag — erhält denselben Grau-Hintergrund wie Wochenenden.`}]}}],raw:`HeaderColumn[]`},description:``},groups:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  key: string;
  label: string;
  width: number;
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`width`,value:{name:`number`,required:!0}}]}}],raw:`HeaderGroup[]`},description:``},todayX:{required:!1,tsType:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}]},description:``},todayLabel:{required:!1,tsType:{name:`string`},description:``},todayTooltip:{required:!1,tsType:{name:`string`},description:``},todayColor:{required:!1,tsType:{name:`string`},description:``}}}}));function Ft({task:e,virtualTop:t,activeDrag:n,displayRange:r,totalWidth:i,gridColumnWidth:a,criticalTaskIds:o,draggable:s=!1,resizable:l=!1,progressDraggable:u=!1,onTaskClick:d,onMilestoneClick:f,onContextMenu:p,suppressClickRef:h,handleBarMouseDown:g,handleProgressMouseDown:_,formatDragDate:v}){let y=m(),{statusColors:b,criticalPathColor:x,milestoneColor:S,barBorderRadius:C}=Sn(),w=n?.taskId===e.id,T=e;if(w&&n)if(n.type===`move`)T={...e,startDate:R(e.startDate,n.deltaDays),endDate:R(e.endDate,n.deltaDays)};else if(n.type===`resize`){let t=R(e.endDate,n.deltaDays);T={...e,endDate:t>e.startDate?t:R(e.startDate,1)}}else n.type===`progress`&&n.newProgress!==void 0&&(T={...e,progress:n.newProgress});let{left:E,width:D}=se(T,r);return(0,H.jsx)(c,{"data-testid":`gantt-bar-row-${e.id}`,style:t===void 0?void 0:{position:`absolute`,top:t,left:0,width:`100%`},sx:{height:40,position:`relative`,borderBottom:`1px solid`,borderColor:`divider`,backgroundImage:e=>`linear-gradient(to right, transparent calc(${a}px - 1px), ${e.palette.divider} calc(${a}px - 1px), ${e.palette.divider} ${a}px)`,backgroundSize:`${a}px 100%`,backgroundRepeat:`repeat-x`},children:e.isMilestone?(0,H.jsx)(It,{task:e,left:E,milestoneColor:S,criticalPathColor:x,isCritical:o.has(e.id),onMilestoneClick:f,theme:y}):(0,H.jsx)(Lt,{task:e,effectiveTask:T,left:E,width:D,totalWidth:i,isDragging:w,activeDrag:n,draggable:s,resizable:l,progressDraggable:u,isCritical:o.has(e.id),statusColors:b,criticalPathColor:x,barBorderRadius:C,onTaskClick:d,onContextMenu:p,suppressClickRef:h,handleBarMouseDown:g,handleProgressMouseDown:_,formatDragDate:v,theme:y})})}function It({task:e,left:t,milestoneColor:n,criticalPathColor:r,isCritical:i,onMilestoneClick:a,theme:o}){return t<0||t>100?null:(0,H.jsx)(c,{"data-testid":`gantt-milestone-${e.id}`,sx:{position:`absolute`,left:`${t}%`,top:`50%`,width:12,height:12,bgcolor:n||`warning.main`,transform:`translate(-50%, -50%) rotate(45deg)`,cursor:a?`pointer`:`default`,boxShadow:i?`0 0 0 2.5px ${r||o.palette.error.main}`:void 0,"&:hover":a?{opacity:.8}:void 0},onClick:()=>a?.(e)})}function Lt({task:e,effectiveTask:t,left:n,width:r,totalWidth:i,isDragging:a,activeDrag:o,draggable:s,resizable:l,progressDraggable:u,isCritical:d,statusColors:f,criticalPathColor:p,barBorderRadius:m,onTaskClick:h,onContextMenu:g,suppressClickRef:_,handleBarMouseDown:v,handleProgressMouseDown:y,formatDragDate:b,theme:x}){let S=Math.max(0,n),C=Math.min(100,n+Math.max(r,.5))-S;return C<=0?null:(0,H.jsxs)(H.Fragment,{children:[a&&o&&o.type!==`progress`&&o.deltaDays!==0&&(0,H.jsx)(Rt,{left:S,children:o.type===`move`?`${b(t.startDate)} – ${b(t.endDate)}`:`→ ${b(t.endDate)}`}),a&&o?.type===`progress`&&o.newProgress!==void 0&&(0,H.jsxs)(Rt,{left:S,children:[o.newProgress,`%`]}),(0,H.jsxs)(c,{"data-testid":`gantt-bar-${e.id}`,sx:{position:`absolute`,left:`${S}%`,width:`${C}%`,height:16,top:`50%`,transform:`translateY(-50%)`,bgcolor:e.color??f?.[e.status]??lt[e.status]??`grey.300`,borderRadius:m===void 0?1:`${m}px`,overflow:`hidden`,opacity:a?.75:1,boxShadow:d?`inset 0 0 0 2.5px ${p||x.palette.error.main}`:void 0,cursor:a?`grabbing`:s?`grab`:h?`pointer`:`default`,userSelect:`none`,"&:hover":s||h?{opacity:a?.75:.8}:void 0},onMouseDown:s?t=>v(t,e,`move`):void 0,onContextMenu:t=>{t.preventDefault(),t.stopPropagation(),g(e,t.clientX,t.clientY)},onClick:()=>{if(_.current){_.current=!1;return}h?.(e)},children:[t.progress!==void 0&&t.progress>0&&(0,H.jsx)(c,{"data-testid":`gantt-progress-${e.id}`,sx:{position:`absolute`,left:0,top:0,width:`${Math.min(t.progress,100)}%`,height:`100%`,bgcolor:`currentColor`,opacity:.4}}),u&&(0,H.jsx)(c,{"data-testid":`gantt-progress-handle-${e.id}`,sx:{position:`absolute`,left:`${Math.min(t.progress??0,100)}%`,top:0,width:6,height:`100%`,transform:`translateX(-50%)`,cursor:`ew-resize`,bgcolor:`rgba(255,255,255,0.35)`},onMouseDown:n=>{n.stopPropagation();let r=C/100*i;y(n,e,t.progress??0,r)}}),l&&(0,H.jsx)(c,{"data-testid":`gantt-resize-handle-${e.id}`,sx:{position:`absolute`,right:0,top:0,width:6,height:`100%`,cursor:`ew-resize`},onMouseDown:t=>{t.stopPropagation(),v(t,e,`resize`)}})]})]})}function Rt({left:e,children:t}){return(0,H.jsx)(c,{sx:{position:`absolute`,left:`${e}%`,top:2,bgcolor:`grey.800`,color:`common.white`,borderRadius:.5,px:.75,lineHeight:`18px`,fontSize:`0.65rem`,whiteSpace:`nowrap`,pointerEvents:`none`,zIndex:100},children:t})}var H,zt=e((()=>{D(),X(),Ae(),dt(),H=h(),Ft.__docgenInfo={description:``,methods:[],displayName:`GanttBarRow`,props:{task:{required:!0,tsType:{name:`intersection`,raw:`GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`signature`,type:`object`,raw:`{
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,signature:{properties:[{key:`children`,value:{name:`Array`,elements:[{name:`GanttTaskNode`}],raw:`GanttTaskNode[]`,required:!0}},{key:`depth`,value:{name:`number`,required:!0}}]}}]},description:``},virtualTop:{required:!1,tsType:{name:`number`},description:``},activeDrag:{required:!0,tsType:{name:`union`,raw:`ActiveDrag | null`,elements:[{name:`signature`,type:`object`,raw:`{
  taskId: string;
  type: DragType;
  deltaDays: number;
  newProgress?: number;
}`,signature:{properties:[{key:`taskId`,value:{name:`string`,required:!0}},{key:`type`,value:{name:`union`,raw:`"move" | "resize" | "progress"`,elements:[{name:`literal`,value:`"move"`},{name:`literal`,value:`"resize"`},{name:`literal`,value:`"progress"`}],required:!0}},{key:`deltaDays`,value:{name:`number`,required:!0}},{key:`newProgress`,value:{name:`number`,required:!1}}]}},{name:`null`}]},description:``},displayRange:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  start: Date;
  end: Date;
}`,signature:{properties:[{key:`start`,value:{name:`Date`,required:!0}},{key:`end`,value:{name:`Date`,required:!0}}]}},description:``},totalWidth:{required:!0,tsType:{name:`number`},description:``},gridColumnWidth:{required:!0,tsType:{name:`number`},description:``},criticalTaskIds:{required:!0,tsType:{name:`Set`,elements:[{name:`string`}],raw:`Set<string>`},description:``},draggable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},resizable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},progressDraggable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onTaskClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onMilestoneClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onContextMenu:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTaskNode, mouseX: number, mouseY: number) => void`,signature:{arguments:[{type:{name:`intersection`,raw:`GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`signature`,type:`object`,raw:`{
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,signature:{properties:[{key:`children`,value:{name:`Array`,elements:[{name:`GanttTaskNode`}],raw:`GanttTaskNode[]`,required:!0}},{key:`depth`,value:{name:`number`,required:!0}}]}}]},name:`task`},{type:{name:`number`},name:`mouseX`},{type:{name:`number`},name:`mouseY`}],return:{name:`void`}}},description:``},suppressClickRef:{required:!0,tsType:{name:`ReactMutableRefObject`,raw:`React.MutableRefObject<boolean>`,elements:[{name:`boolean`}]},description:``},handleBarMouseDown:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(e: React.MouseEvent, task: GanttTaskNode, type: DragType) => void`,signature:{arguments:[{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent`},name:`e`},{type:{name:`intersection`,raw:`GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`signature`,type:`object`,raw:`{
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,signature:{properties:[{key:`children`,value:{name:`Array`,elements:[{name:`GanttTaskNode`}],raw:`GanttTaskNode[]`,required:!0}},{key:`depth`,value:{name:`number`,required:!0}}]}}]},name:`task`},{type:{name:`union`,raw:`"move" | "resize" | "progress"`,elements:[{name:`literal`,value:`"move"`},{name:`literal`,value:`"resize"`},{name:`literal`,value:`"progress"`}]},name:`type`}],return:{name:`void`}}},description:``},handleProgressMouseDown:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(e: React.MouseEvent, task: GanttTaskNode, initialProgress: number, barWidthPx: number) => void`,signature:{arguments:[{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent`},name:`e`},{type:{name:`intersection`,raw:`GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`signature`,type:`object`,raw:`{
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,signature:{properties:[{key:`children`,value:{name:`Array`,elements:[{name:`GanttTaskNode`}],raw:`GanttTaskNode[]`,required:!0}},{key:`depth`,value:{name:`number`,required:!0}}]}}]},name:`task`},{type:{name:`number`},name:`initialProgress`},{type:{name:`number`},name:`barWidthPx`}],return:{name:`void`}}},description:``},formatDragDate:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(d: Date) => string`,signature:{arguments:[{type:{name:`Date`},name:`d`}],return:{name:`string`}}},description:``}}}}));function Bt({strips:e,totalWidth:t,height:n,top:r}){let{weekendColor:i,holidayColor:a}=Sn();if(e.length===0)return null;let o=a||Ht,s=i||`action.hover`;return(0,Vt.jsx)(c,{"aria-hidden":!0,"data-testid":`gantt-weekend-strips`,sx:{position:`absolute`,top:r,left:0,width:t,height:n,pointerEvents:`none`},children:e.map(e=>(0,Vt.jsx)(c,{sx:{position:`absolute`,left:e.left,width:20,top:0,height:`100%`,bgcolor:e.isHoliday?o:s}},e.key))})}var Vt,Ht,Ut=e((()=>{D(),X(),dt(),Vt=h(),Ht=`rgba(255, 152, 0, 0.18)`,Bt.__docgenInfo={description:"Zeichnet halbtransparente Hintergrundstreifen für nicht-arbeitende Tage\n(Wochenenden + Feiertage) in der Tages-Skala.\nWochenenden = `weekendColor` (grau), Feiertage = `holidayColor` (amber).\nEigener Layer (pointerEvents: none) damit Klicks auf Balken und Zeilen durchgehen.",methods:[],displayName:`GanttWeekendStrips`,props:{strips:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  key:       string;
  left:      number;
  /** true = Feiertag (eigene Farbe), false/undefined = Wochenende */
  isHoliday?: boolean;
}`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`left`,value:{name:`number`,required:!0}},{key:`isHoliday`,value:{name:`boolean`,required:!1},description:`true = Feiertag (eigene Farbe), false/undefined = Wochenende`}]}}],raw:`NonWorkingStrip[]`},description:``},totalWidth:{required:!0,tsType:{name:`number`},description:``},height:{required:!0,tsType:{name:`number`},description:``},top:{required:!0,tsType:{name:`number`},description:``}}}}));function Wt({contextMenu:e,onClose:t,onSelect:n}){let r=xn(),i={planned:r.statusPlanned,"in-progress":r.statusInProgress,done:r.statusDone,blocked:r.statusBlocked};return(0,Gt.jsx)(w,{open:e!==null,onClose:t,anchorReference:`anchorPosition`,anchorPosition:e===null?void 0:{top:e.mouseY,left:e.mouseX},children:[`planned`,`in-progress`,`done`,`blocked`].map(t=>(0,Gt.jsx)(v,{selected:e?.task.status===t,"data-testid":`gantt-status-menu-${t}`,onClick:()=>{e&&n(e.task,t)},children:i[t]},t))})}var Gt,Kt=e((()=>{D(),X(),Gt=h(),Wt.__docgenInfo={description:`Rechtsklick-Kontextmenü für schnellen Statuswechsel eines Gantt-Balkens.
Übersetzungen werden intern via useGanttTranslations() gelesen.`,methods:[],displayName:`GanttStatusContextMenu`,props:{contextMenu:{required:!0,tsType:{name:`union`,raw:`ContextMenuState | null`,elements:[{name:`signature`,type:`object`,raw:`{
  task:   GanttTaskNode;
  mouseX: number;
  mouseY: number;
}`,signature:{properties:[{key:`task`,value:{name:`intersection`,raw:`GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`signature`,type:`object`,raw:`{
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,signature:{properties:[{key:`children`,value:{name:`Array`,elements:[{name:`GanttTaskNode`}],raw:`GanttTaskNode[]`,required:!0}},{key:`depth`,value:{name:`number`,required:!0}}]}}],required:!0}},{key:`mouseX`,value:{name:`number`,required:!0}},{key:`mouseY`,value:{name:`number`,required:!0}}]}},{name:`null`}]},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTaskNode, status: GanttTaskStatus) => void`,signature:{arguments:[{type:{name:`intersection`,raw:`GanttTask & {
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},{name:`signature`,type:`object`,raw:`{
  children: GanttTaskNode[];
  // Tiefe im Baum, beginnend bei 0 für Root-Tasks (steuert den Einzug).
  depth: number;
}`,signature:{properties:[{key:`children`,value:{name:`Array`,elements:[{name:`GanttTaskNode`}],raw:`GanttTaskNode[]`,required:!0}},{key:`depth`,value:{name:`number`,required:!0}}]}}]},name:`task`},{type:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0},name:`status`}],return:{name:`void`}}},description:`Wird aufgerufen wenn der User einen Status wählt. Business-Logik (Store-Update,
 Callbacks) bleibt in GanttTimeline — diese Komponente ist rein präsentational.`}}}}));function qt({dependencyLines:e,todayX:t,totalWidth:n,height:r,top:i,arrowMarkerId:a}){let o=m(),{todayLineColor:s}=Sn();return e.length===0&&t===null?null:(0,Jt.jsxs)(`svg`,{"data-testid":`gantt-dependency-arrows`,style:{position:`absolute`,top:i,left:0,width:n,height:r,pointerEvents:`none`,overflow:`visible`},children:[e.length>0&&(0,Jt.jsx)(`defs`,{children:(0,Jt.jsx)(`marker`,{id:a,markerWidth:`6`,markerHeight:`4`,refX:`5`,refY:`2`,orient:`auto`,children:(0,Jt.jsx)(`polygon`,{points:`0 0, 6 2, 0 4`,fill:`currentColor`})})}),e.map(e=>(0,Jt.jsx)(`path`,{"data-testid":`gantt-dep-${e.key}`,d:e.d,fill:`none`,stroke:`currentColor`,strokeWidth:1.5,strokeOpacity:.4,markerEnd:`url(#${a})`},e.key)),t!==null&&(0,Jt.jsx)(`line`,{"data-testid":`gantt-today-line`,x1:t,y1:0,x2:t,y2:r,stroke:s||o.palette.primary.main,strokeWidth:1.5,strokeDasharray:`4 2`})]})}var Jt,Yt=e((()=>{D(),X(),Jt=h(),qt.__docgenInfo={description:`SVG-Layer über allen Gantt-Balken. Zeichnet:
- Z-förmige Abhängigkeitspfeile zwischen Vorgänger und Nachfolger
- Vertikale Today-Line am heutigen Datum

pointerEvents: none — Klicks auf Balken und Zeilen gehen durch.
Farben werden intern via useTheme() / useGanttTheme() gelesen.`,methods:[],displayName:`GanttDependencyArrows`,props:{dependencyLines:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{ key: string; d: string }`,signature:{properties:[{key:`key`,value:{name:`string`,required:!0}},{key:`d`,value:{name:`string`,required:!0}}]}}],raw:`DependencyLine[]`},description:``},todayX:{required:!0,tsType:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}]},description:``},totalWidth:{required:!0,tsType:{name:`number`},description:``},height:{required:!0,tsType:{name:`number`},description:``},top:{required:!0,tsType:{name:`number`},description:``},arrowMarkerId:{required:!0,tsType:{name:`string`},description:``}}}}));function Xt(e,t,n){if(n===0)return[];let r=[],i=new Map(e.map((e,t)=>[e.id,t]));for(let a of e){if(!a.dependencies?.length)continue;let o=i.get(a.id),s=se(a,t).left/100*n,c=o*40+40/2;for(let o of a.dependencies){let l=i.get(o);if(l===void 0)continue;let u=e[l],d=se(u,t),f=(d.left+d.width)/100*n,p=l*40+40/2,m;m=s>=f+48?(f+s)/2:f+24<=n-8?f+24:Math.max(s-24,8),r.push({key:`${o}-${a.id}`,d:`M ${f} ${p} H ${m} V ${c} H ${s}`})}}return r}function Zt({scrollRef:e,onScroll:t,onTaskClick:n,onMilestoneClick:r,draggable:i=!1,resizable:a=!1,progressDraggable:o=!1,showCriticalPath:s=!1,virtualizeRows:l=!1,onDragStart:u,onTaskMoved:d,onTaskResized:f,onTasksChange:p,onStatusChange:h}){let g=K(e=>e.taskTree),_=K(e=>e.tasks),v=K(e=>e.expandedIds),y=K(e=>e.timelineRange),b=K(e=>e.timeScale),x=K(e=>e.updateTask),S=bn(),C=xn(),w=m(),{todayLineColor:T}=Sn(),{workdays:E,normalizedHolidays:D}=Cn(),O=`gantt-arrow-${(0,U.useId)().replace(/:/g,``)}`,ee=K(e=>e.assigneeFilter),k=(0,U.useMemo)(()=>{let e=le(g,v);return ee?ue(e,ee):e},[g,v,ee]),A=(0,U.useMemo)(()=>oe(y,b),[y,b]),j=(0,U.useMemo)(()=>b===`days`?Te(A).map(e=>{let t=E.length>0?!E.includes(e.getDay()):e.getDay()===0||e.getDay()===6,n=!t&&E.length>0&&!Se(e,E,D);return{key:e.toISOString(),label:String(e.getDate()),width:20,isWeekend:t,isHoliday:n}}):b===`weeks`?ye(A).map(e=>({key:e.toISOString(),label:`${C.weekColumnPrefix}${ve(e)}`,width:40})):b===`quarters`?Oe(A).map(e=>({key:e.key,label:e.label,width:360})):ge(A).map(e=>({key:e.toISOString(),label:e.toLocaleString(C.dateLocale,{month:`short`,year:`2-digit`}),width:120})),[b,A,C.weekColumnPrefix,C.dateLocale,E,D]),M=(0,U.useMemo)(()=>j.reduce((e,t)=>e+t.width,0),[j]),te=(0,U.useMemo)(()=>{if(b!==`days`)return;let e=new Map;for(let t of j){let n=new Date(t.key),r=`${n.getFullYear()}-${n.getMonth()}`;e.has(r)||e.set(r,{label:n.toLocaleString(C.dateLocale,{month:`short`,year:`2-digit`}),width:0}),e.get(r).width+=20}return Array.from(e.entries()).map(([e,t])=>({key:e,...t}))},[b,j,C.dateLocale]),N=(0,U.useMemo)(()=>Xt(k,A,M),[k,A,M]),P=(0,U.useMemo)(()=>s?ke(_):new Set,[s,_]),ne=tt({count:k.length,getScrollElement:()=>e.current,estimateSize:()=>40,overscan:5}),re=(0,U.useMemo)(()=>{if(b!==`days`)return[];let e=0;return j.flatMap(t=>{let n=t.isWeekend||t.isHoliday?[{key:t.key,left:e,isHoliday:t.isHoliday}]:[];return e+=t.width,n})},[b,j]),F=(0,U.useMemo)(()=>{let e=Date.now(),t=A.start.getTime(),n=A.end.getTime();return e<t||e>n?null:(e-t)/(n-t)*M},[A,M]),ie=(0,U.useMemo)(()=>new Date().toLocaleDateString(C.dateLocale,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}),[C.dateLocale]),ae=T||w.palette.primary.main;(0,U.useEffect)(()=>{if(F===null||!e.current)return;let t=e.current.clientWidth;e.current.scrollLeft=Math.max(0,F-t/2)},[]);let se=b===`days`?20:b===`weeks`?40:b===`quarters`?360:120,I=te?80:40,{activeDrag:ce,suppressClickRef:de,handleBarMouseDown:fe,handleProgressMouseDown:L,formatDragDate:R}=Dt({totalWidth:M,displayRange:A,onDragStart:u,onTaskMoved:d,onTaskResized:f,onTasksChange:p}),[pe,me]=(0,U.useState)(null),he=(0,U.useRef)(h);he.current=h;let _e=(0,U.useRef)(p);return _e.current=p,(0,W.jsx)(c,{ref:e,onScroll:t,"data-testid":`gantt-timeline-scroll`,sx:{flex:1,overflow:`auto`},children:(0,W.jsxs)(c,{sx:{minWidth:M,position:`relative`},children:[(0,W.jsx)(jt,{columns:j,groups:te,todayX:F,todayLabel:C.todayLabel,todayTooltip:ie,todayColor:ae}),(0,W.jsx)(Bt,{strips:re,totalWidth:M,height:k.length*40,top:I}),l?(0,W.jsx)(c,{sx:{position:`relative`,height:ne.getTotalSize()},children:ne.getVirtualItems().map(e=>(0,W.jsx)(Ft,{task:k[e.index],virtualTop:e.start,activeDrag:ce,displayRange:A,totalWidth:M,gridColumnWidth:se,criticalTaskIds:P,draggable:i,resizable:a,progressDraggable:o,onTaskClick:n,onMilestoneClick:r,onContextMenu:(e,t,n)=>me({task:e,mouseX:t,mouseY:n}),suppressClickRef:de,handleBarMouseDown:fe,handleProgressMouseDown:L,formatDragDate:R},e.key))}):(0,W.jsx)(W.Fragment,{children:k.map(e=>(0,W.jsx)(Ft,{task:e,activeDrag:ce,displayRange:A,totalWidth:M,gridColumnWidth:se,criticalTaskIds:P,draggable:i,resizable:a,progressDraggable:o,onTaskClick:n,onMilestoneClick:r,onContextMenu:(e,t,n)=>me({task:e,mouseX:t,mouseY:n}),suppressClickRef:de,handleBarMouseDown:fe,handleProgressMouseDown:L,formatDragDate:R},e.id))}),(0,W.jsx)(Wt,{contextMenu:pe,onClose:()=>me(null),onSelect:(e,t)=>{let n=S.getState().tasks.find(t=>t.id===e.id)??e;x({...n,status:t}),he.current?.(n,t),_e.current?.(S.getState().tasks),me(null)}}),(0,W.jsx)(qt,{dependencyLines:N,todayX:F,totalWidth:M,height:k.length*40,top:I,arrowMarkerId:O})]})})}var U,W,Qt=e((()=>{U=t(u(),1),at(),D(),X(),kt(),Ae(),Pt(),zt(),Ut(),Kt(),Yt(),dt(),W=h(),Zt.__docgenInfo={description:``,methods:[],displayName:`GanttTimeline`,props:{scrollRef:{required:!0,tsType:{name:`RefObject`,elements:[{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}]}],raw:`RefObject<HTMLDivElement | null>`},description:``},onScroll:{required:!0,tsType:{name:`UIEventHandler`,elements:[{name:`HTMLDivElement`}],raw:`UIEventHandler<HTMLDivElement>`},description:``},onTaskClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onMilestoneClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},draggable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},resizable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},progressDraggable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showCriticalPath:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},virtualizeRows:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onDragStart:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, type: "move" | "resize") => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`union`,raw:`"move" | "resize"`,elements:[{name:`literal`,value:`"move"`},{name:`literal`,value:`"resize"`}]},name:`type`}],return:{name:`void`}}},description:``},onTaskMoved:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, newStart: Date, newEnd: Date) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`Date`},name:`newStart`},{type:{name:`Date`},name:`newEnd`}],return:{name:`void`}}},description:``},onTaskResized:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, newEnd: Date) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`Date`},name:`newEnd`}],return:{name:`void`}}},description:``},onTasksChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tasks: GanttTask[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}}],raw:`GanttTask[]`},name:`tasks`}],return:{name:`void`}}},description:``},onStatusChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, status: GanttTaskStatus) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0},name:`status`}],return:{name:`void`}}},description:``}}}})),$t,en,tn=e((()=>{k(),$t=h(),en=T((0,$t.jsx)(`path`,{d:`M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8m-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91`}),`RestartAlt`)})),nn,rn,an=e((()=>{k(),nn=h(),rn=T((0,nn.jsx)(`path`,{d:`M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z`}),`Restore`)})),on,sn,cn=e((()=>{k(),on=h(),sn=T((0,on.jsx)(`path`,{d:`M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V8h14zM7 10h5v5H7z`}),`Today`)})),ln,un,dn=e((()=>{k(),ln=h(),un=T((0,ln.jsx)(`path`,{d:`M7.41 18.59 8.83 20 12 16.83 15.17 20l1.41-1.41L12 14zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10z`}),`UnfoldLess`)})),fn,pn,mn=e((()=>{k(),fn=h(),pn=T((0,fn.jsx)(`path`,{d:`M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15z`}),`UnfoldMore`)}));function hn(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function gn(e){let[t,n,r]=e.split(`-`).map(Number);return!t||!n||!r?null:new Date(t,n-1,r,0,0,0,0)}function _n({onScrollToToday:e,config:t,onExportCSV:n}){let r=xn(),i=K(e=>e.timeScale),a=K(e=>e.defaultTimeScale),o=K(e=>e.setTimeScale),s=K(e=>e.timelineRange),l=K(e=>e.isRangeCustomized),u=K(e=>e.isExpandedCustomized),d=K(e=>e.setTimelineRange),f=K(e=>e.resetTimelineRange),m=K(e=>e.resetView),h=K(e=>e.tasks),b=K(e=>e.expandedIds),x=K(e=>e.expandAll),S=K(e=>e.collapseAll),w=K(e=>e.assigneeFilter),T=K(e=>e.setAssigneeFilter),D=(0,vn.useMemo)(()=>[...new Set(h.flatMap(e=>e.assignee?[e.assignee]:[]))].sort(),[h]),k=h.length>0&&h.every(e=>b.has(e.id)),A=i!==a||l||u||w!==``,j=(0,vn.useMemo)(()=>Date.now(),[]),M=j>=s.start.getTime()&&j<=s.end.getTime(),te={days:r.scaleDays,weeks:r.scaleWeeks,months:r.scaleMonths,quarters:r.scaleQuarters},N={days:t.showScaleDays,weeks:t.showScaleWeeks,months:t.showScaleMonths,quarters:t.showScaleQuarters},P=Object.keys(te).filter(e=>N[e]);return(0,G.jsxs)(c,{"data-testid":`gantt-toolbar`,sx:{display:`flex`,alignItems:`center`,flexWrap:`wrap`,gap:1,px:1.5,py:.75,borderBottom:`1px solid`,borderColor:`divider`,bgcolor:`background.paper`},children:[P.length>0&&(0,G.jsx)(C,{value:i,exclusive:!0,onChange:(e,t)=>{t&&o(t)},size:`small`,"aria-label":r.scaleMonths,children:P.map(e=>(0,G.jsx)(E,{value:e,"data-testid":`gantt-scale-${e}`,children:te[e]},e))}),t.showAssigneeFilter&&D.length>0&&(0,G.jsxs)(ee,{size:`small`,sx:{minWidth:140},children:[(0,G.jsx)(g,{id:`gantt-assignee-filter-label`,children:r.filterAssigneeLabel??`Assignee`}),(0,G.jsxs)(O,{labelId:`gantt-assignee-filter-label`,value:w,label:r.filterAssigneeLabel??`Assignee`,onChange:e=>T(e.target.value),inputProps:{"data-testid":`gantt-assignee-filter`},children:[(0,G.jsx)(v,{value:``,children:r.filterAssigneeAll??`Alle`}),D.map(e=>(0,G.jsx)(v,{value:e,children:e},e))]})]}),(0,G.jsxs)(c,{sx:{ml:`auto`,display:`flex`,alignItems:`center`,gap:1},children:[t.showExpandCollapseAll&&(0,G.jsx)(_,{title:k?r.collapseAllTooltip:r.expandAllTooltip,children:(0,G.jsx)(p,{size:`small`,onClick:k?S:x,"aria-label":k?r.collapseAllTooltip:r.expandAllTooltip,"data-testid":`gantt-expand-collapse-all`,children:k?(0,G.jsx)(un,{fontSize:`small`}):(0,G.jsx)(pn,{fontSize:`small`})})}),t.showScrollToToday&&e&&(0,G.jsx)(_,{title:r.scrollToTodayTooltip,children:(0,G.jsx)(`span`,{children:(0,G.jsx)(p,{size:`small`,onClick:e,disabled:!M,"aria-label":r.scrollToTodayTooltip,"data-testid":`gantt-scroll-to-today`,children:(0,G.jsx)(sn,{fontSize:`small`})})})}),t.showDateRange&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(y,{type:`date`,size:`small`,label:r.rangeFrom,value:hn(s.start),onChange:e=>{let t=gn(e.target.value);t&&d({start:t,end:s.end})},slotProps:{inputLabel:{shrink:!0},htmlInput:{"data-testid":`gantt-range-start`}},sx:{width:148}}),(0,G.jsx)(y,{type:`date`,size:`small`,label:r.rangeTo,value:hn(s.end),onChange:e=>{let t=gn(e.target.value);t&&d({start:s.start,end:t})},slotProps:{inputLabel:{shrink:!0},htmlInput:{"data-testid":`gantt-range-end`}},sx:{width:148}})]}),t.showRangeReset&&l&&(0,G.jsx)(_,{title:r.rangeResetTooltip,children:(0,G.jsx)(p,{size:`small`,onClick:f,"aria-label":r.rangeResetTooltip,"data-testid":`gantt-range-reset`,children:(0,G.jsx)(rn,{fontSize:`small`})})}),t.showExportCSV&&n&&(0,G.jsx)(_,{title:r.exportCsvTooltip,children:(0,G.jsx)(p,{size:`small`,onClick:n,"aria-label":r.exportCsvTooltip,"data-testid":`gantt-export-csv`,children:(0,G.jsx)(ie,{fontSize:`small`})})}),t.showResetView&&(0,G.jsx)(_,{title:r.resetViewTooltip,children:(0,G.jsx)(`span`,{children:(0,G.jsx)(p,{size:`small`,onClick:m,disabled:!A,"aria-label":r.resetViewTooltip,"data-testid":`gantt-reset-view`,children:(0,G.jsx)(en,{fontSize:`small`})})})})]})]})}var vn,G,yn=e((()=>{vn=t(u(),1),D(),F(),tn(),an(),cn(),dn(),mn(),X(),G=h(),_n.__docgenInfo={description:``,methods:[],displayName:`GanttToolbar`,props:{onScrollToToday:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},config:{required:!0,tsType:{name:`Required`,elements:[{name:`signature`,type:`object`,raw:`{
  showScaleDays?: boolean;
  showScaleWeeks?: boolean;
  showScaleMonths?: boolean;
  showScaleQuarters?: boolean;
  showExpandCollapseAll?: boolean;
  showScrollToToday?: boolean;
  showDateRange?: boolean;   // Von/Bis-Inputs
  showRangeReset?: boolean;  // Restore-Button (erscheint wenn Bereich angepasst)
  showResetView?: boolean;   // Reset-Button (Skala + Bereich zurücksetzen)
  /** Show CSV export button in the toolbar (default: false) */
  showExportCSV?: boolean;
  /** Show assignee filter dropdown in toolbar (default: false) */
  showAssigneeFilter?: boolean;
}`,signature:{properties:[{key:`showScaleDays`,value:{name:`boolean`,required:!1}},{key:`showScaleWeeks`,value:{name:`boolean`,required:!1}},{key:`showScaleMonths`,value:{name:`boolean`,required:!1}},{key:`showScaleQuarters`,value:{name:`boolean`,required:!1}},{key:`showExpandCollapseAll`,value:{name:`boolean`,required:!1}},{key:`showScrollToToday`,value:{name:`boolean`,required:!1}},{key:`showDateRange`,value:{name:`boolean`,required:!1}},{key:`showRangeReset`,value:{name:`boolean`,required:!1}},{key:`showResetView`,value:{name:`boolean`,required:!1}},{key:`showExportCSV`,value:{name:`boolean`,required:!1},description:`Show CSV export button in the toolbar (default: false)`},{key:`showAssigneeFilter`,value:{name:`boolean`,required:!1},description:`Show assignee filter dropdown in toolbar (default: false)`}]}}],raw:`Required<GanttToolbarConfig>`},description:``},onExportCSV:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));function K(e){let t=(0,J.useContext)(En);if(!t)throw Error(`GanttChartStoreContext is missing.`);return j(t,e)}function bn(){let e=(0,J.useContext)(En);if(!e)throw Error(`GanttChartStoreContext is missing.`);return e}function xn(){return(0,J.useContext)(Dn)}function Sn(){return(0,J.useContext)(On)}function Cn(){return(0,J.useContext)(kn)}function wn(e,t){return e===void 0?t:e===`auto`?`100%`:typeof e==`string`&&/^\d+$/.test(e)?Number(e):e}function Tn({tasks:e,onTaskClick:t,onMilestoneClick:n,onAddTask:r,onEditTask:i,onDeleteTask:a,onStatusChange:o,onTasksChange:s,enableBuiltinDialogs:l=!0,onTaskCreated:u,onTaskUpdated:d,onTaskDeleted:f,showToolbar:p=!0,toolbarConfig:m,height:h,width:g,minPanelWidth:_=200,maxPanelWidth:v=600,zoomable:y=!1,draggable:b=!1,resizable:x=!1,inlineEdit:S=!1,progressDraggable:C=!1,showCriticalPath:w=!1,virtualizeRows:T=!1,showAssigneeColumn:E=!1,onExportCSV:D,onDragStart:O,onTaskMoved:ee,onTaskResized:k}){let A=wn(h,400),j=(0,J.useMemo)(()=>({...jn,...m}),[m]),M=wn(g,`100%`),te=K(e=>e.setTasks),N=K(e=>e.timeScale),P=K(e=>e.setTimeScale),ne=K(e=>e.timelineRange),re=(0,J.useRef)(null),F=(0,J.useRef)(null),ie=(0,J.useRef)(!1),[ae,se]=(0,J.useState)(320+(E?110:0)),I=Math.max(_,90+(l||r||i||a?96:0)+(E?110:0)+80),ce=bn(),le=(0,J.useCallback)(()=>{let e=ce.getState().tasks,t=[[`id`,`name`,`status`,`startDate`,`endDate`,`progress`,`assignee`,`parentId`,`isMilestone`,`dependencies`,`color`].join(`,`),...e.map(e=>[e.id,`"${e.name.replace(/"/g,`""`)}"`,e.status,e.startDate.toISOString().split(`T`)[0],e.endDate.toISOString().split(`T`)[0],e.progress??``,e.assignee?`"${e.assignee.replace(/"/g,`""`)}"`:``,e.parentId??``,e.isMilestone?`true`:`false`,(e.dependencies??[]).join(`;`),e.color??``].join(`,`))].join(`
`);if(D)D(t,e);else{let e=new Blob([t],{type:`text/csv;charset=utf-8;`}),n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=`gantt-tasks.csv`,r.click(),URL.revokeObjectURL(n)}},[ce,D]);(0,J.useEffect)(()=>{te(e)},[e,te]);let ue=()=>{ie.current||=(ie.current=!0,F.current&&re.current&&(F.current.scrollTop=re.current.scrollTop),!1)},de=()=>{ie.current||=(ie.current=!0,re.current&&F.current&&(re.current.scrollTop=F.current.scrollTop),!1)},fe=(0,J.useCallback)(()=>{if(!F.current)return;let e=oe(ne,N),t=Date.now(),n=e.start.getTime(),r=e.end.getTime(),i=(t-n)/(r-n)*F.current.scrollWidth;F.current.scrollLeft=Math.max(0,i-F.current.clientWidth/2)},[ne,N]);(0,J.useEffect)(()=>{if(!y||!F.current)return;let e=F.current,t=e=>{if(!e.ctrlKey)return;e.preventDefault();let t=An.indexOf(N);e.deltaY<0&&t>0?P(An[t-1]):e.deltaY>0&&t<An.length-1&&P(An[t+1])};return e.addEventListener(`wheel`,t,{passive:!1}),()=>e.removeEventListener(`wheel`,t)},[y,N,P]);let L=(0,J.useCallback)(e=>{e.preventDefault();let t=e.clientX,n=ae,r=e=>{let r=e.clientX-t;se(Math.max(I,Math.min(v,n+r)))},i=()=>{document.removeEventListener(`mousemove`,r),document.removeEventListener(`mouseup`,i)};document.addEventListener(`mousemove`,r),document.addEventListener(`mouseup`,i)},[ae,I,v]);return(0,Y.jsxs)(c,{sx:{display:`flex`,flexDirection:`column`,height:A,width:M,border:`1px solid`,borderColor:`divider`,borderRadius:1,overflow:`hidden`},children:[p&&(0,Y.jsx)(_n,{onScrollToToday:fe,config:j,onExportCSV:j.showExportCSV?le:void 0}),(0,Y.jsxs)(c,{sx:{display:`flex`,flex:1,overflow:`hidden`},children:[(0,Y.jsx)(wt,{scrollRef:re,onScroll:ue,panelWidth:ae,onTaskClick:t,onAddTask:r,onEditTask:i,onDeleteTask:a,onStatusChange:o,onTasksChange:s,enableBuiltinDialogs:l,onTaskCreated:u,onTaskUpdated:d,onTaskDeleted:f,inlineEdit:S,virtualizeRows:T,showAssigneeColumn:E}),(0,Y.jsx)(c,{"data-testid":`gantt-panel-divider`,sx:{width:4,flexShrink:0,bgcolor:`divider`,cursor:`col-resize`,"&:hover":{bgcolor:`action.hover`}},onMouseDown:L}),(0,Y.jsx)(Zt,{scrollRef:F,onScroll:de,onTaskClick:t,onMilestoneClick:n,draggable:b,resizable:x,progressDraggable:C,showCriticalPath:w,virtualizeRows:T,onDragStart:O,onTaskMoved:ee,onTaskResized:k,onTasksChange:s,onStatusChange:o})]})]})}function q({tasks:e,timeScale:t=`months`,initialExpandAll:n=!1,showToolbar:r=!0,defaultRangeStart:i,defaultRangeEnd:a,translations:o,enableBuiltinDialogs:s=!0,toolbarConfig:c,zoomable:l=!1,draggable:u=!1,resizable:d=!1,inlineEdit:f=!1,progressDraggable:p=!1,showCriticalPath:m=!1,virtualizeRows:h=!1,showAssigneeColumn:g=!1,cascadeDependencies:_=!1,workdays:v=[],holidays:y=[],statusColors:b,ganttTheme:x,onExportCSV:S,onDragStart:C,onTaskClick:w,onMilestoneClick:T,onAddTask:E,onEditTask:D,onDeleteTask:O,onStatusChange:ee,onTasksChange:k,onTaskMoved:A,onTaskResized:j,onTaskCreated:M,onTaskUpdated:te,onTaskDeleted:N,height:P,width:ne,minPanelWidth:re,maxPanelWidth:F}){let ie=(0,J.useMemo)(()=>({...Pe,...o}),[o]),oe=(0,J.useMemo)(()=>xe(y),[y]),se=(0,J.useMemo)(()=>({workdays:v,normalizedHolidays:oe}),[v,oe]),[I]=(0,J.useState)(()=>{let r=xe(y);if(!(i!==void 0||a!==void 0))return Me(e,t,n,void 0,_,v,r);let o=ae(e);return Me(e,t,n,{start:i??o.start,end:a??o.end},_,v,r)}),ce=(0,J.useMemo)(()=>({...x,statusColors:{...b,...x?.statusColors}}),[b,x]);return(0,Y.jsx)(Dn.Provider,{value:ie,children:(0,Y.jsx)(On.Provider,{value:ce,children:(0,Y.jsx)(kn.Provider,{value:se,children:(0,Y.jsx)(En.Provider,{value:I,children:(0,Y.jsx)(Tn,{tasks:e,timeScale:t,enableBuiltinDialogs:s,showToolbar:r,toolbarConfig:c,zoomable:l,draggable:u,resizable:d,inlineEdit:f,progressDraggable:p,showCriticalPath:m,virtualizeRows:h,showAssigneeColumn:g,onExportCSV:S,onDragStart:C,onTaskClick:w,onMilestoneClick:T,onAddTask:E,onEditTask:D,onDeleteTask:O,onStatusChange:ee,onTasksChange:k,onTaskMoved:A,onTaskResized:j,onTaskCreated:M,onTaskUpdated:te,onTaskDeleted:N,height:P,width:ne,minPanelWidth:re,maxPanelWidth:F})})})})})}var J,Y,En,Dn,On,kn,An,jn,X=e((()=>{J=t(u(),1),te(),D(),Ne(),Fe(),Ae(),Et(),Qt(),yn(),dt(),Y=h(),En=(0,J.createContext)(null),Dn=(0,J.createContext)(Pe),On=(0,J.createContext)({}),kn=(0,J.createContext)({workdays:[],normalizedHolidays:new Set}),An=[`days`,`weeks`,`months`,`quarters`],jn={showScaleDays:!0,showScaleWeeks:!0,showScaleMonths:!0,showScaleQuarters:!0,showExpandCollapseAll:!0,showScrollToToday:!0,showDateRange:!0,showRangeReset:!0,showResetView:!0,showExportCSV:!1,showAssigneeFilter:!1},q.__docgenInfo={description:``,methods:[],displayName:`GanttChart`,props:{cascadeDependencies:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},defaultRangeEnd:{required:!1,tsType:{name:`Date`},description:``},defaultRangeStart:{required:!1,tsType:{name:`Date`},description:``},draggable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},enableBuiltinDialogs:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},ganttTheme:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  // Per-Status-Balkenfarben (CSS-Farbwerte).
  statusColors?: GanttStatusColors;
  // Farbe des kritischen-Pfad-Indikators (Default: error.main).
  criticalPathColor?: string;
  // Farbe der Meilenstein-Raute (Default: warning.main).
  milestoneColor?: string;
  // Farbe der Heute-Linie (Default: primary.main).
  todayLineColor?: string;
  // Hintergrundfarbe der Wochenend-Spalten (Default: action.hover).
  weekendColor?: string;
  // Hintergrundfarbe der Feiertags-Spalten (Default: warmes Amber, ~18 % Opacity).
  // Feiertage werden immer anders gefärbt als Wochenenden damit man sie auf einen Blick unterscheiden kann.
  holidayColor?: string;
  // Eckenradius der Aufgaben-Balken in Pixeln (Default: 4).
  barBorderRadius?: number;
}`,signature:{properties:[{key:`statusColors`,value:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}]},{name:`string`}],raw:`Record<GanttTaskStatus, string>`}],raw:`Partial<Record<GanttTaskStatus, string>>`,required:!1}},{key:`criticalPathColor`,value:{name:`string`,required:!1}},{key:`milestoneColor`,value:{name:`string`,required:!1}},{key:`todayLineColor`,value:{name:`string`,required:!1}},{key:`weekendColor`,value:{name:`string`,required:!1}},{key:`holidayColor`,value:{name:`string`,required:!1}},{key:`barBorderRadius`,value:{name:`number`,required:!1}}]}},description:``},height:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Höhe des Charts. "auto" = 100 % des Eltern-Containers. Standard: 400.`},initialExpandAll:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},inlineEdit:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},maxPanelWidth:{required:!1,tsType:{name:`number`},description:``},minPanelWidth:{required:!1,tsType:{name:`number`},description:``},progressDraggable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},resizable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showCriticalPath:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showToolbar:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},statusColors:{required:!1,tsType:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}]},{name:`string`}],raw:`Record<GanttTaskStatus, string>`}],raw:`Partial<Record<GanttTaskStatus, string>>`},description:``},tasks:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}}],raw:`GanttTask[]`},description:``},timeScale:{required:!1,tsType:{name:`union`,raw:`"days" | "weeks" | "months" | "quarters"`,elements:[{name:`literal`,value:`"days"`},{name:`literal`,value:`"weeks"`},{name:`literal`,value:`"months"`},{name:`literal`,value:`"quarters"`}]},description:``,defaultValue:{value:`"months"`,computed:!1}},toolbarConfig:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  showScaleDays?: boolean;
  showScaleWeeks?: boolean;
  showScaleMonths?: boolean;
  showScaleQuarters?: boolean;
  showExpandCollapseAll?: boolean;
  showScrollToToday?: boolean;
  showDateRange?: boolean;   // Von/Bis-Inputs
  showRangeReset?: boolean;  // Restore-Button (erscheint wenn Bereich angepasst)
  showResetView?: boolean;   // Reset-Button (Skala + Bereich zurücksetzen)
  /** Show CSV export button in the toolbar (default: false) */
  showExportCSV?: boolean;
  /** Show assignee filter dropdown in toolbar (default: false) */
  showAssigneeFilter?: boolean;
}`,signature:{properties:[{key:`showScaleDays`,value:{name:`boolean`,required:!1}},{key:`showScaleWeeks`,value:{name:`boolean`,required:!1}},{key:`showScaleMonths`,value:{name:`boolean`,required:!1}},{key:`showScaleQuarters`,value:{name:`boolean`,required:!1}},{key:`showExpandCollapseAll`,value:{name:`boolean`,required:!1}},{key:`showScrollToToday`,value:{name:`boolean`,required:!1}},{key:`showDateRange`,value:{name:`boolean`,required:!1}},{key:`showRangeReset`,value:{name:`boolean`,required:!1}},{key:`showResetView`,value:{name:`boolean`,required:!1}},{key:`showExportCSV`,value:{name:`boolean`,required:!1},description:`Show CSV export button in the toolbar (default: false)`},{key:`showAssigneeFilter`,value:{name:`boolean`,required:!1},description:`Show assignee filter dropdown in toolbar (default: false)`}]}},description:``},translations:{required:!1,tsType:{name:`Partial`,elements:[{name:`signature`,type:`object`,raw:`{
  // Toolbar — Skalen-Buttons
  scaleDays: string;
  scaleWeeks: string;
  scaleMonths: string;
  scaleQuarters: string;
  // Toolbar — Datumsbereich
  rangeFrom: string;
  rangeTo: string;
  rangeResetTooltip: string;
  // Task-Panel — Spalten-Header
  columnName: string;
  columnStatus: string;
  // Status-Labels (Chip + Kontextmenü)
  statusPlanned: string;
  statusInProgress: string;
  statusDone: string;
  statusBlocked: string;
  // Timeline — Wochen-Prefix (z. B. "KW" → "W" für Englisch)
  weekColumnPrefix: string;
  // Timeline — Heute-Chip über der gestrichelten Linie (leer = kein Chip)
  /** @since 2.0.0 */
  todayLabel?: string;
  // Locale für die Datums-Formatierung im Timeline-Header
  dateLocale: string;
  // Dialoge — Titel und Buttons
  dialogAddTitle: string;
  dialogEditTitle: string;
  dialogDeleteTitle: string;
  dialogSave: string;
  dialogCancel: string;
  dialogDelete: string;
  // Dialoge — Formularfelder
  dialogFieldName: string;
  dialogFieldStartDate: string;
  dialogFieldEndDate: string;
  dialogFieldStatus: string;
  dialogFieldMilestone: string;
  dialogFieldParent: string;
  dialogFieldParentNone: string;
  // Dialoge — Bestätigungstext ({name} wird durch den Task-Namen ersetzt)
  dialogDeleteConfirm: string;
  // Dialoge — Vorgänger-Multiselect
  dialogFieldDependencies: string;
  dialogFieldDependenciesNone: string;
  /** Label for the progress slider in the task dialog (0–100 %) @since 3.16.0 */
  dialogFieldProgress?: string;
  /** "All" option label in the assignee filter dropdown @since 3.17.0 */
  filterAssigneeAll?: string;
  /** Assignee filter Select label in the toolbar @since 3.17.0 */
  filterAssigneeLabel?: string;
  // Task-Panel — Aktions-Spalten-Header
  columnActions: string;
  /** Header label for the Assignee column — shown when showAssigneeColumn=true @since 2.7.0 */
  columnAssignee?: string;
  // Task-Panel — Zeilen-Icon-Tooltips
  addTaskTooltip: string;
  editTaskTooltip: string;
  deleteTaskTooltip: string;
  // Toolbar — Heute-Button + Expand/Collapse + Reset
  scrollToTodayTooltip: string;
  expandAllTooltip: string;
  collapseAllTooltip: string;
  resetViewTooltip: string;
  /** Toolbar tooltip for the CSV export button @since 2.7.0 */
  exportCsvTooltip?: string;
}`,signature:{properties:[{key:`scaleDays`,value:{name:`string`,required:!0}},{key:`scaleWeeks`,value:{name:`string`,required:!0}},{key:`scaleMonths`,value:{name:`string`,required:!0}},{key:`scaleQuarters`,value:{name:`string`,required:!0}},{key:`rangeFrom`,value:{name:`string`,required:!0}},{key:`rangeTo`,value:{name:`string`,required:!0}},{key:`rangeResetTooltip`,value:{name:`string`,required:!0}},{key:`columnName`,value:{name:`string`,required:!0}},{key:`columnStatus`,value:{name:`string`,required:!0}},{key:`statusPlanned`,value:{name:`string`,required:!0}},{key:`statusInProgress`,value:{name:`string`,required:!0}},{key:`statusDone`,value:{name:`string`,required:!0}},{key:`statusBlocked`,value:{name:`string`,required:!0}},{key:`weekColumnPrefix`,value:{name:`string`,required:!0}},{key:`todayLabel`,value:{name:`string`,required:!1},description:`@since 2.0.0`},{key:`dateLocale`,value:{name:`string`,required:!0}},{key:`dialogAddTitle`,value:{name:`string`,required:!0}},{key:`dialogEditTitle`,value:{name:`string`,required:!0}},{key:`dialogDeleteTitle`,value:{name:`string`,required:!0}},{key:`dialogSave`,value:{name:`string`,required:!0}},{key:`dialogCancel`,value:{name:`string`,required:!0}},{key:`dialogDelete`,value:{name:`string`,required:!0}},{key:`dialogFieldName`,value:{name:`string`,required:!0}},{key:`dialogFieldStartDate`,value:{name:`string`,required:!0}},{key:`dialogFieldEndDate`,value:{name:`string`,required:!0}},{key:`dialogFieldStatus`,value:{name:`string`,required:!0}},{key:`dialogFieldMilestone`,value:{name:`string`,required:!0}},{key:`dialogFieldParent`,value:{name:`string`,required:!0}},{key:`dialogFieldParentNone`,value:{name:`string`,required:!0}},{key:`dialogDeleteConfirm`,value:{name:`string`,required:!0}},{key:`dialogFieldDependencies`,value:{name:`string`,required:!0}},{key:`dialogFieldDependenciesNone`,value:{name:`string`,required:!0}},{key:`dialogFieldProgress`,value:{name:`string`,required:!1},description:`Label for the progress slider in the task dialog (0–100 %) @since 3.16.0`},{key:`filterAssigneeAll`,value:{name:`string`,required:!1},description:`"All" option label in the assignee filter dropdown @since 3.17.0`},{key:`filterAssigneeLabel`,value:{name:`string`,required:!1},description:`Assignee filter Select label in the toolbar @since 3.17.0`},{key:`columnActions`,value:{name:`string`,required:!0}},{key:`columnAssignee`,value:{name:`string`,required:!1},description:`Header label for the Assignee column — shown when showAssigneeColumn=true @since 2.7.0`},{key:`addTaskTooltip`,value:{name:`string`,required:!0}},{key:`editTaskTooltip`,value:{name:`string`,required:!0}},{key:`deleteTaskTooltip`,value:{name:`string`,required:!0}},{key:`scrollToTodayTooltip`,value:{name:`string`,required:!0}},{key:`expandAllTooltip`,value:{name:`string`,required:!0}},{key:`collapseAllTooltip`,value:{name:`string`,required:!0}},{key:`resetViewTooltip`,value:{name:`string`,required:!0}},{key:`exportCsvTooltip`,value:{name:`string`,required:!1},description:`Toolbar tooltip for the CSV export button @since 2.7.0`}]}}],raw:`Partial<GanttTranslations>`},description:``},virtualizeRows:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showAssigneeColumn:{required:!1,tsType:{name:`boolean`},description:`Show the Assignee column in the task panel (default: false)`,defaultValue:{value:`false`,computed:!1}},workdays:{required:!1,tsType:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},description:`Arbeitstag-Wochentag-Indices (0=So, 1=Mo … 6=Sa). Default: [] (kein Snap).
Wenn gesetzt, aktiviert Drag-Snap (Start/End landen auf einem Arbeitstag),
Cascade-Advance und farblich unterschiedliche Nicht-Arbeitstags-Spalten in der Tages-Skala.
Typischer Wert: [1,2,3,4,5] für Mo–Fr.`,defaultValue:{value:`[]`,computed:!1}},holidays:{required:!1,tsType:{name:`Array`,elements:[{name:`Date`}],raw:`Date[]`},description:`Konkrete Feiertage (z. B. gesetzliche Feiertage, Betriebsferien) die als
Nicht-Arbeitstage gelten, unabhängig davon welcher Wochentag sie sind.
Werden in der Tages-Skala grau hinterlegt und mit einem Punkt markiert.`,defaultValue:{value:`[]`,computed:!1}},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:`Breite des Charts. "auto" = 100 % des Eltern-Containers. Standard: "100%".`},zoomable:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onAddTask:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(parentTask?: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`parentTask`}],return:{name:`void`}}},description:``},onDeleteTask:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onEditTask:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onMilestoneClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onStatusChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, status: GanttTaskStatus) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0},name:`status`}],return:{name:`void`}}},description:``},onTaskClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onTaskCreated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``},onTaskDeleted:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(taskId: string) => void`,signature:{arguments:[{type:{name:`string`},name:`taskId`}],return:{name:`void`}}},description:``},onDragStart:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, type: "move" | "resize") => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`union`,raw:`"move" | "resize"`,elements:[{name:`literal`,value:`"move"`},{name:`literal`,value:`"resize"`}]},name:`type`}],return:{name:`void`}}},description:`Fired once when the user presses the mouse button on a draggable bar (before any movement).
Use this for optimistic UI, analytics, or showing a shadow element during drag.
\`type\` distinguishes between a move gesture and a resize gesture.
@since 3.17.0`},onTaskMoved:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, newStart: Date, newEnd: Date) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`Date`},name:`newStart`},{type:{name:`Date`},name:`newEnd`}],return:{name:`void`}}},description:``},onTaskResized:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask, newEnd: Date) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`},{type:{name:`Date`},name:`newEnd`}],return:{name:`void`}}},description:``},onTasksChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(tasks: GanttTask[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}}],raw:`GanttTask[]`},name:`tasks`}],return:{name:`void`}}},description:``},onExportCSV:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(csv: string, tasks: GanttTask[]) => void`,signature:{arguments:[{type:{name:`string`},name:`csv`},{type:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}}],raw:`GanttTask[]`},name:`tasks`}],return:{name:`void`}}},description:`Fired when the user clicks the CSV export button.
The first argument is the ready-to-download CSV string.
When not provided, the chart triggers a browser download automatically.`},onTaskUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(task: GanttTask) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
  // Eindeutige Kennung — wird als React-Key und für Abhängigkeiten verwendet.
  id: string;
  // undefined = Root-Task (kein Elternelement)
  parentId?: string;
  name: string;
  status: GanttTaskStatus;
  startDate: Date;
  endDate: Date;
  // IDs der Vorgänger-Tasks, von denen dieser Task abhängt.
  dependencies?: string[];
  // Meilensteine haben keine Dauer (startDate ≈ endDate) und werden als Raute dargestellt.
  isMilestone?: boolean;
  // Fortschritt in Prozent (0–100) — wird als halbopaker Overlay-Balken gerendert.
  progress?: number;
  // Überschreibt die Status-Farbe für diesen einzelnen Task (höchste Priorität, CSS-Farbwert).
  color?: string;
  /** Person or team responsible for this task — shown in the Assignee column */
  assignee?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`parentId`,value:{name:`string`,required:!1}},{key:`name`,value:{name:`string`,required:!0}},{key:`status`,value:{name:`union`,raw:`"planned" | "in-progress" | "done" | "blocked"`,elements:[{name:`literal`,value:`"planned"`},{name:`literal`,value:`"in-progress"`},{name:`literal`,value:`"done"`},{name:`literal`,value:`"blocked"`}],required:!0}},{key:`startDate`,value:{name:`Date`,required:!0}},{key:`endDate`,value:{name:`Date`,required:!0}},{key:`dependencies`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!1}},{key:`isMilestone`,value:{name:`boolean`,required:!1}},{key:`progress`,value:{name:`number`,required:!1}},{key:`color`,value:{name:`string`,required:!1}},{key:`assignee`,value:{name:`string`,required:!1},description:`Person or team responsible for this task — shown in the Assignee column`}]}},name:`task`}],return:{name:`void`}}},description:``}}}}));function Mn(){let e=[`planned`,`in-progress`,`done`,`blocked`],t=[],n=0,r=(e,t,n)=>new Date(e,t-1,n);for(let i=0;i<4;i++){let a=`prog-${i}`;t.push({id:a,name:`Program ${i+1}`,status:e[n++%4],startDate:r(2025,1+i*3,1),endDate:r(2026,3+i*3,30)});for(let o=0;o<4;o++){let s=`prog-${i}-rel-${o}`;t.push({id:s,parentId:a,name:`Release ${o+1}`,status:e[n++%4],startDate:r(2025,1+i*3+o,1),endDate:r(2025,2+i*3+o,28)});for(let a=0;a<5;a++){let c=`prog-${i}-rel-${o}-team-${a}`;t.push({id:c,parentId:s,name:`Team ${a+1}`,status:e[n++%4],startDate:r(2025,1+i*3+o,1+a*4),endDate:r(2025,1+i*3+o,5+a*5)});for(let s=0;s<4;s++)t.push({id:`prog-${i}-rel-${o}-team-${a}-sprint-${s}`,parentId:c,name:`Sprint ${s+1}`,status:e[n++%4],startDate:r(2025,1+i*3+o,1+s*7),endDate:r(2025,1+i*3+o,7+s*7)})}}}return t}var Z,Q,Nn,$,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r;e((()=>{D(),X(),Z=h(),{fn:Q}=__STORYBOOK_MODULE_TEST__,Nn={scaleDays:`Days`,scaleWeeks:`Weeks`,scaleMonths:`Months`,scaleQuarters:`Quarters`,rangeFrom:`From`,rangeTo:`To`,rangeResetTooltip:`Reset range`,columnName:`Name`,columnStatus:`Status`,statusPlanned:`Planned`,statusInProgress:`In Progress`,statusDone:`Done`,statusBlocked:`Blocked`,weekColumnPrefix:`W`,todayLabel:`Today`,dateLocale:`en-US`,dialogAddTitle:`Add Task`,dialogEditTitle:`Edit Task`,dialogDeleteTitle:`Delete Task`,dialogSave:`Save`,dialogCancel:`Cancel`,dialogDelete:`Delete`,dialogFieldName:`Name`,dialogFieldStartDate:`Start Date`,dialogFieldEndDate:`End Date`,dialogFieldStatus:`Status`,dialogFieldMilestone:`Is Milestone`,dialogFieldParent:`Parent Task`,dialogFieldParentNone:`— None —`,dialogDeleteConfirm:`Delete task "{name}"?`,dialogFieldDependencies:`Predecessors`,dialogFieldDependenciesNone:`— None —`,scrollToTodayTooltip:`Scroll to today`,expandAllTooltip:`Expand all`,collapseAllTooltip:`Collapse all`,resetViewTooltip:`Reset view`,columnActions:`Actions`,columnAssignee:`Assignee`,exportCsvTooltip:`Export as CSV`,addTaskTooltip:`Add task`,editTaskTooltip:`Edit task`,deleteTaskTooltip:`Delete task`},$=[{id:`project`,name:`E-Commerce Platform v2.0`,status:`in-progress`,startDate:new Date(`2026-03-01`),endDate:new Date(`2026-06-30`)},{id:`release-1`,parentId:`project`,name:`Release 1 — Backend API`,status:`in-progress`,startDate:new Date(`2026-03-01`),endDate:new Date(`2026-04-30`)},{id:`r1-team-alpha`,parentId:`release-1`,name:`Team Alpha`,status:`done`,startDate:new Date(`2026-03-01`),endDate:new Date(`2026-03-31`)},{id:`r1-alpha-sprint-1`,parentId:`r1-team-alpha`,name:`Sprint 1 — Auth Service`,status:`done`,startDate:new Date(`2026-03-01`),endDate:new Date(`2026-03-15`)},{id:`r1-alpha-sprint-2`,parentId:`r1-team-alpha`,name:`Sprint 2 — Product API`,status:`done`,startDate:new Date(`2026-03-16`),endDate:new Date(`2026-03-31`)},{id:`r1-team-beta`,parentId:`release-1`,name:`Team Beta`,status:`in-progress`,startDate:new Date(`2026-04-01`),endDate:new Date(`2026-04-30`)},{id:`r1-beta-sprint-1`,parentId:`r1-team-beta`,name:`Sprint 1 — Order Service`,status:`done`,startDate:new Date(`2026-04-01`),endDate:new Date(`2026-04-15`)},{id:`r1-beta-sprint-2`,parentId:`r1-team-beta`,name:`Sprint 2 — Payment Integration`,status:`in-progress`,startDate:new Date(`2026-04-16`),endDate:new Date(`2026-04-30`)},{id:`release-2`,parentId:`project`,name:`Release 2 — Frontend`,status:`planned`,startDate:new Date(`2026-05-01`),endDate:new Date(`2026-06-30`),dependencies:[`release-1`]},{id:`r2-team-alpha`,parentId:`release-2`,name:`Team Alpha`,status:`planned`,startDate:new Date(`2026-05-01`),endDate:new Date(`2026-05-31`)},{id:`r2-alpha-sprint-1`,parentId:`r2-team-alpha`,name:`Sprint 1 — Component Library`,status:`planned`,startDate:new Date(`2026-05-01`),endDate:new Date(`2026-05-15`)},{id:`r2-alpha-sprint-2`,parentId:`r2-team-alpha`,name:`Sprint 2 — Product Catalog UI`,status:`planned`,startDate:new Date(`2026-05-16`),endDate:new Date(`2026-05-31`)},{id:`r2-team-beta`,parentId:`release-2`,name:`Team Beta`,status:`planned`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-06-30`)},{id:`r2-beta-sprint-1`,parentId:`r2-team-beta`,name:`Sprint 1 — Checkout Flow`,status:`planned`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-06-15`)},{id:`r2-beta-sprint-2`,parentId:`r2-team-beta`,name:`Sprint 2 — Testing & QA`,status:`planned`,startDate:new Date(`2026-06-16`),endDate:new Date(`2026-06-30`)},{id:`milestone-go-live`,parentId:`project`,name:`Go-Live`,status:`planned`,startDate:new Date(`2026-06-30`),endDate:new Date(`2026-06-30`),isMilestone:!0,dependencies:[`release-2`]}],Pn={title:`Components/GanttChart`,component:q,args:{cascadeDependencies:!0,draggable:!0,enableBuiltinDialogs:!0,height:500,initialExpandAll:!0,inlineEdit:!0,maxPanelWidth:600,minPanelWidth:200,progressDraggable:!0,resizable:!0,showAssigneeColumn:!1,showCriticalPath:!1,showToolbar:!0,timeScale:`months`,virtualizeRows:!1,width:`auto`,zoomable:!0,onAddTask:Q(),onDeleteTask:Q(),onEditTask:Q(),onMilestoneClick:Q(),onStatusChange:Q(),onTaskClick:Q(),onTaskCreated:Q(),onTaskDeleted:Q(),onTaskMoved:Q(),onTaskResized:Q(),onTasksChange:Q(),onTaskUpdated:Q()},argTypes:{cascadeDependencies:{control:`boolean`},defaultRangeEnd:{control:!1},defaultRangeStart:{control:!1},draggable:{control:`boolean`},enableBuiltinDialogs:{control:`boolean`},ganttTheme:{control:!1},holidays:{control:!1},height:{control:`text`},initialExpandAll:{control:`boolean`},inlineEdit:{control:`boolean`},maxPanelWidth:{control:`number`},minPanelWidth:{control:`number`},progressDraggable:{control:`boolean`},resizable:{control:`boolean`},showAssigneeColumn:{control:`boolean`},showCriticalPath:{control:`boolean`},showToolbar:{control:`boolean`},statusColors:{control:!1},tasks:{control:!1},timeScale:{control:`radio`,options:[`days`,`weeks`,`months`,`quarters`]},toolbarConfig:{control:!1},translations:{control:!1},virtualizeRows:{control:`boolean`},width:{control:`text`},workdays:{control:!1},zoomable:{control:`boolean`},onAddTask:{control:!1},onDeleteTask:{control:!1},onEditTask:{control:!1},onExportCSV:{control:!1},onMilestoneClick:{control:!1},onStatusChange:{control:!1},onTaskClick:{control:!1},onTaskCreated:{control:!1},onTaskDeleted:{control:!1},onTaskMoved:{control:!1},onTaskResized:{control:!1},onTasksChange:{control:!1},onTaskUpdated:{control:!1}},parameters:{controls:{sort:`alpha`}}},Fn={args:{tasks:$,timeScale:`months`,enableBuiltinDialogs:!0},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},In={args:{tasks:$,timeScale:`weeks`},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Ln={args:{tasks:$,timeScale:`quarters`},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Rn={args:{tasks:$,timeScale:`days`},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},zn={args:{tasks:$,timeScale:`months`,initialExpandAll:!0,height:700,enableBuiltinDialogs:!0},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Bn=[{id:`design`,name:`Design`,status:`done`,startDate:new Date(`2026-01-01`),endDate:new Date(`2026-01-31`)},{id:`research`,name:`Research`,status:`done`,startDate:new Date(`2026-01-01`),endDate:new Date(`2026-02-15`)},{id:`dev`,name:`Development`,status:`in-progress`,startDate:new Date(`2026-02-01`),endDate:new Date(`2026-03-31`),dependencies:[`design`]},{id:`docs`,name:`Documentation`,status:`planned`,startDate:new Date(`2026-02-15`),endDate:new Date(`2026-03-15`),dependencies:[`design`]},{id:`testing`,name:`Testing`,status:`planned`,startDate:new Date(`2026-04-01`),endDate:new Date(`2026-04-30`),dependencies:[`dev`,`research`]},{id:`release`,name:`Release`,status:`planned`,startDate:new Date(`2026-05-01`),endDate:new Date(`2026-05-15`),dependencies:[`testing`,`docs`]},{id:`go-live`,name:`Go-Live`,status:`planned`,startDate:new Date(`2026-05-15`),endDate:new Date(`2026-05-15`),isMilestone:!0,dependencies:[`release`]}],Vn={args:{tasks:Bn,timeScale:`months`,height:400},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Hn={args:{tasks:$,timeScale:`months`,defaultRangeStart:new Date(`2026-01-01`),defaultRangeEnd:new Date(`2026-12-31`)},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Un={args:{tasks:$,timeScale:`months`,translations:Nn,enableBuiltinDialogs:!0},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Wn={args:{tasks:$,timeScale:`months`,showToolbar:!1},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Gn={args:{tasks:$.filter(e=>!e.parentId||e.parentId===`project`),timeScale:`months`,height:300},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:700,height:e.height},children:(0,Z.jsx)(q,{...e})})},Kn=[{id:`project`,name:`E-Commerce Platform v2.0`,status:`in-progress`,startDate:new Date(`2026-01-01`),endDate:new Date(`2026-12-31`),progress:45},{id:`phase-1`,parentId:`project`,name:`Phase 1 — Backend`,status:`done`,startDate:new Date(`2026-01-01`),endDate:new Date(`2026-03-31`),progress:100},{id:`phase-2`,parentId:`project`,name:`Phase 2 — Frontend`,status:`in-progress`,startDate:new Date(`2026-04-01`),endDate:new Date(`2026-07-31`),progress:60},{id:`phase-3`,parentId:`project`,name:`Phase 3 — QA & Release`,status:`planned`,startDate:new Date(`2026-08-01`),endDate:new Date(`2026-11-30`),progress:0},{id:`go-live`,parentId:`project`,name:`Go-Live`,status:`planned`,startDate:new Date(`2026-12-01`),endDate:new Date(`2026-12-01`),isMilestone:!0}],qn={args:{tasks:Kn,timeScale:`months`,initialExpandAll:!0,height:400},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Jn={args:{tasks:$,timeScale:`months`,enableBuiltinDialogs:!0},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Yn={parameters:{docs:{description:{story:"The built-in edit dialog exposes a **Progress slider (0–100 %)** since v3.16.0. Click the edit icon on any row to open the dialog — the slider is pre-filled with the task's current `progress` value. The slider is automatically disabled for milestone tasks (which have no progress bar). Non-mouse users can Tab to the slider and adjust it with arrow keys."}}},args:{tasks:Kn,timeScale:`months`,initialExpandAll:!0,enableBuiltinDialogs:!0,height:400},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Xn={parameters:{docs:{description:{story:'Demonstrates two timeline navigation features:\n\n**Ctrl+Scroll zoom** (`zoomable`): Hold `Ctrl` (Windows/Linux) or `Cmd` (macOS) and scroll with the mouse wheel inside the timeline to cycle through zoom levels — `days` → `weeks` → `months` → `quarters` and back.\n\n**Today chip**: The small labeled chip at the top of the dashed today line. Its label is configurable via `translations.todayLabel` (default: `"Heute"`, English: `"Today"`). Set `todayLabel: ""` to hide it. Hover the chip for a tooltip with the full localized date.'}}},args:{tasks:$,timeScale:`months`,zoomable:!0,enableBuiltinDialogs:!0,height:500,translations:Nn},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Zn={parameters:{docs:{description:{story:"**Keyboard-accessible task panel** — no prop needed, always on.\n\nClick anywhere in the task panel (left pane) to focus it, then:\n\n- `↑` / `↓` — move row selection\n- `Enter` — open the edit dialog for the selected row\n- `Escape` — deselect\n\nThe selected row is highlighted with the theme's `action.selected` background and a 3 px primary-colour left border. The panel auto-scrolls to keep the selection in view. Clicking a row with the mouse also sets it as the keyboard anchor. `aria-selected` is reflected on every row for assistive technologies."}}},args:{tasks:$,timeScale:`months`,enableBuiltinDialogs:!0,initialExpandAll:!0,height:420,translations:Nn},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},Qn={parameters:{docs:{description:{story:"**Drag** (`draggable`): Grab any task bar and drag it horizontally to shift its start and end date in sync. A tooltip shows the current dates while dragging.\n\n**Resize** (`resizable`): Drag the right edge of a bar to extend or shorten the end date. A tooltip shows the new end date while dragging.\n\nBoth interactions fire the `onTaskMoved` / `onTaskResized` callbacks and update the task list via `onTasksChange`. Use `cascadeDependencies` (default: `true`) to automatically shift all downstream tasks when a predecessor moves."}}},args:{tasks:$,timeScale:`months`,draggable:!0,resizable:!0,initialExpandAll:!0,enableBuiltinDialogs:!0,height:600,onTaskMoved:Q(),onTaskResized:Q(),onTasksChange:Q()},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:1100,height:e.height},children:(0,Z.jsx)(q,{...e})})},$n=Mn(),er={args:{tasks:$,timeScale:`months`,initialExpandAll:!0,height:500,enableBuiltinDialogs:!0,showCriticalPath:!0,ganttTheme:{statusColors:{planned:`#7c3aed`,"in-progress":`#0ea5e9`,done:`#16a34a`,blocked:`#dc2626`},criticalPathColor:`#ff6b35`,milestoneColor:`#7c3aed`,todayLineColor:`#ff6b35`,weekendColor:`rgba(124, 58, 237, 0.06)`,barBorderRadius:8}},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},tr=$.map((e,t)=>({...e,color:t%5==0?`#e11d48`:t%5==1?`#0891b2`:t%5==2?`#16a34a`:t%5==3?`#d97706`:void 0})),nr={args:{tasks:tr,timeScale:`months`,initialExpandAll:!0,height:500},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},rr={parameters:{docs:{description:{story:"`showCriticalPath` highlights the **longest dependency chain** in the project — the sequence of tasks that directly determines the earliest possible finish date. Critical tasks and their dependency arrows are rendered in `ganttTheme.criticalPathColor` (default: MUI `error.main`). Hover a task bar to see its status."}}},args:{tasks:Bn,timeScale:`months`,showCriticalPath:!0,initialExpandAll:!0,height:450},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:900,height:e.height},children:(0,Z.jsx)(q,{...e})})},ir={parameters:{docs:{description:{story:`Two interactive editing features in one story:

**Progress drag** (\`progressDraggable\`): Drag the small triangular handle on the right side of a task bar to adjust the progress percentage (0–100 %) directly in the timeline. The semi-transparent overlay expands as you drag right.

**Inline edit** (\`inlineEdit\`): **Double-click a task name** in the left panel to edit it in-place. Press Enter or click outside to confirm, Escape to cancel.`}}},args:{tasks:$,timeScale:`months`,draggable:!0,progressDraggable:!0,inlineEdit:!0,initialExpandAll:!0,height:550,enableBuiltinDialogs:!0,onTaskMoved:Q(),onTasksChange:Q()},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,maxWidth:1100,height:e.height},children:(0,Z.jsx)(q,{...e})})},ar={args:{tasks:$n,timeScale:`months`,initialExpandAll:!0,virtualizeRows:!0,height:600,enableBuiltinDialogs:!0},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`,height:e.height},children:(0,Z.jsx)(q,{...e})})},or=[{id:`proj`,name:`Website Relaunch`,status:`in-progress`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-08-31`),assignee:`Lisa Müller`},{id:`ux`,parentId:`proj`,name:`UX Design`,status:`done`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-06-30`),assignee:`Anna Schulz`},{id:`dev`,parentId:`proj`,name:`Development`,status:`in-progress`,startDate:new Date(`2026-07-01`),endDate:new Date(`2026-08-15`),assignee:`Marc Weber`},{id:`fe`,parentId:`dev`,name:`Frontend`,status:`in-progress`,startDate:new Date(`2026-07-01`),endDate:new Date(`2026-08-01`),assignee:`Marc Weber`},{id:`be`,parentId:`dev`,name:`Backend API`,status:`planned`,startDate:new Date(`2026-07-15`),endDate:new Date(`2026-08-15`),assignee:`Tim Fischer`},{id:`qa`,parentId:`proj`,name:`QA & Testing`,status:`planned`,startDate:new Date(`2026-08-01`),endDate:new Date(`2026-08-20`),assignee:`Sara Klein`},{id:`go`,parentId:`proj`,name:`Go Live`,status:`planned`,startDate:new Date(`2026-08-31`),endDate:new Date(`2026-08-31`),isMilestone:!0,assignee:`Lisa Müller`}],sr={parameters:{docs:{description:{story:"`showAssigneeColumn={true}` — shows an Assignee column in the task panel. Set `task.assignee` in the data to populate the column. The assignee field also appears in the Add/Edit dialog."}}},args:{tasks:or,showAssigneeColumn:!0,enableBuiltinDialogs:!0,initialExpandAll:!0,timeScale:`months`,height:400},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`},children:(0,Z.jsx)(q,{...e})})},cr={parameters:{docs:{description:{story:"`toolbarConfig={{ showExportCSV: true }}` — shows a Download button in the toolbar. Clicking it generates a CSV with all task fields (id, name, status, dates, assignee, etc.) and triggers a browser download as `gantt-tasks.csv`. Use `onExportCSV` to handle the CSV string yourself instead."}}},args:{tasks:or,showAssigneeColumn:!0,toolbarConfig:{showExportCSV:!0},initialExpandAll:!0,timeScale:`months`,height:400},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`},children:(0,Z.jsx)(q,{...e})})},lr={parameters:{docs:{description:{story:'`toolbarConfig={{ showAssigneeFilter: true }}` — adds a Select dropdown to the toolbar that filters visible tasks by assignee. The filter is ancestor-inclusive: selecting an assignee also shows parent tasks whose descendants match. Combine with `showAssigneeColumn={true}` to make assignees visible in the task panel. Selecting "Alle" (or the translated equivalent) resets the filter.'}}},args:{tasks:or,showAssigneeColumn:!0,toolbarConfig:{showAssigneeFilter:!0},initialExpandAll:!0,timeScale:`months`,height:420},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`},children:(0,Z.jsx)(q,{...e})})},ur=[{id:`house`,name:`Single-Family Home Build`,status:`in-progress`,startDate:new Date(`2026-02-01`),endDate:new Date(`2026-09-30`)},{id:`site`,parentId:`house`,name:`Site Preparation`,status:`done`,startDate:new Date(`2026-02-01`),endDate:new Date(`2026-02-21`)},{id:`site-clear`,parentId:`site`,name:`Clearing & Excavation`,status:`done`,startDate:new Date(`2026-02-01`),endDate:new Date(`2026-02-10`)},{id:`site-survey`,parentId:`site`,name:`Land Survey & Permits`,status:`done`,startDate:new Date(`2026-02-01`),endDate:new Date(`2026-02-14`)},{id:`foundation`,parentId:`house`,name:`Foundation`,status:`done`,startDate:new Date(`2026-02-22`),endDate:new Date(`2026-03-20`),dependencies:[`site`]},{id:`found-pour`,parentId:`foundation`,name:`Footings & Slab Pour`,status:`done`,startDate:new Date(`2026-02-22`),endDate:new Date(`2026-03-08`)},{id:`found-cure`,parentId:`foundation`,name:`Curing Period`,status:`done`,startDate:new Date(`2026-03-09`),endDate:new Date(`2026-03-20`)},{id:`framing`,parentId:`house`,name:`Framing`,status:`in-progress`,startDate:new Date(`2026-03-21`),endDate:new Date(`2026-05-15`),dependencies:[`foundation`]},{id:`frame-walls`,parentId:`framing`,name:`Wall Framing`,status:`done`,startDate:new Date(`2026-03-21`),endDate:new Date(`2026-04-15`)},{id:`frame-roof`,parentId:`framing`,name:`Roof Trusses`,status:`in-progress`,progress:60,startDate:new Date(`2026-04-16`),endDate:new Date(`2026-05-15`)},{id:`mep`,parentId:`house`,name:`Mechanical / Electrical / Plumbing`,status:`planned`,startDate:new Date(`2026-05-16`),endDate:new Date(`2026-07-10`),dependencies:[`framing`]},{id:`mep-electrical`,parentId:`mep`,name:`Electrical Rough-In`,status:`planned`,startDate:new Date(`2026-05-16`),endDate:new Date(`2026-06-05`)},{id:`mep-plumbing`,parentId:`mep`,name:`Plumbing Rough-In`,status:`planned`,startDate:new Date(`2026-05-16`),endDate:new Date(`2026-06-10`)},{id:`mep-hvac`,parentId:`mep`,name:`HVAC Install`,status:`planned`,startDate:new Date(`2026-06-11`),endDate:new Date(`2026-07-10`)},{id:`inspection-rough`,name:`Rough-In Inspection`,status:`planned`,isMilestone:!0,startDate:new Date(`2026-07-11`),endDate:new Date(`2026-07-11`),dependencies:[`mep`]},{id:`finishing`,parentId:`house`,name:`Interior Finishing`,status:`planned`,startDate:new Date(`2026-07-12`),endDate:new Date(`2026-09-15`),dependencies:[`inspection-rough`]},{id:`finish-drywall`,parentId:`finishing`,name:`Drywall & Paint`,status:`planned`,startDate:new Date(`2026-07-12`),endDate:new Date(`2026-08-05`)},{id:`finish-flooring`,parentId:`finishing`,name:`Flooring`,status:`planned`,startDate:new Date(`2026-08-06`),endDate:new Date(`2026-08-25`)},{id:`finish-fixtures`,parentId:`finishing`,name:`Fixtures & Cabinetry`,status:`planned`,startDate:new Date(`2026-08-26`),endDate:new Date(`2026-09-15`)},{id:`handover`,name:`Final Walkthrough & Handover`,status:`planned`,isMilestone:!0,startDate:new Date(`2026-09-30`),endDate:new Date(`2026-09-30`),dependencies:[`finishing`]}],dr={parameters:{docs:{description:{story:"**Real-world use case: a residential construction schedule.** Finish-to-start dependencies model the natural build sequence (foundation must cure before framing, framing before MEP, inspection before finishing) — try `CriticalPath` highlighting to see which phases directly threaten the handover date."}}},args:{tasks:ur,timeScale:`months`,initialExpandAll:!0,height:480},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`},children:(0,Z.jsx)(q,{...e})})},fr=[{id:`campaign`,name:`Q3 Product Launch Campaign`,status:`in-progress`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-08-15`)},{id:`strategy`,parentId:`campaign`,name:`Strategy & Positioning`,status:`done`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-06-12`)},{id:`strategy-research`,parentId:`strategy`,name:`Market Research`,status:`done`,startDate:new Date(`2026-06-01`),endDate:new Date(`2026-06-07`)},{id:`strategy-messaging`,parentId:`strategy`,name:`Messaging Framework`,status:`done`,startDate:new Date(`2026-06-08`),endDate:new Date(`2026-06-12`)},{id:`creative`,parentId:`campaign`,name:`Creative Production`,status:`in-progress`,startDate:new Date(`2026-06-13`),endDate:new Date(`2026-07-10`),dependencies:[`strategy`]},{id:`creative-copy`,parentId:`creative`,name:`Copywriting`,status:`done`,startDate:new Date(`2026-06-13`),endDate:new Date(`2026-06-22`)},{id:`creative-design`,parentId:`creative`,name:`Visual Design`,status:`in-progress`,progress:70,startDate:new Date(`2026-06-20`),endDate:new Date(`2026-07-05`)},{id:`creative-video`,parentId:`creative`,name:`Launch Video`,status:`in-progress`,progress:35,startDate:new Date(`2026-06-25`),endDate:new Date(`2026-07-10`)},{id:`channels`,parentId:`campaign`,name:`Channel Setup`,status:`planned`,startDate:new Date(`2026-07-06`),endDate:new Date(`2026-07-25`),dependencies:[`creative-copy`]},{id:`channels-paid`,parentId:`channels`,name:`Paid Ads (Google/Meta)`,status:`planned`,startDate:new Date(`2026-07-06`),endDate:new Date(`2026-07-18`)},{id:`channels-email`,parentId:`channels`,name:`Email Sequence`,status:`planned`,startDate:new Date(`2026-07-06`),endDate:new Date(`2026-07-15`)},{id:`channels-social`,parentId:`channels`,name:`Social Media Calendar`,status:`planned`,startDate:new Date(`2026-07-10`),endDate:new Date(`2026-07-25`)},{id:`launch-day`,name:`Launch Day`,status:`planned`,isMilestone:!0,startDate:new Date(`2026-07-28`),endDate:new Date(`2026-07-28`),dependencies:[`channels`]},{id:`post-launch`,parentId:`campaign`,name:`Post-Launch Optimization`,status:`planned`,startDate:new Date(`2026-07-29`),endDate:new Date(`2026-08-15`),dependencies:[`launch-day`]},{id:`post-monitor`,parentId:`post-launch`,name:`Performance Monitoring`,status:`planned`,startDate:new Date(`2026-07-29`),endDate:new Date(`2026-08-08`)},{id:`post-retro`,parentId:`post-launch`,name:`Campaign Retrospective`,status:`planned`,startDate:new Date(`2026-08-09`),endDate:new Date(`2026-08-15`)}],pr={parameters:{docs:{description:{story:`**Real-world use case: a marketing campaign timeline** — strategy, creative production, channel setup, and a launch-day milestone. Note the overlapping creative sub-tasks (copy can finish while design and video are still in progress) — a common real-world pattern this chart handles natively.`}}},args:{tasks:fr,timeScale:`weeks`,initialExpandAll:!0,height:480},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`},children:(0,Z.jsx)(q,{...e})})},mr=[new Date(`2025-12-24`),new Date(`2025-12-25`),new Date(`2025-12-26`),new Date(`2026-01-01`),new Date(`2026-01-06`)],hr=[{id:`sprint-a`,name:`Sprint A — Feature Development`,status:`in-progress`,startDate:new Date(`2025-12-08`),endDate:new Date(`2025-12-19`),progress:60},{id:`sprint-b`,name:`Sprint B — Integration & Tests`,status:`planned`,startDate:new Date(`2025-12-22`),endDate:new Date(`2026-01-09`),dependencies:[`sprint-a`]},{id:`sprint-c`,name:`Sprint C — Hardening`,status:`planned`,startDate:new Date(`2026-01-12`),endDate:new Date(`2026-01-23`),dependencies:[`sprint-b`]},{id:`release`,name:`Release 1.0`,status:`planned`,isMilestone:!0,startDate:new Date(`2026-01-26`),endDate:new Date(`2026-01-26`),dependencies:[`sprint-c`]}],gr={parameters:{docs:{description:{story:"**Working days & public holidays** — `workdays={[1,2,3,4,5]}` (Mon–Fri) + `holidays` for German Christmas holidays and New Year 2025/26. In the day scale, **weekends appear grey** and **public holidays appear amber** with an orange underline in the header. Drag & drop and resize automatically snap to the nearest working day; with `cascadeDependencies` enabled, successor tasks also advance to the next working day."}}},args:{tasks:hr,workdays:[1,2,3,4,5],holidays:mr,timeScale:`days`,draggable:!0,resizable:!0,cascadeDependencies:!0,initialExpandAll:!0,height:320,defaultRangeStart:new Date(`2025-12-01`),defaultRangeEnd:new Date(`2026-02-28`),translations:Nn,ganttTheme:{holidayColor:`rgba(255, 152, 0, 0.22)`}},render:e=>(0,Z.jsx)(c,{sx:{width:`100%`},children:(0,Z.jsx)(q,{...e})})},Fn.parameters={...Fn.parameters,docs:{...Fn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    enableBuiltinDialogs: true
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Fn.parameters?.docs?.source}}},In.parameters={...In.parameters,docs:{...In.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "weeks"
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...In.parameters?.docs?.source}}},Ln.parameters={...Ln.parameters,docs:{...Ln.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "quarters"
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Ln.parameters?.docs?.source}}},Rn.parameters={...Rn.parameters,docs:{...Rn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "days"
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Rn.parameters?.docs?.source}}},zn.parameters={...zn.parameters,docs:{...zn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 700,
    enableBuiltinDialogs: true
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...zn.parameters?.docs?.source}}},Vn.parameters={...Vn.parameters,docs:{...Vn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: dependencyTasks,
    timeScale: "months",
    height: 400
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Vn.parameters?.docs?.source}}},Hn.parameters={...Hn.parameters,docs:{...Hn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    defaultRangeStart: new Date("2026-01-01"),
    defaultRangeEnd: new Date("2026-12-31")
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Hn.parameters?.docs?.source}}},Un.parameters={...Un.parameters,docs:{...Un.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    translations: EN_TRANSLATIONS,
    enableBuiltinDialogs: true
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Un.parameters?.docs?.source}}},Wn.parameters={...Wn.parameters,docs:{...Wn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    showToolbar: false
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Wn.parameters?.docs?.source}}},Gn.parameters={...Gn.parameters,docs:{...Gn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks.filter(t => !t.parentId || t.parentId === "project"),
    timeScale: "months",
    height: 300
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 700,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Gn.parameters?.docs?.source}}},qn.parameters={...qn.parameters,docs:{...qn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: progressTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 400
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...qn.parameters?.docs?.source}}},Jn.parameters={...Jn.parameters,docs:{...Jn.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    enableBuiltinDialogs: true
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Jn.parameters?.docs?.source}}},Yn.parameters={...Yn.parameters,docs:{...Yn.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "The built-in edit dialog exposes a **Progress slider (0–100 %)** since v3.16.0. " + "Click the edit icon on any row to open the dialog — the slider is pre-filled with " + "the task's current \`progress\` value. The slider is automatically disabled for " + "milestone tasks (which have no progress bar). " + "Non-mouse users can Tab to the slider and adjust it with arrow keys."
      }
    }
  },
  args: {
    tasks: progressTasks,
    timeScale: "months",
    initialExpandAll: true,
    enableBuiltinDialogs: true,
    height: 400
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Yn.parameters?.docs?.source}}},Xn.parameters={...Xn.parameters,docs:{...Xn.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates two timeline navigation features:\\n\\n' + '**Ctrl+Scroll zoom** (\`zoomable\`): Hold \`Ctrl\` (Windows/Linux) or \`Cmd\` (macOS) and scroll ' + 'with the mouse wheel inside the timeline to cycle through zoom levels — ' + '\`days\` → \`weeks\` → \`months\` → \`quarters\` and back.\\n\\n' + '**Today chip**: The small labeled chip at the top of the dashed today line. ' + 'Its label is configurable via \`translations.todayLabel\` (default: \`"Heute"\`, English: \`"Today"\`). ' + 'Set \`todayLabel: ""\` to hide it. Hover the chip for a tooltip with the full localized date.'
      }
    }
  },
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    zoomable: true,
    enableBuiltinDialogs: true,
    height: 500,
    translations: EN_TRANSLATIONS
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Xn.parameters?.docs?.source}}},Zn.parameters={...Zn.parameters,docs:{...Zn.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Keyboard-accessible task panel** — no prop needed, always on.\\n\\n' + 'Click anywhere in the task panel (left pane) to focus it, then:\\n\\n' + '- \`↑\` / \`↓\` — move row selection\\n' + '- \`Enter\` — open the edit dialog for the selected row\\n' + '- \`Escape\` — deselect\\n\\n' + 'The selected row is highlighted with the theme\\'s \`action.selected\` background and a ' + '3 px primary-colour left border. The panel auto-scrolls to keep the selection in view. ' + 'Clicking a row with the mouse also sets it as the keyboard anchor. ' + '\`aria-selected\` is reflected on every row for assistive technologies.'
      }
    }
  },
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    enableBuiltinDialogs: true,
    initialExpandAll: true,
    height: 420,
    translations: EN_TRANSLATIONS
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Zn.parameters?.docs?.source}}},Qn.parameters={...Qn.parameters,docs:{...Qn.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Drag** (\`draggable\`): Grab any task bar and drag it horizontally to shift its start and end date in sync. ' + 'A tooltip shows the current dates while dragging.\\n\\n' + '**Resize** (\`resizable\`): Drag the right edge of a bar to extend or shorten the end date. ' + 'A tooltip shows the new end date while dragging.\\n\\n' + 'Both interactions fire the \`onTaskMoved\` / \`onTaskResized\` callbacks and update the task list ' + 'via \`onTasksChange\`. Use \`cascadeDependencies\` (default: \`true\`) to automatically shift all ' + 'downstream tasks when a predecessor moves.'
      }
    }
  },
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    draggable: true,
    resizable: true,
    initialExpandAll: true,
    enableBuiltinDialogs: true,
    height: 600,
    onTaskMoved: fn(),
    onTaskResized: fn(),
    onTasksChange: fn()
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 1100,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...Qn.parameters?.docs?.source}}},er.parameters={...er.parameters,docs:{...er.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 500,
    enableBuiltinDialogs: true,
    showCriticalPath: true,
    ganttTheme: {
      statusColors: {
        planned: "#7c3aed",
        "in-progress": "#0ea5e9",
        done: "#16a34a",
        blocked: "#dc2626"
      },
      criticalPathColor: "#ff6b35",
      milestoneColor: "#7c3aed",
      todayLineColor: "#ff6b35",
      weekendColor: "rgba(124, 58, 237, 0.06)",
      barBorderRadius: 8
    }
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...er.parameters?.docs?.source}}},nr.parameters={...nr.parameters,docs:{...nr.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: coloredTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 500
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...nr.parameters?.docs?.source}}},rr.parameters={...rr.parameters,docs:{...rr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showCriticalPath\` highlights the **longest dependency chain** in the project — ' + 'the sequence of tasks that directly determines the earliest possible finish date. ' + 'Critical tasks and their dependency arrows are rendered in \`ganttTheme.criticalPathColor\` ' + '(default: MUI \`error.main\`). Hover a task bar to see its status.'
      }
    }
  },
  args: {
    tasks: dependencyTasks,
    timeScale: "months",
    showCriticalPath: true,
    initialExpandAll: true,
    height: 450
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 900,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...rr.parameters?.docs?.source}}},ir.parameters={...ir.parameters,docs:{...ir.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Two interactive editing features in one story:\\n\\n' + '**Progress drag** (\`progressDraggable\`): Drag the small triangular handle on the right side ' + 'of a task bar to adjust the progress percentage (0–100 %) directly in the timeline. ' + 'The semi-transparent overlay expands as you drag right.\\n\\n' + '**Inline edit** (\`inlineEdit\`): **Double-click a task name** in the left panel to edit it ' + 'in-place. Press Enter or click outside to confirm, Escape to cancel.'
      }
    }
  },
  args: {
    tasks: sampleTasks,
    timeScale: "months",
    draggable: true,
    progressDraggable: true,
    inlineEdit: true,
    initialExpandAll: true,
    height: 550,
    enableBuiltinDialogs: true,
    onTaskMoved: fn(),
    onTasksChange: fn()
  },
  render: args => <Box sx={{
    width: "100%",
    maxWidth: 1100,
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...ir.parameters?.docs?.source}}},ar.parameters={...ar.parameters,docs:{...ar.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: largeTasks,
    timeScale: "months",
    initialExpandAll: true,
    virtualizeRows: true,
    height: 600,
    enableBuiltinDialogs: true
  },
  render: args => <Box sx={{
    width: "100%",
    height: args.height
  }}>
      <GanttChart {...args} />
    </Box>
}`,...ar.parameters?.docs?.source}}},sr.parameters={...sr.parameters,docs:{...sr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`showAssigneeColumn={true}\` — shows an Assignee column in the task panel. ' + 'Set \`task.assignee\` in the data to populate the column. ' + 'The assignee field also appears in the Add/Edit dialog.'
      }
    }
  },
  args: {
    tasks: assigneeTasks,
    showAssigneeColumn: true,
    enableBuiltinDialogs: true,
    initialExpandAll: true,
    timeScale: "months",
    height: 400
  },
  render: args => <Box sx={{
    width: "100%"
  }}>
      <GanttChart {...args} />
    </Box>
}`,...sr.parameters?.docs?.source}}},cr.parameters={...cr.parameters,docs:{...cr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`toolbarConfig={{ showExportCSV: true }}\` — shows a Download button in the toolbar. ' + 'Clicking it generates a CSV with all task fields (id, name, status, dates, assignee, etc.) ' + 'and triggers a browser download as \`gantt-tasks.csv\`. ' + 'Use \`onExportCSV\` to handle the CSV string yourself instead.'
      }
    }
  },
  args: {
    tasks: assigneeTasks,
    showAssigneeColumn: true,
    toolbarConfig: {
      showExportCSV: true
    },
    initialExpandAll: true,
    timeScale: "months",
    height: 400
  },
  render: args => <Box sx={{
    width: "100%"
  }}>
      <GanttChart {...args} />
    </Box>
}`,...cr.parameters?.docs?.source}}},lr.parameters={...lr.parameters,docs:{...lr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '\`toolbarConfig={{ showAssigneeFilter: true }}\` — adds a Select dropdown to the toolbar ' + 'that filters visible tasks by assignee. The filter is ancestor-inclusive: selecting an assignee ' + 'also shows parent tasks whose descendants match. Combine with \`showAssigneeColumn={true}\` to make ' + 'assignees visible in the task panel. Selecting "Alle" (or the translated equivalent) resets the filter.'
      }
    }
  },
  args: {
    tasks: assigneeTasks,
    showAssigneeColumn: true,
    toolbarConfig: {
      showAssigneeFilter: true
    },
    initialExpandAll: true,
    timeScale: "months",
    height: 420
  },
  render: args => <Box sx={{
    width: "100%"
  }}>
      <GanttChart {...args} />
    </Box>
}`,...lr.parameters?.docs?.source}}},dr.parameters={...dr.parameters,docs:{...dr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a residential construction schedule.** ' + 'Finish-to-start dependencies model the natural build sequence (foundation must cure before framing, ' + 'framing before MEP, inspection before finishing) — try \`CriticalPath\` highlighting to see which phases ' + 'directly threaten the handover date.'
      }
    }
  },
  args: {
    tasks: constructionTasks,
    timeScale: "months",
    initialExpandAll: true,
    height: 480
  },
  render: args => <Box sx={{
    width: "100%"
  }}>
      <GanttChart {...args} />
    </Box>
}`,...dr.parameters?.docs?.source}}},pr.parameters={...pr.parameters,docs:{...pr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Real-world use case: a marketing campaign timeline** — strategy, creative production, channel setup, ' + 'and a launch-day milestone. Note the overlapping creative sub-tasks (copy can finish while design and ' + 'video are still in progress) — a common real-world pattern this chart handles natively.'
      }
    }
  },
  args: {
    tasks: campaignTasks,
    timeScale: "weeks",
    initialExpandAll: true,
    height: 480
  },
  render: args => <Box sx={{
    width: "100%"
  }}>
      <GanttChart {...args} />
    </Box>
}`,...pr.parameters?.docs?.source}}},gr.parameters={...gr.parameters,docs:{...gr.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Working days & public holidays** — \`workdays={[1,2,3,4,5]}\` (Mon–Fri) + \`holidays\` for ' + 'German Christmas holidays and New Year 2025/26. In the day scale, **weekends appear grey** ' + 'and **public holidays appear amber** with an orange underline in the header. ' + 'Drag & drop and resize automatically snap to the nearest working day; with ' + '\`cascadeDependencies\` enabled, successor tasks also advance to the next working day.'
      }
    }
  },
  args: {
    tasks: workdaysTasks,
    workdays: [1, 2, 3, 4, 5],
    holidays: DE_HOLIDAYS_2025,
    timeScale: "days",
    draggable: true,
    resizable: true,
    cascadeDependencies: true,
    initialExpandAll: true,
    height: 320,
    defaultRangeStart: new Date("2025-12-01"),
    defaultRangeEnd: new Date("2026-02-28"),
    translations: EN_TRANSLATIONS,
    // holidayColor wird über ganttTheme etwas kräftiger gesetzt damit der
    // visuelle Unterschied zu Wochenenden (grau) auf Anhieb erkennbar ist.
    ganttTheme: {
      holidayColor: "rgba(255, 152, 0, 0.22)"
    }
  },
  render: args => <Box sx={{
    width: "100%"
  }}>
      <GanttChart {...args} />
    </Box>
}`,...gr.parameters?.docs?.source}}},_r=`Default.WeeksScale.QuartersScale.DaysScale.FullyExpanded.WithDependencies.CustomDateRange.EnglishTranslations.NoToolbar.MinimalFlat.WithProgress.WithBuiltinDialogs.WithProgressDialogField.ZoomAndToday.KeyboardNavigation.DragAndResize.CustomGanttTheme.PerTaskColor.CriticalPath.WithProgressAndInlineEdit.LargeDataset.WithAssigneeColumn.WithCSVExport.WithAssigneeFilter.ConstructionProject.MarketingCampaignLaunch.WorkingDays`.split(`.`)}))();export{dr as ConstructionProject,rr as CriticalPath,Hn as CustomDateRange,er as CustomGanttTheme,Rn as DaysScale,Fn as Default,Qn as DragAndResize,Un as EnglishTranslations,zn as FullyExpanded,Zn as KeyboardNavigation,ar as LargeDataset,pr as MarketingCampaignLaunch,Gn as MinimalFlat,Wn as NoToolbar,nr as PerTaskColor,Ln as QuartersScale,In as WeeksScale,sr as WithAssigneeColumn,lr as WithAssigneeFilter,Jn as WithBuiltinDialogs,cr as WithCSVExport,Vn as WithDependencies,qn as WithProgress,ir as WithProgressAndInlineEdit,Yn as WithProgressDialogField,gr as WorkingDays,Xn as ZoomAndToday,_r as __namedExportsOrder,Pn as default};