import React from 'react';
import  Product from '../../../models/Product'

interface ProductListItemProps {
  product: Product,
  quantity: number,
}
function ProductListItem({product, quantity}: ProductListItemProps) {
  return (
    <tr> 
      <th scope="row" className="border-0">
        <div className="p-2">
          <img
            src="https://dummyimage.com/300x300.jpg/5fa2dd/ffffff"
            alt={product.title}
            width="70"
            className="img-fluid rounded shadow-sm"
          />
          <div className="ml-3 d-inline-block align-middle">
            <h5 className="mb-0">{product.title}</h5>
            <span className="text-muted font-weight-normal font-italic d-block">{product.sku}</span>
          </div>
        </div>
      </th>
      <td className="border-0 align-middle">
        <strong>
          <span className="money">€&nbsp;{(Math.round(product.price *100)/100).toFixed(2)}</span>
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
        >
          <i className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
}

export default ProductListItem;
