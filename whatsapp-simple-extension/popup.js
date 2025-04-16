document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginView = document.getElementById("loginView");
  const loggedInView = document.getElementById("loggedInView");
  const listado = document.getElementById("listado");

  // Verificar si el usuario ya está logueado
  chrome.storage.local.get(["userCredentials", "whatsappTagged"], (result) => {
    if (result.userCredentials) {
      showLoggedInView(result.whatsappTagged || []);
    }
  });

  // Manejador de login
  loginBtn.addEventListener("click", async () => {
    try {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        alert("Por favor ingresa email y contraseña");
        return;
      }

      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:5000/auth/login",
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const result = await response.json();
      console.log("Login exitoso:", result);

      // Guardar solo lo necesario y de forma segura
      chrome.storage.local.set(
        {
          userCredentials: {
            email,
            token: result.tokenSession, // Asumiendo que la API devuelve un token
          },
          lastLogin: new Date().toISOString(),
        },
        () => {
          showLoggedInView([]);
        }
      );
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(error.message || "Ocurrió un error al iniciar sesión");
    }
  });

  // Manejador de logout
  logoutBtn.addEventListener("click", () => {
    chrome.storage.local.remove("userCredentials", () => {
      loginView.style.display = "block";
      loggedInView.style.display = "none";
      emailInput.value = "";
      passwordInput.value = "";
    });
  });

  // Función para mostrar la vista de logueado

  function viewLoggedIn() {
    loginView.style.display = "none";
    loggedInView.style.display = "block";
  }

  function showLoggedInView(tags) {
    loginView.style.display = "none";
    loggedInView.style.display = "block";

    if (tags.length === 0) {
      listado.innerHTML = "<li>No hay números etiquetados aún.</li>";
    } else {
      listado.innerHTML = "";
      tags.forEach(({ number, label }) => {
        const li = document.createElement("li");
        li.textContent = `${number} - ${label}`;
        listado.appendChild(li);
      });
    }
  }

  // Escuchar cambios en los números etiquetados
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.loggedInView) {
      showLoggedInView(changes.whatsappTagged.newValue || []);
    }
  });
});
