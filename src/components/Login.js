import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './Login.css'

export default function Login({setLogin}) {
  const API = 'http://localhost:4000/Logins'
  const navigate = useNavigate()

  //Click True = Sign Up, Click False = Login
  const [click, setClick] = useState(false)
  const [logins, setLogins] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = () => setClick(!click)

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(data => setLogins(data))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    
    let user = {
      Username: e.target.username.value,
      Password: e.target.password.value
    }

    if (click && e.target.email.value !== '' && user.Username !== '' && user.Password !== ''){
      let work = true
      logins.forEach(login => {
        if (login.Username === user.Username) {
          work = false
          setError("Username Already Taken!")
        }
      })
      if (work) {
        fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email: e.target.email.value, Username: user.Username, Password: user.Password, Coins: []}),
        })
        .then(r => r.json())
        .then(data => {
          setLogins(...logins, data)
          setLogin(data)
          navigate("/")
        })
      }
    }else if (!click && user.Username !== '' && user.Password !== ''){
      let found = false
      logins.map(login => {
        if (user.Username === login.Username){
          if (user.Password !== login.Password){
            setError("Username/Password Invalid.")
          }else{
            found = true
          setLogin(login)
          navigate("/")
          }
        }
      })
      if (!found){
        setError("Username/Password Invalid.")
      }
    }else{
      setError("Please Enter Information")
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>{click ? "Sign up" : "Login"}</h1> 
        {click ? <label>
          <p>Email</p>
          <input type="text" name="email" placeholder="Enter your Email"/>
        </label> : null}
        <label>
          <p>Username</p>
          <input type="text" name="username" placeholder="Create a Username"/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" placeholder="Create a password"/>
        </label>
        <button type="submit"> {click ? "Sign up" : "Login"}</button> 
      </form>
      <button onClick={handleClick}>{(click ? `Already` : `Don't`) + ` have an account?`}</button>
      {error ? <h3 className="error">{error}</h3>: null}
    </div>
  )
}