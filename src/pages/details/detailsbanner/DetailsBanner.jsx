import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Container from '../../../components/container/Container'
import UseFatch from '../../../hooks/UseFatch'
import Genres from '../../../components/genres/Genres'
import CircleRating from '../../../components/circleRating/CircleRating'
import Img from '../../../components/lazyLoadingimg/Img'
import PosterFallback from "../../../assets/no-poster.png";

import "./style.scss";
import Playbtn from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { url } = useSelector((state) => state.mov)
    const { mediaType, id } = useParams()
    const { data, loading } = UseFatch(`/${mediaType}/${id}`)
    const _genres = data?.genres?.map((g) => g.id)
    const director = crew?.filter((f) => f?.job === "Director");
    console.log(director)
    const writer = crew?.filter((f) => f?.job === "ScreenPlay" || f.job === "Story" || f.job === "Writer");



    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <Container>
                                <div className="content">
                                    <div className="left">
                                        {data.backdrop_path ? (
                                            <Img src={url.backdrop + data.backdrop_path} className="posterImg" />
                                        ) : (
                                            <Img src={PosterFallback} className="posterImg" />
                                        )
                                        }
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}

                                        </div>
                                        <div className="subtitle">
                                            {data?.tagline}
                                        </div>
                                        <Genres datagen={_genres.slice(0, 2)} />
                                        <div className="row">
                                            <CircleRating rating={data?.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={() => { setShow(true), setVideoId(video.key) }}
                                            >
                                                <Playbtn />
                                                <div className="text">
                                                    Watch Trailer
                                                </div>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview:
                                            </div>
                                            <div className="description">
                                                {data?.overview}
                                            </div>

                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <div className="text">
                                                        {data?.status}
                                                    </div>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <div className="text">
                                                        {dayjs(data?.release_date).format('MMM D, YYYY')}
                                                    </div>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Watch :{" "}
                                                    </span>
                                                    <div className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {director && director.length > 0 && (
                                            <div className="info">
                                                <div className="text bold">
                                                    Directore:{" "}
                                                </div>
                                                <div className="text">
                                                    {director.map((di, i) => (
                                                        <span key={i}>
                                                            {di.name}
                                                            {director.length - 1 !== i && ","}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                         {writer && writer.length > 0 && (
                                            <div className="info">
                                                <div className="text bold">
                                                    Writer:{" "}
                                                </div>
                                                <div className="text">
                                                    {writer.map((wi, i) => (
                                                        <span key={i}>
                                                            {wi.name}
                                                            {writer.length - 1 !== i && ","}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <div className="text bold">
                                                    Creater:{" "}
                                                </div>
                                                <div className="text">
                                                    {data?.created_by?.map((wi, i) => (
                                                        <span key={i}>
                                                            {wi.name}
                                                            {data?.created_by?.length - 1 !== i && ","}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </Container>
                        </React.Fragment>
                    )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Container>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
