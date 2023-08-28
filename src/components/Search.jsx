import React from 'react'

const Search = () => {
  const [input, setInput] = useState("") 
  const [bestMatches, setBestMatches] = useState("") //different from video 
  
  const clear = () => {
    setInput(""); 
    setBestMatches([]); 
  }

  const updateBestMatches = () => {
    setBestMatches("") //different from video 
  }
  
  return (
    <div>Search</div>
  )
}

export default Search