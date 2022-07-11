const UserModel = require('../models/user');
const errorHelper = require('../config/errorHelper');

module.exports = async function checkUser(req, res, next) {
    const { userId } = req.params;

    const existingUser = await UserModel.findOne({ _id: userId });

    if (!existingUser) {
        return next(errorHelper.notFound('User not found'));
    }

    req.user = existingUser;

    next();
}