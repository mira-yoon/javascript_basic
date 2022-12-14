'use strict';

/* 
< Arrayπ >

λΉμ·ν μ’λ₯μ λ°μ΄ν°λ₯Ό λ¬Άμ΄μ΄ ν κ³³μ λ³΄κ΄ν΄ λμ κ²μ μλ£κ΅¬μ‘°λΌκ³  νλ€.

λ³΄ν΅ λ€λ₯Έ μΈμ΄μμλ λμΌν νμμ μΈμ΄λ§ νλμ μλ£κ΅¬μ‘°μ λ΄μ μ μλ€. 

νμ§λ§ μλ°μ€ν¬λ¦½νΈλ dynamically typed languageλ‘, νμμ΄ λμ μΌλ‘ μ μκ° λλ€. 

λ°λΌμ ν λ°κ΅¬λ μμ λ€μν μ’λ₯μ λ°μ΄ν°λ₯Ό λ΄μ μ μλ€. 
νμ§λ§ κ·Έλ° μμΌλ‘ νλ‘κ·Έλλ°νλ κ²μ μ’μ§ μλ€.

*/

/********************************* 1. Declaration ********************************/
const arr1 = new Array(); // λ°°μ΄ λ§λλ λ°©λ² 1
const arr2 = [1, 2]; // λ°°μ΄ λ§λλ λ°©λ² 2




/********************************* 2. Index position ********************************/

const fruits = ['π', 'π'];
console.log(fruits);
console.log(fruits.length); // 2
console.log(fruits[0]); // π
console.log(fruits[1]); // π
console.log(fruits[2]); // undefined
console.log(fruits[fruits.length - 1]); // π μ μΌ λ§μ§λ§ index λ°μμ¬ μ μλ€
console.log("----------------- κ΅¬λΆμ  ^____^ ---------------------")





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
//fruits.forEach((fruit) => console.log(fruit)); // ν μ€λ§ μμΌλ©΄ arrow function μμ {} μλ΅ κ°λ₯

fruits.forEach((fruit,index,array) => {
  console.log(fruit);
  console.log(index);
  console.log(array);
});


/*
forEach λΌλ apiλ μ½λ°±ν¨μλ₯Ό λ°μμ¨λ€. 
VSCμμ forEach κΈμλ₯Ό ctrlν€ λλ₯΄κ³  ν΄λ¦­νλ©΄ forEachμ λν μ μνλ μ°½μ΄ λμ¨λ€. 
μ§μ  apiλ€μ λν μ μλ₯Ό μ½μ΄λ³΄λ©΄μ κ³΅λΆνλ©΄ λ§€μ° μ’λ€. 
μλλ forEachμ λν μ μλ₯Ό κ°μ Έμ¨ κ²

  -----------------------------------------------------------------------------
  * Performs the specified action for each element in an array.
  - λ°°μ΄μ κ° μμλ€μ μν΄μ νΉμ ν μ‘μμ μννλ€.
  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
  
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  ----------------------------------------------------------------------------- 

  1) forEachλΌλ ν¨μλ 2κ°μ§ νλΌλ―Έν°κ° μ λ¬λλ€. 
  - νλΌλ―Έν° 1μ callbackfn: (value: T, index: number, array: T[]) => void
  - νλΌλ―Έν° 2λ thisArg?

  2) νλΌλ―Έν°1μ μ½λ°±ν¨μμΈλ°, μ½λ°±ν¨μμλ 3κ°μ§μ μΈμκ° λ€μ΄μ¨λ€. 
  - μΈμ 1μ value (λ°°μ΄μ elementλ€)
  - μΈμ 2λ λ°°μ΄μ index 
  - μΈμ 3μ λ°°μ΄ μ μ²΄

  3) νλΌλ―Έν°2λ₯Ό μ΄ν΄λ³΄λ©΄ λ§μ§λ§μ λ¬Όμν(?)λ‘ λλλλ° μ΄κ²μ νλΌλ―Έν°λ₯Ό μ λ¬ν΄λ λκ³ , μ λ¬νμ§ μμλ λλ€λ λ»μ΄λ€.

*/

console.log("----------------- κ΅¬λΆμ  ^____^ ---------------------")


/********************************* 4. Addtion, deletion, copy ********************************/

// push: add an item to the end - λ§¨ λ€μ μμ΄ν νλ λ£κΈ°
fruits.push('π', 'π');
console.log(fruits);

// pop: remove an item from the end - λ§¨ λ€λΆν° μμ΄ν νλ μ­μ νκΈ°
fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the benigging - λ§¨ μμ μμ΄ν νλ λ£κΈ° 
fruits.unshift('π', 'π');
console.log(fruits);

// shift: remove an item from the benigging - λ§¨ μλΆν° μμ΄ν νλ μ­μ νκΈ°
fruits.shift();
fruits.shift();
console.log(fruits);

/* 
note!! κ·Έλ°λ° shift,unshiftλ pop,pushλ³΄λ€ ν¨μ¬ λ λλ¦¬λ€.

λ€μ μμ΄νμ μΆκ°νλ κ²μ λΉ κ³΅κ°μ μΆκ°νλ κ²μ΄κΈ° λλ¬Έμ
λ£κ³  λΉΌκ³ κ° λΉ λ₯΄κ² λμ§λ§

μμμ μμ΄νμ μΆκ°νλ κ²μ λ°°μ΄ μ μ²΄μ μμ΄νμ νλμ© λ€λ‘ μ΄λμν€κ³  
λ§¨ μμ λΉ κ³΅κ°μ λ§λ ¨ν΄μ λ£λ κ²μ΄κΈ° λλ¬Έμ μκ°μ΄ κ±Έλ¦΄ μ λ°μ μλ€.
κ·Έλμ μ΄λ¦μ΄ shift λΉκ²¨μ€λ€ μ΄λ° μλ―ΈμΈ κ²μ΄λ€. 

κ°λ₯νλ©΄ shift,unshift λ³΄λ€λ pop,pushλ₯Ό μ¬μ©νλ κ²μ΄ μ’λ€.
*/


// splice: remove an item by index position
fruits.push('π', 'π', 'π');
console.log(fruits); // Β ['π', 'π', 'π', 'π', 'π']

fruits.splice(1, 1); // μΈλ±μ€ 1 μλ¦¬μ 1κ°λ₯Ό μ§μμ€ (λ°λλ μ§μμ€)
console.log(fruits);  // ['π', 'π', 'π', 'π']

fruits.splice(1, 0, 'π', 'π'); // μΈλ±μ€ 1 μλ¦¬μ 0κ°λ₯Ό μ§μ°κ³  μ¬κ³Ό, μλ°μ λ£μ΄μ€
console.log(fruits); // ['π', 'π', 'π', 'π', 'π', 'π'] 
// μΈλ±μ€ 1 μλ¦¬μ μλ λΈκΈ°κ° λ€λ‘ λ°λ €λκ³  μΈλ±μ€ 1μλ¦¬μ μ°¨λ‘λλ‘ μ¬κ³Ό, μλ°μ΄ λ€μ΄κ°κ² λμλ€.

/*

splice(start: number, deleteCount?: number)
splice(μμ μΈλ±μ€ λ²νΈ, μ§μΈ κ°―μ)

- deleteCount? μ΄λ κ² λ¬Όμνκ° μμΌλ©΄ μ§μΈ κ°―μλ μ§μ ν΄λ λκ³  μ ν΄λ λλ€λ μλ―Έλ€.

splice(start: number, deleteCount: number, ...items: T[])
splice(μμ μΈλ±μ€ λ²νΈ, μ§μΈ κ°―μ, μ§μ΄ μλ¦¬μ λ£μ μμ΄ν)

*/




// combine two arrays
const fruits2 = ['π', 'π₯₯'];
const newFruits = fruits.concat(fruits2); // fruits λ°°μ΄ λ€μ fruits2 λ°°μ΄μ΄ μ°κ²°λμ΄ ν©μ³μ§λ€.
console.log(newFruits);

console.log("----------------- κ΅¬λΆμ  ^____^ ---------------------")


/********************************* 5. Searching ********************************/

// indexOf: find the index
console.log(fruits); // ['π', 'π', 'π', 'π', 'π', 'π']
console.log(fruits.indexOf('π')); // 0
console.log(fruits.indexOf('π')); // 2
console.log(fruits.indexOf('π₯₯')); // -1  <=== μλ κ°μ -1μ΄ μΆλ ₯λλ€.

// includes μμ΄νμ΄ μλμ§ μλμ§ μ¬λΆ
console.log(fruits.includes('π')); // true
console.log(fruits.includes('π₯₯')); // false

// lastIndexOf
fruits.push('π');
console.log(fruits); // ['π', 'π', 'π', 'π', 'π', 'π', 'π']
console.log(fruits.indexOf('π')); // 0
console.log(fruits.lastIndexOf('π')); // 6
console.log(fruits.lastIndexOf('π₯₯')); // -1   <=== μλ κ°μ -1μ΄ μΆλ ₯λλ€.

/*
λ°°μ΄μ λκ°μ λ°μ΄ν°κ° νλ λ μμ λ indexOf()λ₯Ό μ΄λ€λ©΄?
=> μ²« λ²μ§Έ μμ΄νμ μΈλ±μ€λ²νΈλ§ λ¦¬ν΄νλ€. 

λ°°μ΄μ λκ°μ λ°μ΄ν°κ° νλ λ μμ λ lastIndexOf()λ₯Ό μ΄λ€λ©΄?
=> λ§μ§λ§ μμ΄νμ μΈλ±μ€λ²νΈλ§ λ¦¬ν΄νλ€. 
*/


