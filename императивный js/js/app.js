function createTodoItem(title) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';

  const label = document.createElement('label');
  label.innerText = title;
  label.className = 'title';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'textField';

  const editButton = document.createElement('button');
  editButton.innerText = 'изменить';
  editButton.className = 'edit';

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'удалить';
  deleteButton.className = 'delete';

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  bindEvents(listItem);

  return listItem;

}
function bindEvents(todoItem) {
  const checkbox = todoItem.querySelector('.checkbox');
  console.log(checkbox)
  const editButton = todoItem.querySelector('button.edit');
  console.log(editButton)
  const deleteButton = todoItem.querySelector('button.delete');
  console.log(deleteButton)


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
  const listItem = this.parentNode // получить доступ к родительскому элементу
  listItem.classList.toggle('completed')// если класс есть он (метод toggle) его возьмет, если нету - добавит
}

function editTodoItem() {
  const listItem = this.parentNode // получить доступ к родительскому элементу
  const title = listItem.querySelector('.title'); // lable
  const editInput = listItem.querySelector('.textfield');
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

}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

todoForm.addEventListener('submit', addTodoItem);

