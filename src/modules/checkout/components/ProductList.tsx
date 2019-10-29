import React from 'react';

export default function ProductList() {
  return (
    <table role="table" className="table">
      <thead>
        <tr>
          <th scope="col" className="border-0 bg-light">
            <div className="p-2 px-3 text-uppercase">Product</div>
          </th>
          <th scope="col" className="border-0 bg-light">
            <div className="py-2 text-uppercase">Price</div>
          </th>
          <th scope="col" className="border-0 bg-light">
            <div className="py-2 text-uppercase">Quantity</div>
          </th>
          <th scope="col" className="border-0 bg-light">
            <div className="py-2 text-uppercase">Remove</div>
          </th>
        </tr>
      </thead>
    </table>
  );
}
