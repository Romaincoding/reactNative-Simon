import React from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from '../assets/styles';

class Score extends React.Component {

    render() {

<<<<<<< HEAD
    // cette partie affiche le pseudo et les scores associés. Faut il supprimer les noms des joueurs ?
    const { score } = this.props;
=======
    // cette partie affiche le pseudo et les scores associés. Faut il suppimer les noms des joueurs ?
    const { profil, score, niveau} = this.props;
>>>>>>> master

console.log(score);
            return (
                <SafeAreaView style ={styles.score}>
<<<<<<< HEAD
                    {//<Text>Mes scores : {this.props.score.map(y =>"\n" + y.scoreTableFacile + "\n" + y.scoreTableIntermediaire + "\n"  + y.scoreTableDifficile)}</Text>
                    }
                    <Text>Score facile : </Text>
                    {score.facile.map((score,index)=>{
                        return(
                        <Text key={index}>{score[0]}:{score[1]}</Text>
                            )
                        }
                    )}
                    <Text> Score intermediaire :  </Text>
                    {score.intermediaire.map((score,index)=>{
                        return(
                        <Text key={index}>{score[0]}:{score[1]}</Text>
                            )
                        }
                    )}
                    <Text> Score difficile : </Text>
                    {score.difficile.map((score,index)=>{
                        return(
                        <Text key={index}>{score[0]}:{score[1]}</Text>
                            )
                        }
                    )}
=======
                    <Text >{profil.pseudo}</Text>
                    <Text >{niveau}</Text>
                    <Text>Mes scores : {this.props.score.map(y => y.scores ) }</Text>
>>>>>>> master

                </SafeAreaView>
            );
        }
    }

const mapStateToProps = state => {
<<<<<<< HEAD
    return {
        score: state.score
=======
     return {
        score: state.score,
        profil : state.profil,
        niveau: state.niveau,
      //  manches: state.manches
      /*game : state.pseudo,
      game : state.niveau,
      game : state.manches*/
     };
 }

const mapDispatchToProps = dispatch => {
    return {
        editProfil: profil => {
            dispatch(editProfil(profil))
        }
>>>>>>> master
    };
}

export default connect(
    mapStateToProps
)(Score);