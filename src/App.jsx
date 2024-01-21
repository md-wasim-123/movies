import React, { useEffect } from "react"
import { getMovieList } from "./utils/api"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getApiContent, getgenres } from "./store/homeSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import './App.scss'
import Nopage from './pages/Nopage/Nopage'
import Search from "./pages/searchResult/Search";
import Expolre from './pages/explore/Explore'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apitesting()
    genreCall()
  }, [])

  const apitesting = () => {
    getMovieList("/configuration").
      then((data) => {
        const imgLink = {
          backdrop: data.images.secure_base_url + "original",
          poster: data.images.secure_base_url + "original",
          profile: data.images.secure_base_url + "original",
        }
        dispatch(getApiContent(imgLink))
      })
  }
  const genreCall = async () => {
    const promises = []
    const endpoint = ['tv', 'movie']
    const genObject = {}
    endpoint.forEach((end) => {
      promises.push(getMovieList(`/genre/${end}/list`))
    })
    const data = await Promise.all(promises)

    data.map(({ genres }) => {
      return genres.map((item) => genObject[item.id] = item)
    })
    dispatch(getgenres(genObject))

  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/explore/:mediaType" element={<Expolre />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="*" element={<Nopage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
