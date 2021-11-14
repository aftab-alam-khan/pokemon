
import useFetch from "react-fetch-hook";
import { Link } from "react-router-dom";

import Loading from '../Loading'
import '../App.css';

const pokemonPageUrl = "https://pokeapi.co/api/v2/pokemon/1/"
const Pokemon = () => {
  const { isLoading, data: pokemon } = useFetch(pokemonPageUrl)


  return (
    <>
      <Link to="/titlepage" className="backHomePage">Title Page</Link>
      {(isLoading)
        ? <Loading />
        : (
          <>
            <div className="pokemonContainer">
              <h1>{pokemon.name}</h1>
              <img className="pokemonImage" src={pokemon.sprites.other.dream_world.front_default} alt='home' />
              <div>
                <span>Weight: {pokemon.weight}.</span>
                <span>{pokemon.types[0].type.name} Pokemon</span>
              </div>
            </div>
          </>)
      }
    </>
  )
}

export default Pokemon;