const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("@models/User");

exports.authenticate = async({username, password}) => {
    const user = await User.findOne({ username });
    if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.userID }, process.env.SECRET, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        }
    }
}

exports.getAll = async() => {
    return await User.find();
}

exports.getbyID = async(id) => {
    return await User.findById(id);
}

exports.create = async(userParam) => {
     // validate
     if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 20);
    }

    // save user
    await user.save();
}

exports.update = async(id, userParam) => {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

exports._delete = async(id) => {
    await User.findByIdAndRemove(id);
}

