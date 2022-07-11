const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String, minLength: 5, maxLength: 400, required: true, text: true },
    subtitle: { type: String, minLength: 5 },
    description: { type: String, minLength: 5, maxLength: 5000, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['sport', 'games', 'history'] },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
});

const ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;
