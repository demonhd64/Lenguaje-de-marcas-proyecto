function MirarSiActivo(el) {
    var listaDeChecks = document.getElementsByClassName("opcionCheck");
    
    // Si el checkbox que se clickeó ya está marcado
    if (el.checked) {
        // Desmarcar todos los demás checkboxes
        for (var i = 0; i < listaDeChecks.length; i++) {
            if (listaDeChecks[i] !== el) {
                listaDeChecks[i].checked = false; // Desmarcar otros
            }
        }
    }
}