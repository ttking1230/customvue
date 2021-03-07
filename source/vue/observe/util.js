
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export const util = {
    getValue(vm, expr) {
        let keys = expr.split(".");
        return keys.reduce((memo, current) => {
            memo = memo[current];
            return memo;
        }, vm);
    },
    compilerText(node, vm) {
        console.log("compilerTextcompilerText")
        console.log(vm)
        // 编译文本
        console.log("--------")
        if(!node.expr){
            node.expr = node.textContent;
        }
        node.textContent = node.expr.replace(defaultRE, function (...args) {
            console.log(args);
            return util.getValue(vm, args[1]);
        });
        console.log("----------")

    }
}

export function compiler(node, vm) {
    // 取出子节点
    let childNodes = node.childNodes;

    [...childNodes].forEach(child => {
        if (child.nodeType === 1) {
            compiler(child, vm)
        } else if (child.nodeType === 3) {
            util.compilerText(child, vm)
        }
    })
}