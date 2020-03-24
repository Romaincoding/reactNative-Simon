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
    // state.profil
 	profil: [ {

 		pseudo: 'Romain ',
 		age: '35ans'

 	}, {
 	pseudo: 'Boris ',
     		age: '37ans'

 	},
 	{
     	pseudo: 'Hugo ',
         		age: '37ans'

     	},
     	{
         	pseudo: 'Teddy ',
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