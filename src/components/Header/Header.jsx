
import styles from "./Header.module.css"
import reelList from "../../assets/reelListLogo.png"
import profileIcon from "../../assets/profileIcon.png"

import { useNavigate } from "react-router"

export default function Header(){

    const navigate = useNavigate()


    function navigateToSearchPage(){
        navigate("/")
    }


    return(
        <>
            <div className={styles["header-div"]} >

                <div className={styles["header-left"]} onClick={navigateToSearchPage}>

                    <img src={reelList} />
                    <h1>REEL<span>LIST</span></h1>

                </div>

                <div className={styles["header-right"]}>

                <img src={profileIcon}  />
                <p>LOGIN</p>

                </div>

            </div>
        
        </>
    )


}