import React from 'react';
import {client} from "../client";
const UserPin = ({pin}) =>{
    const image = pin.image.asset.url;
    const userId = pin.userId;
    const imgId = pin._id;
    const [modal, setModal] = React.useState(false);
    const about = pin.about;
    const deleteFunction = ()=>{
        client
            .delete({query: `*[_type == "pin" && _id == '${imgId}']`})
            .then(()=>{setModal(false)})
            .catch(console.error)
    }
    return (
        <div>
            <img src= {image} alt="" onClick={()=>{setModal(true)}} className="border-2 border-black p-1"/>
            {modal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" onClick={()=>{setModal(false)}}>
                        <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
                            {/*content*/}
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}
                                <div className="w-full max-w-lg px-2 pt-2">
                                    {/* Image */}
                                    <img src= {image} alt=""  className="shadow-lg object-fit"/>
                                    <div className='flex justify-center align-center mt-2 '>
                                        <p className="font-semibold">{about}</p>
                                    </div>
                                    <div className = "flex justify-around py-2">
                                        <div className=" flex flex-row justify-center align-center border-2 border-red-500 text-red-500 font-bold py-2 px-4 rounded-full w-28 hover:bg-red-500 hover:text-white"
                                             onClick={deleteFunction}>
                                            <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"
                                                 stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                                 stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <line x1="4" y1="7" x2="20" y2="7"/>
                                                <line x1="10" y1="11" x2="10" y2="17"/>
                                                <line x1="14" y1="11" x2="14" y2="17"/>
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                                            </svg>
                                            <p className="ml-1">Delete</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>) : null}
        </div>
    );
}

export default UserPin;