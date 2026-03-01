import { routeData } from '../data/data.js';
const pageMain = document.querySelector('.startPageMainDisplay');
//Renders the page based om the local storage state.
renderPage();

//adding event listeners to the page buttons.
document.querySelector('.startPageHeaderButtonRight').addEventListener('click', () => {
    document.location.href = 'mapPage.html';
});

document.querySelector('.startPageHeaderButtonleft').addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});

//Er ikke sikkert at jeg trennger denne???
addLocationBySearch();

//Functions
function addLocationBySearch() {
    //Declaration
    const input = document.querySelector('.destinationSearchInput');
    const button = document.querySelector('.destinationSearchButton');

    button.addEventListener('click', async () => {
        console.log(input.value);

        const url = `https://nominatim.openstreetmap.org/search?q=${input.value}&format=json&limit=50`;
        const response = await fetch(url).then(x => x.json());

        if (response) {
            pageMain.innerHTML = '';

            response.forEach(x => {
                pageMain.innerHTML += `
                    <div class="displayBoxRender">
                        <button class="displayBoxLocResultButton" value="${x.lat} ${x.lon}">
                            <div class="displayBoxLocResult">${x.display_name}</div>
                        </button>
                    </div>
                `;
            });

            document.querySelectorAll('.displayBoxLocResultButton').forEach(des => {
                des.addEventListener('click', () => {
                    console.log(des.value);
                    const lat = Number(des.value.slice(0, des.value.search(/ /i)));
                    const lon = Number(des.value.slice(des.value.search(/ /i) + 1, des.value.length));


                    pageMain.innerHTML = `
                        <div id="map"></div>
                    `;

                    // Declaration and init map location.
                    const map = L.map('map').setView([lat, lon], 15);

                    //Adding map to the pages.
                    new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    // Adding marker to selected location.
                    L.marker([lat, lon]).addTo(map).on('click', event => removeLocation(event));

                    document.querySelector('.startPageMainAddInputBox').innerHTML = `
                        <p>Er dette rikting locasjon?</p>
                        <button class="destinationConfirmButton" value='y'>Ja</button>
                        <button class="destinationConfirmButton" value='n'>Nei</button>
                    `;

                    document.querySelectorAll('.destinationConfirmButton').forEach(x => {
                        x.addEventListener('click', () => {
                            if (x.value === 'y') {
                                if (localStorage.manuallyAdded) {
                                    const manuallyAddedArray = JSON.parse(localStorage.getItem('manuallyAdded'));
                                    manuallyAddedArray.push([lat, lon]);
                                    localStorage.setItem('manuallyAdded', JSON.stringify(manuallyAddedArray));
                                } else {
                                    localStorage.setItem('manuallyAdded', JSON.stringify([[lat, lon]]));
                                }
                                window.location.reload();
                            }
                            if (x.value === 'n') {
                                window.location.reload();
                            }
                        });
                    });
                });
            });
        }
    });
}


function renderPage() {
    if (localStorage.routeLatAndLon) {
        //Declaring and claring the page.
        const locationData = JSON.parse(localStorage.lsSelectedRoute);
        pageMain.innerHTML = '';

        // Adding first line with information to the list.
        /*
        pageMain.innerHTML = `
            <div class="startPageMainDisplayBox">
                <div class="startPageMainDisplayStopNrbox">
                    <p class="startPageMainDisplayStopNrboxFont">Antall</p>
                </div>
                <div class="startPageMainDisplayStopNameBox">
                    <p class="startPageMainDisplayStopNrboxFont">Destinasjon</p>
                </div>
            </div>
        `;
        */
        //Adding the locations to the list. And saving them in local storage. 
        locationData.forEach((e) => {
            pageMain.innerHTML += `
                <div class="startPageMainDisplay">
                    <div class="startPageMainDisplayBox">
                        <div class="startPageMainDisplayStopNrbox">
                            <p>${e.stopNr}</p>
                        </div>
                        <div class="startPageMainDisplayStopNameBox">
                            <p>${e.loc} - ${e.des}</p>
                        </div>
                    </div>
                </div>
            `;
        });

    } else {
        const pageMain = document.querySelector('.startPageMainDisplay');
        pageMain.innerHTML = `
        <div class="pageMainRouteOptions">
            <p class="startPageMainDisplayText">Velg ruten du kjører</p>
            <button id="kongsvingerMandag" class="pageMainRouteOptionsButtons">Kongsvinger Mandag</button>
            <button id="kongsvingerTorsdag" class="pageMainRouteOptionsButtons">Kongsvinger Torsdag</button>
            <button id="mjøsaMandagn" class="pageMainRouteOptionsButtons">Mjøsa Mandag</button>
            <button id="mjøsaTirsdag" class="pageMainRouteOptionsButtons">Mjøsa Tirsdag</button>
            <button id="mjøsaOnsdag" class="pageMainRouteOptionsButtons">Mjøsa Onsdag</button>
            <button id="mjøsaTorsdag" class="pageMainRouteOptionsButtons">Mjøsa Torsdag </button>
            <button id="mjøsaFredag" class="pageMainRouteOptionsButtons">Mjøsa Fredag</button>
            <button id="østerdal" class="pageMainRouteOptionsButtons">Østerdalen</button>
            <button id="valdres" class="pageMainRouteOptionsButtons">Valdes</button>
            <button id="skjåkMandag" class="pageMainRouteOptionsButtons">Skjåk Mandag</button>
            <button id="skjåkOnsdag" class="pageMainRouteOptionsButtons">Skjåk Onsdag</button>
            <button id="drevskjø" class="pageMainRouteOptionsButtons">Drevsjø</button>
            <button id="hadelandOnsdag" class="pageMainRouteOptionsButtons">Hadeland Onsdag</button>
            <button id="hadelandFradag" class="pageMainRouteOptionsButtons">Hadeland Fredag</button>
        </div>
    `;
        document.querySelectorAll('.pageMainRouteOptionsButtons').forEach(button => {
            button.addEventListener('click', (clickedButton) => {
                //Get data from button click
                let selectedRoute;
                switch (clickedButton.target.id) {
                    case 'kongsvingerMandag':
                        selectedRoute = routeData.kongsvingerMandag;
                        break;
                    case 'kongsvingerTorsdag':
                        selectedRoute = routeData.kongsvingerTorsdag;
                        break;
                    case 'mjøsaMandagn':
                        selectedRoute = routeData.mjøsaMandag;
                        break;
                    case 'mjøsaTirsdag':
                        selectedRoute = routeData.mjøsaTirsdag;
                        break;
                    case 'mjøsaOnsdag':
                        selectedRoute = routeData.mjøsaOnsdag;
                        break;
                    case 'mjøsaTorsdag':
                        selectedRoute = routeData.mjøsaTorsdag;
                        break;
                    case 'mjøsaFredag':
                        selectedRoute = routeData.mjøsaFredag;
                        break;
                    case 'østerdal':
                        selectedRoute = routeData.østerdal;
                        break;
                    case 'valdres':
                        selectedRoute = routeData.valdres;
                        break;
                    case 'skjåkMandag':
                        selectedRoute = routeData.skjåkMandag;
                        break;
                    case 'skjåkOnsdag':
                        selectedRoute = routeData.skjåkOnsdag;
                        break;
                    case 'drevskjø':
                        selectedRoute = routeData.drevskjø;
                        break;
                    case 'hadelandOnsdag':
                        selectedRoute = routeData.hadelandOnsdag;
                        break;
                    case 'hadelandFradag':
                        selectedRoute = routeData.hadelandFradag;
                        break;
                }
                //Puts lat and lon locations in local storage
                const storageArray = [];
                selectedRoute.forEach((x) => {
                    storageArray.push(x.latLng);
                });
                //Puts selection inn local storage
                localStorage.routeLatAndLon = JSON.stringify(storageArray);
                localStorage.lsSelectedRoute = JSON.stringify(selectedRoute);
                window.location.reload();
            });
        });
    }
}
//---removes marker by clicking it.
function removeLocation(event) {
    confirm('ØNSKER DU Å FJÆRNE LOKASJONEN?') && event.target.remove();
}
