import { Route, Routes } from "react-router-dom"
import HomeComp from "./Home/home"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeComp/>} />
      </Routes>
    </>
  )
}

export default App
