console.log("app.js is active")

// selectors
const todoInput = document.querySelector('.todo-input');
const addTodoButton = document.querySelector('.add-todo-button');
const todoList = document.querySelector('.todo-list');

//functions
function addTodo (e) {
    // prevent form to submitting
    event.preventDefault();
    
    // create div container
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create element li 
    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');

    // make newTodo child from todoDiv
    todoDiv.appendChild(newTodo);

    // create button check
    const checkButton = document.createElement('button');
    checkButton.classList.add('fas', 'fa-check', 'check-btn') // error if use space, so split class with '', 
    
    todoDiv.appendChild(checkButton);

    // create button delete
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('fas', 'fa-trash', 'delete-btn')
    todoDiv.appendChild(deleteButton);
    
    // make todoDiv child from todoList
    todoList.appendChild(todoDiv);

    // clear Input todo after add todo item
    todoInput.value = "";
}

function checkDelete(e) {
    const item = e.target;
    // console.log(e.target)
    // delete item todo list
    if (item.classList[2] === "delete-btn"){
        const todo = item.parentElement;
        todo.remove();
    }
}

// Event Listener
addTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);
