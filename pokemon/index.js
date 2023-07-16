
document.addEventListener("DOMContentLoaded", () =>{

    window.addEventListener('load', renderEverything)

   
})

function renderEverything(){
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    fetchKantoPokemon();

 
}

const fetchKantoPokemon = async () => {
    try {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50'); 
        const data = await response.json(); 
        data.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    }
    catch (error) {
        console.error('Error fetching the Pokemons', error);
        }
}


function fetchPokemonData(pokemon){
    let url = pokemon.url 
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
      //  window.alert(pokeData)
        renderPokemon(pokeData)
    })
}


function renderPokemon(pokeData){
    console.log("pokeData   "+pokeData)
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") 
    pokeContainer.classList.add('ui', 'card');
   
    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4') 
    pokeName.innerText = pokeData.name

    //let pokeNumber = document.createElement('p')
    //pokeNumber.innerText = `ID:#${pokeData.id}`
    let pokeWeight = document.createElement('p')
    pokeWeight.innerText = `Weight :${pokeData.weight}`


   
    let pokeAbilities = document.createElement('ul') 
    pokeAbilities.innerText = `Abilities:` ;

    createAbilities(pokeData.abilities, pokeAbilities) 

    let pokeMoves = document.createElement('ul') 
    pokeMoves.innerText = `Moves:` ;

    createMoves(pokeData.moves, pokeMoves) 

    pokeContainer.append(pokeName,  pokeWeight,pokeAbilities,pokeMoves);   
    allPokemonContainer.appendChild(pokeContainer);      
}

function createAbilities(abilities, ul){
    abilities.forEach(function(ability){
        let abilitiesLi = document.createElement('li');
      
     //   typeLi.innerText = `Ability :`;
     abilitiesLi.innerText = ability['ability']['name'];
    
        ul.append(abilitiesLi)
    })
}

function createMoves(moves, ul){
    moves.forEach(function(move){
        let movesLi = document.createElement('li');
      
     //   typeLi.innerText = `Ability :`;
        movesLi.innerText = move['move']['name'];
    
        ul.append(movesLi)

})
}

function createPokeImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.srcset =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}


