
const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.weight= pokeDetail.weight
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    

    // Extrair HP das estatísticas
    const hpStat = pokeDetail.stats.find((stat) => stat.stat.name === 'hp');
    if (hpStat) {
        pokemon.hp = hpStat.base_stat;
    }

    // Extrair defesa das estatísticas
    const defenseStat = pokeDetail.stats.find((stat) => stat.stat.name === 'defense');
    if (defenseStat) {
        pokemon.defense = defenseStat.base_stat;
    }

    const attakStat = pokeDetail.stats.find((stat) => stat.stat.name === 'attack');
    if (defenseStat) {
        pokemon.attak = attakStat.base_stat;
    }

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {

   return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokemonApiDetailToPokemon)

}


pokeApi.getPokemons = (offset = 0 ,limit = 5 ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    const url1 = `https://pokeapi.co/api/v2/pokemon/1`
    return fetch(url)  
        .then((response) => response.json())
        .then((jsonbody) => jsonbody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        
        .catch((error) => console.error(error))
}


