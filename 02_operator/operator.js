// 1. String concatenation
console.log('my' + ' cat');
console.log('1' + 2);
console.log(`string literals: 1 + 2 = ${1 + 2}`);
console.log('ellie\'s book'); // 같은 따옴표 안에 따옴표 넣을 때 백 슬러시 넣어야
console.log("ellie's \n\tbook"); // \n 넣으면 줄바꿈 된다. \t 넣으면 탭 키(들여쓰기)

// 2. Numeric operators
console.log(1 + 1); // add
console.log(1 - 1); // substract
console.log(1 / 1); // divide
console.log(1 * 1); // multiply
console.log(5 % 2); // remainder
console.log(2 ** 3); // exponentiation

// 3. Increment and decrement operators
let counter = 2;
const preIncrement = ++counter;
// counter = counter + 1;
// preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const postIncrement = counter++;
// postIncrement = counter;
// counter = counter + 1;
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`);
const preDecrement = --counter;
console.log(`preDecrement: ${preDecrement}, counter: ${counter}`);
const postDecrement = counter--;
console.log(`postDecrement: ${postDecrement}, counter: ${counter}`);

// preIncrement 설명: counter에 1을 더해서 counter에 값을 할당한 다음에 preIncrement에 counter의 값을 할당하는 것이다.
// postIncrement 설명: 먼저 변수의 값을 postIncrement에 할당한 다음에 , counter의 값을 1을 증가시키는 것이다.


// 4. Assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y;
x *= y;
x /= y;

// 5. Comparison operators
console.log(10 < 6); // less than
console.log(10 <= 6); // less than or equal
console.log(10 > 6); // greater than
console.log(10 >= 6); // greater than or equal




// 6. Logical operators: || (or), && (and), ! (not)
const value1 = true;
const value2 = 4 < 2;

// || (or), finds the first truthy value
console.log(`or: ${value1 || value2 || check()}`);
// or 연산자는 true를 만나면 거기서 멈춘다. value1이 true면 거기서 멈추고, check()을 실행하지 않는다.
// 따라서 check()이 연산이 많이 들어가고 복잡하다면 앞에다 쓰면 안되고, 제일 마지막에 참거짓을 판별하도록 하는 것이 좋다.
// 왜냐하면 간단한 것부터 참거짓 판단하는게 더 효율적이기 때문. 

// && (and), finds the first falsy value
console.log(`and: ${value1 && value2 && check()}`);

// often used to compress long if-statement
// nullableObject && nullableObject.something

function check() {
  for (let i = 0; i < 10; i++) {
    //wasting time
    console.log('😱');
  }
  return true;
}

// ! (not)
console.log(!value1); // false


// 7. Equality
const stringFive = '5';
const numberFive = 5;

// == loose equality, with type conversion
console.log(stringFive == numberFive); // true
console.log(stringFive != numberFive); // false

// === strict equality, no type conversion
console.log(stringFive === numberFive); // false
console.log(stringFive !== numberFive); // true

// object equality by reference
const ellie1 = { name: 'ellie' };
const ellie2 = { name: 'ellie' };
const ellie3 = ellie1;
console.log(ellie1 == ellie2); // false. ellie1 과 ellie2에 다른 레퍼런스가 들어있음. 그 다른 레퍼런스는 서로 다른 오브젝트를 가르킨다.
console.log(ellie1 === ellie2); // false
console.log(ellie1 === ellie3); // true

// equality - puzzler
console.log(0 == false); // true. 0과 null, undefined 모두 false 이다. 
console.log(0 === false); // false. 0은 불리언타입이 아니기 때문에 false이다. 
console.log('' == false); // true. empty 문자열은 false 이다.
console.log('' === false); // false. empty 문자열은 불리언타입이 아니기 때문에 false이다. 
console.log(null == undefined); // true. 여기서는 같은 것으로 간주된다.
console.log(null === undefined); // false. 여기서는 다른 타입으로 간주된다.


// 8. Conditional operators: if
// if, else if, else
const name = 'df';
if (name === 'ellie') { // name에 줄 그어져 있는데, 오류는 아닌데 위에서 name을 오브젝트 안에 키 이름으로 썼기 때문에 그렇다.
  console.log('Welcome, Ellie!');
} else if (name === 'coder') {
  console.log('You are amazing coder');
} else {
  console.log('unkwnon');
}


// 9. Ternary operator: ?
// condition ? value1 : value2;
console.log(name === 'ellie' ? 'yes' : 'no'); // no
// true면 왼쪽 실행 아니면 오른쪽 실행. 간단한거 할 때 쓴다. 복잡하면 if나 switch를 쓴다.

// 10. Switch statement
// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in TS
const browser = 'IE';
switch (browser) {
  case 'IE':
    console.log('go away!');
    break;
  case 'Chrome':
  case 'Firefox':
    console.log('love you!'); // 크롬과 파폭은 같은 메시지 출력이라 이렇게 묶어서 표기할 수 있다. 
    break;
  default:
    console.log('same all!');
    break;
}

// 11. Loops
// while loop, while the condition is truthy,
// body code is executed.
let i = 3;
while (i > 0) {
  console.log(`while: ${i}`);
  i--;
}

// do while loop, body code is executed first,
// then check the condition.
do {
  console.log(`do while: ${i}`);
  i--;
} while (i > 0);
// 블럭을 먼저 실행하고 싶다면 do~ while문을 쓰고
// 조건문이 맞을 때만 블럭을 실행하고 싶다면 while을 쓴다.


// for loop, for(begin; condition; step)
for (i = 3; i > 0; i--) {
  console.log(`for: ${i}`);
}

for (let i = 3; i > 0; i = i - 2) {
  // inline variable declaration (for 안에서 변수 선언해서 쓰는 방법이다.)
  console.log(`inline variable for: ${i}`);
}

// nested loops
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`i: ${i}, j:${j}`);
  }
}

// break, continue
// break는 loop를 완전히 끝내는 것
// continue는 지금 것만 스킵하고 다시 다음으로 넘어가는 것.

// Q1. iterate from 0 to 10 and print only even numbers (use continue) 
// 숫자를 0부터 10까지 짝수만 출력
for (let i = 0; i < 11; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(`q1. ${i}`);
} // 공부용으로 이렇게 한거지 실제로 할 때는 짝수일 때만 출력하도록 한다.

// Q2. iterate from 0 to 10 and print numbers until reaching 8 (use break) 
// 숫자를 0부터 10까지 범위 내에서 차례대로 나열하되 8만나면 그만하기
for (let i = 0; i < 11; i++) {
  if (i > 8) {
    break;
  }
  console.log(`q2. ${i}`);
}




