import React from "react";
import {GoogleOAuthProvider} from '@react-oauth/google'
import src_video from '../assets/share.mp4'
import logo_image from '../assets/logowhite.png'
import { useEffect } from 'react';
import {client} from '../client'
import jwt_decode from 'jwt-decode'
import {useNavigate} from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
  const handleCallBackResponse = (response) =>{
    var profileObj = jwt_decode(response.credential);
    console.log(profileObj);
    const doc = {
      _id: profileObj.sub,
      _type: "user",
      userName: profileObj.name,
      image: profileObj.picture,
      about: "Hey there, Looking forward to sharing more images and keeping a good social record",
      email: profileObj.email,
      };
    client.createIfNotExists(doc)
      .then(()=>{
        localStorage.setItem('user', JSON.stringify(doc));
        navigate('/', {replace : true});
      })
  }
  useEffect(()=>{
    /*global google*/
    google.accounts.id.initialize({
      client_id : '1059866178235-upg63gkf1a6refe8ic4lpsd4qs6rif82.apps.googleusercontent.com',
      callback : handleCallBackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById('googleSignIN'),
      {theme : 'outline', size: "large"}
    );
  }, []);
    return(
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                src= {src_video}
                type = "video/mp4"
                loop
                controls = {false}
                autoPlay = {true}
                className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src= {logo_image} width = "130px" alt= "logo" />
                    </div>
                    <div id = 'googleSignIN'></div>
                </div>
            </div>
        </div>
    )
}
export default Login;