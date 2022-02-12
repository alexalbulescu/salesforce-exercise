let markersAdded = [];
let map;
async function retrieveStores() {
    try {
        const res = await fetch(`${window.location.origin}/api/stores`);
        const data = await res.json();

        return data;
    }catch(err){
        if(err) return (err)
    }

}

async function initMap() {

    // pick center coordinates for your map
    let myMapCenter = {lat: 45.7549743, lng: 21.2288404};

    // create map and say which HTML element it should appear in
    map = new google.maps.Map(document.getElementById('map'), {
        center: myMapCenter,
        zoom: 14
    });
    const stores = await retrieveStores();
    if (stores.length) {
        for(let i = 0; i < stores.length; i++) {
            addStoreMarker(stores[i]);
        }
    }
}

function addStoreMarker(store) {
    const content = store.name;
    const storeMarker = new google.maps.Marker({
        title: store.name,
        position: new google.maps.LatLng(store.latitude, store.longitude),
        category: store.options.split(','),
        map: map,
    });

    const infoWindow = new google.maps.InfoWindow({
        content: ''
    });

    markersAdded.push(storeMarker);

    // Marker click listener
    google.maps.event.addListener(storeMarker, 'click', (function (marker, content) {
        return function () {
            infoWindow.setContent(content);
            infoWindow.open(map, marker);
            map.setCenter(marker.getPosition());
            map.setZoom(15);
        }
    })(storeMarker, content));
}