import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../../models/State';
import ProductCollection from '../../../models/ProductCollection';

type ShoppingCartLinkProps = {
  className?: string;
};

const ShoppingCartLink: React.FC<ShoppingCartLinkProps> = ({ className }: ShoppingCartLinkProps) => {
  const products = useSelector((state: State<ProductCollection>) => state.cartProducts);
  const count = Object.values(products).reduce((acc, product) => {
    return acc + product.count;
  }, 0);

  return (
    <div className={className}>
      <Link to="/checkout">
        <i className="fa fa-shopping-cart" /> ({count})
      </Link>
    </div>
  );
};

export default ShoppingCartLink;
