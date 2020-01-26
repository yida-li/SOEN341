let express = require("express"); // basic
let app = express(); // basic
let reloadMagic = require("./reload-magic.js"); // basic
let multer = require("multer"); // added, upload the datum from front-end to back-end , combine with
//  FormData of signup
let upload = multer({ dest: __dirname + "/uploads/" });
let MongoClient = require("mongodb").MongoClient;

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/static", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads")); // read : app.use , +uploads : read images and upload images.

let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-vtck9.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  dbo = db.db("media-board");
});

// Your endpoints go after this line
app.post("/signup", upload.none(), async (req, res) => {
  console.log("signup", req.body);
  let name = req.body.username;
  let pwd = req.body.password;
  try {
    const user = await dbo.collection("users").findOne({ username: name });
    if (user) {
      return res.send(JSON.stringify({ success: false }));
    }
    await dbo.collection("users").insertOne({ username: name, password: pwd });
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("/signup", err);
    res.send(JSON.stringify({ success: false }));
  }
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
