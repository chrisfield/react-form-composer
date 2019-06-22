import React, {useRef, useEffect} from 'react';

const RenderCount = ({name, children}) => {
  const countRef = useRef(1);
  useEffect(()=>{
    countRef.current = countRef.current + 1;
  }); 
  return (
    <div>
      {children}
      {name && <><br/>{name} renders:</>}{countRef.current + ''}
    </div>
  )
};

export default RenderCount;
