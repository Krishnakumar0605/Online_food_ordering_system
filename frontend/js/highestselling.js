async function init() {
    let customer = await requireAdmin()
    if (!customer) return
    fetchingData()
}
init()

async function fetchingData() {
    let response = await fetch("https://jk-foods.onrender.com/search/highest")
    let data = await response.json()
    renderingData(data)
}

function renderingData(data) {
    document.querySelector(".highest-container").innerHTML = ""
    data.forEach(element => {
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