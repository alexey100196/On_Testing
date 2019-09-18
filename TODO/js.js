
(function () {
  let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    clearLocal = document.querySelector('#clearLocal');


  function displayMessage() {
    addMessage.value = '';
    let displayMessage = '';
    todoList.forEach(function (item, i) {
      displayMessage += `
          <li class='item-${i} ${item.important ? 'important' : ''}'>
            <input type="checkbox" id="item-${i}" ${item.checked ? 'checked' : ''}>
            <label for="item-${i}">${item.todo}</label>
            <button class="btn removeItem-${i}">x</button>
            </li>`;
      todo.innerHTML = displayMessage;
    });
    if (todoList.length === 0) todo.innerHTML = '';
  }


  let todoList = []
  if (localStorage.getItem('todo')) { // проверка на наличие записи в localStorage
    todoList = JSON.parse(localStorage.getItem('todo')); //Вывод из localStorage
    displayMessage();
  }

  addButton.addEventListener('click', function () {
    let newTodo = {
      todo: addMessage.value,
      checked: false,
      important: false,
    }
    
   addMessage.value == '' ? alert('tekst vvedi suk') : todoList.push(newTodo) // проверка введен ли текст в инпут
    displayMessage()
    localStorage.setItem('todo', JSON.stringify(todoList));// запись в локалсторедж
  })

  todo.addEventListener('change', function (event) {

    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function (item) {
      if (item.todo === valueLabel) {
        item.checked = !item.checked; // инвертация
        localStorage.setItem('todo', JSON.stringify(todoList)); // запись в локалсторедж
      }
    })
    localStorage.setItem('todo', JSON.stringify(todoList)); // запись в локалсторедж
  })



  clearLocal.addEventListener('click', function () {
    localStorage.clear()
  })

  todo.addEventListener('contextmenu', function (event) {
    event.preventDefault(); //отменяем стандартоне повидение браузера
    todoList.forEach(function (item, i) {

      if (item.todo === event.target.innerHTML) {
        console.log(event.target.innerHTML)
        if (event.ctrlKey) { // удаление
          todoList.splice(i, 1) // поиск по индекссу
        } else {
          item.important = !item.important; // инвертация
        }
        displayMessage()
        localStorage.setItem('todo', JSON.stringify(todoList)); // запись в локалсторедж
      }
    })
  })

  todo.addEventListener('click', function (event) {
    if (event.target.className.indexOf('removeItem') !== -1) {
      event.target.closest('li').remove()
      const label = event.target.parentElement.querySelector('label')
      const forAttr = label.getAttribute('for')
      const index = forAttr.slice(forAttr.indexOf('-'))
      console.log(index)

      // todoList.forEach(function (item, i) {
      //   if (item.todo === label.innerHTML) {
      //     todoList.splice(i, 1) // поиск по индекссу
      //     displayMessage()
      //     localStorage.setItem('todo', JSON.stringify(todoList)); // запись в локалсторедж
      //   }
      // })

      todoList.splice(index, 1) // поиск по индекссу
      displayMessage()
      localStorage.setItem('todo', JSON.stringify(todoList)); // запись в локалсторедж
    }
  })
 })()

