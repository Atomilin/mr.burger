//****************************Функция навигации**************************************//
$(document).ready(function () {
    var sectionIndex = 0;

    $('.nav__link, .fixed-menu__link').on('click', function (e) {
        e.preventDefault();
        showSection($(this).attr('href'), true);
        sectionIndex = $(this).attr('href').replace(/#/, '');
        $('.fixed-menu__item').eq(sectionIndex-1).addClass('active').siblings().removeClass('active');
        switchColors(sectionIndex-1);
    });

    $('.menu-phone__link').on('click', function (e) {
        e.preventDefault();
        showSection($(this).attr('href'), true);
        sectionIndex = $(this).attr('href').replace(/#/, '');
        $('.menu-phone').css("display", "none");
    });

    $('.arrow').on('click', function (e) {
        e.preventDefault();
        showSection($(this).attr('href'), true);
        sectionIndex = $(this).attr('href').replace(/#/, '');
        $('.fixed-menu__item').eq(sectionIndex-1).addClass('active').siblings().removeClass('active');
        switchColors(sectionIndex-1);
    });

    showSlides(sectionIndex);

    var flag = false;

    // постраничный слайдер начало
    $('.wrapper').bind('mousewheel', function (e) {
        if (!flag) {

            /* Функция увеличивает индекс на 1, показывает следующй слайд*/
            function nextSlide() {
                showSlides(sectionIndex = parseInt(sectionIndex) + 1);
            }

            /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
            function prevSlide() {
                showSlides(sectionIndex -= 1);
            }

            var items = Array.from($(".section"));

            if (e.originalEvent.wheelDelta > 0) {
                prevSlide();
                if (sectionIndex < 0) {
                    sectionIndex = 0;
                }
            } else {
                nextSlide();
                if (sectionIndex > items.length) {
                    sectionIndex = items.length;
                }
            }

            for (var i = 0; i <= items.length; i++) {
                if (sectionIndex == i) {
                    showSec(sectionIndex, true);
                    $('.fixed-menu__item').eq(sectionIndex-1).addClass('active').siblings().removeClass('active');
                    switchColors(sectionIndex-1);
                }
            }

            flag = true;
            setTimeout(function () {
                flag = false;
            }, 1000);
        }
    });
    // постраничный слайдер конец
    var initialPoint;
    var finalPoint;
    //свайп начало
    $(".wrapper").on('touchstart', function(e) {
        e.stopPropagation();
            initialPoint=event.changedTouches[0];
        });
    $(".wrapper").on('touchend', function(e) {
        e.stopPropagation();
         /* Функция увеличивает индекс на 1, показывает следующй слайд*/
         function nextSlide() {
            showSlides(sectionIndex = parseInt(sectionIndex) + 1);
        }

        /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
        function prevSlide() {
            showSlides(sectionIndex -= 1);
        }

        var items = Array.from($(".section"));

        finalPoint=event.changedTouches[0];

        if (finalPoint.pageY < initialPoint.pageY){
            nextSlide();
            if (sectionIndex > items.length) {
                sectionIndex = items.length;
            }
        }
        else if (finalPoint.pageY > initialPoint.pageY){
            prevSlide();
            if (sectionIndex < 0) {
                sectionIndex = 0;
            }
        }

        for (var i = 0; i <= items.length; i++) {
            if (sectionIndex == i) {
                showSec(sectionIndex, true);
                $('.fixed-menu__item').eq(sectionIndex-1).addClass('active').siblings().removeClass('active');
                switchColors(sectionIndex-1);
            }
        }
    });
    //свайп конец

    showSection(window.location.hash, false);
});

function showSection(section, isAnimate) {
    var
        direction = section.replace(/#/, ''),
        reqSection = $('.section').filter('[data-section="' + direction + '"]'),
        reqSectionPos = (reqSection.offset() || {
            "top": NaN
        }).top;
    if (isNaN(top)) {
        if (isAnimate) {
            $('body, html').animate({
                scrollTop: reqSectionPos
            }, 500);
        } else {
            $('body, html').scrollTop(reqSectionPos);
        }
    }
}

function showSec(section, isAnimate) {
    var
        reqSec = $('.section').filter('[data-section="' + section + '"]'),
        reqSecPos = (reqSec.offset() || {
            "top": NaN
        }).top;

    if (isNaN(top)) {
        if (isAnimate) {
            $('body, html').animate({
                scrollTop: reqSecPos
            });
        } else {
            $('body, html').scrollTop(reqSecPos);
        }
    }
}

var switchColors = function (sectionEq) {

    const blackDot = [1, 6, 8];

    var dots = $('.fixed-menu__link');

    if ($.inArray(sectionEq, blackDot) != -1) {
      dots.addClass('fixed-menu__link--black');
    } else {
      dots.removeClass('fixed-menu__link--black');
    }
}