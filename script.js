const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeSprite1 = document.querySelector('[data-poke-img]');
const pokeSprite2 = document.querySelector('[data-poke-img2]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');

const pokeHeight = document.querySelector('[data-poke-height]');
const pokeWeight = document.querySelector('[data-poke-weight]');

const typeColors = {
    bug: '#A8B820',
    dark: '#705848',
    dragon: '#7038F8',
    electric: '#F8D030',
    fairy: '#EE99AC',
    fighting: '#C03028',
    fire: '#F08030',
    flying: '#A890F0',
    ghost: '#705898',
    grass: '#78C850',
    ground: '#E0C068',
    ice: '#98D8D8',
    normal: '#A8A878',
    poison: '#A040A0',
    psychic: '#F85888',
    rock: '#B8A038',
    steel: '#B8B8D0',
    water: '#6890F0',
    default: '#242124'
}


const buscarPokemon = event => {
    event.preventDefault(); // Previene el comportamiento por defecto del navegador, en este caso, previene el evento submit del formulario evitando que se refresque la pagina.
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderizarPokemonData(response))
        .catch(error => renderNotFound());
}
   
const renderizarPokemonData = data => {
    const spriteFront =  data.sprites.front_default;
    const spriteBack = data.sprites.back_default;
    const height = data.height;
    const weight = data.weight;
    const { stats, types , abilities } = data; // Destructuring, se guarda el arreglo que existe en la API de stats y types en variables distintas.

    pokeName.textContent = data.name; 
    pokeSprite1.setAttribute('src', spriteFront); // Le asigno el atributo html src a la imagen, con el sprite correspondiente de la API.
    pokeSprite2.setAttribute('src', spriteBack);
    pokeId.textContent = `Nº: ${data.id}`;
    pokeHeight.textContent = `Height: ${height/10}m`;
    pokeWeight.textContent = `Weight: ${weight/10}kg`;

    setCardColor(types); // Con esta funcion nos encargamos de asignarle un color de fondo al sprite, dependiendo del tipo.
    renderizarPokemonTypes(types);
    renderizarPokemonStats(stats);
    renderizarPokemonAbilities(abilities);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default; // Con el operador ternario Si el pokemon tiene mas de un tipo, se le asigna el color correspondiente al segundo tipo, si no, se le asigna el color default.
    pokeSprite1.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeSprite1.style.backgroundSize = '5px 5px';
    pokeSprite1.style.borderRadius = '50%';
    pokeSprite2.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeSprite2.style.backgroundSize = '5px 5px';
    pokeSprite2.style.borderRadius = '50%';
}



const renderizarPokemonTypes = types => {
    pokeTypes.innerHTML = ''; // Limpio el contenedor de tipos para que no se acumulen los tipos del pokemon anterior.
    types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.style.color = 'white';
        typeElement.textContent = type.type.name;
        typeElement.style.background = typeColors[type.type.name];
        typeElement.style.borderRadius = '20px';
        pokeTypes.appendChild(typeElement);
    });
}

const renderizarPokemonStats = stats => {
    pokeStats.innerHTML = ''; // Limpio el contenedor de stats para que no se acumulen las stats del pokemon anterior.
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementNombre = document.createElement('div');
        const statElementValor = document.createElement('div');
        statElementNombre.textContent = stat.stat.name;
        statElementValor.textContent = stat.base_stat;
        statElement.appendChild(statElementNombre);
        statElement.appendChild(statElementValor);
        pokeStats.appendChild(statElement);
    })
}

const renderNotFound = () => {
    pokeName.textContent = 'Pokemon No encontrado :(';
    pokeSprite1.setAttribute('src', 'https://c.tenor.com/WUEKqaYhVsUAAAAC/pokemon-sad.gif');
    pokeSprite1.style.background =  '#fff';
    pokeSprite1.style.borderRadius = '0px';
    pokeSprite2.setAttribute('src', 'https://c.tenor.com/WUEKqaYhVsUAAAAC/pokemon-sad.gif');
    pokeSprite2.style.background =  '#fff';
    pokeSprite2.style.borderRadius = '0px';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeHeight.textContent = '';
    pokeWeight.textContent = '';
    pokeAbilities.textContent = '';
}

const renderizarPokemonAbilities = abilities => {
    pokeAbilities.innerHTML = ''; // Limpio el contenedor de abilities para que no se acumulen las abilities del pokemon anterior.
    pokeAbilities.textContent = 'Abilities: ';
    abilities.forEach(ability => {
        const abilityElement = document.createElement('div');
        abilityElement.textContent = ability.ability.name;
        pokeAbilities.appendChild(abilityElement);
    });
}

pokeSprite1.addEventListener('click', function () {
    pokeSprite1.style.display = 'none';
    pokeSprite2.style.display = 'block';
} );

pokeSprite2.addEventListener('click', function () {
    pokeSprite1.style.display = 'block';
    pokeSprite2.style.display = 'none';
} );
    
    
