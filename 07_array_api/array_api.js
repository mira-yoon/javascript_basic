

/******************************************* join *******************************************/
// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const result1 = fruits.join();
  const result2 = fruits.join(' & ');
  console.log(result1); // apple,banana,orange
  console.log(result2); // apple & banana & orange
}

/*
join()
배열에 있는 모든 아이템을 더해서 string으로 리턴한다.

join(separator?: string)
인자에 seperator를 넣을 수 있다. 

- seperator란? 각각의 아이템을 구분할 수 있는 어떤 데이터. (여기서는 string 타입)

*/




/******************************************* split *******************************************/
// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const result = fruits.split(',');
  console.log(result); // ['🍎', ' 🥝', ' 🍌', ' 🍒']
}

/*
split(separator: string | RegExp, limit?: number): string[];
전달된 seperator을 사용해서 string을 여러가지 문자열로 잘게 나눈 뒤 배열로 리턴한다.

- seperator란? 각각의 아이템을 구분할 수 있는 어떤 데이터. (string, 정규표현식)
- limit란? 리턴받을 배열의 사이즈 (number)

*/





/******************************************* reverse *******************************************/
// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  const result = array.reverse();
  console.log(result); // [5, 4, 3, 2, 1]
  console.log(array); // [5, 4, 3, 2, 1]   <=== reverse함수를 호출한 array배열 자체도 순서가 바뀌어 있다.
}





/******************************************* slice *******************************************/
// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  const result = array.slice(2, 5); // 2번 인덱스부터 5번 인덱스 전 까지 제거한 뒤에 리턴해주세요
  console.log(result); // [3, 4, 5]
  console.log(array); // [1, 2, 3, 4, 5] <==== slice함수를 호출한 array는 그대로다.

  //splice와 비교
  const array2 = ['가', '나', '다', '라', '마'];
  const result2 = array2.splice(0, 2); // 0인덱스부터 2개를 삭제하고 그 삭제한 부분을 배열로 리턴해주세요
  console.log(result2); // ['가', '나']  <==== 삭제된 요소들이 배열로 리턴된다.
  console.log(array2); // ['다', '라', '마'] <==== splice함수를 호출한 array2배열 자체에서 2개의 요소가 삭제되었다.
}

/*
slice(start?: number, end?: number): T[];
-------------------------------------------------------------
*** Returns a section of an array. - 배열의 한 부분을 리턴한다
*** start : The beginning of the specified portion of the array. - 배열의 특정 부분의 시작
*** end : The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
- 배열의 특정 부분의 끝. 마지막 인덱스 요소는 제외된다.
-------------------------------------------------------------

- splice는 배열 자체를 수정하고, slice는 배열에서 원하는 부분만 리턴해서 사용하고 싶을 때 사용한다.
*/





/******************************************* find *******************************************/
// Q5. find a student with the score 90

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

{
  const result = students.find((student, index) => {
    console.log(student);
    console.log(index);
    return student.score === 90;
  });
  console.log(result);
  // const result = students.find((student) => student.score === 90); // 한 줄이면 {}와 return을 생략하고 쓸 수 있다.
}

/*
find() 안에 있는 콜백함수는 배열에 있는 모든 아이템마다 호출이 되는데, 
true를 리턴하게 되면 당장 find 메소드가 멈추게 되고 첫 번째로 true가 된 아이템을 리턴하게 된다. 

find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
---------------------------------------------------------------------------------------
*** Returns the value of the first element in the array where predicate is true, and undefined
- predicate(콜백함수)가 참인 배열에서 첫번째 요소의 값을 리턴한다. 찾지 못하면 undefined를 리턴한다.

---------------------------------------------------------------------------------------
1) 파라미터 1 - predicate: (this: void, value: T, index: number, obj: T[]) => value is S
2) 파라미터 2 - thisArg?
3) predicate는 콜백함수를 가리키는데, 불리언값을 반환하는 함수
4) 콜백함수는 인자를 4개 가진다 - this, value, index, object 
5) value is S <=== 함수는 불리언값으로 무언가가 정의되는 함수를 전달해주면 된다.
*/




/******************************************* filter *******************************************/
// Q6. make an array of enrolled students
{
  
  // const result = students.filter((student) => {
  //   return student.enrolled;
  // }); 이렇게 쓴 것을 아래와 같이 {}와 return을 생략하고 쓸 수 있다.
  const result = students.filter((student) => student.enrolled);
  console.log(result);
}

/*
filter()는 콜백함수를 전달해서 콜백함수가 true인 아이템만 모아서 새로운 배열을 리턴한다.
*/




/******************************************* map *******************************************/
// Q7. make an array containing only the students' scores 
// 학생들의 배열에서 점수만 들어있는 새로운 배열 만들기
// result should be: [45, 80, 90, 66, 88]
{
  const result = students.map((student) => student.score);
  console.log(result);
}
/*
mapping은 배열 안에 들어있는 요소 한가지 한가지를 다른 것으로 변환해주는 것을 말한다.
map()은 지정된 콜백함수를 호출하면서, 각각의 아이템들을 함수를 거쳐서 다시 새로운 값으로 변환해준다.

콜백함수로 전달되는 인자는 value, item 이런 것보다는 이해하기 쉽게 student 이렇게 이름짓는 것이 좋다.
*/

// 예시2
{
  const arr = [2,4,6,8,10];
  const result = arr.map((item)=>{
    return item*2;
  });
  console.log(arr); // [2, 4, 6, 8, 10]
  console.log(result); // [4, 8, 12, 16, 20]
}





/******************************************* some, every *******************************************/
// Q8. check if there is a student with the score lower than 50
{
  const result = students.some((student) => student.score < 50); 
  // student.score < 50  가 true인 요소가 하나라도 있으면 true를 반환한다.
  console.log(result); // true

  const result2 = !students.every((student) => student.score >= 50);
  // 모든 학생들이 50점보다 높은게 아니라면 true를 반환
  console.log(result2); // true
}

/*
some()은 배열의 요소 중에서 콜백함수가 true를 리턴하는지 아닌지 여부를 확인해준다.

every()는 배열의 모든 요소가 조건을 충족해야지만 true를 반환한다.
*/





/******************************************* reduce *******************************************/
// Q9. compute students' average score
{
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result / students.length); // 73.8
}
/*
reduce((이전값, 현재값)=>{},initial value)
- 콜백함수는 배열안의 모든 요소들마다 호출된다.
- 콜백함수에서 리턴되는 값은 누적된 결과값이다.
- initial value에 원하는 시작점을 입력할 수 있다.
- 우리가 원하는 시작점부터 모든 배열을 돌면서 어떤 값을 누적할 때 사용한다.
*/

//예시 1
{
  const arr = [10,11,12,13,14];
  const result = arr.reduce((prev, curr,currIndex) => {
    console.log('---------------');
    console.log("prev:"+ prev);
    console.log("curr:"+ curr);
    console.log("index:"+ currIndex);
    return curr; 
    // 리턴값을 써 주지 않으면 두 번째부터 prev는 undefined로 나온다.
    // 배열의 요소 하나하나는 순차적으로 curr에 전달이 된다.
    // 리턴한 값이 그 다음에 호출될 때 prev가 된다.
  }); // initial value를 써주지 않으면 prev는 0번째 인덱스, curr은 1번째 인덱스부터 시작한다. 
  console.log(result); // 14
}



//예시 2
{
  const result = students.reduce((prev, curr) => {
    console.log('---------------');
    console.log(prev);
    console.log(curr);
    return prev + curr.score; 
    // 최초의 리턴값인 "0 + curr.score"가 그 다음에 호출될때 prev가 된다. 그렇게 누적되서 더해진다.
  },0); // initial value를 0으로 해 주면 0부터 시작하게 된다.
  console.log(result); // 369  => score이 다 더해져서 출력된다.
}




/******************************************* 문제 10 *******************************************/
// Q10. make a string containing all the scores
// 50점 이상만 string으로 변환하기
{
  const result = students
    .map((student) => student.score)
    .filter((score) => score >= 50)
    .join();
  console.log(result); // 80,90,66,88
}

// 답 풀어 쓴 것
{
  const result1 = students.map((student) => {
      return student.score;
  });
  console.log(result1); // [45, 80, 90, 66, 88]

  const result2 = result1.filter((score) => {
    return score >= 50;
  });
  console.log(result2); // [80, 90, 66, 88]

  const result3 = result2.join();
  console.log(result3); // 80,90,66,88
}





/******************************************* 보너스 문제 *******************************************/
// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
// 낮은점수부터 정렬해서 string으로 변환하기
{
  const result = students
    .map((student) => student.score)
    .sort((a, b) => a - b)
    .join();
  console.log(result); // 45,66,80,88,90
}

/*
sort((이전값, 현재값)=>{})
- 요소의 순서를 결정하는 데 사용되는 함수
- 음수를 리턴하게 되면, 첫번째 인자가 두 번째 인자보다 작다고 간주되어서 정렬된다. 

다음 세 가지 경우를 리턴하게 된다
- 첫 번째 인자가 두 번째 인자보다 작으면 음수
- 첫 번째 인자와 두 번째 인자가 같으면 0
- 첫 번째 인자가 두 번째 인자보다 크면 양수
*/



//예시 1 
{
  const arr = [15,11,23,5,30];
  const result = arr.sort((a,b) => {
    console.log(a); // 11
    console.log(b); // 15
    console.log('----------------');
    return a - b; // 11 - 15  <= 음수이니 a가 b보다 작다고 판단
  })
  console.log(result) // [5, 11, 15, 23, 30]

  // 콘솔창에서 확인해보니 a와 b는 꼭 순서대로가 아니라
  // 배열에 있는 모든 수를 다 비교해 본다.

}



//예시 2
{
  const arr = [15,11,23,5,30];
  const result = arr.sort((a,b) => {
    return b - a; // 이렇게 하면 내림차순으로 정렬
  })
  console.log(result) // [30, 23, 15, 11, 5]
}