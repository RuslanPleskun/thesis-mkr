const User = require('../models/userModel');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var cloudinary = require('../middlewares/cloudinary');
const { jwtSecret } = require('../config/keys');
const jwt = require('jsonwebtoken');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ errorMessage: 'No user found!' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ errorMessage: 'No user found!' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.signUp = async (req, res) => {
    try {
        const ifEmailAlreadyPresent = await User.findOne({ email: req.body.email });
        const ifUsernameAlreadyPresent = await User.findOne({ username: req.body.username });
        if (ifEmailAlreadyPresent) {
            res.status(201).json({ errorMessage: 'Email already exists. Please try another one.' });
        }
        else if (ifUsernameAlreadyPresent) {
            res.status(201).json({ errorMessage: 'Username already exists. Please try another one.' });
        }
        else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            const user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                username: req.body.username,
                password: hash
            });

            const saveUser = await user.save();
            if (saveUser) {
                res.status(200).json({ successMessage: 'Account created successfuly!. Please Sign in.' });
            } else {
                res.status(400).json({ errorMessage: 'Account not created. Please try again' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}


exports.login = async (req, res) => {
    const findUser = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.email }]
    });

    if (findUser) {
        const checkPassword = bcrypt.compareSync(req.body.password, findUser.password);
        if (checkPassword) {
            const payload = {
                user: {
                    _id: findUser._id,
                    role: findUser.role
                }
            }
            jwt.sign(payload, jwtSecret, (err, token) => {
                if (err) res.status(400).json({ errorMessage: 'Jwt Error' })

                const { _id, fullName, role, username, email, picture } = findUser;
                res.status(200).json({
                    _id,
                    role,
                    fullName,
                    username,
                    email,
                    token,
                    picture,
                    successMessage: 'Logged In Successfully',

                });
            });
        } else {
            res.status(201).json({ errorMessage: 'Incorrect username or password.' })
        }

    } else {
        res.status(201).json({ errorMessage: 'Incorrect username or password.' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.user._id });
        let picture;
        if (req.file) {
            const uploader = async (path) => await cloudinary.uploads(path, 'SmartMoney/User');
            const { path } = req.file;
            picture = await uploader(path);
            fs.unlinkSync(path);
        } else {
            picture = findUser.picture
        }

        if (findUser) {
            findUser.fullName = req.body.fullName;
            findUser.email = req.body.email;
            findUser.username = req.body.username;
            findUser.city = req.body.city;
            findUser.country = req.body.country;
            findUser.phone = req.body.phone;
            findUser.picture = picture;

            const saveUser = await findUser.save();
            if (saveUser) {
                res.status(200).json({ successMessage: 'Account update successfuly', user: findUser });
            } else {
                res.status(400).json({ errorMessage: 'Account could not be updated. Please try again' });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
}