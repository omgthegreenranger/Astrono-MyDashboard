const eventsUrlAPI ='https://ll.thespacedevs.com/2.2.0/event/?offset=590'

function response_hendler(response){
    let item_container = document.getElementById('item-container')
    let item_div;
    let div_date;
    let h2;
    let h3;
    let p;
    let date;
    let location;

    for(let item of response.results){      
       item_div = document.createElement('div')
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
       date = document.createElement('h3')
       date.innerText = String(item.date).slice(0, 10)
       item_div.append(div_date)
       div_date.append(date)
       location = document.createElement('h3')
       location.innerText = item.location
       div_date.append(location)
    }
}

fetch(eventsUrlAPI)
.then(response => response.json())
.then(response_hendler)