import nock from 'nock';
import { getUserById, listPagedUsers, saveUser } from './userApi';

describe('User api', () => {
  function fakeApi() {
    return nock('http://localhost:3000');
  }

  function bartSimpson() {
    return {
      isFamily: true,
      gender: 'M',
      lastName: 'Simpson',
      firstName: 'Bart',
      id: 1,
    };
  }

  function lisaSimpson() {
    return {
      isFamily: true,
      birthDate: '2011-08-13T22:00:00.000Z',
      gender: 'F',
      lastName: 'Simpson',
      firstName: 'Lisa',
      id: 2,
    };
  }

  describe('getUserById', () => {
    test('it returns the data', async () => {
      const resource = bartSimpson();

      fakeApi()
        .get(`/users/1`)
        .reply(200, resource);

      const user = await getUserById(resource.id);

      expect(user).toStrictEqual(resource);
    });

    test('it maps the birthDate as a date', async () => {
      const resource = lisaSimpson();

      fakeApi()
        .get('/users/2')
        .reply(200, resource);

      const user = await getUserById(resource.id);

      expect(user).toStrictEqual({ ...resource, birthDate: new Date(resource.birthDate) });
    });
  });

  describe('listPagedUsers', () => {
    function buildDefaultQuery() {
      return {
        _page: 1,
        _limit: 10,
        _sort: 'lastName,firstName',
      };
    }

    test('ensure it limits the results by default on 10', async () => {
      fakeApi()
        .get('/users')
        .query({
          ...buildDefaultQuery(),
        })
        .reply(200, []);

      await listPagedUsers(1);
    });

    test('it returns the data', async () => {
      const givenPage = 2;
      const givenLimit = 3;

      const bart = bartSimpson();
      const lisa = lisaSimpson();

      fakeApi()
        .get('/users')
        .query({
          ...buildDefaultQuery(),
          _page: givenPage,
          _limit: givenLimit,
        })
        .reply(200, [bart, lisa]);

      const { data } = await listPagedUsers(givenPage, givenLimit);

      expect(data).toStrictEqual([bart, { ...lisa, birthDate: new Date(lisa.birthDate) }]);
    });

    test('it return the value of X-Total-Count header as total', async () => {
      fakeApi()
        .get('/users')
        .query({
          ...buildDefaultQuery(),
        })
        .reply(200, [], { 'X-Total-Count': '10' });

      const { total } = await listPagedUsers(1);

      expect(total).toBe(10);
    });
  });

  describe('saveUser', () => {
    test('it creates a new user when the user has no id', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'M',
        isFamily: false,
        birthDate: new Date(1978, 7, 4),
      };

      const resource = lisaSimpson();

      fakeApi()
        .post('/users', JSON.parse(JSON.stringify(user)))
        .reply(200, resource);

      const newUser = await saveUser(user);
      expect(newUser).toStrictEqual({ ...resource, birthDate: new Date(resource.birthDate) });
    });

    test('it updates the user when the user has an id', async () => {
      const user = {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        gender: 'M',
        isFamily: false,
        birthDate: new Date(1978, 7, 4),
      };

      const resource = lisaSimpson();

      fakeApi()
        .put('/users/3', JSON.parse(JSON.stringify(user)))
        .reply(200, resource);

      const newUser = await saveUser(user);

      expect(newUser).toStrictEqual({ ...resource, birthDate: new Date(resource.birthDate) });
    });
  });
});
