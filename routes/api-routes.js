const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  db.Todo.find().then(todos => {
    res.send(todos);
  })
});

//We can find a specific todo based on the id; access the db object, then finds the parameeter by id
router.get("/find/:id", (req, res) => {
  db.Todo.find({ _id: req.params.id }).then(foundTodo => {
    res.send(foundTodo);
  });
});


router.post("/new", (req, res) => {
  db.Todo.create({ text: req.body.text }).then(newTodo => {
    res.send(newTodo);
  });
});

router.patch("/update", (req, res) => {
  db.Todo.findOneAndUpdate({ _id: req.body.id }, { text: req.body.text }).then(
    updatedTodo => {
      res.send({ message: "success", todo: updatedTodo });
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  db.Todo.deleteOne({ _id: req.params.id }).then(() => {
    res.send("success");
  });
});

module.exports = router;
