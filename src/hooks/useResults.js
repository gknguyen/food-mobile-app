import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = (searchTerm) => {
    yelp
      .get('/businesses/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose',
        },
      })
      .then((res) => {
        if (res.data.businesses) setResults(res.data.businesses);
      })
      .catch((err) => {
        setErrorMessage('Something went wrong');
      });
  };

  useEffect(() => {
    searchApi('');
  }, []);

  return {
    searchApi,
    results,
    errorMessage,
    setErrorMessage,
  };
};
