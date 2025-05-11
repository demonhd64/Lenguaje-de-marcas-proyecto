// Lee los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const ingredientesGuardados = JSON.parse(params.get("ingredientes") || "[]");

// Puedes usarlos directamente o exportarlos
let ingredientesParaFiltro_export = ingredientesGuardados.map(ingrediente => ingrediente.toLowerCase());

export { ingredientesParaFiltro_export };
