import { useState, useEffect } from 'react';
import { client } from '../client';
import {personalFeedQuery, searchQuery} from "../Utils/data";
import Spinner from './Spinner';
import UserMasonary from "./userMasonary";
const Personalfeed = (user_id) =>{
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
            <UserMasonary pins={Pins} />
        </div>
    );
}

export default Personalfeed;