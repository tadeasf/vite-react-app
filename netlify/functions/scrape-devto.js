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
    let collection;

    // Check if collection exists and create if not
    if ((await db.listCollections({ name: "devto" }).toArray()).length === 0) {
      collection = await db.createCollection("devto");
    } else {
      collection = db.collection("devto");
    }

    // Scrape dev.to
    const { data } = await axios.get("https://dev.to/t/webdev/");
    const $ = cheerio.load(data);
    let articles = [];
    let links = $("a.crayons-story__hidden-navigation-link");

    for (let i = 0; i < links.length; i++) {
      if (articles.length >= 5) break; // break if we've found 5 new URLs

      let url = `https://dev.to${$(links[i]).attr("href")}`;

      // Check if this URL is already stored in the database
      let isExisting = await collection.findOne({ url: url });

      if (!isExisting) {
        articles.push({ url: url });
      }
    }

    // Insert into MongoDB
    if (articles.length > 0) {
      await collection.insertMany(articles);
    }
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
