// links API
// Broken outdated link (good to maintain here): http://pokeres.bastionbot.org/images/pokemon/25.png
// functional new link: https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
// ------------------------------------

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(150).fill().map( (_, index) =>  
fetch( getPokemonUrl(index + 1) ).then( response => response.json() )
)

const generateHTML = (pokemons) => pokemons.reduce( (accumulator, { name, id, types } ) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    let pokemonCorrectedId;

    // corrects the ID for the new API link and make it work
    if (id <= 9) {
        pokemonCorrectedId = `00${id}`
    } else {
        if (id <= 99) {
            pokemonCorrectedId = `0${id}`
        } else {
            pokemonCorrectedId = `${id}`
        }
    }

    accumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image " alt="${name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonCorrectedId}.png"/>
                <h2 class="card-title">${id}. ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
        `
    return accumulator;
    }, '' ) // initializing the value for the accumulator with an empty string


const insertPokemonsIntoUl = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
}


const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoUl)




// --------------------------------------
// REFACTORED CODE:
/*
for(let i = 1; i <= 150; i++) { // loop to make 150 requests to the Pokemon API, fetch the 150 pokemons and push them to an array
    pokemonPromises.push(fetch( getPokemonUrl(i) ).then( response => response.json() ))
}
*/

    