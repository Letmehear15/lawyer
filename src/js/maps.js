window.addEventListener('DOMContentLoaded', ()=> {
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.096523, 38.760149],
            zoom: 17
        });
        var placemark = new ymaps.Placemark(myMap.getCenter(), {
            balloonContentBody: '<img src="./img/maps.png" > <br/> ' +
            '<span><b>Наш адрес:</b></span><br/>' +
            '<span> ул. Гражданская <br> д. 10, офис 209</span>'
        });
        myMap.geoObjects.add(placemark);
        placemark.balloon.open();
    }
})