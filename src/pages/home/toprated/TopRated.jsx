import React, { useState } from 'react'
import Container from '../../../components/container/Container'
import Switchbtn from '../../../components/switchbtn/Switchbtn'
import UseFatch from '../../../hooks/UseFatch'
import Carousel from '../../../components/carousel/Carousel'
const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const { data, loading } = UseFatch(`/${endpoint}/top_rated`)
    
    const tabClick = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")

    }
    return (
        <div className='carousel'>
            <Container>
                <span className='text-tre'>Top Rated</span>
                <div>
                    <Switchbtn data={['Movies', 'Tv Show']} tabClick={tabClick} />
                </div>
            </Container>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />

        </div>
    )
}

export default TopRated