import {
  EDIT_PROFIL
} from './actions'

const initialState = {

//  Profil datas [{Object}]

//  @param      {String}  {pseudo}

 	profil: [ {

 		pseudo: 'Romain'
 	} ,
 	{

     		pseudo: 'Teddy'
     	} ,
     	{

         		pseudo: 'Boris'
         	},
         	{

             		pseudo: 'Hugo'
             	}]
};

export default function reducer(state = initialState, action) {
	switch (action.type) {

		case EDIT_PROFIL:
			return { ...state, profil: action.profil };

		default:
			return state;
	}
}