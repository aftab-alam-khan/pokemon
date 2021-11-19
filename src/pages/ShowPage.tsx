import '../App.css';
import { Link } from 'react-router-dom';

interface Pokedex {
  pokemon: []
}



const ShowPage = ({ pokemon }: Pokedex) => {
  return (
    <>
      {pokemon.map((data: { name: string, url: string }, id: number) => {
        const rejex: any = data.url.match(/\d+/g);
        return (
          <div key={id} className="TitlePage">
            <p key={id}>
              <Link to={`/pokemon/${rejex[1]}`} className="atag" key={rejex[1]}>{data.name}</Link>
            </p>
          </div>
        )
      })}
    </>
  )
};

export default ShowPage;