document.querySelector('.mapPageHeaderHomeButton').addEventListener('click', () => {
    location.href = 'index.html';
});

// Declaration and init map location.
const map = L.map('map').setView([60.908479414005015, 10.810253805299897], 8);

//Adding map to the pages.
new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Adding markers on load. --FIX NAME!!!
window.addEventListener('load', () => {
    const manuallyAdded = JSON.parse(localStorage.getItem('manuallyAdded'));
    const AddedByRoute = JSON.parse(localStorage.getItem('routeLatAndLon'));

    if (AddedByRoute) {
        AddedByRoute.forEach((x) => {
            L.marker(x).addTo(map).on('click', y => { test(x, y) });
        });
    }
    if (manuallyAdded) {
        manuallyAdded.forEach((x) => {
            L.marker(x).addTo(map).on('click', y => { test(x, y) });
        });
    } else {
        const x = [60.908479414005015, 10.810253805299897];
        L.marker(x).addTo(map).on('click', y => {
            test(x, y);
        });
    }
    //--------------------------??????????????????????????----------------------------------
});

function test(x, y) {
    document.querySelector('#markerClicked').style.display = 'flex';

    document.querySelector('.markerClickedBoxGetLoc').addEventListener('click', () => {
        window.location.href = `https://www.google.com/maps/place/${x}`;
        document.querySelector('#markerClicked').style.display = 'none';
    });

    document.querySelector('.markerClickedBoxRemov').addEventListener('click', () => {
        y.target.remove();
        document.querySelector('#markerClicked').style.display = 'none';
    });

    document.querySelector('.markerClickedBoxtoMap').addEventListener('click', () => {
        document.querySelector('#markerClicked').style.display = 'none';
    });

    document.querySelector('#markerClicked').addEventListener('click', () => {
        document.querySelector('#markerClicked').style.display = 'none';
    });
}





