// Function to add a task to the list
function addTask(taskText, completed = false) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    taskItem.innerHTML = `
        <input type="checkbox" class="input" ${completed ? 'checked' : ''}>
        <span class="taskname">${taskText}</span>
        <div class="buttons">
            <button class="edit">
                <i class="fa-solid fa-file-pen"></i>
            </button>
            <button class="delete">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    `;

    if (completed) {
        taskItem.querySelector('.taskname').style.textDecoration = 'line-through';
    }

    taskList.appendChild(taskItem);
}

// Function to update the completed state and save to localStorage
function updateTaskCompletion(taskText, completed) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = savedTasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        savedTasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
}

// Function to add event listeners for checkboxes
function attachCheckboxEventListeners() {
    const checkboxes = document.querySelectorAll(".input");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function (event) {
            const taskName = event.target.nextElementSibling;
            const completed = event.target.checked;
            taskName.style.textDecoration = completed ? 'line-through' : 'none';

            // Update the completed state and save to localStorage
            const taskText = taskName.textContent;
            updateTaskCompletion(taskText, completed);
        });
    });
}

// Add tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        if (task.text) {
            addTask(task.text, task.completed);
        }
    });

    // Attach event listeners for checkboxes after tasks are added
    attachCheckboxEventListeners();
});

// Adding a task
document.querySelector('#push').onclick = function () {
    const taskInput = document.querySelector('#task');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert("Kindly Enter Task Name!!!!");
    } else {
        if (document.querySelector('#push').innerHTML == "Edit") {
            document.querySelector('#push').innerHTML = "Add";
        }

        // Save the task to localStorage as an object
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        // Add the task to the DOM
        addTask(taskText);

        // Attach event listeners for checkboxes after tasks are added
        attachCheckboxEventListeners();

        // Clear the input field
        taskInput.value = '';
    }
}

// Event delegation for delete and edit buttons
document.getElementById('tasks').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        if (confirm("Are you Sure?")) {
            const taskElement = event.target.closest('.task');
            const taskText = taskElement.querySelector(".taskname").textContent;

            // Remove the task from localStorage
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = savedTasks.findIndex(task => task.text === taskText);
            if (index > -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }

            // Remove the task from the DOM
            taskElement.remove();
        }
    }

    if (event.target.classList.contains('edit')) {
        if (confirm("Are you Sure? \nIf you Edit, your previous data will be Deleted.")) {
            const taskElement = event.target.closest('.task');
            const taskText = taskElement.querySelector(".taskname").textContent;

            // Remove the task from localStorage
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const index = savedTasks.findIndex(task => task.text === taskText);
            if (index > -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }

            // Remove the task from the DOM
            taskElement.remove();

            // Set the task text to the input field for editing
            document.querySelector('#task').value = taskText;
            document.querySelector('#push').innerHTML = "Edit";
        }
    }
});

// Deleting all tasks
document.querySelector("#delete").addEventListener("click", function () {
    if (confirm("Are you Sure?")) {
        var current_tasks = document.querySelectorAll(".task");

        for (var i = 0; i < current_tasks.length; i++) {
            // Remove the task from localStorage
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskText = current_tasks[i].querySelector(".taskname").textContent;
            const index = savedTasks.findIndex(task => task.text === taskText);
            if (index > -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }

            // Remove the task from the DOM
            current_tasks[i].remove();
        }
    }
});


  



/*
// Add tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task));
});

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Kindly Enter Task Name!!!!")
    }

    else{
        if(document.querySelector('#push').innerHTML == "Edit"){
            document.querySelector('#push').innerHTML = "Add";
        }
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <input type="checkbox" name="" class="input" for="${document.querySelector('#newtask input').value}">
                <span class="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <div class="buttons">
                    <button class="edit">
                        <i class="fa-solid fa-file-pen"></i>
                    </button>
                    <button class="delete">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;  

        // Save the task to localStorage
        const savedTasks = JSON.parse(localStorage.getItem('task')) || [];
        savedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        document.querySelector('#newtask input').value = "";  
    }



    // Marking a task as completed
    var checkbox = document.querySelectorAll(".input");
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].onchange = function (event) {
            var x = event.target.parentElement.querySelector(".taskname");
            if (x.style.textDecoration == 'line-through') {
                x.style.textDecoration = 'none';
            } else {
                x.style.textDecoration = 'line-through';
            }
        }
    }

    // Deleting a task
    var current_tasks = document.querySelectorAll(".delete");
    for(var i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function(){
            if (confirm("Are you Sure?")) {
                this.parentNode.parentElement.remove();
            }   
        }
    }

    // Editing a task
    var current_tasks = document.querySelectorAll(".edit");
    for(var i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function(event){
            if (confirm("Are you Sure? \nIf you Edit, your previous data will be Deleted.")) {
                var val = event.target.parentElement.parentElement.querySelector(".taskname").innerHTML.trim();
                document.querySelector('#newtask input').value = val;
                document.querySelector('#push').innerHTML = "Edit";
                this.parentNode.parentElement.remove();
            }     
        }
    }

    // Deleting all existing tasks

    var button = document.querySelector("#delete").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete all your existing tasks?")) {
            if (current_tasks.length === 0) {
                alert("There are no existing tasks");
                return;
            } else {
                for (var i = 0; i < current_tasks.length; i++) {
                    current_tasks[i].parentNode.parentElement.remove();
                }
            }
        }
    });        
}

*/
