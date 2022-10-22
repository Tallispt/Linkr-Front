import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import UserPage from "../pages/UserPage";
import GlobalStyle from "../styles/GlobalStyle";
import HashtagPage from "../pages/HashtagPage";

// Login
import Login from "../pages/Login/Login";
// Registration
import Registration from "../pages/Registration/Registration";

// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/userContext";
import PrivatePage from "./PrivatePage";

function App() {
  const [dataUser, setDataUser] = useState({
    id: null,
    username: null,
    image: null,
    token: null,
  });

  return (
    <>
      <ToastContainer autoclose={1000} />
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={{ dataUser, setDataUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Registration />} />
            <Route
              path="/timeline"
              element={
                <PrivatePage>
                  <Homepage />
                </PrivatePage>
              }
            />
            <Route
              path="/user/:id"
              element={
                <PrivatePage>
                  <UserPage />
                </PrivatePage>
              }
            />
            <Route
              path="/hashtag/:hashtag"
              element={
                <PrivatePage>
                  <HashtagPage />
                </PrivatePage>
              }
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;