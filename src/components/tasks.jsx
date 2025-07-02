import { useState,useEffect } from "react";
import Card from "./Card";
import Input from "./input";
const Tasks= () => {
     const initial_task=[
 
 ];
 const [tasks,setTasks] = useState(initial_task);
 const addTaskHandler = async (newTask) => {
    let  newTaskObj = {
        task_id:Math.random(),
        task_name:newTask
    };

   const response = await fetch("https://todo-backend-vaqm.onrender.com/create", { 
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
     body : JSON.stringify(newTaskObj),
   })
   if (response.status == 201)
   {
getTasks();
alert("new task added");
   }
   else{
    alert("failed to add task")
   }
 };

 const deleteTaskHandler = async (taskId) => {
const response = await fetch("https://todo-backend-vaqm.onrender.com/" + taskId,{
    method : "DELETE"
})
if (response.status == 200)
{
     getTasks();
    alert ("task deleted");
   
}
else{
    alert ("Failed to  delete task")
}
 };
 const getTasks = async () => {
    const response = await fetch("https://todo-backend-vaqm.onrender.com")
    const taskList = await response.json();
    console.log(taskList);
    setTasks(taskList)

 }
 useEffect (() => {
    getTasks()

 }, [] );
    return (
        <div id="tasks">
          <Input onAddTask={addTaskHandler}/>
          

          {
            tasks.map( (tk) => (
           
             <Card task={tk} onDeleteTask ={deleteTaskHandler}></Card>

     ) )


          }
         

        </div>
        
    )
}
export default Tasks;