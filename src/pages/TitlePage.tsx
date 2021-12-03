
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import ShowPage from './ShowPage'
import Loading from '../Loading'
import '../App.css';


// const pokomonUrl: string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

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

  // const [urlData, setUrlData] = useState(pokomonUrl);
  const [pokemonData, setPokemonData] = useState<PokedexData>(pokemondekData);

  const query = new URLSearchParams(useLocation().search);
  // const id = Number(query.get("page"));
  // console.log('page-id', (id - 1) * 20);
  const pageNumber = Number(query.get("page"));
  const offsetValue = ((pageNumber -1) * 20) ;
  

  useEffect(() => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offsetValue}&limit=20`
    
    // console.log('url', url);
    
    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();
      setPokemonData(data)
    };
    fetchData();
  }, [offsetValue])

  // const previousPage = () => {
  //   if (pokemonData.previous) {
  //     setUrlData(pokemonData.previous)
  //   }
  // };
  // const nextPage = () => {
  //   if (pokemonData.next) {
  //     setUrlData(pokemonData.next);
  //   }
  // };

  return (
    <>
      <Link to="/" className="backHomePage">Home Page</Link>
      {(!pokemonData.results)
        ? <Loading />
        : (
          <>
            <ShowPage pokemon={pokemonData.results} />
            <div className="previous">
              <Link to={`/titlepage?page=${pageNumber - 1}`}
                className={(pokemonData.previous) ? "backHomePage" : 'disableButton'}>
                Previous
              {/* <button 
                  onClick={previousPage} disabled={(pokemonData.previous) ? false : true}>Previous</button> */}
                </Link>
            </div>
            <div className="next">
              <Link to={`/titlepage?page=${pageNumber + 1}`}
                className={(pokemonData.next) ? "backHomePage" : 'disableButton'}>
                Next
              {/* <button 
                  onClick={nextPage} disabled={(pokemonData.next) ? false : true}></button> */}
                </Link>
            </div>
          </>)
      }

    </>
  );
}

export default TitlePage;