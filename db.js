import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected')
}

mongoose.connect(process.env.ATLAS_DB_URL)
    .then(goose => console.log(goose.connection.readyState === 1 ? 'Mongoose Connected' : 'Moongoose failed to connect yo goofy ahh'))
    .catch(err => console.log(err))

const entrySchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category' },
    content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }