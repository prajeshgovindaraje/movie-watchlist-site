
import styles from "./MovieCard.module.css"
export default function MovieCard({movieDetails,width="200px"}){

  console.log({width})

  


    return(
  
      <>

        {/* //{width:width} => {width} */}
        <div className={styles["movie-card-container"]} style={{width}}> 
          
          <div className={styles["movie-poster-div"]}>
            <img src={movieDetails.Poster}/>
          </div>
  
          <div className={styles["movie-card-title"]}>
            <h1>{movieDetails.Title}</h1>
          </div>
  
          <div className={styles["movie-card-bottom"]}>
            <p>{movieDetails.Year}</p>
            <span>{movieDetails.Type}</span>
  
          </div>
  
        </div>
      
      </>
  
    )
  
  
  
  }