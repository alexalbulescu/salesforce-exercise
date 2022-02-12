function initMap() {

    // pick center coordinates for your map
    let myMapCenter = {lat: 45.7549743, lng: 21.2288404};

    // create map and say which HTML element it should appear in
    let map = new google.maps.Map(document.getElementById('map'), {
        center: myMapCenter,
        zoom: 14
    });
}