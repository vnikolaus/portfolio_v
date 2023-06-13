(()=>{"use strict";var n={122:(n,r,e)=>{e.d(r,{Z:()=>s});var t=e(537),o=e.n(t),i=e(645),a=e.n(i)()(o());a.push([n.id,"@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap);"]),a.push([n.id,":root {\n  --primary-color: rgb(0, 0, 0);\n  --primary-color-darker: rgb(9, 48, 56);\n}\n\n* {\n  box-sizing: border-box;\n  outline: 0;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background: var(--primary-color);\n  font-family: 'Open sans', sans-serif;\n  font-size: 1.3em;\n  line-height: 1.5em;\n}\n\n.container {\n  font-family: 'Open sans', sans-serif;\n  font-weight: 500;\n  font-size: 1em;\n  max-width: 640px;\n  margin: 50px auto;\n  background: #e4dede;\n  padding: 20px;\n  border-radius: 10px;\n}\n\nform input {\n  padding: 0 10px;\n}\n\nform input:focus {\n  outline: 1px solid var(--primary-color);\n}\n\nform p {\n  font-size: 1.1em;\n  font-weight: bold;\n  font-style: italic;\n}\n\nform button {\n  border: none;\n  background: var(--primary-color);\n  color: #eee7e7;\n  font-size: 18px;\n  font-weight: 600;\n  height: 50px;\n  cursor: pointer;\n  margin-top: 30px;\n}\n\ninput[type=\"checkbox\"]{\n  /* desativa a checkbox padrão que não possibilita alteraçao */\n  -webkit-appearance: none; \n  background-color: rgb(188, 188, 197);\n  width: 20px;\n  height: 20px;\n  border-radius: 10px;\n  margin-top: 1%;\n  cursor: pointer;\n}\n\ninput[type=\"checkbox\"]:checked{\n  outline: 1px solid black;\n  background-color: rgb(0, 0, 0);\n}\n\nform button {\n  display: block;\n  margin: 40px 0;\n  font-size: 1em;\n  border-radius: 6px;\n}\n\nform button:hover {\n  background: rgb(37, 36, 36);\n  cursor: pointer;\n}\n\nform button:active {\n  background: #7d7d81;\n  cursor: pointer;\n}\n\n\n.length{\n  font-family: 'Open sans', sans-serif;\n  font-size: 1em;\n  margin: 10px;\n  border-radius: 4px;\n}\n\n.pwdGenerated {\n  font-family: 'Open sans', sans-serif;\n  font-size: 2em;\n  font-weight: 700;\n  margin-bottom: 3%;\n  margin-top: 3%;\n  word-break: break-all;\n}\n","",{version:3,sources:["webpack://./src/assets/css/style.css"],names:[],mappings:"AACA;EACE,6BAA6B;EAC7B,sCAAsC;AACxC;;AAEA;EACE,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,SAAS;EACT,UAAU;EACV,gCAAgC;EAChC,oCAAoC;EACpC,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,oCAAoC;EACpC,gBAAgB;EAChB,cAAc;EACd,gBAAgB;EAChB,iBAAiB;EACjB,mBAAmB;EACnB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,uCAAuC;AACzC;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,gCAAgC;EAChC,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,6DAA6D;EAC7D,wBAAwB;EACxB,oCAAoC;EACpC,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,wBAAwB;EACxB,8BAA8B;AAChC;;AAEA;EACE,cAAc;EACd,cAAc;EACd,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,2BAA2B;EAC3B,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,eAAe;AACjB;;;AAGA;EACE,oCAAoC;EACpC,cAAc;EACd,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,oCAAoC;EACpC,cAAc;EACd,gBAAgB;EAChB,iBAAiB;EACjB,cAAc;EACd,qBAAqB;AACvB",sourcesContent:["@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');\r\n:root {\r\n  --primary-color: rgb(0, 0, 0);\r\n  --primary-color-darker: rgb(9, 48, 56);\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  outline: 0;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  padding: 0;\r\n  background: var(--primary-color);\r\n  font-family: 'Open sans', sans-serif;\r\n  font-size: 1.3em;\r\n  line-height: 1.5em;\r\n}\r\n\r\n.container {\r\n  font-family: 'Open sans', sans-serif;\r\n  font-weight: 500;\r\n  font-size: 1em;\r\n  max-width: 640px;\r\n  margin: 50px auto;\r\n  background: #e4dede;\r\n  padding: 20px;\r\n  border-radius: 10px;\r\n}\r\n\r\nform input {\r\n  padding: 0 10px;\r\n}\r\n\r\nform input:focus {\r\n  outline: 1px solid var(--primary-color);\r\n}\r\n\r\nform p {\r\n  font-size: 1.1em;\r\n  font-weight: bold;\r\n  font-style: italic;\r\n}\r\n\r\nform button {\r\n  border: none;\r\n  background: var(--primary-color);\r\n  color: #eee7e7;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  height: 50px;\r\n  cursor: pointer;\r\n  margin-top: 30px;\r\n}\r\n\r\ninput[type=\"checkbox\"]{\r\n  /* desativa a checkbox padrão que não possibilita alteraçao */\r\n  -webkit-appearance: none; \r\n  background-color: rgb(188, 188, 197);\r\n  width: 20px;\r\n  height: 20px;\r\n  border-radius: 10px;\r\n  margin-top: 1%;\r\n  cursor: pointer;\r\n}\r\n\r\ninput[type=\"checkbox\"]:checked{\r\n  outline: 1px solid black;\r\n  background-color: rgb(0, 0, 0);\r\n}\r\n\r\nform button {\r\n  display: block;\r\n  margin: 40px 0;\r\n  font-size: 1em;\r\n  border-radius: 6px;\r\n}\r\n\r\nform button:hover {\r\n  background: rgb(37, 36, 36);\r\n  cursor: pointer;\r\n}\r\n\r\nform button:active {\r\n  background: #7d7d81;\r\n  cursor: pointer;\r\n}\r\n\r\n\r\n.length{\r\n  font-family: 'Open sans', sans-serif;\r\n  font-size: 1em;\r\n  margin: 10px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.pwdGenerated {\r\n  font-family: 'Open sans', sans-serif;\r\n  font-size: 2em;\r\n  font-weight: 700;\r\n  margin-bottom: 3%;\r\n  margin-top: 3%;\r\n  word-break: break-all;\r\n}\r\n"],sourceRoot:""}]);const s=a},645:n=>{n.exports=function(n){var r=[];return r.toString=function(){return this.map((function(r){var e="",t=void 0!==r[5];return r[4]&&(e+="@supports (".concat(r[4],") {")),r[2]&&(e+="@media ".concat(r[2]," {")),t&&(e+="@layer".concat(r[5].length>0?" ".concat(r[5]):""," {")),e+=n(r),t&&(e+="}"),r[2]&&(e+="}"),r[4]&&(e+="}"),e})).join("")},r.i=function(n,e,t,o,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(t)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var A=0;A<n.length;A++){var p=[].concat(n[A]);t&&a[p[0]]||(void 0!==i&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=i),e&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=e):p[2]=e),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),r.push(p))}},r}},537:n=>{n.exports=function(n){var r=n[1],e=n[3];if(!e)return r;if("function"==typeof btoa){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),o="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t),i="/*# ".concat(o," */");return[r].concat([i]).join("\n")}return[r].join("\n")}},379:n=>{var r=[];function e(n){for(var e=-1,t=0;t<r.length;t++)if(r[t].identifier===n){e=t;break}return e}function t(n,t){for(var i={},a=[],s=0;s<n.length;s++){var c=n[s],A=t.base?c[0]+t.base:c[0],p=i[A]||0,u="".concat(A," ").concat(p);i[A]=p+1;var l=e(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==l)r[l].references++,r[l].updater(f);else{var d=o(f,t);t.byIndex=s,r.splice(s,0,{identifier:u,updater:d,references:1})}a.push(u)}return a}function o(n,r){var e=r.domAPI(r);return e.update(n),function(r){if(r){if(r.css===n.css&&r.media===n.media&&r.sourceMap===n.sourceMap&&r.supports===n.supports&&r.layer===n.layer)return;e.update(n=r)}else e.remove()}}n.exports=function(n,o){var i=t(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var s=e(i[a]);r[s].references--}for(var c=t(n,o),A=0;A<i.length;A++){var p=e(i[A]);0===r[p].references&&(r[p].updater(),r.splice(p,1))}i=c}}},569:n=>{var r={};n.exports=function(n,e){var t=function(n){if(void 0===r[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}r[n]=e}return r[n]}(n);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(e)}},216:n=>{n.exports=function(n){var r=document.createElement("style");return n.setAttributes(r,n.attributes),n.insert(r,n.options),r}},565:(n,r,e)=>{n.exports=function(n){var r=e.nc;r&&n.setAttribute("nonce",r)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var r=n.insertStyleElement(n);return{update:function(e){!function(n,r,e){var t="";e.supports&&(t+="@supports (".concat(e.supports,") {")),e.media&&(t+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(t+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),t+=e.css,o&&(t+="}"),e.media&&(t+="}"),e.supports&&(t+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),r.styleTagTransform(t,n,r.options)}(r,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(r)}}}},589:n=>{n.exports=function(n,r){if(r.styleSheet)r.styleSheet.cssText=n;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(n))}}}},r={};function e(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,exports:{}};return n[t](i,i.exports,e),i.exports}e.n=n=>{var r=n&&n.__esModule?()=>n.default:()=>n;return e.d(r,{a:r}),r},e.d=(n,r)=>{for(var t in r)e.o(r,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:r[t]})},e.o=(n,r)=>Object.prototype.hasOwnProperty.call(n,r),e.nc=void 0,(()=>{var n=e(379),r=e.n(n),t=e(795),o=e.n(t),i=e(569),a=e.n(i),s=e(565),c=e.n(s),A=e(216),p=e.n(A),u=e(589),l=e.n(u),f=e(122),d={};function m(n){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},m(n)}function h(n,r){for(var e=0;e<r.length;e++){var t=r[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,(void 0,o=function(n,r){if("object"!==m(n)||null===n)return n;var e=n[Symbol.toPrimitive];if(void 0!==e){var t=e.call(n,"string");if("object"!==m(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(t.key),"symbol"===m(o)?o:String(o)),t)}var o}d.styleTagTransform=l(),d.setAttributes=c(),d.insert=a().bind(null,"head"),d.domAPI=o(),d.insertStyleElement=p(),r()(f.Z,d),f.Z&&f.Z.locals&&f.Z.locals;var b=["abcdefghijklmnopqrstuvwxyz"],g=["ABCDEFGHIJKLMNOPQRSTUVWXYZ"],C=["0123456789"],y=["@#$%&*/{[^|"];new(function(){function n(){!function(n,r){if(!(n instanceof r))throw new TypeError("Cannot call a class as a function")}(this,n),this.div=document.querySelector(".pwdGenerated"),this.form=document.querySelector(".form"),this.length=document.querySelector(".length"),this.uppercase=document.querySelector(".chkUC"),this.lowercase=document.querySelector(".chkLC"),this.numbers=document.querySelector(".chkNum"),this.symbols=document.querySelector(".chkSym"),this.preferences=[],this.events()}var r,e;return r=n,(e=[{key:"events",value:function(){var n=this;this.form.addEventListener("submit",(function(r){r.preventDefault();var e=n.generate_password();n.show_password(e)}))}},{key:"confirm_preferences",value:function(){this.check_uppercase(),this.check_lowercase(),this.check_numbers(),this.check_symbols()}},{key:"generate_password",value:function(){this.confirm_preferences();for(var n=this.preferences,r=this.length.value,e=n.toString().replace(",",""),t="",o=0;o<=r;)t+=e.split("").sort((function(){return.5-Math.random()})).join("").replace(/,/g,""),o++;return t=t.slice(0,r),this.preferences=[],t}},{key:"show_password",value:function(n){this.div.innerHTML="".concat(n)}},{key:"check_uppercase",value:function(){var n;this.uppercase.checked&&(n=this.preferences).push.apply(n,g)}},{key:"check_lowercase",value:function(){var n;this.lowercase.checked&&(n=this.preferences).push.apply(n,b)}},{key:"check_numbers",value:function(){var n;this.numbers.checked&&(n=this.preferences).push.apply(n,C)}},{key:"check_symbols",value:function(){var n;this.symbols.checked&&(n=this.preferences).push.apply(n,y)}}])&&h(r.prototype,e),Object.defineProperty(r,"prototype",{writable:!1}),n}())})()})();
//# sourceMappingURL=bundle.js.map