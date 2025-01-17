const inputElement = document.getElementById('input');
const addTo = document.querySelector(".list")

let count= document.querySelector("#taskCount");
let cnt=0;

document.addEventListener("DOMContentLoaded", load);
document.addEventListener("DOMContentLoaded",function(){
  generateCalender();
});

addTo.addEventListener("click",deleteTask);

function deleteTask(e){
  if(e.target.tagName === 'LI'){
      e.target.remove();
      cnt--;
      count.textContent=cnt;
      save();
    }
}

function save(){
    const tasks= Array.from(addTo.children).map(task=>task.textContent);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function load(){
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    cnt=tasks.length;
    count.textContent=cnt;
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
        cnt++;
        count.textContent=cnt;
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


// ---------ADDING CALENDER AND STREAK--------------------------------


function generateCalender(){
    const today= new Date();
    const currentMonth = today.getMonth();
    const currentYear= today.getFullYear();
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();

    const calenderTable = document.querySelector('.calender');
    let tableHTML= '<tr>';


    for(let day=1;day<=daysInMonth;day++){
      const date = new Date(currentYear,currentMonth,day);
      const dayOfWeek = date.getDay();

      if(day===1){
        tableHTML +='<tr>'+'<td></td>'.repeat(dayOfWeek);
      }

      tableHTML+=`<td data-date = "${date.toISOString().split('T')[0]}">${day}</td>`;

      if(dayOfWeek===6){
        tableHTML+='</tr>'
      }
    }

    if(new Date(currentYear,currentMonth,daysInMonth).getDate()!=6){
      tableHTML+= '</tr>';
    }

    calenderTable.innerHTML=tableHTML;
}