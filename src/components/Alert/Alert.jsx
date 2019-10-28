import React, { useState } from 'react';
import { node, oneOf, bool } from 'prop-types';
import classNames from 'classnames';

function Alert({ children, dismissible, variant }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="alert"
      className={classNames('alert', {
        [`alert-${variant}`]: true,
        'alert-dismissible': dismissible,
      })}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => setTimeout(() => setDismissed(true), 50)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}

Alert.propTypes = {
  children: node.isRequired,
  dismissible: bool,
  variant: oneOf(['primary', 'secondary']),
};

Alert.defaultProps = {
  dismissible: false,
  variant: 'primary',
};

export default Alert;
