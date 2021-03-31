function Parent(name) {
  this.name = name;
  this.list = ["a", "b", "c"];
}
Parent.prototype.getName = function () {
  return this.name;
}

function Child(name) {
  Parent.call(this, name);
  this.age = 10;
}

/** 希望解决 list属性重复问题
 * 不使用Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 
 */
// const parent = new Parent();
// Child.prototype = parent;
// Child.prototype.constructor = Child;

function F(){ this.aaa = "f自己的属性" }
F.prototype = Parent.prototype;
const f = new F(); 
// 此时不会执行Parent 构造函数, f中没有name属性，也无法访问到name属性 f.name: undefined
/** f
 * __proto__ -> Parent.prototype
 *              getName: f()
 */
Child.prototype = f;
Child.prototype.constructor = Child;

const child = new Child("child");
/** child
 * age: 10
 * list: (3) ["a", "b", "c"]
 * name: "child"
 * __proto__ -> f
 *              aaa: "f自己的属性"
 *              constructor: Child
 *              _proto__ -> Parent.prototype  (F.prototype = Parent.prototype;)
 *                          getName: f()
 *                          # 没有name list 属性
 *                          __proto__ -> Object.prorotype
 *              
 */

