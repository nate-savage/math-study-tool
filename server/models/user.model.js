const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

//schema

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        minlength: [3, "{PATH} must be at least 3 chars"],
        maxlength: 100,
        required: [true, "Name is required"]
    },
    elo: {
        type: Number,
        default: 1000
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [3,"Password must be at least 3 chars"],
        maxlength: [20, "Password must be under 20 chars"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        //regex to check if valif email
        validate: {
            validator: (val) => { return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val) },
            message: "Please enter a valid email"
        }
    }

}, { timestamps: true })

//this will check the passed "confirmPassword" and won't store it in the db
userSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

userSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

//hash the password
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

//name of collection in database
const User = mongoose.model("User", userSchema)

module.exports = User;