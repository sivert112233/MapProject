import { routeData } from '../data/data.js';

//Adding event listener to home button.
document.querySelector('.pageHeaderHomeButton').addEventListener('click', () => {
    location.href = 'index.html';
});

//Add event listener to route buttons.
document.querySelectorAll('.pageMainRouteOptionsButtons').forEach(button => {
    button.addEventListener('click', (clickedButton) => {

        //--------------------------------------------------------------------//
        //test
        localStorage.lsSelectedRoute = JSON.stringify([]);
        localStorage.lsAllLatLonLocations = JSON.stringify([]);
        //----s----------------------------------------------------------------//

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
        localStorage.lsAllLatLonLocations = JSON.stringify(storageArray);
        localStorage.lsSelectedRoute = JSON.stringify(selectedRoute);

        location.href = 'index.html';
        
    });
});




