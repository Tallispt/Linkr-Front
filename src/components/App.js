import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import UserPage from "../pages/UserPage";
import GlobalStyle from "../styles/GlobalStyle";

// Login
import Login from "../pages/Login/Login";
// Registration
import Registration from "../pages/Registration/Registration";

// React-Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import UserContext from "../context/userContext";

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
            <Route path="/timeline" element={<Homepage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
