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
window.addEventListener('load', () => {   const [jTets, jTets2 ] = JSON.parse(localStorage.getItem('lsAllLatLonLocations'));
    const [jTets, jTets2 ] = JSON.parse(localStorage.getItem('lsAllLatLonLocations', 'manuallyAdded'));


    if (jTets) {
        jTets.forEach((x) => {
            L.marker(x).addTo(map).on('click', event => removeLocation(event));
        });
    } else if (jTets2) {
        jTets2.forEach((x) => {
            L.marker(x).addTo(map).on('click', event => removeLocation(event));
        });
    } else {
        L.marker([60.908479414005015, 10.810253805299897]).addTo(map).on('click', event => {
            removeLocation(event);
        });
    }
    //--------------------------??????????????????????????----------------------------------


});





//---removes marker by clicking it.
function removeLocation(event) {
    confirm('ØNSKER DU Å FJÆRNE LOKASJONEN?') && event.target.remove();
}





