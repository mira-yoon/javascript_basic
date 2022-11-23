'use strict';

/*

< Object-oriendted programming 객체지향 프로그래밍 >

- class: template 클래스는 템플릿
- Object: instance of a class 오브젝트는 클래스로 생성한 인스턴스이다.

JavaScript classes
- introduced in ES6 클래스는 es6에 새로 추가됐다.

그럼 클래스가 없었을 때는? 
클래스를 정의하지 않고 바로 오브젝트를 만들 수 있었다.
오브젝트를 만들 때 function을 이용해서 템플릿을 만드는 방법이 있다.

- syntactical sugar over prototype-based inheritance
프로토타입을 베이스로 한 것 위에 문법상으로 달달한 => 즉, 기존에 프로토타입을 베이스로 템플릿을 만들었는데, 간단하게 쓸 수 있게 문법만 쉽게 추가되었다.
(syntactical sugar : 문법적인 기능은 그대로이되, 편의성을 높게 만들었다는 뜻)

*/



/********************************* 1. class declarations *********************************/

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
엉뚱한 값을 수정/예외처리를 해서 템플릿을 만들어 줄 때 주로 사용.

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

const user1 = new User('Steve', 'Job', -1);

=====================================================

위와 같이만 하게 되면 call stack이 초과되었다는 에러가 뜬다.

우리가 getter를 정의하는 순간 
constructor 안에 들어있는 this.age는 
메모리에 있는 데이터를 읽어오는 것이 아니라 getter를 호출하게 된다. 


setter를 정의하는 순간 
constructor 안에 들어있는 this.age 오른쪽에 있는 equal sign(등호,=)를 호출할 때,
즉 값을 할당할 때, 바로 메모리에 있는 값을 할당하는 것이 아니라
setter를 호출하게 된다.

그 말은 우리가 setter 안에서 전달된 value를 setter 안의 this.age에 할당할 때 메모리의 값을 업데이트하는 것이 아니라
setter를 호출하게 된다.

즉, 계속해서 무한정 반복하면서 setter를 호출하게 된다. 
무한정 반복하게 되면서 call stack이 초과되었다느 에러가 뜬다.

======> 그렇게 무한정 반복해서 setter를 호출하게 되는 현상을 방지하기 위해서
setter, getter 안에서는 속성의 이름을 다르게 짓는다. 
보통은 _를 붙여서 넣는다.

*/


class User {
  constructor(firstName, lastName, 나이) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = 나이;
  }

  get age() { // constructor 안의 age를 받아왔다.
    return this._age; // getter 무한정 호출을 방지하기 위해서 _를 붙여서 이름을 다르게 만들었다.
  }

  set age(value) { // constructor 안의 this.age에 할당된 '나이'를 value로 받는다.
    // if (value < 0) {
    //   throw Error('age can not be negative');
    // }
    this._age = value < 0 ? 0 : value; // 0 보다 작으면 0을 넣고, 아니라면 지정된 value를 넣어라

  }
}

const user1 = new User('Steve', 'Job', -1); // 사람의 나이는 음수가 될 수 없지만 실수로 -1이라고 넣었다. 
console.log(user1.age); // 0



// 내가 이해가 잘 안되서 예시 하나 더 만듬


class 사람 {
  constructor(firstName, lastName, 나이) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = 나이; // this.age = this._age + 20 이렇게 된 것이다. 9 + 20 = 29
  }

  get age() { 
    return this._age + 20; 
  }

  set age(value) { // 나이에서 -1을 받아와서 value로 전달
    this._age = value + 10 // 9
  }
}

const user2 = new 사람('지성', '박', -1);
console.log(user2);
console.log(user2.age); // 29
console.log(user2._age); // 9




/********************************* 3. Fields (public, private) *********************************/

/*

< publicField 와  privateField >

Too soon! 너무 최근에 추가된 것이라 많이 쓰이지는 않는다.
최신브라우저에서 지원을 안하는 경우가 많아서 쓰려면 바벨을 이용한다.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields


*/

class Experiment {
  publicField = 2;
  #privateField = 0;
}

/*  
- 위와 같이 constructor를 쓰지 않고 field를 정의할 수 있는데, 그렇게 하게 되면 외부에서 접근이 가능하다.
- #(hash)기호를 붙이게 되면 privateField이다. 그 말은 클래스 내부에서만 값이 접근이 되는 것이다.
- privateField는 클래스 외부에서는 값을 읽을수도 없고, 변경할 수도 없다.  

*/

const experiment = new Experiment();
console.log(experiment.publicField); // 2
console.log(experiment.privateField); // undefined





/********************************* 4. Static properties and methods *********************************/


/*
Too soon! 너무 최근에 추가된 것이라 많이 쓰이지는 않는다.

class 안에 있는 fields와 methods들은 새로운 오브젝트를 만들 때 마다 
그대로 복제되어서 값만 우리가 지정된 값으로 변경이 되어서 만들어진다.

간혹 
오브젝트와 상관없이, 데이터와 상관없이 class가 가지고 있는 고유한 값과 
데이터와 상관없이 동일하게 반복되어 사용되는 메소드가 있을 수 있다.

이 때 static 이라는 키워드를 사용하면 
오브젝트와 상관없이 class자체에 연결된다.

(매개변수가 필요 없는, 공통적으로 사용하는 바뀌지 않는 값이나 메소드 만들 때 사용한다는 말)
*/


class Article {
  static publisher = 'Dream Coding';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
}

const article1 = new Article(1);
const article2 = new Article(2);

console.log(article1.publisher); // undefined
console.log(Article.publisher); // Dream Coding   <=== 오브젝트 이름이 아니라 클래스 이름인 Article에서 호출했다.

Article.printPublisher(); // Dream Coding  <=== 오브젝트 이름이 아니라 클래스 이름인 Article에서 호출했다.






/********************************* 5. Inheritance (상속) *********************************/

/*
<상속과 다양성>
- a way for one class to extend another class.

사각형, 삼각형, 원형을 만드려고 하는데
공통된 속성들을 한 번에 정의하고, 공통적으로 사용된 속성값을 재사용한다.

*/

// 1) Shape 클래스로 공통된 속성들을 한 번에 정의한다.
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




// 2) 상속: extends 라는 키워드를 이용해서 Shape 클래스를 연장한다. (공통적으로 사용된 속성값을 재사용)

class Rectangle extends Shape {} 
// 위와 같이 쓰면 Shape 클래스에 있는 fields와 methods가 자동적으로 Rectangle 클래스에 포함이 된다.

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw(); // drawing blue color!
console.log(rectangle.getArea()); // 400




// 3) 다양성: Shape 클래스에 있는 methods를 오버라이딩(overriding)해서 사용할 수 있다.
class Triangle extends Shape {
  draw() {
    super.draw(); // super를 쓰면 Shape 클래스에 있는 draw() 메소드를 그대로 가지고 오게 된다.
    console.log('🔺');
    /* 
    부모(Shape) 클래스에 있는 메소드를 그대로 쓰면서 자식(Triangle) 클래스에 새로운 코드를 추가하고 싶을 때
    super.함수(); 이렇게 써 주면 된다.
    (constructor 바깥에서 super를 쓰면 부모 클래스의 prototype을 의미한다.)
    */
  }

  getArea() { // 오버라이딩 (Shape에서 썼던 함수를 재정의했다.)
    return (this.width * this.height) / 2;
  }

  toString() { // Object에 있는 함수를 오버라이딩했다.
    return `Triangle color: ${this.color}!`;
  }

}

const triangle = new Triangle(20, 20, 'red');
triangle.draw(); // drawing red color!🔺
console.log(triangle.getArea()); // 200
console.log(triangle.toString()); // Triangle color: red!






/********************************* 6. Class checking: instanceOf *********************************/

/*
< instanceOf operator연산자 >

A instanceOf B =>  A 오브젝트가 B 클래스의 인스턴스인지 여부를 확인한다. true/false를 리턴.

*/

console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle); // true
console.log(triangle instanceof Shape); // true  <= Shape을 상속했기 때문에 true
console.log(triangle instanceof Object); // true <= 자바스크립트에서 만든 모든 오브젝트는 Object를 상속한 것이다.

/*
VSC에서 Object 글자 위에 ctrl키 누르고 클릭하면 Object를 정의하는 창이 하나 나온다. 
거기서 interface Object 부분으로 가면 toString(), valueOf() 등 함수들이 쭉 나온다.

자바스크립트에서 만든 모든 오브젝트는 Object를 상속한 것이다.
=====> 이 말은 모든 오브젝트는 공통적으로 존재하는 메소드를 사용할 수 있다.
*/


