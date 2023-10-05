import { connect } from 'mongoose'

const conn = async () => await connect(process.env.VITE_MONGODB_URL)
export { conn }
