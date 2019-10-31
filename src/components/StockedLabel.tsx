import React from 'react';

type StockedLabelProps = {
  stocked: boolean;
};

const StockedLabel: React.FC<StockedLabelProps> = ({ stocked }: StockedLabelProps) => {
  return stocked ? (
    <span className="badge badge-success">In Stock</span>
  ) : (
    <span className="badge badge-danger">Out of Stock</span>
  );
};

export default StockedLabel;
