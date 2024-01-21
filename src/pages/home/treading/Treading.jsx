import React, { useState } from 'react'
import Container from '../../../components/container/Container'
import Switchbtn from '../../../components/switchbtn/Switchbtn'
import UseFatch from '../../../hooks/UseFatch'
import Carousel from '../../../components/carousel/Carousel'
const Treading = () => {
    const [endpoint, setEndpoint] = useState("day")
    const { data, loading } = UseFatch(`/trending/movie/${endpoint}`)
console.log(data?.results)
    const tabClick = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")

    }
    return (
        <div className='carousel'>
            <Container>
                <span className='text-tre'>Treading</span>
                <div>
                    <Switchbtn data={['Day', 'Week']} tabClick={tabClick} />
                </div>
            </Container>

            <Carousel data={data?.results} loading={loading} />

        </div>
    )
}

export default Treading
