const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    // validation and sanitation check for the username and password
    // we can check it using mongo as well, but in this case we are not using mongo

    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400);
    }
    // in payload do not non confidential data
    // payload, signature, expiry
    const token = jwt.sign({ id: new Date().getDate(), username }, 'jwtSecret', { expiresIn: '30d' });
    res.status(200).json({ msg: 'user created', token }); // sending to frontened
}

const dashboard = async (req, res) => {
    // // console.log(req.headers)
    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new CustomAPIError('No token provided', 401);
    // }

    // const token = authHeader.split(' ')[1];
    const luckyNumber = Math.floor(Math.random() * 100);
    // verify token
    // try {
    // const decoded = jwt.verify(token, 'jwtSecret');
    // console.log(decoded);
    console.log(req.user); // commiing from middleware
    res.status(200).json({
        msg: `Hello, saurabh singh`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    })
    // } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401);
    // }
}

module.exports = { login, dashboard }