function MirarSiActivo(el) {
    var listaDeChecks = document.getElementsByClassName("opcionCheck");
    var cards = document.querySelectorAll('.card');
    
    // Si el checkbox que se clickeó ya está marcado
    if (el.checked) {
        // Ocultar todas las cards
        cards.forEach(function(card) {
            card.style.display = 'none'; 
        });
        // Mostrar solo la card que se marque
        el.nextElementSibling.style.display = 'flex'; 
    } else {
        // Si están todas desmarcadas, que aparezcan todas
        let AlgunaMarcada = Array.from(listaDeChecks).some(check => check.checked);
        if (!AlgunaMarcada) {
            cards.forEach(function(card) {
                card.style.display = 'flex'; 
            });
        }
    }
}

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
    document.addEventListener('click'/* Comprueba si se hace la opcion click y ejecuta la funcion siguiente */, function(event) {
        const isClickInside = toggle.contains(event.target) || desplegable.contains(event.target) || button.contains(event.target); // Opciones permitidas de hacer click dentro. (Los nombres son los de las constantes)
        if (!isClickInside) { // Si se detecta el click en cualquier otro que no sea el de los permitidos se desmarca el checkbox y el display en none.
            toggle.checked = false; // Desmarcar el checkbox
            desplegable.style.display = 'none'; // Ocultar el desplegable
        }
    });
});
