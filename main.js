ymaps.ready(init);
var myMap, myPlacemark;

function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.752172, 37.616689],
    zoom: 13,
    controls: []
  });

   //создаем массив из объектов
   var myCollection=[];


   

 var popup = document.querySelector('.popup');
 var close = popup.querySelector('.popup__close');
 close.addEventListener('click', ()=>{popup.classList.remove('active')});

 var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
  // Зададим содержимое заголовка балуна.
  balloonContentHeader: '',
  // Зададим содержимое основной части балуна.
  balloonContentBody: "<p>Ваше имя: <br><input name='login'></p><p>Место: <br><input name='place'></p><p>Отзыв: <br><input name='review'></p>", 
  // Зададим содержимое нижней части балуна.
  balloonContentFooter: "<p><input type='submit' value='Добавить'></p>",
  index:1
  
});

 
// Создаем собственный макет с информацией о выбранном геообъекте.
var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
// Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
'<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
'<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
'<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
  );

//Создадим кластеризатор, вызвав функцию-конструктор.
clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна. 
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 8
}),

//добавление меток по клику
myMap.events.add('click', function(e) {
  

//получаем адрес метки по координатам
ymaps.geocode(e.get('coords'), {
results: 1
}).then(function (res) {
var newContent = res.geoObjects.get(0).properties.get('name');

var address = document.querySelector('.popup__geo');
address.textContent = newContent;
popup.classList.add('active');
});
});

}
