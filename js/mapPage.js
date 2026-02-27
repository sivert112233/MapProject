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
            L.marker(x).addTo(map).on('click', event => removeLocation(event));
        });
    }
    if (manuallyAdded) {
        manuallyAdded.forEach((x) => {
            L.marker(x).addTo(map).on('click', event => removeLocation(event));
        });
    }else{
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





