import React from 'react';
import { Link} from 'react-router-dom';
import UploadImage from "./UploadImage";
const Navbar = ({ searchTerm, setSearchTerm, user }) => {    
    const title = '"If you can see it, you can shoot it.';
    if (user) {
        return (
            <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
                <div className="flex justify-center items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                    <p className = 'px-4 text-lg italic font-bold text-center text-gray-600'>{title}</p>
                </div>
                <div className="flex gap-3 ">
                    <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                        <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
                    </Link>
                    <UploadImage/>
                </div>
            </div>
        );
    }

    return null;
};

export default Navbar;