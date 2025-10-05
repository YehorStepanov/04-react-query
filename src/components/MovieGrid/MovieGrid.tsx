import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[],
  openModal: (mov: Movie)=>void
}

export default function MovieGrid({ movies, openModal}: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie: Movie) => {
        return (
          <li key={movie.id} onClick={()=>openModal(movie)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
