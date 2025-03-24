

import React from "react"
import Header from "./Header/Header"
import { Outlet } from "react-router"
import SearchPage from "../pages/SearchPage"
import SearchBar from "./SearchBar/SearchBar"

export default function Layout(){
    return(
        <>
        <div className="layout-page">

            <Header/>
            <Outlet />

        </div>


        </>
    )
}