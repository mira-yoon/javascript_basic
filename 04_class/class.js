'use strict';

/*
- Object-oriendted programming 객체지향 프로그래밍
- Class: template 클래스는 템플릿
- Object: instance of a class 오브젝트는 클래스로 생성한 인스턴스이다.

JavaScript Classes
- introduced in ES6 클래스는 es6에 새로 추가됐다.

그럼 클래스가 없었을 때는? 
클래스를 정의하지 않고 바로 오브젝트를 만들 수 있었다.
오브젝트를 만들 때 function을 이용해서 템플릿을 만드는 방법이 있다.

- syntactical sugar over prototype-based inheritance
프로토타입을 베이스로 한 것 위에 문법상으로 달달한 => 즉, 기존에 프로토타입을 베이스로 템플릿을 만들었는데, 간단하게 쓸 수 있게 문법만 쉽게 추가되었다. (syntactical sugar : 문법적인 기능은 그대로이되, 편의성을 높게 만들었다는 뜻)
*/





/********************************* 1. Class declarations *********************************/

class Person {
  // constructor (생성자)
  constructor(name, age) { // 생성자를 이용해서 오브젝트를 만들 때 필요한 데이터를 전달한다.
    // fields 속성
    this.name = name; // 전달받은 데이터를 this.name 이라는 fields에 할당.
    this.age = age;
  }

  // methods 행동
  speak() {
    console.log(`${this.name}: hello!`);
  }
}


const ellie = new Person('ellie', 20); // 클래스 person을 이용해서 ellie 라는 오브젝트 생성.

console.log(ellie.name);
console.log(ellie.age);
ellie.speak();





/********************************* 2. Getter and setters *********************************/

/*

Getter and setters를 사용하는 이유?
사용자가 실수로 엉뚱한 값을 넣는 상황에 대비해서
실수로 엉뚱한 값을 애초에 넣지 않도록 템플릿을 만들 때 사용.

get 키워드로 값을 리턴

set 키워드로 값을 설정
- set 키워드는 value를 받아온다.



=====================================================

class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age; // this.age에 age를 할당할 때 메모리에 있는 값이 아니라 setter를 호출
  }

  get age() { 
    return this.age;
  }

  set age(value) {
    this.age = value;
  }
}

=====================================================

위와 같이만 하게 되면 call stack이 초과되었다는 에러가 뜬다.

우리가 getter를 정의하는 순간 constructor 안에 들어있는 this.age는 
메모리에 있는 데이터를 읽어오는 것이 아니라 getter를 호출하게 된다. 


setter를 정의하는 순간 
constructor 안에 들어있는 this.age 오른쪽에 있는 equal sign(등호,=)를 호출할 때,
즉 값을 할당할 때, 바로 메모리에 있는 값을 할당하는 것이 아니라
setter를 호출하게 된다.

그 말은 우리가 setter 안에서 전달된 value를 setter 안의 this.age에 할당할 때 메모리의 값을 업데이트하는 것이 아니라
setter를 호출하게 됩니다.

즉, 계속해서 무한정 반복하면서 setter를 호출하게 됩니다. 
무한정 반복하게 되면서 call stack이 초과되었다느 에러가 뜬다.

======> 그렇게 무한정 반복해서 setter를 호출하게 되는 현상을 방지하기 위해서
setter, getter 안에서는 속성의 이름을 다르게 짓는다. 
보통은 _를 붙여서 넣는다.

*/


class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  get age() {
    return this._age; // setter 무한정 호출을 방지하기 위해서 _를 붙여서 이름을 다르게 만들었다.
  }

  set age(value) {
    // if (value < 0) {
    //   throw Error('age can not be negative');
    // }
    this._age = value < 0 ? 0 : value; // 0 보다 작으면 0을 넣고, 아니라면 지정된 value를 넣어라
  }
}

const user1 = new User('Steve', 'Job', -1); // 사람의 나이는 음수가 될 수 없지만 실수로 -1이라고 넣었다. 
console.log(user1.age); // 0






/********************************* 3. Fields (public, private) *********************************/

/*

< publicField 와  privateField >

Too soon! 너무 최근에 추가된 것이라 많이 쓰이지는 않는다.
최신브라우저에서 지원을 안하는 경우가 많아서 쓰려면 바벨을 이용한다.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields


constructor를 쓰지 않고 field를 정의할 수 있는데, 그렇게 하게 되면 외부에서 접근이 가능하다.
#(hash)기호를 붙이게 되면 privateField이다. 그 말은 클래스 내부에서만 값이 접근이 되는 것이다.
privateField는 클래스 외부에서는 값을 읽을수도 없고, 변경할 수도 없다.

*/


class Experiment {
  publicField = 2;
  #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined





/********************************* 4. Static properties and methods *********************************/


// Too soon!
class Article {
  static publisher = 'Dream Coding';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher); // Dream Coding
  }
}

const article1 = new Article(1);
const article2 = new Article(2);

console.log(article1.publisher); // undefined
console.log(Article.publisher); // Dream Coding   <=== 오브젝트 이름이 아니라 클래스 이름인 Article에서 호출했다.

Article.printPublisher(); // 오브젝트 이름이 아니라 클래스 이름인 Article에서 호출했다.






/********************************* 5. Inheritance *********************************/

// a way for one class to extend another class.
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color!`);
  }

  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('🔺');
  }
  getArea() {
    return (this.width * this.height) / 2;
  }

  toString() {
    return `Triangle: color: ${this.color}`;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, 'red');
triangle.draw();
console.log(triangle.getArea());





/********************************* 6. Class checking: instanceOf *********************************/

console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);
console.log(triangle instanceof Object);
console.log(triangle.toString());

let obj = { value: 5 };
function change(value) {
  value.value = 7;
}
change(obj);
console.log(obj);