const pageContent = document.querySelector("#page-content")
const collapse = document.querySelector("#collapseExample")
const hideContent = document.querySelector(".page-content")


pageContent.addEventListener("mouseup", ()=>{
    if(collapse.classList.length === 1){
        hideContent.classList.add("page-content-hide")
    }else{
        hideContent.classList.remove("page-content-hide")
    }
    console.log(collapse.classList.length)
})