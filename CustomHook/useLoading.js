import {useState} from 'react';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = value => {
    setIsLoading(value);
  };

  return {isLoading, setLoading};
};

export default useLoading;
