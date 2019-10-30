import React from 'react';
import Product from '../../../models/Product';
import { formatCurrency } from '../../../util/numberUtils';

interface ProductListItemProps {
  product: Product;
  quantity: number;
  onButtonClicked: (id) => void;
}
function ProductListItem({ product, quantity, onButtonClicked }: ProductListItemProps) {
  return (
    <tr>
      <th scope="row" className="border-0">
        <div className="p-2">
          <img src={product.image} alt={product.title} width="70" className="img-fluid rounded shadow-sm" />
          <div className="ml-3 d-inline-block align-middle">
            <h5 className="mb-0">{product.title}</h5>
            <span className="text-muted font-weight-normal font-italic d-block">{product.sku}</span>
          </div>
        </div>
      </th>
      <td className="border-0 align-middle">
        <strong>
          <span className="money">{formatCurrency(product.price)}</span>
        </strong>
      </td>
      <td className="border-0 align-middle">
        <strong className="quantity">{quantity}</strong>
      </td>
      <td className="border-0 align-middle">
        <button
          type="button"
          className="btn btn-link btn-sm p-0 text-dark"
          aria-label="Remove"
          style={{ verticalAlign: 'top' }}
          onClick={() => onButtonClicked(product.id)}
        >
          <i className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
}

export default ProductListItem;
