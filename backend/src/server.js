import express from 'express'
import noteRoutes from './routers/notesRouter.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(rateLimiter)

app.use('/api/notes', noteRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
  })
})
