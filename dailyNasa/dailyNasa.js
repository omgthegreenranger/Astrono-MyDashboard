// GET NASA DAILY PICTURE

class DailyNASA {
  constructor(today, dailyPicContainer) {
    this.today = today;
    this.apiKey = 'VmDmOauwygXH4ZL9fsMIpeQO8wMoHpl3my3RfhEf';
    this.dailyPicContainer = dailyPicContainer;
  }

  get dailyPicApi() {
    return `https://api.nasa.gov/planetary/apod?date=${this.today}&api_key=${this.apiKey}`;
  }

  async fetchPicUrl() {
    const data = await fetch(this.dailyPicApi);
    const response = await data.json();
    console.log(response); //TODO: Remove this
    return response;
  }

  async renderDailyPic() { // call this function to render daily pic
    this.dailyPicContainer.innerHTML = '';
    const picUrl = await this.fetchPicUrl();
    const imgEl = document.createElement('img');
    const author = document.createElement('p');
    imgEl.setAttribute('src', picUrl.hdurl);
    imgEl.classList.add('daily-image'); 
    author.innerText = `Photo by ${picUrl.copyright}`;
    author.classList.add('text-sm');
    author.classList.add('w-full');
    author.classList.add('text-center');
    this.dailyPicContainer.appendChild(imgEl);
    this.dailyPicContainer.appendChild(author);
  }
}

const container = document.getElementById('daily-nasa');
const imgContainer = document.getElementById('img-container');
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
const dateString = `${year.toString()}-${(month + 1).toString().padStart(2, '0')}-${day}`;

const dailyNasa = new DailyNASA(dateString, imgContainer);
dailyNasa.renderDailyPic();

// Search previous dates
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function() {
  const dataInput = document.getElementById('date-input');
  console.log(dataInput.value);
  if (dataInput.value) {
    dailyNasa.today = dataInput.value;
    dailyNasa.renderDailyPic();
  }
})

// GET GEOLOCATION

navigator.geolocation.getCurrentPosition(success);

async function success(pos) {
  const crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  const locationDiv = document.createElement('div');
  locationDiv.classList.add('location-and-weather');
  locationDiv.classList.add('text-center');
  const p1 = document.createElement('p');
  p1.setAttribute('style', 'font-size: 0.7rem');
  p1.innerText = `Current Location: lat: ${crd.latitude}, lon: ${crd.longitude}`;
  locationDiv.appendChild(p1);
  container.prepend(locationDiv);

  // GET WEATHER
  const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=3ee036a4b94af4c4f30dba029d912c48`);
  const response = await data.json();
  console.log(response.list[0]);
  const p2 = document.createElement('p');
  p2.innerText = `Temp: ${response.list[0].main.temp}°C, cloudiness: ${response.list[0].clouds.all}%, visibility: ${response.list[0].visibility}m`;
  locationDiv.appendChild(p2);
}







