import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Admin/admincompanies.css';

const BASE_URL = 'http://localhost:5000/api/insurance-companies';
const CATEGORY_URL = 'http://localhost:5000/api/insurance-categories';
const insuranceTypes = ['Car', 'Bike', 'Health', 'Life', 'Term', 'Investment'];

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    insuranceType: '',
    category: '',
    logo: null,
    brochure: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [existingLogo, setExistingLogo] = useState('');
  const [existingBrochure, setExistingBrochure] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Parse and extract token
  let token = '';
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    token = userInfo?.token || '';
  } catch (err) {
    console.error('[ERROR] Failed to parse userInfo from localStorage:', err);
    setMessage('Invalid user session. Please login again.');
    localStorage.removeItem('userInfo');
  }

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(data);
    } catch (error) {
      handleApiError(error, 'fetch companies');
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(CATEGORY_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data);
    } catch (error) {
      handleApiError(error, 'fetch categories');
    }
  };

  const handleApiError = (error, action) => {
    console.error(`[ERROR] Failed to ${action}:`, error.response || error.message);
    if (error.response?.status === 401) {
      setMessage('Authorization failed. Please login again.');
      localStorage.removeItem('userInfo');
    } else {
      setMessage(`Failed to ${action}: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage('No authentication token found. Please login.');
      return;
    }
    fetchCompanies();
    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('insuranceType', form.insuranceType);
    formData.append('category', form.category);
    if (form.logo) formData.append('logo', form.logo);
    if (form.brochure) formData.append('brochure', form.brochure);

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Company updated successfully!');
      } else {
        await axios.post(BASE_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Company added successfully!');
      }

      setForm({ name: '', insuranceType: '', category: '', logo: null, brochure: null });
      setEditingId(null);
      setExistingLogo('');
      setExistingBrochure('');
      fetchCompanies();
    } catch (error) {
      handleApiError(error, editingId ? 'update company' : 'add company');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (company) => {
    setEditingId(company._id);
    setForm({
      name: company.name,
      insuranceType: company.insuranceType,
      category: company.category?._id || '',
      logo: null,
      brochure: null,
    });
    setExistingLogo(company.logoUrl || '');
    setExistingBrochure(company.brochure || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Company deleted successfully!');
      fetchCompanies();
    } catch (error) {
      handleApiError(error, 'delete company');
    }
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Admin: Insurance Companies</h2>

      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-search"
      />

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />

        <select name="insuranceType" value={form.insuranceType} onChange={handleChange} required>
          <option value="">Select Type</option>
          {insuranceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input type="file" name="logo" accept="image/*" onChange={handleChange} />
        {existingLogo && <img src={existingLogo} alt="Current Logo" className="admin-preview" />}

        <input type="file" name="brochure" accept=".pdf" onChange={handleChange} />
        {existingBrochure && (
          <a href={existingBrochure} target="_blank" rel="noopener noreferrer">
            View Existing Brochure
          </a>
        )}

        <button type="submit" disabled={loading}>
          {editingId ? 'Update Company' : 'Add Company'}
        </button>
      </form>

      {message && <p className="admin-message">{message}</p>}

      <div className="admin-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Logo</th>
              <th>Brochure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company._id}>
                <td>{company.name}</td>
                <td>{company.insuranceType}</td>
                <td>{company.category?.name || 'N/A'}</td>
                <td>
                  {company.logoUrl && (
                    <img src={company.logoUrl} alt="logo" className="admin-logo" />
                  )}
                </td>
                <td>
                  {company.brochure ? (
                    <a href={company.brochure} target="_blank" rel="noopener noreferrer">View</a>
                  ) : 'N/A'}
                </td>
                <td>
                  <button onClick={() => handleEdit(company)}>Edit</button>
                  <button onClick={() => handleDelete(company._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCompanies;
