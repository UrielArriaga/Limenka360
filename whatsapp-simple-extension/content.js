(function startWatcher() {
  const main = document.querySelector("body");
  if (!main) {
    setTimeout(startWatcher, 500);
    return;
  }
  let lastHeader = null;
  let headerObserver = null;

  function createDrawer() {
    const drawer = document.createElement("div");
    drawer.id = "limenka-drawer";

    drawer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0;">Información del contacto</h3>
        <button id="close-drawer" style="background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
      </div>
      <div id="drawer-content">
        <p id="phone-display">Número de teléfono aparecerá aquí</p>
        <!-- Puedes agregar más contenido aquí -->
      </div>
    `;

    document.body.appendChild(drawer);

    // Evento para cerrar el drawer
    document.getElementById("close-drawer").addEventListener("click", () => {
      drawer.style.right = "-400px";
    });

    return drawer;
  }

  function extractPhoneNumber(container) {
    const chatId = container
      .querySelector("div[data-id]")
      ?.getAttribute("data-id");
    return chatId?.split("@")[0]?.substring(2) || null;
  }

  function agregarBoton(header) {
    if (!header) return;

    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = "nuevo-div-con-boton";

    const boton = document.createElement("button");
    boton.className = "boton-estilizado";
    boton.textContent = "Click aquí para extraer número";
    boton.style.cssText = `
      margin-left: 8px;
      padding: 2px 6px;
      font-size: 12px;
      background-color: #25D366;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    boton.onclick = (event) => {
      createDrawer();
    };
    nuevoDiv.appendChild(boton);

    main.appendChild(nuevoDiv);

    console.log(nuevoDiv);
    // main.appendChild("afterend", nuevoDiv);
  }

  agregarBoton(main);

  function observarHeader(header) {
    if (headerObserver) headerObserver.disconnect();

    headerObserver = new MutationObserver(() => {
      agregarBoton(header);
    });

    headerObserver.observe(header, { childList: true, subtree: true });
  }

  // setInterval(() => {
  //   const currentHeader = document.querySelector("body");

  //   if (currentHeader && currentHeader !== lastHeader) {
  //     lastHeader = currentHeader;
  //     agregarBoton(currentHeader);
  //     observarHeader(currentHeader);
  //   }
  // }, 500);
})();
