import React from "react";
import {client} from "../client";
const PinDetail = (props) =>{
    const [letlike, setLike] = React.useState(true);
    let likes = props.likes;
    const image = props.image;
    const [Likes, setLikes] = React.useState(likes);
    const likeUpdate = ()=>{
        if (letlike) {
            setLikes(Likes + 1);
            setLike(false);
        }
        else {
            setLikes(Likes - 1)
            setLike(true);
        }
        client.patch(props.imgId)
            .set({likes: Likes})
            .commit()
            .then(()=>{console.log('Like Updated')})
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="w-full max-w-lg px-2 pt-2">
                            <img src= {image} alt=""  className="shadow-2xl"/>
                            <div className = "flex justify-around py-2">
                                <div className=" flex flex-row justify-center align-center border-2 border-red-500 text-red-500 font-bold py-2 px-4 rounded-full w-32 hover:bg-red-500 hover:text-white"
                                     onClick={likeUpdate}>
                                    <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path
                                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                    </svg>
                                    <p className="ml-1">Like: {Likes}</p>
                                </div>
                            </div>
                        </div>
                        <p>Posted by </p>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default PinDetail;