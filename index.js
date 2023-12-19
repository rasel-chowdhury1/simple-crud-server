const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

//middelware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://rasel-chowdhury:mongodbRasel47@cluster0.jz0ivtr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // const database = client.db("usersDB");
    // const usersCollection = database.collection("users");
    
    const usersCollection = client.db("usersDB").collection("users")
    
    app.get('/users', async(req,res)=>{
      const cursor = usersCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/user/:id', async(req,res) =>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const user = await usersCollection.findOne(query)
      res.send(user)
    })

    app.post('/users', async(req,res) =>{
      const user = req.body;
      console.log('new user', user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.put('/user/:id', async(req,res) =>{
      const id = req.params.id
      const User = req.body;
      console.log(id,User);
      const filter = {_id: new ObjectId(id)}
      //upsert is true means User Id not exist.create new user and set this user
      const options = {upsert: true}
      
      const updatedUser = {
        $set: {
          name: User.name,
          email: User.email,
        }
      }

      const result = await usersCollection.updateOne(filter, updatedUser, options)
      res.send(result);

    })

    app.delete('/users/:id', async(req,res) =>{
      const userId = req.params.id;
      console.log('Please delete from database ',userId);
      
      const query = {_id: new ObjectId(userId)}
      const result = await usersCollection.deleteOne(query)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('Simple crud operation is running!')
})

app.listen(port, ()=>{
    console.log(`Simple crud is running on port ${port}`)
})