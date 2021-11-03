
const todoInput = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".add-todo-btn");
const todoList = document.querySelector(".todo-list");



// Event Listeners

addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", clickCheck);


//Functions

function addTodo(event) {
    /*event.preventDefault(); //samma som javascript function void i index, hindrar sidan från att ladda om*/

    if (todoInput.value === "" || !todoInput.value.trim()) {
        alert("Please write a todo!")
    }
    else {


        // create todo wrapper div

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo"); //skapar ovan och lägger sen till med class "todo"


        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        todoItem.innerText = todoInput.value; // texten man skriver hamnar i li
        

        todoDiv.appendChild(todoItem);

        //create completed button

        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-btn");
     
 /*       completedButton.innerText = "Completed";*/

        todoDiv.appendChild(completedButton);

        //edit

        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
/*        editButton.innerText = "Edit";*/

        todoDiv.appendChild(editButton);
        //trash

        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
/*        trashButton.innerText = "Trash";*/

        todoDiv.appendChild(trashButton);

        //Edit div

        const editTodo = document.createElement("div");
        editTodo.classList.add("div-edit");
        editTodo.setAttribute("style", "display:none;")


        // create input for edit
        const editInput = document.createElement("input");
        editInput.setAttribute("type", "text");
        editTodo.appendChild(editInput);

        const editSaveButton = document.createElement("button");
        editSaveButton.classList.add("save-btn");
        editSaveButton.innerText = "Save Edit";

        editTodo.appendChild(editSaveButton);

        todoDiv.appendChild(editTodo);

        // put todo div in place

        // todoList.appendChild(todoDiv);

        todoList.insertBefore(todoDiv, todoList.children[0]);
        todoInput.value = ""; //gör input tom igen
    }
}

function clickCheck(event) {
    const clickedTarget = event.target;

    const todo = clickedTarget.parentElement;

    if (clickedTarget.classList.contains("completed-btn")) {
        todo.remove();
    }
    else if (clickedTarget.classList.contains("trash-btn")) {
        todo.remove();
    }
    else if (clickedTarget.classList.contains("edit-btn")) {

        const editDiv = todo.children[4];
        editDiv.setAttribute("style", "display:block;");

        const saveEditBtn = editDiv.children[1];

        saveEditBtn.addEventListener("click", saveTodo)

    }
    function saveTodo(event) {
        const target = event.target;

        const edit = target.parentElement;

        const grandParent = edit.parentElement;

        const editInput = edit.children[0];

        grandParent.children[0].innerText = editInput.value;

        edit.setAttribute("style", "display:none;")
    }
}