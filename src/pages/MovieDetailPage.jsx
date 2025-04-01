
import React from "react"
import MovieDetail from "../components/MovieDetail/MovieDetail"
import Trailer from "../components/Trailer/Trailer"
import { useLocation } from "react-router"
import styles from "./MovieDetailPage.module.css"
import "../components/Trailer/Trailer.css"


export default function MovieDetailPage(){

          const location = useLocation()
          const [movieDetail,setMovieDetail] = React.useState({})
          const [trailerKey, setTrailerKey] = React.useState("")
          const [loadingState,setLoadingState] = React.useState(true)
          const [errorState,setErrorState] = React.useState(false)

          const optionsForTmdbApi = {
            mehod:"GET",
            
            headers:{
                accept:"application/json",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjM1ODlkOTcxYWZiNzczOTA2YWQ3OTYxNTJmMmEwNCIsIm5iZiI6MTc0MzMwMjM4Ni43NTQsInN1YiI6IjY3ZThhZWYyNzAwYTZhOTRjNmU1MzNhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pvkoH9CoFXrZepu-2alfme1X8NJliRKH90rsj_uuFyo'

            },
            
        }
          console.log("my imdb iddd: "+location.state.imdbId)

    React.useEffect( ()=>{


        window.scrollTo({
            top:0,
            behavior:"smooth"
          })

       

        async function fetchMovieDetail(){
            try{
            const movieDataResponseFromOmdb = await fetch(`https://www.omdbapi.com/?apikey=ee5761a1&i=${location.state.imdbId}`) //movie details are good in omdbApi but no trailer vidoes
            const movieDataFromOmdb = await movieDataResponseFromOmdb.json() //this will be used to display movie details
            
            const mediaType = (movieDataFromOmdb.Type === "movie")?"movie" : "tv" //this is done to make api endpoints dynamic {tv,movie}

            const movieDataResponseFromTmdb = await fetch(`https://api.themoviedb.org/3/find/${movieDataFromOmdb.imdbID}?external_source=imdb_id`,optionsForTmdbApi) //need tmdb id for getting trailer videos. for getting tmdb id, need to find the movie in tmdbAPI. it is found using imdb id because we have imdb id.

            const movieDataFromTmdb = await movieDataResponseFromTmdb.json()

            const tmdbId = movieDataFromTmdb[`${mediaType}_results`][0].id //getting tmdb id fromt tmdb movie details. it is zero indexed because the response is an array which  will be always of size 1.

            const trailerVideoResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${tmdbId}/videos?language=en`, optionsForTmdbApi) // here the videos related to the movie are obtained
            const trailerVideoData = await trailerVideoResponse.json()

            //the first video that is of type "trailer" is obtained
            const trailerURL = trailerVideoData.results.find(video =>{
                if(video.type === "Trailer"){
                    return true
                }
            })
            console.log(trailerURL.key) //key is what must be replaced in youtube links.




    
            setMovieDetail(movieDataFromOmdb)
            setTrailerKey(trailerURL.key)
            setLoadingState(false)
            }
            catch(err){

                setErrorState(true)
                setLoadingState(false)
                console.log("error: "+err)
    
           }
        }
    
            fetchMovieDetail()

       



    },[])


    return(
        <>

            <div className={styles["movie-details-container"]}>
                <div className={styles["details-section"]}>
                {loadingState && <h1>Looading....</h1>}
                {errorState && <h1>Error fetching data</h1>}
                {(!loadingState && !errorState) && <MovieDetail details = {movieDetail}/>}
                </div>


                <div className={styles["trailer-section"]}>
                {(!loadingState && !errorState) && <Trailer src={`https://www.youtube.com/embed/${trailerKey}`}/>}

               
                </div>
            </div>
            

        </>
    )

}