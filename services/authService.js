const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');




exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, password, repeatPassword, address) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch');
    }

    const existingUser = await User.findOne({username});

    if (existingUser) {
        throw new Error('User exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashedPassword, address });
    return this.login(username, password)
};

exports.login = async (email, password) => {
    const user = await this.findBy(email);

    if (!user) {
        throw new Error('Invalid email or password');
    };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    };

    const payload = {
        _id: user._id,
        username: user.email
    }
    const token = await jwt.sign(payload, SECRET);

    return token;
}


