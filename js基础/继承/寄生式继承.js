// 寄生式继承
// 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
// (创建的子对象带有定义好的方法，工厂模式)
/** 缺点
 * 跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 */
// 跟借用构造函数方式无关，只是原型式继承的升级版，产生了 跟借用构造函数一样的问题
// 同时还存在 原型链继承的问题

function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}

function createChild(parent){
  const f = createObj(parent);
  f.getName = function(){
    return this.name;
  }
  return f;
}

function Parent(){
  this.name = "parent";
  this.list = ["a", "b", "c"];
}

const parent = new Parent();
const child1 = createChild(parent);
const child2 = createChild(parent);

child1.name = 'child1';
child1.list.push('d');
console.log(child1);
console.log(child2);