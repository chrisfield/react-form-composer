import React, { createContext, useContext } from 'react';

export const ScopeContext = createContext('');

export const useScope = (name = '') => {
  const parentName = useContext(ScopeContext);
  const dot = (parentName && name) ? '.': '';
  return `${parentName}${dot}${name}`;
};

const Scope = ({name, children}) => {
  const fullScopeName = useScope(name);
  return (
    <ScopeContext.Provider value={fullScopeName}>
      {children}
    </ScopeContext.Provider>
  );
};

export default Scope;