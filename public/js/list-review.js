const pageContent = document.querySelector("#page-content");
const collapse = document.querySelector("#collapseExample");
const hideContent = document.querySelector(".page-content");
const share = document.querySelector("#social-share");
const cursor = document.querySelector("#move-up");
const h1 = document.querySelector("h1");
const postFooter = document.querySelector("#post-footer");
const footer = document.querySelector("#footer");
const aside = document.querySelector("#aside");
const newsletter = document.querySelector("#footer form");
const postLetter = document.querySelector("#post-footer form");
const formField = document.querySelector("#footer input");
const postField = document.querySelector("#post-footer input");

axios.defaults.timeout = 5000;

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

newsletter.onsubmit = () => {
  if (!formField.hasAttribute("required")) {
    console.log("Think you smart huh!!!");
    return false;
  }

  document.querySelector("#footer button").innerHTML =
    "<div class='spinner-border spinner-border-sm' role='status'><span class='sr-only'>loading...</span><div>";
  axios
    .post("/api/newsletter", {
      email: formField.value,
    })
    .then((res) => {
      console.log(res);
      newsletter.outerHTML = `A confirmation email has been sent to your inbox`;
    })
    .catch((err) => {
      newsletter.outerHTML =
        "<span class='text-danger'>Subscription failed!! try again later</span>";
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.header);
      } else if (err.request) {
        console.log(err.resquest.status);
        console.log(err.resquest.data);
        console.log(err.resquest.header);
      } else {
        console.log(err.message);
      }
    });
  return false;
};

postLetter.onsubmit = () => {
  if (!postField.hasAttribute("required")) {
    console.log("Think you smart huh!!!");
    return false;
  }

  document.querySelector("#post-footer button").innerHTML =
    "<div class='spinner-border spinner-border-sm' role='status'><span class='sr-only'>loading...</span><div>";
  axios
    .post("/api/newsletter", {
      email: postField.value,
    })
    .then((res) => {
      console.log(res);
      postLetter.outerHTML = `A confirmation email has been sent to your inbox`;
    })
    .catch((err) => {
      postLetter.outerHTML =
        "<span class='text-danger'>Subscription failed!! try again later</span>";
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.header);
      } else if (err.request) {
        console.log(err.resquest.status);
        console.log(err.resquest.data);
        console.log(err.resquest.header);
      } else {
        console.log(err.message);
      }
    });
  return false;
};
