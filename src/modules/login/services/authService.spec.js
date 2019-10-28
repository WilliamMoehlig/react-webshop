import { validateUser } from './authService';

describe('Authentication service', () => {
  describe('validateUser', () => {
    test('it returns true when username and password are correct', () => {
      const result = validateUser('admin', 'secret');

      expect(result).toBe(true);
    });

    test('it returns false when username is incorrect', () => {
      const result = validateUser('admina', 'secret');

      expect(result).toBe(false);
    });

    test('it returns false when password is incorrect', () => {
      const result = validateUser('admin', 'secret2');

      expect(result).toBe(false);
    });

    test('ensure it returns true for user and pass', () => {
      const result = validateUser('user', 'pass');

      expect(result).toBe(true);
    });
  });
});
