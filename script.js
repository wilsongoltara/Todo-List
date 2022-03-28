const inputTask = document.getElementById('texto-tarefa');
const olTask = document.getElementById('lista-tarefas');

const addTaskTInDOM = (() => {
  const taskList = JSON.parse(localStorage.getItem('tasks'));
  const listLength = taskList.length - 1;
  const task = taskList[listLength];
  const liTask = document.createElement('li');
  liTask.classList = 'list-group-item task';
  liTask.innerText = task;
  olTask.appendChild(liTask);
  inputTask.value = '';
});

const addTaskToLocalStorage = (() => {
  const listTask = JSON.parse(localStorage.getItem('tasks'));
  const task = inputTask.value;
  listTask.push(task);
  localStorage.setItem('tasks', JSON.stringify(listTask));
  addTaskTInDOM();
});

const listTaskRenderization = (() => {
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
  } else {
    const taskList = JSON.parse(localStorage.getItem('tasks'));
    for (const task of taskList) {
      const liTask = document.createElement('li');
      liTask.classList = 'list-group-item task';
      liTask.innerText = task;
      olTask.appendChild(liTask);
    }
  }
});

const selectedTask = ((event) => {
  const clicked = event.target;
  const listTasks = document.getElementsByClassName('task');
  for (const task of listTasks) {
    const cssObj = window.getComputedStyle(task, null);
    const backgroundColor = cssObj.getPropertyValue('background-color');
    if (backgroundColor === 'rgb(128, 128, 128)') {
      task.style.backgroundColor = 'white';
      task.style.color = 'black';
    }
  }
  clicked.style.backgroundColor = 'gray';
  clicked.style.color = 'white';
});

const clearList = (() => {
  const listTasks = document.getElementById('lista-tarefas');
  while (listTasks.firstChild) {
    listTasks.removeChild(listTasks.firstChild);
  }
  localStorage.clear();
  listTaskRenderization();
});

document.addEventListener('click', (event) => {
  const clicked = event.target;

  if (clicked.classList.contains('btn-add-task')) {
    addTaskToLocalStorage();
  }

  if (clicked.classList.contains('task')) {
    selectedTask(event);
  }

  if (clicked.classList.contains('btn-all-clear')) {
    clearList();
  }
}, false);

document.addEventListener('dblclick', (event) => {
  const clicked = event.target;

  if (clicked.classList.contains('task')) {
    if (clicked.classList.contains('completed')) {
      clicked.classList.remove('completed');
    } else {
      clicked.classList.add('completed');
    }
  }
}, false);

window.onload = () => {
  listTaskRenderization();
};
