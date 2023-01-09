import {SAVE_USER} from '../actions/types';

const initialState = {
  user: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
