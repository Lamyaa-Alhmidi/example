// Import required modules
var express = require("express"); // Express.js framework for building web applications
var bodyParser = require("body-parser"); // Middleware to parse request bodies
var mongoose = require("mongoose"); // MongoDB object modeling tool

// Create an instance of the Express application
const app = express();

// Middleware configuration
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('library')); // Serve static files from the 'library' directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://1234:1234@cluster0.lg0pj4y.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

// Database connection event handlers
db.on('error', () => console.log("error")); // Log an error if the connection fails
db.once('open', () => console.log("connected")); // Log a success message if the connection is established

// POST route for registration form submission
app.post("/registration-form", (req, res) => {
  // Retrieve values from the request body
  var username = req.body.username;
  var ID = req.body.ID;
  var email = req.body.email;
  var password = req.body.password;
  
  // Create a new document object
  var data = {
    "username": username,
    "ID": ID,
    "email": email,
    "password": password
  }

  // Insert the data into the 'student' collection of the MongoDB database
  db.collection('student').insertOne(data, (err, collection) => {
    if (err) throw err;
    console.log("record inserted successfully");
  });

  // Redirect the client to a success page
  return res.redirect("success.html");
});

// GET route for the root path
app.get("/", (req, res) => {
  // Set the "Allow-Access" header to allow all origins
  res.set({"Allow-Access": '*'});
  // Redirect the client to an index page
  return res.redirect('Index.html');
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});