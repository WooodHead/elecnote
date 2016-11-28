const { Client, NoteFilter, NotesMetadataResultSpec } = require('evernote').Evernote;
const token = 'S=s18:U=3254f3:E=15ff9ce8116:C=158a21d5488:P=1cd:A=en-devtoken:V=2:H=2e82e1445653ecb1daa44702b7ccd863';
const client = new Client({ token });

const noteStore = client.getNoteStore('https://app.yinxiang.com/shard/s18/notestore');

const getAllNotebooks = () => {
  return new Promise((resolve, reject) => {
    noteStore.listNotebooks((err, notebooks) => {
      if (err) reject(err);
      resolve(notebooks);
    });
  });
};

const getNotebook = (guid) => {
  return new Promise((resolve, reject) => {
    const filter = new NoteFilter();
    filter.notebookGuid = guid;
    const resultSpec = new NotesMetadataResultSpec();
    resultSpec.includeTitle = true;
    noteStore.findNotesMetadata(filter, 0, 100, resultSpec, (err, notebook) => {
      if (err) reject(err);
      resolve(notebook);
    });
  });
};

const getNote = (guid) => {
  return new Promise((resolve, reject) => {
    noteStore.getNote(guid, true, true, true, true, (err, note) => {
      if (err) reject(err);
      resolve(note);
    });
  });
};

export default {
  getAllNotebooks,
  getNotebook,
  getNote,
};

// getAllNotebooks()
// .then(notebooks => {
//   console.log(notebooks);
//   return getNotebook(notebooks[0].guid)
// })
// .then(notebook => {
//   console.log(notebook);
//   return notebook.notes[0];
// })
// .then(note => {
//   console.log(note);
//   return getNote(note.guid);
// })
// .then(note => {
//   console.log(note);
// })
