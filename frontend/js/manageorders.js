async function init() {
    let customer = await requireAdmin()
    if (!customer) return
    fetchingdatas()
}
init()

async function fetchingdatas() {
    let response = await fetch(`https://jk-foods.onrender.com/orders/admin`)
    let data = await response.json()
    renderingData(data)
}
renderingData = (data) => {
    document.querySelector(".manageorder-container").innerHTML = ""
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
            // "lightred" isn't a valid CSS color name (silently ignored by
            // the browser) — using a real color here.
            div.innerHTML += `<button onclick="cancelling(${element.order_id})" style="background-color: lightcoral;" class="can" disabled="true">Cancel</button>
      </div>
      <button onclick="success(${element.order_id})" class="can" disabled="true">Success</button>`
        }
        else {
            div.innerHTML += `<button onclick="cancelling(${element.order_id})" class="can">Cancel</button>
      </div>
        <button onclick="success(${element.order_id})" class="can">Success</button>`
        }
        document.querySelector(".manageorder-container").prepend(div)
    });

}

function cancelling(id) {
    let con = confirm("Are you sure to cancel order")
    if (con) {
        fetch(`https://jk-foods.onrender.com/orders?id=${id}&status=cancelled`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => fetchingdatas()).catch((err) => {
            console.log(err)
        })
        alerting("Cancelled Successfully")
    }
}

function success(id) {
    let con = confirm("Are you sure to mark order as success And also ensure that the order is delivered to the customer")
    if (con) {
        fetch(`https://jk-foods.onrender.com/orders?id=${id}&status=success`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => fetchingdatas()).catch((err) => {
            console.log(err)
        })
        alerting("Marked as Success Successfully", "lightgreen")
    }
}