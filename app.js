const inputElement = document.getElementById('input');
const addTo = document.querySelector(".list")

document.addEventListener("DOMContentLoaded", load);

function save(){
    const tasks= Array.from(addTo.children).map(task=>task.textContent);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function load(){
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(taskText => {
        const NewTask = document.createElement('li');
        NewTask.textContent=taskText;
        addTo.appendChild(NewTask);
    });
}

inputElement.addEventListener("keydown",(e)=> {
  if (e.key === "Enter") {
    let taskText = inputElement.value.trim();
    if (taskText != "") {
        const NewTask = document.createElement('li');
        NewTask.textContent= taskText;
        // NewTask.classList.add('');
        addTo.appendChild(NewTask);
        inputElement.value="";
        save();
    }

    console.log("Enter key pressed!");
  }
});
