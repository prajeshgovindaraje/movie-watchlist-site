

import SearchBar from "./components/SearchBar/SearchBar.jsx"
import Header from "./components/Header/Header.jsx"
import ResultPage from "./pages/ResultPage.jsx"
import Layout from "./components/Layout.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import MovieCard from "./components/MovieCard/MovieCard.jsx"

import { BrowserRouter,Router,Route, Routes } from "react-router"



export default function App(){

    


    let styles = {
        border:"1px solid red",
        width:"70%",
        height:"50px",
        marginLeft:"auto",
        marginRight:"auto"

    }

    return(
        <BrowserRouter>
        <Routes>

          <Route element={<Layout/>}>
            <Route index element={<SearchPage/>}  />
            <Route path="resultPage" element={<ResultPage/>}/>


          </Route>




        </Routes>
        </BrowserRouter>
    )


}