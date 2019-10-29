import React from 'react';

function ProductListItem() {
  return (
    <tr>
      <th scope="row" className="border-0">
        <div className="p-2">
          <img
            src="https://dummyimage.com/300x300.jpg/5fa2dd/ffffff"
            alt="aliquet"
            width="70"
            className="img-fluid rounded shadow-sm"
          />
          <div className="ml-3 d-inline-block align-middle">
            <h5 className="mb-0">title</h5>
            <span className="text-muted font-weight-normal font-italic d-block">sku</span>
          </div>
        </div>
      </th>
      <td className="border-0 align-middle">
        <strong>
          <span className="money">€&nbsp;13,78</span>
        </strong>
      </td>
      <td className="border-0 align-middle">
        <strong>2</strong>
      </td>
      <td className="border-0 align-middle">
        <button
          type="button"
          className="btn btn-link btn-sm p-0 text-dark"
          aria-label="Remove"
          style={{ verticalAlign: 'top' }}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default ProductListItem;
