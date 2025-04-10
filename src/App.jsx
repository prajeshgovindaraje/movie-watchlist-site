

import SearchBar from "./components/SearchBar/SearchBar.jsx"
import Header from "./components/Header/Header.jsx"
import ResultPage from "./pages/ResultPage.jsx"
import Layout from "./components/Layout.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import WatchListPage from "./pages/WatchListPage.jsx"
import MovieCard from "./components/MovieCard/MovieCard.jsx"
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx"
import AuthenticationForm from "./components/AuthenticationForm/AuthenticationForm.jsx"

import { BrowserRouter,Router,Route, Routes } from "react-router"
import MovieDetailPage from "./pages/MovieDetailPage.jsx"



export default function App(){

    


  


    return(
        <BrowserRouter>
        <Routes>

          <Route element={<Layout/>}>


            <Route index element={<SearchPage/>}  />
            <Route path="resultPage/:searchTerm" element={<ResultPage/>}/>
            <Route path="detailsPage/:movieID" element={<MovieDetailPage/>}/>


            <Route path="watchListPage/:userID" element={<WatchListPage/>}/>



          </Route>




        </Routes>
        </BrowserRouter>
    )


}