import uuidv4 from 'uuid/v4';

export default {
    getNotes,
    addNote,
    editNote,
    deleteNote,
    populateDataStorage
}

let dataStorage = {
    notes: [{
        title: 'Sample First Note',
        body: 'Note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas? ',
        id: "8af17bec-6e6a-4102-bb09-5745bc7d6e57",
    }, {
        title: 'Second Sample Note',
        body: 'note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas?',
        id: "9539963b-74ce-4ab1-b359-14b93beab9e4",
    }, {
        title: 'Third Note',
        body: 'note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas?',
        id: "5e57f81a-8842-4b8c-a27d-b50108119dd0",
    }]
};

function populateDataStorage() {
    console.log('pop called');
    for (let i = 0; i < 10; i++) {
        const note = {
            title: `sample ${i+1} note`,
            body: 'Note body Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aspernatur nobis et ullam, doloribus vel aliquam unde quaerat perferendis mollitia reiciendis dicta officia temporibus asperiores, magnam nesciunt sint odit quas? ',
            id: uuidv4()
        }

        dataStorage.notes.push(note);
    }
    return Promise.resolve(dataStorage.notes);
}

function getNotes() {
    return new Promise((res, rej) => res(dataStorage.notes));
}


function addNote(note) {
    return new Promise(res => {
        dataStorage = {
            notes: [
                ...dataStorage.notes,
                {
                    ...note,
                    id: uuidv4()
                }
            ]
        };
        res(dataStorage.notes);
    });
};

function editNote(id, note) {
    return new Promise((res, rej) => {
        const notes = [...dataStorage.notes],
            editedIndex = notes.findIndex(note => note.id === id),
            newNote = {
                ...note,
                id
            };

        notes.splice(editedIndex, 1, newNote);
        dataStorage.notes = notes;
        res(dataStorage.notes);
    });
}

function deleteNote(id) {
    return new Promise((res, rej) => {
        const notes = dataStorage.notes,
            filtered = notes.filter(note => note.id !== id);
        dataStorage.notes = filtered;
        res(dataStorage.notes);
    });
}