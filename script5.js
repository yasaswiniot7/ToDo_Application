
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks) {
        storedTasks.forEach((task) => tasks.push(task)); // Fixed parentheses
        updateTasksList();
        updateStats();
    }
});

let  tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1); // Optionally remove the task to re-add it after edit
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length; // Fixed variable name
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100; // Fixed variable name and formula

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`; // Fixed template literal

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`; // Fixed template literal

    if (tasks.length && completedTasks === totalTasks) {
        showConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("taskItem");

        // Create task content
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onChange="toggleTaskComplete(${index})" />
            <p class="${task.completed ? 'completed' : ''}">${task.text}</p>
        `;

        // Create icons (Edit & Delete)
        const iconsDiv = document.createElement("div");
        iconsDiv.classList.add("icons");
        iconsDiv.innerHTML = `
            <i class="fas fa-edit" onclick="editTask(${index})"></i>
            <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
        `;

        // Append the task and icons to the list item
        listItem.appendChild(taskDiv);
        listItem.appendChild(iconsDiv);

        taskList.appendChild(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks.push(...storedTasks);
        updateTasksList();
    }
});
const showConfetti = () => { // Fixed function name to match
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
};
