import React from 'react';
import { useSelector } from 'react-redux';

import { formatCurrency, roundPrice } from '../../../util/numberUtils';
import { AppState } from '../../../models/AppState';
import ProductCollection from '../../../models/ProductCollection';

const SHIPPING_COSTS = 10;
const SHIPPING_FREE_FROM = 40;

const Overview: React.FC = () => {
  const cartProducts = useSelector((state: AppState) => Object.values(state.cartProducts));

  const subtotal = cartProducts.reduce(
    (acc: number, product: ProductCollection) => acc + roundPrice(product.price) * product.count,
    0
  );
  const shippingAndHandling = cartProducts.length > 0 && subtotal < SHIPPING_FREE_FROM ? SHIPPING_COSTS : 0;
  const total = subtotal + shippingAndHandling;

  return (
    <>
      <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary</div>
      <div className="p-4">
        <p className="font-italic mb-4">
          Shipping and additional costs are calculated based on values you have entered.
        </p>
        <ul className="list-unstyled mb-4">
          <li className="d-flex justify-content-between py-3 border-bottom" data-testid="subtotal">
            <strong className="text-muted">Order Subtotal</strong>
            <strong>
              <span className="money">{formatCurrency(subtotal)}</span>
            </strong>
          </li>
          <li className="d-flex justify-content-between py-3 border-bottom" data-testid="shipping-handling">
            <strong className="text-muted">Shipping and handling (free above € {SHIPPING_FREE_FROM})</strong>
            <strong>
              <span className="money money--old">
                {shippingAndHandling ? (
                  <span>{formatCurrency(SHIPPING_COSTS)}</span>
                ) : (
                  <del>{formatCurrency(SHIPPING_COSTS)}</del>
                )}
              </span>
            </strong>
          </li>
          <li className="d-flex justify-content-between py-3 border-bottom" data-testid="total">
            <strong className="text-muted">Total</strong>
            <h5 className="font-weight-bold">
              <span className="money">{formatCurrency(total)}</span>
            </h5>
          </li>
        </ul>
        <button className="btn btn-dark rounded-pill py-2 btn-block" type="button">
          Proceed to checkout
        </button>
      </div>
    </>
  );
};

export default Overview;
