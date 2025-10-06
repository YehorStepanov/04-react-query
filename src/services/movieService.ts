import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function movieService(value: string, page: number): Promise<MovieResponse>{
    const myKey = import.meta.env.VITE_API_KEY;
    const movies= await axios.get<MovieResponse>('https://api.themoviedb.org/3/search/movie',{
  params: {
    query: value,
    page: page
  },
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
})
    return movies.data;
}