import User from '../models/User.js';

// Fetch all workspaces for a user by user ID
export const getUserWorkspaces = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.ws);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default getUserWorkspaces;