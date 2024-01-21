import React from 'react'
import './style.scss'
import { useState } from 'react'
const Switchbtn = ({ data, tabClick }) => {
    const [selected, setSelected] = useState(0)
    const [left, setLeft] = useState(0)

    const seleBtn = (tab, index) => {
        console.log(index *100)
        setLeft(index * 100)
        setTimeout(() => { setSelected(index) }, 300)
        tabClick(tab, index)
    }

    return (
        <div className='switchingTabs'>
            <div className='tabItems'>
                {data && data.map((tab, index) => 
                    <span key={index} className={`tabItem ${index === selected ? "active" : ""}`} onClick={() => seleBtn(tab, index)}>
                    {tab}
                </span>
                )}
                <span className='movingBg ' style={{ left }} />
            </div>
        </div>
    )
}

export default Switchbtn
