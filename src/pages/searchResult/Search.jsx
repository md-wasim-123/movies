import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMovieList } from '../../utils/api';
import Container from '../../components/container/Container'
import './style.scss'
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';
const Search = () => {
  const [data, setdata] = useState("")
  const [loading, setloading] = useState(false)
  const [pageno, setPageno] = useState(1)
  const { query } = useParams();
  const initialFatchData = () => {
    setloading(true);
    getMovieList(`/search/multi?query=${query}&page=${pageno}`)
      .then((res) => {
        setdata(res)
        setPageno((prev) => prev + 1)
        setloading(false)
      })
  }
  const nextPageResult = () => {
    setloading(true);
    getMovieList(`/search/multi?query=${query}&page=${pageno}`)
      .then((res) => {
        if (data.results) {
          setdata({ ...data, results: [...data.results, ...res.results] })
        }
        else {
          setdata(res)
        }
        setPageno((prev) => prev + 1)
        setloading(false)
      })
  }

  useEffect(() => {
    setPageno(1)
    initialFatchData()
  }, [query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <Container>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data.total_results > 1 ? "results" : "result"} of ${query}`}
              </div>

              <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={nextPageResult}
                hasMore={pageno <= data?.total_pages}
                loader={<Spinner/>}

              >
                {
                  data?.results?.map((item, i) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard key={i} data={item} fromSearch={true} />
                    )
                  })
                }

              </InfiniteScroll>

            </>
          ) : (
            <span>
              results Not Found
            </span>
          )}
        </Container>

      )}
    </div>
  )
}

export default Search
