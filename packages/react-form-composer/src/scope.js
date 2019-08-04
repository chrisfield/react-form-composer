import React, { createContext, useContext } from 'react';

export const Context = createContext({});

export const Provider = ({ children, ...props }) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

export const useScope = (name = '') => {
  const scopeProps = useContext(Context);
  const dot = (scopeProps.name && name) ? '.': '';
  return {name: `${scopeProps.name}${dot}${name}`};
};

const Scope = ({name, children}) => {
  const { name: fullScopeName} = useScope(name);
  return (
    <Provider name={fullScopeName}>
      {children}
    </Provider>
  );
};

export default Scope;
