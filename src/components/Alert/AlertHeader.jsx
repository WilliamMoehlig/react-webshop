import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';

function AlertHeader({ children, className }) {
  return <h4 className={classNames('alert-heading', className)}>{children}</h4>;
}

AlertHeader.propTypes = {
  children: node.isRequired,
  className: string,
};

AlertHeader.defaultProps = {
  className: undefined,
};

export default AlertHeader;
