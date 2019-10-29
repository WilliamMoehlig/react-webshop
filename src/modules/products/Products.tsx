import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import Product from './components/Product';
import { getProducts } from '../../api/productApi';

type ProductProps = {
  limit?: number;
};

const Products: React.FC<ProductProps> = ({ limit = 12 }: ProductProps) => {
  const [state, setState] = useState();

  const { search } = useLocation();

  const query = search.match(/page=([0-9]+)/);
  const page = query ? +query[1] : 1;

  useEffect(() => {
    async function fetchProducts() {
      const productResponse = await getProducts({ page });
      setState({
        products: productResponse.products,
        total: productResponse.total,
      });
    }

    fetchProducts();
  }, [page]);

  if (!state) {
    return null;
  }

  const { products, total } = state;
  const maxPages = Math.ceil(total / limit);

  if (page < 1 || page > maxPages) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="container-fluid">
      <h1>Web Shop</h1>
      <div className="row mb-2">
        <div className="col-12">
          <nav className="d-flex justify-content-between" aria-label="Product Page navigation">
            <a
              className={classNames('btn btn-sm btn-outline-primary', { disabled: page <= 1 })}
              href={`/products?page=${page - 1}`}
            >
              Previous
            </a>
            <a
              className={classNames('btn btn-sm btn-outline-primary', { disabled: page >= maxPages })}
              href={`/products?page=${page + 1}`}
            >
              Next
            </a>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row product-grid">
            <div className="col-3">
              {products.map(prod => (
                <Product key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
