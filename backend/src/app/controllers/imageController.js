const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const multerConfig = require('../middlewares/multer'); //importando config do multer
const authMiddleware = require('../middlewares/auth');

const Image = mongoose.model('Image');

router.use(authMiddleware);

/*
    Passando o multer como middleware na requisição e a configuração do multer como parâmetro
    ".single('NOME_DO_ARQUIVO')" - define um arquivo por upload
*/
router.post('/upload', multer(multerConfig).single('file'), async (req, res) => {
    const post = await Image.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: '' //em branco - não subiu pra repositório 
    });

    res.json({ post });
});

module.exports = router;