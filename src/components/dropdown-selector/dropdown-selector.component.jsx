import React from 'react';

const DropdownSelector = ({ options, handleChange }) => {
    return (
        <select id="product-types" name="product-types" onChange={event => handleChange(event.target.value)}>
            <option hidden disabled selected value>select a catagory</option>

            {
                options ?
                    options.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    )) : ''
            }
        </select>
    );
}

export default DropdownSelector;

