const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.Port || 5000;

// middleWare 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bonkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("testSelf");
      const usersCollection = database.collection("web");

      // GET API
      app.get('/users' , async(req, res) => {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
      })

      app.get('/users/:id' , async(req, res) => {
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const user = await usersCollection.findOne(query);
        console.log('load user with id', id);
        res.send(user);
      })
      
      // Post Api
      app.post('/users', async(req, res) => {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
          console.log('got new post' , req.body);
          console.log('added user ' , result);
        res.json(result);
      })

      // Update Api
      app.put('/users/:id' , async(req , res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        const filter = {_id:ObjectId(id)};
        const options = {upsert:true};
        const updateDoc = {
          $set:{
            name:updatedUser.name,
            email:updatedUser.email
          }
        };
        const result = await usersCollection.updateOne(filter, updateDoc , options);
        console.log('updateing user' , id);
        // res.send('Updating not dating')
        res.json(result);
      })

      // DELETE API
      app.delete('/users/:id' , async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        console.log('deleting user with id' , id , result);
        res.json(result);
      })

    } finally {
      // await client.close();
    }
  }
run().catch(console.dir);

app.get('/' , (req , res) => {
    res.send("Running my CRUD Server");
});

app.listen(port , () => {
    console.log("Running server on port " , port);
})