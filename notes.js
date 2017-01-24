const fs = require('fs')

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

const getAllNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes-data.json'))
  } catch (e) {
    return []
  }
}

const addNote = (title, body) => {
  const notes = getAllNotes()
  const dups = notes.filter(note => note.title === title)
  if (dups.length) {
    return
  }
  const note = { title, body }
  notes.push(note)
  saveNotes(notes)
  return note
}

const getNote = title => {
  const notes = getAllNotes()
  const filteredNotes = notes.filter(note => note.title === title)
  return filteredNotes.length && filteredNotes[0]
}

const removeNote = title => {
  const notes = getAllNotes()
  const note = getNote(title)
  if (!note) {
    return
  }
  const filteredNotes = notes.filter(note => note.title !== title)
  saveNotes(filteredNotes)
  return note
}

const logNote = note => {
  console.log('---------------------')
  console.log(`title: ${note.title}`)
  console.log(`body: ${note.body}`)
}

module.exports = { getAllNotes, getNote, addNote, removeNote, logNote }

