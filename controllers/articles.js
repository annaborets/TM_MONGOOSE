const UserModel = require('../models/user');
const ArticleModel = require('../models/article');
const errorHelper = require("../config/errorHelper");

module.exports = { createArticle, updateArticle, deleteArticle, getArticles };

async function createArticle(req, res, next) {
    const existingUser = req.user;

    const {
        title,
        subtitle,
        description,
        owner,
        category,
    } = req.body;

    const article = new ArticleModel({
        title,
        subtitle,
        description,
        owner,
        category,
    });

    let savedArticle

    try {
        savedArticle = await article.save();

        existingUser.numberOfArticles += 1;
        await existingUser.save();
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(errorHelper.badRequest(error.message))
        }

        return next(error);
    }

    res.json(savedArticle);
}

async function updateArticle(req, res, next) {
    const existingArticle = req.article;

    const {
        title,
        subtitle,
        description,
        category,
    } = req.body;

    if (title) existingArticle.title = title;
    if (subtitle) existingArticle.subtitle = subtitle;
    if (description) existingArticle.description = description;
    if (category) existingArticle.category = category;

    try {
        await existingArticle.save();
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(errorHelper.badRequest(error.message))
        }

        return next(error);
    }

    return res.json(existingArticle);
}

async function deleteArticle(req, res, next) {
    const existingArticle = req.article;
    const existingUser = await UserModel.findOne({ _id: existingArticle.owner });

    await existingArticle.remove();

    existingUser.numberOfArticles -= 1;

    await existingUser.save();

    res.status(204).json();
}

async function getArticles(req, res, next) {
    const filterFields = [
        'title',
        'subtitle',
        'description',
        'owner',
        'category',
        'createdAt',
        'updatedAt'
    ];

    const query = {};

    filterFields.forEach(field => {
        if (req.query[field]) {
            query[field] = req.query[field];
        }
    })

    const articles = await ArticleModel.find(query).populate('owner');

    return res.json(articles);
}
