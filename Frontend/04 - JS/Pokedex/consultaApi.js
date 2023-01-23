

// Agrega los divs de la barra de 
function creaBarras() {
    const csbarra = document.getElementsByClassName("barra-ests");

    for (let i = 0; i < csbarra.length; i++) {
        for (let x = 0; x < 10; x++) {

            const linebar = document.createElement('span');
            linebar.classList.add("line-bar");
            linebar.style.width = "100%";
            linebar.style.height = "10%";
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
            pokeImage("./Img/pokemon-sad.gif");
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
        let pokeInfo = data.abilities;
        let pokeType = data.types;
        let pokeStadists = data.stats;
        let pokeMov = data.moves;
        pokeImage(pokeImg);
        pokeData(pokeInfo);
        dataTypes(pokeType);
        pokeStats(pokeStadists);
        pokeMoves(pokeMov);
    }
}

// Imagen
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("img-poke");

    // Condicional, si el pokemon no tiene foto
    url === null ? pokePhoto.src = "./Img/pokeball.png" : pokePhoto.src = url;

    pokePhoto.style.height = "70%";
    pokePhoto.style.objectFit = "cover";
    pokePhoto.style.top = "10%";
    pokePhoto.style.position = "absolute";
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

        span.textContent = ability;
        const csability = document.getElementById("cont-abilities");
        csability.appendChild(span);
    })

}

// Estadísticas
const pokeStats = (stadistics) => {

    //Lista de los elementos de las caracteristicas 
    const pokeStat = document.querySelectorAll('#hp, #attack, #defense, #special-attack, #special-defense, #speed');

    // Obtencion de cada una de las caracteristicas desde fetchPokemon
    const statsName = stadistics.map((item) => item.base_stat);

    // Pasa esos elementos al dom agregandolos individualmente
    pokeStat.forEach((stat, i) => {

        // Creando el elemento span
        const spanp = document.createElement("span");
        spanp.classList.add("cspan");

        spanp.textContent = statsName[i];
        stat.appendChild(spanp);
    });

}


// Movimientos
const pokeMoves = (moves) => {
    const pokeMove = document.getElementById('pokeMovs');
    const movesName = moves.map((item) => item.move.name);
    pokeMove.innerHTML = movesName;
}


// Borrar los datos cuando se recargue
function limpiaDatos() {

    // Nombre 
    const nombre = document.getElementById('nombrep');
    nombre.innerHTML = "";

    // Habilidades
    // const pokeAbilities = document.getElementById("abilities");
    // pokeAbilities.innerHTML = "";

    // Imagen
    const pokePhoto = document.getElementById("img-poke");
    pokePhoto.src = "";

    // Tipo
    // const pokeType = document.getElementById('pokeType');
    // pokeType.innerHTML = "";

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
button.addEventListener("focus",() => button.blur());
