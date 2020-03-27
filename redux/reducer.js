import * as firebase from 'firebase';
import {
  EDIT_PSEUDO,
   EDIT_NIVEAU,
  // EDIT_MANCHES,
   SEND_SCORE
} from './actions'

const firebaseConfig = {
  apiKey: "AIzaSyDyswacIXX8nxEu2WUM8p39GVFbZaI3mU4",
  authDomain: "simon-s-game.firebaseapp.com",
  databaseURL: "https://simon-s-game.firebaseio.com/",
  projectId: "simon-s-game",
  storageBucket: "simon-s-game.appspot.com",
  messagingSenderId: "177031237782",
  appId: "1:177031237782:web:0de6664a3464d14f7bb2b7",
  measurementId: "G-44VPPT3VGY"
};

firebase.initializeApp(firebaseConfig);


//firebase.database().ref('score').child('-M3MEWMtGK2rPWyuJPtX').remove();
var result;
//créer un tableau d'objets à 2 dimmensions
var scoreTableFacile = [];
var scoreTableIntermediaire = [];
var scoreTableDifficile = [];


firebase.database().ref('scoreFacile').on("value", function(snapshot) {
       result = snapshot.val();
       for (let key of Object.keys(result)) {
           let nickname= result[key].pseudo;
           let points= result[key].highscore;
           console.log( "from fb.db: " + nickname + ", " + points )
           scoreTableFacile.push([nickname,points]);
       }
       console.log(scoreTableFacile);
       scoreTableFacile.sort(sortFunction);
       console.log("trie "+ scoreTableFacile);
   });


firebase.database().ref('scoreIntermediaire').on("value", function(snapshot) {
    result = snapshot.val();
    for (let key of Object.keys(result)) {
        let nickname= result[key].pseudo;
        let points= result[key].highscore;
        console.log( "from fb.db: " + nickname + ", " + points )
        scoreTableIntermediaire.push([nickname,points]);
    }
    console.log(scoreTableIntermediaire);
    scoreTableIntermediaire.sort(sortFunction);
    console.log("trie "+ scoreTableIntermediaire);
});


firebase.database().ref('scoreDifficile').on("value", function(snapshot) {
    result = snapshot.val();
    for (let key of Object.keys(result)) {
        let nickname= result[key].pseudo;
        let points= result[key].highscore;
        console.log( "from fb.db: " + nickname + ", " + points )
        scoreTableDifficile.push([nickname,points]);
    }
    console.log(scoreTableDifficile);
    scoreTableDifficile.sort(sortFunction);
    console.log("trie "+ scoreTableDifficile);
});

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
};

/*firebase.database().ref('scoreFacile').push({

		pseudo: 'test',
		highscore: 1234
	});

firebase.database().ref('scoreIntermediaire').push({
    		pseudo: 'lolo',
    		highscore: 14
    });

firebase.database().ref('scoreDifficile').push({
        		pseudo: 'tania',
        		highscore: 4
    });

firebase.database().ref('scoreFacile').push({

		pseudo: 'test',
		highscore: 1234
	});

firebase.database().ref('scoreIntermediaire').push({
    		pseudo: 'lolo',
    		highscore: 14
    });

firebase.database().ref('scoreDifficile').push({
        		pseudo: 'tania',
        		highscore: 4
    });

firebase.database().ref('scoreFacile').push({

		pseudo: 'test',
		highscore: 1234
	});

firebase.database().ref('scoreIntermediaire').push({
    		pseudo: 'lolo',
    		highscore: 14
    });

firebase.database().ref('scoreDifficile').push({
        		pseudo: 'tania',
        		highscore: 4
    });*/

let initialState = {

//  Profil datas [{Object}]

//  @param      {String}  {pseudo}

    score:{
    facile:scoreTableFacile,
    intermediaire:scoreTableIntermediaire,
    difficile:scoreTableDifficile
    },

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
    niveau:'Facile',

    }
    }


/*firebase.database().ref('score').push({
    pseudo: 'test',
    highscore: 1234
});

firebase.database().ref('score').push({
    pseudo: 'lolo',
    highscore: 14
});

firebase.database().ref('score').push({
    pseudo: 'tania',
    highscore: 4
});*/


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