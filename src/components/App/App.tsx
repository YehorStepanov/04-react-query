import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { movieService } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

function App() {
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState<Movie | null>(null);
  const [queryText, setQueryText] = useState<string>("");

  const { data, isFetching, isError, status } = useQuery({
    queryKey: ["movies", queryText, page],
    queryFn: () => movieService(queryText, page),
    enabled: queryText !== "",
    retry: false,
    placeholderData: (prev) => prev,
  });
  useEffect(() => {
    if (status === "success" && data && data.total_results < 1) {
      toast.error("No movies found for your request.");
    }
  }, [status, data]);
  const closeModal = () => {
    setModalData(null);
  };
  const onSelect = (mov: Movie) => {
    setModalData(mov);
  };
  const onSubmit = (value: string) => {
    setPage(1);
    setQueryText(value);
  };
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      {queryText !== "" && data && data?.total_pages > 1 && (
        <ReactPaginate
          pageCount={data?.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {queryText !== "" && data && data?.total_results > 0 && (
        <MovieGrid movies={data?.results} onSelect={onSelect} />
      )}
      {queryText !== "" && isFetching && <Loader />}
      {queryText !== "" && isError && <ErrorMessage />}
      {modalData && <MovieModal movie={modalData} onClose={closeModal} />}
    </>
  );
}

export default App;
