import { ingredientesParaFiltro } from "../../Almacenamiento/datos.js";

// Función principal de filtrado que considera ambos tipos de filtros
function aplicarFiltros() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Obtener los ingredientes de la tarjeta
        const ingredientesCard = Array.from(card.querySelectorAll(".elementos-ingredientes ul li"))
            .map(li => li.textContent.toLowerCase().trim());

        // Verificar si algún ingrediente está en la lista de filtros
        const mostrarPorIngredientes = ingredientesParaFiltro.some(ingrediente => 
            ingredientesCard.includes(ingrediente.toLowerCase().trim())
        );

        // Mostrar u ocultar la tarjeta según el filtro
        card.style.visibility = mostrarPorIngredientes ? "hidden" : "visible";
    });
}
document.addEventListener('DOMContentLoaded',function(){
    aplicarFiltros()
})

// Función para controlar la visibilidad de las cards
function MirarSiActivo(el) {
    const listaDeChecks = document.getElementsByClassName("opcionCheck");
    const cards = document.querySelectorAll('.card');
    
    // Si el checkbox que se clickeó ya está marcado
    if (el.checked) {
        // Ocultar todas las cards
        cards.forEach(function(card) {
            card.style.display = 'none'; 
        });
        // Mostrar solo la card que se marque
        el.nextElementSibling.style.display = 'flex'; 
    } else {
        // Reiniciar el selector y limpiar el texto
        const pasoSelector = el.nextElementSibling.querySelector('.pasoSelector');
        const textoPaso = el.nextElementSibling.querySelector('.texto');
        
        if (pasoSelector) {
            pasoSelector.value = ""; // Reiniciar a la opción por defecto
        }
        if (textoPaso) {
            textoPaso.textContent = ''; // Limpiar el texto
        }

        // Si están todas desmarcadas, que aparezcan todas las cards
        const AlgunaMarcada = Array.from(listaDeChecks).some(check => check.checked);
        if (!AlgunaMarcada) {
            cards.forEach(function(card) {
                card.style.display = 'flex'; 
            });
        }
    }
    aplicarFiltros()
}

// Exponemos la función al ámbito global para que pueda ser llamada desde el HTML inline
window.MirarSiActivo = MirarSiActivo;

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('activo');
    const desplegable = document.querySelector('.desplegable');
    const button = document.querySelector('button'); // Selecciona el botón

    // Cambia el estado del checkbox y muestra/oculta el desplegable al hacer clic en el botón
    button.addEventListener('click', function() {
        toggle.checked = !toggle.checked; // Cambia el estado del checkbox
        if (toggle.checked) {
            desplegable.style.display = 'flex';
        } else {
            desplegable.style.display = 'none';
        }
    });

    // Cerrar el desplegable si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInside = toggle.contains(event.target) || desplegable.contains(event.target) || button.contains(event.target);
        if (!isClickInside) {
            toggle.checked = false; // Desmarcar el checkbox
            desplegable.style.display = 'none'; // Ocultar el desplegable
        }
    });
});

// Para cuadro 1: Manejo del select
document.getElementById('pasoSelector').addEventListener('change', function() {
    const textoPaso = document.getElementById('Texto-De-Opcion');
    const pasoSeleccionado = this.value;

    if (pasoSeleccionado === '1') {
        textoPaso.textContent = 'Aplastamos con un tenedor 2 plátanos maduros hasta conseguir una textura de puré con pocos grumos.';
    } else if (pasoSeleccionado === '2') {
        textoPaso.textContent = 'Ponemos el puré de plátano en un bol y le añadimos 1 huevo, media cucharadita de canela en polvo, una pizca de sal y 10 g de impulsor químico. Vertemos también 50 ml de leche de avena sin azúcar y mezclamos todo muy bien.';
    } else if (pasoSeleccionado === '3') {
        textoPaso.textContent = 'Con la masa anterior bien mezclada, añadimos 100 g de harina de avena y volvemos a mezclar.';
    } else if (pasoSeleccionado === '4') {
        textoPaso.textContent = 'Preparamos una sartén plana con un poco de aceite que podremos untar con una brocha o un trozo de papel (añadir aceite es opcional, las tortitas pueden hacerse sin aceite). Llevamos la sartén al fuego y esperamos hasta que esté caliente. Vertemos una cuchara grande de la masa.';
    } else if (pasoSeleccionado === '5') {
        textoPaso.textContent = 'Dejamos que se haga la tortita por un lado durante unos segundos, el fuego no debe estar muy alto o se nos quemarán. Sabremos que están bien hechas por el lado en que las cocinamos primero, cuando veamos salir burbujas de la masa. Entonces le damos la vuelta y dejamos que se cocine por el otro lado. Seguimos haciendo más tortitas.';
    } else if (pasoSeleccionado === '6') {
        textoPaso.textContent = 'Servimos las tortitas recién hechas con plátano en rodajas y sirope de agave. También podemos guardarlas en la nevera durante un par de días y calentarlas un poco en el microondas o el horno antes de comerlas.';
    } else {
        textoPaso.textContent = ''; // Limpiar el texto si no hay selección
    }
});

// Para cuadro 2: Manejo del select
document.getElementById('pasoSelector2').addEventListener('change', function() {
    const textoPaso = document.getElementById('Texto-De-Opcion2');
    const pasoSeleccionado = this.value;

    if (pasoSeleccionado === '1') {
        textoPaso.textContent = 'Texto de receta';
    } else if (pasoSeleccionado === '2') {
        textoPaso.textContent = 'Has seleccionado el Paso 2. Aquí está la información correspondiente al Paso 2.';
    } else {
        textoPaso.textContent = ''; // Limpiar el texto si no hay selección
    }
});
