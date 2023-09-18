const pokemonsList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadstatus = document.getElementById('loadStatusButton')
const pokemonsList1 = document.getElementById('pokemonsList1')
const limit =  10
let offset = 0
const maxRecords = 151


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">
                <a class="nameteste" href="pagina_detalhes.html?id=">
                    ${pokemon.name}
                </a>
            </span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">

            
            </div>
        </li>
    `

        

    
}



function convertPokemonTo(pokemon) {

    
    return ` 
        
    <li class="pokemon ${pokemon.type}">
      
            <ol id = "pokemonsList1" class="pokemons">
                <div class="detailPokemon">
                    <img class = "teste" src="${pokemon.photo}" alt="${pokemon.name}">
                    <h2 >${pokemon.name}:</h2>
                    <p >Number : #${pokemon.number}</p>
                    <p >Types:${pokemon.types.map((type) => `<li ${type}">${type}</li>`).join('')}</p>
                    <p >HP:${pokemon.hp}</p>
                    <p >Attak:  ${pokemon.attak}</p>
                    <p >Defense:  ${pokemon.defense}</p>
                    <p >Weight: ${pokemon.weight}</p>
                    
                    </div>  
            </ol>  
            
    </li>       
            `
}



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonsList.innerHTML += newHtml
    })
}

function loadPokemonItenDetalhe(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonTo).join('')
        pokemonsList1.innerHTML += newHtml
    })
}



loadPokemonItenDetalhe(offset, limit)

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
   offset += limit
   
   const qtdRecordNextPage = offset + limit
   if(qtdRecordNextPage >= maxRecords){
     
    const newLimit = maxRecords- offset; 
    loadPokemonItens(offset,newLimit)
    loadPokemonItenDetalhe(offset,newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
   }else{
    loadPokemonItens(offset, limit)
    loadPokemonItenDetalhe(offset, limit)
   }

   

})

       


