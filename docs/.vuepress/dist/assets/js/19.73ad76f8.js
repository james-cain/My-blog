(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{175:function(e,t,n){"use strict";n.r(t);var o=n(0),a=Object(o.a)({},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[e._m(0),e._v(" "),n("ul",[n("li",[e._v("google devtools https://developers.google.com/web/tools/chrome-devtools/")]),e._v(" "),n("li",[e._v("navigation timing performance resource 一个页面的渲染完成耗时")]),e._v(" "),n("li",[e._v("http2.0")]),e._v(" "),n("li",[e._v("1000000长列表性能，用户无感知渲染")]),e._v(" "),n("li",[e._v("http://taobaofed.org/blog/2016/04/25/performance-composite/")]),e._v(" "),n("li",[e._v("pwa")]),e._v(" "),n("li",[e._v("https://github.com/barretlee/performance-column/issues")]),e._v(" "),n("li",[e._v("https://github.com/fouber/blog/issues/3")]),e._v(" "),n("li",[e._v("https://developer.yahoo.com/performance/rules.html?guccounter=1")]),e._v(" "),n("li",[e._v("http://velocity.oreilly.com.cn/2010/ppts/VelocityChina2010Dec7StaticResource.pdf")]),e._v(" "),n("li",[e._v("http://velocity.oreilly.com.cn/2011/ppts/MobilePerformanceVelocity2011_DavidWei.pdf")]),e._v(" "),n("li",[e._v("https://developers.google.com/speed/docs/insights/rules?csw=1")]),e._v(" "),n("li",[e._v("https://developers.google.com/speed/docs/insights/mobile")]),e._v(" "),n("li",[e._v("https://developers.google.com/web/fundamentals/performance/rendering/?hl=zh-cn")]),e._v(" "),n("li",[e._v("https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/?hl=zh-cn")]),e._v(" "),n("li",[e._v("https://developers.google.com/web/fundamentals/performance/critical-rendering-path/")]),e._v(" "),n("li",[e._v("《"),n("a",{attrs:{href:"http://book.douban.com/subject/3132277/",target:"_blank",rel:"noopener noreferrer"}},[e._v("高性能网站建设指南"),n("OutboundLink")],1),e._v("》《"),n("a",{attrs:{href:"http://book.douban.com/subject/4719162/",target:"_blank",rel:"noopener noreferrer"}},[e._v("高性能网站建设进阶指南"),n("OutboundLink")],1),e._v("》《"),n("a",{attrs:{href:"http://book.douban.com/subject/25856314/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Web性能权威指南"),n("OutboundLink")],1),e._v("》")]),e._v(" "),n("li",[e._v("https://www.cnblogs.com/CraryPrimitiveMan/p/3795086.html")]),e._v(" "),n("li",[e._v("https://www.cnblogs.com/-simon/p/5883336.html")]),e._v(" "),n("li",[e._v("https://www.cnblogs.com/callmeguxi/p/6846447.html")])]),e._v(" "),e._m(1),e._v(" "),n("p",[e._v("方法一：使用时间戳，当触发事件的时候，取出当前的时间戳，然后减去之前的时间戳（最一开始值设为0），如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行")]),e._v(" "),e._m(2),n("p",[e._v("方法二：使用定时器，当触发事件的时候，设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，设置下个定时器")]),e._v(" "),e._m(3),n("p",[e._v("方法三：结合以上两者的优势，做到鼠标移入立刻执行，停止触发的时候还能再执行一次。")]),e._v(" "),e._m(4),e._m(5)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"性能优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#性能优化","aria-hidden":"true"}},[this._v("#")]),this._v(" 性能优化")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ol",[n("li",[n("p",[e._v("DNS预解析,可以通过预解析的方式来预先获得域名所对应的IP")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<link rel="dns-prefetch" href="//xxx.com">\n')])])])]),e._v(" "),n("li",[n("p",[e._v("缓存：强缓存（Expires、Cache-Control）和协商缓存（Last-Modified、If-Modified-Since和Etag、If-None-Match）")]),e._v(" "),n("p",[e._v("在一些特殊的地方可能需要选择特殊的缓存策略")]),e._v(" "),n("ul",[n("li",[e._v("对于不需要缓存的资源，可以使用Cache-Control: no-store，表示资源不需要缓存")]),e._v(" "),n("li",[e._v("对于频繁变动的资源，可以使用Cache-Control: no-cache并配合Etag使用，表示资源已被缓存，但是每次都会发送请求询问资源是否更新")]),e._v(" "),n("li",[e._v("对于代码文件来说，通常使用Cache-Control:  max-age=31536000并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件")])])]),e._v(" "),n("li",[n("p",[e._v("HTTP2.0")]),e._v(" "),n("p",[e._v("HTTP/1.1每个请求都会建立和断开，消耗好几个RTT时间，并且由于TCP慢启动，加载体积大的文件需要更多的时间。")]),e._v(" "),n("p",[e._v("HTTP2.0引入了多路复用，能让多个请求使用同一个TCP链接，加快了网页的加载速度。并且还支持Header压缩，进一步减少请求的数据大小")])]),e._v(" "),n("li",[n("p",[e._v("预加载，是声明式的fetch，强制浏览器请求资源，并且不会阻塞onload事件")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<link rel="preload" href="https://example.com">\n')])])]),n("p",[e._v("预加载在一定程度上降低首屏的加载时间，但兼容性不好")])]),e._v(" "),n("li",[n("p",[e._v("预渲染，可以通过预渲染将下载的文件先放在后台渲染")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<link rel="prerender" href="https://example.com">\n')])])])]),e._v(" "),n("li",[n("p",[e._v("懒执行，将某些逻辑延迟到使用时再计算。该技术可以用于首屏优化，懒执行需要唤醒，一般可以通过定时器或者事件的调用来唤醒")])]),e._v(" "),n("li",[n("p",[e._v("懒加载，将不关键的资源延后加载。原理是只加载自定义区域（通常是可视区域，也可以是即将进入可视区域）内需要加载的东西。懒加载不仅可以用于图片，也可以使用在别的资源上，比如进入可视区域才开始播放视频等等。")])]),e._v(" "),n("li",[n("p",[e._v("如何渲染几万条数据并不卡住界面")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('可以通过requestAnimationFrame来每16ms刷新一次\n\nsetTimeout(() => {\n    // 插入10万条数据\n    const total = 100000;\n    // 一次插入20条，如果觉得性能不好就减少\n    const once = 20;\n    // 渲染数据总共需要几次\n    const loopCount = total / once;\n    let countOfRender = 0;\n    let ul = document.querySelector("ul");\n    function add() {\n        //优化性能，插入不会造成回流\n        const fragment = document.createDocumentFragment();\n        for(let i = 0; i < once; i++) {\n            const li = document.createElement("li");\n            li.innerText = Math.floor(Math.random() * total);\n            fragment.appendChild(li);\n        }\n        ul.appendChild(fragment);\n        countOfRender += 1;\n        loop();\n    }\n    function loop() {\n        if (countOfRender < loopCount) {\n            window.requestAnimationFrame(add);\n        }\n    }\n    loop();\n}, 0);\n')])])])]),e._v(" "),n("li",[n("p",[e._v("防抖（debounce）")]),e._v(" "),n("p",[e._v("原理：尽管触发事件，但是一定在事件触发n秒后才执行，如果在事件触发的n秒内又触发了这个事件，就以新的事件的时间为准，n秒后才执行，总之，就是要等触发完事件n秒内不再触发事件，才执行。")]),e._v(" "),n("p",[e._v("例子")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<!DOCTYPE html>\n<html lang="zh-cmn-Hans">\n\n<head>\n    <meta charset="utf-8">\n    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">\n    <title>debounce</title>\n    <style>\n        #container{\n            width: 100%; height: 200px; line-height: 200px; text-align: center; color: #fff; background-color: #444; font-size: 30px;\n        }\n    </style>\n</head>\n\n<body>\n    <div id="container"></div>\n    <script src="debounce.js"><\/script>\n</body>\n\t<script>\n\t\tvar count = 1;\n        var container = document.getElementById(\'container\');\n\n        function getUserAction(e) {\n            container.innerHTML = count++;\n        };\n\n        var setUseAction = debounce(getUserAction, 10000, true);\n\n        container.onmousemove = setUseAction;\n\n        document.getElementById("button").addEventListener(\'click\', function(){\n            setUseAction.cancel();\n        })\n\t<\/script>\n</html>\n')])])]),n("p",[e._v("Debounce.js")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("function debounce(func, wait, immediate) {\n\n    var timeout, result;\n\n    var debounced = function () {\n        var context = this;\n        var args = arguments;\n\n        if (timeout) clearTimeout(timeout);\n        if (immediate) {\n            // 如果已经执行过，不再执行\n            var callNow = !timeout;\n            timeout = setTimeout(function(){\n                timeout = null;\n            }, wait)\n            if (callNow) result = func.apply(context, args)\n        }\n        else {\n            timeout = setTimeout(function(){\n                func.apply(context, args)\n            }, wait);\n        }\n        return result;\n    };\n\n    debounced.cancel = function() {\n        clearTimeout(timeout);\n        timeout = null;\n    };\n\n    return debounced;\n}\n")])])]),n("p",[e._v("注意：当涉及函数有返回值时，debounce中同样要返回函数的执行结果，但是当immediate为false的时候，因为使用功能了setTimeout，将func.apply(context, args)的返回值赋给变量，最后再return的时候，值将会一直是undefined，所以只在immediate为true的时候返回函数的执行结果")])]),e._v(" "),n("li",[n("p",[e._v("节流（throttle）")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("function throttle(func, wait) {\n    var context, args;\n    var previous = 0;\n\n    return function() {\n        var now = +new Date();\n        context = this;\n        args = arguments;\n        if (now - previous > wait) {\n            func.apply(context, args);\n            previous = now;\n        }\n    }\n}\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("function throttle(func, wait) {\n    var timeout;\n    var previous = 0;\n\n    return function() {\n        context = this;\n        args = arguments;\n        if (!timeout) {\n            timeout = setTimeout(function(){\n                timeout = null;\n                func.apply(context, args)\n            }, wait)\n        }\n\n    }\n}\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("function throttle(func, wait) {\n    var timeout, context, args, result;\n    var previous = 0;\n\n    var later = function() {\n        previous = +new Date();\n        timeout = null;\n        func.apply(context, args)\n    };\n\n    var throttled = function() {\n        var now = +new Date();\n        //下次触发 func 剩余的时间\n        var remaining = wait - (now - previous);\n        context = this;\n        args = arguments;\n         // 如果没有剩余的时间了或者你改了系统时间\n        if (remaining <= 0 || remaining > wait) {\n            if (timeout) {\n                clearTimeout(timeout);\n                timeout = null;\n            }\n            previous = now;\n            func.apply(context, args);\n        } else if (!timeout) {\n            timeout = setTimeout(later, remaining);\n        }\n    };\n    return throttled;\n}\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ol",{attrs:{start:"11"}},[t("li")])}],!1,null,null,null);a.options.__file="Damn-hole-of-performance.md";t.default=a.exports}}]);