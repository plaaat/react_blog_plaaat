import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './markdown.css'

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://api.plaaa.at/blog/${id}.md`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.text();
                setPost(data);
            } catch (err) {
                console.error("게시물 상세 데이터를 가져오는 중 오류 발생:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p style={{ textAlign: 'center' }}>게시물 로딩 중...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>게시물 로드 오류: {error}</p>;
    if (!post) return <p style={{ textAlign: 'center' }}>게시물을 찾을 수 없습니다.</p>;

    return (
        <div className="markdown-content mx-auto px-4 py-8 font-nanum-gothic">
            <ReactMarkdown>{ post }</ReactMarkdown>
        </div>
    );
}

export default PostDetail;