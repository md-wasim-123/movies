import React, { useEffect, useState } from 'react'
import Img from '../../../components/lazyLoadingimg/Img'
import h from '../../../assets/h.jpeg'
import Container from '../../../components/container/Container'
import UseFatch from '../../../hooks/UseFatch'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const Banner = () => {
    const [background, setbackground] = useState("")
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const { url } = useSelector((state) => state.mov)
    const { data, loading } = UseFatch("/movie/upcoming")

    useEffect(() => {
        const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20) + 1]?.backdrop_path
        setbackground(bg)
    }, [data])
    const handleCheck = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='banner '>
            {!loading &&
                <div className='bacdrop_img'>
                    <Img src={background ? background : h} />
                </div>
            }
            <div className="banner_gradiant"></div>
            <Container>
                <div className="banner_content  ">
                    <h1 className='title'>Welcome</h1>
                    <p className='subtitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="input_box">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={handleCheck}
                            placeholder='Enter your Movies'
                        />
                        <button>Submit</button>
                    </div>
                </div>
            </Container>

        </div >
    )
}

export default Banner
