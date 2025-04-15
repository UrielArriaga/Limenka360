window.openLimenkaDrawer = function (info) {
  const drawer = document.getElementById("limenka-drawer");
  if (!drawer) return;

  const content = drawer.querySelector("#limenka-drawer-content");
  content.innerHTML = `<p>Número: ${info}</p>`;
  drawer.style.transform = "translateX(0)";
};

document.body.style.backgroundColor = "red";

window.hello = function () {
  console.log("Hello from drawer.js");
};
