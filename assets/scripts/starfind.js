let Aapi = "https://api.astronomyapi.com/api"
let applicationId = '7760cf6f-6954-443c-b95f-f3fd429adb70';
let applicationSecret = '3fc34ba79f9fea2ffa6b109bad7f1f94bccbac31d7d885cb2509c0a59c70e0d7ffb0c3f439e37bbedb50b50796c6917fb4205491b187685ef56ee920bd97e07cb7c8d8db32682f1a4961ff0057e95f951dc421ae4e1766078f89d9ca8199e38dd0a926da22df2f8ef7e61f3f72dd7a14';

let coordsLat = "-79.3832";
let coordsLon = "43.6532";


let starChart = "/v2/studio/star-chart";
let planetChart = "/v2/bodies";
let moonChart = "/v2/studio/moon-phase";
let searchAApi = "/v2/search"
let searchBox = document.querySelector('#search');

const hash = btoa(`${applicationId}:${applicationSecret}`);
searchDrop();
function searchDrop() {
    searchBox.innerHTML = `<select name="selection" id="select-box" placeholder="Please Choose Search Parameter">
    <option value="" disabled selected>Select your choice</option>
    <option value="${starChart}">Stars</option>
    <option value="${planetChart}">Planets</option>
    <option value="${moonChart}">Moon</option>
    <option value="${searchAApi}">Search</option>
    </select>`;
}
let searchSelect = "";
searchBox.addEventListener('change', function (event){
    searchSelect = event.target.value;
    console.log(searchSelect);
    fetchAPI();
})


function fetchAPI() {
    fetch("https://api.astronomyapi.com/api" + searchSelect, {
        headers: {
            'Authorization': 'Basic ' + hash,
            'Origin': 'https://omgthegreenranger.github.io/Astrono-MyDashboard',
        }})   
    .then((response) => response.json())
    .then((data) => console.log(data))
    }
    

// fetchAPI();