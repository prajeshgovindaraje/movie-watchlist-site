import styles from "./MovieCardList.module.css"
import SearchBar from "../../components/SearchBar/SearchBar";

import clsx from "clsx"


export default function MovieCardList({
    isLoading,
    onSearch,
    searchInput,
    messageAfterLoading,
    isError,
    movieCardsArr
}){
    return(
        <>

        <main className={styles["result-page-main-container"]}>

        <div className={styles[`search-bar-div`] +" "+ styles[clsx({"search-bar-div-blink-effect":isLoading})]}><SearchBar onSearch={onSearch} searchInput={searchInput}/></div>

       {(!isLoading)?<p>{messageAfterLoading}</p>:<p>Searching...</p>} 
       {(!isLoading) &&  <div className={styles["movie-cards-container"]}> {(movieCardsArr.length > 0)?movieCardsArr:"NO MOVIES FOUND"} </div> }

      { (isError && !isLoading)&& <h1>Holy cow!!</h1>}

        </main>
        
        
        </>
    )
}