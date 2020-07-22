const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth");

//If we get user/login request
router.get("/login", (req, res) => {
  res.render("login");
});

//If we get user/register request
router.get("/register", (req, res) => {
  res.render("register");
});

//If we get the register form i.e POST Request
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  let errors = [];
  // console.log(req.body);

  //Validations
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please Fill All Fields" });
  }
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords Do Not Match" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  //Validation Successfull//
  else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is Already Registerd" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        //Now enter in the Database
        const newUser = new User({
          name,
          email,
          password,
        });
        //Hash Password
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;

            newUser.save().then(user=>{
            req.flash('success_msg' ,'Successfully Registered');
            res.redirect('/user/login')}).catch(e=>console.log(e));
          });
        });
      }
  });
}
})


//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have Logged Out ");
  res.redirect("/user/login");
});


//User Profile
// router.post("/:id/profile" , (req,res)=>{
//   res.render("profile");
// });

router.get("/:id/:email/profile" , (req,res)=>{
  const email= req.params.email ;
  User.findOne({ email : email }).then((user) => {
    // const name = user.name,
    if (user) {
      res.render("profile", {
        name  : user.name,
        email : user.email,
      });
    } else {
      req.flash("error_msg", "User Not Found ");
      res.redirect("/dashboard");
    }
});
});

//Update Account
router.get(":email/update", (req,res)=>{
  
});

module.exports = router;
