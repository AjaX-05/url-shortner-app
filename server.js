const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UrlShrinker = require("./model/Url.model");

const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.post("/post-url", async (req, res) => {
  const fullUrl = req.body["full-url"];
  const result = await UrlShrinker.create({ full_url: fullUrl });
  //   console.log(result);
  res.redirect("/");
});

app.get("/", async (req, res) => {
  const shortUrls = await UrlShrinker.find();
  //   console.log(shortUrls);
  res.render("index.ejs", { shortUrls: shortUrls });
});

app.get("/:shortURL", async (req, res) => {
  const shortURLParam = await UrlShrinker.findOne({
    short_url: req.params.shortURL,
  });
  if (shortURLParam === null) res.sendStatus(404);
  shortURLParam.clicks++;
  shortURLParam.save();

  res.redirect(shortURLParam.full_url);
});

mongoose
  .connect("mongodb://localhost/url-shortner-project")
  .then(() => {
    console.log("Connected to DB");

    app.listen(6969, () => {
      console.log("Listening on port 6000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
