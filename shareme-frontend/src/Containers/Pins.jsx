import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navbar, Feed} from '../Components';
const Pins = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed />} />
                </Routes>
            </div>
        </div>
    );
};

export default Pins;