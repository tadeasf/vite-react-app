/** @format */

const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
require("dotenv").config(); // Load environment variables from .env

const mongoUri = process.env.MONGODB_URI; // Use environment variable for MongoDB URI

const strapiToken = process.env.STRAPI_TOKEN;
const strapiBackend = "https://tadeasfort.eu/strapi/api";

exports.handler = async (event, context) => {
  const client = new MongoClient(mongoUri);

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("tadeasfortcom");
    const collection = db.collection("devto");

    // Find a processed article that hasn't been uploaded yet
    const doc = await collection.findOne({
      uploaded: { $ne: true },
      processed: true,
    });

    if (!doc) {
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: "No more articles to upload" }),
      };
    }

    // Generate the slug from the URL
    const slug = path.basename(doc.url);

    // Upload the article to Strapi
    const response = await axios.post(
      `${strapiBackend}/articles`,
      {
        data: {
          title: doc.title,
          content: doc.contents,
          slug: slug,
          publishedAt: null,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
        },
      }
    );

    // Update the document
    await collection.updateOne({ _id: doc._id }, { $set: { uploaded: true } });

    // Return the Strapi response
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Done", strapiResponse: response.data }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: err.message,
        errorDetails: err.response
          ? err.response.data
          : "No additional details",
      }),
    };
  } finally {
    await client.close();
  }
};
