import {
  EDIT_PSEUDO,
   EDIT_NIVEAU,
  // EDIT_MANCHES,
   SEND_SCORE
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

     },
     {
         prenom: 'Boris ',

     },
     {
         prenom: 'Hugo ',

    },
    {
        prenom: 'Teddy ',


    }],

    // state.profil
    profil: {
    pseudo:'',
    niveau:'',

    }







 }


export default function reducer(state = initialState, action) {
    switch (action.type) {

        case EDIT_PSEUDO:
            return { ...state, profil: {...state.profil, pseudo: action.pseudo }};

        case EDIT_NIVEAU:
                    return { ...state, profil: {...state.profil, niveau: action.niveau }};

        /*case EDIT_MANCHES:
                    return { ...state, manches: action.manches};
*/
        case SEND_SCORE:
                    //envoi du score a firebase
                    return state;
        default:
            return state;
    }
}