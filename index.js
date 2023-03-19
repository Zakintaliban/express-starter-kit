const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// import todo routes
const todo = require("./routes/todo");

// use todo routes
app.use("/todo", todo);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
