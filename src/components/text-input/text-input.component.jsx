import React from 'react';

const TextInput = ({ ...otherProps }) => {
    return (
        <input {...otherProps} />
    );
}

export default TextInput;