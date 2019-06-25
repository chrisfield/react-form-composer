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

export const useScope = () => {
  const scopeProps = useContext(Context);
  return scopeProps;
};

export const Scope = ({name, children}) => {
  const { name: parentName = ''} = useScope();
  const dot = (parentName && name) ? '.': '';
  const fullScopeName = `${parentName}${dot}${name}`;
  return (
    <Provider name={fullScopeName}>
      {children}
    </Provider>
  );
};
