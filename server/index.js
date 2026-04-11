require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); //jwt token
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [`http://localhost:5173`],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  console.log("inside the logger");
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

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

    //jwt token related api
    app.post("/jwt", async (req, res) => {
      const userInfo = req.body;
      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });

      res.send({ success: true });
    });

    //jobs api
    app.get("/jobs/applications", async (req, res) => {
      const email = req.query.email;
      const query = { hr_email: email };
      const jobs = await jobsCollection.find(query).toArray();

      // should use aggregate to have optimum data fatching

      for (const job of jobs) {
        const applicationQuery = { jobId: job._id.toString() };
        const application_Count =
          await applicationsCollection.countDocuments(applicationQuery);

        job.application_Count = application_Count;
      }
      res.send(jobs);
    });

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
    app.get("/applications", logger, verifyToken, async (req, res) => {
      try {
        const email = req.query.email;

        if (!email) {
          return res.status(400).send({ error: "Email is required" });
        }

        console.log("inside application api", req.cookies);
        // if (email !== req.user.email) {
        //   return res.status(403).send({ message: "Forbidden Access" });
        // }

        const query = { applicantEmail: email };

        const result = await applicationsCollection.find(query).toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch applications" });
      }
    });

    app.get(`/applications/job/:job_id`, async (req, res) => {
      const job_id = req.params.job_id;
      const query = { jobId: job_id };
      const result = await applicationsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/applications", async (req, res) => {
      const application = req.body;
      const result = await applicationsCollection.insertOne(application);
      res.send(result);
    });

    app.patch("/applications/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: req.body.status,
        },
      };
      const result = await applicationsCollection.updateOne(filter, updatedDoc);
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
