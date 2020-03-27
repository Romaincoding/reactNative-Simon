import {
  EDIT_PROFIL,
   EDIT_NIVEAU,
   EDIT_MANCHES
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
    pseudo:'Mon pseudo'
    },

    niveau: "Facile",

    manche: "0"



 }


export default function reducer(state = initialState, action) {
    switch (action.type) {

        case EDIT_PROFIL:
            return { ...state, profil: action.profil };

        case EDIT_NIVEAU:
                    return { ...state, niveau: action.niveau };

        case EDIT_MANCHES:
                    return { ...state, manches: action.manches};


        default:
            return state;
    }
}