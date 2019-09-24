const fetchPokemon = () => {
  const promises = [];

  for(i=1; i<=807; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    // Llenamos el promise con las respuesta de la peticion fetch en formato JSON
    promises.push(fetch(url).then(res => res.json()));
  }

  // Capturamos todas las promesas 150 en una para recorerlas y poder usarlas
  Promise.all(promises).then(results => {
    const pokemon = results.map(result => ({
      name: result.name,
      
      image: result.sprites['front_default'],
      type: result.types.map(type => type.type.name).join(', '),
      experience: result.base_experience,
      ability: result.abilities.map(ability => ability.ability.name).join('--')
    }));
    // console.log(pokemon);
  
    viewSearch(pokemon);
    //displayPokemon(pokemon);
  });
}


const displayPokemon = (pokemon) => {
  const pokedex = document.getElementById('pokedex');
  // Capturamos los datos de los poekomon's usamos .map() para imprmirlo
  // Los convertimos de un array a un string con .join('') 
  const pokemonHTMLstring = pokemon.map(pokeman => 
    `
      <li class="card">
        <img class="card-image" src=${pokeman.image} alt="${pokeman.name}" />
        <h2 class="card-title">${pokeman.name}</h2>
        <span>♀: ${pokeman.ability}</span>
        <p class="card-subtitle">♦ Type: ${pokeman.type}</p>
      </li>
    `
  ).join("");
  
  pokedex.innerHTML = pokemonHTMLstring;
}

/**
 * 
 * Buscamos nuestros favoritos pokemon's por letra inicil***
 * @param {*} pokemon ****************************
 *******************************************************/
const viewSearch = (pokemon) => {
  
  const input = document.querySelector('.search-pokemon');
  const list = document.querySelector('#pokedex');

  let pokemons;

  input.addEventListener('change', (e) => {
    let searchPokemon = pokemon.map(pokeman => {
      //Buscamos Pokemons por letra inicial
      if(e.target.value === pokeman.name.charAt(0)) {
        return `
          <li class="card">
            <h2>Ex: ${pokeman.experience}</h2>
            <img class="card-image" src=${pokeman.image} alt="${pokeman.name}" />
            <h2 class="card-title">${pokeman.name}</h2>
            <span>♀: ${pokeman.ability}</span>
            <p class="card-subtitle">♦ Type: ${pokeman.type}</p>
          </li>
        `
      }
    }).join("");

    list.innerHTML = searchPokemon;
  });
}


fetchPokemon();
