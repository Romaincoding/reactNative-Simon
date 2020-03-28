import React from 'react';
import { Text, FlatList, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import {Dimensions} from 'react-native';
import {sendScore} from '../redux/actions';
// dimensions du screen du device :
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

//tableau de couleur où l'Ia va piocher une couleur au hasard :
var couleurTab = ["jaune", "bleu", "rouge", "vert"]
// tableau où l'on stocke la séquence de l'IA au fur et à mesure :
var sequenceIa = []
// tableau où l'on stocke la séquence du joueur au fur et à mesure :
var sequencePlayer = []
var compteurTour = 0;
console.log(compteurTour);
var clickJoueur = 0;


console.log(couleurTab);
console.log(sequenceIa);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

 class Game extends React.Component {

    // démarrer le timer au premier tour du joueur.
    // il faut que le timer  démarre lorsque l'ia a fini de jouer sa séquence ET jouer le son "clickJouer".



    constructor(props) {
        super(props);
        this.tour = "IA";
        this.currentAiIndex = 0;
        this.settingsTimer;
        this.timeBetweenNote = 750;
        this.state = {

        seconds: null,
        gameOver : "false",
        turn : "IA",
        profil : {
            niveau : 'Facile'
        },
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

    startNewGame(){
      
      // La ligne du dessous lance un timer qui expira dans 5 sec et affichera son log à ce moment là.
      // cet appel n'est pas bloquant, on passe à la ligne 75 direct
      setTimeout(() => {
        console.log("5 secondes sont passées")
        }, 5000);

    switch(this.props.profil.niveau){


        case "Facile" :
            this.settingsTimer = 10;

            break;

        case "Normal" :
            this.settingsTimer = 5;

            break;

        case "Difficile" :
            this.settingsTimer = 3;
            break;

    }
    this.setState({...this.state, seconds : this.settingsTimer })
           this.setState({...this.state, gameOver : "false"});
           sequenceIa = [];
           sequencePlayer = [];
           compteurTour = 0;
           this.currentAiIndex = 0;
           this.playIa();
           console.log(this.props.profil.niveau);



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
          this.sound.clickGameOver = new Audio.Sound();
          try {
                  await this.sound.clickGameOver.loadAsync( require ('../assets/sound/motus-boule-noire.mp3') );
                } catch (error) {
                  console.log('errorSound', error);
                }

          this.myInterval = setInterval(() => {
              const {seconds} = this.state;
              if (seconds > 0) {
                   this.setState(({ seconds }) => ({
                      seconds: seconds - 1
                  }))
              } if (seconds == 0) {
                   this.gameOver();
              }
          }, 1000)
     };

 componentWillUnmount() {
          clearInterval(this.myInterval)
    }

    traitement=()=> {
             console.log("traitement : ", this.currentAiIndex);
             console.log("traitetement i : ", typeof this.currentAiIndex);
             this.playIaSound(sequenceIa[this.currentAiIndex]);
             let i = this.currentAiIndex;
             setTimeout(()=> {
                console.log("i dans settimeout ", i);
                this.suiteTraitement(i)},this.timeBetweenNote)
             }

/*    displayInfosPlayer=()=> {
             setTimeout(()=> {
                this.tour = "Player"}, (this.settingsTimer))
             }*/


    suiteTraitement=(i)=> {
    console.log("suiteTraitement : ", i);
             this.setState({...this.state, Simon: {...this.state.Simon, jaune: {...this.state.Simon.jaune, style: 'TuileJaune'}}});
             this.setState({...this.state, Simon: {...this.state.Simon, bleu: {...this.state.Simon.bleu, style: 'TuileBleu'}}});
             this.setState({...this.state, Simon: {...this.state.Simon, rouge: {...this.state.Simon.rouge, style: 'TuileRouge'}}});
             this.setState({...this.state, Simon: {...this.state.Simon, vert: {...this.state.Simon.vert, style: 'TuileVert'}}});
            console.log("sequenIA length", sequenceIa.length);
             if (i+1 >= sequenceIa.length) {
                 this.setState({...this.state, tourDuJoueur : "Player"})
                 this.currentAiIndex = 0;
                 console.log("tour du joueur ")
                 this.settingsTimer
                 } else {
                 console.log("i+1")
                 this.currentAiIndex = i+1;
                 setTimeout(()=> {this.traitement()}, 300);
                 }
    }

// boucle en dur qui joue une suite de couleur et state qui se réinitialise pour que les boutons ne restent pas opaques
    playIa=()=> {
    this.setState({...this.state, seconds : null})
    if (this.tour == "IA") {
             // on rajoute un element random dans le tableau ici
             var couleur = this.getRandomColor();
             sequenceIa.push(couleur);
                        console.log("sequenceIa =" + sequenceIa);
             // Jouer les sons contenus du tableau
             this.traitement();
        }
     }

    getRandomColor = () =>{
      var couleur = couleurTab[Math.floor(Math.random() * 4)]
      console.log("la couleur random est " + couleur)
      return couleur;
    }
    // fonction ou l'Ia choisit une couleur aléatoire et la joue et remplit son tableau de séquenceIa :
    playIaSound = (couleur) =>{

         console.log(" Ia joue couleur " + couleur)
         switch (couleur){
            case "jaune":
                this.setState({...this.state, Simon: {...this.state.Simon, jaune: {...this.state.Simon.jaune, style: 'TuileJauneLight'}}});
                this.sound.clickjaune.replayAsync();
           //     sequenceIa.push("jaune");
            break;

            case "bleu":
                this.setState({...this.state, Simon: {...this.state.Simon, bleu: {...this.state.Simon.bleu, style: 'TuileBleuLight'}}});
                this.sound.clickbleu.replayAsync();
              //  sequenceIa.push("bleu");

            break;
            case "rouge":
                this.setState({...this.state, Simon: {...this.state.Simon, rouge: {...this.state.Simon.rouge, style: 'TuileRougeLight'}}});
                this.sound.clickrouge.replayAsync();
               // sequenceIa.push("rouge");

            break;
            case "vert":
                this.sound.clickvert.replayAsync();
                this.setState( {...this.state, Simon: {...this.state.Simon, vert: {...this.state.Simon.vert, style: 'TuileVertLight'}}});
            //    sequenceIa.push("vert");

            break;
            console.log("tableau ia" + sequenceIa);
          };
     }

    gameOver = () => {
        this.setState({...this.state, gameOver : "true"});
    }

    // fonction activée lorsque le joueur appuie sur une tuile :
   async playPlayer(couleur) {

     console.log("tour du joueur = " + compteurTour)
     sequencePlayer.push(couleur)
     switch (couleur) {
       case "jaune":
         if (couleur != sequenceIa[clickJoueur]) {
           this.sound.clickGameOver.replayAsync()
           this.gameOver();
           this.props.sendScore(compteurTour);
           console.log("le compteur est a " + compteurTour);

         } else {
           this.sound.clickjaune.replayAsync()
           this.tour = "Player";
           this.setState({ ...this.state, seconds: this.settingsTimer })
           clickJoueur++;
           if (clickJoueur == sequenceIa.length) {
             console.log("taille du IATab dans playPlayerJaune: " + sequenceIa.length);
             this.setState({ ...this.state, turn: "IA" })
             this.tour = "IA";
             compteurTour++;
             //             await  sleep(1000)
             clickJoueur = 0;
             this.playIa();
           }
         }
         break;
       case "bleu":
         if (couleur != sequenceIa[clickJoueur]) {
           this.sound.clickGameOver.replayAsync()
           this.gameOver();
           this.props.sendScore(compteurTour);
         } else {
           this.sound.clickbleu.replayAsync()
           this.setState({ ...this.state, seconds:  this.settingsTimer })
           clickJoueur++;
           if (clickJoueur == sequenceIa.length) {
             console.log("taille du IATab: " + sequenceIa.length);
             this.setState({ ...this.state, turn: "IA" })
             compteurTour++;
             this.tour = "IA";
             //       await sleep(1000)
             clickJoueur = 0;
             this.playIa();
           }
         }
         break;
       case "rouge":
         if (couleur != sequenceIa[clickJoueur]) {
           this.sound.clickGameOver.replayAsync()
           this.gameOver();
           this.props.sendScore(compteurTour);
         } else {
           this.sound.clickrouge.replayAsync()
           this.setState({ ...this.state, seconds:  this.settingsTimer  })
           clickJoueur++;
           if (clickJoueur == sequenceIa.length) {
             console.log("taille du IATab: " + sequenceIa.length);
             this.setState({ ...this.state, turn: "IA" })
             compteurTour++;
             this.tour = "IA";
             //  await sleep(1000)
             clickJoueur = 0;
             this.playIa();
           }
         }
         break;
       case "vert":
         if (couleur != sequenceIa[clickJoueur]) {
           this.sound.clickGameOver.replayAsync()
           this.gameOver();
           this.props.sendScore(compteurTour);
         } else {
           this.sound.clickvert.replayAsync()
           this.setState({ ...this.state, seconds:  this.settingsTimer  })
           clickJoueur++;
           if (clickJoueur == sequenceIa.length) {
             console.log("taille du IATab: " + sequenceIa.length);
             this.setState({ ...this.state, turn: "IA" })
             compteurTour++;
             this.tour = "IA";
             //     await sleep(1000)
             clickJoueur = 0;
             this.playIa();
           }
         }
         break;
     };

     console.log("reçu : " + couleur);

     console.log("attendu : " + sequenceIa[clickJoueur]);
     console.log("clique joueur : " + clickJoueur);


     // console.log("tableau joueur avant pop " +sequenceIa);
     //j'enlève le premier élément du tableau : comme ça on a toujours le prochain élément à comparer à la même position
     // à faire il faut garder en mémoire le tableau de l'Ia pour le tour d'après, faire un deuxième tableau temporaire?
     // console.log("tableau joueur après " +sequenceIa);
   };

    //fonction timer

    render(){

    const {profil} = this.props;
    const {seconds} = this.state;
    var gameOver;
    //var tourJoueur; // variable qui va stocker et afficher le tour du joueur (via une balise <text>)

/*    if (this.tour == "Player"){ // affichage du contenu suivant si le state est similaire
        tourJoueur = <Text style={styles.ATonTour}>A ton tour ! </Text>
    }*/

    if (this.state.gameOver== "true"){
        gameOver = <Text>Tu as perdu</Text>
    } if (this.state.seconds == 0) {
        gameOver = <Text>Le temps est écoulé, tu as perdu !</Text>
    }
    else{
        gameOver = <Text></Text>
    }
         return (
           // (TouchableOpacity car une view est incompatible avec un onPress)
           <View style={styles.ContainerTuiles}>

               <View style={styles.TextInfos}>
                     <Text style={styles.textPartie}>Séquences retenues : {compteurTour}</Text>
                     <Text>Niveau : {profil.niveau}</Text>
                     <Text>Temps restant : {seconds}</Text>
                     {gameOver}
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
                 <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer} onPress= {() =>this.startNewGame()}>

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
         TextInfos : {
             flex: 1,
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center'
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


const mapStateToProps = state => {
    return {
        profil : state.profil
    };
}
// appeler edit manche uniquement si le score est dans les 10 premiers
const mapDispatchToProps = dispatch => {
    return {
        sendScore: score => {
            dispatch(sendScore(score))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);