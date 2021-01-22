import React, { useState, useEffect } from 'react';
import '../assets/styles/App.scss';

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [abilitiesView, setAbilitiesView] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => {
        const object = response.json();
        return object;
      })
      .then((object) => {
        const pokemons = object.results;
        setPokemons(pokemons);
      });
  }, []);

  const handleClick = (abilitiesUrl) => {
    fetch(`${abilitiesUrl}`)
      .then((response) => {
        const abilitiesArray = response.json();
        console.log(abilitiesArray)
        return abilitiesArray;
      })
      .then((abilitiesArray) => {
        const { abilities } = abilitiesArray;
        console.log(abilities);
        setAbilities(abilities);
        setAbilitiesView(!abilitiesView);
        console.log(abilitiesView);
      });
  };

  return (
    <>
      <header>
        <h1>Lista de Pokemones</h1>
        <h2>Aquí tienes tus pokemones</h2>
      </header>
      <main>
        <div className='cardContainer'>
          {
            pokemons.map((pokemon, i) => {
              return (
                <div key={`pokemon-${i}`} className='card'>
                  <div className='cardHeader'>
                    <h3>{pokemon.name}</h3>
                  </div>
                  <div className='cardBody'>
                    <div className='data'>
                      {
                        abilitiesView ? (
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque excepturi cum repudiandae dolorum vel, qui quaerat nemo totam voluptatibus neque. Temporibus, minus. Inventore optio quae ea qui soluta recusandae officiis.</p>
                        ) : (
                          <h4>Habilidades</h4>
                        )
                      }
                    </div>
                    <a onClick={() => handleClick(pokemon.url)} className='btn'>Ver Habilidades</a>
                  </div>
                </div>
              );
            })
          }
        </div>
      </main>
    </>
  );
};

export default App;
