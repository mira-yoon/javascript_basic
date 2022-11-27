'use strict';

/*
JSON (JavaScript Object Notation)
- simplest data interchange format 
  데이터를 주고받을 수 있는 가장 간단한 파일 포맷
- lightweight text-based structure
  텍스트를 기반으로 한 가벼운 구조
- easy to read
  읽기도 편하다
- key-value pairs
  key와 value로 이루어진 파일 포맷
- used for serialization and transmission of data between the network connection
  데이터와 서버를 주고받을 때 데이터의 직렬화와 전송에 사용된다. 
- independent programming language and platform
  프로그래밍 언어와 플랫폼에 상관없이 쓰일 수 있다. 
  c언어, 파이썬, php 등 상관없이 쓰일 수 있다.

JSON 공부 포인트 
1) 오브젝트를 어떻게 serialize해서 JSON으로 변환할지 
2) 직렬화된 JSON을 어떻게 deserialize에서 오브젝트로 다시 변환할지 

*/


/*************************************** 1. Object to JSON ***************************************/

/* 
JSON.stringify(value);
value를 string으로 만들어서 JSON으로 변환한다.
*/


/************ 불리언 자료형 ************/
let json = JSON.stringify(true); // 불리언 자료형을 string으로 바꿔준다.
console.log(json);



/************ 배열 ************/
json = JSON.stringify(['apple', 'banana']);
console.log(json);
// 배열처럼 보이지만 string이다. 
// 홑따옴표를 쌍따옴표로 바꾸는데, 이것은 JSON의 규격사항이다.


/************ 객체 ************/
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  //symbol: Symbol('id'), // Symbol은 JS에만 있는 특별한 데이터인데 JSON에 포함되지 않는다.
  jump: function () { // 함수는 오브젝트에 있는 데이터가 아니기 때문에 JSON에 포함되지 않는다.
    console.log(`${this.name} can jump!`);
  },
};

json = JSON.stringify(rabbit);
console.log(json); // {"name":"tori","color":"white","size":null,"birthDate":"2022-11-27T16:48:55.972Z"}


/************ 객체에서 특정 property ************/
/*
오브젝트 중에서 특정 property만 JSON으로 변환할 수 있다.
JSON.stringify(obj, [])
이때 배열은 바꿀 property의 key를 배열로 만들어서 넣는다. 
*/

json = JSON.stringify(rabbit, ['name', 'color', 'size']);
console.log(json);



/************ 콜백함수를 사용해서 세밀하게 통제할 수 있다 ************/
/*
오브젝트를 수정해서 JSON으로 변환하려면 콜백함수를 쓸 수 있다.
JSON.stringify(obj, ()=>{} )
*/

json = JSON.stringify(rabbit, (key, value) => {
  console.log('-----------------------시작------------------------')
  console.log(key);
  console.log(value);
  console.log('------------------------끝-------------------------')
  return key === 'name' ? 'ellie' : value; 
  // key가 name이면 ellie라는 value로 설정하고, 그게 아니라면 원래 지정된 value를 넣어라
});
console.log(json); //{"name":"ellie","color":"white","size":null,"birthDate":"2022-11-27T15:51:24.264Z"}
// name이 ellie로 바뀌었다.


/*

stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
------------------------------------------------------------------------------------
Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
* @param value A JavaScript value, usually an object or array, to be converted.
* @param replacer A function that transforms the results.
* @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
------------------------------------------------------------------------------------
- 파라미터1 : value: any
- 파라미터2 : replacer?: (this: any, key: string, value: any) => any
- 파라미터3 : space?: string | number

- value : 변환할 JavaScript 값(일반적으로 객체 또는 배열)
- replacer : 콜백함수
- space : 읽기 쉽도록 반환 값 JSON 텍스트에 들여쓰기, 공백 및 줄 바꿈 문자를 추가합니다.


stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
------------------------------------------------------------------------------------
Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
* @param value A JavaScript value, usually an object or array, to be converted.
* @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
* @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
------------------------------------------------------------------------------------

- 위와 같이 replacer에 배열이 올 수도 있다

*/



/*************************************** 2. JSON to Object ***************************************/

/* 
JSON.parse(json);
json을 오브젝트로 변환한다.
*/

json = JSON.stringify(rabbit);
console.log(json); // {"name":"tori","color":"white","size":null,"birthDate":"2022-11-27T16:20:46.861Z"}

const obj = JSON.parse(json);
console.log(obj); // 콘솔창에서 확인해보면 string이 오브젝트가 되었다.

/*
그런데 우리가 JSON에서 다시 오브젝트로 변환한 오브젝트에는 jump() 함수는 없다. 
serialize된 JSON으로 부터 다시 오브젝트로 만들었기 때문에 함수는 serialize될 때 포함되어 있지 않다. 
이 점을 유의해서 코딩을 한다.
*/


console.log(rabbit.birthDate.getDate());
//console.log(obj.birthDate.getDate()); // 에러가 난다.
// obj 안에 있는 birthDate의 value는 string이다.
// 우리가 JSON으로 만들 때 birthDate의 value가 string이었기 때문에 그것을 다시 오브젝트로 만들 때도 string으로 할당된 것이다.



// JSON을 오브젝트로 변환하는데 함수를 넣고 싶을 때 콜백함수를 이용할 수 있다.
const obj2 = JSON.parse(json, (key, value) => {
  //console.log(`key: ${key}, value: ${value}`);
  console.log('-----------------------시작------------------------')
  console.log(key);
  console.log(value);
  console.log('------------------------끝-------------------------')
  return key === 'birthDate' ? new Date(value) : value;
  // key가 birthDate면 new Date(value)를 넣고, 그게 아니라면 원래 지정된 value를 넣는다.
});

console.log(obj2);
console.log(obj2.birthDate.getDate());

