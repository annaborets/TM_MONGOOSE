const UserModel = require('../models/user');
const ArticleModel = require('../models/article');
const errorHelper = require("../config/errorHelper");

module.exports = { createUser, updateUser, getUser, deleteUser, getUserArticles };

async function createUser(req, res, next) {
  const { firstName, lastName, role, nickname } = req.body;

  const user = new UserModel({
    firstName,
    lastName,
    role,
    nickname
  });

  let savedUser;

  try {
    savedUser = await user.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(errorHelper.badRequest(error.message))
    }

    return next(error);
  }

  return res.json(savedUser);
}

async function updateUser(req, res, next) {
  const { firstName, lastName, role, nickname } = req.body;
  const existingUser = req.user;

  if (firstName) existingUser.firstName = firstName;
  if (lastName) existingUser.lastName = lastName;
  if (role) existingUser.role = role;
  if (nickname) existingUser.nickname = nickname;

  try {
    await existingUser.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(errorHelper.badRequest(error.message))
    }

    return next(error);
  }

  return res.json(existingUser);
};

async function getUser(req, res, next) {
  return res.json(req.user);
}

async function deleteUser(req, res, next) {
  const existingUser = req.user;

  await existingUser.remove();

  res.status(204).json();
};

async function getUserArticles(req, res, next) {
  const articles = await ArticleModel.find({ owner: req.user._id });

  res.json(articles);
};
