import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const id = navigation.getParam('id');

  const [result, setResult] = useState(null);

  const getResult = () => {
    yelp
      .get(`/businesses/${id}`)
      .then((res) => {
        if (res?.data) setResult(res.data);
      })
      .catch((err) => {
        setErrorMessage('Something went wrong');
      });
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <View>
      <Text>{result?.name}</Text>
      {result?.photos && (
        <FlatList
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});

export default ResultsShowScreen;
