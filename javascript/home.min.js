// NOTE: Before you make any changes to this file. Remember that more than one page makes use of this file, not just the homepage

const header = document.querySelector("#header");
const cursor = document.querySelector("#move-up");
const newsletter = document.querySelector("#footer form");
const formField = document.querySelector("#footer input");

axios.defaults.timeout = 10000;

const obsever = new IntersectionObserver((entries, obsever) => {
  entries.forEach((e) => {
    if (e.target === header && e.isIntersecting) {
      cursor.classList.add("disappear");
    }
    if (e.target === header && !e.isIntersecting) {
      cursor.classList.remove("disappear");
    }
  });
}, {});

obsever.observe(header);

newsletter.onsubmit = () => {
  if (!formField.hasAttribute("required")) {
    console.log("Think you smart huh!!!");
    return false;
  }
  document.querySelector("#footer button").innerHTML =
    "<div class='spinner-border spinner-border-sm' role='status'><span class='sr-only'>loading...</span><div>";
  axios
    .post("/newsletter", {
      email: formField.value,
    })
    .then((res) => {
      console.log(res);
      newsletter.outerHTML = `A confirmation email has been sent to your inbox`;
    })
    .catch((err) => {
      document.querySelector("#footer .res").textContent =
        "Subscription failed!! try again later";
      document.querySelector(
        "#footer button"
      ).outerHTML = `<button class="btn btn-dark px-3"><i class="fas fa-chevron-right"></i></button>`;
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.header);
      } else if (err.request) {
        console.log(err.request.status);
        console.log(err.request.data);
        console.log(err.request.header);
      } else {
        console.log(err.message);
      }
    });
  return false;
};
