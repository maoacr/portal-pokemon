import React, { useState, useEffect } from 'react';
import '../assets/styles/App.scss';

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [poke, setPoke] = useState('');

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

  const handleClick = (abilitiesUrl, pokeName) => {
    if(abilities.length === 0) {
      fetch(`${abilitiesUrl}`)
        .then((response) => {
          const abilitiesArray = response.json();
          console.log(abilitiesArray);
          return abilitiesArray;
        })
        .then((abilitiesArray) => {
          const { abilities } = abilitiesArray;
          console.log(abilities);
          setAbilities(abilities);
        });
    } else {
      setAbilities([]);
    }
    if(!!poke) {
      setPoke('');
    } else {
      setPoke(pokeName);
    }
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
                        pokemon.name === poke ? (
                          <div className='abilityContainer'>
                            {
                              abilities.map((abl, i) => {
                                return (
                                  <h4 className='ability' key={i}>{abl.ability.name}</h4>
                                );
                              })
                            }
                          </div>
                        ) : (
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque excepturi cum repudiandae dolorum vel, qui quaerat nemo totam voluptatibus neque.</p>
                        )
                      }
                    </div>
                    <a onClick={() => handleClick(pokemon.url, pokemon.name)} className='btn'>Ver Habilidades</a>
                  </div>
                </div>
              );
            })
          }
        </div>
      </main>
      <footer>
        <p>Hecho por <a href='https://github.com/maoacr' >@maoacr</a> 👨🏻‍💻</p>
      </footer>
    </>
  );
};

export default App;
