const usersModel = require('../Model/users');

exports.userSignUp = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const user = new usersModel({
        firstname, lastname, email, password
    })
    try {
        const emailFound = await usersModel.findOne({ email: req.body.email });
        if (emailFound)
            return res.status(200).json({ message: "Email already Exists" });
        const addedUser = await user.save();
        res.status(200).send({ user: addedUser, message: "You have been registered Successfully." });
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.userLogin = (req, res) => {
    const { email, password } = req.body;

    usersModel.find({ email: email, password: password })
        .then((userauth) => {
            if (userauth.length > 0) {
                res.status(200).json({ message: "Logged in !!!. Please continue.", isAuthenticated: true, authuser: userauth });
                console.log(userauth);
            }
            else {
                res.status(200).json({ message: "Sorry, invalid email or password. Please check", isAuthenticated: false });
            }
        })
        .catch(err => {
            res.status(400).json({ error_Message: err })
        })
}