
import "./AuthenticationForm.css"
import React from "react"
import { useContext } from "react"
import { AuthenticationContext } from "../Layout"
import { useNavigate } from "react-router"

import {auth} from "../../fireBaseConfig.js"
import {db} from "../../fireBaseConfig.js"

import { collection,addDoc,setDoc,doc} from "firebase/firestore"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"



export default function AuthenticationForm({triggeredFromWatchListText}){




    const [formType,setFormType] = React.useState("login")
    const navigate = useNavigate()

    const {setShowAuthenticationForm,setAuthenticationStatus} = React.useContext(AuthenticationContext)

    // type="signup"

    async function handleSubmit(formData){
        console.log("form submitted")
        const fullName = formData.get("fullNameInp")
        const email = formData.get("emailInp")
        const password = formData.get("passWordInp")

        try{

            if(formType === "signup"){
                const userDetails = await createUserWithEmailAndPassword(auth,email , password)
                console.log("sign up success::::")
                console.log(userDetails)
                // setAuthenticationStatus(true)
                // setShowAuthenticationForm(false) // these can be managed automatically by onAuthStateChange function in layout

                if(triggeredFromWatchListText) navigate(`/watchListPage/${userDetails.user.uid}`) //else stay in the same page

                const userDetailsInDb = {
                    email:userDetails.user.email,
                    uid:userDetails.user.uid,
                    userName:fullName
                }
                //add userDetails to firestore 
                await setDoc(doc(db,"users",userDetails.user.uid),{

                    userDetails:userDetailsInDb,
                    watchList:[]

                })

              

                
            }else{
                const userDetails = await signInWithEmailAndPassword(auth,email , password)
                console.log("login success::::")

                // console.log(userDetails)

                if(triggeredFromWatchListText) navigate(`/watchListPage/${userDetails.user.uid}`) //else stay in the same page
                //setAuthenticationStatus(true)     // these can be managed automatically by onAuthStateChange function in layout
                //setShowAuthenticationForm(false)  //it is executed still because react doesn't navigate immediately . it waits unitl the function is completed.


            }


        }catch(err){
            console.log(err)
        }
    }

    function handleFormTypeSwitch(e){
        setFormType((prev)=>{
            if(prev === "signup"){
                return "login"
            }else{
                return "signup"
            }
        })
    }

    function handleCloseButton(){
        setShowAuthenticationForm(false)
    }


    return(
            <form className="authentication-form" action={handleSubmit}>

                {(formType==="signup")?<h2>Sign Up</h2>:<h2>Login</h2>}

                {(formType === "signup") && <div>
                    <label for="fullNameInp">FULL NAME:</label>
                    <input id="fullNameInp" type="text" name="fullNameInp" placeholder="Ex: Virat Kohli"/>
                </div>}

                <div>
                    <label for="emailInp">EMAIL:</label>
                    <input id="emailInp" type="email" name="emailInp" placeholder="vk18@gmail.com"/>
                </div>

                <div>
                    <label for="passWordInp">PASSWORD:</label>
                    <input id="passWordInp" type="text" name="passWordInp" placeholder="******"/>
                </div>


                <button className="submit-btn" type="submit">{(formType==="login")?"login":"Create Account"}</button>

                <p className="formType-switch" onClick={handleFormTypeSwitch}>{(formType==="login")?"No account ? then create one":"back to login"}</p>


                <button className="close-btn" onClick={handleCloseButton}>X</button>

            </form>
    )

}