// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.buttons-filter');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
    event.preventDefault();
    // To do Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    if(!newTodo.innerText) {
        return;
    }
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add to do in storage
    saveLocalTodo(todoInput.value);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);

    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    // Delete todo
    // console.log(item.classList);
   if(item.classList[0] === 'trash-btn') {
       const todo = item.parentElement;
       // Animation
       todo.classList.add('fall');
       removeLocalTodos(todo);
       todo.addEventListener('transitionend', () => {
           todo.remove();
       });
   }

   // check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos.length !== 0) {
            todos.forEach( todo_element => {
                if (todo.innerText === todo_element.text) {
                    if (todo_element.state !== 'completed') {
                        todo_element.state = 'completed';
                        if (todo.classList.contains("completed")) {
                            todo.style.textDecoration ='line-through';
                            todo.style.opacity = '0.6';
                        } else {
                            todo.classList.toggle("completed");
                        }
                    } else {
                        todo_element.state = 'uncompleted';
                        if (todo.classList.contains("completed")) {
                            todo.style.textDecoration ='none';
                            todo.style.opacity = '1';
                        }
                    }
                }
            });
        }
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function filterTodo(event) {
    event.preventDefault();
    const todos = todoList.childNodes;
    // console.log(event.target.value);
    todos.forEach( todo => {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodo(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todos);
    todos.push({text: todo, state: 'uncompleted'});
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // To do Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo.text;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Append to list
        todoList.appendChild(todoDiv);
        if (todo.state === 'completed') {
            newTodo.parentElement.classList.toggle("completed");
        }
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(todos));
}
