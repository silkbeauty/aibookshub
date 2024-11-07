const express = require('express')
const router = express.Router();
const ArticleCtrl = require('../controllers/article.controller')

router.get('/', ArticleCtrl.apiGetAllArticles);
router.get('/testGet', ArticleCtrl.apiHw);
router.post('/post', ArticleCtrl.apiCreateArticle);
router.get('/article/:id', ArticleCtrl.apiGetArticleById);
router.put('/article/:id', ArticleCtrl.apiUpdateArticle);
router.delete('/article/:id', ArticleCtrl.apiDeleteArticle);

router.post('/testPost', (req, res) => {
    res.status(201).json({ msg: '新的篇章，即将开始' });
});

module.exports=router;