const slider = () => {

  let sliderNav = document.querySelector('.slider__nav'),
      sliderLinks = document.querySelectorAll('.slider__nav-item'),
      slides = document.querySelectorAll('.slide');


  function hideSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('show');
      slides[i].classList.add('hide');
    }
  }

  function showSlide(b) {
    if (slides[b].classList.contains('hide')) {
      slides[b].classList.remove('hide');
      slides[b].classList.add('show', 'slideOnAnimate');
    }
  }

  function activeLinks(e) {
    // Удаляем клас активности у ссылок
    for (let i = 0; i < sliderLinks.length; i++) {
      sliderLinks[i].classList.remove('active');
    }

    // Добавляем клас активности нужной ссылке
    for (let i = 0; i < sliderLinks.length; i++) {
      if (e === i) {
        sliderLinks[e].classList.add('active')
      }
    }
  }


  // Событие клика на меню слайдера
  sliderNav.addEventListener('click', function (event) {
    let target = event.target;

    if (target && target.classList.contains('slider__nav-item')) {

      for (let i = 0; i < sliderLinks.length; i++) {
        if (target === sliderLinks[i]) {

          //Клас активности ссылки
          activeLinks(i);

          // Скрываем все слайды
          hideSlide();
          // Показываем нужный
          showSlide(i);
          break;
        }
      }
    }

  });


};

export default slider;
