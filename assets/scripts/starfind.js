let Aapi = "https://api.astronomyapi.com/api"
let applicationId = '7760cf6f-6954-443c-b95f-f3fd429adb70';
let applicationSecret = '3fc34ba79f9fea2ffa6b109bad7f1f94bccbac31d7d885cb2509c0a59c70e0d7ffb0c3f439e37bbedb50b50796c6917fb4205491b187685ef56ee920bd97e07cb7c8d8db32682f1a4961ff0057e95f951dc421ae4e1766078f89d9ca8199e38dd0a926da22df2f8ef7e61f3f72dd7a14';

let coordsLat = '';
let coordsLon = '';


let params = "";
let dataTable = "";
let starList = '';
let listened = '';  

let starChart = "/v2/studio/star-chart";
let searchAApi = "/v2/search"
let typeBox = document.querySelector('#type-search');
let setBox = document.querySelector('#search')
let moreBox = document.querySelector('#search-more');
let presentBox = document.querySelector('#present-box');
let choiceBox = '';
let searchType = '';
let imageRes = '';

const hash = btoa(`${applicationId}:${applicationSecret}`);

let typeSelect = "";

// fetches the JSON with the stars and constellations

fetchJSON();

navigator.geolocation.getCurrentPosition(success)

function success(pos) {
    const crd = pos.coords;
    coordsLat = crd.latitude;
    coordsLon = crd.longitude;
}

function fetchJSON() {
    fetch("./starlist.json")
    .then((response) => response.json())
    .then((data) => {
        starList = (data);
    });
}

// detect which radio button has been selected, create drop-down list or search box for each.

typeBox.addEventListener('click', function (event){
    let choiceTarget = "";
    choiceTarget = event.target.parentElement.parentElement.id;
    moreBox.innerHTML = "";
    presentBox.innerHTML = "";
    typeSelect = searchAApi;
    if(choiceTarget == "other") {
        moreBox.innerHTML = 
            `<input type="text" id="searchTerm" placeholder="Enter Search Term">`;
            document.querySelector('#searchBtn').setAttribute('style', 'visibility: visible;');
            searchType = "Other";
            
    } else if (choiceTarget == "Star") {
        let searchOptions= [`<option value="" disabled selected>Selet Your Choice</option>`];
        for (i = 0; i < starList.star.length; i++) {
            searchOptions.push(`<option value="${starList.star[i]}">${starList.star[i]}</option>`)
        };
        moreBox.innerHTML =`<select id="searchTerm">
            ${searchOptions}
            </select>`
            document.querySelector('#searchBtn').setAttribute('style', 'visibility: visible;');

        searchType = "Star";
    } else if (choiceTarget == "Galaxy") {
        let searchOptions= [`<option value="" disabled selected>Selet Your Choice</option>`];
        for (i = 0; i < starList.galaxy.length; i++) {
            searchOptions.push(`<option value="${starList.galaxy[i]}">${starList.galaxy[i]}</option>`)
        }
        moreBox.innerHTML =`<select id="searchTerm">
        ${searchOptions}
            </select>`;
        
        document.querySelector('#searchBtn').setAttribute('style', 'visibility: visible;');
        searchType = "Galaxy";
    };
    // choiceBox = document.querySelector('#searchBtn');
    // choiceBox.addEventListener('click', function(event){
    //     presentBox.innerHTML = "";
    //     console.log(event.target.previousElementSibling.value);
    //     searchTerm = event.target.previousElementSibling.value;
    //     params = "?term=" + searchTerm + "&match_type=fuzzy";

    //     fetchAPI(typeSelect,params);
    // })
})

choiceBox = document.querySelector('#searchBtn');
choiceBox.addEventListener('click', function(event){
    presentBox.innerHTML = "";
    searchTerm = event.target.previousElementSibling.value;
    params = "?term=" + searchTerm + "&match_type=fuzzy";

    fetchAPI(typeSelect,params);
})

function renderChart(params) {
    fetch(Aapi + starChart, {
        method: "POST",
        body: JSON.stringify(params),
        "Access-Control-Allow-Origin": "*",
        headers: {
            'Authorization': 'Basic ' + hash,
            'Origin': 'https://omgthegreenranger.github.io/Astrono-MyDashboard',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        imageRes = (data);
        console.log(imageRes['data']['imageUrl']);
        let imageSrc = imageRes.data['imageUrl'];
        presentBox.innerHTML = `<figure><img src="${imageSrc}"></figure>`
    })
}

function fetchAPI(typeSelect,params) {
    fetch("https://api.astronomyapi.com/api" + typeSelect + params, {
        method: "GET",
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*",
        headers: {
  
            'Authorization': 'Basic ' + hash,
            'Origin': 'https://omgthegreenranger.github.io/Astrono-MyDashboard',
        }})   
    .then((response) => response.json())
    .then((data) => {
        dataTable = data['data'];
        
        for(i=0; i < dataTable.length; i++) {
            if (dataTable[i] == null) {
                presentBox.innerHTML = "Nothing found, Dave.";
            } else if(searchType == "other") {
                presentBox.innerHTML +=
                `<div id="${i}"><span>${dataTable[i]['name']}</span><span>${dataTable[i]['type']['name']}</span><span>${dataTable[i]['position']['constellation']['name']}</span></div>`
            } else if (dataTable[i]['type']['name'] == searchType) {
                presentBox.innerHTML +=
                `<div id="${i}"><span>${dataTable[i]['name']}</span></div>`
            } else {
                console.log("Borked!");
            };
        };   
    });
};
 
presentBox.addEventListener('click', function(event) {
    console.log(event.target.parentElement.id);
    listened = dataTable[event.target.parentElement.id];
    if(searchType == "Star"){
        let observer = {"latitude": coordsLat, "longitude": coordsLon, "date": "2023-02-02"};
        let view = {"type": "constellation", "parameters": {"constellation": listened['position']['constellation']['id']}};
        params = {"style": "default", "observer": observer, "view": view};
    } else if (searchType == "Galaxy") {
        let observer = {"latitude": coordsLat, "longitude": coordsLon, "date": "2023-02-02"};
        let view = {"type": "area", "parameters": {"position": {"equatorial": { "rightAscension": parseInt(listened['position']['equatorial']['rightAscension']['hours']), "declination": parseInt(listened['position']['equatorial']['declination']['degrees'])
        }}}, "zoom": 3}
        params = {"observer": observer, "view": view};
    };
    renderChart(params);
});
