import React from 'react';
import { useSelector } from 'react-redux';

import { State } from '../../../models/State';
import { formatCurrency } from '../../../util/numberUtils';
import Product from '../../../models/Product';

const Overview: React.FC = () => {
  const cartProducts = useSelector((state: State) => Object.values(state.cartProducts));

  function calcSubtotal(): number {
    return cartProducts.reduce((acc: number, product: Product) => acc + product.price, 0);
  }

  function calcShippingAndHandling(): number {
    return cartProducts.length > 0 && calcSubtotal() < 40 ? 10 : 0;
  }

  function calcTotal(): number {
    return calcSubtotal() + calcShippingAndHandling();
  }

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
              <span className="money">€&nbsp;{formatCurrency(calcSubtotal())}</span>
            </strong>
          </li>
          <li className="d-flex justify-content-between py-3 border-bottom" data-testid="shipping-handling">
            <strong className="text-muted">Shipping and handling (free above € 40)</strong>
            <strong>
              <span className="money money--old">
                {calcShippingAndHandling() ? (
                  <span>€&nbsp;{formatCurrency(10)}</span>
                ) : (
                  <del>€&nbsp;{formatCurrency(10)}</del>
                )}
              </span>
            </strong>
          </li>
          <li className="d-flex justify-content-between py-3 border-bottom" data-testid="total">
            <strong className="text-muted">Total</strong>
            <h5 className="font-weight-bold">
              <span className="money">€&nbsp;{formatCurrency(calcTotal())}</span>
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
