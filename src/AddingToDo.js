import ToDo from "./index.js";
export function CreateClass(title,description,dueDate,priority) {
    const Title=title;
    const Description=description;
    const DueDate=dueDate;
    const Priority=priority;
    return new ToDo(Title,Description,DueDate,Priority);
}
export function fillHTMLwithToDo(NewToDo) {
    const Div = document.createElement('div');
    const Parent = document.querySelector('.box-with-todoboxes')
    Div.classList.add('BoxContainingAClass');
    const Divlength = document.querySelectorAll('.BoxContainingAClass');
    if(Divlength.length <= 9) {
    Parent.appendChild(Div);
    Div.innerHTML = `
    <div id="BoxContainingAClass">
    <div id="title">${NewToDo.title}</div>
        <div id="description">Description: ${NewToDo.description}</div>
        <div id="dieDate">Exp: ${NewToDo.dueDate}</div>
        <div id="priority">Priority: ${NewToDo.priority}</div>
        <button id="cancel">remove task</button>
        <button id="complete">Mark Complete</button>
        </div>
    `; return true;
    } else {alert("Maximum of 10 tasks per project, please remove a task or create a new project"); return false;}
}
export function fillHTMLwithCompletedTasks(CompleteToDo) {
    const QUERYALL = document.querySelectorAll('.right-side-completes div');
    for (let Task of CompleteToDo) {
        QUERYALL[CompleteToDo.indexOf(Task)].innerHTML = Task;

    }
}