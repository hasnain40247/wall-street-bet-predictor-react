import React from "react";
import {


  Routes,
  Route,

} from "react-router-dom";
import Home from "./Home";
import InfoSection from "./InfoSection";



function App() {



  return (
    <>


     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<InfoSection />} />
      </Routes>
    </>
  );
}

export default App
