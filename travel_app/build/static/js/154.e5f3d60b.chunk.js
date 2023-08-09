"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[154],{5154:function(e,t,a){a.r(t),a.d(t,{default:function(){return E}});var n=a(3433),o=a(9439),r=a(2791),c=a(7462),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"}}]},name:"message",theme:"outlined"},l=a(4291),s=function(e,t){return r.createElement(l.Z,(0,c.Z)({},e,{ref:t,icon:i}))};var d=r.forwardRef(s),u={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"}}]},name:"form",theme:"outlined"},m=function(e,t){return r.createElement(l.Z,(0,c.Z)({},e,{ref:t,icon:u}))};var p=r.forwardRef(m),f=a(1046),h=a(7846),v=a(7027),g=a(6005),x=a(8715),Z=a(2962),j=a(5925),y=a(17),w=a(9555),b=a(1087),S=a(1243),C=a(184),z=function(e){var t=e.icon,a=e.text;return(0,C.jsxs)(f.Z,{children:[r.createElement(t),a]})};function E(){var e=sessionStorage.getItem("user")||"{}",t=JSON.parse(e),a="https://travel-app.online:8443",c=(0,r.useState)(!0),i=(0,o.Z)(c,2),l=i[0],s=i[1],u=(0,r.useState)(!1),m=(0,o.Z)(u,2),f=m[0],E=m[1],O=h.Z.useForm(),N=(0,o.Z)(O,1)[0],P=(0,r.useState)([]),k=(0,o.Z)(P,2),I=k[0],M=k[1],L=(0,r.useState)(""),A=(0,o.Z)(L,2),D=A[0],F=A[1],B=(0,r.useState)([]),G=(0,o.Z)(B,2),R=(G[0],G[1]),T=(0,r.useState)([]),_=(0,o.Z)(T,2),q=_[0],H=_[1],V=(0,r.useState)(""),U=(0,o.Z)(V,2),W=U[0],J=U[1],K=I.filter((function(e){return"".concat(t.username," ").concat(e.title," ").concat(e.content," ").toLowerCase().includes(W.toLowerCase())})),Q=function(){var e=window.location.protocol,t=window.location.hostname,a=window.location.port,n=a&&"80"!==a&&"443"!==a?":".concat(a):"";return"".concat(e,"//").concat(t).concat(n)}(),X=function(){s(!0),S.Z.get("".concat(a,"/api/posts")).then((function(e){if("0"===e.data.code){console.log("Successfully fetched post data",e.data.data);var t=e.data.data,o=t.map((function(e){return S.Z.get("".concat(a,"/api/avatar/").concat(e.userid)).then((function(t){if("0"===t.data.code){var a=t.data.data;e.avatar="data:image/png;base64,".concat(a)}})).catch((function(e){console.error("Error fetching user avatar:",e)}))})),r=t.map((function(e){return S.Z.get("".concat(a,"/api/screenshot/").concat(e.pathid)).then((function(t){if("0"===t.data.code){var a=t.data.data;e.screenshot="data:image/png;base64,".concat(a)}})).catch((function(e){console.error("Error fetching user screenshot:",e)}))}));Promise.all([].concat((0,n.Z)(o),(0,n.Z)(r))).then((function(){t.sort((function(e,t){return new Date(t.createdAt)-new Date(e.createdAt)})),M(t),console.log("Post Data: ",t)})).catch((function(e){console.error("Error fetching user avatars:",e)}))}else console.log("Error fetching post data:",e.data.message);s(!1)})).catch((function(e){console.error("Error fetching post data:",e),s(!1)}))},Y=function(e){var t=new Date(e),a=(new Date).getTime()-t.getTime(),n=Math.floor(a/1e3),o=Math.floor(a/6e4),r=Math.floor(a/36e5),c=Math.floor(a/864e5);return c>0?"".concat(c," ").concat(1===c?"day":"days"," ago"):r>0?"".concat(r," ").concat(1===r?"hour":"hours"," ago"):o>0?"".concat(o," ").concat(1===o?"minute":"minutes"," ago"):"".concat(n," ").concat(1===n?"second":"seconds"," ago")};(0,r.useEffect)((function(){X()}),[]),(0,r.useEffect)((function(){S.Z.get("".concat(a,"/api/paths/").concat(t.id)).then((function(e){console.log(e.data),R(e.data.data);var t=e.data.data.map((function(e){return{value:e.id,label:e.name}}));H(t)})).catch((function(e){console.error("Error retrieving paths:",e)}))}),[]);return(0,C.jsxs)("div",{className:"community",children:[(0,C.jsx)(g.Z,{placeholder:"Search for posts...",value:W,onChange:function(e){return J(e.target.value)},style:{marginBottom:"20px"}}),l?(0,C.jsx)("div",{children:"Loading..."}):(0,C.jsx)(x.Z,{itemLayout:"vertical",size:"large",pagination:{onChange:function(e){console.log(e)},pageSize:3},dataSource:K,footer:(0,C.jsxs)("div",{children:[(0,C.jsx)("b",{children:"travel app"})," footer part"]}),renderItem:function(e){return(0,C.jsx)(b.rU,{to:"/post/".concat(e.id),children:(0,C.jsxs)(x.Z.Item,{className:"post-item",actions:[(0,C.jsx)(z,{icon:d,text:e.comments?e.comments.length:0},"list-vertical-message")],extra:e.pathid?(0,C.jsx)("a",{href:"".concat(Q,"/share/").concat(e.pathid),target:"_blank",rel:"noopener noreferrer",children:(0,C.jsx)("img",{width:272,alt:"logo",src:e.screenshot,onClick:function(e){return e.stopPropagation()}})}):(0,C.jsx)("img",{width:272,alt:"logo",src:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}),children:[(0,C.jsx)("div",{children:(0,C.jsx)(x.Z.Item.Meta,{avatar:(0,C.jsx)(Z.C,{src:e.avatar}),title:e.username,description:(0,C.jsx)(C.Fragment,{children:"Posted ".concat(Y(e.createdAt))})})}),(0,C.jsxs)("div",{className:"post-content",style:{textAlign:"left"},children:[(0,C.jsx)("div",{style:{fontSize:"larger",fontWeight:"bold"},children:e.title}),(0,C.jsx)("br",{}),e.content]})]},e.title)})}}),(0,C.jsx)(j.Z.Group,{shape:"circle",style:{left:250,top:"95%",transform:"translateY(-50%)"},children:(0,C.jsx)(j.Z,{icon:(0,C.jsx)(p,{}),tooltip:"Make a Post",onClick:function(){E(!0)}})}),(0,C.jsx)(y.Z,{title:"Make a Post",open:f,onCancel:function(){E(!1)},onOk:function(){N.validateFields().then((function(e){var n={title:e.title,content:e.content,userid:t.id,username:t.username,avatarid:t.avatarUrl,pathid:D},o=new Date;n.createdAt=o.toISOString(),console.log(n),S.Z.post("".concat(a,"/api/make-post"),n).then((function(e){"0"===e.data.code?(console.log("Post saved successfully:",e.data),X()):v.ZP.error("Failed to make a post")})).catch((function(e){console.error("Error saving post:",e)})),E(!1),N.resetFields(),F("")}))},children:(0,C.jsxs)(h.Z,{form:N,layout:"vertical",children:[(0,C.jsx)(h.Z.Item,{label:"Title",name:"title",rules:[{required:!0,message:"Please enter a title"}],children:(0,C.jsx)(g.Z,{})}),(0,C.jsx)(h.Z.Item,{label:"Content",name:"content",rules:[{required:!0,message:"Please enter the content"}],children:(0,C.jsx)(g.Z.TextArea,{})}),(0,C.jsx)(h.Z.Item,{label:"Select a path",children:(0,C.jsx)(w.Z,{showSearch:!0,style:{width:200},placeholder:"Search to Select",optionFilterProp:"children",filterOption:function(e,t){var a;return(null!==(a=null===t||void 0===t?void 0:t.label)&&void 0!==a?a:"").includes(e)},filterSort:function(e,t){var a,n;return(null!==(a=null===e||void 0===e?void 0:e.label)&&void 0!==a?a:"").toLowerCase().localeCompare((null!==(n=null===t||void 0===t?void 0:t.label)&&void 0!==n?n:"").toLowerCase())},options:q,value:D,onChange:F})})]})})]})}},1046:function(e,t,a){a.d(t,{Z:function(){return j}});var n=a(4942),o=a(9439),r=a(1694),c=a.n(r),i=a(5501),l=a(2791),s=a(9911),d=a(1929),u=a(11),m=l.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),p=m.Provider,f=function(e){var t=e.className,a=e.direction,o=e.index,r=e.marginDirection,c=e.children,i=e.split,s=e.wrap,d=e.style,u=l.useContext(m),p=u.horizontalSize,f=u.verticalSize,h=u.latestIndex,v={};return u.supportFlexGap||("vertical"===a?o<h&&(v={marginBottom:p/(i?2:1)}):v=Object.assign(Object.assign({},o<h&&(0,n.Z)({},r,p/(i?2:1))),s&&{paddingBottom:f})),null===c||void 0===c?null:l.createElement(l.Fragment,null,l.createElement("div",{className:t,style:Object.assign(Object.assign({},v),d)},c),o<h&&i&&l.createElement("span",{className:"".concat(t,"-split"),style:v},i))},h=a(1294),v=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a},g={small:8,middle:16,large:24};var x=l.forwardRef((function(e,t){var a,r,u,m=l.useContext(d.E_),x=m.getPrefixCls,Z=m.space,j=m.direction,y=e.size,w=void 0===y?(null===Z||void 0===Z?void 0:Z.size)||"small":y,b=e.align,S=e.className,C=e.rootClassName,z=e.children,E=e.direction,O=void 0===E?"horizontal":E,N=e.prefixCls,P=e.split,k=e.style,I=e.wrap,M=void 0!==I&&I,L=e.classNames,A=e.styles,D=v(e,["size","align","className","rootClassName","children","direction","prefixCls","split","style","wrap","classNames","styles"]),F=(0,s.Z)(),B=l.useMemo((function(){return(Array.isArray(w)?w:[w,w]).map((function(e){return function(e){return"string"===typeof e?g[e]:e||0}(e)}))}),[w]),G=(0,o.Z)(B,2),R=G[0],T=G[1],_=(0,i.Z)(z,{keepEmpty:!0}),q=void 0===b&&"horizontal"===O?"center":b,H=x("space",N),V=(0,h.Z)(H),U=(0,o.Z)(V,2),W=U[0],J=U[1],K=c()(H,null===Z||void 0===Z?void 0:Z.className,J,"".concat(H,"-").concat(O),(a={},(0,n.Z)(a,"".concat(H,"-rtl"),"rtl"===j),(0,n.Z)(a,"".concat(H,"-align-").concat(q),q),a),S,C),Q=c()("".concat(H,"-item"),null!==(r=null===L||void 0===L?void 0:L.item)&&void 0!==r?r:null===(u=null===Z||void 0===Z?void 0:Z.classNames)||void 0===u?void 0:u.item),X="rtl"===j?"marginLeft":"marginRight",Y=0,$=_.map((function(e,t){var a,n;null!==e&&void 0!==e&&(Y=t);var o=e&&e.key||"".concat(Q,"-").concat(t);return l.createElement(f,{className:Q,key:o,direction:O,index:t,marginDirection:X,split:P,wrap:M,style:null!==(a=null===A||void 0===A?void 0:A.item)&&void 0!==a?a:null===(n=null===Z||void 0===Z?void 0:Z.styles)||void 0===n?void 0:n.item},e)})),ee=l.useMemo((function(){return{horizontalSize:R,verticalSize:T,latestIndex:Y,supportFlexGap:F}}),[R,T,Y,F]);if(0===_.length)return null;var te={};return M&&(te.flexWrap="wrap",F||(te.marginBottom=-T)),F&&(te.columnGap=R,te.rowGap=T),W(l.createElement("div",Object.assign({ref:t,className:K,style:Object.assign(Object.assign(Object.assign({},te),null===Z||void 0===Z?void 0:Z.style),k)},D),l.createElement(p,{value:ee},$)))}));var Z=x;Z.Compact=u.ZP;var j=Z}}]);
//# sourceMappingURL=154.e5f3d60b.chunk.js.map