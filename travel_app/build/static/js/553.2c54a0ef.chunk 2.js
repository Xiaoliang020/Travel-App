"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[553],{5245:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var r=t(4165),c=t(5861),o=t(9439),s=t(2791),a=t(184);function u(){var e=(0,s.useState)(""),n=(0,o.Z)(e,2),t=n[0],u=n[1];(0,s.useEffect)((function(){fetch("/hello").then((function(e){return e.text()})).then((function(e){return u(e)})).catch((function(e){return console.error("Error:",e)}))}),[]);var i=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/print",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:"Hello, Backend"})});case 3:e.sent.ok?console.log("Message sent to backend successfully"):console.log("Failed to send message to backend"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Error:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:t}),(0,a.jsx)("button",{onClick:i,children:"Send Message to Backend"})]})}}}]);
//# sourceMappingURL=553.2c54a0ef.chunk.js.map