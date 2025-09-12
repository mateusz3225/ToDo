//todo lists are objects
import "./styles.css";
import "./nav.css";
import SlideTheNav from "./nav.js";
import {CreateClass,fillHTMLwithToDo} from "./AddingToDo.js";
let array = ['','','','',''];
let CompleteBoxes5 = document.querySelectorAll(".queryALL");
class Projects {
    constructor(ProjectName) {
        this.ProjectName = ProjectName;
        this.ToDos = [];
    }
}
const project1 = new Projects('Project1');
console.log(project1);

export default class ToDo {
    constructor(title,description,dueDate,priority) {
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
    }
}

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
document.addEventListener("click", function(event) {
    if (event.target.matches("#cancel")) {
       event.target.closest('.BoxContainingAClass').remove();
    }
    if (event.target.matches("#complete")) {
        const complete = event.target.closest('.BoxContainingAClass').innerHTML;
        const completeBox = document.querySelector('.right-side-completes');
        const completewithoutbut = complete.replace(`<button id="cancel">remove task</button>
        <button id="complete">Mark Complete</button>`, '');
        
        const ArrayNeededforDOM = fillCompletes(completewithoutbut);
        console.log(ArrayNeededforDOM, CompleteBoxes5[0],completeBox);
        //CompleteBoxes5[0].innerHTML = ArrayNeededforDOM[0];
        for(let i=0;i<=4;i++){
       CompleteBoxes5[i].innerHTML= ArrayNeededforDOM[i];
        }
        event.target.closest('.BoxContainingAClass').remove();
    }
});

function fillCompletes(completewithoutbutw) {
    const String = completewithoutbutw.toString();
    const TempArray = array;
    console.log(String,TempArray);
    array.splice(0,0,String);
    array.push(TempArray);
    array.pop();array.pop();
    return array;
}
SlideTheNav();
//TO DO:  make project1 hold the ToDo's in array, make a hide/show button to test it, make 2 projects and do a filp between them...