"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[736],{5736:function(t,e,n){n.r(e),n.d(e,{default:function(){return c}});var r=n(2791),a=n(1656),d=n(1913),i=n(3327),s=n(7689),o=n(184);function c(){var t=(0,r.useContext)(d.Z),e=t.savedPaths,n=t.setDisplayedPath,c=(0,r.useContext)(i.N),u=c.theme,l=c.setTheme,h=(0,s.s0)(),p=[{title:"Path ID",dataIndex:"key",key:"key"},{title:"Start place & time",dataIndex:"start",key:"start",render:function(t,e){return(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{children:["\u5f00\u59cb\u65f6\u95f4: ",e.startTime.toString()]}),(0,o.jsxs)("p",{children:["\u5f00\u59cb\u5730\u70b9: ",e.startAddress]})]})}},{title:"End place & time",dataIndex:"end",key:"end",render:function(t,e){return(0,o.jsxs)("div",{children:[(0,o.jsxs)("p",{children:["\u7ed3\u675f\u65f6\u95f4: ",e.endTime.toString()]}),(0,o.jsxs)("p",{children:["\u7ed3\u675f\u5730\u70b9: ",e.endAddress]})]})}},{title:"Duration",dataIndex:"duration",key:"duration",render:function(t,e){return(0,o.jsx)("div",{children:x(e.duration)})}},{title:"Action",key:"action",render:function(t,e){return(0,o.jsx)("button",{onClick:function(){return t=e.path,n(t),void h("/map");var t},children:"Display on map"})}}],x=function(t){var e=Math.floor(t/3600),n=Math.floor(t%3600/60),r=Math.round(t%60);return"".concat(e.toString().padStart(2,"0"),":").concat(n.toString().padStart(2,"0"),":").concat(r.toString().padStart(2,"0"))},f=e.map((function(t,e){return{key:e+1,path:t.path,startTime:t.startTime,endTime:t.endTime,duration:t.duration,startAddress:t.startAddress,endAddress:t.endAddress}}));return(0,o.jsxs)("div",{children:[(0,o.jsx)("h2",{children:"Saved Paths"}),(0,o.jsx)(a.Z,{columns:p,dataSource:f}),(0,o.jsx)("label",{children:"Select Theme:"}),(0,o.jsxs)("select",{value:u,onChange:function(t){var e=t.target.value;l(e)},children:[(0,o.jsx)("option",{value:"default",children:"Default"}),(0,o.jsx)("option",{value:"Night Mode",children:"Dark"})]})]})}}}]);
//# sourceMappingURL=736.04c38e3f.chunk.js.map