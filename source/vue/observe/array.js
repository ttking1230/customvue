

let oldMehods = Array.prototype;

let newMethods = Object.create(oldMehods);

let methods = [
    "push", "pop", "unshift", "shift", "reverse", "sort", "splice"
]
methods.forEach(method => {
    newMethods[method] = function (...args) {
        let result = oldMehods[method].apply(this, args);

        let  ob = this.__ob__;
        let inserted;
        switch (method) {
            case "push":
            case "unshift":
                inserted = args
                break;
            case "splice":
                inserted = args.slice(2)
                break;
            default:
                break;
        }

        if(inserted) {
            ob.observerArray(inserted);
        }
        return result;
    }

})



export default newMethods;