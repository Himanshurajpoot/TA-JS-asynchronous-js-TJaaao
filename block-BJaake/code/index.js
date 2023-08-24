

// first-way
const article = document.querySelector('.news-article');
const select = document.querySelector('.select-bar');
const optionArr = [];
let allNews = [];

fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
  .then((res) => res.json())
  .then((newsList) => {
    allNews = newsList;
    createUI(newsList);
    createOption(newsList);
  })
  .catch((error) => console.log(error));

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


// second way



// const article = document.querySelector('.news-article');
// const select = document.querySelector('.select-bar');
// const optionArr = [];
// let allNews = [];
// const data = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
//   .then((res) => res.json())
//   .then((newsList) => {
//     allNews = newsList;
//     createUI(newsList);
//     createOpton(newsList);
//   })
//   .catch((error) => console.log(error));

// function createOpton(data) {
//   data.forEach((news) => {
//     if (!optionArr.includes(news.newsSite)) {
//       optionArr.push(news.newsSite);
//       let option = document.createElement('option');
//       option.innerText = news.newsSite;
//       select.append(option);
//     }
//   });
// }

// select.addEventListener('change', handleFilter);
// function handleFilter(event) {
//   const value = event.target.value;

//   if (value === 'Select a news source') {
//     createUI(allNews);
//   } else {
//     const filterNews = allNews.filter((elm) => elm.newsSite === value);
//     createUI(filterNews);
//   }
// }

// function createUI(data) {
//   article.innerHTML = '';
//   data.forEach((news) => {
//     const li = document.createElement('li');
//     li.classList.add('flex');
//     const img = document.createElement('img');
//     img.src = news.imageUrl;
//     const div = document.createElement('div');
//     const h3 = document.createElement('h3');
//     h3.innerText = news.newsSite.toUpperCase();
//     const p = document.createElement('p');
//     p.innerText = news.title;
//     const a = document.createElement('a');
//     a.innerText = 'Read More';
//     a.href = news.url;

//     a.classList.add('btn');
//     div.append(h3, p, a);
//     li.append(img, div);
//     article.append(li);
//   });
// }





// third-way

// const article = document.querySelector('.news-article');
// const select = document.querySelector('.select-bar');
// const optionArr = [];
// let allNews = [];

// async function fetchData() {
//   try {
//     const response = await fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30');
//     if (!response.ok) {
//       throw new Error('Network response was not ok.');
//     }
//     const newsList = await response.json();
//     allNews = newsList;
//     createUI(newsList);
//     createOption(newsList);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function createOption(data) {
//   data.forEach((news) => {
//     if (!optionArr.includes(news.newsSite)) {
//       optionArr.push(news.newsSite);
//       const option = document.createElement('option');
//       option.innerText = news.newsSite;
//       select.append(option);
//     }
//   });
// }

// function handleFilter(event) {
//   const value = event.target.value;

//   if (value === 'Select a news source') {
//     createUI(allNews);
//   } else {
//     const filterNews = allNews.filter((elm) => elm.newsSite === value);
//     createUI(filterNews);
//   }
// }

// function createUI(data) {
//   article.innerHTML = '';
//   data.forEach((news) => {
//     const li = document.createElement('li');
//     li.classList.add('flex');
//     const img = document.createElement('img');
//     img.src = news.imageUrl;
//     const div = document.createElement('div');
//     const h3 = document.createElement('h3');
//     h3.innerText = news.newsSite.toUpperCase();
//     const p = document.createElement('p');
//     p.innerText = news.title;
//     const a = document.createElement('a');
//     a.innerText = 'Read More';
//     a.href = news.url;

//     a.classList.add('btn');
//     div.append(h3, p, a);
//     li.append(img, div);
//     article.append(li);
//   });
// }

// select.addEventListener('change', handleFilter);

// // Call fetchData to initiate the data fetching process
// fetchData();





