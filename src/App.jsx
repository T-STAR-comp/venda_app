import { Route, Routes } from "react-router-dom"
import HomeComp from "./Home/home"
import NotFound from "./Home/components/NotFound"


function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound/>} />
        <Route path="/" element={<HomeComp/>} />
      </Routes>
    </>
  )
}

export default App
