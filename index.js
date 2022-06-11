const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.p6lla.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);


async function run() {
    try {
        await client.connect()
        const projectCollection = client.db('portfolio').collection('project');

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const result = await projectCollection.findOne({ id })
            console.log(result);

            res.send(result)

        })





    }
    finally {

    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('portfolio server is running')
})
app.listen(port, () => {
    console.log('running ', port);
})