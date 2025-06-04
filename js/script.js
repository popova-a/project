"use strict"

// 3.2

const headerLogo = document.querySelector('.header__img');
let tooltip = null;

tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.textContent = 'VECTOR';
document.querySelector('.header__logo').appendChild(tooltip);

headerLogo.addEventListener('mouseenter', () => {
    tooltip.classList.add('active');
});

headerLogo.addEventListener('mouseleave', () => {
    tooltip.classList.remove('active');
});

// 3.3

const descriptionText = "Добро пожаловать в школу VECTOR";
const imgElement = document.querySelector('.about__image');
const descElement = document.getElementById('about__description-text');

imgElement.addEventListener('mouseenter', () => {
  descElement.textContent = descriptionText;
});

imgElement.addEventListener('mouseleave', () => {
  descElement.textContent = "";
});

// 3.4

const modalWindowController = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElem = document.querySelector(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModalWindow = (event) => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      (event instanceof KeyboardEvent && event.code === "Escape")
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        if (modalElem.parentNode) {
          modalElem.style.visibility = "hidden";
        }
      }, time);

      window.removeEventListener("keydown", closeModalWindow);
    }
  };

  const openModalWindow = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModalWindow);
  };

  buttonElem.addEventListener("click", openModalWindow);
  modalElem.addEventListener("click", closeModalWindow);
};

modalWindowController({
  modal: ".modal-window",
  btnOpen: ".header__button-widnow",
  btnClose: ".modal-window__close",
});

const cardsContainer = document.querySelector('.swiper-wrapper');

if (cardsContainer) {
    const dataTitleCards = ['Колесников Артем', 'Сидорова Анна', 'Петров Дмитрий'];
    const titleCards = cardsContainer.querySelectorAll('.review__card-title');
    
    titleCards.forEach((item, index) => {
        item.textContent = dataTitleCards[index];
    });
}

// 3.5

const headerMenu = document.querySelector('.header__menu');
if (headerMenu) {

  const headerList = headerMenu.querySelector('.header__menu-list');
  const menuData = {
    link1: {
      link: '#1',
      title: 'О нас',
    },
    link2: {
      link: '#2',
      title: 'Курсы',
    },
    link3: {
      link: '#3',
      title: 'Часто задаваемые вопросы',
    },
    link4: {
      link: '#5',
      title: 'Отзывы',
    }
  }
  const createLink = (UrlLink, title) => {
    const link = `<li class="header__menu-item"><a href="${UrlLink}" class="header__menu-link">${title}</a></li>`;
    return link;
  }
  for (const linkItem in menuData) {
    const link = menuData [linkItem];
    const linkIndex = createLink (link.link, link.title);
    headerList.insertAdjacentHTML ('beforeend', linkIndex);

  }

}

// 3.6

const cardsCon = document.querySelector(".section__partners");

if (cardsCon) {
  const cardList = cardsCon.querySelector(".partners__list");
  const apiUrl = "data.json";

  const createCard = (imageUrl, iconAlt, iconWidth, iconHeight, title) => {
    return `<li class="partners__list-item">
              <img class="partners__img" 
                   src="${imageUrl}" 
                   alt="${iconAlt}"
                   width="${iconWidth}" 
                   height="${iconHeight}">
              <h2 class="partners__title">${title}</h2>
            </li>`;
  };

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const cardElement = createCard(
          item.image,
          item.iconAlt,
          item.iconWidth,
          item.iconHeight,
          item.title
        );
        cardList.insertAdjacentHTML("beforeend", cardElement);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
    
}

const preloader = document.querySelector(".preloader");
const wrapper = document.querySelector(".wrapper__content");

if (preloader && wrapper) {
  setTimeout (() => {

    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    wrapper.style.display = "block";

    preloader.remove();
  }, 3000);
}

// 3.7

var swiper = new Swiper(".mySwiper", {
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
});