let allTasks = [];
let filteredTasks = [];

document.getElementById("add").addEventListener("click", addNewTask);
document.getElementById("input").addEventListener("keypress", event => {
    if (event.key ==="Enter") {
        addNewTask();
    }
})
document.getElementById("completed").addEventListener("click", function(){
    update("Completed")
});
document.getElementById("active").addEventListener("click", function(){
    update("Active");
});
document.getElementById("all").addEventListener("click", function(){
    update("All");
});

function addNewTask() {
    let newTask = document.getElementById("input");
    if (newTask.value.trim().length > 0 ) {
        const task = {
            taskName: newTask.value.trim(),
            taskComplete: false,
        }
        allTasks.push(task);
        update("All");
        newTask.value = "";
    } else {
        alert("you must write something");
    } 
}

function update(taskCompleted) {
    const container = document.querySelector(".all");
    container.innerHTML = "";
    if (taskCompleted === "Completed") {
         filteredTasks = allTasks.filter(el => el.taskComplete === true)
    } else if (taskCompleted === "Active") {
        filteredTasks = allTasks.filter(el => el.taskComplete === false)
    } else  {
        filteredTasks = allTasks;
    }
    
    filteredTasks.forEach((element,index) => {
        const current = document.createElement("li");
        current.id = `task-${index}`;
        current.innerHTML += `<input type="checkbox" 
        ${element.taskComplete && "checked"}
        class="checkbox" 
        id="task-${index}">
        <button class="close" id="task-${index}"><i id="task-${index}" class="fa fa-trash"></i></button>
        ${element.taskName}`
        if(element.taskComplete){
            current.style.textDecoration = "line-through";
            current.style.color = "#616161";
        } else {
            current.style.textDecoration = "none";
            current.style.color = "black";
        }
        container.prepend(current);
       
        document.body.addEventListener("click", function(event) {
            if(event.target.tagName === "INPUT" && event.target.id !== "input" ){
                const index = event.target.id.slice(5);
                filteredTasks[+index].taskComplete = event.target.checked;
                if(filteredTasks[+index].taskComplete){
                    document.querySelector(`#task-${index}`).style.textDecoration = "line-through";
                    document.querySelector(`#task-${index}`).style.color = "#616161";
                } else {
                    document.querySelector(`#task-${index}`).style.textDecoration = "none";
                    document.querySelector(`#task-${index}`).style.color = "black";
                }
            }
        });
        
        document.body.addEventListener("click", deleteItem); 
    });
} 

function deleteItem(event){
    let parent = {};
    let index = 0;
    if(event.target.className === "close" || event.target.tagName === "I"){
        if(event.target.tagName === "I"){
            parent = event.target.parentElement.parentElement;
        } else {
            parent = event.target.parentElement;
        }            
        index = +event.target.id.slice(5);
        let trashed = filteredTasks.splice(index, 1);
        let i = allTasks.indexOf(trashed[0]);
        if(i !== -1){
            allTasks.splice(i, 1);
        }
        parent.style.display = "none";
    } 
    return;         
}