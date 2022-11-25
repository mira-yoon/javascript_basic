'use strict';

/* 
< Array🎉 >

비슷한 종류의 데이터를 묶어어 한 곳에 보관해 놓은 것을 자료구조라고 한다.

보통 다른 언어에서는 동일한 타입의 언어만 하나의 자료구조에 담을 수 있다. 

하지만 자바스크립트는 dynamically typed language로, 타입이 동적으로 정의가 된다. 

따라서 한 바구니 안에 다양한 종류의 데이터를 담을 수 있다. 
하지만 그런 식으로 프로그래밍하는 것은 좋지 않다.

*/

/********************************* 1. Declaration ********************************/
const arr1 = new Array(); // 배열 만드는 방법 1
const arr2 = [1, 2]; // 배열 만드는 방법 2




/********************************* 2. Index position ********************************/

const fruits = ['🍎', '🍌'];
console.log(fruits);
console.log(fruits.length); // 2
console.log(fruits[0]); // 🍎
console.log(fruits[1]); // 🍌
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]); // 🍌 제일 마지막 index 받아올 수 있다
console.log("----------------- 구분선 ^____^ ---------------------")





/********************************* 3. Looping over an array ********************************/

// print all fruits
// a. for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// b. for of
for (let fruit of fruits) {
  console.log(fruit);
}

// c. forEach
//fruits.forEach((fruit) => console.log(fruit)); // 한 줄만 있으면 arrow function 에서 {} 생략 가능

fruits.forEach((fruit,index,array) => {
  console.log(fruit);
  console.log(index);
  console.log(array);
});


/*
forEach 라는 api는 콜백함수를 받아온다. 
VSC에서 forEach 글자를 ctrl키 누르고 클릭하면 forEach에 대한 정의하는 창이 나온다. 
직접 api들에 대한 정의를 읽어보면서 공부하면 매우 좋다. 
아래는 forEach에 대한 정의를 가져온 것

  -----------------------------------------------------------------------------
  * Performs the specified action for each element in an array.
  - 배열의 각 요소들을 위해서 특정한 액션을 수행한다.
  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
  
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  ----------------------------------------------------------------------------- 

  1) forEach라는 함수는 2가지 파라미터가 전달된다. 
  - 파라미터 1은 callbackfn: (value: T, index: number, array: T[]) => void
  - 파라미터 2는 thisArg?

  2) 파라미터1은 콜백함수인데, 콜백함수에는 3가지의 인자가 들어온다. 
  - 인자 1은 value (배열의 element들)
  - 인자 2는 배열의 index 
  - 인자 3은 배열 전체

  3) 파라미터2를 살펴보면 마지막에 물음표(?)로 끝나는데 이것은 파라미터를 전달해도 되고, 전달하지 않아도 된다는 뜻이다.

*/

console.log("----------------- 구분선 ^____^ ---------------------")


/********************************* 4. Addtion, deletion, copy ********************************/

// push: add an item to the end - 맨 뒤에 아이템 하나 넣기
fruits.push('🍓', '🍑');
console.log(fruits);

// pop: remove an item from the end - 맨 뒤부터 아이템 하나 삭제하기
fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the benigging - 맨 앞에 아이템 하나 넣기 
fruits.unshift('🍓', '🍋');
console.log(fruits);

// shift: remove an item from the benigging - 맨 앞부터 아이템 하나 삭제하기
fruits.shift();
fruits.shift();
console.log(fruits);

/* 
note!! 그런데 shift,unshift는 pop,push보다 훨씬 더 느리다.

뒤에 아이템을 추가하는 것은 빈 공간에 추가하는 것이기 때문에
넣고 빼고가 빠르게 되지만

앞에서 아이템을 추가하는 것은 배열 전체의 아이템을 하나씩 뒤로 이동시키고 
맨 앞에 빈 공간을 마련해서 넣는 것이기 때문에 시간이 걸릴 수 밖에 없다.
그래서 이름이 shift 당겨오다 이런 의미인 것이다. 

가능하면 shift,unshift 보다는 pop,push를 사용하는 것이 좋다.
*/


// splice: remove an item by index position
fruits.push('🍓', '🍑', '🍋');
console.log(fruits); //  ['🍎', '🍌', '🍓', '🍑', '🍋']

fruits.splice(1, 1); // 인덱스 1 자리에 1개를 지워줘 (바나나 지워줘)
console.log(fruits);  // ['🍎', '🍓', '🍑', '🍋']

fruits.splice(1, 0, '🍏', '🍉'); // 인덱스 1 자리에 0개를 지우고 사과, 수박을 넣어줘
console.log(fruits); // ['🍎', '🍏', '🍉', '🍓', '🍑', '🍋'] 
// 인덱스 1 자리에 있던 딸기가 뒤로 밀려나고 인덱스 1자리에 차례대로 사과, 수박이 들어가게 되었다.

/*

splice(start: number, deleteCount?: number)
splice(시작 인덱스 번호, 지울 갯수)

- deleteCount? 이렇게 물음표가 있으면 지울 갯수는 지정해도 되고 안 해도 된다는 의미다.

splice(start: number, deleteCount: number, ...items: T[])
splice(시작 인덱스 번호, 지울 갯수, 지운 자리에 넣을 아이템)

*/




// combine two arrays
const fruits2 = ['🍐', '🥥'];
const newFruits = fruits.concat(fruits2); // fruits 배열 뒤에 fruits2 배열이 연결되어 합쳐진다.
console.log(newFruits);

console.log("----------------- 구분선 ^____^ ---------------------")


/********************************* 5. Searching ********************************/

// indexOf: find the index
console.log(fruits); // ['🍎', '🍏', '🍉', '🍓', '🍑', '🍋']
console.log(fruits.indexOf('🍎')); // 0
console.log(fruits.indexOf('🍉')); // 2
console.log(fruits.indexOf('🥥')); // -1  <=== 없는 값은 -1이 출력된다.

// includes 아이템이 있는지 없는지 여부
console.log(fruits.includes('🍉')); // true
console.log(fruits.includes('🥥')); // false

// lastIndexOf
fruits.push('🍎');
console.log(fruits); // ['🍎', '🍏', '🍉', '🍓', '🍑', '🍋', '🍎']
console.log(fruits.indexOf('🍎')); // 0
console.log(fruits.lastIndexOf('🍎')); // 6
console.log(fruits.lastIndexOf('🥥')); // -1   <=== 없는 값은 -1이 출력된다.

/*
배열에 똑같은 데이터가 하나 더 있을 때 indexOf()를 쓴다면?
=> 첫 번째 아이템의 인덱스번호만 리턴한다. 

배열에 똑같은 데이터가 하나 더 있을 때 lastIndexOf()를 쓴다면?
=> 마지막 아이템의 인덱스번호만 리턴한다. 
*/


