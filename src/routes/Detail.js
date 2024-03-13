import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.large_cover_image} alt={movie.title}></img>
      <div>
        <span>rating: {movie.rating}</span>
        <span>runtime: {movie.runtime}</span>
        <span>like: {movie.like_count}</span>
      </div>
      <ul>
        {movie.genres
          ? movie.genres.map((g) => <li key={movie.id}>{g}</li>)
          : null}
      </ul>
      <p>{movie.description_full}</p>
    </div>
  );
}
export default Detail;
