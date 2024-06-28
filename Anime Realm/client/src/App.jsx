import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './home/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import AddBlog from './blogs/AddBlog';
import Blog from './home/Blog';
import About from './home/About';
import MyBlogs from './blogs/MyBlogs';

function App() {

  return (
    <Router className=''>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addblog" element={<AddBlog/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/myblogs" element={<MyBlogs/>}/>
      </Routes>
    </Router>
  );
}

export default App;
