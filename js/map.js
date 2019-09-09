ymaps.ready(init);
  var myMap;

  function init() {
    myMap = new ymaps.Map("map", {
      center: [55.753215, 37.622504],
      zoom: 11.5,
      controls: []
    });

    myMap.behaviors.disable('scrollZoom');

    var coords = [
        [55.771532, 37.602875],
        [55.730106, 37.624301],
        [55.771132, 37.639803],
        [55.750109, 37.583929],
        [55.750983, 37.655268]
      ],
      myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: 'images/icons/map-marker.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-26, -52]
      });

    for (var i = 0; i < coords.length; i++) {
      myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);

  }