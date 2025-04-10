

import React from "react"
import Header from "./Header/Header"
import { Outlet } from "react-router"
import SearchPage from "../pages/SearchPage"
import SearchBar from "./SearchBar/SearchBar"
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm"

import { doc,getDoc, } from "firebase/firestore"
import {auth,db} from "../fireBaseConfig"
import { onAuthStateChanged } from "firebase/auth"

const AuthenticationContext = React.createContext()

export default function Layout(){

    const [authenticationStatus,setAuthenticationStatus] = React.useState(false)
    const [showAuthenticationForm,setShowAuthenticationForm] = React.useState(false)

    const [triggeredFromWatchListText, setTriggeredFromWatchListText] = React.useState(null)
    const [userDetailsState,setUserDetailsState] = React.useState(null)


    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("inside onAuthChanged and user exists");
                setAuthenticationStatus(true);
                setShowAuthenticationForm(false);
    
                // ✅ Fetch username from Firestore
                const fetchUserDetails = async () => {
                    try {
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);
    
                        if (docSnap.exists()) {
                            const userDetailsInDb = docSnap.data();
                            setUserDetailsState(userDetailsInDb.userDetails)
                            // localStorage.setItem("userDetails", JSON.stringify(userDetailsInDb));
                            console.log("user details: ", userDetailsInDb);
                        } else {
                            console.log("No such user in Firestore!");
                        }
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                    }
                };
    
                fetchUserDetails();
            } else {
                console.log("user logged out");
                setAuthenticationStatus(false);
                setUserDetailsState(null)
                // localStorage.removeItem("userDetails");
            }
        });
    
        // ✅ Unsubscribe on unmount
        // return () => unsubscribe();
    }, []);
    
    



    return(
        <>
        <AuthenticationContext.Provider value={{authenticationStatus,setAuthenticationStatus,showAuthenticationForm,setShowAuthenticationForm,userDetailsState}} >
        <div className="layout-page">

            <Header setTriggeredFromWatchListText={setTriggeredFromWatchListText}/>
            <Outlet />

           {showAuthenticationForm &&  <div className="authentication-form-div">
                <AuthenticationForm triggeredFromWatchListText={triggeredFromWatchListText}/>
            </div>}

        </div>
        </AuthenticationContext.Provider>


        </>
    )
}

export {AuthenticationContext} 