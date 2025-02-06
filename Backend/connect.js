import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://tungchihyuan:tung123@softe.8p9rm.mongodb.net/myDB?retryWrites=true&w=majority&appName=SoftE";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit if unable to connect
  }
};

export { client, connectDB };
