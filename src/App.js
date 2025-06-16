
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';

import './App.css';
import logo from './logo.svg';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white font-nanum-gothic">
                <nav className="bg-gray-800 p-4">
                    <ul className="container mx-auto flex justify-between items-center">
                        <li>
                            <Link to="/" className="flex items-center space-x-4">
                                <img src={logo} alt="logo" className="w-8 h-8 animate-spin-slow"/>
                            </Link>
                        </li>
                        <li className="flex space-x-4">
                            <Link to="/" className="px-4 py-2 text-white hover:bg-gray-700 rounded-md transition duration-300">
                                홈
                            </Link>
                            <Link to="/about" className="px-4 py-2 text-white hover:bg-gray-700 rounded-md transition duration-300">
                                소개
                            </Link>
                            <Link to="/posts" className="px-4 py-2 text-white hover:bg-gray-700 rounded-md transition duration-300">
                                블로그
                            </Link>
                        </li>
                    </ul>
                </nav>

                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;