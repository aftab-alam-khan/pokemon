import '../App.css';
import { Link } from 'react-router-dom';
interface Pokedex {
  pokemon: []
}

const ShowPage = ({ pokemon }: Pokedex) => {
  return (
    <>
      {pokemon.filter((data: { url: string }) => {
        const rejex: any = data.url.match(/\d+/g);
        const capValue = process.env.REACT_APP_CAP_VALUE    // capValue=151
        if (!capValue) {
          throw new Error("Please add environment(.env) variable 'REACT_APP_CAP_VALUE' value")
        }
        return (rejex[1] <= Number(capValue))
      })
        .map((data: { name: string, url: string }, id: number) => {
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