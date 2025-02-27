import  User from '../model/user-model.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

const Statistics=async(req,res)=>{
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 

    const totalUsers = await User.countDocuments(); 
    const loggedInToday = await User.countDocuments({
      lastLogin: { $gte: startOfDay }, 
    });
    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: startOfDay }, 
    });
    const currentLoggedIn = await User.countDocuments({ isLoggedIn: true }); 

    res.status(200).json({
      totalUsers,
      loggedInToday,
      newUsersToday,
      currentLoggedIn,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }

}

export{ getAllUsers, updateUser, deleteUser,Statistics };
