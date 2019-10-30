import React from 'react';

function Instructions() {
  return (
    <>
      <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
      <div className="p-4">
        <p className="font-italic mb-4">
          If you have some information for the seller you can leave them in the box below
        </p>
        <textarea name="" cols={30} rows={6} className="form-control" />
      </div>
    </>
  );
}

export default Instructions;
