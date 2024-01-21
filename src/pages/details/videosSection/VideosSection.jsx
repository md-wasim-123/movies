import React, { useState } from "react";

import "./style.scss";

import Container from "../../../components/container/Container";
import Playbtn from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadingimg/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <Container>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video) => {
                            return (
                                <div key={video.key}
                                    onClick={() => { setShow(true), setVideoId(video.key) }}
                                    className="videoItem">
                                    <div className="videoThumbnail">
                                        <Img src={`http://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                        <Playbtn/>
                                    </div>
                                    <div className="videoTitle">
                                        {video.name.slice(0,35)+"...."}
                                    </div>
                                </div>
                            )
                        })

                        }
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </Container>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
