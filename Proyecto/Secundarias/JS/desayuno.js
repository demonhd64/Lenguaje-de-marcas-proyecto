import { ingredientesParaFiltro_export } from "../../Almacenamiento/datos.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDX7IW42ZKxsQoHsqPAgMtdIEMcyaILbNg",
    authDomain: "lenguaje-de-marcas-d778e.firebaseapp.com",
    projectId: "lenguaje-de-marcas-d778e",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Función principal de filtrado que considera ambos tipos de filtros
function aplicarFiltros() {
    const cards = document.querySelectorAll('.card');
    let NumeroVisible = 0; // Contador para las tarjetas visibles
    cards.forEach((card, index) => {
        const ingredientesCard = Array.from(card.querySelectorAll(".elementos-ingredientes ul li"))
            .map(li => li.textContent.toLowerCase());

        const mostrarPorIngredientes = ingredientesParaFiltro_export.length > 0 && ingredientesParaFiltro_export.some(filtro =>
            ingredientesCard.some(ingrediente => ingrediente.includes(filtro.toLowerCase()))
        );

        if (mostrarPorIngredientes || ingredientesParaFiltro_export.length === 0) {
            card.style.display = "flex";
            card.classList.add("limite");
            NumeroVisible++;
        } else {
            card.style.display = "none";
            card.classList.remove("limite");
        }

        const iconElement = document.querySelector(`#icon${index + 1}`);
        if (iconElement) {
            iconElement.textContent = mostrarPorIngredientes || ingredientesParaFiltro_export.length === 0 ? NumeroVisible : '';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    aplicarFiltros();
});

// Función para controlar la visibilidad de las cards
function MirarSiActivo(container) {
    const listaDeChecks = document.getElementsByClassName("opcionCheck");
    const cards = document.querySelectorAll('.card');

    if (container.checked) {
        cards.forEach(function(card) {
            card.style.display = 'none';
            card.classList.remove("activa");
        });
        container.nextElementSibling.style.display = 'flex';
        container.nextElementSibling.classList.add("activa");
    } else {
        const pasoSelector = container.nextElementSibling.querySelector('.pasoSelector');
        const textoPaso = container.nextElementSibling.querySelector('.texto');

        if (pasoSelector) {
            pasoSelector.value = "";
        }
        if (textoPaso) {
            textoPaso.textContent = '';
        }

        const AlgunaMarcada = Array.from(listaDeChecks).some(check => check.checked);
        if (!AlgunaMarcada) {
            cards.forEach(function(card) {
                card.style.display = 'flex';
                card.classList.remove("activa");
                card.classList.add("limite");
                card.style.width = "";
            });
        }
        aplicarFiltros();
    }
}

window.MirarSiActivo = MirarSiActivo;

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('activo');
    const desplegable = document.querySelector('.desplegable');
    const button = document.querySelector('button');

    button.addEventListener('click', function() {
        toggle.checked = !toggle.checked;
        desplegable.style.display = toggle.checked ? 'flex' : 'none';
    });

    document.addEventListener('click', function(event) {
        const isClickInside = toggle.contains(event.target) || desplegable.contains(event.target) || button.contains(event.target);
        if (!isClickInside) {
            toggle.checked = false;
            desplegable.style.display = 'none';
        }
    });
});

// Manejo de pasos
document.addEventListener('DOMContentLoaded', function() {
    const selectores = document.getElementsByClassName('pasoSelector');

    for (let i =  0; i < selectores.length; i++) {
        selectores[i].addEventListener('change', function() {
            const pasoSeleccionado = this.value;
            const idSelector = this.id;
            const textoPaso = document.getElementById(idSelector === 'pasoSelector1' ? 'Texto-De-Opcion' : 'Texto-De-Opcion2');

            if (idSelector === 'pasoSelector1') {
                switch (pasoSeleccionado) {
                    case '1':
                        textoPaso.textContent = 'Aplastamos con un tenedor 2 plátanos maduros hasta conseguir una textura de puré con pocos grumos.';
                        break;
                    case '2':
                        textoPaso.textContent = 'Ponemos el puré de plátano en un bol y le añadimos 1 huevo, media cucharadita de canela en polvo, una pizca de sal y 10 g de impulsor químico. Vertemos también 50 ml de leche de avena sin azúcar y mezclamos todo muy bien.';
                        break;
                    case '3':
                        textoPaso.textContent = 'Con la masa anterior bien mezclada, añadimos 100 g de harina de avena y volvemos a mezclar.';
                        break;
                    case '4':
                        textoPaso.textContent = 'Preparamos una sartén plana con un poco de aceite que podremos untar con una brocha o un trozo de papel (añadir aceite es opcional, las tortitas pueden hacerse sin aceite). Llevamos la sartén al fuego y esperamos hasta que esté caliente. Vertemos una cuchara grande de la masa.';
                        break;
                    case '5':
                        textoPaso.textContent = 'Dejamos que se haga la tortita por un lado durante unos segundos, el fuego no debe estar muy alto o se nos quemarán. Sabremos que están bien hechas por el lado en que las cocinamos primero, cuando veamos salir burbujas de la masa. Entonces le damos la vuelta y dejamos que se cocine por el otro lado. Seguimos haciendo más tortitas.';
                        break;
                    case '6':
                        textoPaso.textContent = 'Servimos las tortitas recién hechas con plátano en rodajas y sirope de agave. También podemos guardarlas en la nevera durante un par de días y calentarlas un poco en el microondas o el horno antes de comerlas.';
                        break;
                    default:
                        textoPaso.textContent = ''; // Limpiar el texto si no hay selección
                }
            } else if (idSelector === 'pasoSelector2') {
                switch (pasoSeleccionado) {
                    case '1':
                        textoPaso.textContent = '';
                        break;
                    case '2':
                        textoPaso.textContent = 'Has seleccionado el Paso 2. Aquí está la información correspondiente al Paso 2.';
                        break;
                    default:
                        textoPaso.textContent = ''; // Limpiar el texto si no hay selección
                }
            }
        });
    }
});

// Funciones de inicio de sesión
window.showModal = function() {
    document.getElementById("login-modal").style.display = "block";
};

window.closeModal = function() {
    document.getElementById("login-modal").style.display = "none";
};

// Función de inicio de sesión con Google
window.loginWithGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account',
    });

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Usar signInWithRedirect para dispositivos móviles
        auth.signInWithRedirect(provider)
            .then(() => {
                // Escuchar cuando el usuario regresa después del redireccionamiento
                auth.getRedirectResult()
                    .then((result) => {
                        if (result.user) {
                            // Guardar en localStorage el estado de autenticación
                            localStorage.setItem("isAuthenticated", "true");
                            
                            // Actualizar la interfaz
                            document.querySelector("button[onclick='showModal()']").style.display = "none";
                            document.querySelector("button[onclick='logOut()']").style.display = "inline-block";
                            document.querySelectorAll(".card").forEach(card => {
                                card.style.filter = "none";
                                card.style.pointerEvents = "auto";
                            });
                            
                            closeModal();
                        }
                    })
                    .catch((error) => {
                        console.error("Error al redirigir después del inicio de sesión:", error);
                        alert("Ha ocurrido un error durante el proceso de autenticación: " + error.message);
                    });
            })
            .catch((error) => {
                console.error("Error al iniciar sesión con Google:", error);
                alert("Ha ocurrido un error durante el inicio de sesión: " + error.message);
            });
    } else {
        // Mantener el comportamiento original para PC
        auth.signInWithPopup(provider)
            .then((result) => {
                localStorage.setItem("isAuthenticated", "true");
                document.querySelector("button[onclick='showModal()']").style.display = "none";
                document.querySelector("button[onclick='logOut()']").style.display = "inline-block";
                document.querySelectorAll(".card").forEach(card => {
                    card.style.filter = "none";
                    card.style.pointerEvents = "auto";
                });
                closeModal();
            })
            .catch((error) => {
                console.error("Error al iniciar sesión con Google:", error);
                alert("Ha ocurrido un error durante el inicio de sesión: " + error.message);
            });
    }
};

// Función de inicio de sesión con GitHub
window.loginWithGitHub = function() {
    const provider = new firebase.auth.GithubAuthProvider();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Usar signInWithRedirect para dispositivos móviles
        auth.signInWithRedirect(provider)
            .then(() => {
                // Escuchar cuando el usuario regresa después del redireccionamiento
                auth.getRedirectResult()
                    .then((result) => {
                        if (result.user) {
                            localStorage.setItem("isAuthenticated", "true");
                            
                            document.querySelector("button[onclick='showModal()']").style.display = "none";
                            document.querySelector("button[onclick='logOut()']").style.display = "inline-block";
                            document.querySelectorAll(".card").forEach(card => {
                                card.style.filter = "none";
                                card.style.pointerEvents = "auto";
                            });
                            
                            closeModal();
                        }
                    })
                    .catch((error) => {
                        console.error("Error al redirigir después del inicio de sesión:", error);
                        alert("Ha ocurrido un error durante el proceso de autenticación: " + error.message);
                    });
            })
            .catch((error) => {
                console.error("Error al iniciar sesión con GitHub:", error);
                alert("Ha ocurrido un error durante el inicio de sesión: " + error.message);
            });
    } else {
        // Mantener el comportamiento original para PC
        auth.signInWithPopup(provider)
            .then((result) => {
                localStorage.setItem("isAuthenticated", "true");
                document.querySelector("button[onclick='showModal()']").style.display = "none";
                document.querySelector("button[onclick='logOut()']").style.display = "inline-block";
                document.querySelectorAll(".card").forEach(card => {
                    card.style.filter = "none";
                    card.style.pointerEvents = "auto";
                });
                closeModal();
            })
            .catch((error) => {
                console.error("Error al iniciar sesión con GitHub:", error);
                alert("Ha ocurrido un error durante el inicio de sesión: " + error.message);
            });
    }
};

window.logOut = function() {
    // Intentar eliminar la cuenta solo si el usuario está autenticado
    const currentUser = auth.currentUser;
    if (currentUser) {
      currentUser.delete()
        .then(() => {
          console.log("Cuenta eliminada correctamente");
          // Luego de eliminar la cuenta, proceder a cerrar sesión
          return auth.signOut();
        })
        .then(() => {
          // Limpiar la interfaz y los botones como antes
          localStorage.removeItem("isAuthenticated");
          document.querySelector("button[onclick='showModal()']").style.display = "inline-block";  // Mostrar el botón de login
          document.querySelector("button[onclick='logOut()']").style.display = "none";  // Ocultar el botón de logout
          document.querySelectorAll("#need-login .card").forEach(card => {
            card.style.filter = "blur(5px)";  // Eliminar cualquier filtro de desenfoque
            card.style.pointerEvents = "none"
        });
        })
        .catch((error) => {
          console.error("Error al eliminar la cuenta:", error);
          alert("Ha ocurrido un error al eliminar la cuenta: " + error.message);
        });
    } else {
      // Si el usuario no está autenticado, solo cerramos sesión
      auth.signOut()
        .then(() => {
          localStorage.removeItem("isAuthenticated");
          document.querySelector("button[onclick='showModal()']").style.display = "inline-block";
          document.querySelector("button[onclick='logOut()']").style.display = "none";
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
          alert("Ha ocurrido un error al cerrar sesión: " + error.message);
        });
    }
};

// Verificar si el usuario está autenticado al cargar la página
window.onload = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
        auth.onAuthStateChanged((user) => {
            if (user) {
                document.querySelector("button[onclick='showModal()']").style.display = "none";
                document.querySelector("button[onclick='logOut()']").style.display = "inline-block";
            }
        });
    } else {
        document.querySelector("button[onclick='showModal()']").style.display = "inline-block";
        document.querySelector("button[onclick='logOut()']").style.display = "none"; // Ocultar el botón de logout
    }
};
