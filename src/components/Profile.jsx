import React, {useContext} from 'react'

import AuthContext from '../context/AuthContext';

import * as auth from "../api/auth-api.js"

function Profile() {

  const { authenticated, setAuthenticated, username, setUsername, password, setPassword, email, setEmail, error, setError } = useContext(AuthContext) 

  const handleLogout = async() => {
    //call backend here 
    try {
      setError("")
      const result = await auth.logOut(username, password)
      setAuthenticated(false)
    } catch (error) {
      setError(`Failed: ${error}`)
    }
  }

  return (
    <>
      <div>Here's a Logout Button:</div>
      <button onClick={handleLogout}>Logout</button>
      {error}
    </>
  )
}

export default Profile