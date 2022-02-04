const User = require("../models/user.model")
const { authenticate } = require('../config/jwt.config');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");





//export all as an object with keys for functions
module.exports = {
    findAllUsers: (req, res) => {
        User.find()
            .then(allDaUsers => res.json({ users: allDaUsers }))
            .catch(err => res.status(400).json(err));
    },

    findOneSingleUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(oneSingleUser => res.json({ user: oneSingleUser }))
            .catch(err => res.status(400).json(err));
    },

    createNewUser: (req, res) => {
        User.create(req.body)
            .then(newlyCreatedUser => res.json({ user: newlyCreatedUser }))
            .catch(err => { res.status(400).json(err) });
    },

    updateExistingUser: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedUser => res.json({ user: updatedUser }))
            .catch(err => res.status(400).json(err));
    },

    deleteAnExistingUser: (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(result => res.json({ result: result }))
            .catch(err => res.status(400).json(err));
    },
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);

        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, "secret", {
                httpOnly: true
            })
            .json({ msg: "success!" ,user:user});
    },
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.FIRST_SECRET_KEY);

                res
                    .cookie("usertoken", userToken, "secret", {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.status(400).json(err));
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

}