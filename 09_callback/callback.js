'use strict';

/*

  JavaScript is synchronous.
  자바스크립트는 동기적이다. 

  Execute the code block in orger after hoisting.
  호이스팅이 된 이후부터 코드가 우리가 작성한 순서에 맞춰서 하나씩 실행된다. 

  hoisting: var, function declaration
  호이스팅: var변수와 함수선언이 자동적으로 제일 위로 올라가는 것

*/


/*************************************** 비동기 처리와 콜백함수 ***************************************/

/* 비동기적인 실행 방법 */
console.log('1');
setTimeout(() => console.log('2'), 1000);
console.log('3');

/*

  비동기적인 실행 방법 - setTimeout api를 사용하기

  setTimeout은 브라우저에서 제공되어지는 api이다. 
  지정한 시간이 지나면 콜백함수를 호출한다. 

  JS엔진이 setTimeout을 만나면 무조건 브라우저에 요청을 보낸다.
  그리고 응답을 기다리지 않고 바로 그 다음 줄의 코드로 넘어간다. 
  브라우저에서 1초의 시간이 지난 후에 콜백함수를 실행하라고 하면 그 때서야 console.log('2')를 실행한다.

  콜백함수는 다른 함수의 인자로 전달되는데, 나중에 호출된다. 
  나중에 호출되는 함수를 뜻함. 

*/



// Synchronous callback (동기적인 콜백)
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));


// Asynchronous callback (비동기적인 콜백)
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);


/*

  지금까지 순서

  1) 함수선언이 호이스팅되어서 제일 위로 올라간다. 

  2) console.log('1'); 실행한다.  => 동기적

  3) setTimeout(() => console.log('2'), 1000);은 일단 브라우저에 요청한다.   => 비동기적

  4) 그리고 응답을 기다리지 않고 바로 console.log('3'); 실행한다.   => 동기적

  5) printImmediately() 함수를 호출하는데, 인자를 함수(콜백함수)로 받았다.
  그 콜백함수인 console.log('hello') 를 호출한다.    => 동기적

  6) printWithDelay() 함수를 호출하는데, setTimeout 함수가 있기 때문에 브라우저에 요청한다.  => 비동기적

  7) 1초가 지난 후에 setTimeout(() => console.log('2'), 1000);의 콜백함수인 console.log('2')를 실행한다.

  8) 2초가 지난 후에 setTimeout(print, timeout);의 콜백함수인 print를 실행한다.

*/





/*************************** Callback Hell example 콜백 지옥 체험해보기 ***************************/

class UserStorage { // 사용자의 정보를 서버에서 받아오는 클래스
  // 사용자 로그인 API
  loginUser(id, password, onSuccess, onError) { 
    setTimeout(() => {
      if (
        (id === 'ellie' && password === 'dream') ||
        (id === 'coder' && password === 'academy')
      ) {
        onSuccess(id); // 로그인 성공시 호출
      } else {
        onError(new Error('not found')); // 로그인 실패시 호출
      }
    }, 2000); // 로그인하는데 2초 소요
  }

  // 사용자의 데이터를 받아서 사용자마다 가지고 있는 역할(guest,admin 등)들을 서버에게 다시 요청해서 정보를 받아오는 API
  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin' }); // 성공시 호출
      } else {
        onError(new Error('no access')); // 실패시 호출
      }
    }, 1000); // 사용자 역할을 받아오는데 1초 소요
  }
}
/*
  원래는 사용자가 로그인하면 사용자의 정보 안에 관련된 정보들을 한 번에 백엔드에서 받아오는 것이 맞지만..
  이렇게 가정해보자. 
  백엔드가 너무 오래 전에 설계가 되어서 사용자의 역할을 따로 네트워크 요청을 해서 
  다시 받아와야 하는 나쁜 백엔드라고 가정을 해 보자. 

  백엔드와 직접 통신하는 법을 배우지 않았고, 실제 백엔드가 없기 때문에 
  setTimeout 이라는 API로 시간의 delay를 주면서 네트워크통신을 하는 것 처럼 만들어본 것이다.
  로그인하는데 2초 걸리고, 사용자 역할을 받아오는데 1초가 걸린다고 가정해 보자.
*/

const userStorage = new UserStorage();

// prompt 입력창을 띄워서 사용자에게 데이터 받아오기
const id = prompt('enter your id');
const password = prompt('enter your passrod');


// userStorage.loginUser(id, password, onSuccess, onError)를 아래와 같이 쓴 것이다
userStorage.loginUser(
  id,
  password,
  user => { // 로그인 성공시 파라미터인 id가 user로 전달된다.
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {
    console.log(error);
  }
);

/*

  콜백을 이용해서 콜백 함수 안에서 무언가 다른 것을 호출하고
  그 안에서 또 다른 콜백을 전달한 위의 코드가 바로 🤪콜백지옥😵‍💫이다. 

  < 콜백 체인의 문제점 >
  1) 가독성이 떨어진다. 어떻게 연결되어있는지 로직을 한 눈에 이해하기도 어렵다. 
  2) 유지보수 어려움. 어디에서 에러가 발생했는지 파악하기 어렵다.

*/


