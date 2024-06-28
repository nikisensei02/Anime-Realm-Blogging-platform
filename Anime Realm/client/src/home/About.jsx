import Navbar from "../Navbar";

const About = () => {
    return (
        <div className="bg-gray-800 h-screen">
            <div className='fixed w-full'>
                <Navbar/>
            </div>
            <div className="text-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">About Our Anime Blogging Website</h1>
                <p className="text-lg mb-4">
                    Welcome to our anime blogging platform! Here, we aim to provide a community-driven space for anime enthusiasts to connect, share their thoughts, and explore the vast world of anime together.
                </p>
                <p className="text-lg mb-4">
                    Whether you are a seasoned otaku or just diving into the anime universe, our website offers:
                </p>
                <ul className="list-disc pl-6 text-lg mb-4">
                    <li>A platform to publish and read anime reviews, analyses, and recommendations.</li>
                    <li>Engaging discussions on the latest anime series, characters, and trends.</li>
                    <li>Opportunities to connect with fellow fans through comments, forums, and community events.</li>
                    <li>Curated lists and rankings to discover new anime based on genre, popularity, and user recommendations.</li>
                </ul>
                <p className="text-lg mb-4">
                    Join us on our journey to explore the endless possibilities of anime storytelling and fandom!
                </p>
            </div>
        </div>
    );
};

export default About;
