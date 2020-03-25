import React from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';




export default class Game extends React.Component {

     async componentDidMount (){
         this.sound = {};
         this.sound.click = new Audio.Sound();
         try {
         await this.sound.click.loadAsync( require ('../assets/sound/amelie_poulain.mp3') );
         } catch (error) {
         console.log('errorSound', error);
         }
     };
     _onPress() {
     this.sound.click.replayAsync();
     };


render(){
    return (
      // Try setting flexDirection to column.
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 300, height: 300, backgroundColor: 'aqua'}} />
        <View style={{width: 300, height: 300, backgroundColor: 'chartreuse'}} />
        <View style={{width: 300, height: 300, backgroundColor: 'crimson'}} />
        <View style={{width: 300, height: 300, backgroundColor: 'gold'}} />
        <TouchableOpacity onPress= {() =>this._onPress()}>
            <View>
                <Text>Start</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
};










