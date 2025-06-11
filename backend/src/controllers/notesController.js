import Note from '../models/Note.js'

// desc       Get all notes
// route      GET /api/notes
// access     private
export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })

    res.status(200).json(notes)
  } catch (error) {
    console.error(`Error in getAllNotes controlelr: ${error}`)
    res.status(500).json({
      message: `Internal server error`,
    })
  }
}

// desc       Create a note
// route      POST /api/notes
// access     private
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const note = new Note({ title, content })

    const savedNote = await note.save()

    res.status(201).json(savedNote)
  } catch (error) {
    console.error(`Error in createNote controller: ${error}`)
    res.status(500).json({
      message: `Internal server error`,
    })
  }
}

// desc       Update a note
// route      PUT /api/notes/:id
// access     private
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const note = await Note.findById(id)

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    )

    res.status(200).json(updatedNote)
  } catch (error) {
    console.error(`Error in updateNote controller: ${error}`)
    res.status(500).json({
      message: `Internal server error`,
    })
  }
}

// desc       Delete a note
// route      DELETE /api/notes/:id
// access     private
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params

    const deletedNote = await Note.findByIdAndDelete(id)

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json(deletedNote)
  } catch (error) {
    console.error(`Error in updateNote controller: ${error}`)
    res.status(500).json({
      message: `Internal server error`,
    })
  }
}

// desc       Get a single note a note
// route      GET /api/notes/:id
// access     private
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params

    const note = await Note.findById(id)

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json(note)
  } catch (error) {
    console.error(`Error in getNoteById controller: ${error}`)
    res.status(500).json({
      message: `Internal server error`,
    })
  }
}
