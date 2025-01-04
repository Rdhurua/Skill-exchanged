import axios from 'axios';

const BASE_URL = 'http://localhost:5900';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/admin/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
