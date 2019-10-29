import { render } from '@testing-library/react';
describe('Shopping cart notification link', () => {
  test('it renders', () => {
    const { getByTestId } = render(<ShoppingCartLink data-testid="test-cart" />);
    const cart = getByTestId('test-cart');
    expect(cart).toBeInTheDocument();
  });
});
