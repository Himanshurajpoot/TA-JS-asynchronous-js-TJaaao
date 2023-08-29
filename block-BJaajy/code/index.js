

// let userList = ['getify', 'ravillo', 'prank7', 'suraj122', 'kumaarsachin'];

// let userPromise = userList.map( (user) => {
//   return fetch( `https://api.github.com/users/ ${user}`).then((res) =>
//     res.json()
//   );

// });
// console.log(userPromise)

// Promise.all(userPromise).then((users) => {
//   users.forEach((user) => console.log(user.followers));
// });


let dog = fetch('https://random.dog/woof.json')
  .then((res) => res.json())

let cat = fetch('https://aws.random.cat/meow')
  .then((res) => res.json())
  
Promise.race([dog, cat]).then(console.log);
