// 收集watcher

let id = 0;//唯一标识

class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    addSub(watcher) {//订阅
        this.subs.push(watcher);
    }
    notify() {//发布
        this.subs.forEach(watcher => {
            watcher.update();
        });
    }
    // 此方法用来存放watcher
    depend(){
        if(Dep.target){
            // 此处的Dep.target 就是watcher
            // 给watcher添加一个addDep(this),就实现了watcher里面记录（收集）了dep
            // this为Dep实例对象
            // 相当于 => watcher.addDep(dep)
            Dep.target.addDep(this);
        }
    }
}

//  保存当前watcher 
let stack = [];
//  存放
export function pushTarget(watcher) {
    Dep.target = watcher;//Dep上的静态属性target设置成watcher
    stack.push(watcher);
}

// 取
export function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
}

export default Dep