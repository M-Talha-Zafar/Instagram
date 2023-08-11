const User = require("../models/user");

const UserController = {
  getAll: async () => {
    try {
      return User.find();
    } catch (ex) {
      throw new Error("An error occurred while fetching users");
    }
  },

  getById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error();
      return user;
    } catch (ex) {
      throw new Error("An error occurred while fetching the user");
    }
  },

  create: async (userData) => {
    try {
      return User.create(userData);
    } catch (ex) {
      throw new Error("An error occurred while creating the user");
    }
  },

  updateById: async (id, updatedData) => {
    try {
      return User.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (ex) {
      throw new Error("An error occurred while updating the user");
    }
  },

  deleteById: async (id) => {
    try {
      return User.findByIdAndDelete(id);
    } catch (ex) {
      throw new Error("An error occurred while deleting the user");
    }
  },
};

module.exports = UserController;
