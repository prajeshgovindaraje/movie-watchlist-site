
import React from "react"
import MovieDetail from "../components/MovieDetail/MovieDetail"
import Trailer from "../components/Trailer/Trailer"
import { useLocation,useParams } from "react-router"
import styles from "./MovieDetailPage.module.css"
import "../components/Trailer/Trailer.css"
import { AuthenticationContext } from "../components/Layout"
import { useContext } from "react"


import {db} from "../fireBaseConfig"
import { doc,collection,updateDoc,getDoc,arrayUnion,arrayRemove } from "firebase/firestore"


export default function MovieDetailPage(){

          const{authenticationStatus,setShowAuthenticationForm,userDetailsState} = useContext(AuthenticationContext)

          const {movieID} = useParams() //gets the imdbID from the url
          const [movieDetail,setMovieDetail] = React.useState({})
          const [trailerKey, setTrailerKey] = React.useState("")
          const [loadingState,setLoadingState] = React.useState(true)
          const [errorState,setErrorState] = React.useState(false)
          const [addedToWatchList,setAddedToWatchList] = React.useState(null)
          const [addToWatchlistLoading,setAddToWatchlistLoading] = React.useState(null)
          const userDetails = JSON.parse(localStorage.getItem("userDetails"))


          const optionsForTmdbApi = {
            mehod:"GET",
            
            headers:{
                accept:"application/json",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjM1ODlkOTcxYWZiNzczOTA2YWQ3OTYxNTJmMmEwNCIsIm5iZiI6MTc0MzMwMjM4Ni43NTQsInN1YiI6IjY3ZThhZWYyNzAwYTZhOTRjNmU1MzNhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pvkoH9CoFXrZepu-2alfme1X8NJliRKH90rsj_uuFyo'

            },
            
        }
          console.log("my imdb iddd: "+movieID)

          let buttonText = ""
          if(addToWatchlistLoading){
            buttonText = "Loading..."
          }
          else if(addedToWatchList){
            buttonText = "Remove from Watchlist"
          }else if(!addedToWatchList){
            buttonText = "Add to Watchlist"
          } 
    
    React.useEffect( ()=>{
        

        window.scrollTo({
            top:0,
            behavior:"smooth"
          })

       

        async function fetchMovieDetail(){
            try{

            console.log("media type")

            const movieDataResponseFromOmdb = await fetch(`https://www.omdbapi.com/?apikey=ee5761a1&i=${movieID}`) //movie details are good in omdbApi but no trailer vidoes
            const movieDataFromOmdb = await movieDataResponseFromOmdb.json() //this will be used to display movie details
            
            const mediaType =  (movieDataFromOmdb.Type === "movie")?"movie" : "tv" //this is done to make api endpoints dynamic {tv,movie}
            console.log("media type"+mediaType)
            const movieDataResponseFromTmdb = await fetch(`https://api.themoviedb.org/3/find/${movieDataFromOmdb.imdbID}?external_source=imdb_id`,optionsForTmdbApi) //need tmdb id for getting trailer videos. for getting tmdb id, need to find the movie in tmdbAPI. it is found using imdb id because we have imdb id.

            const movieDataFromTmdb = await movieDataResponseFromTmdb.json()

            const tmdbId = movieDataFromTmdb[`${mediaType}_results`][0].id //getting tmdb id fromt tmdb movie details. it is zero indexed because the response is an array which  will be always of size 1.
            console.log("TMDB id: "+ tmdbId)
            const trailerVideoResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${tmdbId}/videos?language=en`, optionsForTmdbApi) // here the videos related to the movie are obtained
            const trailerVideoData = await trailerVideoResponse.json()

            //the first video that is of type "trailer" is obtained
            const trailerURL = trailerVideoData.results.find(video =>{
                if(video.type === "Trailer" || video.type === "Clip"){
                    return true
                }
            })
            console.log(trailerURL.key) //key is what must be replaced in youtube links.




    
            setMovieDetail(movieDataFromOmdb)
            setTrailerKey(trailerURL.key)
            await checkMovieAlreadyAdded(movieDataFromOmdb)

            setLoadingState(false)


            }
            catch(err){

                setErrorState(true)
                setLoadingState(false)
                console.log("error: "+err)
    
           }
        }


        async function checkMovieAlreadyAdded(moveDetails){
            try{
                const userRef = doc(db, "users", userDetailsState.uid) //user document refernce
                const userData = (await getDoc(userRef)).data()

                const isAdded = userData.watchList.some((movie)=>movie.imdbID === moveDetails.imdbID)

                if(isAdded){
                    setAddedToWatchList(true)
                }
                
                console.log("movie is already in you watchlist")
    
    
            }catch(err){
                console.log("cannot checkMovieAlreadyAdded: "+err)
    
            }
        }

    
            fetchMovieDetail()


       



    },[])


    //handling add to watchlist button and remove from watchlist button
    async function handleWatchListButton(){

        if(!authenticationStatus){
            setShowAuthenticationForm(true)
            return
        }



        setAddToWatchlistLoading(true)

        if(!addedToWatchList){

            try{
                const userRef = doc(db, "users", userDetailsState.uid);

                await updateDoc(userRef, {
                    watchList: arrayUnion(movieDetail)
                });
                console.log("moivie added")
                setAddedToWatchList(true)
                setAddToWatchlistLoading(false)


            }catch(err){
                console.log("cannot add to watchList: "+err)
                setAddToWatchlistLoading(false)
                setAddedToWatchList(false)



            }


        }else{

            try{

                const docRef = doc(db,"users",userDetailsState.uid)

                await updateDoc(docRef,{
                    watchList: arrayRemove(movieDetail)
                    
                })
                console.log("moivie removed")
                setAddedToWatchList(false)
                setAddToWatchlistLoading(false)

            }catch(err){
                console.log("moivie cannot be removed")

                console.log(err)
                setAddToWatchlistLoading(false)
                setAddedToWatchList(true)
            }

        }
    }
    


    return(
        <>

            <div className={styles["movie-details-container"]}>
                <div className={styles["details-section"]}>
                {loadingState && <h1>Looading....</h1>}
                {errorState && <h1>Error fetching data</h1>}
                {(!loadingState && !errorState) && <MovieDetail details = {movieDetail}/>}
                </div>

                {(!loadingState && !errorState) && 
                     <button disabled={addToWatchlistLoading} className={styles["add-to-watch-btn"]} onClick={handleWatchListButton}>
                        {buttonText}
                    </button>
                }


                <div className={styles["trailer-section"]}>
                {(!loadingState && !errorState) && <Trailer src={`https://www.youtube.com/embed/${trailerKey}`}/>}

               
                </div>
            </div>
            

        </>
    )

}