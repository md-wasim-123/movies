import React, { useEffect, useState } from 'react'
import { getMovieList } from '../utils/api'

const UseFatch = (url) => {
    const [data, setData] = React.useState(null)
    const [loading, setloading] = useState(null)
    const [error, seterror] = useState(null)
    useEffect(() => {
        setloading("Loading.")
        setData(null)
        seterror(null)
        getMovieList(url)
            .then((item) => {
                setloading(false)
                setData(item)
            }).catch((err) => {
                seterror(err)
                setloading(false)
            })

    }, [url])
    return { data, loading, error }
}

export default UseFatch
