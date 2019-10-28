import React, { useEffect, useState } from 'react';
import Button from './Button';
import Badge from './Badge';
import { listPagedUsers } from '../api/userApi';

function UserCounterBadge() {
  const [total, setTotal] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const { total: totalAmountOfUsers } = await listPagedUsers(1, 0);
      setTotal(totalAmountOfUsers);
    }
    fetchData();
  }, []);

  return (
    <Button>
      {'Users '}
      <Badge variant="light" data-testid="user-counter">
        {total || '???'}
      </Badge>
    </Button>
  );
}

export default UserCounterBadge;
