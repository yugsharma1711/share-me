import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Pin = ({pin}) =>{
    
    const image = pin.image.asset.url;
    const userId = pin.postedBy._id;
    const imgId = pin._id;
    const [modal, setModal] = React.useState(false);
    const postedBy = pin.postedBy.userName;
    const postedIcon = pin.postedBy.image;
    // Creating a link for forwarding when clicked on the specifc profile
    const link ='/externalView/'+ userId; 
    const about = pin.about;
    return (
        <div>
            {/* Normal Image shown on entrance */}
            <img src= {image} alt="" onClick={()=>{setModal(true)}} className="m-2  border-2 border-black p-1 mx-auto"/>
            {/* Detailed view on clicking the image */}
            {modal ? (
                <>
                    {/* Outer body for the modal */}
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={()=>{setModal(false)}}>
                        <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
                            {/*content*/}
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="w-full max-w-lg px-2 pt-2">
                                    {/* Image */}
                                    <img src= {image} alt=""  className="shadow-lg object-fit"/>
                                    <div className='flex justify-center align-center mt-2 '>
                                        <p className= "font-semibold">{about}</p>
                                    </div>
                               </div>
                                {/* Posted By Section  */}
                                <Link to = {link} state = {{from : {pin}}} className= "flex justify-center hover:cursor-pointer align-center">
                                    <img src= {postedIcon} alt= "" className='w-8 h-8 rounded-full shadow-lg border-2 border-black-500'/>
                                    <p className='font-bold'>@{postedBy}</p>          
                                </Link>
                                                          
                            </div>
                        </div>
                    </div>  
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>) : null}
        </div>
    );
}

export default Pin;