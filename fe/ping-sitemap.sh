#!/bin/bash

# Script untuk ping search engines setelah deploy
echo "🚀 Pinging search engines..."

# Google
echo "📍 Pinging Google..."
curl -s "https://www.google.com/ping?sitemap=https://marcelinusdino.xyz/sitemap.xml" > /dev/null

# Bing
echo "📍 Pinging Bing..."
curl -s "https://www.bing.com/ping?sitemap=https://marcelinusdino.xyz/sitemap.xml" > /dev/null

echo "✅ Search engines notified!"
echo "🔗 Sitemap: https://marcelinusdino.xyz/sitemap.xml"
