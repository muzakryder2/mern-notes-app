import express from 'express'
import dotenv from 'dotenv'
import noteRoutes from './routers/notesRouter.js'
import { connectDB } from './config/db.js'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
connectDB()

app.use(express.json())

app.use('/api/notes', noteRoutes)

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`)
})
