

const fetchPokemon = async () => {

    let nombre = document.getElementById('nombrep');
    let pokeInput = document.getElementById('pokeInput');
    let pokeName = pokeInput.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    let data = await fetch(url).then((res) => {
        if (res.status != "200") {
            limpiaDatos();
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
        let pokeImg = data.sprites.front_default;
        let pokeInfo = data.abilities;
        let pokeType = data.types;
        pokeImage(pokeImg);
        pokeData(pokeInfo);
        dataTypes(pokeType);
    }
}

// Imagen
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("img-poke");
    pokePhoto.src = url;
    pokePhoto.style.height = "100%";
    pokePhoto.style.objectFit = "cover";
}

// Habilidades del pokemon
const pokeData = (abilities) => {
    const pokeAbilities = document.getElementById("abilities");
    const abilitiesName = abilities.map((item) => item.ability.name);
    pokeAbilities.innerHTML = abilitiesName;
}

// Tipo
const dataTypes = (types) => {
    const pokeType = document.getElementById('pokeType');
    const typesName = types.map((item) => item.type.name);
    pokeType.innerHTML = typesName;
}

// Estadísticas
// const pokeStadistics = (stadistics) => {
//     const pokeType = document.getElementById('pokeType');
//     const typesName = stadistics.map((item) => item.type.name);
//     pokeType.innerHTML = typesName;
// }


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
    pokeType.innerHTML = ""
}


// Deshabilitar el boton si no se ha ingresado nada
function validarInput() {
    document.getElementById('btn-buscar').disabled = !document.getElementById('pokeInput').value.length;
}