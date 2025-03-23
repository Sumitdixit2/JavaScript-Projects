document.addEventListener("DOMContentLoaded", function () {
  loadTasks(); 
});


document.getElementById("add").addEventListener("click", function () {
  let inputValue = document.getElementById("value");
  let inputText = inputValue.value.trim();
  let category = document.getElementById("category").value;

  if (inputText === "") return;

  addTaskToDOM(inputText, category);
  saveTask(inputText, category);

  inputValue.value = ""; 
});


function addTaskToDOM(taskText, category) {
  let newTask = document.createElement("li");
  newTask.innerHTML = `<input type="checkbox" class="task-checkbox"> <span>${taskText}</span>`;
  
  let categoryList = document.getElementById(category);
  if (categoryList) {
      categoryList.appendChild(newTask);
  }
}


function saveTask(taskText, category) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, category: category });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.category));
}


document.addEventListener("click", function (event) {
  if (event.target.classList.contains("task-checkbox")) {
      let taskItem = event.target.parentElement;
      let taskText = taskItem.querySelector("span").textContent;

      taskItem.remove();
      removeTaskFromStorage(taskText);
  }
});


function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
