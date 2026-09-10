async function fetchingTheFoods() {
    let response = await fetch("http://localhost:3000/foods")
    let data = await response.json()
    renderingTheFoods(data)
}
fetchingTheFoods()
let foodcontainer = document.querySelector(".food-container")
function renderingTheFoods(data) {
    if (data.length > 0) {
        foodcontainer.innerHTML = ""
        data.forEach(element => {
            let card = document.createElement("div")
            card.classList = "foodcard"
            card.innerHTML = `<img src="${element.image_links}" alt="image" />
        <h3>${element.food_name}</h3>
        <p>${element.description}</p>
        <p class="price">${element.price}</p>
        <div>
            <button onclick="buyInstantly(${element.id},event,${Number(element.price)},'${element.image_links}')">Buy instantly</button>
        </div>`
            foodcontainer.append(card)
        });
    }
}

let user = getUser()
if (user && document.querySelector(".login")) {
    document.querySelector(".login").innerHTML = "Logout"
    document.querySelector(".login").classList = "logout"
}

async function initAdminButtons() {
    if (!user) return
    let customer = await fetchCurrentUser()
    if (customer && customer.role === "admin") {
        let button = document.createElement("button")
        button.innerHTML = "Manage Menu"
        button.addEventListener("click", () => {
            window.location = "addmenu.html"
        })
        let button1 = document.createElement("button")
        button1.innerHTML = "Manage Orders"
        button1.addEventListener("click", () => {
            window.location = "manageorders.html"
        })
        let button2 = document.createElement("button")
        button2.innerHTML = "Total Sales"
        button2.addEventListener("click", () => {
            window.location = "totalsales.html"
        })
        let button3 = document.createElement("button")
        button3.innerHTML = "Highest Selling Items"
        button3.addEventListener("click", () => {
            window.location = "highestselling.html"
        })
        button.classList = "adminbtn"
        button1.classList = "adminbtn"
        button2.classList = "adminbtn"
        button3.classList = "adminbtn"
        document.querySelector(".center").append(button, button1, button2, button3)
    }
}
initAdminButtons()

function buyInstantly(eid, e, price, img) {
    if (!user) {
        alerting("Login first")
        setTimeout(() => {
            window.location = "login.html"
        }, 2000)
        return
    }
    document.querySelector(".buy-container").style.display = "flex"
    document.querySelector(".buy-container").innerHTML = `<div style="display: flex;">
        <h1>Buy instantly</h1>
        <h1 style="color: red" class="x">X</h1>
      </div>`
    let card = e.target.parentElement.parentElement.innerHTML
    card = (card.split("<div>"))[0]
    let div = document.createElement("div")
    div.classList = "foodcard"
    div.innerHTML = card
    let buttons = document.createElement("div")
    buttons.innerHTML = `<button onclick="quant(-1)">-</button><p class="quantity">1</p><button onclick="quant(1)">+</button>`
    buttons.classList = "buttons"
    let btn = document.createElement("button")
    btn.innerHTML = `Buy instantly`
    div.append(buttons, btn)
    btn.addEventListener("click", () => {
        let quantity = document.querySelector(".quantity").innerHTML
        buy(Number(quantity), eid, price, img)
    })
    document.querySelector(".buy-container").append(div)
    document.querySelector(".x").addEventListener("click", () => {
        document.querySelector(".buy-container").style.display = "none"
    })
}

function searching(value) {
    fetch(`http://localhost:3000/search/searching?search=${encodeURIComponent(value)}`)
        .then(response => response.json())
        .then(data => checkingsearch(data))
        .catch((err) => {
            console.log(err)
        })
}

function checkingsearch(data) {
    if (data.length > 0) {
        renderingTheFoods(data)
    }
    else {
        foodcontainer.innerHTML = "No results found"
    }
}

function buy(quantity, id, price, img) {
    let obj = { quantity, id, user, price, img }
    fetch("http://localhost:3000/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    }).then(response => response.json()).then(data => checking(data)).catch((err) => {
        console.log(err)
    })
}
function quant(num) {
    if (document.querySelector(".quantity").innerHTML == 1 && num == -1) {
        return alerting("cannot place order under 1 quantity")
    }
    else {
        document.querySelector(".quantity").innerHTML = Number(document.querySelector(".quantity").innerHTML) + Number(num)
    }
}
function checking(data) {
    if (data) {
        alerting("Placed order Successfully", "lightgreen")
        setTimeout(() => {
            window.location = "orders.html"
        }, 2000)
    }
}

let logout = document.querySelector(".logout") || 0
if (logout) {
    logout.addEventListener("click", () => {
        if (confirm("Are you sure to Logout")) {
            logout.innerHTML = "Login"
            logout.classList = "login"
            localStorage.removeItem("user_id")
            window.location = "index.html"
        }
    })
}
let login = document.querySelector(".login") || 0
if (login) {
    login.addEventListener("click", () => {
        window.location = "login.html"
    })
}