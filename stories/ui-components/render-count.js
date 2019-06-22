import React, {useRef, useEffect} from 'react';

const RenderCount = ({name, children}) => {
  const countRef = useRef(1);
  useEffect(()=>{
    countRef.current = countRef.current + 1;
  }); 
  return (
    <div>
      {children}
      {name && <><br/>Renders: {name}</>}{countRef.current + ''}
    </div>
  )
};

export default RenderCount;
