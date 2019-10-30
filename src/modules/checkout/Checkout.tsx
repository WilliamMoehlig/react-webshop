import React from 'react';

import ProductList from './components/ProductList';
import Instructions from './components/Instructions';
import Overview from './components/Overview';

function Checkout() {
  return (
    <div className="container-fluid">
      <h2>Basket</h2>
      <div className="row">
        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
          <ProductList />
        </div>
      </div>
      <div className="row py-5 p-4 bg-white rounded shadow-sm">
        <div className="col-lg-6">
          <Instructions />
        </div>
        <div className="col-lg-6">
          <Overview />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
