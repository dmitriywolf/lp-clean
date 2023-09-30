// Расстояние до элемента
function offset(el) {
  const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}


const scroll = () => {

  const header = document.getElementById('header');
  const intro = document.getElementById('intro');
  const animationAdvantage = document.querySelectorAll('.advantage');
  const advantagesList = document.querySelector('.advantages__list');
  const slider = document.querySelector('.slider__slides');
  const orderButton = document.querySelector('.order-btn');

  // Добавить анимацию к элементам преимуществ если при звгрузке страницы они видимы изначально
  if (document.documentElement.clientHeight > offset(advantagesList).top) {
    for (let i = 0; i < animationAdvantage.length; i++) {
      animationAdvantage[i].classList.add('advantagesAnimate');
    }
  }

  // Определить параметры до события скрола
  let introHeight = intro.offsetHeight;
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Событие на скрол
  window.addEventListener('scroll', () => {
    introHeight = intro.offsetHeight;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Добавить анимацию меню если проскролили блок Интро
    if (scrollPosition > introHeight) {
      header.classList.add('fixed', 'animated', 'headerAnimate');
    } else {
      header.classList.remove('fixed', 'animated', 'headerAnimate');
    }

    //Добавить анимацию для преимуществ
    if ((document.documentElement.clientHeight + scrollPosition) > offset(advantagesList).top) {
      for (let i = 0; i < animationAdvantage.length; i++) {
        if (!animationAdvantage[i].classList.contains('advantagesAnimate')) {
          animationAdvantage[i].classList.add('advantagesAnimate');
        }
      }
    }


    // Добавить анимации для слайдера
    if ((document.documentElement.clientHeight + scrollPosition) > (offset(slider).top + 0.6 * slider.offsetHeight)) {
      document.querySelector('.slider__wrapper-title').classList.add('sliderWrTitleAnimate');
      document.querySelector('.slider__wrapper-text').classList.add('sliderWrTitleAnimate');
      document.querySelector('.slider__wrapper').classList.add('sliderWrapperAnimate');
      document.querySelector('.slider').classList.add('slidesAnimate');
      document.querySelector('.slider__nav-wrap').classList.add('sliderNavAnimate');

      // Убираем кнопку заказа
      orderButton.classList.add('animated', 'fadeIn');
    } else {
      orderButton.classList.remove('fadeIn');
    }

  });

};

export default scroll;
