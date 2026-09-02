document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let name = document.querySelector(".name").value
    let email = document.querySelector(".email").value
    let password = document.querySelector(".password").value
    let phno = document.querySelector(".phno").value
    if(isNaN(phno)){
        return alerting("The phone number must contain only digits")
    }
    if (password.length < 8) {
        return alerting("The password length must be greater than or equals to 8")
    }
    if(phno.length<10){
        return alerting("The phone number must contain 10 digits")
    }
    if(phno.length>=20){
        return alerting("The phone number must contain lees than 20 digits")
    }
    let obj={name,email,phno,password}
    fetch("http://localhost:3000/users/reg",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
    }).then(response=>response.json()).then(data=>registered(data)).catch(err=>console.log(err))
})

function registered(data){
    if(data.affectedRows==1){
        // alerting("Registered Successfully","lightgreen")
        clearingInputTags()
        window.location="login.html"
    }
}