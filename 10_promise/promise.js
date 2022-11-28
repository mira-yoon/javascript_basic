'use strict';

/*
Promise is a JavaScript object for asynchronous operation.
Promise는 비동기적인 작업을 수행할 때 콜백함수 대신 유용하게 쓸 수 있는 JS 오브젝트. 

State: pending -> fulfilled or rejected
- pending: 우리가 지정한 operation을 수행 중인 상태
- fulfilled: 지정한 operation을 완료하면 성공
- rejected: 실패 

Producer vs Consumer
- Producer: 우리가 원하는 데이터를 제공하는 오브젝트 
- Consumer: 제공된 데이터를 사용한다. 
*/


/********************************************* 1. Producer *********************************************/

// when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
  console.log('doing some heavy work (network, read files)...');
  setTimeout(() => { 
    resolve('ellie'); // 성공 시 resolve 호출
    // reject(new Error('no network')); // 실패 시 reject 호출
  }, 2000);
  // Promise 안에서 네트워트 통신을 하는 것 처럼 setTimeout을 사용해서 시간의 delay를 주었다. 
});

/*

Promise는 클래스이기 때문에 new 키워드로 오브젝트를 생성한다. 
Promise의 생성자를 보게 되면 executor라는 콜백함수를 전달한다.
executor라는 콜백함수는 resolve와 reject라는 또 다른 콜백함수를 받는다.

resolve - 기능을 정상적으로 수행해서 마지막에 마지막에 최종 데이터를 전달하는 콜백함수 
reject - 기능을 수행하다가 중간에 문제가 생기면 호출하게 되는 콜백함수 

보통은 Promise 안에서 무거운 작업을 수행한다. 
네트워크에서 데이터를 받아오거나 파일에서 큰 데이터를 읽어오는 과정은 시간이 꽤 걸린다. 
그런 것을 동기적으로 처리하게 되면 파일을 읽어오고, 
네트워크에서 데이터를 받아오는 동안 그 다음 줄의 코드가 실행되지 않기 때문에 
시간이 걸리는 작업들은 Promise를 만들어서 비동기적으로 처리하는 것이 좋다. 

🎈 새 Promise를 만드는 순간 executor가 자동으로 바로 실행된다 🎈  

만약 Promise 안에 네트워크 통신을 하는 코드를 작성했다면 Promise가 만들어지는 그 순간 네트워크 통신을 수행하게 된다.
그런데 네트워크 통신을 사용자가 요구했을 경우에만 해야 하는 경우라면,
예를 들면 사용자가 버튼을 눌렀을 때 네트워크 통신을 해야 하는 경우라고 가정해보자. 
이 때 executor 안에 바로 코드를 작성하게 되면, 사용자가 요구하지도 않았는데 불필요하게 네트워크 통신을 하게 된다. 
그렇기 때문에 이 점은 유의해서 코드를 작성한다. 


< new Error() >
Error라는 클래스는 자바스크립트에서 제공하는 클래스 중 하나이다. 
그렇기 때문에 new 키워드로 Error 오브젝트를 생성했다. 
보통은 () 부분에 왜 오류가 났는지 이유를 명시해서 적는다. 

*/




/*********************************** 2. Consumers: then, catch, finally ***********************************/



promise
  .then(value => {
    console.log(value); // 2초 후에 콘솔창에 ellie가 찍힘
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally'); // 2초 후에 콘솔창에 finally가 찍힘
  });  


/*
  < Producer로 만든 데이터를 사용하는 Consumers >
  Consumers는 then, catch, finally를 이용해서 값을 받아올 수 있다. 

  - then: 정상적으로 수행됐다면 value를 받아와서 우리가 원하는 기능을 수행하는 콜백함수를 전달해준다. 
          resolve함수에서 인수로 전달된 값이 then의 파라미터인 value로 들어가게 된다. 
  - catch: 에러가 발생했을 때 어떻게 처리할 것인지 콜백함수를 등록해주면 된다. 
            reject함수에서 인수로 전달된 값이 catch의 파라미터인 error로 들어가게 된다. 
  - finally: 성공하든 실패하든 상관없이 무조건 마지막에 호출되어진다. 


  < then, catch, finally 를 붙여서 줄줄히 쓴 것에 대한 설명 >

  promise.then(value => {
    console.log(value);
  })

  위와 같이 하면 then()은 결국에 promise를 리턴한다. 

  promise.catch(error => {
    console.log(error);
  })
  promise.finally(() => {
    console.log('finally');
  }); 

  그래서 위와 같이 반복적으로 promise를 써줄 필요 없다.  

  리턴된 promise에 catch()를 다시 호출하고, 다시 finally()를 호출할 수 있다. 
  이것은 chaining이라고 한다. 

*/



/********************************************* 3. Promise chaining *********************************************/


// 서버에서 숫자를 받아오는 프로미스
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000); 
});

fetchNumber
  .then(num => num * 2) // 2
  .then(num => num * 3) // 6
  .then(num => { 
    // 6이 된 num을 다른 서버로 보내서 다른 숫자로 변환된 값을 받아온 것이다. 
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num)); // 2초 후에 콘솔창에 5가 찍힌다. 
  // 서버에서 숫자를 받아오는데 1초 소요 + 다른 서버에서 변환된 값을 받아오는데 1초 소요


  /*
  then은 값을 바로 전달할 수도 있고 
  Promise를 전달해도 된다. 

  .then((num) => {return num * 2}) 이러한 화살표함수를 아래와 같이 축약형으로 쓴 것
  .then(num => num * 2) 
  */




/********************************************* 4. Error Handling *********************************************/
// Promise를 chaining 했을 때 에러 핸들링 하는 방법

// 프로미스를 리턴하는 함수 세 가지를 만들었다. 
const getHen = () => 
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000);
    //setTimeout(() => reject(new Error(`error! ${hen}이 알을 낳지 않아요! ㅠㅠ`)), 1000);
  });
const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    //setTimeout(() => reject(new Error("error! 장작이 없어서 요리를 못 해요 ㅠㅠ")), 1000);
  });


/*********** 무엇을 리턴하는지 테스트 해보려고 쓴 코드 - 시작 ***********/
getHen().then(
  (value)=>{
    console.log(value); // 1초 후에 콘솔창에 🐓가 찍힌다. 
    return getEgg(value); // 이렇게 해주면 리턴값이 getEgg(value)가 되는 것이다. 
  } 
).then(); // 따라서 이것은 getEgg(value).then()와 같다.  

getEgg("🐓").then(
  (value)=>{console.log(value)} // 1초 후에 콘솔창에 🐓 => 🥚가 찍힌다. 
)

getEgg("🐓").catch((value)=>{
  console.log(value);  // 1초 후에 콘솔창에 "error! 🐓이 알을 낳지 않아요! ㅠㅠ"가 찍힌다. 
  return '🥐';
})

cook("🐓 => 🥚").then(
  (value)=>{console.log(value)} // 1초 후에 콘솔창에 🐓 => 🥚 => 🍳가 찍힌다. 
)
/*********** 무엇을 리턴하는지 테스트 해보려고 쓴 코드 - 끝 ***********/
  

getHen() // 닭이 받아와지면 
  .then(getEgg) //  .then((hen) => {return getEgg(hen)})
  .catch(error => { 
    // 만약 달걀을 받아오는 것을 실패했을 때 이렇게 처리를 해서 
    // 달걀 받아오기를 실패해도 요리가 완성되게 한 것이다.
    console.log(error);
    return '🥐';
  })
  .then(cook) // .then((egg) => {return cook(egg)})
  .then(console.log) // .then((meal) => {console.log(meal)}) 여기까지 3초가 걸린다. 
  .catch(console.log); // .catch((error) => {console.log(error)}); 에러가 난 경우에도 3초가 걸린다. 

/*

1. getHen() 함수로 닭을 받는다. 
3. 닭을 받는 것을 성공하면 getEgg() 함수를 실행시키는데, 이 때 닭이 getEgg() 함수로 전달된다. 
2. getEgg() 함수로 달걀을 받는다. 
4.  ===> 달걀을 받는 것을 실패하면 대신 빵을 리턴한다. 
    ===> 달걀을 받는 것을 성공하면 cook() 함수를 실행시키는데, 이 때 달걀이 cook() 함수로 전달된다. 
5. cook() 함수로 요리를 한다. 
6.  ===> 요리에 성공하면 meal을 콘솔창에 찍는다. 
    ===> 요리에 실패하면 에러메시지를 콘솔창에 찍는다. 


< 축약형 1 >
const getHen = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
}
위의 함수 형태를 아래와 같이 축약형으로 쓴 것이다. 
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });


<축약형 2>

getHen() 
  .then((hen) => {return getEgg(hen)})
  .then((egg) => {return cook(egg)})
  .then((meal) => {console.log(meal)})
  .catch((error) => {console.log(error)});


getHen() 
  .then(hen => getEgg(hen))
  .then(egg => cook(egg))
  .then(meal => console.log(meal))
  .catch(error => console.log(error));

콜백함수를 전달할 때 받아오는 value를 다른 함수로 바로 하나를 호출하는 경우에는 생략이 가능하다. 
value를 한 가지만 받아서 호출할 때 생략이 가능한 것이다.   

getHen()
  .then(getEgg)
  .then(cook)
  .then(console.log)
  .catch(console.log);  

*/