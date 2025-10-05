import axios from "axios";
import type { Movie } from "../types/movie";



export default async function movieService(value: string): Promise<Movie[]>{
    const myKey = import.meta.env.VITE_API_KEY;
    const movies= await axios.get('https://api.themoviedb.org/3/search/movie',{
  params: {
    query: value
  },
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
})
    return movies.data.results;
}