(this.webpackJsonp=this.webpackJsonp||[]).push([[20],{430:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n.n(a),o=n(4),c=n.n(o),i=n(0),s=n.n(i),l=n(3),u=n(85),f=n(53),d=n(23),y=n(71),v=n(147),h=n(39),p=n.n(h),m=n(13),g=n.n(m),x=n(18),w=n.n(x),b=n(21),E=n.n(b),S=n(24),k=n.n(S),P=n(25),O=n.n(P),R=n(15),j=n.n(R),A=n(5),I=n(150),_=function(e){return"currentcolor"===e||"currentColor"===e||"inherit"===e||0===e.indexOf("var(")},L=n(100),V=n.n(L),B=function(e){if(void 0===e||null===e)return e;var t=V()(e);return void 0!==t&&null!==t?t=(t<<24|t>>>8)>>>0:void 0},C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(null!=e){if("string"===typeof e&&_(e))return e;var n=B(e);if(null!=n){var a=n>>16&255,r=n>>8&255,o=255&n,c=(n>>24&255)/255,i=(c*t).toFixed(2);return"rgba("+a+","+r+","+o+","+i+")"}}};function K(e){var t=e.colors,n=e.locations,a=e.startPoint,o=e.endPoint,c=g()(e,["colors","locations","startPoint","endPoint"]),s=i.useState(null),u=r()(s,2),f=u[0],d=u[1],y=i.useState([]),v=r()(y,2),h=v[0],m=v[1],x=i.useState(0),w=r()(x,2),b=w[0],E=w[1],S=null!=f?f:{},k=S.width,P=void 0===k?1:k,O=S.height,R=void 0===O?1:O;i.useEffect((function(){var e=function(){var e=[0,0];Array.isArray(a)&&(e=[null!=a[0]?a[0]:0,null!=a[1]?a[1]:0]);var t=[0,1];return Array.isArray(o)&&(t=[null!=o[0]?o[0]:0,null!=o[1]?o[1]:1]),[e,t]}(),t=r()(e,2),n=t[0],c=t[1];n[0]*=P,c[0]*=P,n[1]*=R,c[1]*=R;var i=c[1]-n[1],s=c[0]-n[0];E(90+180*Math.atan2(i,s)/Math.PI)}),[P,R,a,o]),i.useEffect((function(){var e=t.map((function(e,t){var a=C(e);n&&n[t]&&(a+=" "+100*Math.max(0,Math.min(1,n[t]))+"%");return a}));m(e)}),[t,n]);var j="linear-gradient("+b+"deg, "+h.join(",")+")";return i.createElement(l.a,p()({},c,{style:[c.style,{backgroundImage:j}],onLayout:function(e){var t=e.nativeEvent.layout,n=t.x,a=t.y,r=t.width,o=t.height,i=null!=f?f:{x:0,y:0,width:1,height:1};n===i.x&&a===i.y&&r===i.width&&o===i.height||d({x:n,y:a,width:r,height:o}),c.onLayout&&c.onLayout(e)}}))}function M(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=j()(e);if(t){var r=j()(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return O()(this,n)}}var D=function(e){k()(n,e);var t=M(n);function n(){return w()(this,n),t.apply(this,arguments)}return E()(n,[{key:"render",value:function(){var e=this.props,t=e.colors,n=e.locations,a=e.start,r=e.end,o=g()(e,["colors","locations","start","end"]),c=n;return n&&t.length!==n.length&&(console.warn("LinearGradient colors and locations props should be arrays of the same length"),c=n.slice(0,t.length)),i.createElement(K,p()({},o,{colors:A.a.select({web:t,default:t.map(I.a)}),locations:c,startPoint:N(a),endPoint:N(r)}))}}]),n}(i.Component);function N(e){if(e){if(!Array.isArray(e)||2===e.length)return Array.isArray(e)?e:[e.x,e.y];console.warn("start and end props for LinearGradient must be of the format [x,y] or {x, y}")}}var z=n(438),F=n(38);t.default=function(e){var t=Object(i.useState)("#000"),n=r()(t,2),a=n[0],o=n[1],h=Object(i.useState)("#000"),p=r()(h,2),m=p[0],g=p[1],x=Object(i.useState)(!1),w=r()(x,2),b=w[0],E=w[1],S=Object(i.useState)(!1),k=r()(S,2),P=k[0],O=k[1];Object(i.useEffect)((function(){try{!function(){var e;c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.awrap(y.a.getItem("no_notice_safekey"));case 2:null!==(e=t.sent)&&E(e);case 4:case"end":return t.stop()}}),null,null,null,Promise)}()}catch(e){alert(e)}}),[]),Object(i.useEffect)((function(){try{!function(){var e;c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.awrap(y.a.getItem("no_notice_vaccine"));case 2:null!==(e=t.sent)&&O(e);case 4:case"end":return t.stop()}}),null,null,null,Promise)}()}catch(e){alert(e)}}),[]);var R=s.a.createRef(),j=function e(){R.current&&(R.current.style.display="none",document.removeEventListener("click",e))};Object(i.useEffect)((function(){"Vaccination Certificate"==e.name?(o("#fc9cc7"),g("#fc9cc7")):"SafeKey"==e.name&&(o("#5299e1"),g("#66b0ff"))}),[e.name]);var A=Object(d.useNavigation)();return s.a.createElement(l.a,{style:{width:"100%"}},s.a.createElement(D,{start:{x:1,y:0},end:{x:0,y:0},colors:[a,m],style:[F.a.shadow,{width:"100%",marginBottom:15,paddingLeft:15,borderRadius:10}]},s.a.createElement(u.a,{style:{justifyContent:"space-between",flexDirection:"row",alignItems:"center"},onPress:function(){"SafeKey Notice"===e.infoScreen&&(b?A.navigate("SafeKey QR"):b||A.navigate("SafeKey Notice")),"Vaccination Notice"===e.infoScreen&&(P?A.navigate("Vaccination Certificate QR"):P||A.navigate("Vaccination Notice"))}},s.a.createElement(l.a,{style:{paddingVertical:15}},s.a.createElement(f.a,{style:{fontFamily:"OpenSans_600SemiBold",color:"white",textAlign:"left",fontSize:16}},e.name)),s.a.createElement(u.a,{onPress:function(){R.current.style.display="flex",document.addEventListener("click",j)},style:[F.a.center,{height:"100%",width:50,flexDirection:"row"}]},s.a.createElement(z.a,{name:"ios-ellipsis-vertical",size:24,color:"white"})),s.a.createElement(l.a,{style:[F.a.shadow,{display:"none",flexDirection:"column",backgroundColor:"#fff",borderRadius:5,position:"absolute",right:40,top:11}],ref:R},s.a.createElement(u.a,{onPress:function(){var t;t=e.type,c.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"BM.KEY"!==t){e.next=8;break}return e.next=4,c.a.awrap(y.a.removeItem("passExpiry"));case 4:return e.next=6,c.a.awrap(y.a.removeItem("no_notice_safekey"));case 6:e.next=11;break;case 8:if("BM.VAX"!==t){e.next=11;break}return e.next=11,c.a.awrap(y.a.removeItem("no_notice_vaccine"));case 11:return e.next=13,c.a.awrap(y.a.removeItem(t));case 13:v.a("QrDeleted",{type:"BM.KEY"===t?"SafeKey":"Vaccination Certificate",purpose:"user deleted a safekey"}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),alert(e.t0);case 19:case"end":return e.stop()}}),null,null,[[0,16]],Promise),e.removeItem()},style:{paddingHorizontal:20,paddingVertical:5}},s.a.createElement(f.a,{style:{fontFamily:"OpenSans_400Regular",color:"#dc3545"}},"Delete"))))))}}}]);
//# sourceMappingURL=20.83c5ffef.chunk.js.map