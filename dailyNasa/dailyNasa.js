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



