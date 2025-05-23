import React from 'react';
import { useParams } from 'react-router-dom';

const advisorsData = {
  'new-delhi': {
    name: 'New Delhi',
    description: 'Find trusted insurance advisors in New Delhi to help you with car, health, and term insurance plans.',
    advisors: [
      { name: 'Rahul Sharma', role: 'Car Insurance Expert', experience: '5+ years', languages: 'English, Hindi', rating: 4.8 },
      { name: 'Meena Gupta', role: 'Health Insurance Consultant', experience: '8+ years', languages: 'Hindi, Punjabi', rating: 4.9 },
    ],
  },
  'gurgaon': {
    name: 'Gurgaon',
    description: 'Licensed advisors in Gurgaon to assist with vehicle, life, and medical insurance.',
    advisors: [
      { name: 'Sonal Bhatia', role: 'Life Insurance Advisor', experience: '6+ years', languages: 'English, Hindi', rating: 4.7 },
      { name: 'Rakesh Kumar', role: 'Bike Insurance Specialist', experience: '3+ years', languages: 'Hindi', rating: 4.5 },
    ],
  },
  'faridabad': {
    name: 'Faridabad',
    description: 'Top-rated insurance consultants in Faridabad to help you choose the best plans.',
    advisors: [
      { name: 'Pooja Yadav', role: 'Term Insurance Expert', experience: '7+ years', languages: 'Hindi, English', rating: 4.6 },
      { name: 'Amit Verma', role: 'Car & Bike Insurance Advisor', experience: '4+ years', languages: 'Hindi', rating: 4.4 },
    ],
  },
  'ghaziabad': {
    name: 'Ghaziabad',
    description: 'Get professional insurance advice from verified agents in Ghaziabad.',
    advisors: [
      { name: 'Neha Singh', role: 'Health & Life Insurance Consultant', experience: '6+ years', languages: 'Hindi, English', rating: 4.7 },
      { name: 'Deepak Tyagi', role: 'Motor Insurance Expert', experience: '5+ years', languages: 'Hindi', rating: 4.5 },
    ],
  },
  'noida': {
    name: 'Noida',
    description: 'Trusted advisors in Noida for car, health, and life insurance plans.',
    advisors: [
      { name: 'Kavita Mishra', role: 'Life Insurance Advisor', experience: '7+ years', languages: 'English, Hindi', rating: 4.8 },
      { name: 'Rohan Mehta', role: 'Car Insurance Expert', experience: '4+ years', languages: 'Hindi, Punjabi', rating: 4.6 },
    ],
  },
  'kolkata': {
    name: 'Kolkata',
    description: 'Connect with top-rated insurance advisors in Kolkata for expert advice.',
    advisors: [
      { name: 'Sourav Dutta', role: 'Term Insurance Advisor', experience: '6+ years', languages: 'Bengali, English', rating: 4.7 },
      { name: 'Ananya Ghosh', role: 'Health Insurance Consultant', experience: '5+ years', languages: 'Bengali, Hindi', rating: 4.6 },
    ],
  },
  'hyderabad': {
    name: 'Hyderabad',
    description: 'Find IRDAI-certified advisors in Hyderabad for all types of insurance.',
    advisors: [
      { name: 'Vikram Reddy', role: 'Life & Term Insurance Specialist', experience: '8+ years', languages: 'Telugu, English', rating: 4.9 },
      { name: 'Sneha Rao', role: 'Car Insurance Consultant', experience: '4+ years', languages: 'English, Hindi', rating: 4.6 },
    ],
  },
  'lucknow': {
    name: 'Lucknow',
    description: 'Best insurance agents in Lucknow to guide you through policy selection.',
    advisors: [
      { name: 'Shivam Tiwari', role: 'Health & Life Insurance Advisor', experience: '5+ years', languages: 'Hindi, English', rating: 4.7 },
      { name: 'Preeti Sharma', role: 'Motor Insurance Specialist', experience: '6+ years', languages: 'Hindi', rating: 4.5 },
    ],
  },
  'mumbai': {
    name: 'Mumbai',
    description: 'Explore a curated list of insurance advisors in Mumbai across all policy types.',
    advisors: [
      { name: 'Aakash Joshi', role: 'Comprehensive Insurance Expert', experience: '10+ years', languages: 'Marathi, English', rating: 4.9 },
      { name: 'Nidhi Desai', role: 'Health Insurance Advisor', experience: '6+ years', languages: 'English, Hindi', rating: 4.8 },
    ],
  },
  'pune': {
    name: 'Pune',
    description: 'Find trusted and experienced insurance consultants in Pune.',
    advisors: [
      { name: 'Swapnil Patil', role: 'Term Insurance Specialist', experience: '7+ years', languages: 'Marathi, Hindi', rating: 4.7 },
      { name: 'Ritika Nair', role: 'Vehicle Insurance Consultant', experience: '5+ years', languages: 'English, Hindi', rating: 4.6 },
    ],
  },
  'bangalore': {
    name: 'Bangalore',
    description: 'Top insurance advisors in Bangalore with multilingual support and expertise.',
    advisors: [
      { name: 'Anil Menon', role: 'Life & Term Insurance Expert', experience: '9+ years', languages: 'Kannada, English', rating: 4.9 },
      { name: 'Divya Rao', role: 'Health Insurance Advisor', experience: '6+ years', languages: 'Kannada, Hindi, English', rating: 4.8 },
    ],
  },
};

const InsuranceAdvisorsPage = () => {
  const { citySlug } = useParams();
  const cityInfo = advisorsData[citySlug];

  if (!cityInfo) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">City Not Found</h2>
        <p>No insurance advisor information available for this city.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <section className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Insurance Advisors in {cityInfo.name}</h1>
        <p className="text-gray-600">{cityInfo.description}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Available Advisors</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {cityInfo.advisors.map((advisor, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-medium">{advisor.name}</h3>
              <p><strong>Role:</strong> {advisor.role}</p>
              <p><strong>Experience:</strong> {advisor.experience}</p>
              <p><strong>Languages:</strong> {advisor.languages}</p>
              <p><strong>Rating:</strong> ⭐ {advisor.rating}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Why consult an insurance advisor?</h3>
            <p className="text-gray-700">An advisor helps you choose the best insurance policy suited to your needs and budget.</p>
          </div>
          <div>
            <h3 className="font-medium">Do advisors charge a fee?</h3>
            <p className="text-gray-700">Most advisors offer free consultations. They earn commission from insurers.</p>
          </div>
          <div>
            <h3 className="font-medium">How can I trust these advisors?</h3>
            <p className="text-gray-700">All advisors listed here are verified professionals registered with IRDAI.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsuranceAdvisorsPage;
