const express = require("express");
const cors = require('cors');
const { MongoClient ,ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//password:  9MYqYycJM9HfsWeI
//Name:      crud_node



const uri = "mongodb+srv://crud_node:9MYqYycJM9HfsWeI@cluster0.s2ra0a6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 

async function run(){
  try{
await client.connect();
const userCollection = client.db('crud').collection('user');


//get data from database
app.get('/user', async(req,res) => {
  const query = {};
  const cursor = userCollection.find(query);
  const users = await cursor.toArray();
  res.send(users)
})

app.get('/user/:id', async(req,res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await userCollection.findOne(query)
  res.send(result);
})


//update user
app.put('/user/:id', async(req,res) => {
const id = req.params.id;
const updateUser = req.body;
const filter = {_id: new ObjectId(id)};
const options = {upsert:true};
const updateDoc = {
  $set: {
    name : updateUser.name,
    email: updateUser.email
  }
};
const result = await userCollection.updateOne(filter,updateDoc,options)
res.send(result)
})

// post data from 
app.post('/user', async(req,res) => {
  const newUser = req.body;
  console.log('adding new user',newUser);
  const result = await userCollection.insertOne(newUser)
  res.send(result)
})

//delete user

app.delete('/user/:id', async(req,res) => {
const id = req.params.id;
const query = {_id: new ObjectId(id)}
const result = await userCollection.deleteOne(query);
res.send(result)
})


  }
  finally{

  }
}


run().catch(console.dir);




app.get('/', (req,res) => {
    res.send("Running my node curd server");
})

app.listen(port, () => {
     
})




