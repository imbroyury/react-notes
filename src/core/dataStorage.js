const APP_KEY = 'NOTES_APP';

export default class NotesDB {
    static getAllNotes() {
        return new Promise((resolve, reject) => {
            const json = localStorage.getItem(APP_KEY),
                notes = JSON.parse(json);
            setTimeout(() => resolve(notes), 0);
        });
    }

    static addNote(note) {
        return NotesDB.getAllNotes()
            .then(notes => {
                const newNotesArray = [...notes, note];
                localStorage.setItem(APP_KEY, JSON.stringify(newNotesArray));
            });
    }

    static deleteNote(id) {
        return NotesDB.getAllNotes()
            .then(notes => {
                const filtered = notes.filter(note => note.id !== id);
                localStorage.setItem(APP_KEY, JSON.stringify(filtered));
            });
    }

    static editNote(id, title, body) {
        return NotesDB.getAllNotes()
            .then(notes => {
                const ind = notes.findIndex(note => note.id === id);
                notes.splice(ind, 1, {
                    ...notes[ind],
                    title,
                    body
                });
                localStorage.setItem(APP_KEY, JSON.stringify(notes));
            });
    }
}