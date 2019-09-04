//**********************************Функция аккордеона  секции команда**************************************//
$(document).ready(function () {
    $('.team-acco__link').on('click', function (e) {
      e.preventDefault();

      var 
        elem = $(e.target),
        item = elem.closest('.team-acco__item'),
        items = item.siblings();

      if (!item.hasClass('team-acco__item--active')) {
        items.removeClass('team-acco__item--active');
        item.addClass('team-acco__item--active');
      } else {
        item.removeClass('team-acco__item--active');
      }

    });
});

//**********************************Функция аккордеона  секции меню**************************************//
$(document).ready(function () {

    $('.menu-acco__link').on('click', function (e) {
      e.preventDefault();
  
      var elem = $(e.target),
        item = elem.closest('.menu-acco__item'),
        items = item.siblings();
  
      if (!item.hasClass('menu-acco__item--active')) {
        items.removeClass('menu-acco__item--active');
        item.addClass('menu-acco__item--active');
      } else {
        item.removeClass('menu-acco__item--active');
      }
    });
});