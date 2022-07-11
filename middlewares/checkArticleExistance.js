const ArticleModel = require('../models/article');
const errorHelper = require('../config/errorHelper');

module.exports = async function checkArticle(req, res, next) {
    const { articleId } = req.params;

    const existingArticle = await ArticleModel.findOne({ _id: articleId });

    if (!existingArticle) {
        return next(errorHelper.notFound('Article not found'));
    }

    req.article = existingArticle;

    next();
}