'use strict';

/*
< Objects >
- one of the JavaScript's data types.
- a collection of related data and/or functionality.
- Nearly all objects in JavaScript are instances of Object

object = { key : value };
*/

/**************************************** 1. Literals and properties ****************************************/

// 오브젝트 만드는 방법 1 - 'object literal' syntax
const obj1 = {};

// 오브젝트 만드는 방법 2 - 'object constructor' syntax
const obj2 = new Object();


function print(person) {
  console.log(person.name); // ellie
  console.log(person.age); // 4
}

const ellie = { name: 'ellie', age: 4 };
print(ellie);


/*
<오브젝트의 특징>

with JavaScript magic (dynamically typed language)
- 자바스크립트는 동적으로 타입이 runtime 때 결정되는 언어이다.
- runtime: 프로그램이 동작하고 있을 때
- 그렇기 때문에 뒤늦게 오브젝트에 property를 추가할 수 있다.

*/

// can add properties later - 나중에 속성을 추가할 수 있다.
ellie.hasJob = true;
console.log(ellie);
console.log(ellie.hasJob); // true

// can delete properties later - 나중에 속성을 삭제할 수 있다.
delete ellie.hasJob;
console.log(ellie);
console.log(ellie.hasJob); // undefined

// 나중에 속성을 추가/삭제하는 것은 유지보수에 좋지 않기 때문에 가능하면 피하는 것이 좋다.





/**************************************** 2. Computed properties ****************************************/
/*
Computed properties(계산된 속성)
- 대괄호[]를 이용해서 프로퍼티에 접근하고 추가하는 방법

key should be always string - key는 문자열이어야 한다.
*/

// property 접근방법 1 - 점(.)으로
console.log(ellie.name); // ellie
// property 접근방법 2 - ['속성명']으로
console.log(ellie['name']); // ellie

// ['속성명']으로 속성을 추가할 수 있다.
ellie['hasJob'] = true;
console.log(ellie.hasJob); // true

/*
그렇다면 언제 점(.)을 쓰고, 언제 []를 쓸까?

점(.)을 쓸 때
- 코딩하는 그 순간, 우리가 그 key에 해당하는 value를 받아오고 싶을 때

대괄호[]를 쓸 때
- 우리가 정확히 어떤 key가 필요한지 모를 때(즉 runtime에서 결정될 때)
- 실시간으로 원하는 값을 받아오고 싶을 때
*/


// 함수를 작성하는 순간에 key에 무엇이 들어가는지 모르는 상태이다.
// 나중에 동적으로 key에 해당하는 value를 받아와야 할 때는 대괄호[]를 사용한다.
function printValue(obj, key) {
  console.log(obj.key); // obj에 key라는 property가 들어있니? 아니 그렇지 않아 => undefined
  console.log(obj[key]); // 이렇게 해야 한다.
}

printValue(ellie, 'name');
printValue(ellie, 'age');




/**************************************** 3. Property value shorthand ****************************************/

/*
Property value shorthand
- key와 value의 이름이 동일하다면 생략할 수 있다.
*/
const person1 = { name: 'bob', age: 2 };
const person2 = { name: 'steve', age: 3 };
const person3 = { name: 'dave', age: 4 };
// 위와 같이 오브젝트를 필요할 때 일일이 만들게 되면 동일한 key들을 반복해서 사용하게 된다.

// 값만 전달해서 오브젝트를 만드는 유용한 함수를 만들었다.
// js에 class가 없을 때는 아래와 같은 방식으로 오브젝트 찍어내는 함수를 만들었다.
function makePerson(name,age) {
  return {
    name, //name: name,  <==== - key와 value의 이름이 같으면 생략
    age //age: age
  }
}

const person4 = makePerson('Sally', 10);
console.log(person4);

/**************************************** 4. Constructor Function ****************************************/

/*
< Constructor Function 생성자 함수 >
- 다른 계산을 하지 않고 순수하게 오브젝트를 생성하는 함수는 아래와 같이 만든다.
*/

function Person(name, age) { // 함수명은 대문자로 보통 작성한다.
  // this = {}; // this에다가 새로운 오브젝트를 만드는 부분은 생략되었다.
  this.name = name;
  this.age = age;
  // return this; // 생략되었다.
}

const person5 = new Person('elile', 30); // 이렇게 호출하면 js엔진이 알아서 오브젝트를 생성한다.
console.log(person5);




/************************* 5. in operator: property existence check (key in obj) *************************/

/* 
in 연산자
오브젝트 안에 key가 있는지 없는지 확인하기 
*/
console.log('name' in ellie); // true
console.log('age' in ellie); // true
console.log('random' in ellie); // false
console.log(ellie.random); // undefined




/**************************************** 6. for..in vs for..of ****************************************/

/*
< for..in >
오브젝트의 키를 반복할 수 있다.
for (key in obj)
*/

//console.clear();
for (let key in ellie) {
  console.log(key); // name age hasJob 이 차례대로 찍힌다.
}

/*
< for..of >
배열의 값을 반복할 수 있다.
for (value of iterable)
*/

const array = [1, 2, 4, 5];
for (let value of array) {
  console.log(value); // 1 2 4 5 가 차례로 찍힌다.
}




/**************************************** 7. Fun cloning ****************************************/


const user = { name: 'ellie', age: '20' }; // user에는 name: 'ellie', age: '20' 이런 데이터를 가리키는 레퍼런스가 들어있다.
const user2 = user; // user2에도 user와 동일한 레퍼런스가 들어있다.

/*
- user라는 변수는 레퍼런스를 가리키고 있다.
- 이런 레퍼런스는 실제로 { name: 'ellie', age: '20' } 이런 데이터를 가리키고 있다.
- user2라는 변수애는 user에 있는 레퍼런스와 동일한 레퍼런스가 할당된다.
*/

user2.name  = 'coder';
console.log(user); // {name: 'coder', age: '20'}  <=== user2와 user가 동일한 레퍼런스

// user와 user2에는 동일한 레퍼런스가 들어있으므로 가리키고 있는 데이터가 동일하다. (데이터를 공유함)
// 그러므로 user2의 name의 값을 수정하면 user에서도 동일하게 수정된다.



/* 
< 정말로 오브젝트를 복사할 수 있는 방법 (old way) >
- 빈 객체를 만든 뒤 for in문으로 키를 할당하는 방식
*/
const user3 = {};
for (let key in user) {
  user3[key] = user[key];
}
//console.clear();
user3.name  = 'John';
console.log(user3); // {name: 'John', age: '20'}  <=== user와 데이터를 공유하지 않고 복사가 일어났다.
console.log(user); // {name: 'coder', age: '20'}



/*
< 오브젝트를 복사할 수 있는 다른 방법 >
Object.assign(dest, [obj1, obj2, obj3...])
Object.assign(붙여넣을 빈 객체, 복사할 객체)
*/
const user4 = {}
Object.assign(user4, user);
// const user4 = Object.assign({}, user); 이렇게 해도 된다.
console.log(user4); // {name: 'coder', age: '20'}



/*
< 두 가지 객체를 복사해서 하나로 합칠 때 >
Object.assign(붙여넣을 빈 객체, 복사할 객체 1, 복사할 객체 2)
- 그런데 복사하는 객체에 동일한 key가 있다면 뒤에 나오는 property가 앞에 있는 property를 덮어 씌운다.
*/
const fruit1 = { color: 'red' };
const fruit2 = { color: 'blue', size: 'big' };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); // blue <= key가 중복될 때는 뒤에 있는 property가 복사된다.
console.log(mixed.size); // big


