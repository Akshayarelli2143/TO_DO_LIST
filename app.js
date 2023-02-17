const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
var workitems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, resp) =>
{
  let today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  resp.render("list", { listTitle: day, newlistItem: items });
});

app.post("/", function (req, res)
{

  let item = req.body.newItem;
  if (req.body.list === "work")
  {
    workitems.push(item);
    res.redirect("/work");
  } else
  {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function (req, res)
{
  res.render("list", { listTitle: "work list", newlistItem: workitems });
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.post("/work", function (req, res)
{
  let item = req.body.newItem;
  workitems.push(item);
  res.redirect("/work");
});
app.listen(3000, function ()
{
  console.log("Server running on port 3000");
});
