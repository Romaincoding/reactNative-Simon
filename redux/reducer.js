/*import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';*/
import firebase from 'firebase'
import '@firebase/firestore';

import {
  EDIT_PROFIL
} from './actions'

const firebaseConfig = {
    apiKey: "AIzaSyDyswacIXX8nxEu2WUM8p39GVFbZaI3mU4",
    authDomain: "simon-s-game.firebaseapp.com",
    databaseURL: "https://simon-s-game.firebaseio.com",
    projectId: "simon-s-game",
    storageBucket: "simon-s-game.appspot.com",
    messagingSenderId: "177031237782",
    appId: "1:177031237782:web:91d5d46745e145b97bb2b7",
    measurementId: "G-L36T2JKL4R"
  };

firebase.initializeApp(firebaseConfig);

//const dB = firebase.firestore();



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