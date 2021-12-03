
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Loading from '../Loading'
import '../App.css';


const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState<any>('')
  const { id } = useParams();
  
  const pokemonPageUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const navigate = useNavigate();
  

  useEffect(() => {
    
    const fetchData = () => {
      fetch(pokemonPageUrl)
        .then(r => r.json())
        .then(data => {
          setPokemonData(data)

        })
    };
    fetchData();

  }, [pokemonPageUrl])


  return (
    <>
      <button onClick={() => navigate(-1)} className="backHomePage">Title Page</button>
      {(!pokemonData)
        ? <Loading />
        : (
          <>
            <div className="pokemonContainer">
              <h1>{pokemonData.name}</h1>
              <img className="pokemonImage" src={pokemonData.sprites.other.dream_world.front_default} alt='home' />
              <div>
                <span>Weight: {pokemonData.weight}.</span>
                <span>{pokemonData.types[0].type.name} Pokemon</span>
              </div>
            </div>
          </>)
      }
    </>
  )
}

export default Pokemon;