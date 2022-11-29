
/*

async & await는 Promise를 좀 더 간결하고 간편하고, 동기적으로 실행되는 것 처럼 보이게 만들어준다. 
async & await은 새로운 것이 추가된 것이 아니라 기존에 존재하는 Promise 위에 조금 더 간편한 API를 제공한다. 
async & await은 syntactical sugar이다. 
(syntactical sugar : 기존에 존재하는 것 위에 또는 기존에 존재하는 것을 감싸서 간편하게 쓸 수 있는 API를 제공하는 것)



********************************************* 1. async *********************************************


사용자의 데이터를 백엔드에서 받아오는데 10초 걸리는 함수가 있다고 가정해 보자. 
10초가 지나면 사용자 이름인 'ellie'를 리턴한다. 

---------------------------------------------------------
  function fetchUser() {
    // do network reqeust in 10 secs....
    return 'ellie';
  }

  const user = fetchUser();
  console.log(user);
---------------------------------------------------------

fetchUser() 가 호출되었네? 
-> 함수가 선언된 곳으로 가서 함수의 코드블럭 {} 을 실행한다. 
-> 10초가 걸리기 때문에 10초 동안 머무르고 있다가 
-> 10초가 지나서 성공적으로 네트워크 데이터를 받아오게 되면 
-> 그제서야 다음줄로 넘어가서 'ellie'를 리턴한다. 
-> 'ellie'가 const user에 할당이 되고 다음줄로 넘어가서 
-> console.log(user);가 실행되서 콘솔창에 출력된다. 


이렇게 오래 걸리는 코드에 비동기적인 처리를 전혀 하지 않으면
자바스크립트 엔진은 동기적으로 코드를 수행한다. 
(다음 줄로 넘어가지 않고 10초 걸리는 작업에서 10초간 머무르게 된다. 
만약 이 코드 뒤에 UI를 불러오는 코드가 있다면 10초 동안 화면에 UI가 나오지 않게 되는 것이다.)


Promise를 이용해서 비동기적인 처리를 하면 이렇게 한다. 

---------------------------------------------------------
  function fetchUser() {
    return new Promise((resolve, reject)=>{
      // do network reqeust in 10 secs....
      resolve('ellie');
    })
  }

  const user = fetchUser();
  user.then( (name)=> {console.log(name)} );
  console.log(user);
---------------------------------------------------------

언제 유저의 데이터를 받아올진 모르겠지만 약속할께. 
Promise 라는 오브젝트를 갖고 있으면, 여기에 네가 then() 이라는 콜백함수만 등록해 놓으면 
유저의 데이터가 준비되는 대로 네가 등록한 콜백함수(Promise가 전달하는 콜백함수 executor)를 불러줄께. 

*/


// async 키워드를 사용하면 {}코드블럭 안에 있는 코드들이 자동적으로 Promise로 변환된다. 
async function fetchUser() {
  // do network reqeust in 10 secs....
  return 'ellie';
}

const user = fetchUser();
user.then(console.log);
console.log(user); // 콘솔창에서 user가 Promise를 리턴하는 것을 확인할 수 있다. 





/********************************************* 2. await ✨ *********************************************/

// await 키워드는 async가 붙은 함수 안에서만 쓸 수 있다.

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
< async와 await 키워드를 쓰지 않는 방식 >

function getApple() {
  return delay(3000)
  .then(()=>'🍎');
}
*/

async function getApple() {
  await delay(2000); // delay()가 끝날 때 까지 기다려라 
  return '🍎'; // 2초 후에 사과를 리턴한다. 
}

async function getBanana() {
  await delay(1000); // delay()가 끝날 때 까지 기다려라 
  return '🍌'; // 1초 후에 바나나를 리턴한다. 
}

/*

========== async과 await 키워드를 쓰지 않고 Promise chaining을 이용한 방식 ==========


function pickFruits() {
  return getApple().then(apple =>{
    return getBanana().then(banana => `${apple} + ${banana}`);
  })
}

pickFruits().then(console.log); // 3초 후에 콘솔창에 🍎 + 🍌가 찍힌다. 



- 그런데 Promise도 중첩적으로 사용하게 되면 콜백지옥과 비슷한 문제점이 발생한다. 


======================== async과 await 키워드를 사용한 방식 ========================

- await은 프로미스 실패 시 에러가 나고 멈춘다. 
- 그러므로 try {} catch {} 구문을 사용한다.

async function pickFruits() {
  try{ 
    const apple = await getApple();
    const banana = await getBanana();
  } catch {
    console.log("error!");
  }
  
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log); // 3초 후에 콘솔창에 🍎 + 🍌가 찍힌다. 


그런데 이 방식에도 문제가 있다. 
이렇게 하면 사과를 받는데에 2초가 지나고, 바나나를 받는데에 또 다시 1초가 지난다. 
이렇게 순차적으로 진행하게 되면 비효율적이 될 수 있다. 
사과를 받는 것과 바나나를 받는 것은 서로 연관이 없기 때문에 기다릴 필요가 없다. 

*/


/************** await 병렬처리  **************/

async function pickFruits() {
  const applePromise = getApple(); // 이렇게 프로미스를 만드는 순간 프로미스 안에 있는 코드블럭이 실행된다. 
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log); // 2초 후에 콘솔창에 🍎 + 🍌가 찍힌다. 


/*
사과와 바나나를 병렬적으로 동시에 받아왔기 때문에 2초가 걸린 것이다. 

그런데 사과를 받는 것과 바나나를 받는 것은 서로 연관이 없다. 
이렇게 병렬적으로 수행하는 것이 가능한 경우에는 
위와 같이 코드를 작성하지 않고, Promise에서 제공한 API를 이용한다. 
*/




/********************************************* 3. useful APIs ✨ *********************************************/

/*
Promise.all(Promise 배열);

Promise에 있는 all()이라는 API에 Promise 배열을 전달하게 되면 
모든 Promise들이 병렬적으로 다 받아질 때까지 모아주는 역할을 한다. 
*/


// all()을 쓰면 무엇을 리턴하는지 테스트
function testPickAllFruits() {
  return Promise.all([getApple(), getBanana()]);
}
testPickAllFruits().then((fruits) => console.log(fruits)); // 2초 후에 콘솔창에 ['🍎', '🍌'] 가 찍힌다. 


// join() 으로 스트링으로 바꿔서 리턴
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then(fruits =>
    fruits.join(' + ')
  );
}
pickAllFruits().then(console.log); // 2초 후에 콘솔창에 🍎 + 🍌 가 찍힌다. 


/*
Promise.race(Promise 배열);
무엇이든 상관 없고 먼저 받아지는 첫 번째 과일만 받아오고 싶을 때 사용한다. 
*/

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log); // 1초 후에 콘솔창에 🍌가 찍힌다. 


