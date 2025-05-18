import React, { useEffect, useState } from 'react';
import InsurancePlans from './InsurancePlans';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InsurancePlansSection = () => {
  const { insuranceType } = useParams(); // Get insuranceType from URL params
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Modify the URL to match the correct API format
        const res = await axios.get(`http://localhost:5000/api/insurance-companies?type=${insuranceType}`);
        setPlans(res.data || []); // Set the fetched plans to state
      } catch (error) {
        console.error('Error fetching insurance plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [insuranceType]); // Re-fetch when insuranceType changes

  // Show loading state while waiting for plans to load
  if (loading) return <p>Loading plans...</p>;

  return <InsurancePlans insuranceType={insuranceType} plans={plans} />;
};

export default InsurancePlansSection;
