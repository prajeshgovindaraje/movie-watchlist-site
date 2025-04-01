
import styles from "./MovieDetail.module.css"


export default function MovieDetail({details}){

    return(
        <>


            <div  className={styles["movie-details-container"]}>

                <div className={styles["movie-details-left"]}>
                        <img src={details.Poster}/>
                </div>

                <div className={styles["movie-details-right"]}>

                    <div className={styles["movie-title-div"]}>
                        <h1>{details.Title}</h1>
                        <span style={{"display":"block"}}>IMDB: {details.imdbRating}</span>
                    </div>

                    <p className={styles["movie-description"]}>
                        {details.Plot}
                    </p>

                    <div className={styles["movie-data"]}>

                        <div className={styles["movie-data-left"]}>

                            <p> <span className={styles["bold"]}>Released:</span> {details.Released}</p>
                            <p> <span className={styles["bold"]}>Genre:</span> {details.Genre}</p>
                            <p> <span className={styles["bold"]}>Casts:</span> {details.Actors}</p>


                        </div>
                        <div className={styles["movie-data-right"]}>

                            <p> <span className={styles["bold"]}>Duration:</span> {details.Runtime}</p>
                            <p> <span className={styles["bold"]}>Country:</span> {details.Country}</p>

                            {/* //display director if there exists one else display the writer */}
                            <p> <span className={styles["bold"]}>Director:</span> {(details.Director == "N/A")?details.Writer:details.Director}</p>

                        </div>

                    </div>

                    <button className={styles["add-to-watch-btn"]}>Add to Watchlist</button>


                </div>


            </div>

        
        
        </>
    )

}