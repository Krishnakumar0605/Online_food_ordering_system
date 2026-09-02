let password;
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.querySelector(".email").value
    password = document.querySelector(".password").value

    fetch(`http://localhost:3000/users?email=${email}&password=${password}`).then(response => response.json()).then(data => checkuser(data)).catch((err) => {
            console.log(err)
        })
})

function checkuser(data){
    if(data.error){
        return alerting("The email or password is incorrect")
    }
    else{
        localStorage.setItem("user_id",data)
        clearingInputTags()
        // alerting("Logined Successfully","lightgreen")
        window.location="index.html"
    }
}