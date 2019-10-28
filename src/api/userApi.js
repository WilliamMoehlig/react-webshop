import api from './api';

const RESOURCE_URI = '/users';

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {Date} [birthDate]
 * @property {'M'|'F'} gender
 * @property {Boolean} isFamily
 */

function map(resource) {
  const result = { ...resource };

  if (result.birthDate) result.birthDate = new Date(result.birthDate);
  return result;
}

/**
 * Get a user by its identifier.
 * @param {number} id
 * @returns {Promise<User>}
 */
export async function getUserById(id) {
  const response = await api.get(`${RESOURCE_URI}/${id}`);
  return map(response.data);
}

/**
 * List the users, paged.
 * @param {number} page
 * @param {number} limit
 * @returns {Promise<{
 *  total: number,
 *  data: User[]
 * }>}
 */
export async function listPagedUsers(page, limit = 10) {
  const { data, headers } = await api.get(RESOURCE_URI, {
    params: {
      _page: page,
      _limit: limit,
      _sort: 'lastName,firstName',
    },
  });

  return {
    data: data.map(resource => map(resource)),
    total: +headers['x-total-count'],
  };
}

/**
 * Stores the user
 * @param {User} user
 * @returns {Promise<User>}
 */
export async function saveUser(user) {
  let response;

  if (user.id) {
    response = await api.put(`${RESOURCE_URI}/${user.id}`, user);
  } else response = await api.post(RESOURCE_URI, user);

  return map(response.data);
}
