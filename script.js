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
// Menu fade animation
const nav = document.querySelector('.nav');
// TABS COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab'); // Finds the closest tab instead of selecting even the span
  if (!clicked) return; // Guard clause

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // console.log(clicked);

  // Removing the active class for content
  tabsContent.forEach(tab => {
    tab.classList.remove('operations__content--active');
  });

  // Activate the current tab information
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU fade animation
const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link);
    // console.log(siblings);
    // console.log(logo);
    // console.log)
    siblings.forEach(sb => {
      if (sb !== link) sb.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => handleHover(e, 0.5));

nav.addEventListener('mouseout', e => handleHover(e, 1));

// Scrolling old school
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', e => {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// USING THE INTERSECTION OBSERVER API
// const obsCallback = (entries, observer) => {
//   // console.log('INTERSECTION', entries);
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const stickyNavOps = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

const observer = new IntersectionObserver(stickyNav, stickyNavOps);
observer.observe(header);

// Reveling sections and adding the animation for each section
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealSectionOpts = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  revealSectionOpts
);

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// FEATURES IMGS LAZY LOADING

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  console.log(entries);
  if (!entry.isIntersecting) return;

  // Replace the src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));
