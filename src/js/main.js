const searchBtn = document.querySelector('.header-btn')
const searchInput = document.querySelector('.header-search__input')
const searchBtnClose = document.querySelector('.header-btn-close')
const searchButtons = [searchBtn, searchBtnClose]
let viewportWidth = window.innerWidth
const headerBottom = document.querySelector('.header-bottom__container')
const headerTop = document.querySelector('.header-container')
const headerNav = document.querySelector('.header-nav')
const burgerButtons = [document.querySelector('.header-burger'), document.querySelector('.header-nav__close-btn')]
const headerSearch = document.querySelector('.header-search')

for (let i=0; i<=1; i++) {
  searchButtons[i].addEventListener('click', function(){
    searchInput.classList.toggle('header-search__input_active');
    searchBtnClose.classList.toggle('hide');
    searchBtn.classList.toggle('hide');
    searchBtn.classList.toggle('grid');
  })
}


if (viewportWidth >= 650 && viewportWidth <= 768) {
  headerBottom.appendChild(headerNav);
}

window.addEventListener('resize', function() {
  viewportWidth = window.innerWidth;
  if (viewportWidth >= 650 && viewportWidth <= 768) {
    headerBottom.appendChild(headerNav);
  }
  else if(viewportWidth > 768) {
    headerTop.insertBefore(headerNav, headerSearch);
  }
})


for (let i=0; i<=1; i++) {
  burgerButtons[i].addEventListener('click', function() {
    headerNav.classList.toggle('header-nav_active');
  })
}





