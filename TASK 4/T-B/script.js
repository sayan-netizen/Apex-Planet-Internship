const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(item => {
        tasks.push(item.querySelector('span').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = '';
    }
}
function createTaskElement(taskText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '×';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}
loadTasks();
