const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners(); 


function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
    
}

function clearAllTodos(e){
    if (confirm("Are You Sure That You Want Delete All ?")){
        // todoList.innerHTML = "";
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");

        }
    })
}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Successfully Deleted.");
    }
}

function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));
}



function loadAllTodosUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    
    if (newTodo === ""){
        showAlert("danger","Please Enter a Data!");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Data Added Successfully.")
    }
    
    // addTodoToUI(newTodo);

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));    

}


function showAlert(type,message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;
    
    firstCardBody.appendChild(alert);

    // Set Time out

    window.setTimeout(function(){
        alert.remove();
    },900);

}

function addTodoToUI(newTodo){ // String Değerini list item olarak UI a ekleme
//   <li class="list-group-item d-flex jusitify-content-between">
//                      Todo 1
//                      <a href = "#" class ="delete-item">
//                         <i class = "fa fa-remove"></i>
//                      </a>
//   </li>

    // List İtem Oluşturma
    const listItem = document.createElement("li");
    
    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#"
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex jusitify-content-between"

    // Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // TodoListe List Item Ekleme
    todoList.appendChild(listItem);

    todoInput.value="";

}
