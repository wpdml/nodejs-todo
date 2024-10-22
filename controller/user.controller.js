const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ status: "fail", message: "⚠︎ This email is already registered. Please try logging in or use another email ⚠︎" });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail,error" });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMath = bcrypt.compareSync(password, user.password);
      if (isMath) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success!", user, token });
      }
    }
    throw new Error("⚠︎ Email or password does not match ⚠︎");
  } catch (error) {
    res.status(400).json({ status: "fail", message:error.message });
  }
};

module.exports = userController;
