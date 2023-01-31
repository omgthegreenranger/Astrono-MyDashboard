const eventsUrlAPI ='https://ll.thespacedevs.com/2.2.0/event/'

fetch(eventsUrlAPI)
.then(response => response.json())
.then(response => {
    let item_container = document.getElementById('item-container')
    let h2;
    let p;

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

    }
})