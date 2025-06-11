import express from 'express'
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from '../controllers/notesController.js'

const router = express.Router()

router.route('/').get(getAllNotes).post(createNote)
router.route('/:id').put(updateNote).delete(deleteNote).get(getNoteById)

export default router
