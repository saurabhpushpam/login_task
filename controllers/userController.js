const user = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secret_jwt = "thisismysecretkey";


const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

const Register = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const { name, dob, email } = req.body;
    const users = new user({
      name,
      dob,
      email,
      password: spassword,
    });

    const useremail = await user.findOne({ email: email });

    if (useremail) {
      res.status(201).send({ success: false, msg: "This email is already exist" });
    }
    else {
      const user_data = await users.save();

      const userResponse = {
        name: user_data.name,
        dob: user_data.dob,
        email: user_data.email,
      };

      res.status(200).send({ success: true, msg: "User registered successfully", data: userResponse });
    }
  }

  catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


const create_token = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, secret_jwt);
    return token;
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email) {
      const userData = await user.findOne({ email: email });
      if (userData) {
        const passwordmatch = await bcryptjs.compare(password, userData.password);
        if (passwordmatch) {
          const tokenData = await create_token(userData._id);

          const userResponse = {
            name: userData.name,
            dob: userData.dob,
            email: userData.email,
            token: tokenData,
          };

          res.status(200).send({ success: true, msg: "Login successful", data: userResponse });
        }
        else {
          res.status(200).send({ success: false, msg: "login credentials are incorrect" });
        }
      }
      else {
        res.status(200).send({ success: false, msg: "login credentials are incorrect" });
      }
    }
  }
  catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


module.exports = {
  Register,
  Login,
}