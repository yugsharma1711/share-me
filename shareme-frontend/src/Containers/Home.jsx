import React from "react";
import { useState, useEffect, useRef } from "react";
import {Link, Route, Routes} from 'react-router-dom';
import { HiMenu } from "react-icons/hi";
import { Sidebar , UserProfile} from "../Components";
import logo from '../assets/logo.png';
import {userQuery} from '../Utils/data'
import {client} from "../client";
import { CiCircleChevRight } from "react-icons/ci";
import Pins from './Pins';
import ExternalUserView from "../Components/ExternalUserView";
const Home = () =>{
    const [ToggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null);
    const scrollRef = useRef(null)
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    useEffect(() => {
        const query = userQuery(userInfo?._id);
        client.fetch(query).then((data) => {
            setUser(data[0]);
        });
    }, []);
    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    });
    return(
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height ease-out">
            {/*Desktop Side bar as flex on Medium Devices*/}
            <div className="hidden md:flex h-screen">
                <Sidebar user = {user && user}/>
            </div>
            {/*Desktop Side bar end*/}
            {/*Side bar for mobile Devices*/}
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
                    </Link>
                </div>
                {ToggleSidebar && (
                    <div className = 'fixed w-4/5 h-screen bg-white overflow-y-auto animate-slide-in'>
                        <div className= 'absolute w-full flex justify-end'>
                            <CiCircleChevRight fontSize={30} className="cursor-pointer" onClick={()=>{setToggleSidebar(false)}}/>
                        </div>
                        <Sidebar user = {user && user}/>
                    </div>
                )}
            </div>
            {/*Sidebar for mobile Devices end*/}
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile/>} />
                    <Route path="/*" element={<Pins user={user && user} setTogglesidebar = {setToggleSidebar}/>} />
                    <Route path= "/externalView/:userId" element = {<ExternalUserView/>} />
                </Routes>
            </div>
        </div>
    )
}

export default Home;