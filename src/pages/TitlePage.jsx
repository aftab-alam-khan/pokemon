
import { useState } from 'react';
import useFetch from "react-fetch-hook";
import { Link } from "react-router-dom";

import ShowPage from './ShowPage'
import Loading from '../Loading'
import '../App.css';


const pokomonUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"


function TitlePage() {

  const [urlData, setUrlData] = useState(pokomonUrl);
  const { isLoading, data: pokemon } = useFetch(urlData);

  const previousPage = () => {
    if (pokemon.previous) {
      setUrlData(pokemon.previous)
    }
  };
  const nextPage = () => {
    if (pokemon.next) {
      setUrlData(pokemon.next);
    }
  };

  return (
    <>
      <Link to="/" className="backHomePage">Home Page</Link>
      {(isLoading)
        ? <Loading />
        : (
          <>
            <ShowPage pokemon={pokemon.results} />
            <div className="previous">
              <button className={(pokemon.previous) ? "backHomePage" : 'disableButton'}
                onClick={previousPage} disabled={!pokemon.previous}>Previous</button>
            </div>
            <div className="next">
              <button className={(pokemon.next) ? "backHomePage" : 'disableButton'}
                onClick={nextPage} disabled={!pokemon.next}>Next</button>
            </div>
          </>)
      }

    </>
  );
}

export default TitlePage;