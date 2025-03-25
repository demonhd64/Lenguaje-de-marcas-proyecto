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