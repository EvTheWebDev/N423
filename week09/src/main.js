import "./scss/styles.scss";
import $ from "jquery";
// import { homePageListeners, renderHomePage } from "./pages/home";
// import { aboutPageListeners, renderAboutPage } from "./pages/about";
const modules = import.meta.glob("./pages/*.js", {eager: true});
const routes = {};

for (const [path, module] of Object.entries(modules)) {
    const fileName = path.split("/").pop();
    const defaultID = fileName.replace(".js", "");

    const meta = module.meta || {id: defaultID, label: defaultID};
    const id = meta.id || defaultID;

    routes[id] = {
        render: module.render,
        init: module.init || null,
        meta,
    }
}

console.log(routes);

function buildNav() {
    const $nav = $("#appNav");
    const links = Object.values(routes)
    .map((route) => {
        const id = route.meta.id;
        const label = route.meta.label;
        return `<a href="#${id}" data-page=${id}>${label}</a>`
    })
    .join(" | ");
    $nav.append(links);
};

function changeRoute() {
  let pageID = window.location.hash.replace("#", "") || "home";

  const route = routes[pageID] || routes.home;

  $("#app").html(route.render);

  if (typeof route.init === "function") {
    route.init();
  }
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
    buildNav();
  initURLListener();
});
