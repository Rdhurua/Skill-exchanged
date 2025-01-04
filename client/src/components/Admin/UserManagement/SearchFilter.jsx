// SearchFilter.jsx
import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent
  };

  const handleRoleFilter = (e) => {
    const value = e.target.value;
    setFilterRole(value);
    onFilter({ role: value, status: filterStatus });
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    onFilter({ role: filterRole, status: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filterRole}
        onChange={handleRoleFilter}
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Role</option>
        <option value="learner">Learner</option>
        <option value="provider">Skill Provider</option>
        <option value="admin">Admin</option>
      </select>
      <select
        value={filterStatus}
        onChange={handleStatusFilter}
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default SearchFilter;
