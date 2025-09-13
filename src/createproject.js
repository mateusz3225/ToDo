
export function CreateProjectDOM(ProjectName) {
    const Div = document.createElement('div');
    const Nav = document.querySelector('.nav');
    Div.classList.add('projectclass');
    Nav.appendChild(Div);
    Div.innerHTML=`
    <p>${ProjectName} <button class="Load-Project">Load</button><button class="Delete-Project">Delete</button></p>
    `
}