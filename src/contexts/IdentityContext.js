import { createContext } from 'react';

const IdentityContext = createContext({
  current: undefined,
  setCurrent: () => {},
});

export default IdentityContext;
