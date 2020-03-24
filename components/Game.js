import React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'



export default class Game extends React.Component {

render(){
    return (
      // Try setting flexDirection to column.
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 300, height: 300, backgroundColor: 'aqua'}} />
        <View style={{width: 300, height: 300, backgroundColor: 'chartreuse'}} />
        <View style={{width: 300, height: 300, backgroundColor: 'crimson'}} />
        <View style={{width: 300, height: 300, backgroundColor: 'gold'}} />
      </View>
    );
  }
};










