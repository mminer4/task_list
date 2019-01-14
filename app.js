const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListeners();

function loadEventListeners() {

  document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);

  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTasks);

  filter.addEventListener('keyup', filterTasks);
}

function getTasksFromLocalStorage() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //create li
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item blue-grey white-text';
    // create text node and append li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-trash-alt"></i>';
    //append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task');
  }

  //create li
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item blue-grey white-text';
  // create text node and append li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-trash-alt"></i>';
  //append the link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  // store in local storage
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  };

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e) {
  const inputText = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(inputText) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}