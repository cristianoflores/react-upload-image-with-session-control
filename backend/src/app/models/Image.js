const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String, //nome original
    size: Number,
    key: String, //nome com o hash
    url: String, //url em que a imagem esta contida para subir em algum repositório
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Image', PostSchema);