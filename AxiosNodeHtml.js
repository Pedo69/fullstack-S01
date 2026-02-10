// AxiosNodeHtml.js
// Node.js HTML client (Express + EJS)
// npm install express ejs axios body-parser

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const base_url = "http://localhost:3000";

// view engine
app.set("view engine", "ejs");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// list all books
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/books");
    res.render("books", { books: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// view single book
app.get("/book/:id", async (req, res) => {
  try {
    const response = await axios.get(
      base_url + "/books/" + req.params.id
    );
    res.render("book", { book: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// create form
app.get("/create", (req, res) => {
  res.render("create");
});

// create book
app.post("/create", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      author: req.body.author,
    };
    await axios.post(base_url + "/books", data);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// update form
app.get("/update/:id", async (req, res) => {
  try {
    const response = await axios.get(
      base_url + "/books/" + req.params.id
    );
    res.render("update", { book: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// update book
app.post("/update/:id", async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      author: req.body.author,
    };
    await axios.put(
      base_url + "/books/" + req.params.id,
      data
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// delete book
app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(
      base_url + "/books/" + req.params.id
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// start server
app.listen(5500, () => {
  console.log("Server started on port 5500");
});
