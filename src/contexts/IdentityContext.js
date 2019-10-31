import { createContext } from 'react';

const IdentityContext = createContext({
  current: undefined,
  setCurrent: undefined,
});

export default IdentityContext;
