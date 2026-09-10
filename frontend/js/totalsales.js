async function init() {
    let customer = await requireAdmin()
    if (!customer) return
    fetchingData()
}
init()

async function fetchingData() {
    let response = await fetch(`http://localhost:3000/orders/all`)
    let data = await response.json()
    renderingData(data)
}
function renderingData(data) {
    let amount = 0
    let orders = 0
    let pending = 0
    let success = 0
    let cancelled = 0
    let pendingamount = 0
    let successamount = 0
    let cancelledamount = 0
    data.forEach(element => {
        amount += Number(element.total_amount)
        orders += 1
        if (element.order_status == "pending") {
            pending += 1
            pendingamount += Number(element.total_amount)
        }
        else if (element.order_status == "success") {
            success += 1
            successamount += Number(element.total_amount)
        }
        else {
            cancelled += 1
            cancelledamount += Number(element.total_amount)
        }
        let div = document.createElement("div")
        div.classList = "Total-card"
        div.innerHTML = `<div class="card" style="display: flex;">
        <img src="${element.image_links}" alt="">
        <p>${element.food_name}</p>
        <p>quantity : ${element.quantity}</p>
        <p>price : ${element.price}</p>
        <span class="span">${element.order_status}</span> 
        </div>
        <div>
          Total : ${element.total_amount}
        </div>
        `
        document.querySelector(".totalsales-container").prepend(div)
    });
    document.querySelector(".amount").innerHTML = `Total Amount : ${amount}`
    document.querySelector(".pending").innerHTML = `Pending Orders : ${pending}`
    document.querySelector(".success").innerHTML = `Success Orders : ${success}`
    document.querySelector(".order").innerHTML = `Total Orders : ${orders}`
    document.querySelector(".pendingamount").innerHTML = `Pending Amount : ${pendingamount}`
    document.querySelector(".successamount").innerHTML = `Success Amount : ${successamount}`
    document.querySelector(".cancel").innerHTML = `Cancelled Orders : ${cancelled}`
    document.querySelector(".cancelamount").innerHTML = `Cancelled Amount : ${cancelledamount}`
}