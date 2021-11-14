import Pokemon from './Pokemon'
import '../App.css';
import { Link } from 'react-router-dom';

const ShowPage = ({ pokemon }) => {
  return (
    <>
      {pokemon.map((data, id) => {
        return (
          <div key={id} className="TitlePage">
            <p key={id}>
            <Link to="/pokemon" className="atag" key={id}>{data.name}</Link>
            </p>
          </div>
        )
      })}
    </>
  )
};

export default ShowPage;