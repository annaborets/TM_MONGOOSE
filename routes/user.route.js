const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkUserByParamId = require('../middlewares/checkUserByParamId');

router.post('/', userController.createUser);
router.get('/:userId/articles', checkUserByParamId, userController.getUserArticles);
router.put('/:userId', checkUserByParamId, userController.updateUser);
router.get('/:userId', checkUserByParamId, userController.getUser);
router.delete('/:userId', checkUserByParamId, userController.deleteUser);

module.exports = router;
