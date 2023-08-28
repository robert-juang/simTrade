import { useState } from 'react'
import Dashboard from "./components/Dashboard"
import Heading from "./components/Heading" 

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Heading/>
      <Dashboard/>
    </>
  )
}

export default App
