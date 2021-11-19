
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import ShowPage from './ShowPage'
import Loading from '../Loading'
import '../App.css';


const pokomonUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"

interface PokedexData {
  count: number;
  next: string;
  previous: string;
  results: [];
}

const pokemondekData: PokedexData = {
  count: 0,
  next: '',
  previous: '',
  results: []
  }

  
  

function TitlePage() {

  const [urlData, setUrlData] = useState(pokomonUrl);
  const [pokemonData, setPokemonData] = useState<PokedexData>(pokemondekData)

  const query = new URLSearchParams(useLocation().search);
  const id = Number(query.get("page"));
  console.log('page-id', (id - 1) * 20);
  
  

  useEffect(() => {
    
    const fetchData = async () => {
      const result = await fetch(urlData);
      const data = await result.json();
      setPokemonData(data)
    };
    fetchData();
  }, [urlData])

  const previousPage = () => {
    if (pokemonData.previous) {
      setUrlData(pokemonData.previous)
    }
  };
  const nextPage = () => {
    if (pokemonData.next) {
      setUrlData(pokemonData.next);
    }
  };

  return (
    <>
      <Link to="/" className="backHomePage">Home Page</Link>
      {(!pokemonData.results)
        ? <Loading />
        : (
          <>
            <ShowPage pokemon={pokemonData.results} />
            <div className="previous">
              <button className={(pokemonData.previous) ? "backHomePage" : 'disableButton'}
                onClick={previousPage} disabled={(pokemonData.previous) ? false : true}>Previous</button>
            </div>
            <div className="next">
              <button className={(pokemonData.next) ? "backHomePage" : 'disableButton'}
                onClick={nextPage} disabled={(pokemonData.next) ? false : true}>Next</button>
            </div>
          </>)
      }

    </>
  );
}

export default TitlePage;