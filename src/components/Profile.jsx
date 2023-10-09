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
      console.log(result)
      setAuthenticated(false)
    } catch (error) {
      setError(`Failed: ${error}`)
    }
  }

  return (
    <>
      <div class="container mx-auto my-70">
        <div>
          <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">

            <div class="mt-16">
              <h1 class="font-bold text-center text-3xl text-gray-900">Welcome back, {username}</h1>
              <p class="text-center text-sm text-gray-400 font-medium">Email: {email}</p>
              <div class="my-5 px-6">
                <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white" onClick={handleLogout}>Logout</a>
              </div>
              {/* <div class="flex justify-between items-center my-5 px-6">
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
                <a href="" class="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>
              </div> */}

              {/* <div class="w-full">
                <h3 class="font-medium text-gray-900 text-left px-6">Recent activites</h3>
                <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                  <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2" />
                      Updated his status
                      <span class="text-gray-500 text-xs">24 min ago</span>
                  </a>

                  <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2" />
                      Added new profile picture
                      <span class="text-gray-500 text-xs">42 min ago</span>
                  </a>

                  <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2" />
                      Posted new article in <span class="font-bold">#Web Dev</span>
                      <span class="text-gray-500 text-xs">49 min ago</span>
                  </a>

                  <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2" />
                      Edited website settings
                      <span class="text-gray-500 text-xs">1 day ago</span>
                  </a>

                  <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2"/>
                      Added new rank
                      <span class="text-gray-500 text-xs">5 days ago</span>
                  </a>

                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Profile