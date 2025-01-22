const express = require("express");
const router = express.Router();
const { createnotes, shownotes, updatenotes, deletenotes } = require("../Controller/notesController");
const  validtoken = require("../middleware/validtoken");

router.post("/notes", validtoken , createnotes);
router.get("/notes/all", validtoken, shownotes);
router.post("/notes/update", validtoken, updatenotes);
router.delete   ("/notes/delete", validtoken, deletenotes);

module.exports = router;