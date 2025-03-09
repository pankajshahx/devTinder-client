import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/signup" element={<div>SignUp</div>} />
          <Route path="/login" element={<div>LogIn</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
