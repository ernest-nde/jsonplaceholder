import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFoud from "./components/NotFoud";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About";
import Users from "./components/Users/Users";
import User from "./components/Users/User/User";
import UserTodos from "./components/Users/User/UserTodos/UserTodos";
import UserAlbums from "./components/Users/User/UserAlbums/UserAlbums";
import UserPosts from "./components/Users/User/UserPosts/UserPosts";
import AlbumPhotos from "./components/Users/User/UserAlbums/AlbumPhotos/AlbumPhotos";
import Post from "./components/Users/User/UserPosts/Post/Post";


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
            <Route path="/users/:id/todos" element={<UserTodos />} />
            <Route path="/users/:id/albums" element={<UserAlbums />} />
            <Route path="/users/:id/posts" element={<UserPosts />} />
          </Route>
          <Route path="/albums/:albumId/photos" element={<AlbumPhotos />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFoud />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
