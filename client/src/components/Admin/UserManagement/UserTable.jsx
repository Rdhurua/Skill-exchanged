import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/UserApI.js';
import UserActions from './UserActions';
import SearchFilter from './SearchFilter';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setFilteredUsers(data); // Initially display all users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerTerm) || user.email.toLowerCase().includes(lowerTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleFilter = ({ role, status }) => {
    let filtered = users;

    if (role) {
      filtered = filtered.filter((user) => user.role === role);
    }
    if (status) {
      filtered = filtered.filter((user) => user.status === status);
    }

    setFilteredUsers(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleUpdateUser = async (id, updatedData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
        method: 'PUT', // Update request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Send updated user details
      });
  
      if (response.ok) {
        const updatedUser = await response.json(); // Backend sends the updated user
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? updatedUser : user)) // Update state
        );
        alert('User updated successfully!');
      } else {
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating the user.');
    }
  };
  
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert('User deleted successfully!');
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };
  


  return (
    <div className="p-4">
  {/* Search and Filter Section */}
  <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

  {/* Table Container */}
  <div className="overflow-x-auto mt-4">
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id} className="text-left">
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
            <td className="border border-gray-300 px-4 py-2">{user.status}</td>
            <td className="border border-gray-300 px-4 py-2">
              <UserActions
                userId={user._id}
                user={user}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default UserTable;
