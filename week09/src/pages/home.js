import $ from "jquery";

export const meta = {
  id: "home",
  label: "Home",
  order: 1,
};

export function render() {
  return `<h1>Welcome to the Home Page!</h1>
    <span id="clickMe" class="btn">Click Me</span>
    `;
}

export function init() {
  $("#app").on("click", "#clickMe", function () {
    alert("BUTTON CLICKED");
  });
}
