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

    // add item todo list to localstorage
    saveTodoInLocalStorage(todoInput.value);

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

let checkOrDelete = (e) => {
    const item = e.target;
    // console.log(e.target)

    //chech item todo list
    if (item.classList[2] === "check-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('check');
    }

    // delete item todo list
    if (item.classList[2] === "delete-btn"){
        const todo = item.parentElement;
        removeTodoFromLocalStorage(todo);
        todo.remove();
    }
}

let saveTodoInLocalStorage = (item) => {
    // check if item todo list is already exist in local storage or not
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

let getTodoFromLocalStorage = () => {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(item => {
        // create div container
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')

        // create element li 
        const newTodo = document.createElement('li');
        newTodo.innerText= item;
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
    });
}

let removeTodoFromLocalStorage = (item) => {
    // check if item todo list is already exist in local storage or not
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    //  set index item want to delete
    const itemIndex = item.children[0].innerText

    // delete element from array with method splice, 1 is number how many element / item we delete
    items.splice(items.indexOf(itemIndex), 1);

    // refresh data in local storage
    localStorage.setItem('items', JSON.stringify(items));
}


// Event Listener
document.addEventListener('DOMContentLoaded', getTodoFromLocalStorage);
addTodoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkOrDelete);
