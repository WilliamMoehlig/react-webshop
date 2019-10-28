import React from 'react';
import { shape, number, string, bool } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { formatCurrency } from '../../../util/numberUtils';

function Product({ product }) {
  return (
    <div className="card">
      <img src="https://dummyimage.com/300x300.png/dddddd/000000" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        {product.desc && <p className="card-text">{product.desc}</p>}
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>SKU:</strong> {product.sku}
        </li>
        <li className="list-group-item">
          <span className="money money--new">{formatCurrency(product.price)}</span>
        </li>
      </ul>
      <li className="list-group-item">
        <h5 className="mb-0">
          <span className="badge badge-danger">Out of Stock</span>
        </h5>
      </li>
      <div className="card-body">
        <button type="button" className="btn btn-primary btn-block">
          <FontAwesomeIcon icon={faCartPlus} /> ADD TO CART
        </button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: shape({
    id: number.isRequired,
    title: string.isRequired,
    desc: string,
    sku: string.isRequired,
    /*
    image: string,
    stocked: bool,
    price: number.isRequired,
    basePrice: number,
    */
  }).isRequired,
};

export default Product;
