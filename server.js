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
});

app.post("/signup", upload.single("img"), (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo
    .collection("users")
    .insertOne({ username: name, password: pwd, frontendPath: frontendPath });
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
    } else if (user.password == pwd) {
      res.send({ success: true });
    } else res.send(JSON.stringify({ success: false }));
  });
});
app.post("/new-post", upload.single("img"), (req, res) => {
  console.log("request to /new-post. body", req.body);
  let file = req.file;
  let frontendPath = "/uploads/" + file.filename;
  dbo.collection("posts").insertOne({
    username: req.body.username,
    description: req.body.description,
    frontendPath: frontendPath
  });
  res.send(JSON.stringify({ success: true }));
});

//endpoint for calling all picture information from mongoDB.
app.get("/find-all", (req, res) => {
  console.log("request to /find-all");
  dbo
    .collection("posts")
    .find({})
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("posts", ps);
      res.send(JSON.stringify(ps));
    });
});
app.get("/all-users", (req, res) => {
  console.log("request to /all-users");
  dbo
    .collection("users")
    .find({})
    .toArray((err, ps) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("users", ps);
      res.send(JSON.stringify(ps));
    });
});
// Your endpoints go after this line

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
