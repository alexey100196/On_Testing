function createElement(tag, props, ...children) {
  const element = document.createElement(tag);
  // for (let prop in props) { // проблема - в метод for in поподает не только свойство которое есть у объекта, туда могут попасть другие свойства которые у объекта окажутся при наследовании, придется ставить уловие.
  //   element[prop] = props[prop] //element.type = props.className, element.type = props.className
  // }
  // Object.keys(props);// метод keys у объекта Object возвращает массив со свойствами объекта 
  Object.keys(props).forEach(key => element[key] = props[key]);
  console.log(element)
  console.log(props)
  console.log(element)

  if (children.length == 0) {
    children.forEach(child => {
      console.log(child);
    });
  }
  console.log(tag)
  console.log(children)

  return element;
}

function createTodoItem(title) {

  const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });

  const label = document.createElement('label', { className: 'title' }, title);

  const editInput = document.createElement('input', { type: 'text', className: 'text-field' });

  const editButton = document.createElement('button', { className: 'edit' }, 'изменить');

  const deleteButton = document.createElement('button', { className: 'delete' }, 'удалить');

  const listItem = document.createElement('li', { classNmae: 'todo-item', checkbox, label, editInput, editButton, deleteButton }); // ... ES6


  bindEvents(listItem);

  return listItem;
}
function bindEvents(todoItem) {
  const checkbox = todoItem.querySelector('.checkbox');
  const editButton = todoItem.querySelector('button.edit');
  const deleteButton = todoItem.querySelector('button.delete');


  checkbox.addEventListener('change', toggleTodoItem);
  editButton.addEventListener('click', editTodoItem);
  deleteButton.addEventListener('click', deleteTodoItem);
}


function addTodoItem(event) {
  event.preventDefault();

  if (addInput.value === '') return alert('test');

  const todoItem = createTodoItem(addInput.value);
  todoList.appendChild(todoItem);
  addInput.value = '';
}

// function toggleTodoItem({ target }) {
//   console.log(target);
//   console.log(this);
// }
function toggleTodoItem() {
  // const listItem = this.closest('li')
  const listItem = this.parentNode; // получить доступ к родительскому элементу
  listItem.classList.toggle('completed')// если класс есть он (метод toggle) его возьмет, если нету - добавит
}

function editTodoItem() {
  const listItem = this.parentNode; // получить доступ к родительскому элементу
  const title = listItem.querySelector('.title'); // lable
  const editInput = listItem.querySelector('.text-field');
  const isEditing = listItem.classList.contains('editing') // проверяет есть ли у listItem class 'editing'


  if (isEditing) {
    title.innerText = editInput.value;
    this.innerText = 'изменить';
  } else {
    editInput.value = title.innerText;
    this.innerText = 'сохранить'
  }

  listItem.classList.toggle('editing');
}

function deleteTodoItem() {
  const listItem = this.parentNode; // получить доступ к родительскому элементу
  todoList.removeChild(listItem);
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main() {
  todoForm.addEventListener('submit', addTodoItem);
  todoItems.forEach(item => bindEvents(item))
}

main();
