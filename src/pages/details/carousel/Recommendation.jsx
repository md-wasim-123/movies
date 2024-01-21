import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import UseFatch from "../../../hooks/UseFatch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = UseFatch(`/${mediaType}/popular`);

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;