/** @format */

const axios = require("axios");
const cheerio = require("cheerio");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config(); // Load environment variables from .env

const mongoUri = process.env.MONGODB_URI; // Use environment variable for MongoDB URI

exports.handler = async (event, context) => {
  const client = new MongoClient(mongoUri);

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("tadeasfortcom");
    const collection = db.collection("devto");

    // Find a URL that hasn't been processed yet
    const doc = await collection.findOne({ processed: { $ne: true } });

    if (!doc) {
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: "No more articles to process" }),
      };
    }

    // Scrape the webpage
    const { data } = await axios.get(doc.url);
    const $ = cheerio.load(data);

    // Extract the title and contents
    const title = $('meta[property="og:title"]').attr("content");
    const contents = $('div[id="article-body"]').text();

    // Update the document
    await collection.updateOne(
      { _id: doc._id },
      { $set: { processed: true, title: title, contents: contents } }
    );
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  } finally {
    await client.close();
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: "Done" }),
  };
};
