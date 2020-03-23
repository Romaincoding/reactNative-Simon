import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../assets/styles';

import { connect } from "react-redux";

class Home extends React.Component {
	render() {
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
		profil: state.profil
	};
}

export default connect(
	mapStateToProps
)(Home);