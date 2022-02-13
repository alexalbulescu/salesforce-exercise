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
        zoom: 13
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
            map.setZoom(14);
        }
    })(storeMarker, content));
}
function toggleAddStoreForm() {
    let formWrapper = document.getElementById("formWrapper");
    formWrapper.classList.toggle('show');
}

async function addStore(event) {
    event.preventDefault();
    let form = document.querySelector('form');
    let entries = new FormData(form).entries();
    const data = Object.assign(...Array.from(entries, ([x,y]) => ({[x]:y})));

    const response = await fetch('/api/stores', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        console.log(response.statusText);
    } else {
        //reinitialize map with new store added
        await initMap();
    }

}

document.addEventListener("DOMContentLoaded", async function() {
    const res = await fetch(`${window.location.origin}/api/stores/options`);
    const options = await res.json();
    let storesOptionsDropdown = document.getElementById('store_options');
    if (options.length) {
        for(let i = 0; i < options.length; i++) {
            let opt = document.createElement('option');
            opt.value = options[i];
            opt.innerHTML = options[i];
            storesOptionsDropdown.appendChild(opt);
        }
    }
});

function showAllMarkers()
{
    for (let i = 0; i < markersAdded.length; i++) {
        let marker = markersAdded[i];
        marker.setVisible(true);
    }
}

function selectStoreOption()
{
    let option = document.getElementById("store_options").value;
    if (option) {
        for (let i = 0; i < markersAdded.length; i++) {
            let marker = markersAdded[i];
            if (typeof marker.category == 'object' && marker.category.includes(option)) {
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        }
    } else {
        showAllMarkers();
    }
}