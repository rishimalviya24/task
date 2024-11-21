const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/user.model"); // Assuming a User model with email and password fields
const user = require("./models/user.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

// Route for the home page
app.get("/", (req, res) => {
  res.render("index"); // Decent homepage with login/register options
});

// Route for the registration page
app.get("/register", (req, res) => {
  res.render("register"); // Render the registration form
});

// Handle registration
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8); // Hash password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true }); // Set token in a cookie

    res.redirect("register"); // Redirect to profile page after registration
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Handle login-------

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = req.body.token;
  try {
    // Check if the user exists
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).send("User not found. Please register first.");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password.");
    }
    res.redirect("/profile"); // Redirect to profile on successful login
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Profile page-----

app.get('/profile', async (req,res) => {
    // const { username, password , email}= req.query;
    res.render('profile' , { username , email});
})

app.post('/profile', async (req,res ) => {
    const { username , email , password} = req.body;
    const hashedPassword  = await bcrypt.hash(password,10);
    const token = jwt.sign({email}, 'secret');
    const user = new user({ name, email, password: hashedPassword , token});
    try{
        await user.save();
        res.redirect(`/profile?name =${name} &email = ${email}`);
        console.log('user saved successfully',user);    
    }catch(error){
        console.error('User successfully', user);
        res.status(500).send('Internal Server Error');        
    }
})












































































































































//  app.get('/profile',(req,res) => {
//  res.render('profile');
//  })

// app.get("/profile", protectedRoute, async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     const decoded = jwt.verify(token, "secret"); // Decode JWT token

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.redirect("/");
//     }

//     res.render("profile", { user }); // Render profile page with user data
//   } catch (error) {
//     console.error("Error rendering profile:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Protected route middleware
// function protectedRoute(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.redirect("/"); // Redirect to home if no token
//   }

//   try {
//     jwt.verify(token, "secret"); // Verify the token
//     next();
//   } catch (error) {
//     console.error("Invalid token:", error);
//     res.redirect("/"); // Redirect to home on invalid token
//   }
// }

// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
