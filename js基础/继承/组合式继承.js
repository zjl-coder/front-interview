// 组合继承
// 吸收 原型链和借用构造函数各自的有点
// 解决问题：引用属性不会互相影响，函数只会创建一遍
// 思路 属性放在 Parent 内 与 this 绑定，
// 函数放在 Parent.prototype 中，Parent.prototype.getName = ()=>{}

function Parent(name) {
  this.name = name;
  this.list = ["a", "b", "c"];
}
Parent.prototype.getName = function () {
  return this.name;
}

function Child(name) {
  Parent.call(this, name); // 将 Parent 中的属性复制一遍，但不会复制 prototype 中的属性
  this.age = 10;
}

// 原型链继承，解决 函数共用问题
const parent = new Parent();
/** parent
 * name: undefined
 * list: (3) ["a", "b", "c"]
 * __proto__ -> Parent.prototype
 *              getName: f()
 *              constructor: ƒ Parent(name)
 *              __proto__ -> Object.prototype
 */
Child.prototype = parent;
Child.prototype.constructor = Child;
const child = new Child("child");
/** child
 * age: 10
 * list: (3) ["a", "b", "c"]
 * name: "child"
 * __proto__: parent  (这个不是 Parent.prototype，而是 new Parent() 实例)
 *            constructor: ƒ Child(name)
 *            list: (3) ["a", "b", "c"]
 *            name: undefined
 *            __proto__ -> Parent.prototype
 *                         getName: ƒ ()
 *                         constructor: ƒ Parent(name)
 *                         __proto__ -> Object.prototype
 */

 // 是 JavaScript 中最常用的继承模式。

 /** 缺点&问题
  * 组合继承最大的缺点是会调用两次父构造函数。
  * 一次是设置子类型实例的原型的时候：Child.prototype = new Parent();
  * 一次在创建子类型实例的时候：const child = new Child('child'); Child 会执行 Parent.call(this, name);
  * 我们会发现 Child.prototype 和 child 都有一个属性为list，属性值为['a', 'b', 'c']。
  */

  /** 希望解决 list属性重复问题
   * 不使用Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 
   */