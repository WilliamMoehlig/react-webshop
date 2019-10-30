import React from 'react';
import Product from '../models/Product';

type ProductImageProps = {
  product: Product;
};

const ProductImage: React.FC<ProductImageProps> = ({ product }: ProductImageProps) => {
  return <img src={product.image || 'https://dummyimage.com/300x300.png/dddddd/000000'} alt={product.title} />;
};

export default ProductImage;
