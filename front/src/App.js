import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Task from "./components/Task";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({...authState, status: false});
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username:"", id:0, status: false});
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/post">Posts</Link>
            <Link to="/createpost">Create A Post</Link>
            {!authState.status ? (
              <>
                <Link to="/">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}

            <h1>{authState.username}</h1>
          </div>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/task" element={<Task />} />
            <Route path="/post" element={<Posts />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/singlePost/:id" element={<SinglePost />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
