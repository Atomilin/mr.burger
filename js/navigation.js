//****************************Функция навигации**************************************//
$(document).ready(function(){

    $('.nav__link').on('click',function(e){
        e.preventDefault();
        showSection($(this).attr('href'), true);
    });

    $('.menu-phone__link').on('click',function(e){
        e.preventDefault();
        showSection($(this).attr('href'), true);
        $('.menu-phone').css("display", "none");
    });

    $('.arrow').on('click',function(e){
        e.preventDefault();
        showSection($(this).attr('href'), true);
    });


    showSection(window.location.hash, false);
});

function showSection(section, isAnimate) {
    var
        direction = section.replace(/#/, ''),
        reqSection = $('.section').filter('[data-section="' + direction + '"]'),
        reqSectionPos = reqSection.offset().top;

        if (isAnimate) {
            $('body, html').animate({scrollTop: reqSectionPos}, 500);
        } else {
            $('body, html').scrollTop(reqSectionPos);
        }
}

function checkSection() {
    $('.section').each(function() {
        var 
        $this = $(this),
        topEdge = $this.offset().top,
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();

        if (topEdge < wScroll && bottomEdge > wScroll) {
            currentId = $this.data("section"),
            window.location.hash = currentId;        }
    })
}