// 原型链模式
function Parent() {
  this.name = "parent";
  this.list = ["a", "b", "c"];
}

function Child() {
  this.age = 10;
}

// 原型链继承
const parent = new Parent();
Child.prototype = parent;
/** parent
 * name: "parent"
 * list: ["a", "b", "c"]
 * __proto__  -> Parent.prototype
 *               constructor -> Parent
 *               __proto__ -> Object.prototype
 */
const child = new Child();
/** child
 * age: 10
 * __proto__ -> parent;
 *              name: "parent"
 *              list: ["a", "b", "c"]
 *              ...
 */
child.name = 'child'; // name 属性直接添加在child下，parent 实例下的name还在
/** child
 * age: 10
 * name: "child"
 * ...
 */
const child2 = new Child();
console.log(child.name); //获取的是 child 下的name属性 "child"
console.log(child2.name); //获取的是 parent 下的name属性 "parent"
// 引用类型属性
child.list.push('d'); // 操作的是 parent 下的list属性
console.log(child.list); //获取的是 parent 下的list属性 ["a", "b", "c", "d"]
console.log(child2.list); //获取的是 parent 下的list属性 ["a", "b", "c", "d"]

/** 缺点&问题
 * 1.引用类型的属性被所有实例共享  (如 Parent 的 list 属性)
 * 2.在创建 Child 的实例时，不能向Parent传参
 */

 // 原型链继承，方法放在 Parent.prototype 下不会存在方法重复创建问题