import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import noteRoutes from './routers/notesRouter.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use(express.json())
app.use(rateLimiter)

app.use('/api/notes', noteRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
  })
})
