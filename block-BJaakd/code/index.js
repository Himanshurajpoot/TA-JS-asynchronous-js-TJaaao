let input = document.querySelector('input');
let imgContainer = document.querySelector('.img-container');

function fetch(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => res(JSON.parse(xhr.response));
    xhr.onerror = () => rej('something went wrong');
    xhr.send();
  });
}

let data = fetch('https://api.github.com/users/ravindra-me').then((res) =>
  console.log(res)
);

function handleInput(event) {
  if (event.keyCode === 13&&event.target.value) {
    let value = event.target.value;
    fetch(
      `https://api.unsplash.com/search/photos?query=${value};client_id=8brv4yF1_dxrZg1D0BKrfZDNRRN0XHkrQzrGeachUoM`
    ).then((res) => {
      createUI(res.results);
      event.target.value = '';
    });
  }
}

function createUI(imgs) {
  imgContainer.innerHTML = '';
  imgs.forEach((elm) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = elm.urls.thumb;
    li.append(img);
    imgContainer.append(li);
  });
}

fetch(
  `https://api.unsplash.com/search/photos?query=${'cat'};client_id=8brv4yF1_dxrZg1D0BKrfZDNRRN0XHkrQzrGeachUoM`
).then((res) => createUI(res.results));

// createUI();

input.addEventListener('keyup', handleInput);
