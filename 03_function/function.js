// Function
// - fundamental building block in the program
// - subprogram can be used multiple times
// - performs a task or calculates a value

// 1. Function declaration
// function name(param1, param2) { body... return; }
// one function === one thing
// naming: doSomething, command, verb
// e.g. createCardAndPoint -> createCard, createPoint
// function is object in JS
function printHello() {
  console.log('Hello');
}
printHello();

function log(message) {
  console.log(message);
}
log('Hello@');
log(1234);

// 2. Parameters
// primitive parameters: passed by value
// object parameters: passed by reference
function changeName(obj) {
  obj.name = 'coder';
}
const ellie = { name: 'ellie' };
changeName(ellie);
console.log(ellie);

// 3. Default parameters (added in ES6)
function showMessage(message, from = 'unknown') {
  //from = 'unknown': from에 아무것도 없어서 undefined인 경우에 디폴트값을 넣어준 것이다.
  console.log(`${message} by ${from}`);
}
showMessage('Hi!');

// 4. Rest parameters (added in ES6)
function printAll(...args) {
  //args가 배열형태로 전달된다.
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
  //위와 같이 for loop를 이용할수도 있지만

  for (const arg of args) {
    //배열 args에 있는 모든 값이 차례차례 출력된다.
    console.log(arg);
  }
  //위와 같이 for~of를 이용해서 간단하게 출력할 수도 있다.

  args.forEach((arg) => console.log(arg));
  //forEach라는 함수로 출력해도 된다.

}
printAll('dream', 'coding', 'ellie');

// 5. Local scope
let globalMessage = 'global'; // global variable
function printMessage() {
  let message = 'hello';
  console.log(message); // local variable
  console.log(globalMessage);
  function printAnother() {
    console.log(message);
    let childMessage = 'hello';
  }
  // console.log(childMessage); //error
  // return type이 안들어가 있으면
  // return undefined 가 들어있는 것이나 마찮가지다.
}
printMessage();

// 6. Return a value
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); 
console.log(`sum: ${sum(1, 2)}`); // 3

// 7. Early return, early exit
// bad
function upgradeUser(user) {
  if (user.point > 10) {
    // long upgrade logic...
  }
}

// good
function upgradeUser(user) {
  if (user.point <= 10) {
    return;
  }
  // long upgrade logic...
}

// First-class function
// functions are treated like any other variable
// can be assigned as a value to variable
// can be passed as an argument to other functions.
// can be returned by another function

// 1. Function expression
// a function declaration can be called earlier than it is defined. (hoisted)
// a function expression is created when the execution reaches it.
const print = function () {
  // anonymous function (이름이 없는 함수)
  console.log('print');
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 2. Callback function using function expression
function randomQuiz(answer, printYes, printNo) {
  if (answer === 'love you') {
    printYes();
  } else {
    printNo();
  }
  // 정답이 맞는 경우에만 printYes()라는 콜백함수를 부르고
  // 정답이 틀리면 printNo()라는 콜백함수를 부른다.
}
// anonymous function
const printYes = function () {
  console.log('yes!');
};

// named function
// better debugging in debugger's stack traces
// recursions
const printNo = function print() {
  // print() //함수 내에서 자기 스스로를 부르는 것을 recursions이라고 한다. 
  console.log('no!');
};
randomQuiz('wrong', printYes, printNo); //no!
randomQuiz('love you', printYes, printNo); //yes!

// Arrow function
// always anonymous
// const simplePrint = function () {
//   console.log('simplePrint!');
// };

// function이라는 키워드와 {}이런 블록 없이 아래와 같이 간단하게 표기할 수 있다.
const simplePrint = () => console.log('simplePrint!');
const add = (a, b) => a + b;
// function expression을 이용하면 add()라는 함수는 아래와 같이 쓴다.
// const add = function(a, b) {
//   return a + b;
// };

// Arrow function에서도 블럭이 필요하면 아래와 같이 블럭을 넣어서 쓸 수도 있다. 블럭을 쓰게 되면 return이라는 키워드로 값을 리턴해줘야 한다.
const simpleMultiply = (a, b) => {
  // do something more
  return a * b;
};

// IIFE: Immediately Invoked Function Expression
// 선언함과 동시에 호출하는 방법
(function hello() {
  console.log('IIFE');
})();

// Fun quiz time❤️
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder

function calculate(command, a, b) {
  switch (command) {
    case 'add':
      return a + b;
    case 'substract':
      return a - b;
    case 'divide':
      return a / b;
    case 'multiply':
      return a * b;
    case 'remainder':
      return a % b;
    default:
      throw Error('unknown command');
  }
}
console.log(calculate('add', 2, 3));
console.log(calculate('multiply', 2, 3));