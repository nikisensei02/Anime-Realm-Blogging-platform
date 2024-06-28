import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/post/myblogs/${userId}`);
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch blogs');
                alert('please Login First');
                navigate("/");
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [userId]); // Include userId in the dependency array to fetch blogs when userId changes

    const handleDelete = async (postId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/post/${postId}`);
            if (response.status === 200) {
                // Filter out the deleted post from blogs state
                setBlogs(blogs.filter(blog => blog._id !== postId));
            } else {
                setError('Failed to delete blog');
            }
        } catch (error) {
            setError('Failed to delete blog');
        }
    };

    const handleViewBlog = async (postId) => {
        try {
            navigate(`/blog/${postId}`);
        } catch (error) {
            console.error('Failed to fetch blog post:', error);
        }
    };

    const limitContent = (content, maxLength) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.slice(0, maxLength) + '...';
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-gray-800 h-full">
            <div className='fixed w-full'>
                <Navbar />
            </div>
            <div className="container flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-neon-green mt-[17vh] m-4">My Blogs</h1>
                {blogs.length === 0 ? (
                    <p className="text-lg text-white">You have not added any blogs yet.</p>
                ) : (
                    <ul className="space-y-4 m-4">
                        {blogs.map((blog) => (
                            <li key={blog._id} className="p-4 border-l-4 border-neon-green bg-gray-900 rounded-lg shadow-md">
                                {blog.image && (
                                    <img
                                        src={`http://localhost:5000/${blog.image}`}
                                        alt={blog.title}
                                        className="mt-2 rounded-lg w-full w-[40vw] h-[30vw] object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = 'path_to_default_image.jpg';
                                        }}
                                    />
                                )}
                                <h2 className="text-2xl font-semibold text-neon-green mb-2">{blog.title}</h2>
                                <p className="text-base text-white">{limitContent(blog.content, 250)}</p>
                                <div className='flex justify-center'>
                                    <button
                                        className='bg-red-500 rounded-lg p-2 my-4 mx-2 text-white hover:bg-red-600'
                                        onClick={() => handleDelete(blog._id)}
                                    >
                                        Delete this blog
                                    </button>
                                    <button
                                        className='bg-blue-500 rounded-lg p-2 my-4 mx-2 text-white hover:bg-blue-600'
                                        onClick={() => handleViewBlog(blog._id)}
                                    >
                                        View this blog
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
};

export default MyBlogs;
