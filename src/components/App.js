import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import GlobalStyle from "../styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
