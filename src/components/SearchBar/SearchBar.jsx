
import SearchIcon from "../../assets/searchIcon.png"
import React from "react"
import styles from "./SearchBar.module.css"


export default function SearchBar({onSearch,searchInput=""}){

    console.log("seathc inp in watchlist page")
    console.log(searchInput)
    const [inpVal,setInpVal] = React.useState(searchInput)

    function handleChange(e){
        setInpVal(e.target.value)
    }

    function handleEnterPress(e,inpVal){
        if(e.key === "Enter"){
            onSearch(inpVal)
        }
    }

  




    // React.useEffect(()=>{

    //     fetch(`https://www.omdbapi.com/?apikey=ee5761a1&t=batman&page=1`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     })

    // },[])

    // function handleSubmit(){
    //     console.log(inpVal)
    //     fetch(`https://www.omdbapi.com/?apikey=ee5761a1&s=${inpVal}`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     })
        
    // }



    return(
        <>
        <div className={styles["searchBar-container"]}>
            <img src={SearchIcon} className={styles["search-icon"]} />
            <input type="text" className={styles["searchBar-input"]} onKeyUp={(e)=>{handleEnterPress(e,inpVal)}} placeholder={"Enter a movie to search"} value={inpVal} onChange={handleChange}/>
            <button onClick={()=>{onSearch(inpVal)}}  className={styles["searchBar-btn"]}>SEARCH</button>

        </div>
        </>

    )

}