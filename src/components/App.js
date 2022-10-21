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

function App() {
  return (
    <>
      <ToastContainer autoclose={1000} />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/timeline" element={<Homepage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
