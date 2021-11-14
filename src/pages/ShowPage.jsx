
import '../App.css';

const ShowPage = ({ pokemon }) => {
  return (
    <>
      {pokemon.map((data, id) => {
        return (
          <div className="TitlePage">
            <p key={id}>
              <a key={id}
                href={data.url}
              >{data.name}</a>
            </p>
          </div>
        )
      })}
    </>
  )
};

export default ShowPage;