let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads" });
let MongoClient = require("mongodb").MongoClient;

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-vtck9.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  dbo = db.db("Vibez");
}); // depends on what kind of data base I am going to use, de(name) name will change.

// Your endpoints go after this line
app.post("/signup", upload.none(), (req, res) => {
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").insertOne({ username: name, password: pwd });
  res.send(JSON.stringify({ success: true }));
});

app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.send({ success: false });
    } else if (user === null) {
      res.send({ success: false });
    } else if (user.password === pwd) {
      res.send({ success: true });
    } else res.send(JSON.stringify({ success: false }));
  });
});

app.post("/new-post", upload.single("img"), (req, res) => {
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo.collection("posts").insertOne({
    description: req.body.description,
    frontendPath: frontendPath,
    username: req.body.username
  });
  res.send(JSON.stringify({ success: true }));
});
// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
