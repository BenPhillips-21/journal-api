import { Router } from 'express'
import { EntryModel, CategoryModel } from '../db.js'

const router = Router()

router.get('/', async (req, res) => res.send(await EntryModel.find().populate({ path: 'category', select: '-_id name'})))

router.get('/:id', async (req, res) => {
    try {
    const entry = await EntryModel.findById(req.params.id).populate({ path: 'category', select: '-_id name'})
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: "Entry not found lmao" })
    }
}
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = {}
        if (req.body.content) {
            updatedEntry.content = req.body.content
        }
        if (req.body.category) {
        const theCat = await CategoryModel.findOne( {name: req.body.category })
            if (theCat) {
                updatedEntry.category = theCat
            }
        }
        const { id } = req.params;
        const newEntry = await EntryModel.findByIdAndUpdate(
            id,
            updatedEntry,
            { new: true }
        );
        if (newEntry) {
            res.json(newEntry);
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.log("Error updating entry:\n", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/', async (req, res) => {
    try {
        const result = await EntryModel.deleteMany({});
        console.log("Deletion successful:", result);
        res.json({ message: 'Deletion successful' });
    } catch (error) {
        console.log("Error deleting documents:\n" + error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEntry = await EntryModel.findByIdAndDelete(id);

        if (updatedEntry) {
            res.sendStatus(200)
        } else {
            res.status(404).json({ error: 'Entry not found' });
        }
    } catch (error) {
        console.log("Error deleting entry:\n", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/', async (req, res) => {
    try {
    const theCat = await CategoryModel.findOne({ name: req.body.category })
    if (theCat) {
    const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat })
    res.status(201).send(insertedEntry)
    } else {
        res.status(404).send({ error: 'Category not found' })
        }
    } catch (err) {
        res.status(500).send( { error: err.message } )
    }
})

export default router