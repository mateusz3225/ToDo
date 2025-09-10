//todo lists are objects
import "./styles.css";
import {CreateClass,fillHTMLwithToDo} from "./AddingToDo.js";

class Projects {
    constructor(ProjectName) {
        this.ProjectName = ProjectName;
    }

}

export default class ToDo {
    constructor(title,description,dueDate,priority) {
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
    }
}
function Display(todo) {
    const BoxWithToDoList = document.querySelector('.box-with-todoboxes');
    BoxWithToDoList.innerHTML= 'WiIWIWIWIWIW';
    const DivBoxwithClass = document.createElement(`div`);
    DivBoxwithClass.classList.add("BoxContainingAClass");
    BoxWithToDoList.appendChild(DivBoxwithClass);
    DivBoxwithClass.innerHTML = ` 
    ${todo.title},
    ${todo.description},
    ${todo.dueDate},
    ${todo.priority},
    `
}

//const project1 = new ToDo('project','this will be a project','11th of may','medium');
//console.log(project1);
//Display(project1);
const ButtonToAddTasks= document.querySelector('.AddTask');
ButtonToAddTasks.addEventListener("click", () => {
    const CheckIfExist = document.querySelector('.formstyle');
    const Div = document.createElement('div');
    if(CheckIfExist === null) {
    Div.classList.add('formstyle');
    document.body.appendChild(Div);
    Div.innerHTML=`<p>Input a title: <input type="text" class="title"> </p>
            <p>Input a description: <textarea class="description"></textarea></p>
            <p>Input a Date: <input type='date' class='date'></p>
            <p>Input a priority: 
                <select class='prio'>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select>
                <p><button class="ADDTODO">ADD</button></p>
            </p>`
    } else {
        const lastchild = document.body.lastChild;
        Div.classList.remove('formstyle');
        document.body.removeChild(lastchild);
    }

});

document.addEventListener("click", function(event) {
    if (event.target.matches(".ADDTODO")) {
       const Title = document.querySelector('.title');
       const Description = document.querySelector('.description');
       const dueDate = document.querySelector('.date');
       const prio = document.querySelector('.prio');
        const NewToDo = CreateClass(Title.value,Description.value,dueDate.value,prio.value);
        console.log(NewToDo);
        fillHTMLwithToDo(NewToDo);
    }
});