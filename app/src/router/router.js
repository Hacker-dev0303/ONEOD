
// const multer = require('multer');

 const dashboards = require('../controllers/authController');

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const Users = require("../models/Users").Users;

const admin = {
    email: 'admin@demo.com',
    username: 'admin',
    password: 'admin',
    role: 'admin',
    address: 'Canada',
    allow:true
};


////////////////////////////   initialing first by admin ///////////
const init = async (initialAdmin) => {

    let { email, password, username, role, address, allow} = initialAdmin;

    const existingAdmin = await Users.findOne({ role: role });
    if (existingAdmin)
      return ;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Users({
      email,
      password: passwordHash,
      username,
       role,
      address,
      allow
    });
    const savedAdmin = await newAdmin.save();

    return ;
};

 init(admin);
/////////////////////////////

  // router.route("account/login").post(dashboards.login);

  router.post("/account/signup", dashboards.register);
  router.post("/account/login", dashboards.login);

exports.router = router;
