// desc       Get all notes
// route      GET /api/notes
// access     private
export const getAllNotes = async (req, res) => {
  res.status(200).json({ message: 'GET all notes' })
}

// desc       Create a note
// route      POST /api/notes
// access     private
export const createNote = async (req, res) => {
  res.status(201).json({ message: 'Note created successfully' })
}

// desc       Update a note
// route      PUT /api/notes/:id
// access     private
export const updateNote = async (req, res) => {
  const { id } = req.params
  res.status(200).json({ message: `Note ${id} updates successfully` })
}

// desc       Delete a note
// route      DELETE /api/notes/:id
// access     private
export const deleteNote = async (req, res) => {
  const { id } = req.params
  res.status(200).json({ message: `Note ${id} deleted successfully` })
}
