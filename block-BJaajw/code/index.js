const article = document.querySelector('.news-article');
const select = document.querySelector('.select-bar');
const loader = document.querySelector('.loader');

const optionArr = [];
let allNews = [];

fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
  .then((res) => {
    if (res.ok) {
      loader.classList.add('bouncing-loader');
      return res.json();
    }
    // throws error if there is problem in above url
    throw new Error(`Error happened ${res.status}`);
  })
  .then((newsList) => {
    if (Array.isArray(newsList)) {
      allNews = newsList;
      createUI(newsList);
      createOption(newsList);
    }
  })
  .catch((error) => {
    console.log(error.message);
    article.innerText = error;
  })
  .finally(() => {
    if (allNews.length !== 0) {
      loader.classList.remove('bouncing-loader');
    }
  });

function createOption(data) {
  select.innerHTML = '<option>Select a news source</option>'; // Clear previous options
  optionArr.length = 0; // Clear previous optionArr

  data.forEach((news) => {
    if (!optionArr.includes(news.newsSite)) {
      optionArr.push(news.newsSite);
      let option = document.createElement('option');
      option.innerText = news.newsSite;
      select.append(option);
    }
  });
}

select.addEventListener('change', handleFilter);

function handleFilter(event) {
  let value = event.target.value;

  if (value === 'Select a news source') {
    createUI(allNews);
  } else {
    let filterNews = allNews.filter((news) => news.newsSite === value);
    createUI(filterNews);
  }
}

function createUI(data) {
  article.innerHTML = '';

  data.forEach((news) => {
    let li = document.createElement('li');
    li.classList.add('flex');
    let img = document.createElement('img');
    img.src = news.imageUrl;
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.innerText = news.newsSite.toUpperCase();
    let p = document.createElement('p');
    p.innerText = news.title;
    let a = document.createElement('a');
    a.innerText = 'Read More';
    a.href = news.url;

    a.classList.add('btn');
    div.append(h3, p, a);
    li.append(img, div);
    article.append(li);
  });
}
