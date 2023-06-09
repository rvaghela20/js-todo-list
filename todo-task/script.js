let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const title = titleInput.value;
  const description = descriptionInput.value;

  const task = {
    title: title,
    description: description,
    completed: false
  };

  tasks.push(task);

  titleInput.value = "";
  descriptionInput.value = "";

  displayTasks();
  saveTasks();
}

function displayTasks(filteredTasks) {
  const tableBody = document.getElementById("taskTableBody");
  tableBody.innerHTML = "";

  const tasksToDisplay = filteredTasks || tasks;

  tasksToDisplay.forEach((task, index) => {
    const row = createTaskRow(task, index);
    tableBody.appendChild(row);
  });

  const emptyListMessage = document.getElementById("emptyListMessage");
  if (tasksToDisplay.length === 0) {
    emptyListMessage.textContent = "No Todos here, Please add some. ";
  } else {
    emptyListMessage.textContent = "";
  }
}

function createTaskRow(task, index) {
  const row = document.createElement("tr");

  const titleCell = document.createElement("td");
  titleCell.textContent = task.title;
  if (task.completed) {
    titleCell.classList.add("completed-task");
  }

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = task.description;
  if (task.completed) {
    descriptionCell.classList.add("completed-task");
  }

  const buttonGroupCell = document.createElement("td");

  const toggleButton = document.createElement("button");
  toggleButton.classList.add("btn", "btn-sm", "btn-success");
  toggleButton.textContent = task.completed ? 'Undo' : 'Check';
  toggleButton.addEventListener("click", () => toggleComplete(index));

  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-sm", "btn-primary");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editTask(index));
  if (task.completed) {
    editButton.disabled = true;
  }

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-sm", "btn-danger");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(index));

  buttonGroupCell.appendChild(toggleButton);
  buttonGroupCell.appendChild(editButton);
  buttonGroupCell.appendChild(deleteButton);

  row.appendChild(titleCell);
  row.appendChild(descriptionCell);
  row.appendChild(buttonGroupCell);

  return row;
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
  saveTasks();
}

function editTask(index) {
  const task = tasks[index];
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");

  if (task.completed) {
    alert("This task is already completed and cannot be edited.");
    return;
  }

  titleInput.value = task.title;
  descriptionInput.value = task.description;

  tasks.splice(index, 1);
  displayTasks();
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
  saveTasks();
}

function searchTasks() {
  const searchInput = document.getElementById("search");
  const searchQuery = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    return task.title.toLowerCase().includes(searchQuery) || task.description.toLowerCase().includes(searchQuery);
  });

  displayTasks(filteredTasks);
}

function clearAllTasks() {
  tasks = []; // Clear the tasks array
  saveTasks(); // Save the empty tasks array to localStorage
  displayTasks(); // Display the updated tasks (which will be empty)
}

const form = document.getElementById("todoForm");
form.addEventListener("submit", addTask);

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", searchTasks);

const clearAllButton = document.getElementById("clearAllButton");
clearAllButton.addEventListener("click", clearAllTasks);

displayTasks();
