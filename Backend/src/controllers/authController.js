const User = require('../models/User');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }

        res.status(200).json({
            message: 'Login successful!',
            role: user.role
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login.');
    }
};
