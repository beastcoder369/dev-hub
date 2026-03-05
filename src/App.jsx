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
import Connections from "./components/Connections.jsx";
import Request from "./components/Request.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>

            {/* ── Public routes ── */}
            <Route path="signup" element={<Signup />} />
            <Route path="login"  element={<Login />} />

            {/* ── Protected routes — redirect to /login if not logged in ── */}
            <Route path="feed"        element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="profile"     element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
            <Route path="request"     element={<ProtectedRoute><Request /></ProtectedRoute>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
