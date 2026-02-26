const inputBoxButton = document.querySelector('.inputBoxButton');
const inputBoxInput = document.querySelector('.inputBoxInput');

//Search button event.
inputBoxButton.addEventListener('click', () => {
    searchLocationAndAddMarker(inputBoxInput.value);
});

//Search functiion.
async function searchLocationAndAddMarker(x) {

    if (!x) {
        return alert('Ingen lokasjon valget\nSkrives in i søk boksen.');
    }

    const displayBox = document.querySelector('.displayBox');
    const mapHeight = document.querySelector('#map');
    displayBox.innerHTML = ``;

    //Getting search location(s) from the api.

    //console.log(x);


    const url = `https://nominatim.openstreetmap.org/search?q=${x}&format=json&limit=50`;
    const response = await fetch(url).then(x => x.json());

    //console.log(response);

    if (response.length === 0) {
        return alert(`Finner ingen adresse med navnet (${x}). Sjekk adressen.`);
    }

    if (response.length > 1) {
        mapHeight.style = 'height: 70vh';
        response.forEach(x => {

            //Displaying search result on the page.

            displayBox.innerHTML += `
                <div class="displayBoxRender">
                    <button class="displayBoxLocResultButton" value="${x.lat} ${x.lon}">
                        <div class="displayBoxLocResult">${x.display_name}</div>
                    </button>
                </div>
            `;
        });
        displayBox.innerHTML += `
            <div class="displayBoxRender">    
                <P class="displayBoxResultNotFound">Finner ikke lokasjonen?<br> Spesifisere lokasjonssøket.</P>
            </div>
            `;



        //Add onClick event to display locations.--?

        document.querySelectorAll('.displayBoxLocResultButton').forEach((x) => {
            x.addEventListener('click', (z) => {
                const locationData = JSON.parse(localStorage.getItem('allLoc'));
                const lat = Number(x.value.slice(0, x.value.search(/ /)));
                const lon = Number(x.value.slice(x.value.search(/ /) + 1, x.value.length));
                L.marker([lat, lon]).addTo(map).on('click', event => removeLocation(event));
                locationData.push([lat, lon]);
                displayBox.innerHTML = '';
                mapHeight.style = 'height: 87vh';
                inputBoxInput.value = '';
                localStorage.allLoc = JSON.stringify(locationData);
            });

        });

    } else {
        //Adding marker to the map.
        L.marker([response[0].lat, response[0].lon]).addTo(map).on('click', event => removeLocation(event));
        inputBoxInput.value = '';
    }
}
//-----------------------------------------------------------------------------------------------------//
