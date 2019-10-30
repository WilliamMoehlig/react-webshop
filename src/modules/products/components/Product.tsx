import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { addProduct } from '../../../store/actions/productActions';
import { formatCurrency, calcDiscount } from '../../../util/numberUtils';
import IProduct from '../../../models/Product';
import Button from '../../../components/Button';
import StockedLabel from '../../../components/StockedLabel';
import ProductImage from '../../../components/ProductImage';

import './Product.scss';

export type ProductProps = {
  product: IProduct;
};

const Product: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addProduct(product));
  };

  return (
    <div className="card">
      <ProductImage product={product} />
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
          {product.basePrice && product.basePrice > product.price && (
            <span className="money money--old">
              <del>{formatCurrency(product.basePrice)}</del>
            </span>
          )}
        </li>
      </ul>
      <li className="list-group-item">
        <h5 className="mb-0">
          <StockedLabel stocked={product.stocked} />
        </h5>
      </li>
      <div className="card-body">
        <Button className="btn btn-primary btn-block" disabled={!product.stocked} onClick={addToCartHandler}>
          <FontAwesomeIcon icon={faCartPlus} /> ADD TO CART
        </Button>
      </div>
      {product.basePrice && product.basePrice > product.price && (
        <span className="product-discount-label">-{calcDiscount(product.basePrice, product.price)}%</span>
      )}
    </div>
  );
};

export default Product;
