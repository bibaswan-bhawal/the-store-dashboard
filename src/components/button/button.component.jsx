import React from 'react';

const Button = ({ children, ...otherProps }) => {
    return (
        <button {...otherProps} type="submit">{children}</button>
    );
}

export default Button;