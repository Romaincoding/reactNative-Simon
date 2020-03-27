import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../assets/styles';

import { connect } from "react-redux";
import { editProfil } from "../redux/actions";

class Config extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			profil: {pseudo:''}
		}
	}

	// Quand le composant est chargé, stock les données du reducer dans l'état local de la class.
	componentDidMount() {
		this.setState({...this.state, profil: this.props.profil});
	}

	// Fonction utilisée quand l'input du pseudo est modifié.
	_onChangePseudo(pseudo) {
		this.setState({...this.state, profil: {...this.state.profil, pseudo: pseudo}});
	}

	// Fonction utilisée lors du clic du boutton
	_onPress() {
		// Utilise la liaison du mapDispatchToProps
		this.props.editProfil(this.state.profil);
	}

	render() {
		const { profil } = this.state;
		return (
			<KeyboardAwareScrollView scrollEnabled={false}>
				<SafeAreaView style={styles.view}>
					<Text>Configuration :</Text>
					<TextInput
						style={styles.input}
			        	placeholder='Pseudo'
			        	maxLength={20}
			        	value={profil.pseudo}
			        	onChangeText={(pseudo) => this._onChangePseudo(pseudo)}
		        	/>
		        	<TouchableOpacity style={styles.button} onPress={() => this._onPress()}>
						<Text style={styles.buttonText}>Sauvegarder</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</KeyboardAwareScrollView>
		);
	}
}

// Récupère les données profil du reducer
const mapStateToProps = state => {
	return {
		profil: state.profil
	};
}

// Lie l'action editProfil à la class Config
const mapDispatchToProps = dispatch => {
	return {
		editProfil: profil => {
			dispatch(editProfil(profil))
		}
	};
}

// Connecte la class Config au reducer
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Config);