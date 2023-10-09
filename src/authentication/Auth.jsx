import React, {useState, useEffect, useContext} from 'react'

import Login from "./Login" 
import Signup from "./Signup" 
import ForgotPassword from "./ForgotPassword"

import AuthContext from '../context/AuthContext'

function Auth() {
  const { authenticated, setAuthenticated, username, setUsername, password, setPassword, email, setEmail, error, setError } = useContext(AuthContext) 

  //Keep track of the page in the login screen (0 is login, 1 is signup, 2 is forgot passwrod) 
  const [loginPage, setLoginPage] = useState(0); 

  return (
    <>
      {
        loginPage === 0 ? (
          <Login values={{ loginPage, setLoginPage }}/>
        ) : <div></div>
      }
      {
        loginPage === 1 ? (
          <Signup values={{ loginPage, setLoginPage }}/>
        ): <div></div >}
      {
        loginPage === 2 ? (
            <ForgotPassword values={{ loginPage, setLoginPage}}/>
        ): <div></div >}
    </>
  )
}

export default Auth