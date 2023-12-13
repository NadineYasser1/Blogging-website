import { MongoClient } from "mongodb";

export const dbUrl = 'mongodb+srv://user:123@cluster0.8ufjqxd.mongodb.net/';



async function handler(req,res) {
  if(req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(dbUrl)
    const db = client.db()
    const blogsCollection = db.collection('blogs')
    const result = await blogsCollection.insertOne(data)
    console.log(result)

    client.close()
    res.status(201).json({message: 'Blog added!'})

   
  }
}
export default handler;