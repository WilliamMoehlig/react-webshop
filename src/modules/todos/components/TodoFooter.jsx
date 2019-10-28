import React from 'react';
import { number } from 'prop-types';

function TodoFooter({ remaining }) {
  return (
    <div className="todos__footer" data-testid="amount-of-remaining-todos">
      <strong>
        <span>{remaining}</span>
      </strong>
      {` ${remaining === 1 ? 'item': 'items'} remaining`}
    </div>
  );
}

TodoFooter.propTypes = {
  remaining: number,
};

TodoFooter.defaultProps = {
  remaining: 0,
};

export default TodoFooter;
