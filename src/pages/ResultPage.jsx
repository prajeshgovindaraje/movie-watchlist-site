
import MovieCard from "../components/MovieCard/MovieCard";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieCardList from "../components/MovieCardList/MovieCardList";
import clsx from "clsx";
import React from "react";

import { useLocation,useNavigate,useParams } from "react-router";

import styles from "./ResultPage.module.css"

export default function ResultPage(){

      const navigate = useNavigate()
      const {searchTerm:searchInp} = useParams() //renaming while destructuring. no particular reason.
      console.log("youe serrhced for: "+searchInp)
      // const [searchInp,setSearchInp] = React.useState(searchTerm)
      const [movieCardsArr,setMovieCardsArr] = React.useState([])

      const [isLoading,setIsLoading] = React.useState(false)
      const [isErrorInFetching,setIsErrorInFetching] = React.useState(false)

      //wanted to name this isDataFetched but it doesn't make complete sense, this is used to display the message only after api request is resolved
      // const [isResponseObtained,setIsResponseObtained] = React.useState(false) //realised it is not needed because loading state can replace it.

      let message = `Search results for "${searchInp}"`


      React.useEffect(()=>{

        window.scrollTo({
          top:0,
          behavior:"smooth"
        })

        

        async function fetchData(){
          try{
            setIsLoading(true)
            // setIsResponseObtained(false)

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
            // setIsResponseObtained(true)
  
         } catch(err){
          setIsLoading(false)
          setIsErrorInFetching(true)
          setMovieCardsArr([])
          // setIsResponseObtained(true)

            console.log(err.message)
         }
        }

        fetchData()
        
      },[searchInp]) //searchInp here is essential because, if a new movie is searched, we
      // navigate again to same page with a updated url param. this will not make the useEffect to run again.
      //react will not mount the component again it thinks we are still in the same component, if we navigate 
      // again to the same page. To make the useEffect run again we make it dependent on the url param which is
      // updated when navigated again.



      function onSearch(inpVal){
        if(searchInp.trim()){ //removes all whitespace and check
          navigate(`/resultPage/${inpVal}`)
      }else{
          console.log("enter valid inp")
      }
      }

      //navigate to movie details page
      function handleMovieCardClick(imdbId){
        console.log("imdb id in result page: "+imdbId)
        navigate(`/detailsPage/${imdbId}`,{state:{imdbId:imdbId}})
      }

     

    let tempMovieCardsArr = []
      for(let i = 0; i< movieCardsArr.length; i++){
        tempMovieCardsArr.push(<MovieCard movieDetails={movieCardsArr[i]} handleMovieCardClick={handleMovieCardClick}  />)
      }

        return(
            <>

            <MovieCardList
              isLoading={isLoading}  // isLoading,
              searchInput={searchInp}    // onSearch,
              onSearch={onSearch}    // searchInput,
              messageAfterLoading={message}    // messageAfterLoading,
               isError={isErrorInFetching}   // isError,
                movieCardsArr={tempMovieCardsArr}  // movieCardsArr
            
            
            />
            
            
            </>
        )


}