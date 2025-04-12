import { ingredientesParaFiltro_export } from "../../Almacenamiento/datos.js";

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
            if (mostrarPorIngredientes || ingredientesParaFiltro_export.length === 0) {
                iconElement.textContent = NumeroVisible;
            } else {
                iconElement.textContent = '';
            }
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
        if (toggle.checked) {
            desplegable.style.display = 'flex';
        } else {
            desplegable.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        const isClickInside = toggle.contains(event.target) || desplegable.contains(event.target) || button.contains(event.target);
        if (!isClickInside) {
            toggle.checked = false; 
            desplegable.style.display = 'none'; 
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const selectores = document.getElementsByClassName('pasoSelector');
    
    for (let i = 0; i < selectores.length; i++) {
        selectores[i].addEventListener('change', function() {
            const pasoSeleccionado = this.value; 
            const idSelector = this.id;
            if (idSelector === 'pasoSelector1') {
                const textoPaso = document.getElementById('Texto-De-Opcion');
                
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
            } else if (idSelector === 'pasoSelector2') {
                const textoPaso = document.getElementById('Texto-De-Opcion2');
                
                if (pasoSeleccionado === '1') {
                    textoPaso.textContent = '';
                } else if (pasoSeleccionado === '2') {
                    textoPaso.textContent = 'Has seleccionado el Paso 2. Aquí está la información correspondiente al Paso 2.';
                } else {
                    textoPaso.textContent = ''; // Limpiar el texto si no hay selección
                }
            }
        });
    }
}); 
