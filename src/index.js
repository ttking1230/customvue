import Vue from "vue"

let vm = new Vue({
    el: "#app",
    data() {
        return {
            msg: "hello word",
            name: "king",
            age: 20
        }
    }
})

setTimeout(() => {
    // vm.msg = "xiao tongtong say "
    vm.name = "liu neng"
    vm.name = "liu neng1"
    vm.name = "liu neng2"
    vm.name = "liu neng3"
}, 2000);
// console.log(vm._data)
// console.log(vm.msg)