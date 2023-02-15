import React, {useState} from 'react'
import {FiArrowUpRight, FiArrowDown} from 'react-icons/fi'
import './Coin.css'

function Coin({coin}){
    const [clicked, setClicked] = useState(true)

    let up = coin.price_change_percentage_24h > 0

    function handleClick() {
        setClicked((clicked) => !clicked)
    }

    return (
        <div className='card'>
            <div className='top'>
                <img src={coin.image} alt={coin.name} />  
            </div>
            <div>
                <h4>{coin.name}  
                {clicked ? (
                <button className='add-button' onClick={() => handleClick()}></button>
                ) :  <button className='remove-button' onClick={() => handleClick()}></button>} </h4>

                <p>${coin.current_price.toLocaleString()}</p>
            </div>
            <span className={up ? 'green' : 'red'}>
                    {up ? <FiArrowUpRight className='icon'/> : <FiArrowDown className='icon'/>}
                    {Math.abs(coin.price_change_percentage_24h.toFixed(2))}%
            </span>
            
        </div>
    )
}

export default Coin