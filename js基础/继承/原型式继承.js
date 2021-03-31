// 原型式继承
// 就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
// 通过父类创建新子类

/** 缺点
 * 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
 */

function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}

function Parent(){
  this.name = "parent";
  this.list = ["a", "b", "c"];
}
const parent = new Parent();
const child1 = createObj(parent);
const child2 = createObj(parent);

child1.name = 'child1'; // 添加到 child1 下
child1.list.push('d');
console.log(child1);
console.log(child2);