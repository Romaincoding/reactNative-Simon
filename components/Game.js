import React from 'react';
import { Text, FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import {Dimensions} from 'react-native';



    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;
    const couleurTab = ["jaune", "bleu", "rouge", "vert"]
export default class Game extends React.Component {


 selectionCouleur = () =>{
 var couleur = couleurTab[Math.floor(Math.random() * 4)]

 switch (couleur){

 case "jaune":
    return jaune.style.height = 150;

  console.log("la couleur 5 est " + couleur);
// return <View style={{width: 150, height: 150, backgroundColor: 'gold'}} />;



 case "bleu":
 console.log("la couleur est " + couleur);
    return bleu.style.height = 150;

 //return <View style={{width: 150, height: 150, backgroundColor: 'aqua'}} />;


 case "rouge":
    return rouge.style.height = 150;

// return <View style={{width: 150, height: 150, backgroundColor: 'crimson'}} />;


 case "vert":
    return  vert.style.height = 150;

  console.log("la couleur 4 est " + couleur);
 //return <View style={{width: 150, height: 150, backgroundColor: 'chartreuse'}} />;

 };

 }
 render(){
     return (

       // Try setting flexDirection to column.
       <View style={styles.ContainerTuiles}>

           <View style={styles.RangeeTuiles}>
             <View style={styles.TuileBleu} />
             <View style={styles.TuileVert} />
           </View>

           <View style={styles.RangeeTuiles}>
             <View style={styles.TuileRouge} />
             <View style={styles.TuileJaune} />
           </View>

         <Button title="Jouer"/>

       </View>
     );
   }

 }

   const styles = StyleSheet.create({
         ContainerTuiles : {
             width: windowWidth/1.5,
             height: windowHeight/3,
             marginLeft: windowWidth/6,
             marginTop: 100
         },
         RangeeTuiles : {
                 flex: 1,
                 flexDirection: 'row',
                 justifyContent: 'space-around'
                         },
         TuileBleu : {
                 width: 100,
                 height: 100,
                 backgroundColor: '#01579b'
             },
         TuileVert : {
                   width: 100,
                   height: 100,
                   backgroundColor: '#1b5e20'
               },
         TuileRouge : {
                 width: 100,
                 height: 100,
                 backgroundColor: '#bf360c'
             },
         TuileJaune : {
                   width: 100,
                   height: 100,
                   backgroundColor: '#fbc02d'
               }
 });


















