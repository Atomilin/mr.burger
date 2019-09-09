//****************************Функция навигации**************************************//
$(document).ready(function(){

    $('.nav__link').on('click',function(e){
        e.preventDefault();
        document.body.style.overflow = 'visible';
        showSection($(this).attr('href'), true);
    });

    $('.menu-phone__link').on('click',function(e){
        e.preventDefault();
        showSection($(this).attr('href'), true);
        document.body.style.overflow = 'visible';
        $('.menu-phone').css("display", "none");
    });

    $('.arrow').on('click',function(e){
        e.preventDefault();
        showSection($(this).attr('href'), true);
    });

    // постраничный слайдер начало
    var sectionIndex = 0;
    showSlides(sectionIndex);

   $('.wrapper').bind('mousewheel', function(e){
    
   /* Функция увеличивает индекс на 1, показывает следующй слайд*/
   function nextSlide() {
       showSlides(sectionIndex += 1);
   }

   /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
   function prevSlide() {
       showSlides(sectionIndex -= 1);  
   }

    var items = Array.from($(".section"));

    if(e.originalEvent.wheelDelta /120 > 0) {
        prevSlide();
        if (sectionIndex < 0) {
            sectionIndex = 0;
        }
    }
    else{
        nextSlide();
        if (sectionIndex > items.length) {
            sectionIndex = items.length;
        }
    }

    for(var i = 0; i <= items.length; i++) {
        if (sectionIndex == i) {
            console.log(items[i]);
            showSec(sectionIndex, true);
        }
    }
});
// постраничный слайдер конец

    showSection(window.location.hash, false);
});

function showSection(section, isAnimate) {
    var
        direction = section.replace(/#/, ''),
        reqSection = $('.section').filter('[data-section="' + direction + '"]'),
        reqSectionPos = (reqSection.offset()|| { "top": NaN }).top;
        if (isNaN(top)) {
            if (isAnimate) {
                $('body, html').animate({scrollTop: reqSectionPos}, 500);
            } else {
                $('body, html').scrollTop(reqSectionPos);
            }
        } 
}

function showSec(section, isAnimate) {
    var
        reqSec = $('.section').filter('[data-section="' + section + '"]'),
        reqSecPos = (reqSec.offset()|| { "top": NaN }).top;

        if (isNaN(top)) {
            if (isAnimate) {
                $('body, html').animate({scrollTop: reqSecPos}, 500);
            } else {
                $('body, html').scrollTop(reqSecPos);
            }
        } 
}