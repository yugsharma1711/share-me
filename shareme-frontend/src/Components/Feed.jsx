import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import Masonary from './Masonary';
import {feedQuery, searchQuery} from "../Utils/data";
import Spinner from './Spinner';
const Feed = () =>{
    const [Loading, setLoading] = useState(true);
    const [Pins, setPins] = useState(null);
    const {categoryId} = useParams();
    useEffect(()=>{
        if(categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query)
                .then((data)=>{
                    setPins(data)
                    setLoading(false)
                })
        }
        else{
            const query = feedQuery()
            client.fetch(query)
                .then((data)=> {
                    setPins(data)
                    setLoading(false)
                })
            }
        }, [])
    if (Loading){
        return <Spinner message = "Just wait for a while !"/>
    }

    return (
        <div>
            <Masonary pins={Pins} />
        </div>
    );
}

export default Feed;