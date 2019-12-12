const express = require("express");
const router = express.Router();

//Load Idea model
const Idea = require("../../models/Idea");

//Load helper
const { ensureAuthenticated } = require("../../helpers/auth");

//Load Input Validation
const validateAddIdeaInput = require("../../validation/ideas");

//@route GET api/ideas/test
//@desc    Tests users route
//@access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Ideas works"
  })
);

//@route GET api/ideas/
//@desc   GET ALL Ideas
//@access  Private
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({ user: req.user.id })
    .sort({ date: -1 })
    .then(ideas => {
      res.render("ideas/index", { ideas: ideas });
    });
});

//@route GET api/ideas/add
//@desc    Add ideas Form
//@access  Private
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/addIdeaForm");
});

//@route POST api/ideas
//@desc    Add ideas Form
//@access  Private
router.post("/", ensureAuthenticated, (req, res) => {
  const { errors, isValid } = validateAddIdeaInput(req.body);

  //Check validation
  if (!isValid) {
    return res.render("ideas/addIdeaForm", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  }
  //Create new Idea
  const newIdea = new Idea({
    title: req.body.title,
    details: req.body.details,
    user: req.user.id
  });

  //Save the idea
  newIdea.save().then(idea => {
    req.flash("success msg", "video idea added");
    res.redirect("/api/ideas");
  });
});

//@route GET api/ideas/:id
//@desc    Get an Idea by id
//@access  Private
router.get("/:id", ensureAuthenticated, (req, res) => {
  Idea.findById({
    _id: req.params.id
  }).then(idea => {
    if (idea.user.toString() !== req.user.id) {
      req.flash("error_msg", "Not Authorized");
      res.redirect("/api/ideas");
    } else {
      res.render("ideas/edit", { idea: idea });
    }
  });
});

//@route PUT api/ideas/:id
//@desc    Edit an Idea by id
//@access  Private
router.put("/:id", ensureAuthenticated, (req, res) => {
  Idea.findById({
    _id: req.params.id
  }).then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save().then(idea => {
      req.flash("success_msg", "Video idea updated");
      res.redirect("/api/ideas");
    });
  });
});

//@route DELETE api/ideas/:id
//@desc   Delete an Idea by id
//@access  Private
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.findOneAndDelete({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Video idea removed");
    res.redirect("/api/ideas");
  });
});

module.exports = router;
