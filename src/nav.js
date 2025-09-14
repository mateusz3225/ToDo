import ArrowRight from './arrow-right.svg';
import ArrowLeft from './arrow-left.svg';
export default function SlideTheNav() {
    const SlideButton = document.querySelector('.slide-right');
    const Nav = document.querySelector('.nav');
    const NavDisplay = document.querySelector('.nav-display');
    SlideButton.addEventListener('click', () => {
        if (SlideButton.classList.contains('slide-right')) {
        Nav.classList.remove('nav');
        Nav.classList.add('nav-hidden');
        SlideButton.classList.remove('slide-right')
        SlideButton.classList.add('slide-right-stick');
        SlideButton.innerHTML=`<img src='${ArrowLeft}'>`;
        NavDisplay.style.display='none';
    } else {
        Nav.classList.remove('nav-hidden');
        Nav.classList.add('nav');
        SlideButton.classList.remove('slide-right-stick')
        SlideButton.classList.add('slide-right');
        SlideButton.innerHTML=`<img src='${ArrowRight}'>`;
        NavDisplay.style.display='block';
        } 
})};