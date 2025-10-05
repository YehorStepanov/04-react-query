import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import movieService from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [modalData, setModalData] = useState<Movie | null>(null);
  const [showError, setShowError] = useState(false);
  const [movies, setMovies] = useState<Movie[] | []>([]);

  const closeModal = () => {
    setModalData(null);
  };
  const openModal = (mov: Movie) => {
    setModalData(mov);
  };

  const onSubmit = async (value: string) => {
    try {
      setShowError(false);
      setShowLoader(true);
      setMovies([]);
      const moviesList = await movieService(value);

      if (moviesList.length > 0) {
        setMovies(moviesList);
      } else {
        toast.error("No movies found for your request.");
      }
    } catch {
      setShowError(true);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      {movies.length > 0 && <MovieGrid movies={movies} openModal={openModal} />}
      {showLoader && <Loader />}
      {showError && <ErrorMessage />}
      {modalData && <MovieModal movie={modalData} onClose={closeModal} />}
    </>
  );
}

export default App;
