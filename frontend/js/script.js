function alerting(text, bgcolor = "rgb(255, 196, 196)") {
    let alert = document.querySelector(".alerting")
    alert.innerHTML = text
    alert.style.backgroundColor = bgcolor
    alert.style.display = "block"
    setTimeout(() => {
        alert.style.display = "none"
    }, 2000)
}

function clearingInputTags() {
    document.querySelectorAll("input").forEach(element => {
        element.value = ""
    })
};

let homeLink = document.querySelector(".home")
if (homeLink) {
    homeLink.addEventListener("click", () => {
        window.location = "index.html"
    })
}

// ---- Shared auth helpers ----
// Every admin page (addmenu, manageorders, totalsales, highestselling) was
// re-implementing its own "am I logged in / am I admin" check. Centralized
// here so there's one place to fix if the logic ever needs to change.

function getUser() {
    return JSON.parse(localStorage.getItem("user_id"))
}

async function fetchCurrentUser() {
    let user = getUser()
    if (!user) return null
    try {
        let response = await fetch(`https://jk-foods.onrender.com/users/${user}`)
        let data = await response.json()
        return data[0] || null
    } catch (err) {
        console.log(err)
        return null
    }
}

// Redirects to login if nobody's logged in. Returns the user id (or null,
// in which case the caller should stop — a redirect is already in flight).
function requireLogin(redirectTo = "login.html") {
    let user = getUser()
    if (!user) {
        window.location = redirectTo
        return null
    }
    return user
}

// Redirects to index.html unless the logged-in user is an admin. Returns
// the customer record on success, or null (redirect already in flight).
// NOTE: this is a frontend convenience only — the actual /orders/admin,
// /orders/all, and /foods/admin endpoints have no server-side auth check,
// so this does not stop someone from calling those APIs directly. Treat
// it as a UX guard, not a security boundary, until the backend enforces it.
async function requireAdmin(redirectTo = "index.html") {
    if (!requireLogin(redirectTo)) return null
    let customer = await fetchCurrentUser()
    if (!customer || customer.role !== "admin") {
        window.location = redirectTo
        return null
    }
    return customer
}