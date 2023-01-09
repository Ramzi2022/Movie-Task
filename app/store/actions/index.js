import {SAVE_USER} from './types';

export const SaveUser = payload => {
  return {
    type: SAVE_USER,
    payload,
  };
};
