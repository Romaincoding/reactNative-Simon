/*
 * action types

*/
export const EDIT_PSEUDO = 'EDIT_PSEUDO';
export const EDIT_NIVEAU = 'EDIT_NIVEAU';
//export const EDIT_MANCHES = 'EDIT_MANCHES';
export const SEND_SCORE = 'SEND_SCORE';




/**
 * Edit profil from store
 *
 * @param      {String}  {type}  Reducer action
 * @param      {Object}  {profil{pseudo}}  Profil datas
 * @return     {Object}  Redux Store Object
 */

export function editPseudo(pseudo) {
  return { type: EDIT_PSEUDO, pseudo };
}

export function editNiveau(niveau) {

  return { type: EDIT_NIVEAU, niveau };
}
//
//export function editManches(manches) {
////action.type et action.niveau
//  return { type: EDIT_MANCHES, manches};
//  }

export function sendScore(score) {
   return {type: SEND_SCORE, score};

}