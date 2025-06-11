import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Database connected on : ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to database: ${error.message || error}`)
    process.exit(1)
  }
}
