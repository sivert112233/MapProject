//Renders the page based om the local storage state.
renderPage();

//add events listeners to the page buttons.
document.querySelector('.mapButton').addEventListener('click', () => {
    document.location.href = 'mapPage.html';
});
document.querySelector('.addRouteButton').addEventListener('click', () => {
    document.location.href = 'makePage.html';
});
document.querySelector('.addLocationButton').addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});

//Functions
function renderPage() {
    if (localStorage.lsAllLatLonLocations) {
        //Declaring and claring the page.
        const pageMain = document.querySelector('.startPageMainDisplay');
        const locationData = JSON.parse(localStorage.lsSelectedRoute);
        pageMain.innerHTML = '';

        // Adding first line with information to the list.
        pageMain.innerHTML = `
            <div class="startPageMainDisplayBox">
            <div class="startPageMainDisplayStopNrbox">
                    <p>NR</p>
                </div>
                <div class="startPageMainDisplayStopNameBox">
                    <p>STOP NAME</p>
                </div>
            </div>
        `;

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
        <div class="startPageMainDisplayNoSelection">
            <p>
                Ingen ruter er laget enda.
            </p>
        </div>
    `;
    }
}
