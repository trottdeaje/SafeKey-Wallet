(this.webpackJsonp=this.webpackJsonp||[]).push([[17],{434:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),o=n(4),i=n.n(o),c=n(0),s=n.n(c),l=n(52),d=n(2),u=n(83),f=n(26),m=n(319),g=n(70),b=n(22),p=n(39),y=n(332),w=n.n(y),h=n(157),x=n(37),E=Object(p.a)((function(){return n.e(10).then(n.t.bind(null,422,7))})),S=f.a.get("window"),k=f.a.get("screen");t.default=function(e){var t=e.navigation,n=Object(c.useState)(!1),a=r()(n,2),o=a[0],p=a[1],y=Object(c.useState)("environment"),v=r()(y,2),C=v[0],O=v[1],A=Object(c.useState)(!1),B=r()(A,2),I=B[0],L=B[1],R=Object(c.useState)({window:S,screen:k}),j=r()(R,2),N=j[0],K=j[1],T=Object(h.b)(),D=function(e){var t=e.window,n=e.screen;K({window:t,screen:n})};Object(c.useEffect)((function(){return f.a.addEventListener("change",D),function(){f.a.removeEventListener("change",D)}}));return s.a.createElement(d.a,{style:[x.a.container,{backgroundColor:"#000",marginBottom:0}]},s.a.createElement(d.a,{style:[x.a.center,{backgroundColor:"#000",fontSize:16,lineHeight:50,textAlign:"center",position:"relative",textAlignVertical:"center",margin:0,zIndex:10,fontSize:16,flex:1,minHeight:80}]},s.a.createElement(l.a,{style:{color:"#f1f1f1",marginBottom:5,marginTop:15}},"Scan your SafeKey Document QR code"),s.a.createElement(l.a,{style:{color:"#f1f1f1"}},"Keep camera steady"),s.a.createElement(l.a,{style:{color:I?"#ffbb33":"#28a745",marginTop:10,fontFamily:"OpenSans_600SemiBold"}},I?"INVALID QR":"SCANNING")),s.a.createElement(E,{facingMode:C,onLoad:function(){console.log("QR Reader Loaded"),w.a.load((function(){}))},delay:300,onError:function(e){console.log(e.name),"NotAllowedError"===e.name&&t.dispatch(b.CommonActions.reset({index:0,routes:[{name:"NoCamera"}]}))},onScan:function(e){o||function(e){var n,a,r,o,c,f,y,w,h,E,S,k,v,C,O,A;i.a.async((function(B){for(;;)switch(B.prev=B.next){case 0:if(n=[":BM.KEY:",":BM.VAX:"],a=[":BM.KEY:"],null===e){B.next=39;break}if(!n.some((function(t){return e.includes(t)}))){B.next=36;break}if(!a.some((function(t){return e.includes(t)}))){B.next=25;break}if(r=e.indexOf(":",130),o=e.indexOf("/"),c=e.substring(r,o),f=c.slice(1),isNaN(f)){B.next=24;break}if(y=parseInt(f.substr(0,4),10),w=parseInt(f.substr(6),10),h=parseInt(f.substr(4,2),10),E=new Date(y,h-1,w),S=new Date,!(E.getTime()<S.getTime())){B.next=18;break}return T.show(s.a.createElement(d.a,null,s.a.createElement(u.a,{onPress:function(){m.a.openURL("https://www.gov.bm/safekey"),T.hide(1)}},s.a.createElement(l.a,{style:[x.a.bold,{color:"#1971ef"}]},"This SafeKey has"," ",s.a.createElement(l.a,{style:{color:"red"}},"EXPIRED")),s.a.createElement(l.a,{style:{color:"#1971ef",textAlign:"center"}},"Click here to renew it."))),{offsetBottom:50,id:1,position:"bottom",duration:0,type:"normal",normalColor:"#fff",style:{borderColor:"#1971ef",borderWidth:3,borderLeftStyle:"solid"}}),B.abrupt("return",t.goBack());case 18:return k={weekday:"long",year:"numeric",month:"long",day:"numeric"},v=E.toLocaleString("en-US",k),B.next=22,i.a.awrap(g.a.setItem("passExpiry",v));case 22:B.next=25;break;case 24:console.log("parsed date is not a number");case 25:return C=e.indexOf(":"),C+=1,O=e.indexOf(":",C+1),A=e.substring(C,O),B.next=31,i.a.awrap(g.a.setItem(A,e));case 31:p(!0),t.dispatch(b.CommonActions.reset({index:0,routes:[{name:"QR List"}]})),T.show("BM.KEY"===A?"SafeKey Added":"Vaccination Certificate Added",{id:3,type:"success",duration:3e3}),B.next=37;break;case 36:L(!0);case 37:B.next=41;break;case 39:p(!1),L(!1);case 41:case"end":return B.stop()}}),null,null,null,Promise)}(e)},style:{width:N.window.width<565?"100%":510,alignSelf:"center"}}),s.a.createElement(d.a,{style:{width:"100%",flex:1,justifyContent:"center"}},s.a.createElement(u.a,{onPress:function(){O("environment"===C?"user":"environment")},style:{paddingHorizontal:10,alignSelf:"center",backgroundColor:"#1971ef",paddingVertical:10,borderRadius:5,marginBottom:25,marginTop:25}},s.a.createElement(l.a,{style:{color:"white",textAlign:"center",letterSpacing:1,fontFamily:"OpenSans_400Regular"}},"Switch Camera"))))}}}]);
//# sourceMappingURL=17.1d691347.chunk.js.map