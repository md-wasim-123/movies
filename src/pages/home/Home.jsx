import React from 'react'
import './style.scss'
import Banner from './banner/Banner'
import Treading from './treading/Treading'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'
const Home = () => {
  return (
    <div >
     <Banner/>
      <Treading/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home
