/*
  global describe it beforeEach
 */
const fs = require('fs')
const expect = require('expect')
const notes = require('./notes')

const sampleNotes = [
  { title: 'some test title', body: 'some test body' },
  { title: 'some test title two', body: 'some test body two' }
]

beforeEach(done => {
  fs.access('notes-data.json', err => {
    if (!err) {
      fs.unlinkSync('notes-data.json')
    }
    fs.writeFileSync('notes-data.json', JSON.stringify(sampleNotes))
    done()
  })
})

describe('notes-cli', () => {
  it('should list all notes', () => {
    const allNotes = notes.getAllNotes()
    expect(allNotes).toEqual(sampleNotes)
  })
  it('should get a note', () => {
    const note = notes.getNote(sampleNotes[0].title)
    expect(note).toEqual(sampleNotes[0])
  })
  it('should not get non-existing note', () => {
    const note = notes.getNote('somefunnote')
    expect(note).toNotExist()
  })
  it('should add a note', () => {
    const note = { title: 'new note', body: 'new note body' }
    const addedNote = notes.addNote(note.title, note.body)
    expect(addedNote).toEqual(note)
    const allNotes = notes.getAllNotes()
    expect(allNotes).toInclude(addedNote)
  })
  it('should not add duplicate note', () => {
    const note = sampleNotes[0]
    const addedNote = notes.addNote(note.title, note.body)
    expect(addedNote).toNotExist()
  })
  it('should remove a note', () => {
    const removedNote = notes.removeNote(sampleNotes[0].title)
    expect(removedNote).toEqual(sampleNotes[0])
    const allNotes = notes.getAllNotes()
    expect(allNotes).toNotInclude(sampleNotes[0])
  })
  it('should not remove non-existing note', () => {
    const note = notes.removeNote('somefunnote')
    expect(note).toNotExist()
  })
})

