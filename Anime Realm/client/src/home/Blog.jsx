import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const Blog = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [likeCount, setLikeCount] = useState(); // Initialize with post's current like count
    const [liked, setLiked] = useState(false); // Track if the post is liked by the user
    const [error, setError] = useState('');
    // const [disliked, setDisliked] = useState(false);
    const userId = localStorage.getItem('userId');

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/post/${id}`);
            setPost(response.data);
            setLikeCount(response.data.likecount);
            const commentResponse = await axios.get(`http://localhost:5000/api/comment/${id}`);
            setComments(commentResponse.data);
        } catch (error) {
            alert('Error fetching post');
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            await axios.post(
                `http://localhost:5000/api/comment/${id}`,
                { content },
                { headers: { userId } }
            );
            fetchPost();
            setContent('');
        } catch (error) {
            if(!userId){
                alert('please Login First');
            }else{

                console.error('Error adding comment:', error);
            }
        }
    };

    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/post/checklike/${id}/${userId}`);
                setLiked(response.data.liked);
            } catch (error) {
                // console.error('Error checking like status:', error);
                
            }
        };
        checkIfLiked();
    }, [id, userId]);

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/post/like/${id}`, { userId });
            setLikeCount(response.data.likecount);
            setLiked(!liked); // Toggle the liked state
            setError(''); // Clear any previous error
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message); // Set the error message from the server
            } else {
                if(!userId){
                    alert('please Login First');
                }else{
                    console.error('Error liking the post:', error);

                }
            }
        }
    };


    if (!post) return <div>Loading...</div>;

    // Split content into lines
    const contentLines = post.content.split(/\r?\n/);


    return (
        <div className='bg-gray-800'>
            <div className='fixed w-full'>
                <Navbar />
            </div>
            <div className="container mx-auto p-4 rounded">
                <div className="bg-gray-800 my-4 rounded-lg mx-4 md:mx-0 mt-[20vh]">
                    <h2 className="text-neon-green text-3xl font-bold">{post.title}</h2>
                    {post.image && (
                        <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="mt-2 rounded-lg w-full w-[40vw] h-[30vw] object-cover" />
                    )}
                    {contentLines.map((line, index) => (
                        <p key={index} className='text-white'>{line}</p>
                    ))}
                </div>
            </div>
            <div className="like flex justify-center my-2">
                <div className='w-[80vw]'>
                    <button className={`bg-${liked ? 'blue' : 'gray'}-800 text-white border-[1px] flex text-white py-2 px-4 rounded`} onClick={handleLike}>
                        {liked ? 'Upvoted' : 'Upvote'} : <p className='text-neon-green'>{likeCount}</p>
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
            <div className='flex mx-auto w-[80vw] flex flex-col-reverse'>
                <div className="bg-gray-800 p-4 mb-4 rounded-lg">
                    <h3 className="text-neon-green text-lg font-bold mb-2">Comments</h3>
                    {comments.map(comment => (
                        <div key={comment._id} className="my-4">
                            <p className="text-white">{comment.content}</p>
                            <p className="text-gray-400 text-sm">Posted by: {comment.author.username}</p>
                        </div>
                    ))}
                </div>

                <div className='w-[80vw]'>
                    <form onSubmit={handleSubmit} className='flex'>
                        <textarea
                            className="textarea-no-outline focus:outline-none focus:border-b-[1px] w-full p-2 rounded border-b-[1px] bg-gray-800 text-white mr-2"
                            rows="1"
                            placeholder="Write your comment..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Blog;
