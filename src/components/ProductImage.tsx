/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Product from '../models/Product';

type ProductImageProps = React.ButtonHTMLAttributes<HTMLImageElement> & {
  product: Product;
};

const ProductImage: React.FC<ProductImageProps> = ({ product, ...rest }: ProductImageProps) => {
  return (
    <img src={product.image || 'https://dummyimage.com/300x300.png/dddddd/000000'} alt={product.title} {...rest} />
  );
};

export default ProductImage;
