import {
  EDIT_PROFIL
} from './actions'

const initialState = {

//  Profil datas [{Object}]

//  @param      {String}  {pseudo}
    adresse: "Paname",
    // state.profil
 	profil: [ {

 		pseudo: 'romain',
 		age: '35ans'

 	}, {
 	pseudo: 'cristobal',
     		age: '37ans'

 	}]

 	}


export default function reducer(state = initialState, action) {
	switch (action.type) {

		case EDIT_PROFIL:
			return { ...state, profil: action.profil };

		default:
			return state;
	}
}