require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xlfbbut.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const jobsCollection = client.db("careerCodes").collection("jobs");
    const applicationsCollection = client
      .db("careerCodes")
      .collection("applications");

    // routes for jobs for all and email based jobs
    app.get("/jobs", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.hr_email = email;
      }

      const cursor = jobsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    //will work but not suitable
    // app.get("/postedJobs", async (req, res) => {
    //   const email = req.query.email;
    //   const query = { hr_email: email };
    //   const result = await jobsCollection.find(query).toArray();
    //   res.send(result);
    // });

    app.post("/jobs", async (req, res) => {
      const newJob = req.body;
      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    });

    // routes for applications
    app.get("/applications", async (req, res) => {
      try {
        const email = req.query.email;

        if (!email) {
          return res.status(400).send({ error: "Email is required" });
        }

        const query = { applicantEmail: email };

        const result = await applicationsCollection.find(query).toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch applications" });
      }
    });

    app.post("/applications", async (req, res) => {
      const application = req.body;
      const result = await applicationsCollection.insertOne(application);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  } finally {
    // await client.close();
  }
}
run();

app.get("/", (req, res) => {
  res.send("Career Code Server is running ");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
