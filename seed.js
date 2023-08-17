import { EntryModel, CategoryModel, dbClose } from './db.js'

const categories = [
    { name: 'Napoleon'}, { name: 'Coding'}, { name: 'Among Us'}
]

await CategoryModel.deleteMany()
console.log('Deleted categories')
const cats = await CategoryModel.insertMany(categories)
console.log('Inserted categories')

const entries = [
    { category: cats[2], content: "you're sus buddy"},
    { category: cats[0], content: "Asked who was the greatest general of his day, Wellington replied: 'In this age, in past ages, in any age, Napoleon'"},
    { category: cats[1], content: 'Javascript rocks'}
]

await EntryModel.deleteMany()
console.log('Deleted entries')
await EntryModel.insertMany(entries)
console.log('Inserted entries')

dbClose()