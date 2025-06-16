import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const categoryButtonStyle = `bg-white rounded-lg shadow-md hover:shadow-lg 
    transition-shadow duration-300 p-6`;
    const categoryData = [
        { id: 0, name: 'All'},
        { id: 1, name: 'PS'},
        { id: 2, name: 'WebDev'},
        { id: 3, name: 'Other'}
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('https://api.plaaa.at/blog/posts.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("게시물 리스트를 불러오는 중 오류 발생", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;

    if (error) return <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">게시물 리스트 로드 오류: {error}</p>
    </div>;

    if (!posts) return <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">게시물 리스트를 찾을 수 없습니다.</p>
    </div>;

    return (
        <div className="container mx-auto px-4 py-8 font-nanum-gothic">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">게시물 목록</h2>
            <div className="flex-col max-w-3xl mx-auto">
                <div className="flex">
                    {categoryData.map(category => (
                        <button
                            key={category.id}
                            className={`${categoryButtonStyle} ${
                                selectedCategory === category.id ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <ul className="space-y-4">
                    {posts
                        .filter(post => selectedCategory === 0 || parseInt(post.category) === selectedCategory)
                        .map(post => (
                        <li key={post.contentnum} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                            <Link to={`/posts/${post.contentnum}`} className="block">
                                <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
                                    {post.title}
                                </h3>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                                        {categoryData[parseInt(post.category)].name}
                                    </span>
                                    <span>{post.content}</span>
                                    <span>{post.date}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Posts;