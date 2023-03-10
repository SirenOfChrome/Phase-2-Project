import {Link} from "react-router-dom"
import React from 'react'
import {useNavigate} from "react-router-dom"
import './Navbar.css'

export default function Navbar({theme, setTheme, login, setLogin, refresh, query}) {
    const navigate = useNavigate()

    const handleSearch = () => {
        query('');
    }

    const handleLogin = () => {
        setLogin(null)
        navigate("/")
    }

    return (
        <div className='container'>
            <h1 className='primary'>Coin Watcher</h1>
            <ul className='nav-menu'>
                <li><Link to='/'>Home</Link></li>
                <li><Link onClick={handleSearch} to='/search'>Search</Link></li>
                {login ? <li><Link onClick={handleSearch} to='/myCoins'>My Coins</Link></li> : null}
                <li>{login ? <Link to='/' onClick={handleLogin}>Sign Out</Link> : <Link to='/login'>Login</Link>}</li>
            </ul>
            {login ? <h3>{login.Username}</h3> : null}
            <div className='btn-group'>
                <button className='btn' onClick={setTheme}>{theme ? 'Dark' : 'Light'}</button>
                <button className='btn' onClick={refresh}>Refresh</button>
            </div>
        </div>
    )
}