(this.webpackJsonp=this.webpackJsonp||[]).push([[13,15],{317:function(e,n,t){"use strict";t.r(n);var a=t(7),r=t.n(a),o=t(3),i=t.n(o),c=t(0),l=t.n(c),s=t(2),u=t(52),d=t(4),f=t(84),m=t(37),p=t(39),h=t(333),E=t(442),g=d.a.create({modalInnerView:{maxWidth:350,backgroundColor:"#fff",borderRadius:5,overflow:"hidden"},IconView:{overflow:"hidden",flexDirection:"row",marginVertical:30},AppIcon:{width:80,height:80,backgroundColor:"#f0f0f0",borderRadius:5,marginHorizontal:4,marginVertical:8}}),v=function(e){var n=Object(c.useState)(!1),a=r()(n,2),o=a[0],i=a[1],d=e.show,v=e.onClose;return Object(c.useEffect)((function(){i(d)}),[d]),l.a.createElement(h.a,{animationIn:"fadeInDownBig",isVisible:o},l.a.createElement(s.a,{style:m.a.center},l.a.createElement(s.a,{style:[g.modalInnerView,m.a.center]},l.a.createElement(s.a,{style:{position:"absolute",top:7,right:7}},l.a.createElement(f.a,{onPress:function(){return v()}},l.a.createElement(E.a,{name:"close-outline",size:28,color:"black"}))),l.a.createElement(s.a,{style:[g.IconView,m.a.center]},l.a.createElement(s.a,{style:g.AppIcon}),l.a.createElement(s.a,{style:g.AppIcon}),l.a.createElement(s.a,{style:[g.AppIcon,m.a.shadow,{marginRight:4,width:90,height:90,borderRadius:5}]},l.a.createElement(p.a,{source:t(324),style:[{borderRadius:5,width:90,height:90}]})),l.a.createElement(s.a,{style:g.AppIcon}),l.a.createElement(s.a,{style:g.AppIcon})),l.a.createElement(u.a,{style:[m.a.bold,{fontSize:20,fontFamily:"OpenSans_700Bold",marginBottom:20}]},"Install SafeKey Wallet"),l.a.createElement(u.a,{style:[m.a.text,{marginHorizontal:20,textAlign:"center",fontSize:16,marginBottom:20}]},"Install SafeKey Wallet on your home screen for quick and easy access when you're on the go."),l.a.createElement(s.a,{style:[m.a.center,{backgroundColor:"#f9f9f9",width:"100%",paddingVertical:15}]},l.a.createElement(u.a,{style:[m.a.center,m.a.text]},"Just tap",l.a.createElement(p.a,{style:{width:18,height:18,marginHorizontal:4,marginBottom:3},source:t(233)}),"then 'Add to Home Screen'")))))},y=d.a.create({container:{position:"absolute",bottom:0,left:0,right:0,height:50,backgroundColor:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",paddingHorizontal:15},text:{color:"#0000008c"},btnText:{paddingHorizontal:12,paddingVertical:5,fontSize:14,color:"#fff"}});n.default=function(){var e=Object(c.useState)(!1),n=r()(e,2),t=n[0],a=n[1],o=Object(c.useState)(null),d=r()(o,2),p=d[0],h=d[1],E=Object(c.useState)(!1),g=r()(E,2),w=g[0],b=g[1];Object(c.useEffect)((function(){console.log("this ran"),function(){var e=window.navigator.userAgent,n=window.navigator.platform,t=null;-1!==["Macintosh","MacIntel","MacPPC","Mac68K"].indexOf(n)?t="Mac OS":-1!==["iPhone","iPad","iPod"].indexOf(n)?t="iOS":-1!==["Win32","Win64","Windows","WinCE"].indexOf(n)?t="Windows":/Android/.test(e)?t="Android":!t&&/Linux/.test(n)&&(t="Linux"),h(t)}(),console.log(),"iOS"===p&&b(!0)}),[p]),window.addEventListener("beforeinstallprompt",(function(e){console.log("\ud83d\udc4d","beforeinstallprompt",e),window.deferredPrompt=e,b(!0),console.log("'beforeinstallprompt' event was fired.")}));return window.addEventListener("appinstalled",(function(){b(!1),window.deferredPrompt=null,console.log("PWA was installed")})),l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{style:y.container},l.a.createElement(u.a,{style:y.text},"Version: 1.1.7"),!w||window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches?l.a.createElement(l.a.Fragment,null):l.a.createElement(f.a,{onPress:function(){console.log(p),"iOS"===p?a(!0):"Android"===p?function(){var e,n;i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("\ud83d\udc4d","butInstall-clicked"),e=window.deferredPrompt){t.next=5;break}return console.error("\ud83d\udc4e","The deferred prompt is not available."),t.abrupt("return");case 5:return e.prompt(),t.next=8,i.a.awrap(e.userChoice);case 8:n=t.sent,console.log("\ud83d\udc4d","userChoice",n),window.deferredPrompt=null;case 11:case"end":return t.stop()}}),null,null,null,Promise)}():alert("other")},style:[m.a.center,m.a.shadow,{borderRadius:50,backgroundColor:"#1971ef",shadowColor:"#0a418f"}]},l.a.createElement(u.a,{style:[y.btnText]},"Install"))),l.a.createElement(v,{onClose:function(){return a(!1)},show:t}))}},323:function(e,n,t){"use strict";var a=t(65);n.a=a.a},324:function(e,n,t){e.exports=t.p+"static/media/icon.1092b622.png"},325:function(e,n,t){"use strict";var a=t(0),r=t(19),o=t(61),i=t.n(o);var c=function(e){var n=e.children,t=a.useRef(null);if(r.canUseDOM&&!t.current){var o=document.createElement("div");o&&document.body&&(document.body.appendChild(o),t.current=o)}return a.useEffect((function(){if(r.canUseDOM)return function(){document.body&&t.current&&(document.body.removeChild(t.current),t.current=null)}}),[]),t.current&&r.canUseDOM?i.a.createPortal(n,t.current):null},l=t(4),s=t(55);function u(e,n){return"slide"===e?n?f:m:"fade"===e?n?p:h:n?d.container:d.hidden}var d=l.a.create({container:{position:"fixed",top:0,right:0,bottom:0,left:0,zIndex:9999},animatedIn:{animationDuration:"300ms",animationTimingFunction:"ease-in"},animatedOut:{pointerEvents:"none",animationDuration:"300ms",animationTimingFunction:"ease-out"},fadeIn:{opacity:1,animationKeyframes:{"0%":{opacity:0},"100%":{opacity:1}}},fadeOut:{opacity:0,animationKeyframes:{"0%":{opacity:1},"100%":{opacity:0}}},slideIn:{transform:[{translateY:"0%"}],animationKeyframes:{"0%":{transform:[{translateY:"100%"}]},"100%":{transform:[{translateY:"0%"}]}}},slideOut:{transform:[{translateY:"100%"}],animationKeyframes:{"0%":{transform:[{translateY:"0%"}]},"100%":{transform:[{translateY:"100%"}]}}},hidden:{opacity:0}}),f=[d.container,d.animatedIn,d.slideIn],m=[d.container,d.animatedOut,d.slideOut],p=[d.container,d.animatedIn,d.fadeIn],h=[d.container,d.animatedOut,d.fadeOut],E=function(e){var n=e.animationType,t=e.children,r=e.onDismiss,o=e.onShow,i=e.visible,c=a.useState(!1),l=c[0],f=c[1],m=a.useRef(!1),p=n&&"none"!==n,h=a.useCallback((function(e){e&&e.currentTarget!==e.target||(i?o&&o():(f(!1),r&&r()))}),[r,o,i]);return a.useEffect((function(){i&&f(!0),i===m.current||p||h(),m.current=i}),[p,i,h]),l||i?Object(s.a)("div",{style:l?u(n,i):d.hidden,onAnimationEnd:h,children:t}):null},g=t(2),v=a.forwardRef((function(e,n){var t=e.active,o=e.children,i=e.onRequestClose,c=e.transparent;a.useEffect((function(){if(r.canUseDOM){var e=function(e){t&&"Escape"===e.key&&(e.stopPropagation(),i&&i())};return document.addEventListener("keyup",e,!1),function(){return document.removeEventListener("keyup",e,!1)}}}),[t,i]);var l=a.useMemo((function(){return[y.modal,c?y.modalTransparent:y.modalOpaque]}),[c]);return a.createElement(g.a,{accessibilityRole:t?"dialog":null,"aria-modal":!0,ref:n,style:l},a.createElement(g.a,{style:y.container},o))})),y=l.a.create({modal:{position:"fixed",top:0,right:0,bottom:0,left:0},modalTransparent:{backgroundColor:"transparent"},modalOpaque:{backgroundColor:"white"},container:{top:0,flex:1}}),w=v,b=t(32),O=function(){return Object(s.a)("div",{accessibilityRole:"none",tabIndex:0,style:C.focusBracket})};function I(e){if(!r.canUseDOM)return!1;try{e.focus()}catch(n){}return document.activeElement===e}var x=function(e){var n=e.active,t=e.children,o=a.useRef(),i=a.useRef({trapFocusInProgress:!1,lastFocusedElement:null});return a.useEffect((function(){if(r.canUseDOM){var e=function(){if(null!=o.current&&!i.current.trapFocusInProgress&&n){try{if(i.current.trapFocusInProgress=!0,document.activeElement instanceof Node&&!o.current.contains(document.activeElement)){var e=function e(n){for(var t=0;t<n.childNodes.length;t++){var a=n.childNodes[t];if(I(a)||e(a))return!0}return!1}(o.current);i.current.lastFocusedElement===document.activeElement&&(e=function e(n){for(var t=n.childNodes.length-1;t>=0;t--){var a=n.childNodes[t];if(I(a)||e(a))return!0}return!1}(o.current)),!e&&null!=o.current&&document.activeElement&&b.a.focus(o.current)}}finally{i.current.trapFocusInProgress=!1}i.current.lastFocusedElement=document.activeElement}};return e(),document.addEventListener("focus",e,!0),function(){return document.removeEventListener("focus",e,!0)}}}),[n]),a.useEffect((function(){if(r.canUseDOM){var e=document.activeElement;return function(){e&&document.contains(e)&&b.a.focus(e)}}}),[]),a.createElement(a.Fragment,null,a.createElement(O,null),a.createElement(g.a,{ref:o},t),a.createElement(O,null))},C=l.a.create({focusBracket:{outlineStyle:"none"}}),k=0,S=[],P={};function R(){if(0!==S.length){var e=S[S.length-1];S.forEach((function(n){n in P&&P[n](n===e)}))}}function D(e){e in P&&(P[e](!1),delete P[e]);var n=S.indexOf(e);-1!==n&&(S.splice(n,1),R())}var M=a.forwardRef((function(e,n){var t=e.animationType,r=e.children,o=e.onDismiss,i=e.onRequestClose,l=e.onShow,s=e.transparent,u=e.visible,d=void 0===u||u,f=a.useMemo((function(){return k++}),[]),m=a.useState(!1),p=m[0],h=m[1],g=a.useCallback((function(){D(f),o&&o()}),[f,o]),v=a.useCallback((function(){!function(e,n){D(e),S.push(e),P[e]=n,R()}(f,h),l&&l()}),[f,l]);return a.useEffect((function(){return function(){return D(f)}}),[f]),a.createElement(c,null,a.createElement(E,{animationType:t,onDismiss:g,onShow:v,visible:d},a.createElement(x,{active:p},a.createElement(w,{active:p,onRequestClose:i,ref:n,transparent:s},r))))}));n.a=M}}]);
//# sourceMappingURL=13.fd60d795.chunk.js.map