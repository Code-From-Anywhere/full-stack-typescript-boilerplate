"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},__assign.apply(this,arguments)},__rest=this&&this.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(r[n[i]]=t[n[i]])}return r};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Strong=void 0;var jsx_runtime_1=require("react/jsx-runtime"),react_native_1=require("react-native"),tailwind_rn_1=require("tailwind-rn"),trimClassName_1=require("../../util/trimClassName"),Strong=function(t){var e=t.native,r=t.children,n=t.className,i=(0,tailwind_rn_1.useTailwind)(),s=e||{},a=s.style,o=__rest(s,["style"]),l=n?i((0,trimClassName_1.trimClassName)(n)):{};return(0,jsx_runtime_1.jsx)(react_native_1.Text,__assign({style:[{fontWeight:"bold"},l,a]},o,{children:r}))};exports.Strong=Strong;
//# sourceMappingURL=Strong.native.js.map