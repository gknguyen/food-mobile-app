import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from './ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');

  const { searchApi, results, errorMessage, setErrorMessage } = useResults();

  const onTermChange = (newTerm) => {
    setTerm(newTerm);
    setErrorMessage('');
  };

  const filterResultsByPrice = (price) => results.filter((result) => result.price === price);

  return (
    <>
      <SearchBar term={term} onTermChange={onTermChange} onTermSubmit={() => searchApi(term)} />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <ScrollView>
        <ResultsList title="Cost Effective" results={filterResultsByPrice('$')} />
        <ResultsList title="Bit Pricier" results={filterResultsByPrice('$$')} />
        <ResultsList title="Big Spender" results={filterResultsByPrice('$$$')} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
});

export default SearchScreen;
