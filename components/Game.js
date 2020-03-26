import React from 'react';
import { Text, FlatList, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import {Dimensions} from 'react-native';

// dimensions du screen du device :
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

//tableau de couleur où l'Ia va piocher une couleur au hasard :
var couleurTab = ["jaune", "bleu", "rouge", "vert"]
// tableau où l'on stocke la séquence de l'IA au fur et à mesure :
var sequenceIa = []
// tableau où l'on stocke la séquence du joueur au fur et à mesure :
var sequencePlayer = []

console.log(couleurTab);
console.log(sequenceIa);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}



export default class Game extends React.Component {

   constructor(props) {
      super(props);
      this.state = {

        turn : "IA",
        Simon : {
            bleu : {
                style : 'TuileBleu'
            },
            rouge : {
                style :'TuileRouge'
             },
            jaune : {
                style : 'TuileJaune'
            },
            vert : {
                style : 'TuileVert'
            }
        },
      }
   }

    // fonction qui gère les sons :
    async componentDidMount (){
          this.sound = {};
          this.sound.clickbleu = new Audio.Sound();

          try {
                  await this.sound.clickbleu.loadAsync( require ('../assets/sound/NoteBleue.wav') );
                } catch (error) {
                  console.log('errorSound', error);
                }
          this.sound.clickjaune = new Audio.Sound();
          try {
                  await this.sound.clickjaune.loadAsync( require ('../assets/sound/NoteJaune.wav') );
                } catch (error) {
                  console.log('errorSound', error);
                }
          this.sound.clickrouge = new Audio.Sound();
          try {
                  await this.sound.clickrouge.loadAsync( require ('../assets/sound/NoteRouge.wav') );
                } catch (error) {
                  console.log('errorSound', error);
                }
          this.sound.clickvert = new Audio.Sound();
          try {
                  await this.sound.clickvert.loadAsync( require ('../assets/sound/NoteVerte.wav') );
                } catch (error) {
                  console.log('errorSound', error);
                }
          this.sound.clickJouer = new Audio.Sound();
          try {
                  await this.sound.clickJouer.loadAsync( require ('../assets/sound/Debut_de_game.wav') );
                } catch (error) {
                  console.log('errorSound', error);
                }
     };



     async playIa() {
             var i;
             for(i = 0;i< 5;i++){
             this.selectionCouleur();


             await sleep(700)
             this.setState({...this.state, Simon: {...this.state.Simon, jaune: {...this.state.Simon.jaune, style: 'TuileJaune'}}});
             this.setState({...this.state, Simon: {...this.state.Simon, bleu: {...this.state.Simon.bleu, style: 'TuileBleu'}}});
             this.setState({...this.state, Simon: {...this.state.Simon, rouge: {...this.state.Simon.rouge, style: 'TuileRouge'}}});
             this.setState({...this.state, Simon: {...this.state.Simon, vert: {...this.state.Simon.vert, style: 'TuileVert'}}});

         }
            this.setState({...this.state, turn : "Player"})


     }



    // fonction ou l'Ia choisit une couleur aléatoire et la joue et remplit son tableau de séquenceIa :
    selectionCouleur = () =>{

         var couleur = couleurTab[Math.floor(Math.random() * 4)]
          console.log("selection coucou" + couleur)
         switch (couleur){
            case "jaune":
                this.setState({...this.state, Simon: {...this.state.Simon, jaune: {...this.state.Simon.jaune, style: 'TuileJauneLight'}}});
                this.sound.clickjaune.replayAsync();
                sequenceIa.push("jaune");

            break;

            case "bleu":
                this.setState({...this.state, Simon: {...this.state.Simon, bleu: {...this.state.Simon.bleu, style: 'TuileBleuLight'}}});
                this.sound.clickbleu.replayAsync();
                sequenceIa.push("bleu");

            break;
            case "rouge":
                this.setState({...this.state, Simon: {...this.state.Simon, rouge: {...this.state.Simon.rouge, style: 'TuileRougeLight'}}});
                this.sound.clickrouge.replayAsync();
                sequenceIa.push("rouge");

            break;
            case "vert":
                this.sound.clickvert.replayAsync();
                this.setState( {...this.state, Simon: {...this.state.Simon, vert: {...this.state.Simon.vert, style: 'TuileVertLight'}}});
                sequenceIa.push("vert");

            break;
            console.log("tableau ia" + sequenceIa);
          };
     }

    // fonction activée lorsque le joueur appuie sur une tuile :
    playPlayer(couleur) {
          sequencePlayer.push(couleur)
          switch (couleur){
            case "jaune":
            if(couleur != sequenceIa[0]){
            this.sound.clickJouer.replayAsync()

            }else{
                this.sound.clickjaune.replayAsync()
                }
            break;
            case "bleu":
            if(couleur != sequenceIa[0]){
               this.sound.clickJouer.replayAsync()
            } else{
                this.sound.clickbleu.replayAsync()
                }
            break;
            case "rouge":
            if(couleur != sequenceIa[0]){
                 this.sound.clickJouer.replayAsync()
                }else{
                  this.sound.clickrouge.replayAsync()
                }
            break;
            case "vert":
            if(couleur != sequenceIa[0]){
               this.sound.clickJouer.replayAsync()
            }else {
                this.sound.clickvert.replayAsync()
                }
            break;
          };
          console.log("reçu : " + couleur);
           console.log("attendu : " +sequenceIa[0]);

           console.log("tableau joueur avant pop " +sequenceIa);
          sequenceIa.shift();
           console.log("tableau joueur après " +sequenceIa);
    };

    //fonction timer

    render(){
    var tourJoueur;
    if (this.state.turn == "Player"){
        tourJoueur = <Text> Ton tour garçon </Text>


    }

         return (
           // (TouchableOpacity car une view est incompatible avec un onPress)
           <View style={styles.ContainerTuiles}>

               <View style={styles.RangeeTuiles}>
                     <Text style={styles.textPartie}>Séquences retenues : 1</Text>
                     {tourJoueur}
                </View>

               <View style={styles.RangeeTuiles}>

                 <TouchableOpacity style={styles[this.state.Simon.bleu.style]} activeOpacity={0.6} onPress= {() =>this.playPlayer("bleu")}/>
                 <TouchableOpacity  style={styles[this.state.Simon.vert.style]} activeOpacity={0.6} onPress= {() =>this.playPlayer("vert")}/>
               </View>

               <View style={styles.RangeeTuiles}>
                 <TouchableOpacity style={styles[this.state.Simon.rouge.style]} activeOpacity={0.6} onPress= {() =>this.playPlayer("rouge")}/>
                 <TouchableOpacity style={styles[this.state.Simon.jaune.style]} activeOpacity={0.6} onPress= {() =>this.playPlayer("jaune")}/>

               </View>

               <View style={styles.RangeeTuiles}>
                 <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer} onPress= {() =>this.playIa()}>

                     <Text style={styles.textBouton}>Jouer</Text>
                 </TouchableOpacity>
                </View>

           </View>
         );
       }
     }

// Style des éléments de l'écran :
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
             borderRadius: 8,
             opacity: 1
          },
          TuileBleuLight : {
              width: 100,
              height: 100,
              backgroundColor: "#01579b",
              borderRadius: 8,
              opacity: 0.5
          },
         TuileVert : {
               width: 100,
               height: 100,
               backgroundColor: '#1b5e20',
               borderRadius: 8,
               opacity: 1
          },
         TuileVertLight : {
               width: 100,
               height: 100,
               backgroundColor: '#1b5e20',
               borderRadius: 8,
               opacity: 0.5
          },
         TuileRouge : {
               width: 100,
               height: 100,
               backgroundColor: '#bf360c',
               marginTop: 25,
               borderRadius: 8,
               opacity: 1
          },
         TuileRougeLight : {
               width: 100,
               height: 100,
               backgroundColor: '#bf360c',
               marginTop: 25,
               borderRadius: 8,
               opacity: 0.5
          },
         TuileJaune : {
               width: 100,
               height: 100,
               backgroundColor: '#fbc02d',
               marginTop: 25,
               borderRadius: 8,
               opacity: 1
          },
         TuileJauneLight : {
               width: 100,
               height: 100,
               backgroundColor: '#fbc02d',
               marginTop: 25,
               borderRadius: 8,
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