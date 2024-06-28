import axios from 'axios'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      setUsername(''); 
      setEmail('');
      setPassword('');
      navigate("/login");
    } catch (error) {
      alert('Error registering user');
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-neon-green">
        <h2 className="text-2xl font-bold mb-6 text-neon-green">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-neon-green mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-neon-green rounded bg-gray-700 text-neon-green"
              placeholder="Enter your username"
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-neon-green mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-neon-green rounded bg-gray-700 text-neon-green"
              placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-neon-green mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-neon-green rounded bg-gray-700 text-neon-green"
              placeholder="Enter your password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={register}
            className="w-full py-2 px-4 bg-neon-green text-gray-900 font-bold rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <div>Already have an account? <Link to="/login" className="text-neon-green underline hover:text-white">Log In</Link></div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
