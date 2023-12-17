const express = require('express');
const upload = require('../middlewares/multer');
const { signUp, login, getUserById, updateUser } = require('../controllers/userController');
const { AuthenticatorJWT } = require('../middlewares/authenticator');

const router = express.Router();

router.post('/signup', upload.single('file'), signUp);
router.post('/login', login);
router.get('/user', AuthenticatorJWT, getUserById);
router.put('/update', AuthenticatorJWT, upload.single("file"), updateUser);

module.exports = router;