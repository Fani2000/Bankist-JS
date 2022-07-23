'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpenModal =>
  btnOpenModal.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(nav => {
//   nav.addEventListener('click', e => {
//     // console.log('link', e.target);
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     // console.log(id);
//     const navElement = document.querySelector(id);
//     navElement.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// USING EVENT DELEGATION
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    // console.log(e.target);
    const id = e.target.getAttribute('href');
    const navElement = document.querySelector(id);
    navElement.scrollIntoView({ behavior: 'smooth' });
  }
});

// CREATING ELEMENTS
const message = document.createElement('div');
message.classList.add('cookie-message');
const message_content =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  message_content + '<button class="btn btn--close-cookie">Got it!</button>';

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '90%';

header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

// console.log(
//   document.documentElement.style.setProperty('--color-primary', 'orange')
// );

// Scrolling to the section
// console.log(btnScrollTo);
// console.log(section1);

btnScrollTo.addEventListener('click', e => {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // New Way Of Implementing scrollTo
  section1.scrollIntoView({ behavior: 'smooth' });
});

// RANDOM COLORS
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   e.target.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   e.target.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault();
//   e.target.style.backgroundColor = randomColor();
// });
