const eventsUrlAPI ='https://ll.thespacedevs.com/2.2.0/event/?offset=590'

const local_results = JSON.parse(localStorage.getItem('result'))

function setLocalResults(data){
    let results = data.results
    localStorage.setItem('results', JSON.stringify(results))
    return results
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

if(local_results){
    hendler(local_results)
}else{
    fetch(eventsUrlAPI)
    .then(response => response.json())
    .then(setLocalResults)
    .then(hendler)
}