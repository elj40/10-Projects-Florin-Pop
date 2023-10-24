const formEL = document.getElementById("form");
const inputEl = document.getElementById("todo-text");
const todoListEl = document.getElementById("todo-list");

formEL.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoText = inputEl.value;
    inputEl.value = "";

    if (todoText) addTodoItem(todoText)
});

function addTodoItem(text, completed = false) {
    const todoEl = document.createElement("li");

    if (completed) todoEl.classList.toggle("completed");

    todoEl.innerText = text;
    todoEl.addEventListener("click", (e) => {
        let todo = e.target;
        todo.classList.toggle("completed");
        updateLS()
    })
    todoEl.addEventListener("contextmenu", (e)=> {
        todoEl.remove();
        updateLS();
    })
    todoListEl.appendChild(todoEl);

    updateLS();
}

function updateLS() {
    let todoList = []
    for (let child of todoListEl.children) {
        todoList.push({
            "text": child.innerText,
            "completed" : child.classList.contains("completed"),
        });
    };

    localStorage.setItem("todo-list", JSON.stringify(todoList));
}

function loadLS() {
    let todoList = JSON.parse(localStorage.getItem("todo-list"));

    for (let todo of todoList) {
        addTodoItem(todo["text"], todo["completed"]);
    };
}

loadLS(); 