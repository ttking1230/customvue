import {observe} from "./observer.js"

export function initState(vm) {
    console.log(vm);
    // 做不同的初始化工作  data watch props computed
    let opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
}

function initData(vm) {
    // console.log(options)
    // let vm = this;
    let data = vm.$options.data;
    data = vm._data = typeof data === "function" ? data.call(vm) : data;
    observe(data)

    // 代理vm.msg
    for (let key in data) {
        proxy(vm, key, "_data");
    }
}
function proxy(vm, key, source) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}
