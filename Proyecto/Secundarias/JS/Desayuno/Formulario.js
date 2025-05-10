const envio = document.querySelector("#botón");

const inp_desayuno = document.querySelector("#desayuno"); // Para la caja de desayuno

const IngredientesElegido = document.querySelector("#ingredientes");

let ingredientesParaFiltro = [];

IngredientesElegido.addEventListener("change", function() {
    // Esto hace que el objeto html que contiene los options se comporte como un array
    // para luego que solamente obtenga las opciones seleccionadas y de ellas recorrerlas y coger su valor
    // y lo guarde en la variable ingredientesParaFiltro
    ingredientesParaFiltro = Array.from(this.options)
        .filter(option => option.selected)
        .map(option => option.value);
});

envio.addEventListener("click", function() {
    // Guardamos los ingredientes seleccionados en localStorage
    //No te lo voy a explicar porque es locura basicamente se guarda en memoria local del ordenador de cache
    localStorage.setItem("ingredientesSeleccionados", JSON.stringify(ingredientesParaFiltro));

    if (inp_desayuno.checked) {
        window.open("../html/desayunos.html", "_self");
    }
});
