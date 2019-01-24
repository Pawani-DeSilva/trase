import createReducer from 'utils/createReducer';
import {
  NEWSLETTER__SET_SUBSCRIPTION_MESSAGE,
  NEWSLETTER__RESET_NEWSLETTER
} from './newsletter.actions';

const initialState = {
  message: ''
};

const newsletterReducer = {
  [NEWSLETTER__SET_SUBSCRIPTION_MESSAGE](state, action) {
    const { message } = action.payload;
    return { ...state, message };
  },
  [NEWSLETTER__RESET_NEWSLETTER](state) {
    return { ...state, message: '' };
  }
};

export default createReducer('newsletter', initialState, newsletterReducer);
