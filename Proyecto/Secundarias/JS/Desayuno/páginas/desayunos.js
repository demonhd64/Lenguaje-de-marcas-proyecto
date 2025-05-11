import { ingredientesParaFiltro_export } from "../../../../Almacenamiento/datos.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { auth } from "../../../../Firebase.js";

console.log(ingredientesParaFiltro_export)

// Función principal de filtrado que considera ambos tipos de filtros
function aplicarFiltros() {
    const cards = document.querySelectorAll('.card');
    let NumeroVisible = 0; // Contador para las tarjetas visibles
    // Verificar si hay ingredientes seleccionados
    const hayIngredientesSeleccionados = ingredientesParaFiltro_export.length > 0;
    // Variable para saber si hay coincidencias
    let hayCoincidencias = false;
    cards.forEach((card, index) => {
        const ingredientesCard = Array.from(card.querySelectorAll(".elementos-ingredientes ul li"))
            .map(li => li.textContent.toLowerCase());
        // Comprobar si la tarjeta contiene algún ingrediente seleccionado
        const mostrarPorIngredientes = hayIngredientesSeleccionados && ingredientesParaFiltro_export.some(filtro =>
            ingredientesCard.some(ingrediente => ingrediente.includes(filtro.toLowerCase()))
        );
        // Si hay ingredientes seleccionados y hay coincidencias, se muestra la tarjeta
        if (mostrarPorIngredientes) {
            card.style.display = "flex";
            card.classList.add("limite");
            NumeroVisible++;
            hayCoincidencias = true; // Hay al menos una coincidencia
        } else {
            // Si no hay ingredientes seleccionados o no hay coincidencias, se muestran todas las tarjetas
            if (!hayIngredientesSeleccionados || !hayCoincidencias) {
                card.style.display = "flex";
                card.classList.add("limite");
                NumeroVisible++;
            } else {
                card.style.display = "none";
                card.classList.remove("limite");
            }
        }
        const iconElement = document.querySelector(`#icon${index + 1}`);
        if (iconElement) {
            iconElement.textContent = hayCoincidencias || !hayIngredientesSeleccionados ? NumeroVisible : '';
        }
    })
};

document.addEventListener('DOMContentLoaded', function() {
    aplicarFiltros();
});

// Función para controlar la visibilidad de las cards
function MirarSiActivo(container) {
    const listaDeChecks = document.getElementsByClassName("opcionCheck");
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector("footer");
    if (container.checked) {
        cards.forEach(function(card) {
            card.style.display = 'none';
            card.classList.remove("activa");
        });
        container.nextElementSibling.style.display = 'flex';
        container.nextElementSibling.classList.add("activa");
        footer.style.display = "none"
    } else {
        const pasoSelector = container.nextElementSibling.querySelector('.pasoSelector');
        const textoPaso = container.nextElementSibling.querySelector('.texto');
        footer.style.display = "flex"

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
    TextoAyuda();
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
document.addEventListener('DOMContentLoaded', function () {
    const textosPasos = {
        pasoSelector1: {
            1: 'Aplastamos con un tenedor 2 plátanos maduros hasta conseguir una textura de puré con pocos grumos.',
            2: 'Ponemos el puré de plátano en un bol y le añadimos 1 huevo, canela, sal, impulsor químico, leche... y mezclamos.',
            3: 'Añadimos 100 g de harina de avena y mezclamos.',
            4: 'Preparamos una sartén plana con un poco de aceite y calentamos.',
            5: 'Cocinamos las tortitas hasta que salgan burbujas y damos la vuelta.',
            6: 'Servimos con plátano en rodajas y sirope de agave. Guardar en la nevera si sobra.'
        },
        pasoSelector2: {
            1: 'Lava las fresas y córtalas en mitades si son grandes.',
            2: 'Coloca todos los ingredientes en una licuadora: fresas, plátano, leche, yogur (si usas), miel de acacia y hielo..',
            3: 'Licúa hasta obtener una mezcla homogénea y cremosa.',
            4: 'Sirve frío y decora con una fresa entera o unas hojas de menta si quieres.',
        },
        pasoSelector3: {
            1: 'Bate los huevos en un bol con sal y pimienta.',
            2: 'Calienta el aceite o mantequilla en una sartén a fuego medio.',
            3: 'Añade las espinacas y saltea por 1-2 minutos hasta que se marchiten.',
            4: 'Vierte los huevos batidos y remueve constantemente hasta que cuajen.',
            5: 'Agrega el queso, mezcla ligeramente, y retira del fuego cuando el queso empiece a derretirse.',
            6: 'Sirve caliente con pan tostado.'
        },
        pasoSelector4: {
            1: 'Bate los huevos en un bol junto con la leche, la canela y la vainilla.',
            2: 'Sumerge cada rebanada de pan en la mezcla por ambos lados.',
            3: 'Calienta la mantequilla en una sartén a fuego medio.',
            4: 'Cocina las rebanadas de pan hasta que estén doradas por ambos lados (aproximadamente 2 minutos por lado).',
            5: 'Sirve con miel, jarabe de maple, fruta fresca o azúcar glass.',
        },
        pasoSelector5: {
            1: 'Tuesta las rebanadas de pan hasta que estén crujientes.',
            2: 'Pela y machaca el aguacate en un bol con sal, pimienta y un poco de limón si lo deseas.',
            3: 'Para los huevos pochados: hierve agua en una olla, añade el vinagre, y baja a fuego suave. Rompe un huevo en una taza y deslízalo suavemente en el agua. Cocina 3 minutos y retira con una espumadera. Repite con el segundo huevo.',
            4: 'Unta el aguacate sobre las tostadas.',
            5: 'Coloca un huevo pochado encima de cada una.',
            6: 'Agrega un poco de sal, pimienta y algún topping como semillas de sésamo, chile en hojuelas o un chorrito de aceite de oliva.'
        }
    };

    const selectores = document.getElementsByClassName('pasoSelector');

    for (let i = 0; i < selectores.length; i++) {
        selectores[i].addEventListener('change', function () {
            const idSelector = this.id;
            const pasoSeleccionado = this.value;
            const textoPaso = document.getElementById('Texto-De-Opcion' + idSelector.replace('pasoSelector', ''));

            if (!textoPaso) return;

            // Buscamos el texto correspondiente al paso y lo mostramos
            const texto = textosPasos[idSelector]?.[pasoSeleccionado] || '';
            textoPaso.textContent = texto;
        });
    }
});


// Log in

function showModal() {
    const modal = document.getElementsByClassName("modal");
    modal[0].style.display = "flex"

}

document.getElementById("btnIniciarSesion").addEventListener('click', showModal)

// Control cerrar modal

function CerrarModal(){
    const modal = document.getElementsByClassName("modal");
    modal[0].style.display = "none"
}

document.getElementById("CerrarModalLogIn").addEventListener('click', CerrarModal)

//Visibilidad contraseña
let ConstraseñaVisible = false; // Variable para controlar la visibilidad

function eyeLogin() {
    const eyeOpen = document.getElementById("eye-OpenLogin");
    const eyeClosed = document.getElementById("eye-closedLogin");
    const passwInput = document.getElementsByClassName("passw-input")[0];

    // Alternar la visibilidad de la contraseña
    ConstraseñaVisible = !ConstraseñaVisible;

    if (ConstraseñaVisible) {
        passwInput.type = "text"; 
        eyeClosed.style.display = "none"; 
        eyeOpen.style.display = "inline"; 
    } else {
        passwInput.type = "password"; 
        eyeClosed.style.display = "inline"; 
        eyeOpen.style.display = "none";
    }
}

// Asignar el evento a los íconos
document.getElementById("eye-OpenLogin").addEventListener('click', eyeLogin);
document.getElementById("eye-closedLogin").addEventListener('click', eyeLogin);



// Registro
function showModalRegistro() {
    const modal = document.getElementsByClassName("modal");
    modal[1].style.display = "flex" 
}

document.getElementById("btnRegistro").addEventListener('click', showModalRegistro)

// Control cerrar modal

function CerrarModalRegistro(){
    const modal = document.getElementsByClassName("modal");
    modal[1].style.display = "none"
}

document.getElementById("CerrarModalRegistro").addEventListener('click', CerrarModalRegistro)

//Visibilidad contraseña
let ConstraseñaVisibleRegistro = false; // Variable para controlar la visibilidad

function eyeRegistro() {
    const eyeOpen = document.getElementById("eye-OpenRegistro");
    const eyeClosed = document.getElementById("eye-closedRegistro");
    const passwInput = document.getElementsByClassName("passw-input")[1];

    // Alternar la visibilidad de la contraseña
    ConstraseñaVisibleRegistro = !ConstraseñaVisibleRegistro;

    if (ConstraseñaVisibleRegistro) {
        passwInput.type = "text"; 
        eyeClosed.style.display = "none"; 
        eyeOpen.style.display = "inline"; 
    } else {
        passwInput.type = "password"; 
        eyeClosed.style.display = "inline";
        eyeOpen.style.display = "none";
    }
}

// Asignar el evento a los íconos
document.getElementById("eye-OpenRegistro").addEventListener('click', eyeRegistro);
document.getElementById("eye-closedRegistro").addEventListener('click', eyeRegistro);


//Cambio de botones:

const BtnLogSign = document.getElementsByClassName("btnSign")
const LogOut = document.getElementById("LogOut")
const borroso = document.getElementById("need-login")
const cardsborrosas = borroso.querySelectorAll(".card")
const cursoreventLogNec = document.getElementById("need-login")


onAuthStateChanged(auth, async (usuario) => {
    const textoNeedLogIn = document.getElementById("Texto-need-logIn")

    if (usuario){
        BtnLogSign[0].style.display = "none"
        BtnLogSign[1].style.display = "none"
        LogOut.style.display = "flex"
        cardsborrosas.forEach(card => card.style.filter = "none")
        cursoreventLogNec.style.pointerEvents = "auto"
        textoNeedLogIn.style.display = "none"

    }else{
        BtnLogSign[0].style.display = "flex"
        BtnLogSign[1].style.display = "flex"
        LogOut.style.display = "none"
        cardsborrosas.forEach(card => card.style.filter = "blur(5px)")
        cursoreventLogNec.style.pointerEvents = "none"
        textoNeedLogIn.style.display = "block"
    }
})

//Control de textos para cards activas o no:

function TextoAyuda(){
    const Ayuda = document.getElementById("Ayuda")
    const textoNeedLogIn = document.getElementById("Texto-need-logIn")
    const cardsChecked = document.querySelectorAll(".opcionCheck:checked")

    if(cardsChecked.length > 0){
        Ayuda.style.display = "none"
        textoNeedLogIn.style.display = "none"
    } else{
        Ayuda.style.display = "block"
        textoNeedLogIn.style.display = "block"
    }

}
