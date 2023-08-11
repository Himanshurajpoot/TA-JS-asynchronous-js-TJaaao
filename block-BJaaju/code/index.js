let input = document.querySelector('input');
let imagesCol = document.querySelector('.images-col');

function fatch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.error('Something went wrong...');
  };

  xhr.send();
}



function dispayUI(imageName='cat') {
    let url = `https://api.unsplash.com/search/photos?query=${imageName};client_id=8brv4yF1_dxrZg1D0BKrfZDNRRN0XHkrQzrGeachUoM`;
    fatch(url, function (data) {
      imagesCol.innerHTML = '';
      data.results.forEach((imgElm) => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = imgElm.urls.thumb;
        li.append(img);
        imagesCol.append(li);
      });
    });
}

function handleInput(event) {
  if (event.keyCode === 13 && event.target.value) {
    let imageName = event.target.value;
    dispayUI(imageName)
    event.target.value=""
  }
}

input.addEventListener('keyup', handleInput);

dispayUI()
