import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render as renderRtl, within, fireEvent } from '@testing-library/react';

import Button, { ButtonProps } from './Button';

describe('Button', () => {
  function render({ variant, type, disabled, className, onClick, size, block }: ButtonProps = {}) {
    const testId = 'my-button-test-id';

    const renderResult = renderRtl(
      <Button
        data-testid={testId}
        variant={variant}
        type={type}
        disabled={disabled}
        className={className}
        onClick={onClick}
        size={size}
        block={block}
      >
        <div data-testid="child" />
      </Button>
    );

    return {
      ...renderResult,
      getComponent: renderResult.getByTestId.bind(null, testId),
    };
  }

  test('it renders by default as a button', () => {
    const { getComponent } = render();

    const button = getComponent();
    expect(button).toHaveProperty('tagName', expect.stringMatching(/button/i));

    expect(button).toHaveClass('btn', 'btn-primary');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveClass('btn-sm');
  });

  test('it renders with a class according to variant', () => {
    const { getComponent } = render({ variant: 'secondary' });

    const button = getComponent();

    expect(button).toHaveClass('btn', 'btn-secondary');
  });

  test('it renders with a class according to size small', () => {
    const { getComponent } = render({ size: 'small' });

    const button = getComponent();

    expect(button).toHaveClass('btn', 'btn-sm');
  });

  test('it renders with a class according to size large', () => {
    const { getComponent } = render({ size: 'large' });

    const button = getComponent();

    expect(button).toHaveClass('btn', 'btn-lg');
  });

  test('it has a block modifier', () => {
    const { getComponent } = render({ block: true });

    const button = getComponent();

    expect(button).toHaveClass('btn', 'btn-block');
  });

  test('ensure it renders as the specified button type', () => {
    const { getComponent: component } = render({ type: 'submit' });

    const button = component();
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('ensure it can handle extra classes trough className', () => {
    const { getComponent: component } = render({ className: 'custom-class' });

    const button = component();
    expect(button).toHaveClass('btn', 'btn-primary', 'custom-class');
  });

  test('ensure it renders its children', () => {
    const { getComponent: component } = render();

    const button = component();

    within(button).getByTestId('child');
  });

  test('ensure it passes disabled', () => {
    const { getComponent: component } = render({ disabled: true });

    const button = component();
    expect(button).toHaveProperty('disabled', true);
  });

  test('ensure it passes onClick', () => {
    const handleClick = jest.fn();

    const { getComponent: component } = render({ onClick: handleClick });

    const button = component();

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
