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
    return response;
  }

  async renderDailyPic() { // call this function to render daily pic
    this.dailyPicContainer.innerHTML = '';
    const picUrl = await this.fetchPicUrl();
    const imgEl = document.createElement('img');
    const author = document.createElement('p');
    imgEl.setAttribute('src', picUrl.url);
    imgEl.classList.add('daily-image'); 
    author.innerText = `Photo by ${picUrl.copyright}`;
    author.classList.add('text-sm');
    author.classList.add('w-full');
    author.classList.add('text-center');
    this.dailyPicContainer.appendChild(imgEl);
    this.dailyPicContainer.appendChild(author);
    return picUrl;
  }
}

const container = document.getElementById('daily-nasa');
const subContainer = document.createElement('div');
subContainer.setAttribute('id', 'sub-container');
container.prepend(subContainer);
const imgContainer = document.getElementById('img-container');
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
const dateString = `${year.toString()}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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
  
  subContainer.innerHTML = '';
  const locationDiv = document.createElement('div');
  locationDiv.classList.add('location-and-weather');
  locationDiv.classList.add('text-center');
  const p1 = document.createElement('p');
  p1.setAttribute('style', 'font-size: 1rem');
  p1.innerHTML = `<i class="fa-solid fa-map-location"></i> lat: ${Math.round(crd.latitude * 100) / 100}, lon: ${Math.round(crd.longitude * 100) / 100}`;
  locationDiv.appendChild(p1);
  subContainer.prepend(locationDiv);

  // GET WEATHER
  const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=3ee036a4b94af4c4f30dba029d912c48`);
  const response = await data.json();
  console.log(response.list[0]);
  const p2 = document.createElement('p');
  p2.innerHTML = `<i class="fa-solid fa-temperature-quarter"></i> ${response.list[0].main.temp}??C    <i class="fa-solid fa-cloud-sun"></i> ${response.list[0].clouds.all}%    <i class="fa-solid fa-eye"></i> ${response.list[0].visibility}m`;
  locationDiv.appendChild(p2);
}



// jquery create custom modal

const customModal = $('<div>');
customModal.attr({
  "class": "custom-modal"
})

$('#high-resolution').on('click', function() {
  dailyNasa.fetchPicUrl().then(
    function(response) {
      customModal.html('');
      customModal.show();
      const hdurl = response.hdurl;
      const img = $('<img>');
      img.attr('src', hdurl);
      customModal.append(img);
    
      const p = $('<a>');
      p.text(response.hdurl);
      p.attr({"href": response.hdurl, "target": "_blank"});
      customModal.append(p);

      const closeBtn = $('<button>');
      closeBtn.text('close');
      closeBtn.on('click', function() {
        customModal.hide();
      })
      customModal.append(closeBtn);
      $('body').append(customModal);
    }
  )
})

$('#location-btn').on(
  'click', function() {
    navigator.geolocation.getCurrentPosition(success);
  }
)


const dateModal = $('<div>');
$('body').append(dateModal);
dateModal.hide();

$('#date-btn').on('click', function() {

  dateModal.html('');
  dateModal.attr('class', 'date-modal');
  const h3 = $('<h3>');
  h3.text('Welcome to the Solar System');
  dateModal.append(h3);

  const p = $('<p>');
  dateModal.append(p);

  showTime();
  setInterval(showTime, 1000);
  function showTime() {
    const hour = new Date().getHours();
    const hour12 = hour % 12;
    const amOrPm = hour12 < 12 ? 'pm' : 'am';
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();
    p.text(`Today's date: ${year.toString()}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} --- ${hour12}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')} ${amOrPm}`);
  }

  const button = $('<button>');
  button.text('close');
  button.on('click', function() {
    dateModal.hide();
  })

  dateModal.append(button);
  dateModal.show();
})