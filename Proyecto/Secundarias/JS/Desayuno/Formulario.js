
const envio = document.querySelector("#botón");

const inputs = document.querySelector('input[name="Tipodeplato"]:checked') !==null;

const error = document.querySelector('#error')

const inp_desayuno = document.querySelector("#desayuno"); // Para la caja de desayuno

const inp_comida = document.querySelector("#comida"); // Para la caja de comida

const inp_merienda = document.querySelector("#merienda"); // Para la caja de merienda

const inp_cena = document.querySelector("#cena"); // Para la caja de cena

const inp_carnes = document.querySelector("#carnes"); // Para la caja de carnes

const inp_pescados = document.querySelector("#pescados"); // Para la caja de pescados

const inp_vegano = document.querySelector("#vegano"); // Para la caja de vegano

const inp_postres = document.querySelector("#postres"); // Para la caja de postres

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
        error.style.display = "flex"
        setTimeout(function(){
            error.style.display = "none"
        },2000)
    } else{
            if (inp_desayuno.checked) {
        window.open("../html/desayunos.html", "_self");
        } else if(inp_comida.checked){
            window.open("../html/desayunos.html", "_self");
        } else if(inp_merienda.checked){
            window.open("../html/desayunos.html", "_self");
        } else if(inp_cena.checked){
            window.open("../html/desayunos.html", "_self");
        } else if(inp_carnes.checked){
            window.open("../html/desayunos.html", "_self");
        } else if(inp_pescados.checked){
            window.open("../html/desayunos.html", "_self");
        } else if(inp_vegano.checked){
            window.open("../html/desayunos.html", "_self");
        } else if(inp_postres.checked){
            window.open("../html/desayunos.html", "_self");
        }
    }
});
