import React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import {Dimensions} from 'react-native';

    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;

export default class Game extends React.Component {

render(){
    return (

      // Try setting flexDirection to column.
      <View style={{width: windowWidth/1.5, height: windowHeight/3, marginLeft: windowWidth/6, marginTop: 100}}>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{width: 100, height: 100, backgroundColor: 'aqua'}} />
            <View style={{width: 100, height: 100, backgroundColor: 'chartreuse'}} />
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{width: 100, height: 100, backgroundColor: 'crimson'}} />
            <View style={{width: 100, height: 100, backgroundColor: 'gold'}} />
          </View>

      </View>
    );
  }
};










