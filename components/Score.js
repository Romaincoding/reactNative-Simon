import React from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'



import styles from '../assets/styles';

class Score extends React.Component {

render() {



		return (
			<SafeAreaView style={styles.score}>

				<Text>{this.props.score.map(y => y.scores ) }</Text>
				<Text>{this.props.score.map(y => y.joueur ) }</Text>






			</SafeAreaView>
		);
	}
}



const mapStateToProps = state => {
	return {
		score: state.score
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