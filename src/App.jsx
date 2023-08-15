import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFoud from "./components/NotFoud";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About";
import Users from "./components/Users/Users";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoud />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
