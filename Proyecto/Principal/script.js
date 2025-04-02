document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('activo');
    const desplegable = document.querySelector('.desplegable');
    const button = document.querySelector('button'); // Selecciona el botón

    // Cambia el estado del checkbox y muestra/oculta el desplegable al hacer clic en el botón
    button.addEventListener('click', function() {
        toggle.checked = !toggle.checked; // Cambia el estado del checkbox
        if (toggle.checked) {
            desplegable.style.display = 'block';
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