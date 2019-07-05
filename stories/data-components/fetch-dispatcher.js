import React, {useEffect} from 'react';
import {
  useFormReducer
} from '../../packages/react-form-composer/src';

const FetchDispatcher = ({url, dispatchSelector, formName}) => {
  const dispatch = useFormReducer(formName)[1];
  useEffect(() => {
    let isSubscribed = true;
    fetch(url)
    .then((data) => {
      data.json()
      .then(json => {
        if (isSubscribed) {
          dispatch (dispatchSelector(json));
        }
      }) 
    });
    return () => {isSubscribed = false};
  }, []);
  return null;
};

export default FetchDispatcher;
