const Note = require("../models/note");

module.exports = {
    createNote: async (title, content, date, color, userId) => {
        return await Note.create({ title, content, date, color, userId });
    },

    getNotesByUserId: async (userId) => {
        return await Note.findAll({ where: { userId } });
    },

    updateNoteById: async (id, updateFields, userId) => {
        const note = await Note.findByPk(id);

        // Check if the note exists
        if (!note) {
            throw new Error("Note not found");
        }

        // Check if the user is authorized to update the note
        if (note.userId !== userId) {
            throw new Error("Unauthorized to update this note");
        }

        // Update only the specified fields
        Object.keys(updateFields).forEach((key) => {
            note[key] = updateFields[key];
        });

        return await note.save();
    },

    deleteById: async (id, userId) => {
        const note = await Note.findByPk(id);

        // Check if the note exists
        if (!note) {
            throw new Error("Note not found");
        }

        // Check if the user is authorized to delete the note
        if (note.userId !== userId) {
            throw new Error("Unauthorized to delete this note");
        }

        // Delete the note
        await note.destroy();
        return true; // Indicate successful deletion
    },
    getNoteById: async (id) => {
        return await Note.findByPk(id);
    },
};
