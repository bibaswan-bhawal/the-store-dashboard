import React, { useState, useEffect } from 'react';

import { addProductToDB, listenForCatagories } from '../../firebase/firebase.utils';

import TextInput from '../text-input/text-input.component';
import Button from '../button/button.component';

import './add-product.styles.css'
import DropdownSelector from '../dropdown-selector/dropdown-selector.component';

const AddProduct = () => {
    const [options, setOptions] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [product, setProduct] = useState({
        catagory: '',
        name: '',
        price: '',
        imageUrl: '',
        quantity: ''
    });

    useEffect(() => {
        var snapshot = listenForCatagories(setDropdownData);
        return (() => { snapshot() });
    }, []);

    const setDropdownData = (catagories) => {
        setOptions(catagories.map(data => {
            const { id, title } = data
            return ({ value: id, label: title });
        }));
    };

    const handleDropdownChange = (selectedValue) => {
        setProduct({ ...product, catagory: selectedValue })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        const returnValue = await addProductToDB(product);
        setDisabled(returnValue);
        setProduct({
            catagory: '',
            name: '',
            price: '',
            imageUrl: '',
            quantity: ''
        });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <DropdownSelector options={options} handleChange={handleDropdownChange} />
            <label> name: </label>
            <TextInput value={product.name} onChange={event => setProduct({ ...product, name: event.target.value })} />
            <label> price: </label>
            <TextInput value={product.price} onChange={event => setProduct({ ...product, price: event.target.value })} />
            <label> image url: </label>
            <TextInput value={product.imageUrl} onChange={event => setProduct({ ...product, imageUrl: event.target.value })} />
            <label> quantity: </label>
            <TextInput value={product.quantity} onChange={event => setProduct({ ...product, quantity: event.target.value })} />
            <Button disabled={disabled} type="submit">Add</Button>
        </form>
    );
}

export default AddProduct;