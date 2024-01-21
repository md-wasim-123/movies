import React from 'react'
import { useSelector } from 'react-redux'

import './style.scss'
const Genres = ({ datagen }) => {
    const { genres } = useSelector((state) => state.mov)
   
    return (
        <div className='genres'>
            {datagen?.map((gen) => {
                if (!genres[gen]?.name) return;
                return (
                    <div key={gen} className="genre">
                        {genres[gen]?.name}
                    </div>
                )
            })

            }

        </div>
    )
}

export default Genres
