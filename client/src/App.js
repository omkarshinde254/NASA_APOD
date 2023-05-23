import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Home from "./pages/Home";
import ApodHome from "./pages/ApodHome";

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" exact element={<Login/>} /> */}
          {/* <Route path="/login" exact element={<Login/>} /> */}
          {/* <Route path="/register" exact element={<Register/>} /> */}
          {/* <Route path="/" exact element={<Home/>} /> */}
          <Route path="/" exact element={<ApodHome/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;