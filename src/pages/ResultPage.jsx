
import MovieCard from "../components/MovieCard/MovieCard";
import SearchBar from "../components/SearchBar/SearchBar";
import clsx from "clsx";
import React from "react";

import { useLocation } from "react-router";

import styles from "./ResultPage.module.css"

export default function ResultPage(){

      const location = useLocation()
      const [searchInp,setSearchInp] = React.useState(location.state.searchInp)
      const [movieCardsArr,setMovieCardsArr] = React.useState([])

      const [isLoading,setIsLoading] = React.useState(false)
      const [isErrorInFetching,setIsErrorInFetching] = React.useState(false)

      //wanted to name this isDataFetched but it doesn't make complete sense, this is used to display the message only after api request is resolved
      const [isResponseObtained,setIsResponseObtained] = React.useState(false) 

      let message = `Search results for "${searchInp}"`


      React.useEffect(()=>{

        async function fetchData(){
          try{
            setIsLoading(true)
            setIsResponseObtained(false)

            await new Promise(resolve => setTimeout(resolve, 3000)); //api fetch is fast so iam delaying to show my loading state
  
            let res = await fetch(`https://www.omdbapi.com/?apikey=ee5761a1&s=${searchInp}`)
                if(!res.ok){
                    throw new Error("network problem") //netwrok error, any server or backend error
                }
  
            let data = await res.json() 
            if(data.Response === "False"){ //Response is a key in the api response . (confusion in naming response)
              throw new Error(`no results found for ${searchInp}`)
            }
            console.log(data.Response)
            setMovieCardsArr(data.Search)

            setIsErrorInFetching(false)
            setIsLoading(false)
            setIsResponseObtained(true)
  
         } catch(err){
          setIsLoading(false)
          setIsErrorInFetching(true)
          setMovieCardsArr([])
          setIsResponseObtained(true)

            console.log(err.message)
         }
        }

        fetchData()
        
      },[searchInp])


      function onSearch(inpVal){
        setSearchInp(inpVal)
      }

     

    let tempMovieCardsArr = []
      for(let i = 0; i< movieCardsArr.length; i++){
        tempMovieCardsArr.push(<MovieCard movieDetails={movieCardsArr[i]}  />)
      }

        return(
            <>

            <main className={styles["result-page-main-container"]}>

            <div className={styles[`search-bar-div`] +" "+ styles[clsx({"search-bar-div-blink-effect":isLoading})]}><SearchBar onSearch={onSearch} searchInput={location.state.searchInp}/></div>

           {(isResponseObtained)?<p>{message}</p>:<p>Searching...</p>} 

          { (!isErrorInFetching)? <div className={styles["movie-cards-container"]}> {tempMovieCardsArr} </div>:<h1>Holy cow!!</h1>}

            </main>
            
            
            </>
        )


}