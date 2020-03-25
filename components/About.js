import React from 'react';
import { Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import styles from '../assets/styles';

class About extends React.Component {

	render() {
	const { team } = this.props;
	console.log("coco" + this.props.prenom)

		return (
			<SafeAreaView style={styles.about}>

				<Text>{this.props.team.map(y => y.prenom)}</Text>

			</SafeAreaView>
		);
	}
}

// je récupère un state que je récupère via redux en props de mon composant
const mapStateToProps = state => {
	return {
		team: state.team,
		adresse: state.adresse

	};
}
/*const mapDispatchToProps = dispatch => {
	return {
		editTeam: team => {
			dispatch(editTeam(team))
		}
	};
}*/

export default connect(
	mapStateToProps
//	mapDispatchToProps
)(About);
