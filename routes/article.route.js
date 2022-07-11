const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articles');
const checkOwnerExistance = require('../middlewares/checkOwnerExistance');
const checkArticleExistance = require('../middlewares/checkArticleExistance');

router.post('/', checkOwnerExistance, articleController.createArticle);
router.put('/:articleId', checkOwnerExistance, checkArticleExistance, articleController.updateArticle);
router.get('/', articleController.getArticles);
router.delete('/:articleId', checkArticleExistance, articleController.deleteArticle);

module.exports = router;
