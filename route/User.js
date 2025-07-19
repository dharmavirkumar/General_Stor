const User = require('../database/shema');
const { Router } = require("express");
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const route = Router();

route.get('/login', (req, res) => {
  const error = req.session.error;
  req.session.error = null; // clear after reading
  res.render('Login', { error });
});
route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.session.error = "All fields are required";
    return res.redirect('/user/login');
  }

  try {
    const user = await User.findOne({ email,password });

    if (!user) {
      req.session.error = "User not found";
      return res.redirect('/user/login');
    }

    // Direct password comparison (not secure for real apps)
    if (password !== user.password) {
      req.session.error = "Invalid email or password";
      return res.redirect('/user/login');
    }

    // Save session and redirect
    req.session.user = user._id;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.session.error = 'Login failed. Please try again.';
    res.redirect('/user/login');
  }
});





route.get('/signup', (req, res) => {
  res.render('Signup');
});

route.post('/signup', async (req, res) => {
  const { email, password, confrompassword } = req.body;

  // ✅ Step 1: Validate input BEFORE creating user
  if (!email || !password || !confrompassword) {
    req.session.error = "All fields are required";
    return res.redirect('/signup');
  }

  if (password !== confrompassword) {
    req.session.error = "Passwords do not match";
    return res.redirect('/signup');
  }

  try {
    // ✅ Step 2: Create user if validation passed
    await User.create({ email, password });

    // ✅ Step 3: Redirect to login after successful signup
    res.redirect('/user/login');
  } catch (err) {
    console.error(err);
    res.render('Signup', { error: 'Failed to sign up. Try again.' });
  }
});


// image secton 

const storage = multer.diskStorage({
  destination:(req,file,cd)=>{
    cd(null,'./upload');

  },
  filename:(req,file,cd)=>{
    cd(null,`${Date.now()}-${ file.originalname}`)
  },
})
const upload = multer({storage});

route.get("/Admin",(req,res)=>{
    res.render("Admin");
})
route.post('/Admin', upload.single('image'), async (req, res) => {
  
  const image = req.file ? req.file.filename : null;

  try {
    await User.create({  image });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error uploading user');
  }
});
route.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // get all users
    res.render('users', { users });  // send data to EJS
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

route.get("/addItem",(req,res)=>{
  res.render("addItem");
})
route.post("/addItem",async(req,res)=>{
  const {name,price,description}=req.body;
  if(!name || !price || !description){
    req.session.error = "All fild are require";
    return res.redirect("/user/addItem");

  }
 
    await User.create({ name, price, description });
 
});



module.exports = route;
