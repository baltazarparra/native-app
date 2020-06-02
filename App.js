import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

import moment from 'moment'

export default function App() {
  const [cases, setCases] = useState(null);


  useEffect( () => {
    request();
  },[cases]);

  const request = async () => {
    const response = await fetch('https://covid19-brazil-api.now.sh/api/report/v1/brazil');
    const parsed = await response.json();
    setCases(parsed.data);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Realtime Covid Status</Text>
        <Text style={styles.paragraph}>Casos confirmados</Text>
        <Text style={styles.small}>{cases?.confirmed}</Text>
        <Text style={styles.paragraph}>Mortes</Text>
        <Text style={styles.small}>{cases?.deaths}</Text>
        <Text style={styles.paragraph}>Casos Curados</Text>
        <Text style={styles.small}>{cases?.recovered}</Text>
        <Text style={styles.paragraph}>Atualizado em</Text>
        <Text style={styles.small}>{moment(cases?.updated_at).format("DD/MM HH:mm a")}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    padding: 4,
  },
  paragraph: {
    margin: 12,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: '40px'
  },
  small: {
    fontSize: 10,
    textAlign: 'center'
  }
});