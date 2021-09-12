import React from 'react';

import AddCatagory from './components/add-catagory/add-catagory.component';
import AddProduct from './components/add-product/add-product.component';
import loadData from './scripts/load-data';

import './css/App.css';

function App() {
  const buttonClick = () => {
    loadData();
  }

  return (
    <div className="App">
      <div Style="padding-left: 20px">
        <button onClick={buttonClick}>Load Data</button>
        <h1>The Store Manager</h1>
        <AddCatagory />
        <AddProduct />
      </div>
    </div>
  );
}

export default App;
