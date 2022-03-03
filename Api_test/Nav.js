import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import styles from './Styles';
const Nav = props => {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('props: ', props);
    setTimeout(() => {
      props.navigation.navigate('App');
    }, 3000);
  }, [props, props.navigation, isFocused]);

  return (
    <View style={styles.viewpage}>
      <Text style={styles.text}>TESTING</Text>

      <ActivityIndicator
        size={'large'}
        color={'#808000'}
        animating={true}></ActivityIndicator>
    </View>
  );
};

export default Nav;
