/**
 * eslint-disable no-undef
 *
 * @format
 */

import axios from "axios";
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

// Your static routes
const routes = [
  { url: "/contact", changefreq: "monthly", priority: 0.7 },
  { url: "/blog", changefreq: "weekly", priority: 0.7 },
  { url: "/photography", changefreq: "weekly", priority: 0.7 },
  { url: "/", changefreq: "monthly", priority: 1.0 },
];

// Fetch dynamic routes from Strapi
const fetchDynamicRoutes = async () => {
  const articles = await axios.get("https://tadeasfort.eu/strapi/api/articles");
  const galleries = await axios.get(
    "https://tadeasfort.eu/strapi/api/galleries"
  );

  articles.data.data.forEach((article) => {
    routes.push({
      url: `/blog/${article.attributes.slug}?id=${article.id}`,
      changefreq: "weekly",
      priority: 0.5,
    });
  });

  galleries.data.data.forEach((gallery) => {
    routes.push({
      url: `/gallery/${gallery.attributes.slug}?id=${gallery.id}`,
      changefreq: "weekly",
      priority: 0.5,
    });
  });
};

fetchDynamicRoutes()
  .then(() => {
    // Create a stream to write to
    const stream = new SitemapStream({ hostname: "https://tadeasfort.com" });

    // Pass the routes to the stream
    routes.forEach((route) => {
      stream.write(route);
    });

    // End the stream
    stream.end();

    // Generate the sitemap
    streamToPromise(stream).then((sitemap) => {
      // Write it to a file
      createWriteStream("./public/sitemap.xml").write(sitemap.toString());
    });
  })
  .catch((error) => {
    console.error("Failed to fetch posts:", error);
  });
