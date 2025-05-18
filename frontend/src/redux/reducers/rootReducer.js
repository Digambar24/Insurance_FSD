// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import insuranceReducer from './insuranceReducer';

const rootReducer = combineReducers({
  insurance: insuranceReducer,
  // Add other reducers here
});

export default rootReducer;
