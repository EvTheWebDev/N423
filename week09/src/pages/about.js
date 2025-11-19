import $ from "jquery";

export const meta = {
  id: "about",
  label: "About",
  order: 2,
};

export function render() {
  return `<h1>Welcome to the About Page!</h1>
    <span id="clickMe" class="btn">Click Me</span>
    `;
}

export function init() {
  $("#app").on("click", "#clickMe", function () {
    alert("BUTTON CLICKED");
  });
}
