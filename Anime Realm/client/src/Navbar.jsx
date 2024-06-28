import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('userId');
        const name = localStorage.getItem('userName');
        setUsername(name);
        if (isLoggedIn) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="w-full bg-gray-800 p-4">
            <div className="mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <ul className="flex space-x-4 items-center">
                            <li>
                                <Link to="/" className="text-neon-green hover:text-white font-semibold text-lg">
                                    Anime Realm
                                </Link>
                            </li>
                            <li>
                                <Link to="/myblogs" className="text-gray-300 hover:text-white">
                                    My Blogs
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex md:hidden">
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:space-x-4 items-center">
                        <div className="username text-neon-green text-lg">hi, {username}</div>
                        {!login ? (
                            <div className="flex space-x-4 items-center">
                                <Link to="/login" className="text-gray-300 hover:text-neon-green">
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-neon-green text-gray-900 py-2 px-4 rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="flex space-x-4 items-center">
                                <ul>
                                    <li>
                                        <Link
                                            to="/addblog"
                                            className="bg-neon-green text-gray-900 py-2 px-4 rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                                        >
                                            Add Blog
                                        </Link>
                                    </li>
                                </ul>
                                <button
                                    className="bg-neon-green text-gray-900 py-2 px-4 rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <ul className="flex flex-col space-y-4 items-center py-4">
                        <li>
                            <Link
                                to="/"
                                className="text-neon-green hover:text-white font-semibold text-lg"
                                onClick={toggleMobileMenu}
                            >
                                Anime Realm
                            </Link>
                        </li>
                        {!login ? (
                            <div className="flex flex-col space-y-4 items-center">
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-neon-green"
                                    onClick={toggleMobileMenu}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-neon-green text-gray-900 py-2 px-4 rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                                    onClick={toggleMobileMenu}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4 items-center">
                                <Link
                                    to="/addblog"
                                    className="bg-neon-green text-gray-900 py-2 px-4 rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                                    onClick={toggleMobileMenu}
                                >
                                    Add Blog
                                </Link>
                                <button
                                    className="bg-neon-green text-gray-900 py-2 px-4 rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline"
                                    onClick={() => {
                                        handleLogout();
                                        toggleMobileMenu();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
