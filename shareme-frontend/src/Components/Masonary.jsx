import React from 'react';
import Pin from './Pin';
const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
};

const Masonary = ({ pins }) => (
    <div>
        <div
            className="columns-1 md:columns-3 lg:columns-4 "> 
            {/* array of JSX items */}
            {pins.map((pin) => <Pin key={pin._id} pin={pin && pin} className="w-max " />)}
        </div>
    </div>
);

export default Masonary;