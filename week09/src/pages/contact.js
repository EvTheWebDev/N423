import $ from "jquery";

export const meta = {
  id: "contact",
  label: "Contact",
  order: 3,
};

export function render() {
  return `<h1>Welcome to the Contact Page!</h1>
    <span id="clickMe" class="btn">Contact Us</span>
    `;
}

export function init() {
  $("#app").on("click", "#clickMe", function () {
    alert("ROUTE TO EMAIL");
  });
}
