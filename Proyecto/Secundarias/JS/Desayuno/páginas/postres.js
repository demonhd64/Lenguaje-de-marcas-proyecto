import { ingredientesParaFiltro_export } from "../../../../Almacenamiento/datos.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { auth } from "../Firebase.js";

console.log(ingredientesParaFiltro_export)

// Función principal de filtrado que considera ambos tipos de filtros
function aplicarFiltros() {
    const cards = document.querySelectorAll('.card');
    let NumeroVisible = 0; // Contador para las tarjetas visibles
    // Verificar si hay ingredientes seleccionados
    const hayIngredientesSeleccionados = ingredientesParaFiltro_export.length > 0;
    // Variable para saber si hay coincidencias
    let hayCoincidencias = false;
    cards.forEach((card, index) => {
        const ingredientesCard = Array.from(card.querySelectorAll(".elementos-ingredientes ul li"))
            .map(li => li.textContent.toLowerCase());
        // Comprobar si la tarjeta contiene algún ingrediente seleccionado
        const mostrarPorIngredientes = hayIngredientesSeleccionados && ingredientesParaFiltro_export.some(filtro =>
            ingredientesCard.some(ingrediente => ingrediente.includes(filtro.toLowerCase()))
        );
        // Si hay ingredientes seleccionados y hay coincidencias, se muestra la tarjeta
        if (mostrarPorIngredientes) {
            card.style.display = "flex";
            card.classList.add("limite");
            NumeroVisible++;
            hayCoincidencias = true; // Hay al menos una coincidencia
        } else {
            // Si no hay ingredientes seleccionados o no hay coincidencias, se muestran todas las tarjetas
            if (!hayIngredientesSeleccionados || !hayCoincidencias) {
                card.style.display = "flex";
                card.classList.add("limite");
                NumeroVisible++;
            } else {
                card.style.display = "none";
                card.classList.remove("limite");
            }
        }
        const iconElement = document.querySelector(`#icon${index + 1}`);
        if (iconElement) {
            iconElement.textContent = hayCoincidencias || !hayIngredientesSeleccionados ? NumeroVisible : '';
        }
    })
};

document.addEventListener('DOMContentLoaded', function() {
    aplicarFiltros();
});

// Función para controlar la visibilidad de las cards
function MirarSiActivo(container) {
    const listaDeChecks = document.getElementsByClassName("opcionCheck");
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector("footer");
    if (container.checked) {
        cards.forEach(function(card) {
            card.style.display = 'none';
            card.classList.remove("activa");
        });
        container.nextElementSibling.style.display = 'flex';
        container.nextElementSibling.classList.add("activa");
        footer.style.display = "none"
    } else {
        const pasoSelector = container.nextElementSibling.querySelector('.pasoSelector');
        const textoPaso = container.nextElementSibling.querySelector('.texto');
        footer.style.display = "flex"

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
    TextoAyuda();
}



window.MirarSiActivo = MirarSiActivo;

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('activo');
    const desplegable = document.querySelector('.desplegable');
    const button = document.querySelector('button');

    button.addEventListener('click', function() {
        toggle.checked = !toggle.checked;
        desplegable.style.display = toggle.checked ? 'flex' : 'none';
    });

    document.addEventListener('click', function(event) {
        const isClickInside = toggle.contains(event.target) || desplegable.contains(event.target) || button.contains(event.target);
        if (!isClickInside) {
            toggle.checked = false;
            desplegable.style.display = 'none';
        }
    });
});

// Manejo de pasos
document.addEventListener('DOMContentLoaded', function () {
    const textosPasos = {
        pasoSelector1: {
            1: 'Poner en un plato la taza de café con un chorrito de licor',
            2: 'Cortar los sobaos pasiegos en libro. Este paso es opcional. Se pueden poner enteros. La capa de sobaos quedará más gruesa.',
            3: 'Mojar los sobaos en el café con el licor. No hay que dejarlos mucho tiempo, porque se deshacen.',
            4: 'Colocar los sobaos en una fuente hasta cubrir el fondo por completo. Aprovechar los trozos pequeños sobrantes para ir cubriendo los huecos que falten.',
            5: 'Preparar la crema: en un bowl mezclar los yogures griegos, el queso mascarpone y el edulcorante al gusto, con movimientos suaves para mantener la cremosidad de la mezcla',
            6: 'Colocar con una espátula o lengua una capa de crema sobre la capa de sobaos.',
            7: 'Ir alternando capas de sobaos y capas de crema hasta llegar al tope de la fuente.',
            8: 'Una vez terminadas todas las capas, espolvorear con un colador una buena capa de cacao en polvo.',
            9: 'Para decorar, partir una onza de chocolate negro en trozos pequeños y esparcir.'
        },
        pasoSelector2: {
            1: 'Empiezo tostando la mantequilla en una sartén hasta que se funda y cambie de color a un color tostado con aroma a avellana. Aquí retiro del fuego. Lo paso a un bowl y agrego la mitad del chocolate (35 gr) para que se funda con el calor de la mantequilla. Integro y añado el cacao amargo. Ya pronta la mezcla de chocolate.',
            2: 'En otro bowl casco los Huevos y añado las dos azúcares. Bato hasta que aeree y cambie de color. Tiene que quedar blanquecino. \n Agrego el aceite, esencia de vainilla al gusto y la mezcla de chocolate. Integro.',
            3: 'Ahora le añado los secos. Tamizo la harina, la pizca de sal, el café y la maizena. Integro. Añado la otra mitad de chips de chocolate (35 gr) y mezclo con movimientos envolventes. Lo paso a un molde de horno 18 cm de diámetro 160 grados por 25 minutos. Cuando salga del horno lo dejo atemperar en una rejilla y corto cuando esté más frío.'
        },
        pasoSelector3: {
            1: 'Lo primero es infusionar la leche y la nata. Si lo queremos más ligero puedes evitar la nata. \n Colocamos en un cazo la leche con la nata, el azúcar, las ramas de canela y la piel de limón. ',
            2: 'Llevamos a ebullición y justo cuando rompa a hervir le damos vueltas para que se disuelva el azúcar y retiramos del fuego. Tapamos y dejamos infusionar unos 20 minutos. ',
            3: 'Cortamos el pan en rebanadas de unos 2 dedos de grosor. ',
            4: 'Escurrimos la leche en una bandeja honda introducimos las rebanadas de pan en la leche. Dejamos unos 20 minutos para que se vaya empapando por completo.',
            5: 'Escurrimos las rebanadas de pan en una rejilla para retirar el exceso de leche.',
            6: 'Las rebozamos en huevo por ambos lados.',
            7: 'Ahora llega el punto clave, derretimos un poco de mantequilla en una sartén antiadherente y doramos en esa mantequilla cada torrija por ambos lados. ',
            8: 'Retiramos a un papel absorbente para retirar el exceso de grasa y por encima podemos poner almíbar, miel, o rebozar en azúcar y canela, eso ya depende de cada casa. '
        },
        pasoSelector4: {
            1: 'Sumergimos las láminas de gelatina en agua durante 5 minutos para hidratarla.',
            2: 'Separamos 20 gramos de nata para montar y le añadimos la gelatina previamente hidratada. ',
            3: 'Con las varillas eléctricas (si las tenemos), montamos el resto de la nata con el azúcar y vamos añadiendo los 20 gramos de nata con gelatina poco a poco.',
            4: 'Vertemos esta mezcla en unos moldes semiesféricos de aproximadamente 2,5 cm de diámetro.',
            5: 'Llevamos al congelador durante mínimo 6 horas. Mientras tanto vamos haciendo la masa. Primero hacemos el relleno ya que lo necesitamos congelado. ',
            6: 'En un bol colocamos la harina de arroz, el azúcar y el agua fría.',
            7: 'Con ayuda de una batidora de varillas mezclamos todos los ingredientes.',
            8: 'Cuando obtengamos una mezcla uniforme, cubrimos el bol con papel film y le abrimos unos agujeros con un tenedor.',
            9: 'Cocinamos la masa en el microondas durante 1 minuto a máxima potencia.',
            10: 'Al pasar el minuto, sacamos la masa, la revolvemos y la volvemos a llevar al microondas por un minuto más.',
            11: 'Repetimos la operación anterior dos veces más para completar un total de 4 rondas en el microondas. Es muy importante ir revolviendo con la espátula entre cada momento de cocción.',
            12: 'Al finalizar la cocción de la masa, la dejamos enfriar un poco y luego la enharinamos con fécula de maíz para que no se nos pegue a las manos al trabajarla.',
            13: 'Tomamos porciones de 125 gramos de masa y las estiramos. Como veis parece chicle.',
            14: 'Colocamos las bolitas de relleno en el centro de cada trozo de masa y luego cerramos el mochi plegando los 4 bordes hacia el centro y apretando con cuidado para que la masa no se rompa.',
            15: 'Enharinamos la base de cada mochi, en donde quedó cerrado, con fécula de maíz para que no se pegue al colocar sobre el plato.  Metemos los mochis a la nevera durante 20 minutos antes de servir.'
        },
        pasoSelector5: {
            1: 'En una olla profunda, combinamos el agua, la mantequilla, el azúcar y la sal. Llevamos la mezcla a fuego alto hasta que comience a hervir.',
            2: 'Una vez rompa a hervir, reducimos a fuego medio y removemos de vez en cuando hasta que la mantequilla se derrita por completo.',
            3: 'Apartamos la olla del fuego y añadimos toda la harina de trigo, tanto la común como la de fuerza juntas y de golpe.',
            4: 'Revolvemos con una cuchara de madera hasta que la harina comience a integrarse a la mezcla. Luego llevamos la olla a fuego medio otra vez.',
            5: 'Con la olla en el fuego, continuamos removiendo la masa sin parar hasta que veamos que se desprende con facilidad. Debemos asegurarnos que la masa quede muy seca.',
            6: 'Veremos como se va formando una bola de masa cada vez más compacta y menos húmeda. Para asegurarnos de que está lista, la tocamos con el dedo y verificamos que salga limpio.',
            7: 'Retiramos la olla del fuego y en el centro de la bola de masa, hacemos un hueco. En este colocamos un huevo y comenzamos a batir con la cuchara de madera para integrarlo completamente a la masa.',
            8: 'Solo hasta que veamos que el huevo se haya integrado completamente a la mezcla, agregamos el siguiente huevo y así sucesivamente con los tres restantes. Debemos conseguir una masa muy espesa, entonces en caso de que con el tercer huevo la masa ya tenga la humedad suficiente, omitimos el cuarto huevo para evitar que quede muy aguada la masa.',
            9: 'Forramos la bandeja con papel para horno.',
            10: 'Tomamos pequeñas porciones de la masa y formamos bolitas de aproximadamente 2 cm de diámetro por 1 cm de alto. Es importante no hacerlas más grandes porque la masa crecerá mucho y se deformará. ',
            11: 'Para formar las bolitas podemos utilizar una manga pastelera con boquilla lisa o ayudarnos con dos cucharitas para ir dándole la forma. ',
            12: 'Colocamos una a una las bolitas sobre la bandeja con el papel para horno, una distanciada de la otra, ya que la masa crecerá en el horno.',
            13: 'Cuando tengamos los profiteroles listos para hornear, cubrimos la bandeja con papel aluminio para que no se vayan a tostar demasiado. Los llevamos a hornear con calor arriba y abajo durante 20 minutos a una temperatura de 220°C. ',
            14: 'Durante los primeros 15 minutos los hornearemos con el papel aluminio y los últimos 5 minutos, los destaparemos para que doren un poco.',
            15: 'Pasado este tiempo, los retiramos del horno y los dejamos enfriar sobre una rejilla.',
            16: 'Con ayuda de una batidora eléctrica, montamos la nata fría junto con el azúcar a velocidad media hasta obtener una crema suave y esponjosa.',
            17: 'Llevamos la crema a una manga pastelera.',
            18: 'En una cacerola a fuego medio, ponemos el chocolate en trozos junto con la mantequilla.',
            19: 'Vamos removiendo hasta que poco a poco ambos ingredientes se comiencen a derretir. Obtendremos mezcla de chocolate líquido.',
            20: 'Con un cuchillo hacemos un corte transversal a cada profiterol. Luego con la manga, los rellenamos de la nata montada.',
            21: 'Para finalizar, con una cuchara chorreamos la salsa de chocolate sobre los profiteroles al gusto o mojamos la parte de arriba.'
        }
    };

    const selectores = document.getElementsByClassName('pasoSelector');

    for (let i = 0; i < selectores.length; i++) {
        selectores[i].addEventListener('change', function () {
            const idSelector = this.id;
            const pasoSeleccionado = this.value;
            const textoPaso = document.getElementById('Texto-De-Opcion' + idSelector.replace('pasoSelector', ''));

            if (!textoPaso) return;

            // Buscamos el texto correspondiente al paso y lo mostramos
            const texto = textosPasos[idSelector]?.[pasoSeleccionado] || '';
            textoPaso.textContent = texto;
        });
    }
});


// Log in

function showModal() {
    const modal = document.getElementsByClassName("modal");
    modal[0].style.display = "flex"

}

document.getElementById("btnIniciarSesion").addEventListener('click', showModal)

// Control cerrar modal

function CerrarModal(){
    const modal = document.getElementsByClassName("modal");
    modal[0].style.display = "none"
}

document.getElementById("CerrarModalLogIn").addEventListener('click', CerrarModal)

//Visibilidad contraseña
let ConstraseñaVisible = false; // Variable para controlar la visibilidad

function eyeLogin() {
    const eyeOpen = document.getElementById("eye-OpenLogin");
    const eyeClosed = document.getElementById("eye-closedLogin");
    const passwInput = document.getElementsByClassName("passw-input")[0];

    // Alternar la visibilidad de la contraseña
    ConstraseñaVisible = !ConstraseñaVisible;

    if (ConstraseñaVisible) {
        passwInput.type = "text"; 
        eyeClosed.style.display = "none"; 
        eyeOpen.style.display = "inline"; 
    } else {
        passwInput.type = "password"; 
        eyeClosed.style.display = "inline"; 
        eyeOpen.style.display = "none";
    }
}

// Asignar el evento a los íconos
document.getElementById("eye-OpenLogin").addEventListener('click', eyeLogin);
document.getElementById("eye-closedLogin").addEventListener('click', eyeLogin);



// Registro
function showModalRegistro() {
    const modal = document.getElementsByClassName("modal");
    modal[1].style.display = "flex" 
}

document.getElementById("btnRegistro").addEventListener('click', showModalRegistro)

// Control cerrar modal

function CerrarModalRegistro(){
    const modal = document.getElementsByClassName("modal");
    modal[1].style.display = "none"
}

document.getElementById("CerrarModalRegistro").addEventListener('click', CerrarModalRegistro)

//Visibilidad contraseña
let ConstraseñaVisibleRegistro = false; // Variable para controlar la visibilidad

function eyeRegistro() {
    const eyeOpen = document.getElementById("eye-OpenRegistro");
    const eyeClosed = document.getElementById("eye-closedRegistro");
    const passwInput = document.getElementsByClassName("passw-input")[1];

    // Alternar la visibilidad de la contraseña
    ConstraseñaVisibleRegistro = !ConstraseñaVisibleRegistro;

    if (ConstraseñaVisibleRegistro) {
        passwInput.type = "text"; 
        eyeClosed.style.display = "none"; 
        eyeOpen.style.display = "inline"; 
    } else {
        passwInput.type = "password"; 
        eyeClosed.style.display = "inline";
        eyeOpen.style.display = "none";
    }
}

// Asignar el evento a los íconos
document.getElementById("eye-OpenRegistro").addEventListener('click', eyeRegistro);
document.getElementById("eye-closedRegistro").addEventListener('click', eyeRegistro);


//Cambio de botones:

const BtnLogSign = document.getElementsByClassName("btnSign")
const LogOut = document.getElementById("LogOut")
const borroso = document.getElementById("need-login")
const cardsborrosas = borroso.querySelectorAll(".card")
const cursoreventLogNec = document.getElementById("need-login")


onAuthStateChanged(auth, async (usuario) => {
    const textoNeedLogIn = document.getElementById("Texto-need-logIn")

    if (usuario){
        BtnLogSign[0].style.display = "none"
        BtnLogSign[1].style.display = "none"
        LogOut.style.display = "flex"
        cardsborrosas.forEach(card => card.style.filter = "none")
        cursoreventLogNec.style.pointerEvents = "auto"
        textoNeedLogIn.style.display = "none"

    }else{
        BtnLogSign[0].style.display = "flex"
        BtnLogSign[1].style.display = "flex"
        LogOut.style.display = "none"
        cardsborrosas.forEach(card => card.style.filter = "blur(5px)")
        cursoreventLogNec.style.pointerEvents = "none"
        textoNeedLogIn.style.display = "block"
    }
})

//Control de textos para cards activas o no:

function TextoAyuda(){
    const Ayuda = document.getElementById("Ayuda")
    const textoNeedLogIn = document.getElementById("Texto-need-logIn")
    const cardsChecked = document.querySelectorAll(".opcionCheck:checked")

    if(cardsChecked.length > 0){
        Ayuda.style.display = "none"
        textoNeedLogIn.style.display = "none"
    } else{
        Ayuda.style.display = "block"
        textoNeedLogIn.style.display = "block"
    }

}
