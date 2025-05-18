// redux/reducers/insuranceReducer.js
import { FETCH_INSURANCE_COMPANIES } from '../actions/insuranceActions';

const initialState = {
  insuranceCompanies: [],
};

const insuranceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INSURANCE_COMPANIES:
      return {
        ...state,
        insuranceCompanies: action.payload,
      };
    default:
      return state;
  }
};

export default insuranceReducer;
