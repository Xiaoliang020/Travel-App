"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[23],{4023:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var r=n(9439),a=n(2791),o=n(17),i=n(7027),c=n(7309),d=n(3218),s=n(8544),l=n(7689),u=n(1243),p=n(184);function h(){var t=(0,a.useState)([]),e=(0,r.Z)(t,2),n=e[0],h=e[1],f=((0,l.s0)(),JSON.parse(sessionStorage.getItem("user"))),m="https://travel-app.online:8443";(0,a.useEffect)((function(){u.Z.get("".concat(m,"/api/paths/").concat(f.id)).then((function(t){console.log(t.data),h(t.data.data)})).catch((function(t){console.error("Error retrieving paths:",t)}))}),[]);var v=function(t){var e=function(){var t=window.location.protocol,e=window.location.hostname,n=window.location.port,r=(window.location.pathname,n&&"80"!==n&&"443"!==n?":".concat(n):"");return"".concat(t,"//").concat(e).concat(r)}();console.log(e);var n=e+"/share/".concat(t);navigator.clipboard.writeText(n).then((function(){i.ZP.success("Shareable link copied to clipboard! "+n)})).catch((function(t){console.error("Failed to copy link to clipboard:",t),i.ZP.error("Failed to copy link to clipboard. Please try again.")}))},w=[{title:"Path Name",dataIndex:"name",key:"name"},{title:"Start place & time",dataIndex:"start",key:"start",render:function(t,e){return(0,p.jsxs)("div",{children:[(0,p.jsxs)("p",{children:["Time: ",new Date(e.startTime).toLocaleString()]}),(0,p.jsxs)("p",{children:["Place: ",e.startAddress]})]})},sorter:function(t,e){return new Date(t.startTime)-new Date(e.startTime)}},{title:"End place & time",dataIndex:"end",key:"end",render:function(t,e){return(0,p.jsxs)("div",{children:[(0,p.jsxs)("p",{children:["Time: ",new Date(e.endTime).toLocaleString()]}),(0,p.jsxs)("p",{children:["Place: ",e.endAddress]})]})},sorter:function(t,e){return new Date(t.endTime)-new Date(e.endTime)}},{title:"Duration",dataIndex:"duration",key:"duration",render:function(t,e){return(0,p.jsx)("div",{children:x(e.duration)})},sorter:function(t,e){return t.duration-e.duration}},{title:"Action",key:"action",render:function(t,e){return(0,p.jsxs)("div",{children:[(0,p.jsx)(c.ZP,{onClick:function(){return t=e.id,void window.open("/share/".concat(t));var t},children:"Display on map"}),(0,p.jsx)(c.ZP,{onClick:function(){return t=e.id,void o.Z.confirm({centered:!0,title:"Confirm Deletion",content:"Are you sure you want to delete this path?",onOk:function(){console.log(t);var e={pathId:t};u.Z.post("".concat(m,"/api/paths-delete"),e).then((function(t){"0"===t.data.code?(console.log("Delete successful!",t.data),i.ZP.success("Delete success!"),window.location.reload()):"-1"===t.data.code&&console.error("Delete failed:",t.data.msg)}))}});var t},children:"Delete"}),(0,p.jsx)(c.ZP,{onClick:function(){return v(e.id)},children:"Share"})]})}}],x=function(t){var e=Math.floor(t/3600),n=Math.floor(t%3600/60),r=Math.round(t%60);return"".concat(e.toString().padStart(2,"0"),":").concat(n.toString().padStart(2,"0"),":").concat(r.toString().padStart(2,"0"))},k=n.map((function(t,e){return{key:e+1,id:t.id,path:t.path,startTime:t.startTime,endTime:t.endTime,duration:t.duration,startAddress:t.startAddress,endAddress:t.endAddress,name:t.name}}));return(0,p.jsx)("div",{children:(0,p.jsx)("div",{children:(0,p.jsx)(d.Z,{title:"Saved Paths",children:(0,p.jsx)(s.Z,{columns:w,dataSource:k})})})})}}}]);
//# sourceMappingURL=23.049fbef7.chunk.js.map