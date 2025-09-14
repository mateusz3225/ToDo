//todo lists are objects
import "./styles.css";
import "./nav.css";
import SlideTheNav from "./nav.js";
import {CreateProjectDOM} from "./createproject.js";
import {CreateClass,fillHTMLwithToDo,fillHTMLwithCompletedTasks} from "./AddingToDo.js";
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
        this.CompleteTasks = [];
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
            <div class="flex-description">Input a description: <textarea class="description"></textarea></div>
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
       ProjectStorage[selectedProject].ToDos.push(NewToDo);
       
       const item = fillHTMLwithToDo(NewToDo);
       if (item !== false) { Title.value = ToDocounting(); };
   }
});

document.addEventListener("click", function(event) {
    if (event.target.matches("#cancel")) {
        ProjectStorage[selectedProject].ToDos = ProjectStorage[selectedProject].ToDos.filter(todo => todo.title !== event.target.closest('.BoxContainingAClass').querySelector('#title').innerText);
        
       event.target.closest('.BoxContainingAClass').remove();
    }
    //Complete button//
    if (event.target.matches("#complete")) {
        const complete = event.target.closest('.BoxContainingAClass').innerHTML;
        
        const completewithoutbut = complete.replace(
            `<button id="cancel">remove task</button>
        <button id="complete">Mark Complete</button>`,
            ''
        );

        
        if (selectedProject === 'Project1') {
            project1.CompleteTasks.push(completewithoutbut);
            project1.ToDos = project1.ToDos.filter(todo =>
                todo.title !== event.target.closest('.BoxContainingAClass').querySelector('#title').innerText
            );
        } else {
            ProjectStorage[selectedProject].CompleteTasks.push(completewithoutbut);
            ProjectStorage[selectedProject].ToDos = ProjectStorage[selectedProject].ToDos.filter(todo =>
                todo.title !== event.target.closest('.BoxContainingAClass').querySelector('#title').innerText
            );
        }


        if (ProjectStorage[selectedProject].CompleteTasks.length > 5) {
            ProjectStorage[selectedProject].CompleteTasks.shift();
        }


        const currentCompleteTasks = [...ProjectStorage[selectedProject].CompleteTasks].reverse();

        
        CompleteBoxes5.forEach((target, index) => {
            target.innerHTML = currentCompleteTasks[index] || '';
        });
        console.log(currentCompleteTasks)
        
        event.target.closest('.BoxContainingAClass').remove();
    }
    //Complete button//
});

function fillCompletes(completewithoutbutw) {
    const String = completewithoutbutw.toString();
    const TempArray = array;
    
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
   
   const project1 = new Projects(ProjectName);
    ProjectStorage[ProjectName] = project1;
    const box = document.querySelector('.box-with-todoboxes');
    box.innerHTML = '';
    i=2;
   }
   
});
document.addEventListener("click", function(event) {
    if (event.target.matches(".Delete-Project")) {
        const box = document.querySelector('.box-with-todoboxes');
        const CompleteBoxes5 = document.querySelectorAll(".queryALL");
        CompleteBoxes5.forEach((target) => {
            target.innerHTML = '';
        });
        if (ProjectStorage[selectedProject] === ProjectStorage[event.target.closest('p').innerText.trim().replace('Load', '').replace('Delete', '').trim()]) {box.innerHTML = '';};
         i=2;
         event.target.closest('.projectclass').remove();
            delete ProjectStorage[event.target.closest('p').innerText.trim().replace('Load', '').replace('Delete', '').trim()];

    }
    if (event.target.matches(".Delete-Project-default")) {
        const box = document.querySelector('.box-with-todoboxes');
        const defaultproj = document.querySelector('.default-proj-class');
        const CompleteBoxes5 = document.querySelectorAll(".queryALL");
        CompleteBoxes5.forEach((target) => {
            target.innerHTML = '';
        });
        defaultproj.remove();
        ProjectStorage['Project1'].ToDos = [];
         i=2;
        if (ProjectStorage[selectedProject] === ProjectStorage[event.target.closest('p').innerText.trim().replace('Load', '').replace('Delete', '').trim()]) {box.innerHTML = '';};
    }
    if (event.target.matches(".Load-Project")) {
        
        
        const box = document.querySelector('.box-with-todoboxes');
        const QueryALL = document.querySelectorAll('.queryALL');
        for (let item of QueryALL) {
            item.innerHTML = '';
        }
        selectedProject = event.target.closest('p').innerText.trim().replace('Load', '').replace('Delete', '').trim();
        box.innerHTML = '';
        
        for(let j=0;j<ProjectStorage[selectedProject].ToDos.length;j++) {
        fillHTMLwithToDo(ProjectStorage[selectedProject].ToDos[j]);
        }
        fillHTMLwithCompletedTasks(ProjectStorage[selectedProject].CompleteTasks);
        
        i=2; 
    }
});
