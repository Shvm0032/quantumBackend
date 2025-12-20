import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";

// CREATE / SIGNUP USER
export const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

// GET ALL USERS
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    data: users,
  });
});

// GET SINGLE USER BY ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// UPDATE USER
export const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("User not found");
  }

  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error("Email already in use");
    }
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
});

// DELETE USER
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

