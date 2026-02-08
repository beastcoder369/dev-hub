import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Feed from "./components/Feed.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="feed" element={<Feed />} />
            <Route path="signup" element={<Signup />}/>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
