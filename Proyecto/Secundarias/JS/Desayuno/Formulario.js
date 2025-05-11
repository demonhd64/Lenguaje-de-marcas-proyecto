import { mensajes } from "../Desayuno/Tostify.js"

const envio = document.querySelector("#botón");

const inputs = document.querySelector('input[name="Tipodeplato"]:checked') !==null;

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
    localStorage.setItem("ingredientesSeleccionados", JSON.stringify(ingredientesParaFiltro));
    
    if (!inputs){
        mensajes("No has marcado nada","error","null")
    }

    if (inp_desayuno.checked) {
        window.open("../html/desayunos.html", "_self");
    }
});
