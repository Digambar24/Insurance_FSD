// redux/slices/insuranceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  insuranceCompanies: [],
  selectedType: "",  // Initially no category selected (to show all)
};

const insuranceSlice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {
    setInsuranceCompanies: (state, action) => {
      state.insuranceCompanies = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
});

export const { setInsuranceCompanies, setSelectedType } = insuranceSlice.actions;

export default insuranceSlice.reducer;
