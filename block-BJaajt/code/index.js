let input = document.querySelector('.input');
let userImg = document.querySelector('.user-img');
let userName = document.querySelector('.user-name');
let userGithubName = document.querySelector('.user-git-name');
let followersImg = document.querySelector('.followersImg');
let followeingImg = document.querySelector('.followingImg');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.error('Something went wrong...');
  };

  xhr.send();
}

function displayExtraInfo(url, rootElm) {
  rootElm.innerHTML = '';
  fetch(url, function (followingList) {
    let topFive = followingList.slice(0, 5);
    topFive.forEach((info) => {
      let img = document.createElement('img');
      img.classList.add('follow-img');
      img.src = info.avatar_url;
      img.alt = info.name;
      rootElm.append(img);
    });
  });
}

function handleDisplay(userInfo) {
  userImg.src = userInfo.avatar_url;
  userImg.alt = userInfo.name;
  userName.innerText = userInfo.name;
  userGithubName.innerText = '@' + userInfo.login;

  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/following`,
    followeingImg
  );
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/followers`,
    followersImg
  );
}

function handleInput(event) {
  if (event.keyCode === 13 && event.target.value) {
    const url = 'https://api.github.com/users/';
    let username = event.target.value;
    fetch(url + username, handleDisplay);
    event.target.value = '';
  }
}

input.addEventListener('keyup', handleInput);

// cat

let catImg = document.querySelector('.new-cat');
let btn = document.querySelector('.btn');

function hendleChangeCat() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      catImg.src = catInfo[0].url;
    }
  );
}
btn.addEventListener('click', hendleChangeCat);
