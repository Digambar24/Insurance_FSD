const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../src/config/db');
const InsuranceCategory = require('../src/models/InsuranceCategory.model');

// Load env variables
dotenv.config({ path: '../.env' });

// Connect to MongoDB
connectDB();

const seedInsuranceData = async () => {
  try {
    // Clear old data
    await InsuranceCompany.deleteMany();
    await InsuranceCategory.deleteMany();

    console.log('✅ Old data removed.');

    // Create categories
    const categories = [
      { name: 'Health Insurance', icon: 'health-icon.png' },
      { name: 'Car Insurance', icon: 'car-icon.png' },
      { name: 'Bike Insurance', icon: 'bike-icon.png' },
      { name: 'Life Insurance', icon: 'life-icon.png' },
      { name: 'Term Insurance', icon: 'term-icon.png' },
      { name: 'Investment', icon: 'investment-icon.png' },
    ];

    const createdCategories = await InsuranceCategory.insertMany(categories);

    const getCategoryId = (name) => {
      const category = createdCategories.find((cat) => cat.name === name);
      return category ? category._id : null;
    };

    const companiesData = [
      // Health Insurance Companies
      { name: 'Niva Bupa Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Care Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Aditya Birla Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Star Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'ICICI Lombard Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Reliance Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'ManipalCigna Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Digit Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Cholamandalam MS Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'SBI Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Royal Sundaram Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Future Generali Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'National Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Liberty Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Zuno Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Magma Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Oriental Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'New India Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Bajaj Allianz Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Kotak Mahindra Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },
      { name: 'Universal Sompo Health Insurance', insuranceType: 'Health', categoryName: 'Health Insurance' },

      // Car Insurance Companies
      { name: 'ICICI Lombard Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'HDFC Ergo Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Reliance Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Digit Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'United Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'New India Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Royal Sundaram Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Kotak Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Future Generali Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Iffco Tokio Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Bajaj Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Zuno Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Liberty Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Cholamandalam Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Universal Sompo Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'ACKO Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'TATA AIG Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'National Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Shriram Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },
      { name: 'Magma Car Insurance', insuranceType: 'Car', categoryName: 'Car Insurance' },

      // Bike Insurance Companies
      { name: 'ICICI Lombard Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'HDFC Ergo Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Reliance Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Digit Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'United Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'New India Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Royal Sundaram Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Kotak Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Future Generali Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Iffco Tokio Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Bajaj Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Zuno Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Liberty Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Cholamandalam Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Universal Sompo Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'ACKO Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'TATA AIG Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'National Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Shriram Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },
      { name: 'Magma Bike Insurance', insuranceType: 'Bike', categoryName: 'Bike Insurance' },

      // Life Insurance Companies
      { name: 'Axis Max Life Insurance', insuranceType: 'Life', categoryName: 'Life Insurance' },
      { name: 'HDFC Life Insurance', insuranceType: 'Life', categoryName: 'Life Insurance' },
      { name: 'Tata AIA Life Insurance', insuranceType: 'Life', categoryName: 'Life Insurance' },
      { name: 'PNB MetLife Insurance', insuranceType: 'Life', categoryName: 'Life Insurance' },
      { name: 'ICICI Prudential Insurance', insuranceType: 'Life', categoryName: 'Life Insurance' },
      { name: 'Kotak Life Insurance', insuranceType: 'Life', categoryName: 'Life Insurance' },

      // Term Insurance Companies
      { name: 'Axis Max Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'HDFC Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Tata AIA Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'PNB Metlife Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'ICICI Prudential Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Kotak Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Bajaj Allianz Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Bandhan Life Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Bharti AXA Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'LIC Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Edelweiss Tokio Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'IndiaFirst Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Pramerica Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Exide Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Reliance Nippon Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'SBI Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Aditya Birla Sun Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Canara HSBC OBC Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },
      { name: 'Shriram Life Term Insurance', insuranceType: 'Term', categoryName: 'Term Insurance' },

      // Investment Companies
      { name: 'Axis Max Life Investment', insuranceType: 'Investment', categoryName: 'Investment' },
      { name: 'HDFC Life Investment', insuranceType: 'Investment', categoryName: 'Investment' },
      { name: 'PNB Investment', insuranceType: 'Investment', categoryName: 'Investment' },
      { name: 'ICICI Prudential Investment', insuranceType: 'Investment', categoryName: 'Investment' },
      { name: 'Tata AIA Investment', insuranceType: 'Investment', categoryName: 'Investment' },
    ];

    const companies = companiesData.map((company) => ({
      name: company.name,
      logoUrl: 'https://dummyimage.com/200x100/000/fff&text=' + encodeURIComponent(company.name),
      description: '',
      features: [],
      claimProcess: '',
      faqs: [],
      category: getCategoryId(company.categoryName),
      insuranceType: company.insuranceType,
      isActive: true,
    }));

    await InsuranceCompany.insertMany(companies);

    console.log('Insurance Categories and Companies Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error while seeding:', error);
    process.exit(1);
  }
};

seedInsuranceData();
