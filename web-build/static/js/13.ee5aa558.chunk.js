(this.webpackJsonp=this.webpackJsonp||[]).push([[13],{436:function(e,t,n){"use strict";n.r(t);var r=n(8),a=n.n(r),o=n(0),i=n.n(o),c=n(1),l=n(59),s=n(31),u=n(29),f=n(5),d=n.n(f),y=n(72),h=n(25),v=n.n(h),p=n(14),m=n.n(p),g=n(16),x=n.n(g),w=n(19),E=n.n(w),b=n(20),P=n.n(b),S=n(21),k=n.n(S),A=n(12),R=n.n(A),L=n(7),O=n(153),j=function(e){return"currentcolor"===e||"currentColor"===e||"inherit"===e||0===e.indexOf("var(")},I=n(102),B=n.n(I),C=function(e){if(void 0===e||null===e)return e;var t=B()(e);return void 0!==t&&null!==t?t=(t<<24|t>>>8)>>>0:void 0},M=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(null!=e){if("string"===typeof e&&j(e))return e;var n=C(e);if(null!=n){var r=n>>16&255,a=n>>8&255,o=255&n,i=(n>>24&255)/255,c=(i*t).toFixed(2);return"rgba("+r+","+a+","+o+","+c+")"}}};function D(e){var t=e.colors,n=e.locations,r=e.startPoint,i=e.endPoint,l=m()(e,["colors","locations","startPoint","endPoint"]),s=o.useState(null),u=a()(s,2),f=u[0],d=u[1],y=o.useState([]),h=a()(y,2),p=h[0],g=h[1],x=o.useState(0),w=a()(x,2),E=w[0],b=w[1],P=null!=f?f:{},S=P.width,k=void 0===S?1:S,A=P.height,R=void 0===A?1:A;o.useEffect((function(){var e=function(){var e=[0,0];Array.isArray(r)&&(e=[null!=r[0]?r[0]:0,null!=r[1]?r[1]:0]);var t=[0,1];return Array.isArray(i)&&(t=[null!=i[0]?i[0]:0,null!=i[1]?i[1]:1]),[e,t]}(),t=a()(e,2),n=t[0],o=t[1];n[0]*=k,o[0]*=k,n[1]*=R,o[1]*=R;var c=o[1]-n[1],l=o[0]-n[0];b(90+180*Math.atan2(c,l)/Math.PI)}),[k,R,r,i]),o.useEffect((function(){var e=t.map((function(e,t){var r=M(e);n&&n[t]&&(r+=" "+100*Math.max(0,Math.min(1,n[t]))+"%");return r}));g(e)}),[t,n]);var L="linear-gradient("+E+"deg, "+p.join(",")+")";return o.createElement(c.a,v()({},l,{style:[l.style,{backgroundImage:L}],onLayout:function(e){var t=e.nativeEvent.layout,n=t.x,r=t.y,a=t.width,o=t.height,i=null!=f?f:{x:0,y:0,width:1,height:1};n===i.x&&r===i.y&&a===i.width&&o===i.height||d({x:n,y:r,width:a,height:o}),l.onLayout&&l.onLayout(e)}}))}function z(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=R()(e);if(t){var a=R()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return k()(this,n)}}var F=function(e){P()(n,e);var t=z(n);function n(){return x()(this,n),t.apply(this,arguments)}return E()(n,[{key:"render",value:function(){var e=this.props,t=e.colors,n=e.locations,r=e.start,a=e.end,i=m()(e,["colors","locations","start","end"]),c=n;return n&&t.length!==n.length&&(console.warn("LinearGradient colors and locations props should be arrays of the same length"),c=n.slice(0,t.length)),o.createElement(D,v()({},i,{colors:L.a.select({web:t,default:t.map(O.a)}),locations:c,startPoint:V(r),endPoint:V(a)}))}}]),n}(o.Component);function V(e){if(e){if(!Array.isArray(e)||2===e.length)return Array.isArray(e)?e:[e.x,e.y];console.warn("start and end props for LinearGradient must be of the format [x,y] or {x, y}")}}var G=n(328),J=n(27);t.default=function(e){var t=Object(o.useState)("#000"),n=a()(t,2),r=n[0],f=n[1],h=Object(o.useState)("#000"),v=a()(h,2),p=v[0],m=v[1],g=i.a.createRef(),x=function e(){g.current&&(g.current.style.display="none",document.removeEventListener("click",e))};Object(o.useEffect)((function(){"Vaccination Certificate"==e.name?(f("#fc9cc7"),m("#fc9cc7")):"SafeKey"==e.name&&(f("#5299e1"),m("#66b0ff"))}),[e.name]);var w=Object(u.useNavigation)();return i.a.createElement(c.a,{style:{width:"100%"}},i.a.createElement(F,{start:{x:1,y:0},end:{x:0,y:0},colors:[r,p],style:[J.a.shadow,{width:"100%",marginBottom:15,paddingLeft:15,borderRadius:10}]},i.a.createElement(l.a,{style:{justifyContent:"space-between",flexDirection:"row",alignItems:"center"},onPress:function(){return w.navigate(e.infoScreen)}},i.a.createElement(c.a,{style:{paddingVertical:15}},i.a.createElement(s.a,{style:{fontFamily:"OpenSans_600SemiBold",color:"white",textAlign:"left",fontSize:16}},e.name)),i.a.createElement(l.a,{onPress:function(){g.current.style.display="flex",document.addEventListener("click",x)},style:[J.a.center,{height:"100%",width:50,flexDirection:"row"}]},i.a.createElement(G.a,{name:"ios-ellipsis-vertical",size:24,color:"white"})),i.a.createElement(c.a,{style:[J.a.shadow,{display:"none",flexDirection:"column",backgroundColor:"#fff",borderRadius:5,position:"absolute",right:40,top:11}],ref:g},i.a.createElement(l.a,{onPress:function(){var t;t=e.type,d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"BM.KEY"!==t){e.next=4;break}return e.next=4,d.a.awrap(y.a.removeItem("passExpiry"));case 4:return e.next=6,d.a.awrap(y.a.removeItem(t));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),alert(e.t0);case 11:case"end":return e.stop()}}),null,null,[[0,8]],Promise),e.removeItem()},style:{paddingHorizontal:20,paddingVertical:5}},i.a.createElement(s.a,{style:{fontFamily:"OpenSans_400Regular",color:"#dc3545"}},"Delete"))))))}}}]);
//# sourceMappingURL=13.ee5aa558.chunk.js.map