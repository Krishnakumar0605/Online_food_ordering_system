async function fetchingData() {
    let response = await fetch("http://localhost:3000/search/highest")
    let data = await response.json()
    renderingData(data)
}

fetchingData()

function renderingData(data) {
    data[0].forEach(element => {
        document.querySelector(".highest-container").innerHTML += `<div class="highest-card">
        <img src="${element.image_links}" alt="">
        <p>${element.food_name}</p>
        <p>${element.description}</p>

        <p>Sales Quantity : ${element.qnt}</p>
        <p>price : ${element.price}</p>
        <div>
          Total : ${element.price * element.qnt}
        </div>
        </div>`
    });
}