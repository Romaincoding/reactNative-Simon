import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../assets/styles';

import { connect } from "react-redux";

class Home extends React.Component {


	render() {
	console.log("coco" + this.props.profil[0].pseudo)
	console.log("coco" + this.props.monAdresse)
	this.props.profil.map(x => console.log(x.pseudo,x.age))

		const { profil } = this.props;
		return (
			<SafeAreaView style={styles.home}>
				<Text>Hello {profil.pseudo} !</Text>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	return {
	    //à gauche je nomme comme je veux c'est mon props! A droite c'est ce que je stocke dans mon state global
		profil: state.profil,
		monAdresse : state.adresse

	};
}

export default connect(
	mapStateToProps
)(Home);