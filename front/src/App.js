import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Task from './components/Task';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';


function App() {
  return (
    <div className="App">
        <Router>
          
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/task" element={<Task/>}/>
            <Route path="/post" element={<Posts/>}/>
            <Route path="/createpost" element={<CreatePost/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
