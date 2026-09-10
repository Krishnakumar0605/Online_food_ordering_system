document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.querySelector(".email").value
    let password = document.querySelector(".password").value

    fetch(`https://jk-foods.onrender.com/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
        .then(response => response.json())
        .then(data => checkuser(data))
        .catch((err) => {
            console.log(err)
        })
})

function checkuser(data) {
    if (data.error) {
        return alerting("The email or password is incorrect")
    }
    else {
        // Backend now returns { id, role } instead of a bare number.
        localStorage.setItem("user_id", JSON.stringify(data.id))
        clearingInputTags()
        window.location = "index.html"
    }
}