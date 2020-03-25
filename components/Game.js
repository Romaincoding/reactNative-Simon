import React from 'react';
import { Text, FlatList, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const couleurTab = ["jaune", "bleu", "rouge", "vert"]


export default class Game extends React.Component {
   constructor(props) {
      super(props);
      this.state = {

            Simon : {
             bleu : {

             style : 'TuileBleu'},
             rouge : {

              style :'TuileRouge'},
             jaune : {

             style : 'TuileJaune'},
             vert : {

             style : 'TuileVert'}
          },

          sequenceIa : [],



      }


   }

//fonction permettant de charger la musique dès le chargement de la page afin qu'elle soit prête à jouer.
 async componentDidMount (){
      this.sound = {};


      this.sound.clickBleu = new Audio.Sound();
      try {
        await this.sound.clickBleu.loadAsync( require ('../assets/sound/NoteBleue.wav') );
        //charge la note associée à la couleur bleue si elle existe
      } catch (error) {
        console.log('errorSound', error);
      }
      this.sound.clickJaune = new Audio.Sound();
      try {
        await this.sound.clickJaune.loadAsync( require ('../assets/sound/NoteJaune.wav') );
        //charge la note associée à la couleur jaune si elle existe
      } catch (error) {
        console.log('errorSound', error);
      }

      this.sound.clickRouge = new Audio.Sound();
      try {
        await this.sound.clickRouge.loadAsync( require ('../assets/sound/NoteRouge.wav') );
        //charge la note associée à la couleur rouge si elle existe
      } catch (error) {
        console.log('errorSound', error);
      }

      this.sound.clickVert = new Audio.Sound();
      try {
        await this.sound.clickVert.loadAsync( require ('../assets/sound/NoteVerte.wav') );
        //charge la note associée à la couleur verte si elle existe
      } catch (error) {
        console.log('errorSound', error);
      }

      this.sound.clickJouer = new Audio.Sound();
      try {
        await this.sound.clickJouer.loadAsync( require ('../assets/sound/Debut_de_game.wav') );
        //charge le son associé au lancement d'une nouvelle séquence s'il existe
      } catch (error) {
        console.log('errorSound', error);
      }

      this.sound.clickTonTour = new Audio.Sound();
      try {
        await this.sound.clickJouer.loadAsync( require ('../assets/sound/A_toi_de_jouer.wav') );
        //charge le son associé au signal du tour du joueur s'il existe
      } catch (error) {
        console.log('errorSound', error);
      }


  };

 selectionCouleur = () =>{
 console.log("fonction ok");
     var couleur = couleurTab[Math.floor(Math.random() * 4)]

     switch (couleur){

         case "jaune":

        this.setState({...this.state, Simon: {...this.state.Simon, jaune: {...this.state.Simon.jaune, style: 'TuileJauneLight'}}});
        this.sound.clickJaune.replayAsync();

        break;





         case "bleu":

      this.setState({...this.state, Simon: {...this.state.Simon, bleu: {...this.state.Simon.bleu, style: 'TuileBleuLight'}}});
      this.sound.clickBleu.replayAsync();
      break;
         case "rouge":
          console.log("l'état est " + this.state);
      this.setState({...this.state, Simon: {...this.state.Simon, rouge: {...this.state.Simon.rouge, style: 'TuileRougeLight'}}});
      this.sound.clickRouge.replayAsync();
        console.log("le nouvel état  est " + this.state);
      break;

         case "vert":
          console.log("l'état est " + this.state);
                this.sound.clickVert.replayAsync();
       this.setState( {...this.state, Simon: {...this.state.Simon, vert: {...this.state.Simon.vert, style: 'TuileVertLight'}}});
         console.log("le nouvel état  est " + this.state);
         break;//    this.setState({...this.state, Simon.vert.style: opacity: 1});

         // console.log("la couleur 4 est " + couleur);

      };

 }

 //fonction permettant de jouer la note associée à la couleur sur laquelle on appuie
  _onPress(noteAJouer) {
    noteAJouer.replayAsync();
  };

 render(){

     return (
       // TouchableOpacity car une view est incompatible avec un onPress
       <View style={styles.ContainerTuiles}>

           <View style={styles.RangeeTuiles}>
                 <Text style={styles.textPartie}>Séquences retenues : 1</Text>
            </View>

           <View style={styles.RangeeTuiles}>

             <TouchableOpacity style={styles[this.state.Simon.bleu.style]} activeOpacity={0.6} onPress= {() =>this._onPress(this.sound.clickBleu)}/>
             <TouchableOpacity  style={styles[this.state.Simon.vert.style]} activeOpacity={0.6} onPress= {() =>this._onPress(this.sound.clickVert)}/>
           </View>

           <View style={styles.RangeeTuiles}>
             <TouchableOpacity style={styles[this.state.Simon.rouge.style]} activeOpacity={0.6} onPress= {() =>this._onPress(this.sound.clickRouge)}/>
             <TouchableOpacity style={styles[this.state.Simon.jaune.style]} activeOpacity={0.6} onPress= {() =>this._onPress(this.sound.clickJaune)}/>

           </View>

           <View style={styles.RangeeTuiles}>
             <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer} onPress= {() =>this.selectionCouleur()}>

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
                 opacity: 1

             },
              TuileBleuLight : {
                              width: 100,
                              height: 100,
                              backgroundColor: "#01579b",
                              opacity: 0.5

                          },
         TuileVert : {
                   width: 100,
                   height: 100,
                   backgroundColor: '#1b5e20',
                   opacity: 1

               },
                  TuileVertLight : {
                                  width: 100,
                                  height: 100,
                                  backgroundColor: '#1b5e20',
                                  opacity: 0.5

                              },
         TuileRouge : {
                 width: 100,
                 height: 100,
                 backgroundColor: '#bf360c',
                 marginTop: 25,
                 opacity: 1

             },
                 TuileRougeLight : {
                              width: 100,
                              height: 100,
                              backgroundColor: '#bf360c',
                              marginTop: 25,
                              opacity: 0.5

                          },
         TuileJaune : {
                   width: 100,
                   height: 100,
                   backgroundColor: '#fbc02d',
                   marginTop: 25,
                   opacity: 1

               },
                 TuileJauneLight : {
                                  width: 100,
                                  height: 100,
                                  backgroundColor: '#fbc02d',
                                  marginTop: 25,
                                  opacity: 0.5

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


















