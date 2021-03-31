// 借用构造函数模式
// 不使用修改原型链中 prototype 的值的方式
// 通过使用 call 将 Parent 中 this 绑定的属性 复制一遍，
// 这个过程不需要使用new 将Parent当做一个普通函数使用即可.
function Parent(name) {
  this.name = name;
  this.list = ["a", "b", "c"];
  this.getName = function(){
    return this.name;
  }
}

function Child(name) {
  Parent.call(this, name); // 直接当做普通函数使用，可以将parent属性复制一遍
  this.age = 10;
}
 const child = new Child("child");
 child.list.push("d");
 /** child
  * age: 10
  * list: ["a", "b", "c", "d"]
  * name: "child"
  * getName: ƒ ()
  * __proto__ -> Object.prototype
  */
 const child2 = new Child("child2");
/** child2
  * age: 10
  * list: ["a", "b", "c"]
  * name: "child2"
  * getName: ƒ ()
  * __proto__ -> Object.prototype
  */

/** 解决
 * 1.避免了引用类型的属性被所有实例共享
 * 2.可以在 Child 中向 Parent 传参
 */

/** 缺点与问题
 * 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * （如 getName 方法在每个child中都定义了一遍）
 */