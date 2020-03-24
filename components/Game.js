import React from 'react';
import { Text, FlatList, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const couleurTab = ["jaune", "bleu", "rouge", "vert"]

export default class Game extends React.Component {
   constructor(props) {
      super(props);
      this.state = { opacity: 0 }
   }

 selectionCouleur = () =>{
     var couleur = couleurTab[Math.floor(Math.random() * 4)]

     switch (couleur){

         case "jaune":
            return jaune.style.height = 150;

          console.log("la couleur 5 est " + couleur);

         case "bleu":
         console.log("la couleur est " + couleur);
            return bleu.style.height = 150;

         case "rouge":
            return rouge.style.height = 150;

         case "vert":
            return  vert.style.height = 150;

          console.log("la couleur 4 est " + couleur);

      };

 }

 render(){

     return (
       // TouchableOpacity car une view est incompatible avec un onPress
       <View style={styles.ContainerTuiles}>

           <View style={styles.RangeeTuiles}>
                 <Text style={styles.textPartie}>Séquences retenues : 1</Text>
            </View>

           <View style={styles.RangeeTuiles}>
             <TouchableOpacity style={styles.TuileBleu} activeOpacity={0.6}/>
             <TouchableOpacity style={styles.TuileVert} activeOpacity={0.6}/>
           </View>

           <View style={styles.RangeeTuiles}>
             <TouchableOpacity style={styles.TuileRouge} activeOpacity={0.6}/>
             <TouchableOpacity style={styles.TuileJaune} activeOpacity={0.6}/>
           </View>

           <View style={styles.RangeeTuiles}>
             <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer}>
                 <Text style={styles.textBouton}>Jouer</Text>
             </TouchableOpacity>
            </View>

       </View>
     );

   }

 }

   const styles = StyleSheet.create({
         ContainerTuiles : {
             width: windowWidth/1.5,
             height: windowHeight/2,
             marginLeft: windowWidth/6,
             marginTop: 100,
         },
         RangeeTuiles : {
                 flex: 1,
                 flexDirection: 'row',
                 justifyContent: 'space-around'
                         },
         TuileBleu : {
                 width: 100,
                 height: 100,
                 backgroundColor: "#01579b",
                 //opacity: 0.7
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
               },
         BoutonJouer : {
                    width: 100,
                    backgroundColor: '#424242',
                            flexDirection: 'row',
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 70
                },
        textBouton: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white'
        },
        textPartie: {
            fontSize: 16,
            fontWeight: 'bold',
        }
 });


















