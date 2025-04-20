
import {AuthenticationContext} from "../components/Layout"
import React from "react"
import { useNavigate,useParams } from "react-router";


import MovieCardList from "../components/MovieCardList/MovieCardList";
import MovieCard from "../components/MovieCard/MovieCard";



import { auth,db } from "../fireBaseConfig";

import { getDoc,doc } from "firebase/firestore";

export default function WatchListPage(){

    const navigate = useNavigate()
    const {userID} = useParams()


    const [isLoading,setIsLoading] = React.useState(true)
    const [isError,setIsError] = React.useState(false)

    const [originalMovieDetailsArr,setOriginalMovieDetailsArr] = React.useState([]) //this contains the entire watchlist. it is used to 
    const [displayMovieDetailsArr,setDisplayMovieDetailsArr] = React.useState([]) // this either has the full watchlist or the searched watchlist

    const [userName,setUserName] = React.useState(null)

    // const userDetails = JSON.parse(localStorage.getItem("userDetails"))

    React.useEffect(()=>{

        async function fetchWatchListMovies(){

            try{
                const userRef = doc(db,"users",userID)
                const userData = (await getDoc(userRef)).data()
                setOriginalMovieDetailsArr(userData.watchList)
                setDisplayMovieDetailsArr(userData.watchList)
                setUserName(userData.userDetails.userName)
                setIsLoading(false)
            }catch(err){
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            }




        }

        fetchWatchListMovies()

    },[])

    function handleMovieCardClick(imdbId){
        console.log("imdb id in result page: "+imdbId)
        navigate(`/detailsPage/${imdbId}`)
      }

    
      function onSearch(searchInp){

        if(searchInp.trim() === ""){
            setDisplayMovieDetailsArr(originalMovieDetailsArr)
            return
        }

        const filteredSearchArr = originalMovieDetailsArr.filter((movie)=>{
            if(movie.Title.trim().toLowerCase().includes(searchInp.trim().toLowerCase())){
                return true
            }
        })

        setDisplayMovieDetailsArr(filteredSearchArr)

      }


    // let dummyMovieDetails = [
    //     {"Title":"Dune","Year":"1984","Rated":"PG-13","Released":"14 Dec 1984","Runtime":"137 min","Genre":"Action, Adventure, Sci-Fi","Director":"David Lynch","Writer":"Frank Herbert, David Lynch","Actors":"Kyle MacLachlan, Virginia Madsen, Francesca Annis","Plot":"A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis to free their desert world from the emperor's rule.","Language":"English","Country":"United States, Mexico","Awards":"Nominated for 1 Oscar. 2 wins & 6 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMGJlMGM3NDAtOWNhMy00MWExLWI2MzEtMDQ0ZDIzZDY5ZmQ2XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.3/10"},{"Source":"Rotten Tomatoes","Value":"36%"},{"Source":"Metacritic","Value":"41/100"}],"Metascore":"41","imdbRating":"6.3","imdbVotes":"185,737","imdbID":"tt0087182","Type":"movie","DVD":"N/A","BoxOffice":"$31,439,560","Production":"N/A","Website":"N/A","Response":"True"},
    //     {"Title":"The Avengers","Year":"2012","Rated":"PG-13","Released":"04 May 2012","Runtime":"143 min","Genre":"Action, Sci-Fi","Director":"Joss Whedon","Writer":"Joss Whedon, Zak Penn","Actors":"Robert Downey Jr., Chris Evans, Scarlett Johansson","Plot":"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.","Language":"English, Russian","Country":"United States","Awards":"Nominated for 1 Oscar. 39 wins & 81 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"91%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"8.0","imdbVotes":"1,500,024","imdbID":"tt0848228","Type":"movie","DVD":"N/A","BoxOffice":"$623,357,910","Production":"N/A","Website":"N/A","Response":"True"},
    //     {"Title":"Interstellar","Year":"2014","Rated":"PG-13","Released":"07 Nov 2014","Runtime":"169 min","Genre":"Adventure, Drama, Sci-Fi","Director":"Christopher Nolan","Writer":"Jonathan Nolan, Christopher Nolan","Actors":"Matthew McConaughey, Anne Hathaway, Jessica Chastain","Plot":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.","Language":"English","Country":"United States, United Kingdom, Canada","Awards":"Won 1 Oscar. 44 wins & 148 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"73%"},{"Source":"Metacritic","Value":"74/100"}],"Metascore":"74","imdbRating":"8.7","imdbVotes":"2,301,429","imdbID":"tt0816692","Type":"movie","DVD":"N/A","BoxOffice":"$203,227,580","Production":"N/A","Website":"N/A","Response":"True"},
    //     {"Title":"Dune","Year":"1984","Rated":"PG-13","Released":"14 Dec 1984","Runtime":"137 min","Genre":"Action, Adventure, Sci-Fi","Director":"David Lynch","Writer":"Frank Herbert, David Lynch","Actors":"Kyle MacLachlan, Virginia Madsen, Francesca Annis","Plot":"A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis to free their desert world from the emperor's rule.","Language":"English","Country":"United States, Mexico","Awards":"Nominated for 1 Oscar. 2 wins & 6 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMGJlMGM3NDAtOWNhMy00MWExLWI2MzEtMDQ0ZDIzZDY5ZmQ2XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.3/10"},{"Source":"Rotten Tomatoes","Value":"36%"},{"Source":"Metacritic","Value":"41/100"}],"Metascore":"41","imdbRating":"6.3","imdbVotes":"185,737","imdbID":"tt0087182","Type":"movie","DVD":"N/A","BoxOffice":"$31,439,560","Production":"N/A","Website":"N/A","Response":"True"},
    //     {"Title":"The Avengers","Year":"2012","Rated":"PG-13","Released":"04 May 2012","Runtime":"143 min","Genre":"Action, Sci-Fi","Director":"Joss Whedon","Writer":"Joss Whedon, Zak Penn","Actors":"Robert Downey Jr., Chris Evans, Scarlett Johansson","Plot":"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.","Language":"English, Russian","Country":"United States","Awards":"Nominated for 1 Oscar. 39 wins & 81 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.0/10"},{"Source":"Rotten Tomatoes","Value":"91%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"8.0","imdbVotes":"1,500,024","imdbID":"tt0848228","Type":"movie","DVD":"N/A","BoxOffice":"$623,357,910","Production":"N/A","Website":"N/A","Response":"True"},
    //     {"Title":"Interstellar","Year":"2014","Rated":"PG-13","Released":"07 Nov 2014","Runtime":"169 min","Genre":"Adventure, Drama, Sci-Fi","Director":"Christopher Nolan","Writer":"Jonathan Nolan, Christopher Nolan","Actors":"Matthew McConaughey, Anne Hathaway, Jessica Chastain","Plot":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.","Language":"English","Country":"United States, United Kingdom, Canada","Awards":"Won 1 Oscar. 44 wins & 148 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.7/10"},{"Source":"Rotten Tomatoes","Value":"73%"},{"Source":"Metacritic","Value":"74/100"}],"Metascore":"74","imdbRating":"8.7","imdbVotes":"2,301,429","imdbID":"tt0816692","Type":"movie","DVD":"N/A","BoxOffice":"$203,227,580","Production":"N/A","Website":"N/A","Response":"True"}




    // ]

    let tempMovieCardArr = displayMovieDetailsArr.map((movie)=>{
        return <MovieCard movieDetails={movie} handleMovieCardClick={()=>{handleMovieCardClick(movie.imdbID)}}/>
    })

    const {authenticationStatus} = React.useContext(AuthenticationContext);
    console.log(authenticationStatus)

    return(
        <>

    
         <MovieCardList
            isLoading={isLoading} 
            movieCardsArr={tempMovieCardArr}
            // searchInput={"due"}
            onSearch={onSearch}
            messageAfterLoading={`${userName}'s Watchlist`}
            isError={isError}
            

          
          />

        </>
    )
}