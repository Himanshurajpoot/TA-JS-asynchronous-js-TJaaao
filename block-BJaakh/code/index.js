const input = document.querySelector('input');
const ul = document.querySelector('ul');

let baseURL = `https://basic-todo-api.vercel.app/api/todo`;

function createUI() {
  fetch(baseURL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`response is not ok ${res.status}`);
      }
    })

    .then((allTodo) => {
      ul.innerHTML = '';
      allTodo.todos.forEach((todo) => {
        let li = document.createElement('li');
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.isCompleted;
        checkBox.addEventListener('change', () =>
          handleChecBox(todo._id, todo.isCompleted)
        );
        let p = document.createElement('p');
        p.innerText = todo.title;
        p.addEventListener('dblclick', (event) => handleEdit(event, todo._id));
        let span = document.createElement('span');
        span.innerText = '❌';

        span.addEventListener('click', () => handleDelete(todo._id));
        li.append(checkBox, p, span);
        ul.append(li);
      });
    });
}

function handleEdit(event, id) {
  let input = document.createElement('input');
  input.value = event.target.innerText;
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.value) {
      let data = {
        todo: {
          title: e.target.value,
        },
      };

      fetch(baseURL + `/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          createUI();
        })
        .catch((err) => console.log(err));
    }
  });
}

function handleChecBox(id, check) {
  let data = {
    todo: {
      isCompleted: !check,
    },
  };

  fetch(baseURL + `/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      createUI();
    })
    .catch((err) => console.log(err));
}

function handleDelete(id) {
  fetch(baseURL + `/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      createUI();
    })
    .catch((err) => console.log(err));
}

function addTodo(data) {
  fetch(baseURL, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(() => {
      createUI();
    })
    .catch((err) => console.log(err));
}

function handleInput(event) {
  if (event.keyCode === 13 && event.target.value.trim()) {
    let data = {
      todo: {
        title: event.target.value,
        isCompleted: false,
      },
    };
    addTodo(data);
    event.target.value = '';
  }
}

createUI();

input.addEventListener('keyup', handleInput);
