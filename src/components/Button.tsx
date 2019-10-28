/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';

const SIZE_MAP = {
  small: 'sm',
  large: 'lg',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  block?: boolean;
  size?: 'small' | 'large';
  variant?: 'primary' | 'secondary' | 'link ';
};

const Button: React.FC<ButtonProps> = ({ block, className, variant, size, type, ...rest }: ButtonProps) => {
  const mappedSize = SIZE_MAP[size];

  return (
    <button
      {...rest}
      type={type}
      className={classNames('btn', className, {
        [`btn-${variant}`]: variant,
        [`btn-${mappedSize}`]: mappedSize,
        'btn-block': block,
      })}
    />
  );
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
};

export default Button;
