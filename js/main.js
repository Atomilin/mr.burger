//**********************************Функция для слайдера**********************************************************//

/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function nextSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function prevSlide() {
    showSlides(slideIndex -= 1);  
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slaider__deactive");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "flex";
}
//*********************************************Функция клика по крестику*******************************************//

//открытие и закрытие меню на главном экране
function openMenu() {
    var menuNavPhone = document.getElementById("menu-phone");
    menuNavPhone.style.display = "flex";
}

function closeMenu() {
    var menuNavPhone = document.getElementById("menu-phone");
    menuNavPhone.style.display = "none";
}