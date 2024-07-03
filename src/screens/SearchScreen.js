import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    searchApi('');
  }, []);

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

  const onTermChange = (newTerm) => {
    setTerm(newTerm);
    setErrorMessage('');
  };

  return (
    <View>
      <SearchBar term={term} onTermChange={onTermChange} onTermSubmit={() => searchApi(term)} />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Text>Search Screen</Text>
      <Text>We have found {results.length} results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
});

export default SearchScreen;
