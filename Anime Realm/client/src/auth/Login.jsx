import { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const userId = response.data.user._id; // Get userId from response
            localStorage.setItem('userId', userId);
            setUsername('');
            setPassword('');
            localStorage.setItem('userName', username);
            navigate("/");
        } catch (error) {
            alert('Error logging in user');
        }
    };



    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-800">
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-neon-green">
                    <h2 className="text-2xl font-bold mb-6 text-neon-green">Sign In</h2>
                    <form onSubmit={login}>
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
                        <div className="mb-6">
                            <label className="block text-neon-green mb-2" htmlFor="password">Email</label>
                            <input
                                type="password"
                                id="password"
                                name="pasword"
                                className="w-full p-2 border border-neon-green rounded bg-gray-700 text-neon-green"
                                placeholder="Enter your password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-neon-green text-gray-900 font-bold rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <div>{`Don't`} have an account? <Link to="/register" className="text-neon-green underline hover:text-white">Register</Link></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login