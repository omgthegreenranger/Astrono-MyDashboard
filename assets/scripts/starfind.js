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

startScript();

function startScript() {
    fetchJSON();
    navigator.geolocation.getCurrentPosition(success);
}


function success(pos) {
    const crd = pos.coords;
    coordsLat = crd.latitude;
    coordsLon = crd.longitude;
}
let starsList = '';
let galaxyList = '';
let starsSelector = '';
let galaxySelector = '';

function fetchJSON() {
    fetch("./starlist.json")
    .then((response) => response.json())
    .then((data) => {
        starsList = data['star'];
        galaxyList = data['galaxy'];
        starsSelector = `<option value="" disabled selected>Select a Star</option>`;
        for (i = 0; i < data['star'].length; i++) {
            starsSelector += `<option value="${data.star[i]}">${data.star[i]}</option>`;
        }
        
        galaxySelector = `<option value="" disabled selected>Select a Galaxy</option>`;
        for (i = 0; i < data['galaxy'].length; i++) {
            galaxySelector += `<option value="${data.galaxy[i]}">${data.galaxy[i]}</option>`;
        
    };
    renderChoices();
    })
}

function renderChoices() {
    setBox.innerHTML = 
    `<input type="text" class="searchTerm ring-2" id="otherText" placeholder="Enter Search Term" style="display: none">
    <select class="searchTerm ring-2" id="starSearch" style="display: none">
            ${starsSelector}
    </select>
    <select class="searchTerm ring-2" id="galaxySearch" style="display: none">
        ${galaxySelector}
    </select></br>
    <button type="button" class="inline-block bg-slate-600 w-20 mx-4 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-2" id="searchBtn" style="display: none">Search</button>
    `
}
let searchClass = "";
// detect which radio button has been selected, create drop-down list or search box for each.
typeBox.addEventListener('click', function (event){
    let choiceTarget = "";
    choiceTarget = event.target.parentElement.parentElement.id;
    moreBox.innerHTML = "";
    presentBox.innerHTML = "";
    typeSelect = searchAApi;
    if(choiceTarget == "other") {
        document.querySelector('#searchBtn').setAttribute("style", "display: inline-block");
        document.querySelector('#otherText').setAttribute("style", "display: inline-block");
        document.querySelector('#otherText').setAttribute("class", "selected");
        document.querySelector('#starSearch').setAttribute("style", "display: none");
        document.querySelector('#starSearch').removeAttribute("class", "selected");
        document.querySelector('#galaxySearch').setAttribute("style", "display: none");
        document.querySelector('#galaxySearch').removeAttribute("class", "selected")
            searchType = "Other";
            searchClass = "otherText";
            
    } else if (choiceTarget == "Star") {
        
        document.querySelector('#searchBtn').setAttribute("style", "display: inline-block");
        document.querySelector('#otherText').setAttribute("style", "display: none");
        document.querySelector('#otherText').removeAttribute("class", "selected");
        document.querySelector('#starSearch').setAttribute("style", "display: inline-block");
        document.querySelector('#starSearch').setAttribute("class", "selected");
        document.querySelector('#galaxySearch').setAttribute("style", "display: none");
        document.querySelector('#galaxySearch').removeAttribute("class", "selected")

        searchType = "Star";
        searchClass = "starSearch";
    } else if (choiceTarget == "Galaxy") {
        document.querySelector('#searchBtn').setAttribute("style", "display: inline-block");
        document.querySelector('#otherText').setAttribute("style", "display: none");
        document.querySelector('#otherText').removeAttribute("class", "selected");
        document.querySelector('#starSearch').setAttribute("style", "display: none");
        document.querySelector('#starSearch').removeAttribute("class", "selected");
        document.querySelector('#galaxySearch').setAttribute("style", "display: inline-block");
        document.querySelector('#galaxySearch').setAttribute("class", "selected");
        searchType = "Galaxy";
        searchClass = "galaxySearch";
    };
    choiceBox = document.querySelector('#searchBtn');
    choiceBox.addEventListener('click', function(event){
        presentBox.innerHTML = "";
        if(searchClass == "galaxySearch") {
        searchTerm = setBox.getElementsByClassName('selected').galaxySearch.value;
        } else if (searchClass == "starSearch"){
            searchTerm = setBox.getElementsByClassName('selected').starSearch.value;
        } else if( searchClass == "otherText") {
            searchTerm = setBox.getElementsByClassName('selected').otherText.value;
        }
        console.log(event.target.previousElementSibling.value);
        params = "?term=" + searchTerm + "&match_type=fuzzy";

        fetchAPI(typeSelect,params);
})
  
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
        presentBox.innerHTML = `<figure><img id="night-sky" class="object-scale-down" src="${imageSrc}"></figure>`
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
        if (dataTable == null) {        
            presentBox.innerHTML = "Nothing found, Dave.";
        } else {
            for(i=0; i < dataTable.length; i++) {
                if(searchType == "other") {
                    presentBox.innerHTML +=
                    `<div id="${i}"><span>${dataTable[i]['name']}</span><span>${dataTable[i]['type']['name']}</span><span>${dataTable[i]['position']['constellation']['name']}</span></div>`
                } else if(dataTable.length == 1) {
                    listened = dataTable[0];
                    selectBody(listened);
                }
        }
        };   
    });
};

function selectBody(listened) {
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
}


presentBox.addEventListener('click', function(event) {
    console.log(event.target.parentElement.id);
    listened = dataTable[event.target.parentElement.id];
    selectBody(listened);
});