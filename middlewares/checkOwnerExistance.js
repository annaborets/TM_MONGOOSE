const UserModel = require('../models/user');
const errorHelper = require('../config/errorHelper');

module.exports = async function checkUser(req, res, next) {
    const { owner } = req.body;

    const existingUser = await UserModel.findOne({ _id: owner });

    if (!existingUser) {
        return next(errorHelper.notFound('User not found'));
    }

    req.user = existingUser;

    next();
}