
import styles from "./Header.module.css"
import reelList from "../../assets/reelListLogo.png"
import  ProfileIcon  from "../../assets/profileIcon.png"
import React from "react"
import { useContext } from "react"
import { AuthenticationContext } from "../Layout"
import clsx from "clsx"

import { signOut } from "firebase/auth"
import {auth} from "../../fireBaseConfig"



import { useNavigate } from "react-router"

export default function Header({setTriggeredFromWatchListText}){

    const navigate = useNavigate()
    const {authenticationStatus,setAuthenticationStatus,showAuthenticationForm,setShowAuthenticationForm,userDetailsState} = useContext(AuthenticationContext)

    const [showUserDetails,setShowUserDetails] = React.useState(false) //show logout,username when profile is clicked

    const userDetailsRef = React.useRef(null)

    console.log("user deailt")
    console.log(userDetailsState)

    function navigateToSearchPage(){
        navigate("/")
    }

    React.useEffect(()=>{

        function handleClickAnywhere(e){
            if(!userDetailsRef.current.contains(e.target)){ //click outside anyhere and user details is made hidden
                setShowUserDetails(false)
            }
        }

        document.addEventListener("click",handleClickAnywhere)

    },[])

    function handleClick(e){
        console.log(e.target.tagName)
        if(e.target.className === "watch-list-text" && authenticationStatus===true){

            navigate(`/watchListPage/${userDetailsState.uid}`)

        }else if(e.target.tagName === "IMG" && authenticationStatus === true){
            setShowUserDetails((prev)=>!prev)

        }else if(e.target.tagName === "IMG" && authenticationStatus === false){
            setTriggeredFromWatchListText(false)
            setShowAuthenticationForm(true)
        }else if(e.target.className === "watch-list-text" && authenticationStatus === false){
            setTriggeredFromWatchListText(true)
            setShowAuthenticationForm(true)
        }
    }

    async function handleLogOut(){

        try{
            await signOut(auth)
            console.log("sign out success")
            setShowUserDetails(false)
            navigate("/")
        }catch(err){
            console.log("error is signing out: " + err)
        }


    }


    return(
        <>
            <div className={styles["header-div"]} >

                <div className={styles["header-left"]} onClick={navigateToSearchPage}>

                    <img src={reelList} />
                    <h1>REEL<span>LIST</span></h1>

                </div>

                <div className={styles["header-right"]  }  onClick={handleClick}>

                <p className="watch-list-text">WATCH LIST</p>
                <img src={ProfileIcon}  className={ styles[clsx(showUserDetails&&"selected-profile-icon",(!showUserDetails&&authenticationStatus)&&"green-profile-icon",(!showUserDetails&&!authenticationStatus)&&"red-profile-icon")] } ref={userDetailsRef} />

               {(authenticationStatus) && 
                <div className={clsx(styles["user-details"], showUserDetails && styles["show"])}>
                   
                    {(userDetailsState)&& <p className={styles["user-name"]}>{userDetailsState.userName}</p>}
                    <p className={styles["logout-btn"]} onClick={handleLogOut}>Logout</p>
                </div>}



                </div>

            </div>
        
        </>
    )


}