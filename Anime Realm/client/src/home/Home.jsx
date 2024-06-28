import axios from 'axios'
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page on route change
    }, [pathname]);


    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/post');
            setPosts(response.data);
        } catch (error) {
            alert('Error fetching posts');
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    const limitContent = (content, wordLimit) => {
        const words = content.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return content;
    };
    const sortedPosts = [...posts].sort((a, b) => b.likecount - a.likecount);

    return (
        <div className='bg-gray-800 w-full'>
            <div className='fixed w-full'>
                <Navbar />
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-800 text-neon-green">
                <div className="text-center mt-[15vh]">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Anime Realm</h1>
                    <div className="text-2xl mb-8">An Anime Blogging platform</div>
                    <div className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedPosts.map(post => (
                            <div key={post._id} className="border border-neon-green p-4 mb-2 bg-gray-800 text-neon-green">
                                {post.image && (
                                    <div className='flex justify-center'>
                                        <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="mt-2 rounded-lg w-full w-[300px] h-[200px] object-cover" />
                                    </div>
                                )}
                                <h3 className="text-lg font-bold">{post.title}</h3>
                                <div className="content">
                                    <p className='text-white'>{limitContent(post.content, 35)}</p>
                                    <Link to={`/blog/${post._id}`} className="text-neon-green underline">Read More</Link>
                                </div>
                                <div className='flex justify-end'>
                                    <p className="text-sm text-gray-400">Author: {post.author.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-4 border-t-[1px]">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div>
                        <p>&copy; 2024 Anime Realm</p>
                        <p>All rights reserved.</p>
                    </div>
                    <div>
                        <p>nikshepch2001@example.com</p>
                        <p>nikshepdotphaser@gmail.com</p>
                        <p>Phone: +91-8882001271</p>
                        <p className='text-neon-green'><a href="https://mellow-pavlova-e737cd.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Portfolio Link</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
