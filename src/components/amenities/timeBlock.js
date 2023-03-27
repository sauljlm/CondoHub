import React, { useState } from 'react';

function TimeBlock(props) {

	return (
		<div>
            <input
                type="block"
                key={props.id}
                required
                value = {value}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                
            />
        </div>
	);
}

export default TimeBlock;
