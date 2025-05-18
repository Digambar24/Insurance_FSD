const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const InsuranceCategory = require('../models/InsuranceCategory.model');
const InsuranceCompany = require('../models/insuranceCompany.model');

// GET /api/insurance-companies
const getAllInsuranceCompanies = async (req, res) => {
  try {
    const { type, category, isActive, keyword } = req.query;
    const filter = {};

    if (type) filter.insuranceType = type;
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category;
    }
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    if (keyword) {
      filter.name = { $regex: keyword, $options: 'i' };
    }

    console.log("Filter being used:", filter);
    const companies = await InsuranceCompany.find(filter);
    res.json(companies);
  } catch (error) {
    console.error("Error fetching insurance companies:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/insurance-companies/category/:categoryId
const getInsuranceCompaniesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const companies = await InsuranceCompany.find({ category: categoryId });
    res.json(companies);
  } catch (error) {
    console.error("Error fetching by category:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/insurance-companies/type/:type
const getInsuranceCompaniesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const companies = await InsuranceCompany.find({ insuranceType: type });
    res.json(companies);
  } catch (error) {
    console.error("Error fetching by type:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// POST /api/insurance-companies
const createInsuranceCompany = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    const { name, description, claimProcess, insuranceType, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    let features = [];
    let faqs = [];

    try {
      features = req.body.features ? JSON.parse(req.body.features) : [];
      faqs = req.body.faqs ? JSON.parse(req.body.faqs) : [];
    } catch (parseError) {
      return res.status(400).json({ message: "Invalid JSON in features or faqs", error: parseError.message });
    }

    const logoFile = req.files?.logo?.[0];
    const brochureFile = req.files?.brochure?.[0];

    const logoPath = logoFile ? path.join('/uploads', logoFile.filename).replace(/\\/g, '/') : '';
    const brochurePath = brochureFile ? path.join('/uploads', brochureFile.filename).replace(/\\/g, '/') : '';

    const companyData = {
      name,
      description: description || '',
      features,
      claimProcess: claimProcess || '',
      faqs,
      insuranceType,
      isActive: true,
      category,
      logo: logoPath,
      logoUrl: logoPath,
      brochure: brochurePath,
    };

    console.log("Final company data to save:", companyData);
    const newCompany = new InsuranceCompany(companyData);
    await newCompany.save();

    res.status(201).json({ message: 'Insurance company added successfully', company: newCompany });
  } catch (error) {
    console.error("Error in createInsuranceCompany:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// PUT /api/insurance-companies/:id
const updateInsuranceCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const company = await InsuranceCompany.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    let {
      name,
      logoUrl,
      description,
      features,
      claimProcess,
      faqs,
      category,
      insuranceType,
      isActive,
    } = req.body;

    try {
      features = typeof features === 'string' ? JSON.parse(features) : features;
      faqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;
    } catch (parseError) {
      return res.status(400).json({ message: 'Invalid JSON in features or faqs', error: parseError.message });
    }

    company.name = name ?? company.name;
    company.logoUrl = logoUrl ?? company.logoUrl;
    company.description = description ?? company.description;
    company.features = features ?? company.features;
    company.claimProcess = claimProcess ?? company.claimProcess;
    company.faqs = faqs ?? company.faqs;
    company.category = category ?? company.category;
    company.insuranceType = insuranceType ?? company.insuranceType;
    company.isActive = isActive ?? company.isActive;

    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        if (company.logo) {
          try {
            fs.unlinkSync(path.resolve(__dirname, '..', company.logo));
          } catch (err) {
            console.warn("Failed to delete old logo:", err.message);
          }
        }
        company.logo = path.join('/uploads', req.files.logo[0].filename).replace(/\\/g, '/');
      }

      if (req.files.brochure && req.files.brochure[0]) {
        if (company.brochure) {
          try {
            fs.unlinkSync(path.resolve(__dirname, '..', company.brochure));
          } catch (err) {
            console.warn("Failed to delete old brochure:", err.message);
          }
        }
        company.brochure = path.join('/uploads', req.files.brochure[0].filename).replace(/\\/g, '/');
      }
    }

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (error) {
    console.error("Error in updateInsuranceCompany:", error);
    res.status(500).json({ message: "Failed to update insurance company", error: error.message });
  }
};

// DELETE /api/insurance-companies/:id
const deleteInsuranceCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const company = await InsuranceCompany.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if (company.logo) {
      try {
        fs.unlinkSync(path.resolve(__dirname, '..', company.logo));
      } catch (err) {
        console.warn("Failed to delete logo:", err.message);
      }
    }

    if (company.brochure) {
      try {
        fs.unlinkSync(path.resolve(__dirname, '..', company.brochure));
      } catch (err) {
        console.warn("Failed to delete brochure:", err.message);
      }
    }

    await company.deleteOne();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error("Error in deleteInsuranceCompany:", error);
    res.status(500).json({ message: "Failed to delete insurance company", error: error.message });
  }
};

module.exports = {
  getAllInsuranceCompanies,
  getInsuranceCompaniesByCategory,
  getInsuranceCompaniesByType,
  createInsuranceCompany,
  updateInsuranceCompany,
  deleteInsuranceCompany,
};
