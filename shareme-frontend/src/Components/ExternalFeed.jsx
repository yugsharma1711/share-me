import React, { useState, useEffect } from 'react';
import { client } from '../client';
import {personalFeedQuery, searchQuery} from "../Utils/data";
import ExternalMasonary from './ExternalMasonary';
import Spinner from './Spinner';
const ExternalFeed = (user_id) =>{
    const [Loading, setLoading] = useState(true);
    const [Pins, setPins] = useState(null);
    useEffect(()=>{
            const query = personalFeedQuery(user_id.user_id)
            client.fetch(query)
                .then((data)=> {
                    setPins(data)
                    setLoading(false)
                })
    }, [])
    if (Loading){
        return <Spinner message = "Just wait for a while !"/>
    }
    return (
        <div>
            <ExternalMasonary pins={Pins} />
        </div>
    );
}

export default ExternalFeed;