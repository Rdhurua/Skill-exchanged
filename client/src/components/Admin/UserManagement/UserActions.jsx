import { useState } from "react";
import EditUserModal from "./UserEditModal.jsx"
const UserActions = ({ userId, user, onUpdate, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
    }
  };

  const handleSave = (id, updatedData) => {
    onUpdate(id, updatedData); // Pass the updated user data to parent
    setIsEditModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSave}
      />
    </>
  );
};

export default UserActions;
