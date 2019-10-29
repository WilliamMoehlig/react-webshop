import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../models/State';

const ShoppingCartLink: React.FC = () => {
  const products = useSelector((state: State) => state.cartProducts);
  const count = Object.keys(products).length;

  return <a href="http://">({count})</a>;
};

export default ShoppingCartLink;
