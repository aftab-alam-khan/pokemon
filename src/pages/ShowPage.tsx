import '../App.css';
import { Link } from 'react-router-dom';
interface Pokedex {
  pokemon: []
}

const getPokemonID = (url:string): number => {
  const pokemonID = url.match(/\d+/g);
  if (!pokemonID) {
    throw new Error(`Pokemon id not found in the url '${url}'`)
  }
  return Number(pokemonID[1]);
}

const ShowPage = ({ pokemon }: Pokedex) => {
  return (
    <>
      {pokemon.filter((data: { url: string }) => {
        const pokemonID:number = getPokemonID(data.url);
        const capValue = process.env.REACT_APP_CAP_VALUE    // capValue=151
        if (!capValue) {
          throw new Error("Please add environment(.env) variable 'REACT_APP_CAP_VALUE' value")
        }
        return (pokemonID <= Number(capValue))
      })
        .map((data: { name: string, url: string }, id: number) => {
          const pokemonID:number = getPokemonID(data.url);
          return (
            <div key={id} className="TitlePage">
              <p key={id}>
                <Link to={`/pokemon/${pokemonID}`} className="atag" key={pokemonID}>{data.name}</Link>
              </p>
            </div>
          )
        })}
    </>
  )
};

export default ShowPage;