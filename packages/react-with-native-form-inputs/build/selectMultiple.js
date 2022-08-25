"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.SelectMultipleInputType=exports.SelectMultipleInput=void 0;var jsx_runtime_1=require("react/jsx-runtime"),react_with_native_ui_1=require("react-with-native-ui"),react_with_native_select_1=require("react-with-native-select"),react_with_native_1=require("react-with-native"),SelectMultipleInput=function(e){var t=e.value,n=e.extra,i=e.onChange,l=e.uniqueFieldId,a=[{label:n.title||"Choose a value",value:""}].concat(n.options).filter((function(e){return!t.find((function(t){return e.value===t.value}))}));
//console.log({ value, extraOptions: extra.options });
return(0,jsx_runtime_1.jsxs)(react_with_native_1.Div,__assign({className:"flex flex-row flex-wrap"},{children:[t.map((function(e,n){return(0,jsx_runtime_1.jsx)(react_with_native_1.Button,__assign({onClick:function(){var n=t.filter((function(t){return t.value!==e.value}));i(n)},className:"mr-3 px-3 py-0 rounded-md border border-gray-400"},{children:(0,jsx_runtime_1.jsxs)(react_with_native_1.P,__assign({className:"text-xs"},{children:[e.label," ",(0,jsx_runtime_1.jsx)(react_with_native_1.Span,__assign({textClassName:"text-red-500 text-xs"},{children:"(x)"}))]}))}),"selected".concat(l).concat(n))})),a.length>1?(0,jsx_runtime_1.jsx)(react_with_native_select_1.Select,{autoSuggest:null==n?void 0:n.autoSuggest,className:react_with_native_ui_1.UI.selectInput,title:n.title||"",options:a,onChange:function(e){if(console.log({selected:e}),e){var n=t;n.push(e),console.log({value:t,newValue:n}),i(n)}}}):null]}))};exports.SelectMultipleInput=SelectMultipleInput,exports.SelectMultipleInput.defaultInitialValue=[];var SelectMultipleInputType=function(){};exports.SelectMultipleInputType=SelectMultipleInputType;
//# sourceMappingURL=selectMultiple.js.map