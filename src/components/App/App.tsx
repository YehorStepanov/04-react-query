import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import movieService from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [modalData, setModalData] = useState<Movie | null>(null);
  const [showError, setShowError] = useState(false);
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [queryText, setQueryText] = useState<string>("");

  const { data, isLoading, isError, status} = useQuery({
    queryKey: ["movies", queryText, page],
    queryFn: () => movieService(queryText, page),
    enabled: queryText !== "",
    retry: false,
  });
  useEffect(() => setMovies([]), [queryText]);
  useEffect(() => {
    setShowLoader(isLoading);
    if (isError) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    if (status === "success" && data.total_results <1) {
      toast.error("No movies found for your request.");
    }
    
    if (status === "success" && data.total_results>0) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }
  }, [isLoading, isError, status, data]);
  const closeModal = () => {
    setModalData(null);
  };
  const openModal = (mov: Movie) => {
    setModalData(mov);
  };
  const onSubmit = (value: string) => {
    setQueryText(value);
  };
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      {totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />}
      {movies.length > 0 && <MovieGrid movies={movies} openModal={openModal} />}
      {showLoader && <Loader />}
      {showError && <ErrorMessage />}
      {modalData && <MovieModal movie={modalData} onClose={closeModal} />}
    </>
  );
}

export default App;
