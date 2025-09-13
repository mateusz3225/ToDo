//todo lists are objects
import "./styles.css";
import "./nav.css";
import SlideTheNav from "./nav.js";
import {CreateProjectDOM} from "./createproject.js";
import {CreateClass,fillHTMLwithToDo} from "./AddingToDo.js";
let array = ['','','','',''];
export let i=2;
let CompleteBoxes5 = document.querySelectorAll(".queryALL");
//Project storage
const ProjectStorage = {};
//
function ToDocounting() {
    const TitleValue = 'Task' + i;
    i++;

    return TitleValue;
}

export class Projects {
    constructor(ProjectName) {
        this.ProjectName = ProjectName;
        this.ToDos = [];
        ProjectStorage[ProjectName] = this;
    }
}
export const project1 = new Projects('Project1');
ProjectStorage['Project1'] = project1;

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
    Div.innerHTML=`<p>Input a title: <input type="text" class="title" value="${'Task'+ (i-1)}"> </p>
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
// button for ToDo
document.addEventListener("click", function(event) {
    if (event.target.matches(".ADDTODO")) {
       const Title = document.querySelector('.title');
       const Description = document.querySelector('.description');
       const dueDate = document.querySelector('.date');
       const prio = document.querySelector('.prio');
       if (Title.value === '') {
           alert("Title cannot be empty");
           return;
       }
       const NewToDo = CreateClass(Title.value,Description.value,dueDate.value,prio.value);
       project1.ToDos.push(NewToDo);
       console.log(project1);
       console.log(NewToDo);
       const item = fillHTMLwithToDo(NewToDo);
       if (item !== false) { Title.value = ToDocounting(); };
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
// nav buttons projects
let selectedProject = 'Project1';
const CreateProjButton = document.querySelector('.create-project');
CreateProjButton.addEventListener("click", () => {
    const ProjectName = prompt("Enter the name of your new project");
    if (ProjectName !== null && ProjectName !== '') {
   CreateProjectDOM(ProjectName);
   selectedProject = ProjectName;
   console.log(selectedProject);
   const project1 = new Projects(ProjectName);
    ProjectStorage[ProjectName] = project1;
   }
   
});
document.addEventListener("click", function(event) {
    if (event.target.matches(".Delete-Project")) {
        const box = document.querySelector('.box-with-todoboxes');
        box.innerHTML = '';
         i=2;
         event.target.closest('.projectclass').remove();

    }
    if (event.target.matches(".Delete-Project-default")) {
        const box = document.querySelector('.box-with-todoboxes');
        const defaultproj = document.querySelector('.default-proj-class');
        defaultproj.remove();
         i=2;
        box.innerHTML = '';
    }
    if (event.target.matches(".Load-Project")) {
        const box = document.querySelector('.box-with-todoboxes');
        selectedProject = event.target.closest('p').innerText.trim().replace('Load', '').replace('Delete', '').trim();
        box.innerHTML = '';
        console.log(ProjectStorage[selectedProject]);
        for(let j=0;j<ProjectStorage[selectedProject].ToDos.length;j++) {
        fillHTMLwithToDo(ProjectStorage[selectedProject].ToDos[j]);
        }
        i=2; 
    }
});

//next : change adding todo to add to selected project, change delete button of a todo and of a project