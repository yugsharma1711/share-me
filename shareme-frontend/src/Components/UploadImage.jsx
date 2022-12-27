import React from "react";
import { IoMdAdd } from 'react-icons/io';
import {client} from "../client";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Spinner } from "react-bootstrap";
export default function UploadImage() {
    const [showModal, setShowModal] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [about, setAbout] = React.useState("");
    const [imageAsset, setImageAsset] = React.useState();
    const [loading, setLoading] = useState(false);
    const [wrongImageType, setWrongImageType] = useState(false);
    const navigate = useNavigate();
    const [disable,setDisable] = useState(true);
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    const uploadImage = (e) => {
            const selectedFile = e.target.files[0];
            console.log(selectedFile)
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
                setDisable(true);
            }
            
    }
    const savePin = () =>
    {
        setShowModal(false)
        const doc = {
            _type: 'pin',
            title: title,
            about: about,
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset?._id,
                },
            },
            userId: user._id,
            postedBy: {
                _type: 'postedBy',
                _ref: user._id,
            },
        }
        client.create(doc).then(
            ()=>{
                navigate('/');
            }
        )
    }
    const handleDelete = ()=>{
        setImageAsset(null)
        setDisable(true)
    }
    return (
        <>
            <button
                className="bg-black text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-0.6 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                type="button"
                onClick={() => setShowModal(true)}>
                <IoMdAdd/>
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="w-full max-w-xs">
                                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                Title
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Title" onChange={e=> setTitle(e.target.value)}/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Title">
                                                Caption
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
                                                        {
                                                        wrongImageType && (
                                                            <p>It&apos;s wrong file type.</p>
                                                        )
                                                        }
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
                </>
            ) : null}
        </>
    );
}