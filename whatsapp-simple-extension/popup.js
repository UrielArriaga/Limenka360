document.addEventListener("DOMContentLoaded", () => {
  const listado = document.getElementById("listado");
  chrome.storage.local.get("whatsappTagged", (result) => {
    const tags = result.whatsappTagged || [];
    if (tags.length === 0) {
      listado.innerHTML = "<li>No hay números aún.</li>";
    } else {
      tags.forEach(({ number, label }) => {
        const li = document.createElement("li");
        li.textContent = `${number} - ${label}`;
        listado.appendChild(li);
      });
    }
  });
});
