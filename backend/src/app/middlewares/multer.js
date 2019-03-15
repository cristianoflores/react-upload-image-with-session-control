
/*
    --- MIDDLEWARE ---
    --- UPLOAD LOCAL DO ARQUIVO ---
*/

const multer = require('multer');
const path = require('path'); //lib do NODE (não precisa instalar)
const crypto = require('crypto'); //lib do NODE (não precisa instalar)

module.exports = {
    /*
        Definindo destino do arquivo ao realizar o upload (FALLBACK)
        "__dirname" - refere-se a pasta config
        ".." 2x - desce dois níveis de pasta
        "tmp" e "uploads" - acessa as pastas com esses nomes
    */
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    //Controlando o armazenamento no disco
    storage: multer.diskStorage({

        //Definindo destino do arquivo
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },

        //criando hash para deixar o nome do arquivo unico
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err);
                }

                /*
                    Definindo o nome do arquivo ao salvar
                    "hex" é a transformação dos 16 bytes
                    "file.originalname" - nome original do arquivo
                */
                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        }
    }),

    //Definindo limites para o arquivo
    limits: {
        fileSize: 2 * 1024 * 1024
    },

    /*
        Filtrando o uploads de arquivos
        req - requisição em si
        file - o arquivo em si (nome, tipo e etc)
        cb - callback que será chamado ao fim da verificação
    */
    fileFilter: (req, file, cb) => {
        //defindo os tipos aceitáveis de arquivos para upload
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        //verificando o formato na hora do upload
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
};