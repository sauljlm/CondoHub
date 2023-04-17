import React, { useState } from 'react';

function TimeBlock(props) {
    const [selectedStartTime, setSelectedStartTime] = useState(props.timeBlock.startTime);
    const [selectedEndTime, setSelectedEndTime] = useState(props.timeBlock.endTime);

    const handleStartTimeChange = (e) => {

        const updatedItems = props.timeBlocks.map(item => {
            if (item.id === props.id) {
                item.startTime = e.target.value;
                return item
            }
            return item;
        });
        props.setTimeBlocks(updatedItems);

        const value = e.target.value;
        const minTime = '00:00';
        const maxTime = selectedEndTime;

        if (value < minTime) {
        setSelectedStartTime(minTime);
        } else if (value > maxTime) {
        setSelectedStartTime(maxTime);
        } else {
        setSelectedStartTime(value);
        }
    };

    const handleEndTimeChange = (e) => {

        const updatedItems = props.timeBlocks.map(item => {
            if (item.id === props.id) {
                item.endTime = e.target.value;
                return item
            }
            return item;
        });
        props.setTimeBlocks(updatedItems);

        const value = e.target.value;
        const minTime = selectedStartTime;
        const maxTime = '23:59';

        if (value < minTime) {
        setSelectedEndTime(minTime);
        } else if (value > maxTime) {
        setSelectedEndTime(maxTime);
        } else {
        setSelectedEndTime(value);
        }
    };

	return (
        <div className="flex justify-around mb-3">
            <div className = "w-1/2 flex flex-col items-center justify-center">
                <label className="mb-2 text-gray-500 flex self-start">Hora Inicio</label>
                <input
                    type="time"
                    id="timepicker"
                    name="appt"
                    required
                    value={selectedStartTime}
                    onChange={(event) => {
                        handleStartTimeChange(event);
                        setSelectedStartTime(event.target.value);
                    }}
                    className="block w-full mr-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <div className = "w-1/2 flex flex-col items-center">
                <label className="mb-2 text-gray-500 flex self-start">Hora Fin</label>
                <input
                    type="time"
                    id="timepicker"
                    name="appt"
                    required
                    value={selectedEndTime}
                    onChange={(event) => {
                        handleEndTimeChange(event);
                        setSelectedEndTime(event.target.value);
                    }}
                    className="block w-full ml-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
        </div>
	);
}

export default TimeBlock;
