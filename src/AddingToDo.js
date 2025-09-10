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
    Parent.appendChild(Div);
    Div.innerHTML = `
    <div id="title">${NewToDo.title}</div>
        <div id="description">${NewToDo.description}</div>
        <div id="dieDate">${NewToDo.dueDate}</div>
        <div id="priority">${NewToDo.priority}</div>
    `
}