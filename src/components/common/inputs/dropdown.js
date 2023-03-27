import React, { useState, useEffect } from "react";

const Dropdown = ({ options = ["No option selected"], optionName = "Seleccionar", setSelectedValue }) => {
  const [selection, setSelection] = useState(options[0]);

  useEffect(() => {
    setSelectedValue(options[0]);
  }, [options[0]]);

  function handleSelectedValue(event) {
    const value = event.target.value;
    setSelection(value);
    setSelectedValue(value);
  }

  return (
    <div>
      <select
        id="select-option"
        onChange={handleSelectedValue}
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
