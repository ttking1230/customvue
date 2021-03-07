
import { initState } from "./observe/index.js"
import Watcher from "./observe/watcher.js"
import {compiler} from "./observe/util.js"
function Vue(options) {
    // 初始化用户传入的选项
    this._init(options);
}
Vue.prototype._init = function (options) {
    // 初始化状态（data）
    let vm = this;
    vm.$options = options;
    initState(vm)

    // 初始化渲染页面
    if (vm.$options.el) {
        vm.$mount()
    }
}

Vue.prototype.$mount = function () {
    let vm = this;
    let el = vm.$options.el;
    el = vm.$el = query(el)

    console.log(el);
    // 渲染节点，，通过watcher渲染
    let updateComponent = function () {
        console.log("更新和渲染的实现");
        vm._update()
    }
    let watch = new Watcher(vm, updateComponent);
    console.log(watch);
}

Vue.prototype._update = function(){
    // 拿到数据更新视图
    let vm = this;
    let el = vm.$el;
    // vue2.0实现用的是compileToFunction
    // 先用vue1.0实现的方式，获取所有的节点放入文档碎片，渲染完成之后再返回

    // 渲染所有元素，把内容换成数据
    let node = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild){
        node.appendChild(firstChild);
    }
    // 文本替换
    compiler(node,vm)

    // 替换完成
    el.appendChild(node);
}




function query(el) {
    if (typeof el === "string") {
        return document.querySelector(el);
    }
    return el
}


export default Vue