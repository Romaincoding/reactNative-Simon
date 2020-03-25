import {
  EDIT_PROFIL
} from './actions'

const initialState = {

//  Profil datas [{Object}]

//  @param      {String}  {pseudo}
    score: [ {

        joueur:"Michel ",
        scores: "3 "
    },
    {
        joueur:"Romain ",
        scores:"5 "
    },
    {
        joueur:"Hugo ",
        scores: "7 "
    },
    {
        joueur:"Bertand ",
        scores: "8 "
    }],

    // state.team
 	team: [ {
 		prenom: 'Romain ',
 		age: '35ans'
 	},
 	{
 	    prenom: 'Boris ',
     	age: '37ans'
 	},
 	{
     	prenom: 'Hugo ',
        age: '37ans'
    },
    {
        prenom: 'Teddy ',
        age: '37ans'

    }],

    // state.profil
    profil: {
    pseudo:'Mon pseudo'
    }

 }


export default function reducer(state = initialState, action) {
	switch (action.type) {

		case EDIT_PROFIL:
			return { ...state, profil: action.profil };

		default:
			return state;
	}
}