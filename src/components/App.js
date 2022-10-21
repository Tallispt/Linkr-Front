import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import GlobalStyle from "../styles/GlobalStyle";

// Login
import Login from "../pages/Login/Login";
// Registration
import Registration from "../pages/Registration/Registration";

// React-Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import UserContext from "../context/User";

function App() {
  const [ dataUser, setDataUser ] = useState({id: "", username: "", image: "", token: ""})

  return (
    <>
      <UserContext.Provider value={{ dataUser, setDataUser }}>
        <ToastContainer autoclose={1000} />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/sign-in" element={<Login  />} />
            <Route path="/sign-up" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
