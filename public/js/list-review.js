const pageContent = document.querySelector("#page-content");
const collapse = document.querySelector("#collapseExample");
const hideContent = document.querySelector(".page-content");
// const icons = document.querySelector()

const observer = new IntersectionObserver((entries, observer) => {}, {});

pageContent.addEventListener("click", () => {
  if (collapse.classList.length === 2) {
    hideContent.classList.add("page-content-hide");
  } else {
    hideContent.classList.remove("page-content-hide");
  }
  console.log(collapse.classList.length, collapse.classList);
});
