import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing_page";
import Navbar from "./components/NavBar/Navbar";
import Form from "./components/Form/Form";
import About from "./components/About/About"
import Cards from "./components/Cards/Cards"
import Detail from "./components/Detail/Detail"

function App() {
  const location = useLocation()
  if (location.pathname === '/landing') {
    return (
      <div className='App' style={{ padding: '25px' }}>
      <Routes>
        <Route path='/landing' element={<Landing/>} />
      </Routes>
    </div>
    )
  }
  
  return (
    <div className='App' style={{ padding: '25px' }}>
      <Navbar/>
      <Routes>
        <Route path='/create' element={<Form />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<Cards />} />
        <Route path='/detail/:detailId' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;
