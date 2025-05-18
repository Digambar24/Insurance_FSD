// redux/actions/insuranceActions.js
import axios from 'axios';

// Action Type
export const FETCH_INSURANCE_COMPANIES = 'FETCH_INSURANCE_COMPANIES';

// Action Creator to fetch insurance companies
export const fetchInsuranceCompanies = (insuranceType = '') => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/insurance-companies${insuranceType ? `?type=${insuranceType}` : ''}`);
    dispatch({ type: FETCH_INSURANCE_COMPANIES, payload: response.data });
  } catch (error) {
    console.error('Error fetching insurance companies:', error);
  }
};
