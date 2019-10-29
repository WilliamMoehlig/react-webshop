import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../../models/State';

type ShoppingCartLinkProps = {
  className?: string;
};

const ShoppingCartLink: React.FC<ShoppingCartLinkProps> = ({ className }: ShoppingCartLinkProps) => {
  const products = useSelector((state: State) => state.cartProducts);
  const count = Object.keys(products).length;

  return (
    <div className={className}>
      <Link to="/checkout">
        <i className="fa fa-shopping-cart" /> ({count})
      </Link>
    </div>
  );
};

export default ShoppingCartLink;
