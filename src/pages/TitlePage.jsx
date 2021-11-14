
import useFetch from "react-fetch-hook";
import {
  Link
} from "react-router-dom";

import ShowPage from './ShowPage'
import Loading from '../Loading'
import '../App.css';


const pokomonUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"


function TitlePage() {
  const {isLoading, data: pokemon} = useFetch(pokomonUrl);
  
  return (
    <>
      <Link to="/" className="backHomePage">Home Page</Link>
      {(isLoading)
        ? <Loading />
        : <ShowPage pokemon={pokemon.results} />
      }
    </>
  );
}

export default TitlePage;