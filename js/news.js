const eventsUrlAPI ='https://ll.thespacedevs.com/2.2.0/event/?offset=590'

const local_results = JSON.parse(localStorage.getItem('results'))

let img = document.getElementById('button-img')

img.src = 'img/free-icon-refresh-page-option-25429.png'

function setLocalResults(data){
    let results = data.results
    localStorage.setItem('results', JSON.stringify(results))
    return results
}

function modalHendler(){
    let item = this.item
    let img = document.getElementById("modal-img")
    console.log(item.id);
    modal.style.display = "block";
    document.getElementById("modal-title").innerText = item.name;
    img.src = item.feature_image
    img.alt = item.name
    document.getElementById("modal-description").innerText = item.description;
    document.getElementById("modal-date").innerText = String(item.date).slice(0, 10);
    document.getElementById("modal-location").innerText = item.location;
   }
function hendler(results){
    let item_container = document.getElementById('item-container')
    let item_div;
    let div_date;
    let h2;
    let p;
    let date;
    let location;

    for(let item of results){      
       item_div = document.createElement('div')
       item_div.item = item
       item_div.onclick = modalHendler
       item_div.className = 'item'

       item_container.append(item_div)
       h2 = document.createElement('h2')
       h2.innerText = item.name
       item_div.append(h2)

       p = document.createElement('p')
       p.innerText = item.description
       item_div.append(p)

       div_date = document.createElement('div')
       div_date.className = 'div-date'
       item_div.append(div_date)

    
       date = document.createElement('h3')
       date.innerText = String(item.date).slice(0, 10)
       div_date.append(date)

       location = document.createElement('h3')
       location.innerText = item.location
       div_date.append(location)
    }
   
}


function dispatch(local_results){
    if(local_results){
        hendler(local_results)
    }else{
        fetch(eventsUrlAPI)
        .then(response => response.json())
        .then(setLocalResults)
        .then(hendler)
    }
}

dispatch(local_results)

var modal = document.getElementById("myModal");


var span = document.getElementsByClassName("close")[0];


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";

  }
}

document.getElementById('button-news').onclick = () => {
    img.src = 'img/updated.png'
    setTimeout(() => {img.src='img/free-icon-refresh-page-option-25429.png'}, 60000)
    localStorage.removeItem('results');
    dispatch(false)
}



