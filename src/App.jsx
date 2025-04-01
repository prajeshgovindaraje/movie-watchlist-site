

import SearchBar from "./components/SearchBar/SearchBar.jsx"
import Header from "./components/Header/Header.jsx"
import ResultPage from "./pages/ResultPage.jsx"
import Layout from "./components/Layout.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import MovieCard from "./components/MovieCard/MovieCard.jsx"
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx"

import { BrowserRouter,Router,Route, Routes } from "react-router"
import MovieDetailPage from "./pages/MovieDetailPage.jsx"



export default function App(){

    


  


    return(
        <BrowserRouter>
        <Routes>

          <Route element={<Layout/>}>
            <Route index element={<SearchPage/>}  />
            <Route path="resultPage" element={<ResultPage/>}/>
            <Route path="detailsPage" element={<MovieDetailPage/>}/>


          </Route>




        </Routes>
        </BrowserRouter>
    )


}