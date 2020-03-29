import React from 'react';
import {Text, FlatList, View, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {Audio} from 'expo-av';
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
var echec = "echec";
var temps = "temps";
var texteJouer = "Jouer";

console.log(couleurTab);
console.log(sequenceIa);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.tour = "IA";
        this.currentAiIndex = 0;
        this.settingsTimer;
        this.wait2Seconds = 2000;
        this.timeBetweenNote = 0;
        this.state = {
            seconds: null,
            gameOver: false,
            timeLeft:false,
            turn: "IA",
            profil: {
                niveau: ''
            },
            rougeIconOpacity: 1,
            vertIconOpacity: 1,
            jauneIconOpacity: 1,
            bleuIconOpacity: 1
        }
    }

    startNewGame() {

        switch (this.props.profil.niveau) {

            case "Facile" :
                this.settingsTimer = 10;
                break;

            case "Intermediaire" :
                this.settingsTimer = 5;
                this.timeBetweenNote = 3000;
                break;

            case "Difficile" :
                this.settingsTimer = 3;
                this.timeBetweenNote = 1000;
                break;

        }
        this.setState({ timeLeft: false, gameOver: false, seconds: this.settingsTimer})
        //this.setState({ jauneIconStyle: 'TuileJauneLight'})
        //this.setState({ rougeIconOpacity: 0.6})
        this.playIa();
        console.log(this.props.profil.niveau);
    }

    gameOver = (info) => {
        this.sound.clickGameOver.replayAsync()
        texteJouer = "Rejouer";
        console.log("stop timer second")
        clearInterval(this.myInterval);
        sequenceIa = [];
        sequencePlayer = [];
        compteurTour = 0;
        this.currentAiIndex = 0;

        if (info == "echec") {
            this.setState({ gameOver: true});
        }
        else if (info == "temps") {
            this.setState({ timeLeft: true});
        }
    }

    // fonction qui gère les sons :
    async componentDidMount() {
        this.sound = {};
        this.sound.clickbleu = new Audio.Sound();

        try {
            await this.sound.clickbleu.loadAsync(require('../assets/sound/NoteBleue.wav'));
        } catch (error) {
            console.log('errorSound', error);
        }
        this.sound.clickjaune = new Audio.Sound();
        try {
            await this.sound.clickjaune.loadAsync(require('../assets/sound/NoteJaune.wav'));
        } catch (error) {
            console.log('errorSound', error);
        }
        this.sound.clickrouge = new Audio.Sound();
        try {
            await this.sound.clickrouge.loadAsync(require('../assets/sound/NoteRouge.wav'));
        } catch (error) {
            console.log('errorSound', error);
        }
        this.sound.clickvert = new Audio.Sound();
        try {
            await this.sound.clickvert.loadAsync(require('../assets/sound/NoteVerte.wav'));
        } catch (error) {
            console.log('errorSound', error);
        }
        this.sound.clickJouer = new Audio.Sound();
        try {
            await this.sound.clickJouer.loadAsync(require('../assets/sound/Debut_de_game.wav'));
        } catch (error) {
            console.log('errorSound', error);
        }
        this.sound.clickGameOver = new Audio.Sound();
        try {
            await this.sound.clickGameOver.loadAsync(require('../assets/sound/motus-boule-noire.mp3'));
        } catch (error) {
            console.log('errorSound', error);
        }
        this.sound.clickYourTurn = new Audio.Sound();
        try {
            await this.sound.clickYourTurn.loadAsync(require('../assets/sound/A_toi_de_jouer.wav'));
        } catch (error) {
            console.log('errorSound', error);
        }
    };

    launchTimer() {
        console.log("restart timer de second")
        // On le clean au cas où
        clearInterval(this.myInterval)
        this.myInterval = setInterval(() => {
            const {seconds} = this.state;
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                this.gameOver(temps);
            }
        }, 1000)
    }

    componentWillUnmount() {
        console.log("stop timer second")
        clearInterval(this.myInterval)
    }

    boucleIAPart1 = () => {
        //console.log("boucleIAPart1 : ", this.currentAiIndex);
        //console.log("boucleIAPart1 i : ", typeof this.currentAiIndex);
        this.playIaSound(sequenceIa[this.currentAiIndex]);
        let i = this.currentAiIndex;
        setTimeout(() => {
            //console.log("i dans settimeout ", i);
            this.boucleIAPart2(i)
        }, this.timeBetweenNote)
    }


    boucleIAPart2 = (i) => {
        //console.log("boucleIAPart2 : ", i);
        this.setState({ jauneIconOpacity: 1 })
        this.setState({ vertIconOpacity: 1 })
        this.setState({ bleuIconOpacity: 1 })
        this.setState({ rougeIconOpacity: 1 })
      //  this.setState({ seconds: 10})
        //console.log("sequenIA length", sequenceIa.length);
        if (i + 1 >= sequenceIa.length) {
            setTimeout(() => {
                this.setState({ tourDuJoueur: "Player"});
                this.sound.clickJouer.replayAsync();
            }, this.wait2Seconds);
            this.currentAiIndex = 0;
            console.log("tour du joueur")
            this.settingsTimer
        } else {
            //console.log("i+1")
            this.currentAiIndex = i + 1;
            setTimeout(() => {
                this.boucleIAPart1()
            }, 300);
        }
    }

// boucle en dur qui joue une suite de couleur et state qui se réinitialise pour que les boutons ne restent pas opaques
    playIa = () => {
        this.setState({ seconds: null})
        if (this.tour == "IA") {
            // on rajoute un element random dans le tableau ici
            var couleur = this.getRandomColor();
            sequenceIa.push(couleur);
            //console.log("sequenceIa =" + sequenceIa);
            // Jouer les sons contenus du tableau
            this.boucleIAPart1();
            //this.setState({ ...this.state, seconds: 10 })

        }
    }

    getRandomColor = () => {
        var couleur = couleurTab[Math.floor(Math.random() * 4)]
        console.log("la couleur random est " + couleur)
        return couleur;
    }

    // fonction ou l'Ia choisit une couleur aléatoire et la joue et remplit son tableau de séquenceIa :
    playIaSound = (couleur) => {
        console.log(" Ia joue couleur " + couleur)
        switch (couleur) {
            case "jaune":
                this.setState({ jauneIconOpacity: 0.6 })
                this.sound.clickjaune.replayAsync();
                break;

            case "bleu":
                this.setState({ bleuIconOpacity: 0.6 })
                this.sound.clickbleu.replayAsync();
                break;

            case "rouge":
                this.setState({ rougeIconOpacity: 0.6 })
                this.sound.clickrouge.replayAsync();
                break;

            case "vert":
                this.setState({ vertIconOpacity: 0.6 })
                this.sound.clickvert.replayAsync();
                break;
        }
    }

    // fonction activée lorsque le joueur appuie sur une tuile :
    async playPlayer(couleur) {

        console.log("tour du joueur = " + compteurTour)
        //if (this.state.seconds > 0){
        sequencePlayer.push(couleur)
        switch (couleur) {
            case "jaune":
                if (couleur != sequenceIa[clickJoueur]) {
                    this.gameOver(echec);
                    this.props.sendScore(compteurTour);
                    console.log("le compteur est a " + compteurTour);

                } else {
                    this.sound.clickjaune.replayAsync()
                    this.tour = "Player";
                    this.setState({ seconds: this.settingsTimer})
                    clickJoueur++;
                    this.launchTimer();
                    if (clickJoueur == sequenceIa.length) {
                        //console.log("taille du IATab dans playPlayerJaune: " + sequenceIa.length);
                        this.setState({ turn: "IA"})
                        this.tour = "IA";
                        compteurTour++;
                        //             await  sleep(1000)
                        clickJoueur = 0;
                        console.log("stop timer second")
                        clearInterval(this.myInterval)
                        setTimeout(() => {
                            this.playIa();
                        }, this.wait2Seconds);

                    }
                }
                break;
            case "bleu":
                if (couleur != sequenceIa[clickJoueur]) {
                    this.gameOver(echec);
                    this.props.sendScore(compteurTour);
                } else {
                    this.sound.clickbleu.replayAsync()
                    this.setState({ seconds: this.settingsTimer})
                    clickJoueur++;
                    this.launchTimer();
                    if (clickJoueur == sequenceIa.length) {
                        //console.log("taille du IATab: " + sequenceIa.length);
                        this.setState({ turn: "IA"})
                        compteurTour++;
                        this.tour = "IA";
                        //       await sleep(1000)
                        clickJoueur = 0;
                        console.log("stop timer second ")
                        clearInterval(this.myInterval)
                        setTimeout(() => {
                            this.playIa();
                        }, this.wait2Seconds);
                    }
                }
                break;
            case "rouge":
                if (couleur != sequenceIa[clickJoueur]) {
                    this.gameOver(echec);
                    this.props.sendScore(compteurTour);
                } else {
                    this.sound.clickrouge.replayAsync()
                    this.setState({ seconds: this.settingsTimer})
                    clickJoueur++;
                    this.launchTimer();
                    if (clickJoueur == sequenceIa.length) {
                        //console.log("taille du IATab: " + sequenceIa.length);
                        this.setState({ turn: "IA"})
                        compteurTour++;
                        this.tour = "IA";
                        //  await sleep(1000)
                        clickJoueur = 0;
                        console.log("stop timer second")
                        clearInterval(this.myInterval)
                        setTimeout(() => {
                            this.playIa();
                        }, this.wait2Seconds);
                    }
                }
                break;
            case "vert":
                if (couleur != sequenceIa[clickJoueur]) {
                    this.gameOver(echec);
                    this.props.sendScore(compteurTour);
                } else {
                    this.sound.clickvert.replayAsync()
                    this.setState({ seconds: this.settingsTimer})
                    clickJoueur++;
                    this.launchTimer();
                    if (clickJoueur == sequenceIa.length) {
                        //console.log("taille du IATab: " + sequenceIa.length);
                        this.setState({ turn: "IA"})
                        compteurTour++;
                        this.tour = "IA";
                        //     await sleep(1000)
                        clickJoueur = 0;
                        console.log("stop timer second")
                        clearInterval(this.myInterval)
                        setTimeout(() => {
                            this.playIa();
                        }, this.wait2Seconds);
                    }
                }
                break;
        }
        ;
        /*} else {
           this.gameOver();
        }*/

        //console.log("reçu : " + couleur);

//        console.log("attendu : " + sequenceIa[clickJoueur]);
  //      console.log("clique joueur : " + clickJoueur);


        // console.log("tableau joueur avant pop " +sequenceIa);
        //j'enlève le premier élément du tableau : comme ça on a toujours le prochain élément à comparer à la même position
        // à faire il faut garder en mémoire le tableau de l'Ia pour le tour d'après, faire un deuxième tableau temporaire?
        // console.log("tableau joueur après " +sequenceIa);
    };

    //fonction timer

    render() {

        const {profil} = this.props;
        const {seconds} = this.state;
        var gameOver;
        var timeLeft;
        //var tourJoueur; // variable qui va stocker et afficher le tour du joueur (via une balise <text>)

        /*    if (this.tour == "Player"){ // affichage du contenu suivant si le state est similaire
                tourJoueur = <Text style={styles.ATonTour}>A ton tour ! </Text>
            }*/
        if (this.state.gameOver == true) {
            gameOver = <Text>Tu as perdu</Text>
        }

        if (this.state.timeLeft == true) {
            timeLeft = <Text>Le temps est écoulé, tu as perdu !</Text>
        }

        return (
            // (TouchableOpacity car une view est incompatible avec un onPress)
            <View style={styles.ContainerTuiles}>
                <View style={styles.TextInfos}>
                    <Text style={styles.textPartie}>Séquences retenues : {compteurTour}</Text>
                    <Text>Niveau : {profil.niveau}</Text>
                    <Text>Temps restant : {seconds}</Text>
                    {gameOver}
                    {timeLeft}
                </View>

                <View style={styles.RangeeTuiles}>
                    <View style={{ opacity: this.state.bleuIconOpacity }}>
                        <TouchableOpacity 
                            style={styles.TuileBleu} 
                            activeOpacity={0.6}
                            onPress={() => this.playPlayer("bleu")} />
                    </View>
                    <View style={{ opacity: this.state.vertIconOpacity }}>
                        <TouchableOpacity 
                            style={styles.TuileVert} 
                            activeOpacity={0.6}
                            onPress={() => this.playPlayer("vert")} />
                    </View>
                </View>

                <View style={styles.RangeeTuiles}>
                    <View style={{ opacity: this.state.rougeIconOpacity }}>
                        <TouchableOpacity 
                            style={styles.TuileRouge} 
                            activeOpacity={0.6}
                            onPress={() => this.playPlayer("rouge")} />
                    </View>
                    <View style={{ opacity: this.state.jauneIconOpacity }}>
                        <TouchableOpacity 
                            style={styles.TuileJaune} 
                            activeOpacity={0.6}
                            onPress={() => this.playPlayer("jaune")} />
                    </View>
                </View>

                <View style={styles.RangeeTuiles}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer}
                                      onPress={() => this.startNewGame()}>
                        <Text style={styles.textBouton}>{texteJouer}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

// Style des éléments de l'écran :
const styles = StyleSheet.create({
    ContainerTuiles: {
        width: windowWidth / 1.5,
        height: windowHeight / 2,
        marginLeft: windowWidth / 6,
        marginTop: 100,
    },
    TextInfos: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    RangeeTuiles: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    TuileBleu: {
        width: 100,
        height: 100,
        backgroundColor: "#01579b",
        borderRadius: 8
    },
    TuileVert: {
        width: 100,
        height: 100,
        backgroundColor: '#1b5e20',
        borderRadius: 8
    },
    TuileRouge: {
        width: 100,
        height: 100,
        backgroundColor: '#bf360c',
        marginTop: 25,
        borderRadius: 8
    },
    TuileJaune: {
        width: 100,
        height: 100,
        backgroundColor: '#fbc02d',
        marginTop: 25,
        borderRadius: 8
    },
    BoutonJouer: {
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
        profil: state.profil
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