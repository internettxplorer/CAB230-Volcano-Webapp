import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";

import Home from "./pages/Home";
import Volcano from './pages/Volcano';
import VolcanoList from "./pages/VolcanoList";
import Register from "./pages/Register";
import Login from "./pages/Login";

import './App.css';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volcano" element={<Volcano />} />
          <Route path="/list" element={<VolcanoList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App
