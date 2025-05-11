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
            1: 'Limpia los ajos tiernos retirando las raíces y la parte verde más oscura. Lávalos, sécalos con papel de cocina y córtalos en rodajas no demasiado finas.',
            2: 'Limpia los champiñones eliminando la parte terrosa del tallo. Lávalos rápidamente bajo el grifo, sin sumergirlos para que no absorban agua. Sécalos muy bien con papel de cocina y córtalos en láminas.',
            3: 'Lava el perejil y sécalo. Reserva unas hojas para decorar el plato al final y pica finas las demás. Casca los huevos en un cuenco, salpimiéntalos y aromatiza con el perejil picado. Bátelos ligeramente con las varillas manuales.',
            4: 'Pon al fuego una sartén con el aceite y cuando esté bien caliente, añade los ajetes y los champiñones. Salpimienta y saltéalos unos 5 minutos, removiendo de vez en cuando con una cuchara de madera.',
            5: 'Incorpora la mezcla de huevos y prosigue la cocción, sin dejar de remover, hasta que empiecen a cuajarse; deben quedar melosos. Reparte el revuelto en platos o cazuelitas, decóralo con el perejil reservado y sírvelo en seguida.',
        },
        pasoSelector2: {
            1: 'Comienza por precalentar el horno a 175ºC. Los burritos se pueden cocinar también en la freidora de aire. Pon una cucharada de aceite de oliva en una sartén a fuego medio. Cuando esté caliente pon a pochar la cebolla picada y sofríe hasta que esté tierna. Añade el ajo laminado y cocina durante un minuto más.',
            2: 'Cuando el sofrito de cebolla y ajo esté listo, añade el pollo troceado, pon una pizca de sal y pimienta y cocina. Agrega el zumo de limón y termina de hacer.',
            3: 'Extiende una tortilla de trigo, pon encima la mezcla de pollo que has cocinado y cubre con queso cheddar. Enrolla el burrito con cuidado y ponlo en una fuente de horno. Haz lo mismo con el resto.',
            4: 'Espolvorea sobre los burritos un poco más de queso cheddar y una pizca de cilantro picado, y hornéalos durante 15 minutos, hasta que el queso se derrita.',
            5: 'Una vez horneados los burritos, sírvelos acompañados de crema agria o salsa picante, o ambas.',
        },
        pasoSelector3: {
            1: 'Lava, despunta y corta el calabacín en daditos. Pela y pica el ajo. Calienta la mantequilla en una sartén y sofríe ambos un par de minutos. Agrega la harina y dórala ligeramente durante 1 minuto. Vierte la leche caliente y cuece, sin dejar de remover, hasta que espese.',
            2: 'Vierte la preparación en una fuente y deja que se entibie. Añade el queso cortado en daditos, unas hojitas de albahaca lavada y picada y salpimienta, remueve y extiende bien la masa. Déjala reposar durante 4 horas en la nevera.',
            3: 'Forma las croquetas, pásalas por el huevo batido y el pan rallado y fríelas en abundante aceite caliente hasta que se doren. Escúrrelas y sírvelas con un poco más de albahaca.'
        },
        pasoSelector4: {
            1: 'Pela la cebolla y las zanahorias, y trocéalas. Rehoga la primera en la mantequilla durante 2 minutos.',
            2: 'Añade la zanahoria, espolvorea con la harina, vierte el caldo, salpimenta y cuece durante 10 minutos.',
            3: 'Pica los piñones y mézclalos con el queso. Forma los crujientes de queso fundiendo 4 cucharadas de la mezcla en una sartén. Haz 8 crujientes.',
            4: 'Tritura la verdura, añade el zumo de las naranjas y la nata a la crema de zanahoria, ajusta de sal y remueve.',
            5: 'Reparte la crema en 4 cuencos y sírvela decorada con los crujientes de queso y piñones.'
        },
        pasoSelector5: {
            1: 'Lava bien las patatas, sécalas y pínchalas varias veces con la punta de un cuchillo. Envuélvelas en film o cúbrelas con una tapa apta para microondas y cuécelas durante 4 minutos.',
            2: 'Dales la vuelta y prosigue la cocción 3-5 minutos, según el tipo de patata y de su tamaño. Retíralas y espera a que se templen.',
            3: 'En una sartén, pon 1 cucharada de aceite y caliéntalo. Añade la carne picada y saltéala un par de minutos, sin dejar de remover para que quede suelta.',
            4: 'Añade el tomate frito, salpimienta al gusto y mezcla.',
            5: 'Limpia los champiñones, lávalos, sécalos y córtalos en láminas finas.',
            6: 'Corta las patatas por la mitad a lo largo; retírales un poco de la pulpa con una cucharita y mézclala con el sofrito de carne y tomate.',
            7: 'Salpimienta el interior de las patatas y rellénalas con la preparación anterior. Reparte por encima las láminas de champiñón y ralla el queso curado sobre ellas.',
            8: 'Precalienta el horno a 180 °C, coloca dentro las patatas y caliéntalas 2 o 3 minutos, hasta que el queso se funda. Decora con el tomillo, lavado y troceado, y sirve.' 
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
