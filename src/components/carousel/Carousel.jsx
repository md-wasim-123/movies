import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import poster from '../../assets/no-poster.png'
import Container from "../container/Container";
import Img from "../lazyLoadingimg/Img";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading ,endpoint, title}) => {
    const { url } = useSelector((state) => state.mov)
     
    const navigate = useNavigate();
    const currentDiv = useRef()
    const navigation = (dir) => {
        const container = currentDiv.current
        const scroAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left: scroAmount,
            behavior: "smooth",
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>

            </div>
        )
    }
    return (
        <div className="carousel">
            {title && <div className="carouselTitle">{title}</div> }
            <Container>
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation('left')} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation('right')} />
                {!loading ? (
                    <div ref={currentDiv} className="carouselItems">
                        {data?.map((item) => {
                            const urlimg = item.backdrop_path ? url.poster + item.backdrop_path : poster
                            return (
                                <div key={item.id}
                                    onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                    className="carouselItem">
                                    <div className="posterBlock">
                                        <Img src={urlimg} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres datagen={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <div className="title">
                                            {item.title || item.name}
                                        </div>
                                        <div className="date">
                                            {dayjs(item.release_date).format("MMM D,YYYY")
                                            }
                                        </div>
                                    </div>


                                </div>
                            )
                        })
                        }

                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {/* {[...Array(5).keys()].map((i) => <skItem
                            key={i} />)} */}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}


            </Container>
        </div>
    )
}

export default Carousel
