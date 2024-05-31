const jwt = require('jsonwebtoken');

exports.createToken = (user, userType) => {
    return jwt.sign(
        {
            id: user.id,
            userType: userType,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};
