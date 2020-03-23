/*
 * action types
 */

export const EDIT_PROFIL = 'EDIT_PROFIL';

/*
 * action creators
 */

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