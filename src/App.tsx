import "./App.css";
import Login from "./components/signup_login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./components/signup_login/Signin";
import { useSelector } from "react-redux";
import DisplayBlogs from "./components/landingPage/DisplayBlogs";
import NewBlog from "./components/blogComponents/NewBlog";
import Profile from "./components/blogComponents/Profile";
import SingleCardDetails from './components/landingPage/SingleCardDetails'

function App() {
  const isLoggedIn = useSelector((state: any) => state.loginForm.isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route
          path="/displayBlogs"
          element={isLoggedIn ? <DisplayBlogs /> : <Navigate to="/" replace />}
        />
        <Route path="/displayBlogs/addnewblog" element={<NewBlog />} />
        <Route path="/displayblogs/profile" element={<Profile />} />
        <Route  path="/blog/:id" element={<SingleCardDetails/>} />
      </Routes>
    </>
  );
}

export default App;
