import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductListItem from './ProductListItem';

import ProductCollection from '../../../models/ProductCollection';
import { State } from '../../../models/State';
import Product from '../../../models/Product';

import { deleteProduct } from '../../../store/actions/productActions';

export default function ProductList() {
  const dispatch = useDispatch();

  const products = useSelector((state: State<ProductCollection>) => Object.values(state.cartProducts));

  const onProductRemoveHandler = (id: number) => {
    dispatch(deleteProduct(id));
  };

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
      <tbody>
        {products.map(product => (
          <ProductListItem
            key={product.id}
            product={product as Product}
            quantity={product.count}
            onButtonClicked={() => onProductRemoveHandler(product.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
