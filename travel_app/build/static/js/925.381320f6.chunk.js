"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[925],{2657:function(t,o,n){function e(t){return null!==t&&void 0!==t&&t===t.window}function a(t,o){var n,a;if("undefined"===typeof window)return 0;var r=o?"scrollTop":"scrollLeft",c=0;return e(t)?c=t[o?"pageYOffset":"pageXOffset"]:t instanceof Document?c=t.documentElement[r]:(t instanceof HTMLElement||t)&&(c=t[r]),t&&!e(t)&&"number"!==typeof c&&(c=null===(a=(null!==(n=t.ownerDocument)&&void 0!==n?n:t).documentElement)||void 0===a?void 0:a[r]),c}n.d(o,{F:function(){return e},Z:function(){return a}})},3285:function(t,o,n){n.d(o,{Z:function(){return r}});var e=n(5314);var a=n(2657);function r(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=o.getContainer,r=void 0===n?function(){return window}:n,c=o.callback,i=o.duration,l=void 0===i?450:i,s=r(),d=(0,a.Z)(s,!0),u=Date.now();(0,e.Z)((function o(){var n=Date.now()-u,r=function(t,o,n,e){var a=n-o;return(t/=e/2)<1?a/2*t*t*t+o:a/2*((t-=2)*t*t+2)+o}(n>l?l:n,d,t,l);(0,a.F)(s)?s.scrollTo(window.pageXOffset,r):s instanceof Document||"HTMLDocument"===s.constructor.name?s.documentElement.scrollTop=r:s.scrollTop=r,n<l?(0,e.Z)(o):"function"===typeof c&&c()}))}},5925:function(t,o,n){n.d(o,{Z:function(){return wt}});var e=n(9439),a=n(7462),r=n(2791),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"}}]},name:"vertical-align-top",theme:"outlined"},i=n(4291),l=function(t,o){return r.createElement(i.Z,(0,a.Z)({},t,{ref:o,icon:c}))};var s=r.forwardRef(l),d=n(1694),u=n.n(d),m=n(8568),f=n(4942),g=n(1818),b=n(4466),p=n(1113),v=n(1929),h=n(188),y=n(7521),Z=n(6356),O=n(5564),S=n(9922),w=new h.E4("antStatusProcessing",{"0%":{transform:"scale(0.8)",opacity:.5},"100%":{transform:"scale(2.4)",opacity:0}}),E=new h.E4("antZoomBadgeIn",{"0%":{transform:"scale(0) translate(50%, -50%)",opacity:0},"100%":{transform:"scale(1) translate(50%, -50%)"}}),x=new h.E4("antZoomBadgeOut",{"0%":{transform:"scale(1) translate(50%, -50%)"},"100%":{transform:"scale(0) translate(50%, -50%)",opacity:0}}),C=new h.E4("antNoWrapperZoomBadgeIn",{"0%":{transform:"scale(0)",opacity:0},"100%":{transform:"scale(1)"}}),k=new h.E4("antNoWrapperZoomBadgeOut",{"0%":{transform:"scale(1)"},"100%":{transform:"scale(0)",opacity:0}}),N=new h.E4("antBadgeLoadingCircle",{"0%":{transformOrigin:"50%"},"100%":{transform:"translate(50%, -50%) rotate(360deg)",transformOrigin:"50%"}}),j=function(t){var o,n,e,a,r,c,i,l,s=t.componentCls,d=t.iconCls,u=t.antCls,m=t.badgeFontHeight,g=t.badgeShadowSize,b=t.badgeHeightSm,p=t.motionDurationSlow,v=t.badgeStatusSize,h=t.marginXS,O=t.badgeRibbonOffset,S="".concat(u,"-scroll-number"),j="".concat(u,"-ribbon"),B="".concat(u,"-ribbon-wrapper"),I=(0,Z.Z)(t,(function(t,o){var n=o.darkColor;return(0,f.Z)({},"&".concat(s," ").concat(s,"-color-").concat(t),(0,f.Z)({background:n},"&:not(".concat(s,"-count)"),{color:n}))})),z=(0,Z.Z)(t,(function(t,o){var n=o.darkColor;return(0,f.Z)({},"&".concat(j,"-color-").concat(t),{background:n,color:n})}));return l={},(0,f.Z)(l,s,Object.assign(Object.assign(Object.assign(Object.assign({},(0,y.Wf)(t)),(n={position:"relative",display:"inline-block",width:"fit-content",lineHeight:1},(0,f.Z)(n,"".concat(s,"-count"),{zIndex:t.badgeZIndex,minWidth:t.badgeHeight,height:t.badgeHeight,color:t.badgeTextColor,fontWeight:t.badgeFontWeight,fontSize:t.badgeFontSize,lineHeight:"".concat(t.badgeHeight,"px"),whiteSpace:"nowrap",textAlign:"center",background:t.badgeColor,borderRadius:t.badgeHeight/2,boxShadow:"0 0 0 ".concat(g,"px ").concat(t.badgeShadowColor),transition:"background ".concat(t.motionDurationMid),a:{color:t.badgeTextColor},"a:hover":{color:t.badgeTextColor},"a:hover &":{background:t.badgeColorHover}}),(0,f.Z)(n,"".concat(s,"-count-sm"),{minWidth:b,height:b,fontSize:t.badgeFontSizeSm,lineHeight:"".concat(b,"px"),borderRadius:b/2}),(0,f.Z)(n,"".concat(s,"-multiple-words"),{padding:"0 ".concat(t.paddingXS,"px")}),(0,f.Z)(n,"".concat(s,"-dot"),{zIndex:t.badgeZIndex,width:t.badgeDotSize,minWidth:t.badgeDotSize,height:t.badgeDotSize,background:t.badgeColor,borderRadius:"100%",boxShadow:"0 0 0 ".concat(g,"px ").concat(t.badgeShadowColor)}),(0,f.Z)(n,"".concat(s,"-dot").concat(S),{transition:"background ".concat(p)}),(0,f.Z)(n,"".concat(s,"-count, ").concat(s,"-dot, ").concat(S,"-custom-component"),(0,f.Z)({position:"absolute",top:0,insetInlineEnd:0,transform:"translate(50%, -50%)",transformOrigin:"100% 0%"},"&".concat(d,"-spin"),{animationName:N,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear"})),(0,f.Z)(n,"&".concat(s,"-status"),(o={lineHeight:"inherit",verticalAlign:"baseline"},(0,f.Z)(o,"".concat(s,"-status-dot"),{position:"relative",top:-1,display:"inline-block",width:v,height:v,verticalAlign:"middle",borderRadius:"50%"}),(0,f.Z)(o,"".concat(s,"-status-success"),{backgroundColor:t.colorSuccess}),(0,f.Z)(o,"".concat(s,"-status-processing"),{position:"relative",color:t.colorPrimary,backgroundColor:t.colorPrimary,"&::after":{position:"absolute",top:0,insetInlineStart:0,width:"100%",height:"100%",borderWidth:g,borderStyle:"solid",borderColor:"inherit",borderRadius:"50%",animationName:w,animationDuration:t.badgeProcessingDuration,animationIterationCount:"infinite",animationTimingFunction:"ease-in-out",content:'""'}}),(0,f.Z)(o,"".concat(s,"-status-default"),{backgroundColor:t.colorTextPlaceholder}),(0,f.Z)(o,"".concat(s,"-status-error"),{backgroundColor:t.colorError}),(0,f.Z)(o,"".concat(s,"-status-warning"),{backgroundColor:t.colorWarning}),(0,f.Z)(o,"".concat(s,"-status-text"),{marginInlineStart:h,color:t.colorText,fontSize:t.fontSize}),o)),n)),I),(r={},(0,f.Z)(r,"".concat(s,"-zoom-appear, ").concat(s,"-zoom-enter"),{animationName:E,animationDuration:t.motionDurationSlow,animationTimingFunction:t.motionEaseOutBack,animationFillMode:"both"}),(0,f.Z)(r,"".concat(s,"-zoom-leave"),{animationName:x,animationDuration:t.motionDurationSlow,animationTimingFunction:t.motionEaseOutBack,animationFillMode:"both"}),(0,f.Z)(r,"&".concat(s,"-not-a-wrapper"),(e={},(0,f.Z)(e,"".concat(s,"-zoom-appear, ").concat(s,"-zoom-enter"),{animationName:C,animationDuration:t.motionDurationSlow,animationTimingFunction:t.motionEaseOutBack}),(0,f.Z)(e,"".concat(s,"-zoom-leave"),{animationName:k,animationDuration:t.motionDurationSlow,animationTimingFunction:t.motionEaseOutBack}),(0,f.Z)(e,"&:not(".concat(s,"-status)"),{verticalAlign:"middle"}),(0,f.Z)(e,"".concat(S,"-custom-component, ").concat(s,"-count"),{transform:"none"}),(0,f.Z)(e,"".concat(S,"-custom-component, ").concat(S),{position:"relative",top:"auto",display:"block",transformOrigin:"50% 50%"}),e)),(0,f.Z)(r,"".concat(S),(a={overflow:"hidden"},(0,f.Z)(a,"".concat(S,"-only"),(0,f.Z)({position:"relative",display:"inline-block",height:t.badgeHeight,transition:"all ".concat(t.motionDurationSlow," ").concat(t.motionEaseOutBack),WebkitTransformStyle:"preserve-3d",WebkitBackfaceVisibility:"hidden"},"> p".concat(S,"-only-unit"),{height:t.badgeHeight,margin:0,WebkitTransformStyle:"preserve-3d",WebkitBackfaceVisibility:"hidden"})),(0,f.Z)(a,"".concat(S,"-symbol"),{verticalAlign:"top"}),a)),(0,f.Z)(r,"&-rtl",(0,f.Z)({direction:"rtl"},"".concat(s,"-count, ").concat(s,"-dot, ").concat(S,"-custom-component"),{transform:"translate(-50%, -50%)"})),r))),(0,f.Z)(l,"".concat(B),{position:"relative"}),(0,f.Z)(l,"".concat(j),Object.assign(Object.assign(Object.assign(Object.assign({},(0,y.Wf)(t)),(c={position:"absolute",top:h,padding:"0 ".concat(t.paddingXS,"px"),color:t.colorPrimary,lineHeight:"".concat(m,"px"),whiteSpace:"nowrap",backgroundColor:t.colorPrimary,borderRadius:t.borderRadiusSM},(0,f.Z)(c,"".concat(j,"-text"),{color:t.colorTextLightSolid}),(0,f.Z)(c,"".concat(j,"-corner"),{position:"absolute",top:"100%",width:O,height:O,color:"currentcolor",border:"".concat(O/2,"px solid"),transform:t.badgeRibbonCornerTransform,transformOrigin:"top",filter:t.badgeRibbonCornerFilter}),c)),z),(i={},(0,f.Z)(i,"&".concat(j,"-placement-end"),(0,f.Z)({insetInlineEnd:-O,borderEndEndRadius:0},"".concat(j,"-corner"),{insetInlineEnd:0,borderInlineEndColor:"transparent",borderBlockEndColor:"transparent"})),(0,f.Z)(i,"&".concat(j,"-placement-start"),(0,f.Z)({insetInlineStart:-O,borderEndStartRadius:0},"".concat(j,"-corner"),{insetInlineStart:0,borderBlockEndColor:"transparent",borderInlineStartColor:"transparent"})),(0,f.Z)(i,"&-rtl",{direction:"rtl"}),i))),l},B=(0,O.Z)("Badge",(function(t){var o=t.fontSize,n=t.lineHeight,e=t.fontSizeSM,a=t.lineWidth,r=t.marginXS,c=t.colorBorderBg,i=Math.round(o*n),l=a,s=i-2*l,d=t.colorBgContainer,u=e,m=t.colorError,f=t.colorErrorHover,g=o,b=e/2,p=e,v=e/2,h=(0,S.TS)(t,{badgeFontHeight:i,badgeShadowSize:l,badgeZIndex:"auto",badgeHeight:s,badgeTextColor:d,badgeFontWeight:"normal",badgeFontSize:u,badgeColor:m,badgeColorHover:f,badgeShadowColor:c,badgeHeightSm:g,badgeDotSize:b,badgeFontSizeSm:p,badgeStatusSize:v,badgeProcessingDuration:"1.2s",badgeRibbonOffset:r,badgeRibbonCornerTransform:"scaleY(0.75)",badgeRibbonCornerFilter:"brightness(75%)"});return[j(h)]}));var I=function(t){var o,n=t.className,a=t.prefixCls,c=t.style,i=t.color,l=t.children,s=t.text,d=t.placement,m=void 0===d?"end":d,g=r.useContext(v.E_),p=g.getPrefixCls,h=g.direction,y=p("ribbon",a),Z=(0,b.o2)(i,!1),O=u()(y,"".concat(y,"-placement-").concat(m),(o={},(0,f.Z)(o,"".concat(y,"-rtl"),"rtl"===h),(0,f.Z)(o,"".concat(y,"-color-").concat(i),Z),o),n),S=B(y),w=(0,e.Z)(S,2),E=w[0],x=w[1],C={},k={};return i&&!Z&&(C.background=i,k.color=i),E(r.createElement("div",{className:u()("".concat(y,"-wrapper"),x)},l,r.createElement("div",{className:u()(O,x),style:Object.assign(Object.assign({},C),c)},r.createElement("span",{className:"".concat(y,"-text")},s),r.createElement("div",{className:"".concat(y,"-corner"),style:k}))))};function z(t){var o,n=t.prefixCls,e=t.value,a=t.current,c=t.offset,i=void 0===c?0:c;return i&&(o={position:"absolute",top:"".concat(i,"00%"),left:0}),r.createElement("span",{style:o,className:u()("".concat(n,"-only-unit"),{current:a})},e)}function R(t,o,n){for(var e=t,a=0;(e+10)%10!==o;)e+=n,a+=n;return a}function T(t){var o,n,a=t.prefixCls,c=t.count,i=t.value,l=Number(i),s=Math.abs(c),d=r.useState(l),u=(0,e.Z)(d,2),m=u[0],f=u[1],g=r.useState(s),b=(0,e.Z)(g,2),p=b[0],v=b[1],h=function(){f(l),v(s)};if(r.useEffect((function(){var t=setTimeout((function(){h()}),1e3);return function(){clearTimeout(t)}}),[l]),m===l||Number.isNaN(l)||Number.isNaN(m))o=[r.createElement(z,Object.assign({},t,{key:l,current:!0}))],n={transition:"none"};else{o=[];for(var y=l+10,Z=[],O=l;O<=y;O+=1)Z.push(O);var S=Z.findIndex((function(t){return t%10===m}));o=Z.map((function(o,n){var e=o%10;return r.createElement(z,Object.assign({},t,{key:o,value:e,offset:n-S,current:n===S}))})),n={transform:"translateY(".concat(-R(m,l,p<s?1:-1),"00%)")}}return r.createElement("span",{className:"".concat(a,"-only"),style:n,onTransitionEnd:h},o)}var P=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(e=Object.getOwnPropertySymbols(t);a<e.length;a++)o.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]])}return n},H=r.forwardRef((function(t,o){var n=t.prefixCls,e=t.count,a=t.className,c=t.motionClassName,i=t.style,l=t.title,s=t.show,d=t.component,m=void 0===d?"sup":d,f=t.children,g=P(t,["prefixCls","count","className","motionClassName","style","title","show","component","children"]),b=(0,r.useContext(v.E_).getPrefixCls)("scroll-number",n),h=Object.assign(Object.assign({},g),{"data-show":s,style:i,className:u()(b,a,c),title:l}),y=e;if(e&&Number(e)%1===0){var Z=String(e).split("");y=Z.map((function(t,o){return r.createElement(T,{prefixCls:b,count:Number(e),value:t,key:Z.length-o})}))}return i&&i.borderColor&&(h.style=Object.assign(Object.assign({},i),{boxShadow:"0 0 0 1px ".concat(i.borderColor," inset")})),f?(0,p.Tm)(f,(function(t){return{className:u()("".concat(b,"-custom-component"),null===t||void 0===t?void 0:t.className,c)}})):r.createElement(m,Object.assign({},h,{ref:o}),y)})),D=H,M=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(e=Object.getOwnPropertySymbols(t);a<e.length;a++)o.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]])}return n},F=function(t,o){var n,a,c,i,l,s,d,g=t.prefixCls,h=t.scrollNumberPrefixCls,y=t.children,Z=t.status,O=t.text,S=t.color,w=t.count,E=void 0===w?null:w,x=t.overflowCount,C=void 0===x?99:x,k=t.dot,N=void 0!==k&&k,j=t.size,I=void 0===j?"default":j,z=t.title,R=t.offset,T=t.style,P=t.className,H=t.rootClassName,F=t.classNames,L=t.styles,W=t.showZero,X=void 0!==W&&W,_=M(t,["prefixCls","scrollNumberPrefixCls","children","status","text","color","count","overflowCount","dot","size","title","offset","style","className","rootClassName","classNames","styles","showZero"]),q=r.useContext(v.E_),A=q.getPrefixCls,G=q.direction,V=q.badge,Y=A("badge",g),J=B(Y),U=(0,e.Z)(J,2),$=U[0],K=U[1],Q=E>C?"".concat(C,"+"):E,tt="0"===Q||0===Q,ot=(null!==Z&&void 0!==Z||null!==S&&void 0!==S)&&(null===E||tt&&!X),nt=N&&!tt,et=nt?"":Q,at=(0,r.useMemo)((function(){return(null===et||void 0===et||""===et||tt&&!X)&&!nt}),[et,tt,X,nt]),rt=(0,r.useRef)(E);at||(rt.current=E);var ct=rt.current,it=(0,r.useRef)(et);at||(it.current=et);var lt=it.current,st=(0,r.useRef)(nt);at||(st.current=nt);var dt=(0,r.useMemo)((function(){if(!R)return Object.assign(Object.assign({},null===V||void 0===V?void 0:V.style),T);var t={marginTop:R[1]};return"rtl"===G?t.left=parseInt(R[0],10):t.right=-parseInt(R[0],10),Object.assign(Object.assign(Object.assign({},t),null===V||void 0===V?void 0:V.style),T)}),[G,R,T,null===V||void 0===V?void 0:V.style]),ut=null!==z&&void 0!==z?z:"string"===typeof ct||"number"===typeof ct?ct:void 0,mt=at||!O?null:r.createElement("span",{className:"".concat(Y,"-status-text")},O),ft=ct&&"object"===typeof ct?(0,p.Tm)(ct,(function(t){return{style:Object.assign(Object.assign({},dt),t.style)}})):void 0,gt=(0,b.o2)(S,!1),bt=u()(null===F||void 0===F?void 0:F.indicator,null===(c=null===V||void 0===V?void 0:V.classNames)||void 0===c?void 0:c.indicator,(n={},(0,f.Z)(n,"".concat(Y,"-status-dot"),ot),(0,f.Z)(n,"".concat(Y,"-status-").concat(Z),!!Z),(0,f.Z)(n,"".concat(Y,"-color-").concat(S),gt),n)),pt={};S&&!gt&&(pt.color=S,pt.background=S);var vt=u()(Y,(a={},(0,f.Z)(a,"".concat(Y,"-status"),ot),(0,f.Z)(a,"".concat(Y,"-not-a-wrapper"),!y),(0,f.Z)(a,"".concat(Y,"-rtl"),"rtl"===G),a),P,H,null===V||void 0===V?void 0:V.className,null===(i=null===V||void 0===V?void 0:V.classNames)||void 0===i?void 0:i.root,null===F||void 0===F?void 0:F.root,K);if(!y&&ot){var ht=dt.color;return $(r.createElement("span",Object.assign({},_,{className:vt,style:Object.assign(Object.assign(Object.assign({},null===L||void 0===L?void 0:L.root),null===(l=null===V||void 0===V?void 0:V.styles)||void 0===l?void 0:l.root),dt)}),r.createElement("span",{className:bt,style:Object.assign(Object.assign(Object.assign({},null===L||void 0===L?void 0:L.indicator),null===(s=null===V||void 0===V?void 0:V.styles)||void 0===s?void 0:s.indicator),pt)}),O&&r.createElement("span",{style:{color:ht},className:"".concat(Y,"-status-text")},O)))}return $(r.createElement("span",Object.assign({ref:o},_,{className:vt,style:Object.assign(Object.assign({},null===(d=null===V||void 0===V?void 0:V.styles)||void 0===d?void 0:d.root),null===L||void 0===L?void 0:L.root)}),y,r.createElement(m.ZP,{visible:!at,motionName:"".concat(Y,"-zoom"),motionAppear:!1,motionDeadline:1e3},(function(t){var o,n,e,a=t.className,c=t.ref,i=A("scroll-number",h),l=st.current,s=u()(null===F||void 0===F?void 0:F.indicator,null===(n=null===V||void 0===V?void 0:V.classNames)||void 0===n?void 0:n.indicator,(o={},(0,f.Z)(o,"".concat(Y,"-dot"),l),(0,f.Z)(o,"".concat(Y,"-count"),!l),(0,f.Z)(o,"".concat(Y,"-count-sm"),"small"===I),(0,f.Z)(o,"".concat(Y,"-multiple-words"),!l&&lt&&lt.toString().length>1),(0,f.Z)(o,"".concat(Y,"-status-").concat(Z),!!Z),(0,f.Z)(o,"".concat(Y,"-color-").concat(S),gt),o)),d=Object.assign(Object.assign(Object.assign({},null===L||void 0===L?void 0:L.indicator),null===(e=null===V||void 0===V?void 0:V.styles)||void 0===e?void 0:e.indicator),dt);return S&&!gt&&((d=d||{}).background=S),r.createElement(D,{prefixCls:i,show:!at,motionClassName:a,className:s,count:lt,title:ut,style:d,key:"scrollNumber",ref:c},ft)})),mt))},L=r.forwardRef(F);L.Ribbon=I;var W=L,X=n(1431),_={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"}}]},name:"file-text",theme:"outlined"},q=function(t,o){return r.createElement(i.Z,(0,a.Z)({},t,{ref:o,icon:_}))};var A=r.forwardRef(q),G=function(t){var o=t.icon,n=t.description,e=t.prefixCls,a=t.className,c=r.createElement("div",{className:"".concat(e,"-icon")},r.createElement(A,null));return r.createElement("div",{onClick:t.onClick,onFocus:t.onFocus,onMouseEnter:t.onMouseEnter,onMouseLeave:t.onMouseLeave,className:u()(a,"".concat(e,"-content"))},o||n?r.createElement(r.Fragment,null,o&&r.createElement("div",{className:"".concat(e,"-icon")},o),n&&r.createElement("div",{className:"".concat(e,"-description")},n)):c)},V=(0,r.memo)(G),Y=r.createContext(void 0),J=Y.Provider,U=Y,$=n(5307),K=n(8303),Q=function(t){return 0===t?0:t-Math.sqrt(Math.pow(t,2)/2)},tt=function(t){var o,n=t.componentCls,e=t.floatButtonSize,a=t.motionDurationSlow,r=t.motionEaseInOutCirc,c="".concat(n,"-group"),i=new h.E4("antFloatButtonMoveDownIn",{"0%":{transform:"translate3d(0, ".concat(e,"px, 0)"),transformOrigin:"0 0",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1}}),l=new h.E4("antFloatButtonMoveDownOut",{"0%":{transform:"translate3d(0, 0, 0)",transformOrigin:"0 0",opacity:1},"100%":{transform:"translate3d(0, ".concat(e,"px, 0)"),transformOrigin:"0 0",opacity:0}});return[(0,f.Z)({},"".concat(c,"-wrap"),Object.assign({},(0,K.R)("".concat(c,"-wrap"),i,l,a,!0))),(0,f.Z)({},"".concat(c,"-wrap"),(o={},(0,f.Z)(o,"\n          &".concat(c,"-wrap-enter,\n          &").concat(c,"-wrap-appear\n        "),{opacity:0,animationTimingFunction:r}),(0,f.Z)(o,"&".concat(c,"-wrap-leave"),{animationTimingFunction:r}),o))]},ot=function(t){var o,n,e,a=t.antCls,r=t.componentCls,c=t.floatButtonSize,i=t.margin,l=t.borderRadiusLG,s=t.borderRadiusSM,d=t.badgeOffset,u=t.floatButtonBodyPadding,m="".concat(r,"-group");return e={},(0,f.Z)(e,m,Object.assign(Object.assign({},(0,y.Wf)(t)),(o={zIndex:99,display:"block",border:"none",position:"fixed",width:c,height:"auto",boxShadow:"none",minHeight:c,insetInlineEnd:t.floatButtonInsetInlineEnd,insetBlockEnd:t.floatButtonInsetBlockEnd,borderRadius:l},(0,f.Z)(o,"".concat(m,"-wrap"),{zIndex:-1,display:"block",position:"relative",marginBottom:i}),(0,f.Z)(o,"&".concat(m,"-rtl"),{direction:"rtl"}),(0,f.Z)(o,r,{position:"static"}),o))),(0,f.Z)(e,"".concat(m,"-circle"),(0,f.Z)({},"".concat(r,"-circle:not(:last-child)"),(0,f.Z)({marginBottom:t.margin},"".concat(r,"-body"),{width:c,height:c,borderRadius:"50%"}))),(0,f.Z)(e,"".concat(m,"-square"),(n={},(0,f.Z)(n,"".concat(r,"-square"),(0,f.Z)({borderRadius:0,padding:0,"&:first-child":{borderStartStartRadius:l,borderStartEndRadius:l},"&:last-child":{borderEndStartRadius:l,borderEndEndRadius:l},"&:not(:last-child)":{borderBottom:"".concat(t.lineWidth,"px ").concat(t.lineType," ").concat(t.colorSplit)}},"".concat(a,"-badge"),(0,f.Z)({},"".concat(a,"-badge-count"),{top:-(u+d),insetInlineEnd:-(u+d)}))),(0,f.Z)(n,"".concat(m,"-wrap"),(0,f.Z)({display:"block",borderRadius:l,boxShadow:t.boxShadowSecondary},"".concat(r,"-square"),(0,f.Z)({boxShadow:"none",marginTop:0,borderRadius:0,padding:u,"&:first-child":{borderStartStartRadius:l,borderStartEndRadius:l},"&:last-child":{borderEndStartRadius:l,borderEndEndRadius:l},"&:not(:last-child)":{borderBottom:"".concat(t.lineWidth,"px ").concat(t.lineType," ").concat(t.colorSplit)}},"".concat(r,"-body"),{width:t.floatButtonBodySize,height:t.floatButtonBodySize}))),n)),(0,f.Z)(e,"".concat(m,"-circle-shadow"),{boxShadow:"none"}),(0,f.Z)(e,"".concat(m,"-square-shadow"),(0,f.Z)({boxShadow:t.boxShadowSecondary},"".concat(r,"-square"),(0,f.Z)({boxShadow:"none",padding:u},"".concat(r,"-body"),{width:t.floatButtonBodySize,height:t.floatButtonBodySize,borderRadius:s}))),e},nt=function(t){var o,n,e,a,r,c,i=t.antCls,l=t.componentCls,s=t.floatButtonBodyPadding,d=t.floatButtonIconSize,u=t.floatButtonSize,m=t.borderRadiusLG,g=t.badgeOffset,b=t.dotOffsetInSquare,p=t.dotOffsetInCircle;return c={},(0,f.Z)(c,l,Object.assign(Object.assign({},(0,y.Wf)(t)),(o={border:"none",position:"fixed",cursor:"pointer",zIndex:99,display:"block",justifyContent:"center",alignItems:"center",width:u,height:u,insetInlineEnd:t.floatButtonInsetInlineEnd,insetBlockEnd:t.floatButtonInsetBlockEnd,boxShadow:t.boxShadowSecondary,"&-pure":{position:"relative",inset:"auto"},"&:empty":{display:"none"}},(0,f.Z)(o,"".concat(i,"-badge"),(0,f.Z)({width:"100%",height:"100%"},"".concat(i,"-badge-count"),{transform:"translate(0, 0)",transformOrigin:"center",top:-g,insetInlineEnd:-g})),(0,f.Z)(o,"".concat(l,"-body"),(0,f.Z)({width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",transition:"all ".concat(t.motionDurationMid)},"".concat(l,"-content"),(0,f.Z)({overflow:"hidden",textAlign:"center",minHeight:u,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"".concat(s/2,"px ").concat(s,"px")},"".concat(l,"-icon"),{textAlign:"center",margin:"auto",width:d,fontSize:d,lineHeight:1}))),o))),(0,f.Z)(c,"".concat(l,"-rtl"),{direction:"rtl"}),(0,f.Z)(c,"".concat(l,"-circle"),(n={height:u,borderRadius:"50%"},(0,f.Z)(n,"".concat(i,"-badge"),(0,f.Z)({},"".concat(i,"-badge-dot"),{top:p,insetInlineEnd:p})),(0,f.Z)(n,"".concat(l,"-body"),{borderRadius:"50%"}),n)),(0,f.Z)(c,"".concat(l,"-square"),(e={height:"auto",minHeight:u,borderRadius:m},(0,f.Z)(e,"".concat(i,"-badge"),(0,f.Z)({},"".concat(i,"-badge-dot"),{top:b,insetInlineEnd:b})),(0,f.Z)(e,"".concat(l,"-body"),{height:"auto",borderRadius:m}),e)),(0,f.Z)(c,"".concat(l,"-default"),(0,f.Z)({backgroundColor:t.floatButtonBackgroundColor,transition:"background-color ".concat(t.motionDurationMid)},"".concat(l,"-body"),(0,f.Z)({backgroundColor:t.floatButtonBackgroundColor,transition:"background-color ".concat(t.motionDurationMid),"&:hover":{backgroundColor:t.colorFillContent}},"".concat(l,"-content"),(a={},(0,f.Z)(a,"".concat(l,"-icon"),{color:t.colorText}),(0,f.Z)(a,"".concat(l,"-description"),{display:"flex",alignItems:"center",lineHeight:"".concat(t.fontSizeLG,"px"),color:t.colorText,fontSize:t.fontSizeSM}),a)))),(0,f.Z)(c,"".concat(l,"-primary"),(0,f.Z)({backgroundColor:t.colorPrimary},"".concat(l,"-body"),(0,f.Z)({backgroundColor:t.colorPrimary,transition:"background-color ".concat(t.motionDurationMid),"&:hover":{backgroundColor:t.colorPrimaryHover}},"".concat(l,"-content"),(r={},(0,f.Z)(r,"".concat(l,"-icon"),{color:t.colorTextLightSolid}),(0,f.Z)(r,"".concat(l,"-description"),{display:"flex",alignItems:"center",lineHeight:"".concat(t.fontSizeLG,"px"),color:t.colorTextLightSolid,fontSize:t.fontSizeSM}),r)))),c},et=(0,O.Z)("FloatButton",(function(t){var o=t.colorTextLightSolid,n=t.colorBgElevated,e=t.controlHeightLG,a=t.marginXXL,r=t.marginLG,c=t.fontSize,i=t.fontSizeIcon,l=t.controlItemBgHover,s=t.paddingXXS,d=t.borderRadiusLG,u=(0,S.TS)(t,{floatButtonBackgroundColor:n,floatButtonColor:o,floatButtonHoverBackgroundColor:l,floatButtonFontSize:c,floatButtonIconSize:1.5*i,floatButtonSize:e,floatButtonInsetBlockEnd:a,floatButtonInsetInlineEnd:r,floatButtonBodySize:e-2*s,floatButtonBodyPadding:s,badgeOffset:1.5*s,dotOffsetInCircle:Q(e/2),dotOffsetInSquare:Q(d)});return[ot(u),nt(u),(0,$.J$)(t),tt(u)]})),at=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(e=Object.getOwnPropertySymbols(t);a<e.length;a++)o.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]])}return n},rt="float-btn",ct=function(t,o){var n=t.prefixCls,a=t.className,c=t.rootClassName,i=t.type,l=void 0===i?"default":i,s=t.shape,d=void 0===s?"circle":s,m=t.icon,b=t.description,p=t.tooltip,h=t.badge,y=void 0===h?{}:h,Z=at(t,["prefixCls","className","rootClassName","type","shape","icon","description","tooltip","badge"]),O=(0,r.useContext)(v.E_),S=O.getPrefixCls,w=O.direction,E=(0,r.useContext)(U),x=S(rt,n),C=et(x),k=(0,e.Z)(C,2),N=k[0],j=k[1],B=E||d,I=u()(j,x,a,c,"".concat(x,"-").concat(l),"".concat(x,"-").concat(B),(0,f.Z)({},"".concat(x,"-rtl"),"rtl"===w)),z=(0,r.useMemo)((function(){return(0,g.Z)(y,["title","children","status","text"])}),[y]),R=(0,r.useMemo)((function(){return{prefixCls:x,description:b,icon:m,type:l}}),[x,b,m,l]),T=r.createElement(X.Z,{title:p,placement:"rtl"===w?"right":"left"},r.createElement(W,Object.assign({},z),r.createElement("div",{className:"".concat(x,"-body")},r.createElement(V,Object.assign({},R)))));return N(t.href?r.createElement("a",Object.assign({ref:o},Z,{className:I}),T):r.createElement("button",Object.assign({ref:o},Z,{className:I,type:"button"}),T))};var it=r.forwardRef(ct),lt=n(2657),st=n(3285),dt=n(3433),ut=n(5314);var mt=function(t){var o,n=function(){if(null==o){for(var n=arguments.length,e=new Array(n),a=0;a<n;a++)e[a]=arguments[a];o=(0,ut.Z)(function(n){return function(){o=null,t.apply(void 0,(0,dt.Z)(n))}}(e))}};return n.cancel=function(){ut.Z.cancel(o),o=null},n},ft=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(e=Object.getOwnPropertySymbols(t);a<e.length;a++)o.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]])}return n},gt=function(t){var o=t.prefixCls,n=t.className,a=t.type,c=void 0===a?"default":a,i=t.shape,l=void 0===i?"circle":i,d=t.visibilityHeight,f=void 0===d?400:d,g=t.icon,b=void 0===g?r.createElement(s,null):g,p=t.target,h=t.onClick,y=t.duration,Z=void 0===y?450:y,O=ft(t,["prefixCls","className","type","shape","visibilityHeight","icon","target","onClick","duration"]),S=(0,r.useState)(0===f),w=(0,e.Z)(S,2),E=w[0],x=w[1],C=(0,r.useRef)(null),k=function(){return C.current&&C.current.ownerDocument?C.current.ownerDocument:window},N=mt((function(t){var o=(0,lt.Z)(t.target,!0);x(o>=f)}));(0,r.useEffect)((function(){var t=(p||k)();return N({target:t}),null===t||void 0===t||t.addEventListener("scroll",N),function(){N.cancel(),null===t||void 0===t||t.removeEventListener("scroll",N)}}),[p]);var j=function(t){(0,st.Z)(0,{getContainer:p||k,duration:Z}),null===h||void 0===h||h(t)},B=(0,r.useContext)(v.E_).getPrefixCls,I=B(rt,o),z=B(),R=et(I),T=(0,e.Z)(R,1)[0],P=(0,r.useContext)(U)||l,H=Object.assign({prefixCls:I,icon:b,type:c,shape:P},O);return T(r.createElement(m.ZP,{visible:E,motionName:"".concat(z,"-fade")},(function(t){var o=t.className;return r.createElement(it,Object.assign({ref:C},H,{onClick:j,className:u()(n,o)}))})))};var bt=(0,r.memo)(gt),pt=n(732),vt=n(5179),ht=function(t){var o,n=t.prefixCls,a=t.className,c=t.style,i=t.shape,l=void 0===i?"circle":i,s=t.type,d=void 0===s?"default":s,g=t.icon,b=void 0===g?r.createElement(A,null):g,p=t.closeIcon,h=void 0===p?r.createElement(pt.Z,null):p,y=t.description,Z=t.trigger,O=t.children,S=t.onOpenChange,w=(0,r.useContext)(v.E_),E=w.direction,x=(0,w.getPrefixCls)(rt,n),C=et(x),k=(0,e.Z)(C,2),N=k[0],j=k[1],B="".concat(x,"-group"),I=u()(B,j,a,(o={},(0,f.Z)(o,"".concat(B,"-rtl"),"rtl"===E),(0,f.Z)(o,"".concat(B,"-").concat(l),l),(0,f.Z)(o,"".concat(B,"-").concat(l,"-shadow"),!Z),o)),z=u()(j,"".concat(B,"-wrap")),R=(0,vt.Z)(!1,{value:t.open}),T=(0,e.Z)(R,2),P=T[0],H=T[1],D=(0,r.useRef)(null),M=(0,r.useRef)(null),F=(0,r.useMemo)((function(){return"hover"===Z?{onMouseEnter:function(){H(!0),null===S||void 0===S||S(!0)},onMouseLeave:function(){H(!1),null===S||void 0===S||S(!1)}}:{}}),[Z]),L=(0,r.useCallback)((function(t){var o,n;(null===(o=D.current)||void 0===o?void 0:o.contains(t.target))?(null===(n=M.current)||void 0===n?void 0:n.contains(t.target))&&H((function(t){return null===S||void 0===S||S(!t),!t})):(H(!1),null===S||void 0===S||S(!1))}),[Z]);return(0,r.useEffect)((function(){if("click"===Z)return document.addEventListener("click",L),function(){document.removeEventListener("click",L)}}),[Z]),N(r.createElement(J,{value:l},r.createElement("div",Object.assign({ref:D,className:I,style:c},F),Z&&["click","hover"].includes(Z)?r.createElement(r.Fragment,null,r.createElement(m.ZP,{visible:P,motionName:"".concat(B,"-wrap")},(function(t){var o=t.className;return r.createElement("div",{className:u()(o,z)},O)})),r.createElement(it,{ref:M,type:d,shape:l,icon:P?h:b,description:y,"aria-label":t["aria-label"]})):O)))},yt=(0,r.memo)(ht),Zt=function(t,o){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(n[e]=t[e]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(e=Object.getOwnPropertySymbols(t);a<e.length;a++)o.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]])}return n},Ot=function(t){var o=t.backTop,n=Zt(t,["backTop"]);return o?r.createElement(bt,Object.assign({},n,{visibilityHeight:0})):r.createElement(it,Object.assign({},n))},St=function(t){var o=t.className,n=t.items,e=Zt(t,["className","items"]),a=e.prefixCls,c=(0,r.useContext(v.E_).getPrefixCls)(rt,a),i="".concat(c,"-pure");return n?r.createElement(yt,Object.assign({className:u()(o,i)},e),n.map((function(t,o){return r.createElement(Ot,Object.assign({key:o},t))}))):r.createElement(Ot,Object.assign({className:u()(o,i)},e))};it.BackTop=bt,it.Group=yt,it._InternalPanelDoNotUseOrYouWillBeFired=St;var wt=it}}]);
//# sourceMappingURL=925.381320f6.chunk.js.map