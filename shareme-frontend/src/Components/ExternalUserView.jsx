import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { client } from '../client';
import { userQuery } from '../Utils/data';
import ExternalFeed from './ExternalFeed';
const ExternalUserView = ()=>{
    const data = useLocation()
    const usableInfo = data['state']['from']['pin']['postedBy'];
    const image = usableInfo['image'];
    const userName = usableInfo['userName'];
    const userId = usableInfo['_id'];
    const [about, setAbout] = useState(null);
    const [Twitter, setTwitter] = useState("");
    const [Instagram, setInstagram] = useState("");
    const [Facebook, setFacebook] = useState("");
    const [Email, setEmail] = useState("");
    useEffect(()=>{
        const query = userQuery(userId);
        client.fetch(query)
        .then((data)=>{
            setAbout(data[0].about);
            setEmail(data[0].email);
            setFacebook(data[0].facebook);
            setInstagram(data[0].instagram);
            setTwitter(data[0].twitter);
        })  
    })  
    return(
        <div>
            <div className="bg-white  shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div className="w-full flex justify-center align-center">
                    <div className="w-32">
                        <img src={image} alt=""
                             className="object-contain rounded-full mx-auto shadow-md border-4 border-white h-32" />
                    </div>
                </div>
                <div className="mt-3">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{userName}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium mt-2">{about}</p>
                    <div className="flex justify-between items-center my-5 px-6">
                        <a href={Facebook}
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
                        <a href={Twitter}
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
                        <a href={Instagram}
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
                        <div
                           className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3 hover:cursor-pointer"
                           >Email</div>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow rounded-lg w-11/12 h-full mx-auto" >
                <ExternalFeed user_id = {userId} />  
            </div>
        </div>
    );
}

export default ExternalUserView;