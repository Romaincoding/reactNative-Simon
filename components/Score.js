import React from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import styles from '../assets/styles';

class Score extends React.Component {

    render() {

    // cette partie affiche le pseudo et les scores associés. Faut il supprimer les noms des joueurs ?
    const { score } = this.props;


            return (
                <SafeAreaView style ={styles.score}>
                    <Text>Mes scores : {this.props.score.map(y =>"\n" + y.scoreTableFacile + "\n" + y.scoreTableIntermediaire + "\n"  + y.scoreTableDifficile)}</Text>
                </SafeAreaView>
            );
        }
    }

const mapStateToProps = state => {
    return {
        score: state.score
    };
}

export default connect(
    mapStateToProps
)(Score);