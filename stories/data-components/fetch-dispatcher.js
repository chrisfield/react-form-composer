import React, {useEffect} from 'react';
import { useForm } from '../../packages/react-form-composer/src';

const FetchDispatcher = ({url, dispatchSelector}) => {
  const {dispatch} = useForm();
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
