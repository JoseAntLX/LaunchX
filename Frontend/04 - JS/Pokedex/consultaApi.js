

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
    const pokeType = document.getElementById('pokeType');
    const typesName = types.map((item) => item.type.name);
    pokeType.innerHTML = typesName;
}

// Habilidades del pokemon
const pokeData = (abilities) => {
    const pokeAbilities = document.getElementById("abilities");
    const abilitiesName = abilities.map((item) => item.ability.name);
    pokeAbilities.innerHTML = abilitiesName;
}

// Estadísticas
const pokeStats = (stadistics) => {

    //Lista de los elementos de las caracteristicas 
    const pokeStat = document.querySelectorAll('#hp, #attack, #defense, #special-attack, #special-defense, #speed');

    // Obtencion de cada una de las caracteristicas desde la api
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
    const pokeAbilities = document.getElementById("abilities");
    pokeAbilities.innerHTML = "";

    // Imagen
    const pokePhoto = document.getElementById("img-poke");
    pokePhoto.src = "";

    // Tipo
    const pokeType = document.getElementById('pokeType');
    pokeType.innerHTML = "";

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
    }, {once: true});   // el envento se ejecuta una sola vez
}