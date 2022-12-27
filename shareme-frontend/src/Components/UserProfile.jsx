import React, {useState} from "react";
import PersonalFeed from "./PersonalFeed";
import {useNavigate} from "react-router-dom";
import { client } from '../client';
import {userQuery} from "../Utils/data";
import img from "../assets/cover.jpg"
import EditProfile from "./EditProfile";
import {useRef} from "react";
import copy from "copy-to-clipboard";  

const UserProfile = () =>{
    const textToCopy = 'Some text to copy';
    const textInputRef = useRef(null);
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.clear();
        navigate('/login');
    }
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const query = userQuery(userInfo?._id);
    const [about, setAbout] = useState(" ");
    const [user_name, setUsername] = useState(userInfo?.userName);
    const [image, setImage] = useState("");
    const [Twitter, setTwitter] = useState("");
    const [Instagram, setInstagram] = useState("");
    const [Facebook, setFacebook] = useState("");
    const [Email, setEmail] = useState("");
    client.fetch(query)
        .then((data)=>{
            setAbout(data[0].about);
            setUsername(data[0].userName);
            setImage(data[0].image);
            setEmail(data[0].email);
            setFacebook(data[0].facebook);
            setInstagram(data[0].instagram);
            setTwitter(data[0].twitter);
        })  
    const copyToClipboard = () => {
        copy(Email);
        alert(`You have copied "${Email}"`);
    };
    return (
        <>
            <div className="bg-white  shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div className="w-full flex justify-center align-center">
                    <div className="w-32">
                        <img src={image} alt=""
                             className="object-contain rounded-full mx-auto shadow-md border-4 border-white h-32" />
                    </div>
                </div>
                <div className="mt-3">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{user_name}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium mt-2">{about}</p>
                    <EditProfile user = {userInfo && userInfo}/>
                    <div className="w-full flex align-center justify-center mt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-28" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="flex justify-between items-center my-5 px-6">
                        <a href={Facebook}
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
                        <a href={Twitter}
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
                        <a href={Instagram}
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
                        <div
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 hover:cursor-pointer"
                           onClick={copyToClipboard}
                           >Email</div>
                    </div>
                </div>  
            </div>
            <div className="bg-white shadow rounded-lg w-11/12 h-full mx-auto" >
                <PersonalFeed user_id = {userInfo._id}/>
            </div>
        </>

    )
}
export default UserProfile;