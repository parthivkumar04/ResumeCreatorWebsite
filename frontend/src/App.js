import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Profile from "./components/Header/Profile";
import Logged from "./components/Header/Logged";
import FeedbacksUser from "./components/Header/feedbacksuser"
import Redirect1 from "./components/Body/redirect1"; 
import Feedback from "./components/Header/feedback";
import Template1 from "./components/Body/template1";
import Template2 from "./components/Body/template2";
import Template3 from "./components/Body/template3";
import Template4 from "./components/Body/template4";
import Template5 from "./components/Body/template5";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
  
        <Route path="/" element={<Body />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/logged" element={<Logged/>} />
        <Route path="/redirect1" element={<Redirect1 />} /> 
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/feedbacksuser" element={<FeedbacksUser/>} />
        <Route path="/template1" element={<Template1/>}/>
        <Route path="/template2" element={<Template2/>}/>
        <Route path="/template3" element={<Template3/>}/>
        <Route path="/template4" element={<Template4/>}/>
        <Route path="/template5" element={<Template5/>}/>
      </Routes>
    </div>
  );
}

export default App;
