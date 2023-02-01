let Aapi = "https://api.astronomyapi.com/api"
let applicationId = '7760cf6f-6954-443c-b95f-f3fd429adb70';
let applicationSecret = '3fc34ba79f9fea2ffa6b109bad7f1f94bccbac31d7d885cb2509c0a59c70e0d7ffb0c3f439e37bbedb50b50796c6917fb4205491b187685ef56ee920bd97e07cb7c8d8db32682f1a4961ff0057e95f951dc421ae4e1766078f89d9ca8199e38dd0a926da22df2f8ef7e61f3f72dd7a14';

let coordsLat = -79.3832;
let coordsLon = 43.6532;

let params = "";
let dataTable = "";
let starList = ["Sun",
    "Sirius",
    "Canopus",
    "Rigil Kentaurus & Toliman",
    "Arcturus",
    "Vega",
    "Capella",
    "Rigel",
    "Procyon",
    "Achernar",
    "Betelgeuse",
    "Hadar",
    "Altair",
    "Acrux",
    "Aldebaran",
    "Antares",
    "Spica",
    "Pollux",
    "Fomalhaut",
    "Deneb",
    "Mimosa",
    "Regulus",
    "Adhara",
    "Shaula",
    "Castor",
    "Gacrux",
    "Bellatrix"];
let starChart = "/v2/studio/star-chart";
let planetChart = "/v2/bodies";
let moonChart = "/v2/studio/moon-phase";
let searchAApi = "/v2/search"
let typeBox = document.querySelector('#search');
let moreBox = document.querySelector('#search-more');
let presentBox = document.querySelector('#present-box');

const hash = btoa(`${applicationId}:${applicationSecret}`);
searchDrop();

function searchDrop() {
    typeBox.innerHTML = `<select name="selection" id="select-box" placeholder="Please Choose Search Parameter">
    <option value="" disabled selected>Select your choice</option>
    <option value="stars">Stars</option>
    <option value="planets">Planets</option>
    <option value="moon">Moon</option>
    <option value="search">Search</option>
    </select>`;
}
let typeSelect = "";

typeBox.addEventListener('change', function (event){
    typeSelect = event.target.value;
    if(event.target.value == "search") {
        typeSelect = searchAApi;
        moreBox.innerHTML = `<input type="text" id="searchTerm" placeholder="Enter Search Term">
        <button type="button" id="searchBtn">Search</button>`;

        let choiceBox = document.querySelector('#searchBtn');

        choiceBox.addEventListener('click', function(event){
            console.log(event.target.previousElementSibling.value);
            searchTerm = event.target.previousElementSibling.value;
            params = "?term=" + searchTerm + "&match_type=fuzzy";

            fetchAPI(typeSelect,params);
        });
        


    } else if (event.target.value == "planets") {
        typeSelect = planetChart;


        params = "";
    } else if (event.target.value == "moon") {
        typeSelect = moonChart;


        params = "";
    } else if (event.target.value == "stars") {
        typeSelect = starChart;
    };


    console.log(typeSelect);
})

let imageRes = '';

function renderChart(params) {
    console.log(Aapi + starChart);
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
        console.log(dataTable);
        for(i=0; i < dataTable.length; i++) {
        presentBox.innerHTML += `
        <div id="${i}"><span>${dataTable[i]['name']}</span><span>${dataTable[i]['type']['name']}</span><span>${dataTable[i]['position']['constellation']['name']}</span></div>
        `
        }    
    })
    }
 let listened = '';   
presentBox.addEventListener('click', function(event) {
    console.log(event.target.parentElement.id);
    listened = dataTable[event.target.parentElement.id];
    let observer = {"latitude": coordsLat, "longitude": coordsLon, "date": "2019-12-20"};
    let view = {"type": "constellation", "parameters": {"constellation": listened['position']['constellation']['id']}};
    params = {"style": "default", "observer": observer, "view": view};
    renderChart(params);
})
