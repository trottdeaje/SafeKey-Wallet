(this.webpackJsonp=this.webpackJsonp||[]).push([[11],{322:function(e,t,n){e.exports=n.p+"static/media/file-text.a031f6ff.png"},336:function(e,t){},355:function(e,t){},356:function(e,t){},357:function(e,t){},358:function(e,t){},359:function(e,t){},438:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),o=n(3),c=n.n(o),i=n(0),l=n.n(i),s=n(2),u=n(52),m=n(84),f=n(39),d=n(320),g=n(70),p=n(22),y=n(435),b=n(158),x=n(37),h=n(41),E=n(313),w=n(349),S=n(362),v=n(85),P=Object(h.a)((function(){return Promise.all([n.e(0),n.e(1),n.e(2)]).then(n.bind(null,317))}));t.default=function(e){var t=e.navigation,a=Object(i.useState)(""),o=r()(a,2),h=o[0],k=o[1],D=Object(b.b)(),C=Object(E.a)([n(322)]),O=r()(C,1)[0];return l.a.createElement(l.a.Fragment,null,O?l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{style:x.a.container},l.a.createElement(u.a,{style:{textAlign:"center",marginBottom:.5,fontSize:16,marginBottom:16,lineHeight:24}},"Add your SafeKey to your wallet by selecting your"," ",l.a.createElement(u.a,{style:{fontWeight:"bold"}},"SafeKey PDF Document "),"or"," ",l.a.createElement(u.a,{style:{fontWeight:"bold"}},"Vaccination Certificate PDF Document")),l.a.createElement(u.a,{style:[x.a.text,{fontWeight:"bold",marginTop:15,marginBottom:15}]},"Select your PDF Document"),l.a.createElement(m.a,{style:[x.a.btn,x.a.shadow,{backgroundColor:"#1971ef"}],onPress:function(){var e,n,a;return c.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,c.a.awrap(y.a({type:"application/pdf"}));case 3:"cancel"!==(e=r.sent).type&&(a=function(e){if(0===e.codes.length)return console.log("No QR Found"),void k("SafeKey QR Code not detected. Please try again.");!function(){var n,a,r,o,i,f,y,b,h,E,w,S,v,P,C,O;c.a.async((function(K){for(;;)switch(K.prev=K.next){case 0:if(n=e.codes.toString(),a=[":BM.KEY:"],![":BM.KEY:",":BM.VAX:"].some((function(e){return n.includes(e)}))){K.next=34;break}if(!a.some((function(e){return n.includes(e)}))){K.next=26;break}if(r=n.indexOf(":",130),o=n.indexOf("/"),i=n.substring(r,o),f=i.slice(1),isNaN(f)){K.next=25;break}if(y=parseInt(f.substr(0,4),10),b=parseInt(f.substr(6),10),h=parseInt(f.substr(4,2),10),E=new Date(y,h-1,b),w=new Date,console.log(E.getDate()+" "+w.getDate()),!(E.getTime()<w.getTime())){K.next=19;break}if(!(E.getDate()<w.getDate())){K.next=19;break}return K.abrupt("return",k(l.a.createElement(s.a,{style:[x.a.center,{width:"100%",maxWidth:500,marginTop:20,padding:10,textAlign:"center"}]},l.a.createElement(u.a,{style:[x.a.text,{color:"red",fontFamily:"OpenSans_600SemiBold"}]},"This SafeKey has expired. Click the button below to visit the SafeKey renewal page."," "),l.a.createElement(m.a,{style:[x.a.btn,x.a.shadow,x.a.btnLine,{marginTop:10}],onPress:function(){return d.a.openURL("https://www.gov.bm/safekey")}},l.a.createElement(u.a,{style:[x.a.btnText,{color:"#1971ef"}]},"Renew")))));case 19:return S={weekday:"long",year:"numeric",month:"long",day:"numeric"},v=E.toLocaleString("en-US",S),K.next=23,c.a.awrap(g.a.setItem("passExpiry",v));case 23:K.next=26;break;case 25:console.log("parsed date is not a number");case 26:return P=n.indexOf(":"),P+=1,C=n.indexOf(":",P+1),O=n.substring(P,C),K.next=32,c.a.awrap(g.a.setItem(O,n));case 32:t.dispatch(p.CommonActions.reset({index:0,routes:[{name:"QR List"}]})),D.show("BM.KEY"===O?l.a.createElement(s.a,null,l.a.createElement(u.a,{style:[x.a.bold,{color:"#fff"}]},"SafeKey Added")):l.a.createElement(s.a,null,l.a.createElement(u.a,{style:[x.a.bold,{color:"#fff"}]},"Vaccination Certificate Added")),{id:3,type:"success",duration:3500});case 34:case"end":return K.stop()}}),null,null,null,Promise)}()},1,n={scale:{once:!0,value:5,start:.2,step:.2,stop:2},resultOpts:{singleCodeInPage:!0,multiCodesInPage:!1,maxCodesInPage:1},improve:!0,jsQR:{}},k(l.a.createElement(s.a,{style:{marginTop:20}},l.a.createElement(S.ClipLoader,{size:"14px",color:"#1971ef"}))),w.PDF_QR_JS.decodeSinglePage(e.uri,1,n,a)),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),console.log(r.t0);case 10:case"end":return r.stop()}}),null,null,[[0,7]],Promise)}},l.a.createElement(u.a,{style:[x.a.center,{textAlign:"center",color:"white",fontSize:17}]},l.a.createElement(f.a,{style:{width:20,height:20,marginRight:8},source:n(322)}),"Select")),h||""),l.a.createElement(P,null)):l.a.createElement(v.a,null))}}}]);
//# sourceMappingURL=11.ab778dd8.chunk.js.map