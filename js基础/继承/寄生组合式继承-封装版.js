function creatObj(parent) {
  function F() { }
  F.prototype = parent;
  return new F();
}
// 封装
function extend(Parent, Child) {
  const prototype = creatObj(Parent.prototype); // 原来传 new Parent 现在传 Parent.prototype
  Child.prototype = prototype;
  prototype.constructor = Child;
}

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

extend(Parent, Child);
const child = new Child("child");
console.log(child);
