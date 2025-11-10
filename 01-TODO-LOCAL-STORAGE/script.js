//1. on DOMContent is loaded we will do all this things
document.addEventListener("DOMContentLoaded",()=>{
    //2. fetch all the attributes
    const todoInput= document.getElementById("todo-input")
    const addTaskButton=document.getElementById("add-task-btn")
    const todoList= document.getElementById("todo-list")
    //3.create array to store tasks
    let tasks=JSON.parse(localStorage.getItem("tasks")) || []

    //render for each
    tasks.forEach((task)=>renderTask(task))

    //7. create function to store data into local storage
function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

    //4. when the add Task button is clicked:- 1we need to add task with delete button and render it

    addTaskButton.addEventListener("click",()=>{
        let taskText = todoInput.value.trim();
        //if task input is empty just return
        if(taskText === "") return;

        //5.if not then create new task object with id,text,completed
        const newTask={
            id: Date.now(),
            text: taskText,
            completed: false
        };
        //6.push task into array
        tasks.push(newTask)
        //8.save Task into local storage
        saveTask();
        renderTask(newTask)
        //9. after saving into array just clear the iput field
        todoInput.value=""


    })
    //10.Function to render things on the page

function renderTask(task){
    //11.create element
    const li= document.createElement("li")
    //12. add attribute to the element
    li.setAttribute("data-id",task.id)
    //condition to add list
    //15. if task= completed then it will add a class
    if(task.completed) li.classList.add("completed")

    //13. structure of the list to render on dom
    li.innerHTML=`
    <span>${task.text}</span>
    <button>delete</button>`
    //16. adding function when whole list item is clicked ...toggle from completed to not completed and vice versa
    li.addEventListener("click",(e)=>{
        //avoiding the delete button
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed
        li.classList.toggle("completed")
        //17.saveTask to update the local storage
        saveTask();
    })

    //18. To delete the task
    li.querySelector("button").addEventListener("click",(e)=>{
        //stop event bubbling up
        e.stopPropagation()
        tasks=tasks.filter((t)=> t.id !==task.id)
        li.remove()
        saveTask()

    })
    //14. Add the li to ul using append child
    todoList.appendChild(li)

}

})



