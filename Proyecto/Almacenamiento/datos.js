// Recuperamos los ingredientes guardados en localStorage
const ingredientesGuardados = JSON.parse(localStorage.getItem("ingredientesSeleccionados")) || [];

// Si quieres hacer algo con los ingredientes, como pasarlos a otro archivo
let ingredientesParaFiltro_export = ingredientesGuardados.map(ingrediente => ingrediente.toLowerCase());


export {ingredientesParaFiltro_export}