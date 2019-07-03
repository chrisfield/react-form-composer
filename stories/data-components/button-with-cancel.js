import React from 'react';

const ButtonWithCancel = ({text, isActive, setActive}) => {
  const toggle = () => {
    setActive(!isActive);
  };
  const buttonText = isActive? 'Canel': text;
  return (
    <button type="button" onClick={toggle}>{buttonText}</button>
  );
}

export default ButtonWithCancel;