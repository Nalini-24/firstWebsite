let currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

window.onload = function () {
  showDate();
  document.getElementById("daySelect").value = currentDay;
  loadTasks();
};

function showDate() {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("dateDisplay").textContent = date.toLocaleDateString('en-US', options);
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, done: false };
  const tasks = getTasksForDay();
  tasks.push(task);
  saveTasksForDay(tasks);
  input.value = "";
  loadTasks();
}

function getTasksForDay() {
  const tasks = JSON.parse(localStorage.getItem(currentDay)) || [];
  return tasks;
}

function saveTasksForDay(tasks) {
  localStorage.setItem(currentDay, JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasksForDay();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.textContent = task.text;
    li.onclick = () => toggleDone(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.classList.add("delete-btn");
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  const tasks = getTasksForDay();
  tasks[index].done = !tasks[index].done;
  saveTasksForDay(tasks);
  loadTasks();
}

function deleteTask(index) {
  const tasks = getTasksForDay();
  tasks.splice(index, 1);
  saveTasksForDay(tasks);
  loadTasks();
}

function changeDay() {
  currentDay = document.getElementById("daySelect").value;
  loadTasks();
}


