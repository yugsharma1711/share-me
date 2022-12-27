import {useState} from "react";
import {client} from "../client";
import React from "react";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Spinner } from "react-bootstrap";
const EditProfile = ({user})=>{
    const [showModal, setShowModal] = useState(false);
    const [user_name, setUserName] = useState("");
    const [about, setAbout] = useState("");
    const [facebook, setFacebook]= useState("");
    const [instagram, setInstagram] = useState("");
    const [Twitter, setTwitter] = useState("");
    const [disable, setDisable] = useState(false);
    const [imageAsset, setImageAsset] = React.useState(null);
    const [wrongImageType, setWrongImageType] = useState(false);
    const [loading, setLoading] = useState(false);
    const uploadImage = (e) => {
        setDisable(true);
        const selectedFile = e.target.files[0];
        // uploading asset to sanity
        if (selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff'))
            {
                client.assets
                    .upload('image', selectedFile, {contentType: selectedFile.type, filename: selectedFile.name})
                    .then((document) => setImageAsset(document) )
                    .then(()=>{setDisable(false)});
            } else {
                setImageAsset(null);
                alert('Wrong File Uploaded');
                setDisable(false);
            }
    }
    const savePin = () =>
    {
        setShowModal(false)
        if (user_name) {
            client.patch(user._id)
                .set(
                    {userName: user_name}
                )
                .commit()
                .then(()=>{
                    console.log("User Name updated");
                })
        }
        if (about) {
            client.patch(user._id)
                .set(
                    {about: about}
                )
                .commit()
                .then(()=>{
                    console.log("About Updated");
                })
        }
        if (imageAsset) {
            client.patch(user._id)
                .set(
                    {image: imageAsset['url']}
                )
                .commit()
                .then(()=>{
                    console.log("Image Updated");
                })
        }
        if (facebook){
            client.patch(user._id)
                .set(
                    {facebook: facebook}
                )
                .commit()
                .then(()=>{
                    console.log("Image Updated");
                })
        }
        if (Twitter){
            client.patch(user._id)
                .set(
                    {twitter: Twitter}
                )
                .commit()
                .then(()=>{
                    console.log("Image Updated");
                })
        }
        if (instagram){
            client.patch(user._id)
                .set(
                    {instagram: instagram}
                )
                .commit()
                .then(()=>{
                    console.log("Image Updated");
                })
        }if (instagram){
        client.patch(user._id)
            .set(
                {instagram: instagram}
            )
            .commit()
            .then(()=>{
                console.log("Image Updated");
            })
    }
    }
    const handleDelete = ()=>{
        setImageAsset(null)
    }
    return(
        <>
            <div className="flex justify-center align-center w-full">
                <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2" onClick={()=>{setShowModal(true)}}>Edit Profile</button>
            </div>
            {showModal ? (
                <div className="max-h-screen">
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
                            {/*content*/}
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="w-full max-w-xs">
                                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                User Name
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Title" onChange={e=> setUserName(e.target.value)}/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                About
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="text" onChange={e=> setAbout(e.target.value)}/>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="">
                                                <div className="">
                                                    <div className = "flex justify-center text-gray-700 font-bold text-sm" >
                                                        <label className="mb-2 ">File Upload</label>
                                                    </div>
                                                    <div className="flex items-center justify-center w-full hover:cursor-pointer border-2 border-black-400 shadow-xl align-center p-2">
                                                    {loading && (
                                                        <Spinner />
                                                    )}
                                                        {!imageAsset ? (
                                                        // eslint-disable-next-line jsx-a11y/label-has-associated-control
                                                        <label>
                                                            <div className="flex flex-col align-center justify-center">
                                                                <div className="flex flex-col justify-center items-center p-2">
                                                                    <p className="font-bold text-2xl hover:cursor-pointer">
                                                                    <AiOutlineCloudUpload />
                                                                    </p>
                                                                    <p>Click to upload</p>
                                                                </div>
                                                                <p className="text-gray-500 text-sm">
                                                                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                                                                </p>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                name="upload-image"
                                                                onChange={uploadImage}
                                                                className="w-0 h-0"

                                                            />
                                                        </label>
                                                        ) : (
                                                        <div className="relative h-full">
                                                            <img
                                                                src={imageAsset?.url}
                                                                alt="uploaded-pic"
                                                                className="h-full w-full"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                                                onClick={handleDelete}
                                                            >
                                                            <MdDelete />
                                                            </button>
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                Facebook
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Title" onChange={e=> setFacebook(e.target.value)}/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                Instagram
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Title" onChange={e=> setInstagram(e.target.value)}/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                Twitter
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Title" onChange={e=> setTwitter(e.target.value)}/>
                                        </div>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end px-6 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-emerald-200"
                                        type="button"
                                        onClick={savePin}
                                        disabled = {disable}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    );
}
export default EditProfile;