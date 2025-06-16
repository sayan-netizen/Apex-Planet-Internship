const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = '';
}

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
