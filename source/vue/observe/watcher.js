import { popTarget, pushTarget } from "./dep";

// 每个组件都会有一个watcher，id
let id = 0;//唯一标识

class Watcher {
    constructor(vm, exprOrFn, cb = () => { }, options) {
        this.vm = vm;
        this.cb = cb;
        this.options = options;
        this.exprOrFn = exprOrFn;
        this.id = id++;

        this.deps = [];//存放dep
        this.depsId = new Set();//去重用，避免重复

        // 将内部传进来的回调方法放在getter属性上
        // exprOrFn可能是一个函数，也可能是一个表达式
        if (typeof exprOrFn === "function") {
            this.getter = exprOrFn;
        }
        //默认创建一个Watcher，会调用自身的get方法
        // 类似实现了属性拦截
        this.get();
    }
    get() {
        // 初次渲染为渲染watcher
        pushTarget(this);//Dep.target = watcher;
        this.getter();
        popTarget();
    }
    update() {
        // 批量更新，防止重复渲染
        console.log(id);
        // 利用eventLoop，放到下一个tick去执行
        // 异步执行且需要做重复判断
        queueWatcher(this);
        // this.get();
    }
    run() {
        this.get();
    }
    addDep(dep) {
        // 在watcher里面增加dep，为什么要这么做？
        // 当属性多次访问时，会重复创建dep（new Dep()，每个属性都会new一个dep）
        // 要做去重

        // Dep类有个id属性，每次创建的实例对象id都不相同
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            // 让watcher记住当前的dep
            this.deps.push(dep);

            // 最后再把watcher放到dep中
            dep.addSub(this);
        }
    }
}

let has = {}
let queue = [];
function queueWatcher(watcher) {
    let id = watcher.id;
    // 第一步：重复判断
    if (!has[id]) {
        has[id] = true;
        queue.push(watcher);
    }
    // 第二步：异步执行
    nextTick(flusqueue);
}

let callbacks = [];
export function nextTick(cb) {
    callbacks.push(cb);
    let asyncFn = () => {
        flushCallbacks();
    };
    // if (Promise) {
    //     console.log("--------------------+++++++");
    //     Promise.resolve().then(asyncFn());
    // } else {
    //     setTimeout(asyncFn, 0)
    // }
    if (Promise) {
        console.log("--------------------+++++++");
        Promise.resolve().then(asyncFn)
    } else {
        console.log("++++++++++++++++++++++++++++");
        setTimeout(asyncFn, 0)
    }

}


function flushCallbacks() {
    callbacks.forEach(cb => cb());
}

function flusqueue() {
    queue.forEach(watcher => watcher.run());
    // 每一个tick执行完之后要清空
    has = {};
    queue = [];
}

export default Watcher