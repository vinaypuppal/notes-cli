#!/usr/bin/env node

const yargs = require('yargs')
const notes = require('./notes')

const titleOptions = { description: 'title of note', demand: true, alias: 't' }

const bodyOptions = { description: 'body of note', demand: true, alias: 'b' }

const argv = yargs
  .command('ls', 'List all notes')
  .command('add', 'Add a note', { title: titleOptions, body: bodyOptions })
  .command('get', 'Get a note', { title: titleOptions })
  .command('rm', 'Remove a note', { title: titleOptions })
  .option('debug', { alias: 'd', description: 'Show debug info' })
  .help()
  .alias('help', 'h').argv

const command = argv._[0]

const debug = argv.d

const ls = () => {
  debug && console.log('list all notes')
  const allNotes = notes.getAllNotes()
  if (!allNotes.length) {
    console.log(`No notes found`)
    return
  }
  console.log(`Found ${allNotes.length} note(s)`)
  allNotes.forEach(note => notes.logNote(note))
}

const add = () => {
  debug &&
    console.log(`add note with (title : body) -- ${argv.title} : ${argv.body}`)
  const addedNote = notes.addNote(argv.title, argv.body)
  if (addedNote) {
    console.log(`note added`)
    notes.logNote(addedNote)
  } else {
    console.log(`Error while adding note`)
  }
}

const get = () => {
  debug && console.log(`get note with (title) -- ${argv.title}`)
  const note = notes.getNote(argv.title)
  if (note) {
    console.log(`Found this note`)
    notes.logNote(note)
  } else {
    console.log(`No note found with given title : ${argv.title}`)
  }
}

const rm = () => {
  debug && console.log(`remove note with (title) -- ${argv.title}`)
  const removedNote = notes.removeNote(argv.title)
  if (removedNote) {
    console.log(`Removed this note`)
    notes.logNote(removedNote)
  } else {
    console.log(`No note found with given title : ${argv.title}`)
  }
}

switch (command) {
  case 'ls':
    ls()
    break
  case 'add':
    add()
    break
  case 'get':
    get()
    break
  case 'rm':
    rm()
    break
  default:
    console.log('Command not found!')
}
