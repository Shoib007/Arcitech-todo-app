import { Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import PageNotFound from "../components/PageNotFound"
import ToDo from "../components/ToDo"


function App() {

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element = {<ToDo/>}/>
        <Route path="*" element = {<PageNotFound/>}/>
      </Routes>

    </div>
  )
}

export default App
