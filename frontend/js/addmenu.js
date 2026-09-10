// Waits for the admin check to resolve before loading any data — the old
// version called fetchingData() immediately and only redirected non-admins
// afterward, so admin-only content would flash on screen first.
async function init() {
    let customer = await requireAdmin()
    if (!customer) return
    fetchingData()
}
init()

async function fetchingData() {
    let response = await fetch("http://localhost:3000/foods/admin")
    let data = await response.json()
    renderingData(data)
    document.querySelector(".edit-container").style.display = "none"

}

function renderingData(data) {
    document.querySelector(".food-container").innerHTML = ""
    document.querySelector(".addfood-container").style.display = "none"
    if (data.length == 0) {
        document.querySelector(".food-container").innerHTML = "There is no food items here"
    }
    data.forEach(element => {
        let div = document.createElement("div")
        div.classList = "foodcard"
        div.innerHTML = `<img src="${element.image_links}" alt="image" />
        <h3>${element.food_name}</h3>
        <p>${element.description}</p>
        <p class="price">${element.price}</p>
        <div>
            <button onclick="editFood(${element.id})">Edit</button>
            <button onclick="deleteFood(${element.id})">Delete</button>
        </div>`
        document.querySelector(".food-container").append(div)
    });
    let addfood = document.createElement("button")
    addfood.style.margin = "20px"
    addfood.innerHTML = "Add Food Item"
    let addcategory = document.createElement("button")
    addcategory.style.margin = "20px"
    addcategory.innerHTML = "Add Category"
    addcategory.addEventListener("click", () => {
        let addingcategory = document.querySelector(".addfood-container")
        addingcategory.style.display = "flex"
        addingcategory.innerHTML = `<div style="display: flex; justify-content: space-between;">
        <h1>Add Category</h1>
        <h1 style="color: red" class="red" onclick="back()">X</h1>
      </div>`
        let form = document.createElement("form")
        form.classList = "addfood-form"
        form.innerHTML = `<input type="text" name="category_name" placeholder="Category Name" required>
        <input type="text" name="description" placeholder="Description" required>
    <button type="submit">Add</button>`
        addingcategory.append(form)
        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            let data = {}
            data.category_name = form.category_name.value
            data.description = form.description.value
            let response = await fetch(`http://localhost:3000/foods/cate/${encodeURIComponent(data.category_name)}`)
            let d = await response.json()
            if (d.length > 0) {
                return alerting("The category is already there. Please change the name")
            }
            fetch(`http://localhost:3000/foods/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(response => response.json()).then(data => callingfetchingData()).catch((err) => {
                console.log(err)
            })
            alerting("Added Successfully", "lightgreen")
        })
    })
    addfood.addEventListener("click", () => {
        let addingfood = document.querySelector(".addfood-container")
        addingfood.style.display = "flex"
        addingfood.innerHTML = `<div style="display: flex; justify-content: space-between;">
        <h1>Add food item</h1>
        <h1 style="color: red" class="red" onclick="back()">X</h1>
      </div>`
        let form = document.createElement("form")
        form.classList = "addfood-form"
        form.innerHTML = `<input type="text" name="food_name" placeholder="Food Name" required>
    <input type="text" name="description" placeholder="Description" required>
    <input type="number" name="price" placeholder="Price" required>
    <input type="text" name="image_links" placeholder="Image Links" required>
    `
        let select = document.createElement("select")
        fetch("http://localhost:3000/foods/categories")
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    let option = document.createElement("option")
                    option.value = element.id
                    option.innerHTML = element.category_name
                    select.append(option)
                })
                form.prepend(select)
            })
            .catch((err) => {
                console.log(err)
            })

        let x = `<button type="submit">Add</button>`
        form.innerHTML += x
        addingfood.append(form)

        form.addEventListener("submit", async (e) => {
            e.preventDefault()
            let data = {}
            data.food_name = form.food_name.value
            data.description = form.description.value
            data.price = form.price.value
            data.image_links = form.image_links.value
            data.category_id = select.value
            data.price = parseInt(data.price)
            let response = await fetch(`http://localhost:3000/foods/check/${encodeURIComponent(data.food_name)}`)
            let d = await response.json()
            if (d.length > 0) {
                return alerting("The food is already there change the name")
            }
            else {
                fetch(`http://localhost:3000/foods`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                }).then(response => response.json()).then(data => callingfetchingData()).catch((err) => {
                    console.log(err)
                })
                alerting("Added Successfully", "lightgreen")
            }
        })
    })
    document.querySelector("center").innerHTML = ""
    document.querySelector("center").prepend(addfood, addcategory)
}
function callingfetchingData() {
    document.querySelector(".food-container").innerHTML = ""
    document.querySelector(".addfood-container").style.display = "none"
    fetchingData()
}
editFood = (id) => {
    document.querySelector(".edit-container").style.display = "flex"
    document.querySelector(".edit-container").innerHTML = `<div style="display: flex;">
        <h1>Edit food item</h1>
        <h1 style="color: red" class="x">X</h1>
      </div>`
    fetch(`http://localhost:3000/foods/${id}`)
        .then((response) => response.json())
        .then((data) => renderingEditForm(data[0], id)).catch((err) => {
            console.log(err)
        })
}
renderingEditForm = (data, id) => {
    document.querySelector(".x").addEventListener("click", () => {
        document.querySelector(".edit-container").style.display = "none"
    });
    let form = document.createElement("form")
    form.classList = "edit-form"
    form.innerHTML = `<input type="text" name="food_name" value="${data.food_name}" placeholder="Food Name" required>
    <input type="text" name="description" value="${data.description}" placeholder="Description" required>
    <input type="number" name="price" value="${data.price}" placeholder="Price" required>
    <input type="text" name="image_links" value="${data.image_links}" placeholder="Image Links" required>
    <button type="submit">Update</button>`
    document.querySelector(".edit-container").append(form)
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        let data = {}
        data.food_name = form.food_name.value
        data.description = form.description.value
        data.price = form.price.value
        data.image_links = form.image_links.value
        data.price = parseInt(data.price)
        data.id = id
        let response = await fetch(`http://localhost:3000/foods/check/${encodeURIComponent(data.food_name)}`)
        let d = await response.json()
        if (d.length > 0) {
            return alerting("The food is already there change the name")
        }
        fetch(`http://localhost:3000/foods/${data.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => callingfetchingData())
            .catch((err) => {
                console.log(err)
            })
        alerting("Updated Successfully", "lightgreen")
    })
}

deleteFood = (id) => {
    let con = confirm("Are you sure to delete this food item")
    if (con) {
        fetch(`http://localhost:3000/foods/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => fetchingData()).catch((err) => {
            console.log(err)
        })
        alerting("Deleted Successfully")
    }
}


function back() {
    document.querySelector(".addfood-container").style.display = "none"
}