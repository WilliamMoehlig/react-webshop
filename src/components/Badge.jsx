import React from 'react';
import { string, node, oneOf } from 'prop-types';
import classNames from 'classnames';

function Badge({ children, 'data-testid': dataTestId, variant }) {
  return (
    <span
      data-testid={dataTestId}
      className={classNames('badge', {
        [`badge-${variant}`]: variant,
      })}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: node.isRequired,
  'data-testid': string,
  variant: oneOf(['primary', 'light']),
};

Badge.defaultProps = {
  'data-testid': undefined,
  variant: 'primary',
};

export default Badge;
