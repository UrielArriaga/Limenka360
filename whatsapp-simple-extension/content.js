(function startWatcher() {
  const main = document.querySelector("body");
  if (!main) {
    setTimeout(startWatcher, 500);
    return;
  }

  let lastHeader = null;
  let headerObserver = null;

  fetch(chrome.runtime.getURL("drawer.html"))
    .then((res) => res.text())
    .then((html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = chrome.runtime.getURL("drawer.css");
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("drawer.js");

      script.onload = () => {
        // 🟢 Este código ya se ejecuta cuando openLimenkaDrawer está listo

        function agregarBoton(header) {
          if (!header) return;

          const existente = document.querySelector(".nuevo-div-con-boton");
          if (existente) return;

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
            if (typeof window.hello === "function") {
              window.hello();
            } else {
              console.warn("❌ hello no está disponible");
            }
          };

          nuevoDiv.appendChild(boton);
          header.appendChild(nuevoDiv);
        }

        function observarHeader(header) {
          if (headerObserver) headerObserver.disconnect();

          headerObserver = new MutationObserver(() => {
            agregarBoton(header);
          });

          headerObserver.observe(header, { childList: true, subtree: true });
        }

        // ✅ Aquí es seguro ejecutar
        setInterval(() => {
          const currentHeader = document.querySelector("body");

          if (currentHeader && currentHeader !== lastHeader) {
            lastHeader = currentHeader;
            agregarBoton(currentHeader);
            observarHeader(currentHeader);
          }
        }, 500);
      };

      console.log("✅ drawer.js cargado:", typeof openLimenkaDrawer);

      document.body.appendChild(script);
    });
})();
// TODO  Primera versio medio jala
// (function startWatcher() {
//   const main = document.querySelector("#main");

//   if (!main) {
//     setTimeout(startWatcher, 500);
//     return;
//   }

//   let lastHeader = null;
//   let headerObserver = null;

//   fetch(chrome.runtime.getURL("drawer.html"))
//     .then((res) => res.text())
//     .then((html) => {
//       const div = document.createElement("div");
//       div.innerHTML = html;
//       document.body.appendChild(div);

//       const css = document.createElement("link");
//       css.rel = "stylesheet";
//       css.href = chrome.runtime.getURL("drawer.css");
//       document.head.appendChild(css);

//       const script = document.createElement("script");
//       script.src = chrome.runtime.getURL("drawer.js");

//       document.body.appendChild(script);
//     });

//   function extractPhoneNumber(container) {
//     const chatId = container
//       .querySelector("div[data-id]")
//       ?.getAttribute("data-id");
//     return chatId?.split("@")[0]?.substring(2) || null;
//   }

//   function agregarBoton(header) {
//     if (!header) return;

//     const divs = header.querySelectorAll("div");
//     const botonExistente = header.querySelector(".nuevo-div-con-boton");

//     if (botonExistente || divs.length < 4) return;

//     const nuevoDiv = document.createElement("div");
//     nuevoDiv.className = "nuevo-div-con-boton";

//     const boton = document.createElement("button");
//     boton.className = "boton-estilizado";
//     boton.textContent = "Click aquí para extraer número";
//     boton.style.cssText = `
//       margin-left: 8px;
//       padding: 2px 6px;
//       font-size: 12px;
//       background-color: #25D366;
//       color: white;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//     `;

//     boton.onclick = (event) => {
//       event.stopPropagation();
//       const phoneNumber = extractPhoneNumber(header); // importante que lo obtengas aquí
//       if (typeof window.openLimenkaDrawer === "function") {
//         openLimenkaDrawer(phoneNumber);
//       } else {
//         console.warn("openLimenkaDrawer no está disponible.");
//       }
//     };
//     nuevoDiv.appendChild(boton);
//     divs[3].insertAdjacentElement("afterend", nuevoDiv);
//   }

//   function observarHeader(header) {
//     if (headerObserver) headerObserver.disconnect();

//     headerObserver = new MutationObserver(() => {
//       agregarBoton(header);
//     });

//     headerObserver.observe(header, { childList: true, subtree: true });
//   }

//   setInterval(() => {
//     const currentHeader = document.querySelector("#main header");

//     if (currentHeader && currentHeader !== lastHeader) {
//       lastHeader = currentHeader;
//       agregarBoton(currentHeader);
//       observarHeader(currentHeader);
//     }
//   }, 500); // verifica cada 0.5s si el header cambió
// })();
