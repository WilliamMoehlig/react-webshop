const logins = [
  {
    username: 'admin',
    password: 'secret',
  },
  {
    username: 'user',
    password: 'pass',
  },
];

/**
 * Validate user by its username and password
 * @param {string} username
 * @param {string} password
 */
export function validateUser(username, password) {
  return logins.some((login) => login.username === username && login.password === password);
}

export default {
  validateUser,
};
