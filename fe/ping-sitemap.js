// ping-sitemap.js - Script untuk notify search engines
import https from "https";

const pingSearchEngines = async () => {
  console.log("🚀 Pinging search engines...");

  const urls = [
    "https://www.google.com/ping?sitemap=https://marcelinusdino.vercel.app/sitemap.xml",
    "https://www.bing.com/ping?sitemap=https://marcelinusdino.vercel.app/sitemap.xml",
  ];

  const pingUrl = (url, engine) => {
    return new Promise((resolve) => {
      https
        .get(url, (res) => {
          console.log(`📍 ${engine} pinged - Status: ${res.statusCode}`);
          resolve();
        })
        .on("error", (err) => {
          console.log(`❌ Error pinging ${engine}:`, err.message);
          resolve();
        });
    });
  };

  await Promise.all([pingUrl(urls[0], "Google"), pingUrl(urls[1], "Bing")]);

  console.log("✅ Search engines notified!");
  console.log("🔗 Sitemap: https://marcelinusdino.vercel.app/sitemap.xml");
};

pingSearchEngines();
