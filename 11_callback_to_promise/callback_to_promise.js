'use strict';

/* 콜백지옥 코드를 Promise를 사용해서 깔끔하게 바꿔보기 */

class UserStorage { // 사용자의 정보를 서버에서 받아오는 클래스

  // 사용자 로그인 API
  loginUser(id, password) { 
    return new Promise((resolve, reject)=>{
      setTimeout(() => { 
        if (
          (id === 'ellie' && password === 'dream') ||
          (id === 'coder' && password === 'academy')
        ) {
          resolve(id); // 로그인 성공시 호출
        } else {
          reject(new Error('not found')); // 로그인 실패시 호출
        }
      }, 2000);
    })
  }

  // 사용자의 데이터를 받아서 사용자마다 가지고 있는 역할(guest,admin 등)들을 서버에게 다시 요청해서 정보를 받아오는 API
  getRoles(user) {
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if (user === 'ellie') {
          resolve({ name: 'ellie', role: 'admin' }); // 성공시 호출
        } else {
          reject(new Error('no access')); // 실패시 호출
        }
      }, 1000);
    })    
  }

}


const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your passrod');

/*
userStorage.loginUser(id,password)
  .then(user => userStorage.getRoles(user)) // .then(userStorage.getRoles) 이렇게 축약 가능
  .then(user => alert(`Hello ${user.name}, you have a ${user.role} role`))
  .catch(error => console.log(error)) // .catch(console.log(error)) 이렇게 축약 가능
*/

// promise chaining 한 것을 async와 await을 사용해서 바꿔 보았다. 
async function login(){
  try {
    const user = await userStorage.loginUser(id,password);
    const role = await userStorage.getRoles(user);
    return alert(`Hello ${role.name}, you have a ${role.role} role`);

  } catch(error) {
    console.log(error);
  }
}

login();


