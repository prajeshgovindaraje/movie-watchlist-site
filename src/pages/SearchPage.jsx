
import clsx from "clsx"
import SearchBar from "../components/SearchBar/SearchBar"
import styles from "./SearchPage.module.css"
import React from "react"

import { useNavigate } from "react-router"

export default function SearchPage(){

    const navigate = useNavigate()
     
    function onSearch(searchInp){
        if(searchInp.trim()){ //removes all whitespace and check
            navigate("/resultPage",{state:{searchInp:searchInp}})
        }else{
            console.log("enter valid inp")
        }
    }


   


    console.log("search page rendered")

    return(
            <>
            <div className={styles["search-page-container"]}>
                <div className={styles["search-page-top"]}>

                    <div className={styles["search-bar-div"]}> 
                        <SearchBar onSearch={onSearch}/>
                    </div>

                </div>
                <div className={styles["search-page-bottom"]}>
                    
                        <p>
                        Discover, Save, Watch.
                        </p>
                        <p>
                        ReelList  is your personalized movie companion. Simply search any movie, explore its details powered by the OMDB API, and add your favorites to your watchlist. Your watchlist stays secure and accessible anytime with Firebase authentication—so you can keep track of what to watch next, wherever you are.
                        </p>
                    

                </div>

                

            </div>
            </>       
    )


}