import React from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import styles from '../assets/styles';

class Score extends React.Component {

    render() {

    // cette partie affiche le pseudo et les scores associés. Faut il suppimer les noms des joueurs ?
    const { profil, score, niveau} = this.props;

            return (
                <SafeAreaView style ={styles.score}>
                    <Text >{profil.pseudo}</Text>
                    <Text >{niveau}</Text>
                    <Text>Mes scores : {this.props.score.map(y => y.scores ) }</Text>

                </SafeAreaView>
            );
        }
    }

const mapStateToProps = state => {
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
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Score);