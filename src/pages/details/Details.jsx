import React from 'react'
import DetailsBanner from './detailsbanner/DetailsBanner'
import { useParams } from 'react-router-dom'
import UseFatch from '../../hooks/UseFatch'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousel/Similar'
import Recommendation from './carousel/Recommendation'
const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = UseFatch(`/${mediaType}/${id}/videos`)
  const { data: credit, loading: creditloading } = UseFatch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credit?.crew} />
      <Cast data={credit?.cast} loading={creditloading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />


    </div>
  )
}

export default Details
