import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps{
  onSubmit: (value: string)=>void
}

export default function SearchBar({onSubmit}: SearchBarProps) {
  const checkForm = (formData:FormData) =>{
    let value = formData.get('query') as string;
    value = value.trim();
      if(value){
          onSubmit(value);
          
      }else{
        toast.error("Please enter your search query.")
      }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={checkForm} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
      <Toaster />
    </header>
  );
}
