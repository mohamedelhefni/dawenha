const express = require("express");
const Note = require("../models/notes");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("notes/new");
});

router.get("/explore", async (req, res) => {
  const notes = await Note.find({ public: true }).sort({ date: "desc" });
  res.render("notes/index", { notes: notes });
});

router.post("/like/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  await Note.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { "Meta.favs": 1 } }
  )
    .exec()
    .then(res.json({ msg: "succ", likes: ++note.Meta.favs }))
    .catch((e) => {
      res.json({ msg: e });
    });
});
router.post("/unlike/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  await Note.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { "Meta.favs": -1 } }
  )
    .exec()
    .then(res.json({ msg: "succ", likes: --note.Meta.favs }))
    .catch((e) => {
      res.json({ msg: e });
    });
});
router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.render("notes/show", { note: note });
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { "Meta.views": 1 } }
    ).exec();
  } else {
    res.redirect("/");
  }
});

router.post("/new", async (req, res) => {
  const { title, markdown, public } = req.body;
  let newNote = new Note();
  if (title) newNote.title = title;
  if (markdown) newNote.markdown = markdown;
  if (public) newNote.public = Boolean(public);
  try {
    newNote = await newNote.save();
    res.redirect(`/notes/${newNote.id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/notes/new");
  }
});

module.exports = router;
