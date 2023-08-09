"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[846],{7846:function(e,t,n){n.d(t,{Z:function(){return Re}});var r=n(4942),o=n(9439),a=n(3433),i=n(1694),l=n.n(i),c=n(8568),s=n(2791),u=n(9464),d=n(1940);function f(e){var t=s.useState(e),n=(0,o.Z)(t,2),r=n[0],a=n[1];return s.useEffect((function(){var t=setTimeout((function(){a(e)}),e.length?0:10);return function(){clearTimeout(t)}}),[e]),r}var m=n(7521),p=n(278),g=n(6753),h=n(5564),v=n(9922),b=function(e){var t,n=e.componentCls,o="".concat(n,"-show-help"),a="".concat(n,"-show-help-item");return(0,r.Z)({},o,(0,r.Z)({transition:"opacity ".concat(e.motionDurationSlow," ").concat(e.motionEaseInOut),"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}}},a,(t={overflow:"hidden",transition:"height ".concat(e.motionDurationSlow," ").concat(e.motionEaseInOut,",\n                     opacity ").concat(e.motionDurationSlow," ").concat(e.motionEaseInOut,",\n                     transform ").concat(e.motionDurationSlow," ").concat(e.motionEaseInOut," !important")},(0,r.Z)(t,"&".concat(a,"-appear, &").concat(a,"-enter"),(0,r.Z)({transform:"translateY(-5px)",opacity:0},"&-active",{transform:"translateY(0)",opacity:1})),(0,r.Z)(t,"&".concat(a,"-leave-active"),{transform:"translateY(-5px)"}),t)))},y=function(e,t){var n,o=e.formItemCls;return(0,r.Z)({},o,(n={},(0,r.Z)(n,"".concat(o,"-label > label"),{height:t}),(0,r.Z)(n,"".concat(o,"-control-input"),{minHeight:t}),n))},Z=function(e){var t,n=e.componentCls;return(0,r.Z)({},e.componentCls,Object.assign(Object.assign(Object.assign({},(0,m.Wf)(e)),function(e){var t;return t={legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorBorder)},label:{fontSize:e.fontSize},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"}},(0,r.Z)(t,"input[type='file']:focus,\n  input[type='radio']:focus,\n  input[type='checkbox']:focus",{outline:0,boxShadow:"0 0 0 ".concat(e.controlOutlineWidth,"px ").concat(e.controlOutline)}),(0,r.Z)(t,"output",{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}),t}(e)),(t={},(0,r.Z)(t,"".concat(n,"-text"),{display:"inline-block",paddingInlineEnd:e.paddingSM}),(0,r.Z)(t,"&-small",Object.assign({},y(e,e.controlHeightSM))),(0,r.Z)(t,"&-large",Object.assign({},y(e,e.controlHeightLG))),t)))},x=function(e){var t,n,o,a=e.formItemCls,i=e.iconCls,l=e.componentCls,c=e.rootPrefixCls;return(0,r.Z)({},a,Object.assign(Object.assign({},(0,m.Wf)(e)),(o={marginBottom:e.marginLG,verticalAlign:"top","&-with-help":{transition:"none"}},(0,r.Z)(o,"&-hidden,\n        &-hidden.".concat(c,"-row"),{display:"none"}),(0,r.Z)(o,"&-has-warning",(0,r.Z)({},"".concat(a,"-split"),{color:e.colorError})),(0,r.Z)(o,"&-has-error",(0,r.Z)({},"".concat(a,"-split"),{color:e.colorWarning})),(0,r.Z)(o,"".concat(a,"-label"),{display:"inline-block",flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:"".concat(e.lineHeight," - 0.25em"),whiteSpace:"unset"},"> label":(t={position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:e.controlHeight,color:e.colorTextHeading,fontSize:e.fontSize},(0,r.Z)(t,"> ".concat(i),{fontSize:e.fontSize,verticalAlign:"top"}),(0,r.Z)(t,"&".concat(a,"-required:not(").concat(a,"-required-mark-optional)::before"),(0,r.Z)({display:"inline-block",marginInlineEnd:e.marginXXS,color:e.colorError,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"'},"".concat(l,"-hide-required-mark &"),{display:"none"})),(0,r.Z)(t,"".concat(a,"-optional"),(0,r.Z)({display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription},"".concat(l,"-hide-required-mark &"),{display:"none"})),(0,r.Z)(t,"".concat(a,"-tooltip"),{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS}),(0,r.Z)(t,"&::after",{content:'":"',position:"relative",marginBlock:0,marginInlineStart:e.marginXXS/2,marginInlineEnd:e.marginXS}),(0,r.Z)(t,"&".concat(a,"-no-colon::after"),{content:'"\\a0"'}),t)}),(0,r.Z)(o,"".concat(a,"-control"),(n={display:"flex",flexDirection:"column",flexGrow:1},(0,r.Z)(n,"&:first-child:not([class^=\"'".concat(c,"-col-'\"]):not([class*=\"' ").concat(c,"-col-'\"])"),{width:"100%"}),(0,r.Z)(n,"&-input",{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}),n)),(0,r.Z)(o,a,{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:"color ".concat(e.motionDurationMid," ").concat(e.motionEaseOut)},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}}),(0,r.Z)(o,"&-with-help ".concat(a,"-explain"),{height:"auto",opacity:1}),(0,r.Z)(o,"".concat(a,"-feedback-icon"),{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:p.kr,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}),o)))},w=function(e){var t,n=e.componentCls,o=e.formItemCls,a=e.rootPrefixCls;return(0,r.Z)({},"".concat(n,"-horizontal"),(t={},(0,r.Z)(t,"".concat(o,"-label"),{flexGrow:0}),(0,r.Z)(t,"".concat(o,"-control"),{flex:"1 1 0",minWidth:0}),(0,r.Z)(t,"".concat(o,"-label.").concat(a,"-col-24 + ").concat(o,"-control"),{minWidth:"unset"}),t))},C=function(e){var t,n=e.componentCls,o=e.formItemCls;return(0,r.Z)({},"".concat(n,"-inline"),(0,r.Z)({display:"flex",flexWrap:"wrap"},o,(t={flex:"none",marginInlineEnd:e.margin,marginBottom:0,"&-row":{flexWrap:"nowrap"},"&-with-help":{marginBottom:e.marginLG}},(0,r.Z)(t,"> ".concat(o,"-label,\n        > ").concat(o,"-control"),{display:"inline-block",verticalAlign:"top"}),(0,r.Z)(t,"> ".concat(o,"-label"),{flex:"none"}),(0,r.Z)(t,"".concat(n,"-text"),{display:"inline-block"}),(0,r.Z)(t,"".concat(o,"-has-feedback"),{display:"inline-block"}),t)))},E=function(e){return{padding:"0 0 ".concat(e.paddingXS,"px"),whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}},O=function(e){var t,n=e.componentCls,o=e.formItemCls;return t={},(0,r.Z)(t,"".concat(o," ").concat(o,"-label"),E(e)),(0,r.Z)(t,n,(0,r.Z)({},o,(0,r.Z)({flexWrap:"wrap"},"".concat(o,"-label,\n          ").concat(o,"-control"),{flex:"0 0 100%",maxWidth:"100%"}))),t},S=function(e){var t,n=e.componentCls,o=e.formItemCls,a=e.rootPrefixCls;return t={},(0,r.Z)(t,"".concat(n,"-vertical"),(0,r.Z)({},o,(0,r.Z)({"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"}},"".concat(n,"-item-control"),{width:"100%"}))),(0,r.Z)(t,"".concat(n,"-vertical ").concat(o,"-label,\n      .").concat(a,"-col-24").concat(o,"-label,\n      .").concat(a,"-col-xl-24").concat(o,"-label"),E(e)),(0,r.Z)(t,"@media (max-width: ".concat(e.screenXSMax,"px)"),[O(e),(0,r.Z)({},n,(0,r.Z)({},".".concat(a,"-col-xs-24").concat(o,"-label"),E(e)))]),(0,r.Z)(t,"@media (max-width: ".concat(e.screenSMMax,"px)"),(0,r.Z)({},n,(0,r.Z)({},".".concat(a,"-col-sm-24").concat(o,"-label"),E(e)))),(0,r.Z)(t,"@media (max-width: ".concat(e.screenMDMax,"px)"),(0,r.Z)({},n,(0,r.Z)({},".".concat(a,"-col-md-24").concat(o,"-label"),E(e)))),(0,r.Z)(t,"@media (max-width: ".concat(e.screenLGMax,"px)"),(0,r.Z)({},n,(0,r.Z)({},".".concat(a,"-col-lg-24").concat(o,"-label"),E(e)))),t},j=(0,h.Z)("Form",(function(e,t){var n=t.rootPrefixCls,r=(0,v.TS)(e,{formItemCls:"".concat(e.componentCls,"-item"),rootPrefixCls:n});return[Z(r),x(r),b(r),w(r),C(r),S(r),(0,g.Z)(r),p.kr]})),k=[];function I(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return{key:"string"===typeof e?e:"".concat(t,"-").concat(r),error:e,errorStatus:n}}function M(e){var t=e.help,n=e.helpStatus,i=e.errors,m=void 0===i?k:i,p=e.warnings,g=void 0===p?k:p,h=e.className,v=e.fieldId,b=e.onVisibleChanged,y=s.useContext(d.Rk).prefixCls,Z="".concat(y,"-item-explain"),x=j(y),w=(0,o.Z)(x,2)[1],C=(0,s.useMemo)((function(){return(0,u.ZP)(y)}),[y]),E=f(m),O=f(g),S=s.useMemo((function(){return void 0!==t&&null!==t?[I(t,"help",n)]:[].concat((0,a.Z)(E.map((function(e,t){return I(e,"error","error",t)}))),(0,a.Z)(O.map((function(e,t){return I(e,"warning","warning",t)}))))}),[t,n,E,O]),M={};return v&&(M.id="".concat(v,"_help")),s.createElement(c.ZP,{motionDeadline:C.motionDeadline,motionName:"".concat(y,"-show-help"),visible:!!S.length,onVisibleChanged:b},(function(e){var t=e.className,n=e.style;return s.createElement("div",Object.assign({},M,{className:l()(Z,t,h,w),style:n,role:"alert"}),s.createElement(c.V4,Object.assign({keys:S},(0,u.ZP)(y),{motionName:"".concat(y,"-show-help-item"),component:!1}),(function(e){var t=e.key,n=e.error,o=e.errorStatus,a=e.className,i=e.style;return s.createElement("div",{key:t,className:l()(a,(0,r.Z)({},"".concat(Z,"-").concat(o),o)),style:i},n)})))}))}var N=n(3465),q=n(1929),P=n(9125),W=n(1815),F=n(4107),R=n(7762),_=function(e){return"object"==typeof e&&null!=e&&1===e.nodeType},H=function(e,t){return(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e},T=function(e,t){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var n=getComputedStyle(e,null);return H(n.overflowY,t)||H(n.overflowX,t)||function(e){var t=function(e){if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}}(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)}(e)}return!1},z=function(e,t,n,r,o,a,i,l){return a<e&&i>t||a>e&&i<t?0:a<=e&&l<=n||i>=t&&l>=n?a-e-r:i>t&&l<n||a<e&&l>n?i-t+o:0},A=function(e){var t=e.parentElement;return null==t?e.getRootNode().host||null:t},V=function(e,t){var n,r,o,a;if("undefined"==typeof document)return[];var i=t.scrollMode,l=t.block,c=t.inline,s=t.boundary,u=t.skipOverflowHiddenElements,d="function"==typeof s?s:function(e){return e!==s};if(!_(e))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,m=[],p=e;_(p)&&d(p);){if((p=A(p))===f){m.push(p);break}null!=p&&p===document.body&&T(p)&&!T(document.documentElement)||null!=p&&T(p,u)&&m.push(p)}for(var g=null!=(r=null==(n=window.visualViewport)?void 0:n.width)?r:innerWidth,h=null!=(a=null==(o=window.visualViewport)?void 0:o.height)?a:innerHeight,v=window,b=v.scrollX,y=v.scrollY,Z=e.getBoundingClientRect(),x=Z.height,w=Z.width,C=Z.top,E=Z.right,O=Z.bottom,S=Z.left,j="start"===l||"nearest"===l?C:"end"===l?O:C+x/2,k="center"===c?S+w/2:"end"===c?E:S,I=[],M=0;M<m.length;M++){var N=m[M],q=N.getBoundingClientRect(),P=q.height,W=q.width,F=q.top,R=q.right,H=q.bottom,V=q.left;if("if-needed"===i&&C>=0&&S>=0&&O<=h&&E<=g&&C>=F&&O<=H&&S>=V&&E<=R)return I;var D=getComputedStyle(N),B=parseInt(D.borderLeftWidth,10),L=parseInt(D.borderTopWidth,10),X=parseInt(D.borderRightWidth,10),G=parseInt(D.borderBottomWidth,10),Y=0,K=0,U="offsetWidth"in N?N.offsetWidth-N.clientWidth-B-X:0,$="offsetHeight"in N?N.offsetHeight-N.clientHeight-L-G:0,Q="offsetWidth"in N?0===N.offsetWidth?0:W/N.offsetWidth:0,J="offsetHeight"in N?0===N.offsetHeight?0:P/N.offsetHeight:0;if(f===N)Y="start"===l?j:"end"===l?j-h:"nearest"===l?z(y,y+h,h,L,G,y+j,y+j+x,x):j-h/2,K="start"===c?k:"center"===c?k-g/2:"end"===c?k-g:z(b,b+g,g,B,X,b+k,b+k+w,w),Y=Math.max(0,Y+y),K=Math.max(0,K+b);else{Y="start"===l?j-F-L:"end"===l?j-H+G+$:"nearest"===l?z(F,H,P,L,G+$,j,j+x,x):j-(F+P/2)+$/2,K="start"===c?k-V-B:"center"===c?k-(V+W/2)+U/2:"end"===c?k-R+X+U:z(V,R,W,B,X+U,k,k+w,w);var ee=N.scrollLeft,te=N.scrollTop;j+=te-(Y=Math.max(0,Math.min(te+Y/J,N.scrollHeight-P/J+$))),k+=ee-(K=Math.max(0,Math.min(ee+K/Q,N.scrollWidth-W/Q+U)))}I.push({el:N,top:Y,left:K})}return I},D=function(e){return!1===e?{block:"end",inline:"nearest"}:function(e){return e===Object(e)&&0!==Object.keys(e).length}(e)?e:{block:"start",inline:"nearest"}};var B=["parentNode"],L="form_item";function X(e){return void 0===e||!1===e?[]:Array.isArray(e)?e:[e]}function G(e,t){if(e.length){var n=e.join("_");return t?"".concat(t,"_").concat(n):B.includes(n)?"".concat(L,"_").concat(n):n}}function Y(e){return X(e).join("_")}function K(e){var t=(0,N.cI)(),n=(0,o.Z)(t,1)[0],r=s.useRef({}),a=s.useMemo((function(){return null!==e&&void 0!==e?e:Object.assign(Object.assign({},n),{__INTERNAL__:{itemRef:function(e){return function(t){var n=Y(e);t?r.current[n]=t:delete r.current[n]}}},scrollToField:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=G(X(e),a.__INTERNAL__.name),r=n?document.getElementById(n):null;r&&function(e,t){if(e.isConnected&&function(e){for(var t=e;t&&t.parentNode;){if(t.parentNode===document)return!0;t=t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}return!1}(e)){if(function(e){return"object"==typeof e&&"function"==typeof e.behavior}(t))return t.behavior(V(e,t));var n,r="boolean"==typeof t||null==t?void 0:t.behavior,o=(0,R.Z)(V(e,D(t)));try{for(o.s();!(n=o.n()).done;){var a=n.value,i=a.el,l=a.top,c=a.left;i.scroll({top:l,left:c,behavior:r})}}catch(s){o.e(s)}finally{o.f()}}}(r,Object.assign({scrollMode:"if-needed",block:"nearest"},t))},getFieldInstance:function(e){var t=Y(e);return r.current[t]}})}),[e,n]);return[a]}var U=n(5815),$=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},Q=function(e,t){var n,a=s.useContext(P.Z),i=s.useContext(q.E_),c=i.getPrefixCls,u=i.direction,f=i.form,m=e.prefixCls,p=e.className,g=e.rootClassName,h=e.size,v=e.disabled,b=void 0===v?a:v,y=e.form,Z=e.colon,x=e.labelAlign,w=e.labelWrap,C=e.labelCol,E=e.wrapperCol,O=e.hideRequiredMark,S=e.layout,k=void 0===S?"horizontal":S,I=e.scrollToFirstError,M=e.requiredMark,R=e.onFinishFailed,_=e.name,H=e.style,T=$(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style"]),z=(0,F.Z)(h),A=s.useContext(U.Z);var V=(0,s.useMemo)((function(){return void 0!==M?M:f&&void 0!==f.requiredMark?f.requiredMark:!O}),[O,M,f]),D=null!==Z&&void 0!==Z?Z:null===f||void 0===f?void 0:f.colon,B=c("form",m),L=j(B),X=(0,o.Z)(L,2),G=X[0],Y=X[1],Q=l()(B,"".concat(B,"-").concat(k),(n={},(0,r.Z)(n,"".concat(B,"-hide-required-mark"),!1===V),(0,r.Z)(n,"".concat(B,"-rtl"),"rtl"===u),(0,r.Z)(n,"".concat(B,"-").concat(z),z),n),Y,null===f||void 0===f?void 0:f.className,p,g),J=K(y),ee=(0,o.Z)(J,1)[0],te=ee.__INTERNAL__;te.name=_;var ne=(0,s.useMemo)((function(){return{name:_,labelAlign:x,labelCol:C,labelWrap:w,wrapperCol:E,vertical:"vertical"===k,colon:D,requiredMark:V,itemRef:te.itemRef,form:ee}}),[_,x,C,E,k,D,V,ee]);s.useImperativeHandle(t,(function(){return ee}));var re=function(e,t){if(e){var n={block:"nearest"};"object"===typeof e&&(n=e),ee.scrollToField(t,n)}};return G(s.createElement(P.n,{disabled:b},s.createElement(W.q,{size:z},s.createElement(d.RV,{validateMessages:A},s.createElement(d.q3.Provider,{value:ne},s.createElement(N.ZP,Object.assign({id:_},T,{name:_,onFinishFailed:function(e){if(null===R||void 0===R||R(e),e.errorFields.length){var t=e.errorFields[0].name;if(void 0!==I)return void re(I,t);f&&void 0!==f.scrollToFirstError&&re(f.scrollToFirstError,t)}},form:ee,style:Object.assign(Object.assign({},null===f||void 0===f?void 0:f.style),H),className:Q})))))))};var J=s.forwardRef(Q),ee=n(8368),te=n(8834),ne=n(1113),re=function(){var e=(0,s.useContext)(d.aM),t=e.status,n=e.errors,r=void 0===n?[]:n,o=e.warnings;return{status:t,errors:r,warnings:void 0===o?[]:o}};re.Context=d.aM;var oe=re,ae=n(5314);var ie=n(7557),le=n(2621),ce=n(187),se=n(7106),ue=n(1605),de=n(2386),fe=n(1818),me=n(7545),pe=n(9752),ge=function(e){var t=e.prefixCls,n=e.status,r=e.wrapperCol,o=e.children,a=e.errors,i=e.warnings,c=e._internalItemRender,u=e.extra,f=e.help,m=e.fieldId,p=e.marginBottom,g=e.onErrorVisibleChanged,h="".concat(t,"-item"),v=s.useContext(d.q3),b=r||v.wrapperCol||{},y=l()("".concat(h,"-control"),b.className),Z=s.useMemo((function(){return Object.assign({},v)}),[v]);delete Z.labelCol,delete Z.wrapperCol;var x=s.createElement("div",{className:"".concat(h,"-control-input")},s.createElement("div",{className:"".concat(h,"-control-input-content")},o)),w=s.useMemo((function(){return{prefixCls:t,status:n}}),[t,n]),C=null!==p||a.length||i.length?s.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},s.createElement(d.Rk.Provider,{value:w},s.createElement(M,{fieldId:m,errors:a,warnings:i,help:f,helpStatus:n,className:"".concat(h,"-explain-connected"),onVisibleChanged:g})),!!p&&s.createElement("div",{style:{width:0,height:p}})):null,E={};m&&(E.id="".concat(m,"_extra"));var O=u?s.createElement("div",Object.assign({},E,{className:"".concat(h,"-extra")}),u):null,S=c&&"pro_table_render"===c.mark&&c.render?c.render(e,{input:x,errorList:C,extra:O}):s.createElement(s.Fragment,null,x,C,O);return s.createElement(d.q3.Provider,{value:Z},s.createElement(pe.Z,Object.assign({},b,{className:y}),S))},he=n(7462),ve={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"},be=n(4291),ye=function(e,t){return s.createElement(be.Z,(0,he.Z)({},e,{ref:t,icon:ve}))};var Ze=s.forwardRef(ye),xe=n(6238),we=n(4e3),Ce=n(1431),Ee=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};var Oe=function(e){var t,n,a=e.prefixCls,i=e.label,c=e.htmlFor,u=e.labelCol,f=e.labelAlign,m=e.colon,p=e.required,g=e.requiredMark,h=e.tooltip,v=(0,we.Z)("Form"),b=(0,o.Z)(v,1)[0],y=s.useContext(d.q3),Z=y.vertical,x=y.labelAlign,w=y.labelCol,C=y.labelWrap,E=y.colon;if(!i)return null;var O=u||w||{},S=f||x,j="".concat(a,"-item-label"),k=l()(j,"left"===S&&"".concat(j,"-left"),O.className,(0,r.Z)({},"".concat(j,"-wrap"),!!C)),I=i,M=!0===m||!1!==E&&!1!==m;M&&!Z&&"string"===typeof i&&""!==i.trim()&&(I=i.replace(/[:|\uff1a]\s*$/,""));var N=function(e){return e?"object"!==typeof e||s.isValidElement(e)?{title:e}:e:null}(h);if(N){var q=N.icon,P=void 0===q?s.createElement(Ze,null):q,W=Ee(N,["icon"]),F=s.createElement(Ce.Z,Object.assign({},W),s.cloneElement(P,{className:"".concat(a,"-item-tooltip"),title:""}));I=s.createElement(s.Fragment,null,I,F)}"optional"!==g||p||(I=s.createElement(s.Fragment,null,I,s.createElement("span",{className:"".concat(a,"-item-optional"),title:""},(null===b||void 0===b?void 0:b.optional)||(null===(n=xe.Z.Form)||void 0===n?void 0:n.optional))));var R=l()((t={},(0,r.Z)(t,"".concat(a,"-item-required"),p),(0,r.Z)(t,"".concat(a,"-item-required-mark-optional"),"optional"===g),(0,r.Z)(t,"".concat(a,"-item-no-colon"),!M),t));return s.createElement(pe.Z,Object.assign({},O,{className:k}),s.createElement("label",{htmlFor:c,className:R,title:"string"===typeof i?i:""},I))},Se=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},je={success:ie.Z,warning:ce.Z,error:le.Z,validating:se.Z};function ke(e){var t,n=e.prefixCls,a=e.className,i=e.rootClassName,c=e.style,u=e.help,m=e.errors,p=e.warnings,g=e.validateStatus,h=e.meta,v=e.hasFeedback,b=e.hidden,y=e.children,Z=e.fieldId,x=e.required,w=e.isRequired,C=e.onSubItemMetaChange,E=Se(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),O="".concat(n,"-item"),S=s.useContext(d.q3).requiredMark,j=s.useRef(null),k=f(m),I=f(p),M=void 0!==u&&null!==u,N=!!(M||m.length||p.length),q=!!j.current&&(0,de.Z)(j.current),P=s.useState(null),W=(0,o.Z)(P,2),F=W[0],R=W[1];(0,ue.Z)((function(){if(N&&j.current){var e=getComputedStyle(j.current);R(parseInt(e.marginBottom,10))}}),[N,q]);var _=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t="",n=e?k:h.errors,r=e?I:h.warnings;return void 0!==g?t=g:h.validating?t="validating":n.length?t="error":r.length?t="warning":(h.touched||v&&h.validated)&&(t="success"),t}(),H=s.useMemo((function(){var e;if(v){var t=_&&je[_];e=t?s.createElement("span",{className:l()("".concat(O,"-feedback-icon"),"".concat(O,"-feedback-icon-").concat(_))},s.createElement(t,null)):null}return{status:_,errors:m,warnings:p,hasFeedback:v,feedbackIcon:e,isFormItemInput:!0}}),[_,v]),T=l()(O,a,i,(t={},(0,r.Z)(t,"".concat(O,"-with-help"),M||k.length||I.length),(0,r.Z)(t,"".concat(O,"-has-feedback"),_&&v),(0,r.Z)(t,"".concat(O,"-has-success"),"success"===_),(0,r.Z)(t,"".concat(O,"-has-warning"),"warning"===_),(0,r.Z)(t,"".concat(O,"-has-error"),"error"===_),(0,r.Z)(t,"".concat(O,"-is-validating"),"validating"===_),(0,r.Z)(t,"".concat(O,"-hidden"),b),t));return s.createElement("div",{className:T,style:c,ref:j},s.createElement(me.Z,Object.assign({className:"".concat(O,"-row")},(0,fe.Z)(E,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol"])),s.createElement(Oe,Object.assign({htmlFor:Z},e,{requiredMark:S,required:null!==x&&void 0!==x?x:w,prefixCls:n})),s.createElement(ge,Object.assign({},e,h,{errors:k,warnings:I,prefixCls:n,status:_,help:u,marginBottom:F,onErrorVisibleChanged:function(e){e||R(null)}}),s.createElement(d.qI.Provider,{value:C},s.createElement(d.aM.Provider,{value:H},y)))),!!F&&s.createElement("div",{className:"".concat(O,"-margin-offset"),style:{marginBottom:-F}}))}var Ie=n(5501);var Me=s.memo((function(e){return e.children}),(function(e,t){return e.value===t.value&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((function(e,n){return e===t.childProps[n]}))}));var Ne=function(e){var t=e.name,n=e.noStyle,r=e.className,i=e.dependencies,c=e.prefixCls,u=e.shouldUpdate,f=e.rules,m=e.children,p=e.required,g=e.label,h=e.messageVariables,v=e.trigger,b=void 0===v?"onChange":v,y=e.validateTrigger,Z=e.hidden,x=e.help,w=s.useContext(q.E_).getPrefixCls,C=s.useContext(d.q3).name,E=function(e){if("function"===typeof e)return e;var t=(0,Ie.Z)(e);return t.length<=1?t[0]:t}(m),O="function"===typeof E,S=s.useContext(d.qI),k=s.useContext(N.zb).validateTrigger,I=void 0!==y?y:k,M=function(e){return!(void 0===e||null===e)}(t),P=w("form",c),W=j(P),F=(0,o.Z)(W,2),R=F[0],_=F[1],H=s.useContext(N.ZM),T=s.useRef(),z=function(e){var t=s.useState(e),n=(0,o.Z)(t,2),r=n[0],a=n[1],i=(0,s.useRef)(null),l=(0,s.useRef)([]),c=(0,s.useRef)(!1);return s.useEffect((function(){return c.current=!1,function(){c.current=!0,ae.Z.cancel(i.current),i.current=null}}),[]),[r,function(e){c.current||(null===i.current&&(l.current=[],i.current=(0,ae.Z)((function(){i.current=null,a((function(e){var t=e;return l.current.forEach((function(e){t=e(t)})),t}))}))),l.current.push(e))}]}({}),A=(0,o.Z)(z,2),V=A[0],D=A[1],B=(0,ee.Z)((function(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}})),L=(0,o.Z)(B,2),Y=L[0],K=L[1],U=function(e,t){D((function(n){var r=Object.assign({},n),o=[].concat((0,a.Z)(e.name.slice(0,-1)),(0,a.Z)(t)).join("__SPLIT__");return e.destroy?delete r[o]:r[o]=e,r}))},$=s.useMemo((function(){var e=(0,a.Z)(Y.errors),t=(0,a.Z)(Y.warnings);return Object.values(V).forEach((function(n){e.push.apply(e,(0,a.Z)(n.errors||[])),t.push.apply(t,(0,a.Z)(n.warnings||[]))})),[e,t]}),[V,Y.errors,Y.warnings]),Q=(0,o.Z)($,2),J=Q[0],re=Q[1],oe=function(){var e=s.useContext(d.q3).itemRef,t=s.useRef({});return function(n,r){var o=r&&"object"===typeof r&&r.ref,a=n.join("_");return t.current.name===a&&t.current.originRef===o||(t.current.name=a,t.current.originRef=o,t.current.ref=(0,te.sQ)(e(n),o)),t.current.ref}}();function ie(t,o,a){return n&&!Z?t:s.createElement(ke,Object.assign({key:"row"},e,{className:l()(r,_),prefixCls:P,fieldId:o,isRequired:a,errors:J,warnings:re,meta:Y,onSubItemMetaChange:U}),t)}if(!M&&!O&&!i)return R(ie(E));var le={};return"string"===typeof g?le.label=g:t&&(le.label=String(t)),h&&(le=Object.assign(Object.assign({},le),h)),R(s.createElement(N.gN,Object.assign({},e,{messageVariables:le,trigger:b,validateTrigger:I,onMetaChange:function(e){var t=null===H||void 0===H?void 0:H.getKey(e.name);if(K(e.destroy?{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}:e,!0),n&&!1!==x&&S){var r=e.name;if(e.destroy)r=T.current||r;else if(void 0!==t){var i=(0,o.Z)(t,2),l=i[0],c=i[1];r=[l].concat((0,a.Z)(c)),T.current=r}S(e,r)}}}),(function(n,r,o){var l=X(t).length&&r?r.name:[],c=G(l,C),d=void 0!==p?p:!(!f||!f.some((function(e){if(e&&"object"===typeof e&&e.required&&!e.warningOnly)return!0;if("function"===typeof e){var t=e(o);return t&&t.required&&!t.warningOnly}return!1}))),m=Object.assign({},n),g=null;if(Array.isArray(E)&&M)g=E;else if(O&&(!u&&!i||M));else if(!i||O||M)if((0,ne.l$)(E)){var h=Object.assign(Object.assign({},E.props),m);if(h.id||(h.id=c),x||J.length>0||re.length>0||e.extra){var v=[];(x||J.length>0)&&v.push("".concat(c,"_help")),e.extra&&v.push("".concat(c,"_extra")),h["aria-describedby"]=v.join(" ")}J.length>0&&(h["aria-invalid"]="true"),d&&(h["aria-required"]="true"),(0,te.Yr)(E)&&(h.ref=oe(l,E)),new Set([].concat((0,a.Z)(X(b)),(0,a.Z)(X(I)))).forEach((function(e){h[e]=function(){for(var t,n,r,o,a,i=arguments.length,l=new Array(i),c=0;c<i;c++)l[c]=arguments[c];null===(r=m[e])||void 0===r||(t=r).call.apply(t,[m].concat(l)),null===(a=(o=E.props)[e])||void 0===a||(n=a).call.apply(n,[o].concat(l))}}));var y=[h["aria-required"],h["aria-invalid"],h["aria-describedby"]];g=s.createElement(Me,{value:m[e.valuePropName||"value"],update:E,childProps:y},(0,ne.Tm)(E,h))}else g=O&&(u||i)&&!M?E(o):E;else;return ie(g,c,d)})))};Ne.useStatus=oe;var qe=Ne,Pe=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},We=function(e){var t=e.prefixCls,n=e.children,r=Pe(e,["prefixCls","children"]),o=(0,s.useContext(q.E_).getPrefixCls)("form",t),a=s.useMemo((function(){return{prefixCls:o,status:"error"}}),[o]);return s.createElement(N.aV,Object.assign({},r),(function(e,t,r){return s.createElement(d.Rk.Provider,{value:a},n(e.map((function(e){return Object.assign(Object.assign({},e),{fieldKey:e.key})})),t,{errors:r.errors,warnings:r.warnings}))}))};var Fe=J;Fe.Item=qe,Fe.List=We,Fe.ErrorList=M,Fe.useForm=K,Fe.useFormInstance=function(){return(0,s.useContext)(d.q3).form},Fe.useWatch=N.qo,Fe.Provider=d.RV,Fe.create=function(){};var Re=Fe}}]);
//# sourceMappingURL=846.db2c838a.chunk.js.map