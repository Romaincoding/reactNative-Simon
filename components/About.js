import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'


import styles from '../assets/styles';

class About extends React.Component {


	render() {
	console.log("coco" + this.props.pseudo)


		return (
			<SafeAreaView style={styles.about}>
				<Text>{this.props}</Text>





			</SafeAreaView>
		);
	}
}
// je récupère un state que je récupère via redux en props de mon composant
const mapStateToProps = state => {
	return {
		profil: state.profil

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
)(About);
