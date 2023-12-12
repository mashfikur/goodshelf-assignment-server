const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.NODE_ENV || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/v1/home", async (req, res) => {
  res.send("Server is Successfully running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rnoho8k.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // database and collections
    const productsCollections = client.db("goodShelf").collection("products");

    // GET Requests
    app.get("/api/v1/products/section/:name", async (req, res) => {
      const sectionName = req.params.name;

      const result = await productsCollections
        .find({ section: sectionName })
        .toArray();

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
