import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFoud from "./components/NotFoud";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About";
import Users from "./components/Users/Users";
import User from "./components/Users/User/User";
import UserTodos from "./components/Users/User/UserTodos";
import UserAlbums from "./components/Users/User/UserAlbums";
import UserPosts from "./components/Users/User/UserPosts";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />}> 
            <Route path="/users/:id/todos" element={<UserTodos />} />
            <Route path="/users/:id/albums" element={<UserAlbums />} />
            <Route path="/users/:id/posts" element={<UserPosts />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoud />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
