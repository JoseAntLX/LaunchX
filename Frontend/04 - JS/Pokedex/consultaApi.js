
// Variable global para el id del pokemon
let gID = 0;

// Agrega los divs de la barra de 
function creaBarras() {
    const csbarra = document.getElementsByClassName("barra-ests");

    for (let i = 0; i < csbarra.length; i++) {
        for (let x = 0; x < 10; x++) {

            const linebar = document.createElement('span');
            linebar.classList.add("line-bar");
            linebar.style.width = "100%";
            linebar.style.height = "10%";
            linebar.style.zIndex = "2";
            linebar.style.borderTop = "solid .5px black";

            csbarra[i].appendChild(linebar);
        }
    }

}

creaBarras();

// Consulta la api de pokemon
const fetchPokemon = async () => {

    let nombre = document.getElementById('nombrep');
    let pokeInput = document.getElementById('pokeInput');
    let pokeName = pokeInput.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    limpiaDatos();

    let data = await fetch(url).then((res) => {
        if (res.status != "200") {
            const pokePhoto = document.getElementById("img-poke");
            pokePhoto.src = "./Img/pokemon-sad.gif"
            nombre.innerHTML = "No encontrado";
        }
        else {
            return res.json();
        }
    });

    if (data) {
        console.log(data);
        nombre.innerHTML = data.name;
        let pokeImg = data.sprites.other.dream_world.front_default;
        let pokeImg2 = data.sprites.other["official-artwork"].front_default;
        let pokeInfo = data.abilities;
        let pokeType = data.types;
        let pokeStadists = data.stats;
        let pokeMov = data.moves;
        let pokeAltura = data.height;
        let pokePeso = data.weight;
        gID = data.id;
        pokeImage(pokeImg, pokeImg2);
        pokeData(pokeInfo);
        dataTypes(pokeType);
        pokeStats(pokeStadists);
        pokeMoves(pokeMov);
        pokeAltPeso(pokeAltura, pokePeso);
    }
}

// Imagen
const pokeImage = (url, url2) => {
    const pokePhoto = document.getElementById("img-poke");

    pokePhoto.style.height = "70%";
    pokePhoto.style.objectFit = "cover";
    pokePhoto.style.top = "10%";
    pokePhoto.style.position = "absolute";

    // comprueba cual de las imagenes esta disponible
    if (url === null) {
        if (url2 === null) {
            pokePhoto.src = "./Img/pokeball.png"
        }
        else {
            pokePhoto.src = url;
        }
    }
    else {
        pokePhoto.src = url;
    }
    if (url !== null) {
        pokePhoto.src = url;
    }
    else if (url2 !== null) {
        pokePhoto.src = url2;
        pokePhoto.style.top = "0";
        pokePhoto.style.height = "80%";
    }
    else {
        pokePhoto.src = "./Img/pokeball.png"
    }

}

// Tipo
const dataTypes = (types) => {

    const typesName = types.map((item) => item.type.name);

    //  agregar un span por cada elemento de typesName
    typesName.forEach((type) => {

        const span = document.createElement("span"); // en cada iteracion crea un span span con la clase
        span.classList.add("cspan");

        span.textContent = type;   // se asigna el valor al span
        const cstype = document.getElementById("cont-type");    // se obtiene la clase para agregarle el span
        cstype.appendChild(span);
    })
}

// Habilidades del pokemon
const pokeData = (abilities) => {

    const abilitiesName = abilities.map((item) => item.ability.name);
    abilitiesName.forEach((ability) => {
        const span = document.createElement("span");
        span.classList.add("cspan", "bar-span");

        span.textContent = ability.replace('-', ' ');
        const csability = document.getElementById("cont-abilities");
        csability.appendChild(span);
    })

}

// Estadísticas
const pokeStats = (stadistics) => {

    //Lista de los elementos de las caracteristicas 
    const pokeStat = document.getElementsByClassName("barra-ests");

    // Obtencion de cada una de las caracteristicas desde fetchPokemon
    const statsName = stadistics.map((item) => item.base_stat);

    // Pasa esos elementos al dom agregandolos individualmente
    statsName.forEach((stat, i) => {

        // Creando el elemento span
        const span = document.createElement("span");
        span.classList.add("cspan");

        span.style.width = "100%";
        span.style.height = `${stat * 0.38}%`;
        span.style.backgroundColor = "#006eff"
        span.style.position = "absolute"
        span.style.bottom = "0"
        pokeStat[i].appendChild(span);
    });
}


// Movimientos
const pokeMoves = (moves) => {
    const pokeMove = document.getElementById('pokeMovs');
    const movesName = moves.map((item) => item.move.name);
    // pokeMove.innerHTML = movesName;

    movesName.forEach((move) => {
        const span = document.createElement("span");
        span.classList.add("cspan");

        span.textContent = move.replace('-', ' ');
        pokeMove.appendChild(span);
    })
}

// Altura y peso
const pokeAltPeso = (altura, peso) => {
    
    const pokeAltura = document.getElementById("altura");

    // Span para la altura
    const spanA = document.createElement("span");
    spanA.classList.add("cspan");
    spanA.textContent = (altura * 0.1).toFixed(1) + " M";
    spanA.style.color = "#ffc400";
    spanA.style.fontFamily = "system-ui";
    spanA.style.fontSize = ".7em";

    const pokePeso = document.getElementById("peso");

    // Span para la altura
    const spanP = document.createElement("span");
    spanP.classList.add("cspan");
    spanP.textContent = (peso * 0.1).toFixed(1) + " Kg";
    spanP.style.color = "#ffc400";
    spanP.style.fontFamily = "system-ui";
    spanP.style.fontSize = ".7em";

    pokeAltura.appendChild(spanA);
    pokePeso.appendChild(spanP);
}


// Borrar los datos cuando se recargue
function limpiaDatos() {

    // Nombre 
    const nombre = document.getElementById('nombrep');
    nombre.innerHTML = "";

    // Imagen
    const pokePhoto = document.getElementById("img-poke");
    pokePhoto.src = "";

    // Estadisticas
    const spans = document.querySelectorAll(".cspan");
    for (let i = 0; i < spans.length; i++) {
        spans[i].remove();
    }

    // Movimientos
    const pokeMovs = document.getElementById('pokeMovs');
    pokeMovs.innerHTML = "";


}

// Cambiar el color cuando se de click
function clicB(obj) {
    obj.style.color = "#3688f9";
    obj.style.backgroundColor = "#3688f9";

    setTimeout(() => {
        obj.style.color = "white";
        obj.style.backgroundColor = "#222222";
    }, 50);
}

// Deshabilitar el boton si no se ha ingresado nada
function validarInput() {
    document.getElementById('btn-buscar').disabled = !document.getElementById('pokeInput').value.length;
}

// Funcion para aumentar el valor del input
function aumentaId() {

    // pasarle el id + 1 al input
    const pokeInput = document.getElementById("pokeInput");
    if (gID < 1000) {
        pokeInput.value = gID + 1;
    }

    // consulta
    fetchPokemon();
}

// Funcion para disminuir el valor del input
function disminuyeId() {

    // pasarle el id + 1 al input
    const pokeInput = document.getElementById("pokeInput");

    if (gID > 1) {
        pokeInput.value = gID - 1;
    }

    // consulta
    fetchPokemon();
}

// cuando se pulse enter en el input de click al boton
function llamaBoton() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            document.getElementById("btn-buscar").click();
        }
    }, { once: true });   // el envento se ejecuta una sola vez
}

// para que el boton no sea focusable
const button = document.getElementById("btn-buscar");
button.addEventListener("focus", () => button.blur());
