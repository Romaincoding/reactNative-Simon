import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../assets/styles';

import { connect } from "react-redux";
import { editPseudo, editNiveau } from "../redux/actions";

class Config extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			profil: {
			pseudo: '',
			niveau:''

			}

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

	getLevel = (niveau) =>{
	this.props.editNiveau(niveau)
		}

	// Fonction utilisée lors du clic du boutton
	_onPress() {
		// Utilise la liaison du mapDispatchToProps
		this.props.editPseudo(this.state.profil.pseudo);

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
                        <View>
                        <Text>niveau:{this.props.profil.niveau}</Text>
                         <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer} onPress= {(niveau) =>this.getLevel("Facile")}>

                          <Text style={styles.textBouton}>Facile</Text>
                           </TouchableOpacity>
                            </View>
                            <View>
                            <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer} onPress= {(niveau) =>this.getLevel("Normal")}>
                            <Text style={styles.textBouton}>Normal</Text>
                            </TouchableOpacity>
                            </View>
                            <View>
                                            <TouchableOpacity activeOpacity={0.6} style={styles.BoutonJouer} onPress= {(niveau) =>this.getLevel("Diffcile")}>

                                                                                     <Text style={styles.textBouton}>Difficile</Text>
                                                                                 </TouchableOpacity>
                                                                                </View>

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
		editPseudo: pseudo => {
			dispatch(editPseudo(pseudo))

		},
		editNiveau: niveau => {
		    dispatch(editNiveau(niveau))
		}
	};
}

// Connecte la class Config au reducer
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Config);