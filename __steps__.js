/**
 * ------------------
 * Mongodb Connection
 * ---------------------
 * 1.create account 
 * 2.create an user with password
 * 3.whitelist IP address
 * 4.database > connect > driver > Node > view full code
 * 5.change the password the uri
 * 
 * const usersCollection = client.db("usersDB").collection("users")
 * ---------------------------------
 *          CREATE --- POST
 * ---------------------------------
 * ***********Server Side************
 * 1. 2.APP.post('/users', async (req,res) => {})
 * 3. Make the function async to use await inside it
 * 4. Make sure you use the express.json() middleware
 * 5. Access data from the body: const user = req.body
 * 6. const result = await userCollection.insertOne(user)
 * 7. res.send(result)
 * 
 * **********Client Side************
 * 1. Create fetch
 * 2. add second parameter as an object
 * 3. provide method: "POST"
 * 4. add headers: {'content-type': 'application/json'}
 * 5. add body: JSON.Stringigy(user)
 * 
 * 
 * ------------------------------------
 *             Read Many
 * ------------------------------------
 * *************Server Side********
 * 1. create a const cursor = userCollection.find()
 * 2. const result = await cursor.toArray()
 * 3. res.send(result)
 * 
 * --------------------------------------
 *             Delete
 * --------------------------------------
 * *************Server side*************
 * 1. create app.delete('/users/:id', async(req,res) =>{})
 * 2. specify unique new objectId to delete the right user
 * 3. const query = { _id: new objectId(id)}
 * 4. const result = await userCollection.deleteOne(query)
 * 
 * **************Client Side********************
 * 1. create dynamic url with id
 * 2. mention the DELETE method
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */