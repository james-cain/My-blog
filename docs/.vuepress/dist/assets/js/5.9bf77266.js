(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{187:function(e,t,s){"use strict";s.r(t);var r=s(0),a=Object(r.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"browser"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#browser","aria-hidden":"true"}},[e._v("#")]),e._v(" Browser")]),e._v(" "),s("h2",{attrs:{id:"事件机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件机制","aria-hidden":"true"}},[e._v("#")]),e._v(" 事件机制")]),e._v(" "),s("h3",{attrs:{id:"事件触发三阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件触发三阶段","aria-hidden":"true"}},[e._v("#")]),e._v(" 事件触发三阶段")]),e._v(" "),s("ul",[s("li",[e._v("document往事件触发处传播，遇到注册的捕获事件会触发")]),e._v(" "),s("li",[e._v("传播到事件触发处时触发注册事件")]),e._v(" "),s("li",[e._v("从事件触发处往document传播，遇到注册的冒泡事件会触发")])]),e._v(" "),s("h2",{attrs:{id:"注册事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#注册事件","aria-hidden":"true"}},[e._v("#")]),e._v(" 注册事件")]),e._v(" "),s("p",[e._v("第三个参数可以是布尔值，也可以是对象。对于布尔值useCapture参数来说，该参数默认是false。")]),e._v(" "),s("p",[e._v("若为false，表示在"),s("strong",[e._v("事件冒泡阶段")]),e._v("调用事件处理函数，如果参数为true，表示在"),s("strong",[e._v("事件捕获阶段")]),e._v("调用")]),e._v(" "),s("p",[e._v("对于对象来说，可以是几个属性")]),e._v(" "),s("ul",[s("li",[e._v("capture，布尔值，和useCapture一样")]),e._v(" "),s("li",[e._v("once，布尔值")]),e._v(" "),s("li",[e._v("passive，布尔值，表示永远不会调用preventDefault")])]),e._v(" "),s("p",[e._v("只触发在目标上，可以使用stopPropagation来组织事件的传播。")]),e._v(" "),s("h2",{attrs:{id:"eventloop"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#eventloop","aria-hidden":"true"}},[e._v("#")]),e._v(" EventLoop")]),e._v(" "),s("p",[e._v("setTimeout延时为0，一样还是异步。原因是html5规定该函数的第二参数不得小于4毫秒，不足会自动增加。")]),e._v(" "),s("p",[e._v("不同的任务源会被分配到不同的Task队列中，任务源可以分为微任务(microTask)和宏任务(macroTask)。在ES6中，microTask称为jobs，macroTask称为task")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("console.log('script start');\n\nsetTimeout(function (){\n    console.log('setTimeout');\n}, 0);\n\nnew Promise((resolve) => {\n    console.log('Promise');\n    resolve();\n}).then(function () {\n    console.log('promise1');\n}).then(function () {\n    console.log('promise2');\n});\n\nconsole.log('script end');\n// 执行顺序\n// script start => Promise => promise1=> promise2 => script end => setTimeout\n")])])]),s("p",[e._v("微任务包括process.nextTick，promise，Object.observe，MutationObserver")]),e._v(" "),s("p",[e._v("宏任务包括setTimeout，setInterval，setImmediate，script，I/O，UI rendering")]),e._v(" "),s("p",[e._v("**但是并不是微任务就快宏任务，**因为宏任务中包括了script，浏览器会先执行一个宏任务，接下来有一步代码，就会先执行微任务")]),e._v(" "),s("p",[e._v("正确的一次EventLoop顺序是")]),e._v(" "),s("ol",[s("li",[e._v("执行同步代码，这属于宏任务")]),e._v(" "),s("li",[e._v("执行栈为空，查询是否有微任务需要执行")]),e._v(" "),s("li",[e._v("执行所有微任务")]),e._v(" "),s("li",[e._v("必要的话渲染UI")]),e._v(" "),s("li",[e._v("然后执行下一轮EventLoop，执行宏任务中的异步代码")])])])}],!1,null,null,null);a.options.__file="Damn-hole-of-Browser.md";t.default=a.exports}}]);