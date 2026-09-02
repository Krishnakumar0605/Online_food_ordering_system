let user;
gettinguser = () => {
    user = JSON.parse(localStorage.getItem("user_id"));
}
gettinguser()
async function fetchingData() {
    gettinguser()
    let response = await fetch(`http://localhost:3000/orders?id=${user}`)
    let data = await response.json()
    renderingData(data)
}
fetchingData()
function renderingData(data) {
    if (data.length == 0) {
        document.querySelector(".orderhistory-container").innerHTML = "There is no Orders yet"
        return
    }
    document.querySelector(".orderhistory-container").innerHTML = ""
    data.forEach(element => {
        let div = document.createElement("div")
        div.classList = "history-card"
        div.innerHTML = `<div class="card" style="display: flex;">
        <img src="${element.image_links}" alt="">
        <p>${element.food_name}</p>
        <p>quantity : ${element.quantity}</p>
        <p>price : ${element.price}</p>
        <div>
          Total : ${element.total_amount}
        </div>
        </div>
        <span class="span">${element.order_status}</span>
        `
        if (element.order_status == "cancelled" || element.order_status == "success") {
            div.innerHTML += `<button onclick="cancelling(${element.order_id})" style="background-color: lightred;" class="can" disabled="true">Cancel</button>
      </div>`
        }
        else {
            div.innerHTML += `<button onclick="cancelling(${element.order_id})" class="can">Cancel</button>
      </div>`
        }
        document.querySelector(".orderhistory-container").prepend(div)
    });
}

function cancelling(id) {
    let con = confirm("Are you sure to cancel order")
    if (con) {
        fetch(`http://localhost:3000/orders?id=${id}&status=cancelled`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => fetchingData()).catch((err) => {
            console.log(err)
        })
        alerting("Cancelled Successfully")
    }
}