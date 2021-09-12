import React, { useState } from 'react';

import { addCatagoryToDB } from '../../firebase/firebase.utils';

import TextInput from '../text-input/text-input.component';
import Button from '../button/button.component';

const AddCatagory = () => {
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);

        const returnValue = await addCatagoryToDB(title);
        
        setDisabled(returnValue);
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label> add catagory: </label>
            <TextInput value={title} onChange={event => setTitle(event.target.value)} />
            <Button disabled={disabled} type="submit">Add</Button>
        </form>
    );
}

export default AddCatagory;