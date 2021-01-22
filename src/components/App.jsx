import React, { useState, useEffect } from 'react';
import '../assets/styles/App.scss';

const App = () => {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokedex/')
      .then((response) => {
        const object = response.json();
        return object;
      })
      .then((object) => {
        const pokemons = object.results;
        setPokemons(pokemons);
      });
  }, []);

  const handleClick = () => {
    console.log('Click');
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque excepturi cum repudiandae dolorum vel, qui quaerat nemo totam voluptatibus neque. Temporibus, minus. Inventore optio quae ea qui soluta recusandae officiis.</p>
                    <a onClick={handleClick} className='btn'>Ver Habilidades</a>
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
