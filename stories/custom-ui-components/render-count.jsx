import React, {useRef, useEffect} from 'react';

const RenderCount = ({name, children}) => {
  const countRef = useRef(1);
  useEffect(()=>{
    countRef.current = countRef.current + 1;
  });
  const Span = () => (
    <span style={{backgroundColor: 'yellow'}}>
      {name && <><br/>{name} renders:</>}{countRef.current + ''}
    </span>
  );
  return (
    <div>
      {name && <Span/>}
      {children}
      {!name && <Span/>}
    </div>
  )
};

export default RenderCount;
