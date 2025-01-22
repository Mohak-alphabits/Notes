const { Note } = require("../model/notesModel");

// Create note  
const createnotes = async (req, res) => {
  const { userId, title, description } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const note = await Note.create({
      userId,
      title,
      description
    });

    console.log("Note added successfully");
    return res.status(201).json({
      message: "Note created successfully",
      note: { userId, title, description }
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ error: "Error creating note" });
  }
};

// Show notes
const shownotes = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const noteData = await Note.find({ userId });

    if (!noteData.length) {
      return res.status(404).json({ error: "No notes found for this user" });
    }

    return res.status(200).json({ noteData });
  } catch (err) {
    console.error("Error fetching notes:", err);
    return res.status(500).json({ error: "Server error while fetching notes" });
  }
};

// Update note
const updatenotes = async (req, res) => {
  const { noteId, title, description } = req.body;

  if (!noteId) {
    return res.status(400).json({ error: "Note ID required" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("Note updated successfully");
    return res.status(200).json({ updatedNote });
  } catch (err) {
    console.error("Error updating note:", err);
    return res.status(500).json({ error: "Server error while updating note" });
  }
};

// Delete note
const deletenotes = async (req, res) => {
  const { noteId } = req.body;

  if (!noteId) {
    return res.status(400).json({ error: "Note ID required" });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("Note deleted successfully");
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    return res.status(500).json({ error: "Server error while deleting note" });
  }
};

module.exports = { createnotes, shownotes, updatenotes, deletenotes };
