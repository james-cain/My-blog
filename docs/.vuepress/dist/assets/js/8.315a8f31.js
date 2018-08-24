(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{165:function(t,e,n){"use strict";n.r(e);var a=n(0),s=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"react"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#react","aria-hidden":"true"}},[t._v("#")]),t._v(" React")]),t._v(" "),n("h2",{attrs:{id:"生命周期"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#生命周期","aria-hidden":"true"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),n("h3",{attrs:{id:"v16生命周期用法和建议"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#v16生命周期用法和建议","aria-hidden":"true"}},[t._v("#")]),t._v(" V16生命周期用法和建议")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("class ExampleComponent extends React.Component {\n  // 用于初始化 state\n  constructor() {}\n  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用\n  // 因为该函数是静态函数，所以取不到 `this`\n  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护\n  static getDerivedStateFromProps(nextProps, prevState) {}\n  // 判断是否需要更新组件，多用于组件性能优化\n  shouldComponentUpdate(nextProps, nextState) {}\n  // 组件挂载后调用\n  // 可以在该函数中进行请求或者订阅\n  componentDidMount() {}\n  // 用于获得最新的 DOM 数据\n  getSnapshotBeforeUpdate() {}\n  // 组件即将销毁\n  // 可以在此处移除订阅，定时器等等\n  componentWillUnmount() {}\n  // 组件销毁后调用\n  componentDidUnMount() {}\n  // 组件更新后调用\n  componentDidUpdate() {}\n  // 渲染组件函数\n  render() {}\n  // 以下函数不建议使用\n  UNSAFE_componentWillMount() {}\n  UNSAFE_componentWillUpdate(nextProps, nextState) {}\n  UNSAFE_componentWillReceiveProps(nextProps) {}\n}\n")])])]),n("h2",{attrs:{id:"setstate"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#setstate","aria-hidden":"true"}},[t._v("#")]),t._v(" setState")]),t._v(" "),n("p",[t._v("该API是异步的")]),t._v(" "),n("p",[t._v("设计目的减少重绘，将多次调用放在队列中，在恰当的时候统一进行更新过程")]),t._v(" "),n("p",[t._v("假如有一个需求，需要对state.count连续调用三次，每次都加一，最终要获取到为3的结果")]),t._v(" "),n("p",[t._v("若使用以下方式")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("handle() {\n    this.setState({count: this.state.count + 1})\n    this.setState({count: this.state.count + 1})\n    this.setState({count: this.state.count + 1})\n}\n")])])]),n("p",[t._v("并不会得到想要的结果，等同于如下的代码")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("Object.assign(\n\t{},\n\t{count: this.state.count + 1},\n\t{count: this.state.count + 1},\n\t{count: this.state.count + 1},\n}\n")])])]),n("p",[t._v("正确的方式应该在setState内使用函数")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("handle() {\n    this.setState((prevState) => ({ count: prevState.count + 1 }))\n    this.setState((prevState) => ({ count: prevState.count + 1 }))\n    this.setState((prevState) => ({ count: prevState.count + 1 }))\n}\n")])])]),n("p",[t._v("如果想每次调用后获得正确的state，可以在setState中传入第二个回调函数")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("handle() {\n    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {\n        console.log(this.state);\n    })\n}\n")])])])])}],!1,null,null,null);s.options.__file="Damn-hole-of-React.md";e.default=s.exports}}]);