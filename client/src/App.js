import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/NavBar/Navbar";
import Form from "./components/Form/Form";
import About from "./components/About/About"
import Cards from "./components/Cards/Cards"
import Detail from "./components/Detail/Detail"
import { useEffect } from "react";
import { getAllDogs, getTemperaments } from "./redux/actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(()=>{
    dispatch(getTemperaments());
    dispatch(getAllDogs());

    location.pathname==='/' ? navigate('/landing') : navigate(location.pathname)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (location.pathname === '/landing' || location.pathname === '/') {
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
        <Route path='/detail/:idRaza' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;
