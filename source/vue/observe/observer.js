import newMethods from "./array.js"
import Dep from "./dep.js";

export function observe(data) {
    // 第一步先判断data是否是对象，不是对象直接返回
    if (!(typeof data === "object" && data !== null)) {
        return
    }
    return new Observer(data);
}

class Observer {
    constructor(data) {
        def(data, "__ob__", this);
        if (Array.isArray(data)) {
            data.__proto__ = newMethods;
            this.observerArray(data)
        } else {
            this.walk(data);
        }
    }
    walk(data) {
        for (let key in data) {
            defineReactive(data, key, data[key]);
        }
    }
    observerArray(data) {
        for (let i = 0; i < data.length; i++) {
            observe(data[i]);
        }
    }
}

export function defineReactive(data, key, value) {
    observe(value);
    // 给每一个属性添加一个Dep实例
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            // 依赖收集
            // 增加watcher
            // 单纯增加watcher只要调用dep.addSub(watcher)即可，
            // 但是watcher里面还需要拿到dep，因为一个渲染watcher对应多个dep
            // 所以要新增加一个方法dep.depend(),不仅能够添加watcher，
            // 而且watcher还能够拿到dep，多次调用属性的时候会重复dep，还需要去重
            if(Dep.target){
                // dep.addSub(watcher);
                dep.depend();
                // 在watcher里面记录dep，也要在dep里面记录watcher
            }
            return value;
        },
        set(newValue) {
            if (value === newValue) {
                return
            }
            value = newValue;
            observe(value);
            // 当重新设置属性的时候，要实现更新
            // 更新watcher
            dep.notify();
        }
    });
}

function def(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: false,
        configurable: false,
        value: value
    })
}