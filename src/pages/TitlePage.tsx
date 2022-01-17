
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import ShowPage from './ShowPage'
import Loading from '../Loading'
import '../App.css';

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

  const [pokemonData, setPokemonData] = useState<PokedexData>(pokemondekData);
  const [offsetValue, setOffsetValue] = useState(0)

  const query = new URLSearchParams(useLocation().search);
  const pageNumber = Number(query.get("page") ?? 1);
  console.log(query.get("page"));
  
  console.log(pageNumber);
  

  const navigate = useNavigate();

  const lastPage = (offsetValue + 20) >= Number(process.env.REACT_APP_CAP_VALUE || '151')

  useEffect(() => {
    
    const newOffset = (pageNumber - 1) * 20;

    if ((pageNumber > 0) && (newOffset < Number(process.env.REACT_APP_CAP_VALUE || '151'))) {
      // if (pageNumber === 0) {
      //   setOffsetValue(0);
      // } else {
        setOffsetValue(newOffset);
      // }
    } else {
      alert('Page not found')
      navigate(-1)
    }

    const pokemonUrl = process.env.REACT_APP_POKEMON_URL || 'https://pokeapi.co/api/v2/pokemon';
    const url = `${pokemonUrl}?offset=${offsetValue}&limit=20`

    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();
      setPokemonData(data)
    };
    fetchData();
  }, [offsetValue, pageNumber, navigate]);

  
  const buttonClass = (pokemonData: string): string => {
    let buttonClassName: string;
    if (lastPage) {
      buttonClassName = 'disableButton';
    } else {
      if (pokemonData) {
        buttonClassName = 'backHomePage';
      }
      else {
        buttonClassName = 'disableButton';
      }
    }
    return buttonClassName;
  };

  // const nextPage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, pageNumber: number): void => {
  //   if (pageNumber > 7) {
  //     return e.preventDefault();
  //   }
  // }

  return (
    <>
      <Link to="/" className="backHomePage">Home Page</Link>
      {(!pokemonData.results)
        ? <Loading />
        : (
          <>
            <div className='showpage'>
              <ShowPage pokemon={pokemonData.results} />
            </div>
            <div className="previous">
              <Link to={`/titlepage?page=${pageNumber - 1}`}
                className={(pokemonData.previous) ? "backHomePage" : 'disableButton'}
                onClick={e => { if (pageNumber === 1) e.preventDefault() }}>
                Previous
              </Link>
            </div>
            <div className="next">
              <Link to={`/titlepage?page=${pageNumber + 1}`}
                className={buttonClass(pokemonData.next)}
                onClick={e => {if(lastPage) e.preventDefault()}}>
                Next
              </Link>
            </div>
          </>)
      }
    </>
  );
}

export default TitlePage;