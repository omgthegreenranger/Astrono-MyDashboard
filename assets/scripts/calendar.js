const results = JSON.parse(localStorage.getItem('results'))

let main = document.getElementById('main')
let html;



for(item of results){
    html = `<div class="card-wraper">
                <div class="card">
                    <img src="${item.feature_image}" alt="${item.name}"></img>
                     <div class="container">
                         <h4><b>${item.name}</b></h4>
                         <p>${item.description}</p>
                        <div class="button-card"><a href="${item.url}"><h2>Detail</h2></a></div>
                    </div>
                    <h3 >${String(item.date).slice(0, 10)}</h3>
                    <h3>${item.location}</h3>
               </div>
            </div>`   
    main.insertAdjacentHTML("afterbegin", html)
}
