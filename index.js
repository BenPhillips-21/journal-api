import express from 'express'

const categories = ['Napoleon', 'Coding', 'Among Us']

const app = express()
const port = 6969

app.get('/', (request, response) => response.send({info: "ayyyy lmao"}))

app.get('/categories', (req, res) => res.status(204).send(categories))

app.listen(port)