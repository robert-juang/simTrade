import React, {useState, useContext} from 'react'
import { mockSearchResults } from "../constants/mock";
import SearchResults from "./SearchResult"
import { searchSymbols } from '../api/stock-api';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ThemeContext } from '@emotion/react';

const Search = () => {
  const [input, setInput] = useState("") 
  const [bestMatches, setBestMatches] = useState([]) //different from video 

  const {darkMode} = useContext(ThemeContext)

  const clear = () => {
    setInput(""); 
    setBestMatches([]); 
  }

  const updateBestMatches = async () => {
    try{
      if (input) {
        const searchResults = await searchSymbols(input); 
        const result = searchResults.result; 
        setBestMatches(result); 
      }
    }
    catch(error){
      setBestMatches([]);
      console.log("Error updateBestMatches",error) 
    }
  }
  
  return (
    <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`} id="home">
        <input type="text" value={input} className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`} placeholder="Search stock..." onChange={(event) => {setInput(event.target.value);}} onClick={(event) => {
            if (event.key === "enter") {
                updateBestMatches(); 
            }
        }}/>
        {input && <button onClick={clear}>
            <button className="h-4 w-4 fill-gray-500"/>
        </button>}

        <button onClick={updateBestMatches} className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2">
          <SearchOutlinedIcon className="h-4 w-4 fill-gray-100"/>
        </button>

        {input && bestMatches.length > 0 ? <SearchResults results={bestMatches}/> : null}
    </div>
  )
}

export default Search