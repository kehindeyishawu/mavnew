const pageContent = document.querySelector("#page-content");
const collapse = document.querySelector("#collapseExample");
const hideContent = document.querySelector(".page-content");
const share = document.querySelector("#social-share");
const cursor = document.querySelector("#move-up");
const h1 = document.querySelector("h1");
const postFooter = document.querySelector("#post-footer");
const footer = document.querySelector("#footer");
const aside = document.querySelector("#aside");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(async (e) => {
    // if ((e.target === postFooter || e.target === footer) && e.isIntersecting) {
    //   share.classList.add("hide");
    // }
    // if ((e.target === postFooter || e.target === footer) && !e.isIntersecting) {
    //   share.classList.remove("hide");
    // }
    if (e.target === footer && e.isIntersecting) {
      share.classList.add("hide");
    }
    if (e.target === postFooter && e.isIntersecting) {
      share.classList.add("hide");
    }
    if (e.target === postFooter && !e.isIntersecting) {
      share.classList.remove("hide");
    }
    if (e.target === h1 && e.isIntersecting) {
      cursor.classList.add("disappear");
      share.classList.remove("slide-up");
    }
    if (e.target === h1 && !e.isIntersecting) {
      cursor.classList.remove("disappear");
      share.classList.add("slide-up");
    }
    // target ads or ignore when in mobile viewport and add the class hide. write it in the code below and threshold could be 0.5-1
  });
}, {});

observer.observe(h1);
observer.observe(postFooter);
observer.observe(footer);

pageContent.addEventListener("click", () => {
  if (collapse.classList.length === 2) {
    hideContent.classList.add("page-content-hide");
  } else {
    hideContent.classList.remove("page-content-hide");
  }
  console.log(collapse.classList.length, collapse.classList);
});
