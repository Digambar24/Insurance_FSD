import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchUsers = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const token = userInfo ? JSON.parse(userInfo).token : null;
    const user = userInfo ? JSON.parse(userInfo) : null;

    if (!token || user.role !== 'admin') {
      setError('Access denied. Admins only.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err?.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err?.response?.data?.message || 'Error deleting user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((u) => (
          <li key={u._id} style={{ marginBottom: '10px' }}>
            <strong>{u.name}</strong> ({u.email}) -{' '}
            <span>{u.role === 'admin' ? 'Admin' : 'User'}</span>
            {u.role !== 'admin' && (
              <button
                onClick={() => handleDelete(u._id)}
                style={{
                  marginLeft: '10px',
                  background: '#d9534f',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
