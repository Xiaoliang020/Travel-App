"use strict";(self.webpackChunktravel_app=self.webpackChunktravel_app||[]).push([[445],{445:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var o=n(1413),r=n(4165),l=n(3433),a=n(5861),s=n(9439),i=n(2791),c=n(7993),u=(n(3508),n(3152)),p=n(7309),d=n(5925),f=n(2879),g=n(1913),y=n(3327),h=n(1515),m=n(2273),x=n(1891),Z=n(8272),v=n(4215),T=n(9286),j=n(2056),k=n(2365),w=n(9951),b=n(5498),C=n.n(b),S=n(184);function P(){var e=(0,i.useState)([]),t=(0,s.Z)(e,2),n=t[0],b=t[1],P=(0,i.useState)(!1),L=(0,s.Z)(P,2),A=L[0],I=L[1],O=(0,i.useState)(0),D=(0,s.Z)(O,2),E=D[0],F=D[1],N=(0,i.useState)({lat:null,lng:null}),R=(0,s.Z)(N,2),G=R[0],z=R[1],_=(0,i.useState)(!0),q=(0,s.Z)(_,2),B=q[0],M=q[1],W=(0,i.useState)(null),Y=(0,s.Z)(W,2),H=Y[0],V=Y[1],K=(0,i.useState)(14),U=(0,s.Z)(K,2),X=U[0],J=U[1],Q=(0,i.useContext)(g.Z),$=Q.addPath,ee=Q.displayedPath,te=Q.setDisplayedPath,ne=(0,i.useContext)(y.N).theme,oe=(0,c.Db)({googleMapsApiKey:"AIzaSyAwnNq68eny2SDMxe4og-nRYvrB_jXAP-g"}).isLoaded,re=(0,i.useState)(!1),le=(0,s.Z)(re,2),ae=le[0],se=le[1];function ie(){return new Promise((function(e,t){navigator.geolocation.getCurrentPosition((function(t){var n=t.coords,o=n.latitude,r=n.longitude;e({latitude:o,longitude:r})}),(function(e){t(e)}))}))}function ce(e){return ue.apply(this,arguments)}function ue(){return ue=(0,a.Z)((0,r.Z)().mark((function e(t){var n,o,a,s,i,c,u,p,d,f;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){setTimeout((function(){e()}),1e3)}));case 2:return e.next=4,ie();case 4:return n=e.sent,o=n.latitude,a=n.longitude,console.log({firstLat:o,firstLng:a}),e.next=10,new Promise((function(e){setTimeout((function(){e()}),1e3)}));case 10:return e.next=12,ie();case 12:return s=e.sent,i=s.latitude,c=s.longitude,console.log({secondLat:i,secondLng:c}),e.next=18,new Promise((function(e){setTimeout((function(){e()}),1e3)}));case 18:return e.next=20,ie();case 20:u=e.sent,p=u.latitude,d=u.longitude,console.log({thirdLat:p,thirdLng:d}),f={latitude:(o+i+p)/3,longitude:(a+c+d)/3},b((function(e){return[].concat((0,l.Z)(e),[{lat:f.latitude,lng:f.longitude,type:"default",pathId:t}])})),z({lat:f.latitude,lng:f.longitude}),console.log(f);case 28:case"end":return e.stop()}}),e)}))),ue.apply(this,arguments)}(0,i.useEffect)((function(){navigator.geolocation?navigator.geolocation.getCurrentPosition((function(e){V({lat:e.coords.latitude,lng:e.coords.longitude})}),(function(e){console.error("Error retrieving geolocation:",e),V({lat:40.7128,lng:-74.006})})):V({lat:40.7128,lng:-74.006})}),[]),(0,i.useEffect)((function(){ee&&ee.length>0?(V(ee[0]),J(15)):n.length>0&&V(n[n.length-1])}),[ee,n]),(0,i.useEffect)((function(){var e;return A&&(navigator.geolocation.getCurrentPosition((function(e){var t=e.coords,n=t.latitude,o=t.longitude;b((function(e){return[].concat((0,l.Z)(e),[{lat:n,lng:o,type:"default",pathId:E}])})),z({lat:n,lng:o}),console.log("Got first location after click the button")}),(function(e){console.error("Error retrieving geolocation:",e)})),e=setInterval((0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Start Marking"),e.next=3,ce(E);case 3:console.log("Get a location"),console.log(E);case 5:case"end":return e.stop()}}),e)}))),8e3)),function(){return clearInterval(e)}}),[A,E]);var pe=n.reduce((function(e,t){return(e[t.pathId]=e[t.pathId]||[]).push(t),e}),{}),de=function(){M(!B)},fe=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:se(!0),t=document.querySelector(".map-container"),C()(t,{useCORS:!0,allowTaint:!0}).then((function(e){var t=document.createElement("a");t.href=e.toDataURL("image/png"),t.download="screenshot.png",t.click(),se(!1)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ge=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:se(!0),t=document.querySelector(".map-container"),C()(t,{useCORS:!0,allowTaint:!0}).then((function(e){e.toBlob((function(e){if(e){var t=new File([e],"screenshot.png",{type:"image/png"});navigator.share?navigator.share({files:[t]}):console.error("Web Share API not supported.")}else console.error("Failed to generate screenshot blob.");se(!1)}))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return oe?(0,S.jsx)("div",{className:"map-view",children:(0,S.jsxs)("div",{className:"map-container",children:[(0,S.jsxs)(c.b6,{center:H,zoom:X,mapContainerClassName:"map-container",options:(0,o.Z)({fullscreenControl:!1,streetViewControl:!1},"default"===ne?{}:{fullscreenControl:!1,streetViewControl:!1,styles:[{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#263c3f"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#6b9a76"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#212a37"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#9ca5b3"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#746855"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#1f2835"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#f3d19c"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#515c6d"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}]}),children:[B&&Object.values(pe).map((function(e,t){return(0,S.jsx)(c.dp,{path:e,options:{strokeColor:"#0000FF",strokeOpacity:1,strokeWeight:5}},t)})),ee&&B&&(0,S.jsx)(c.dp,{path:ee,options:{strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:5}}),n.map((function(e,t){return(0,S.jsx)(c.jC,{position:e,visible:"custom"===e.type,icon:"custom"===e.type?{url:"https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png"}:null},t)}))]}),(0,S.jsx)("div",{className:"map-view-start-stop-button",children:A?(0,S.jsx)(p.ZP,{type:"primary",shape:"round",size:"large",onClick:function(){I(!1),console.log("Stop tracking"),u.Z.confirm({centered:!0,title:"Do you want to save this path?",onOk:function(){$(n)}})},icon:(0,S.jsx)(h.Z,{}),style:{backgroundColor:"OrangeRed"},children:"STOP"}):(0,S.jsx)(p.ZP,{type:"primary",shape:"round",size:"large",onClick:function(){b([]),I(!0),F(E+1),console.log("Start tracking")},icon:(0,S.jsx)(m.Z,{}),style:{backgroundColor:"LimeGreen"},children:"START"})}),(0,S.jsxs)(d.Z.Group,{shape:"circle",style:{left:24},children:[(0,S.jsx)(f.Z,{title:(0,S.jsxs)("div",{children:[(0,S.jsx)("h1",{children:"Your current location:"}),(0,S.jsxs)("p",{children:["Latitude: ",G.lat," "]}),(0,S.jsxs)("p",{children:["Longitude: ",G.lng]})]}),placement:"right",color:"#87d068",children:(0,S.jsx)(d.Z,{icon:(0,S.jsx)(x.Z,{})})}),(0,S.jsx)(d.Z.BackTop,{visibilityHeight:0})]}),(0,S.jsxs)(d.Z.Group,{shape:"circle",style:{right:50,top:"60%",transform:"translateY(-50%)"},children:[B?(0,S.jsx)(d.Z,{icon:(0,S.jsx)(Z.Z,{}),tooltip:"Hide Paths",onClick:de}):(0,S.jsx)(d.Z,{icon:(0,S.jsx)(v.Z,{}),tooltip:"Show Paths",onClick:de}),(0,S.jsx)(d.Z,{icon:(0,S.jsx)(T.Z,{}),tooltip:"Add a Point",onClick:function(){var e={lat:G.lat,lng:G.lng,type:"custom",id:Date.now()};b((function(t){return[].concat((0,l.Z)(t),[e])})),console.log("Add an information point")},disabled:!A}),(0,S.jsx)(d.Z,{icon:(0,S.jsx)(j.Z,{}),tooltip:"Clear",onClick:function(){b([]),F(0),te([])},disabled:A}),(0,S.jsx)(d.Z,{icon:(0,S.jsx)(k.Z,{}),tooltip:"Take Screenshot",onClick:fe,disabled:ae}),(0,S.jsx)(d.Z,{icon:(0,S.jsx)(w.Z,{}),tooltip:"Share",onClick:ge,disabled:ae})]})]})}):(0,S.jsx)("div",{children:"Loading.."})}}}]);
//# sourceMappingURL=445.d315306f.chunk.js.map