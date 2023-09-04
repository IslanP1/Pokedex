const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
maxRecord = 151
const limit = 10
let offset = 0


function convertPokemonTypesLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('   ')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
            `
        ).join('')
        pokemonOl.innerHTML += newHtml
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecords = offset + limit

    if(qtdRecords >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})