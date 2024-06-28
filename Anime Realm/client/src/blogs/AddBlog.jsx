import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    // Function to handle image file change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Function to handle form submission
    const createPost = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);
    
            const userId = localStorage.getItem('userId');
    
            const response = await axios.post(
                'http://localhost:5000/api/post/create',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        userId: userId
                    }
                }
            );
    
            console.log(response.data);
            alert('Post created successfully');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post');
        }
    };
    

    return (
        <div className='h-screen'>
            <div className="navbar fixed w-full">
                <Navbar />
            </div>
            <div className="flex items-center justify-center bg-gray-800 text-neon-green h-screen">
                <div className='mt-20 w-4/5'>
                    <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full">
                        <h2 className="text-2xl font-bold mb-6 text-neon-green">Add Blog</h2>
                        <form onSubmit={createPost}>
                            <div className="mb-4">
                                <label htmlFor="topic" className="block text-neon-green mb-2">Topic</label>
                                <input
                                    type="text"
                                    id="topic"
                                    className="w-full p-2 border border-neon-green rounded bg-gray-700 text-neon-green"
                                    placeholder="Enter the topic of your blog"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mainText" className="block text-neon-green mb-2">Main Text</label>
                                <textarea
                                    id="mainText"
                                    className="w-full p-2 border border-neon-green rounded bg-gray-700 text-neon-green h-40"
                                    placeholder="Enter the main text of your blog"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>
                            <input type="file" onChange={handleImageChange} required />
                            <div className='flex justify-center mt-2'>
                                <button type="submit" className="w-full py-2 px-4 bg-neon-green text-gray-900 font-bold rounded hover:bg-neon-green-dark focus:outline-none focus:shadow-outline">
                                    Add Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
