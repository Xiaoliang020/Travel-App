"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[362],{4362:function(a,e,t){t.r(e);var n=t(9439),r=t(2791),s=t(7993),c=t(7689),o=t(1243),i=(t(3508),t(184));e.default=function(){var a=(0,c.UO)().pathId,e=(0,r.useState)(null),t=(0,n.Z)(e,2),d=t[0],l=t[1],p=(0,r.useState)([]),h=(0,n.Z)(p,2),u=h[0],m=h[1],f=(0,r.useState)(15),g=(0,n.Z)(f,2),v=g[0],k=(g[1],(0,r.useState)(!1)),j=(0,n.Z)(k,2),x=j[0],S=j[1],A=(0,s.Db)({googleMapsApiKey:"AIzaSyA1ythArpYzyCd9fOmJ9c3iIXCB83eAnfE"}).isLoaded,C="https://travel-app.online:8443";(0,r.useEffect)((function(){o.Z.get("".concat(C,"/api/share/").concat(a)).then((function(a){l(a.data.data),console.log("Successfully retrive shared path:",a.data.data)})).catch((function(a){console.error("Error retrieving shared path:",a)})),o.Z.get("".concat(C,"/api/share/marker/").concat(a)).then((function(a){console.log(a.data.data);var e=a.data.data;Promise.all(e.map((function(a){return o.Z.get("".concat(C,"/api/icon/").concat(a.icon)).then((function(e){if("0"===e.data.code){console.log("Marker data get successfully",e.data);var t=e.data.data,n={url:"data:image/png;base64,".concat(t),scaledSize:new window.google.maps.Size(64,64)};a.url=n}})).catch((function(a){console.log("Error getting marker icon from the backend:",a)}))}))).then((function(){m(e),S(!0)}))})).catch((function(a){console.error("Error retrieving shared markers:",a)}))}),[a]);if(!d||!x||!A)return(0,i.jsx)("div",{children:"Loading..."});var y={lat:d.path[0].lat,lng:d.path[0].lng},E=d.path;return A?(0,i.jsxs)("div",{className:"map-view",children:[(0,i.jsxs)("h1",{children:["Path Name: ",d.name]}),(0,i.jsxs)("p",{children:["Start Address: ",d.startAddress]}),(0,i.jsxs)("p",{children:["End Address: ",d.endAddress]}),(0,i.jsxs)("p",{children:["Start Time: ",d.startTime]}),(0,i.jsxs)("p",{children:["End Time: ",d.endTime]}),(0,i.jsx)("div",{className:"map-container",children:x&&A&&(0,i.jsxs)(s.b6,{center:y,zoom:v,mapContainerClassName:"map-container",children:[(0,i.jsx)(s.dp,{path:E,options:{strokeColor:"#5900FF",strokeOpacity:1,strokeWeight:5}}),u.map((function(a,e){return(0,i.jsx)(s.jC,{position:{lat:a.markerLat,lng:a.markerLng},icon:a.url,onClick:function(){}},a.id)}))]})})]}):(0,i.jsx)("div",{children:"Loading.."})}}}]);
//# sourceMappingURL=362.bace4521.chunk.js.map