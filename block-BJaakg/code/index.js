function main() {
  const modalWindow = document.querySelector('.modal-window');
  const booksUl = document.querySelector('.book-list');
  const charactersUl = document.querySelector('.characters');
  const error = document.querySelector('.error');
  const booksURL = `https://www.anapioficeandfire.com/api/books`;

  function handleSpinner(rootElm, status = false) {
    if (status) {
      rootElm.innerHTML = `<div class ="spinner"><div class="donut"></div></div>`;
    }
  }

  function displayCharacters(characters) {
    handleSpinner(charactersUl, true);
    Promise.all(
      characters.map((data) => {
        console.log(data);
        return fetch(data).then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`response is not ok ${res.status}`);
          }
        });
      })
    )

      .then((charData) => {
        console.log(charData);
        charactersUl.innerHTML = '';
        charData.forEach((elm) => {
          let li = document.createElement('li');
          li.classList.add('charactersLI');
          li.innerText = `${elm.name} : (${elm.aliases.join(' ')})`;
          charactersUl.append(li);
        });
      })
      .catch((err) => {
        error.style.display = 'block';
        error.innerText = err;
      })
      .finally(() => {
        handleSpinner(booksUl);
      });
  }

  function displayBooks(data) {
    booksUl.innerHTML = '';
    data.forEach((book) => {
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      h3.innerText = book.name;
      const p = document.createElement('p');
      p.innerText = book.authors.join(' ');
      let button = document.createElement('button');
      button.classList.add('btn');
      button.innerText = `Show Characters(${book.characters.length})`;
      button.addEventListener('click', () => {
        modalWindow.style.display = 'block';
        displayCharacters(book.characters);
        modalWindow
          .querySelector('.modal-close')
          .addEventListener('click', () => {
            modalWindow.style.display = 'none';
          });
      });
      li.append(h3, p, button);
      booksUl.append(li);
    });
  }

  function fetchBooks() {
    handleSpinner(booksUl, true);
    fetch(booksURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`response is not ok ${res.status}`);
        }
      })
      .then((data) => displayBooks(data))
      .catch((err) => {
        error.style.display = 'block';
        error.innerText = err;
      })
      .finally(() => {
        handleSpinner(booksUl);
      });
  }

  fetchBooks();
}

main();
