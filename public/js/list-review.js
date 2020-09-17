const pageContent = document.querySelector("#page-content");
const collapse = document.querySelector("#collapseExample");
const hideContent = document.querySelector(".page-content");
const share = document.querySelector("#social-share");
const cursor = document.querySelector("#move-up");
const h1 = document.querySelector("h1");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((e) => {
    if (e.target === h1) {
      cursor.classList.toggle("disappear");
      share.classList.toggle("slide-up");
    }
  });
}, {});

observer.observe(h1);

pageContent.addEventListener("click", () => {
  if (collapse.classList.length === 2) {
    hideContent.classList.add("page-content-hide");
  } else {
    hideContent.classList.remove("page-content-hide");
  }
  console.log(collapse.classList.length, collapse.classList);
});
