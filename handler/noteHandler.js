const noteRepository = require("../repository/noteRepository");

module.exports = {
    create: async (req, res) => {
        const { title, content, date, color } = req.body;
        const userId = req.userData.id;
        const note = await noteRepository.createNote(
            title,
            content,
            date,
            color,
            userId
        );
        res.json(note);
    },
    list: async (req, res) => {
        const userId = req.userData.id;
        const notes = await noteRepository.getNotesByUserId(userId);
        res.json(notes);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { title, content, date, color } = req.body;
        const userId = req.userData.id;

        const updateFields = {}; // Create an object to store the fields to be updated

        if (title !== undefined) {
            updateFields.title = title;
        }

        if (content !== undefined) {
            updateFields.content = content;
        }

        if (date !== undefined) {
            updateFields.date = date;
        }

        if (color !== undefined) {
            updateFields.color = color;
        }

        try {
            const updatedNote = await noteRepository.updateNoteById(
                id,
                updateFields,
                userId
            );
            res.json(updatedNote);
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const userId = req.userData.id;

        try {
            await noteRepository.deleteById(id, userId);
            res.json({ message: "Note deleted successfully" });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;

        try {
            const note = await noteRepository.getNoteById(id);

            if (!note) {
                return res.status(404).json({ message: "Note not found" });
            }

            res.json(note);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
