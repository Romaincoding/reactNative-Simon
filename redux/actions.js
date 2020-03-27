/*
 * action types

*/
export const EDIT_PROFIL = 'EDIT_PROFIL';
export const EDIT_NIVEAU = 'EDIT_NIVEAU';
export const EDIT_MANCHES = 'EDIT_MANCHES';





/**
 * Edit profil from store
 *
 * @param      {String}  {type}  Reducer action
 * @param      {Object}  {profil{pseudo}}  Profil datas
 * @return     {Object}  Redux Store Object
 */

export function editProfil(profil) {
  return { type: EDIT_PROFIL, profil };
}

export function editNiveau(niveau) {
//action.type et action.niveau
  return { type: EDIT_NIVEAU, niveau };
}

export function editManches(manches) {
//action.type et action.niveau
  return { type: EDIT_MANCHES, manches};
  }