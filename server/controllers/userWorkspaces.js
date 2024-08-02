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

export const addUserWorkspace = async (req, res) => {
  try {
    const userId = req.params.id;
    const newWorkspace = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.ws.push(newWorkspace);
    await user.save();
    res.status(201).json(user.ws);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const deleteWorkspace = async (req, res) => {
  const { id, wsId} = req.params;
  //console.log(id,wsId)
  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      user.ws = user.ws.filter(workspace => workspace._id.toString() !== wsId);
      await user.save();
      res.status(200).json({ message: 'Workspace deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to delete workspace', error });
  }
};
export const updateWorkspaceName = async (req, res) => {
  const { id, wsId } = req.params;
  const { title } = req.body;

  try {
      const user = await User.findById(id);
      const workspace = user.ws.id(wsId);
      
      if (!workspace) {
          return res.status(404).json({ message: "Workspace not found" });
      }
      
      workspace.title = title;
      await user.save();
      
      res.status(200).json(workspace);
  } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
  }
};
export default getUserWorkspaces;