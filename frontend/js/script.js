function alerting(text, bgcolor = "rgb(255, 196, 196)") {
    let alert = document.querySelector(".alerting")
    alert.innerHTML = text
    alert.style.backgroundColor = bgcolor
    alert.style.display = "block"
    setTimeout(() => {
        alert.style.display = "none"
    }, 2000)
}

function clearingInputTags(){
    document.querySelectorAll("input").forEach(element=>{
        element.value=""
    })
};

document.querySelector(".home").addEventListener("click",()=>{
    window.location="index.html"
})
