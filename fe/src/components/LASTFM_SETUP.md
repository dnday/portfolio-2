# 🎵 Last.fm Now Playing - Setup Guide (100% FREE!)

## Why Last.fm Instead of Spotify?

### The Problem with Spotify API:

❌ **Requires Spotify Premium subscription**  
❌ Only works with Spotify  
❌ Complex OAuth flow  
❌ Limited to your own account only

### Last.fm Advantages:

✅ **100% FREE** - No premium needed!  
✅ **Universal** - Works with Spotify, Apple Music, YouTube Music, etc.  
✅ **Simple API** - Just API key, no OAuth  
✅ **Public profiles** - Anyone can see your music taste  
✅ **Rich data** - Scrobbles history, stats, recommendations

---

## 🚀 Quick Setup (3 Minutes!)

### Step 1: Create Last.fm Account

1. Go to [Last.fm](https://www.last.fm)
2. Sign up (completely free!)
3. Choose a username (this will be public)

### Step 2: Get API Key

1. Go to [API Account Page](https://www.last.fm/api/account/create)
2. Fill in the form:
   - **Application name**: `Portfolio Website` (or any name)
   - **Application description**: `Show my music taste on portfolio`
   - **Callback URL**: Leave empty or use `http://localhost`
   - **Application homepage**: Your website URL (or `http://localhost`)
3. Click **Submit**
4. You'll get:
   - **API Key** - Keep this!
   - API Secret - Not needed for our use case

### Step 3: Connect Your Music Apps

#### For Spotify Users:

1. Go to Spotify Settings
2. Scroll down to "Social"
3. Connect to Last.fm
4. Enter your Last.fm credentials
5. Done! Spotify will now automatically scrobble to Last.fm

#### For Apple Music Users:

1. Download [Last.fm Scrobbler app](https://apps.apple.com/app/lastfm/id1188681944)
2. Login with Last.fm account
3. Grant Apple Music access
4. Auto-scrobbles your Apple Music!

#### For YouTube Music Users:

1. Install [Web Scrobbler browser extension](https://web-scrobbler.github.io/)
2. Configure Last.fm in extension settings
3. Play music on YouTube Music
4. Auto-scrobbles!

#### For Other Platforms:

Last.fm has scrobblers for almost everything:

- Tidal, Deezer, SoundCloud
- Local music players (iTunes, VLC, foobar2000, etc.)
- Android/iOS apps
- [See all supported scrobblers](https://www.last.fm/about/trackmymusic)

### Step 4: Configure Environment Variables

Create `.env` file in `fe/` folder (already created for you!):

```env
VITE_LASTFM_API_KEY=abc123def456...  # ⬅️ Paste your API Key here
VITE_LASTFM_USERNAME=your_username   # ⬅️ Your Last.fm username
```

**Note**:

- `.env` file is already in `.gitignore` - your API key won't be committed! 🔒
- See `.env.example` for reference
- Vite requires `VITE_` prefix for env variables

### Step 5: Test!

1. Save the file
2. Play some music on Spotify/Apple Music/etc.
3. Wait 1-2 minutes for scrobble to register
4. Click **"Music"** button in navbar
5. See your currently playing track! 🎉

---

## 🎯 How It Works

```
┌─────────────┐
│  You play   │
│   music on  │
│ Spotify/etc │
└──────┬──────┘
       │ Scrobbles
       ▼
┌─────────────┐
│  Last.fm    │
│   Servers   │
└──────┬──────┘
       │ API Request
       ▼
┌─────────────┐
│   Your      │
│  Portfolio  │
│   Website   │
└─────────────┘
```

1. You play music on ANY platform (Spotify, Apple Music, YouTube, etc.)
2. Scrobbler sends data to Last.fm
3. Website fetches from Last.fm API every 10 seconds
4. Shows currently playing + recent tracks!

---

## 🎨 Features

### Current Track Display

✅ Album artwork (high quality)  
✅ Track name  
✅ Artist name  
✅ Album name  
✅ Playing status indicator  
✅ Direct link to Last.fm track page

### Recently Played

✅ Last 5 played tracks  
✅ Time ago for each track  
✅ Scrollable list  
✅ Click to see on Last.fm

### User Stats

✅ Total scrobbles count  
✅ Link to Last.fm profile  
✅ Account info

### UI Features

✅ Minimize to floating button  
✅ Live playing indicator  
✅ Smooth animations  
✅ Glass morphism design  
✅ Auto-refresh every 10 seconds

---

## 🔧 Configuration

### Polling Interval

Default: 10 seconds. To change:

File: `lastFmNowPlaying.jsx` (line ~97)

```jsx
// Poll every 10 seconds
const interval = setInterval(() => {
  fetchRecentTracks();
}, 10000); // ⬅️ Change to 5000 (5s), 15000 (15s), etc.
```

**Note**: Last.fm updates scrobbles with ~1-2 minute delay, so polling too fast won't help.

### Number of Recent Tracks

Default: Shows 5 recent tracks. To change:

File: `lastFmNowPlaying.jsx` (line ~394)

```jsx
{recentTracks.slice(isPlaying ? 1 : 1, 6).map((track, index) => (
//                                          ^ Change 6 to show more/less
```

### Theme Colors

Default: Red theme (Last.fm brand color). To change:

Search and replace in `lastFmNowPlaying.jsx`:

- `from-red-500` → `from-purple-500` (or any color)
- `to-red-600` → `to-purple-600`
- `text-red-400` → `text-purple-400`
- `bg-red-500` → `bg-purple-500`

---

## 🐛 Troubleshooting

### 1. "Please configure Last.fm API key!"

**Problem**: API key not set or still shows default value  
**Fix**:

- Check `lastFmNowPlaying.jsx` line 7
- Make sure you pasted your actual API key
- Remove quotes around the key
- No spaces before/after key

### 2. "No tracks found"

**Possible causes**:
a) **Username wrong**: Check spelling of your Last.fm username  
b) **No scrobbles yet**: Play music and wait 1-2 minutes  
c) **Scrobbling not enabled**: Check if your music app is connected to Last.fm  
d) **Private profile**: Make sure Last.fm profile is public

**Fix**:

- Go to [Last.fm](https://www.last.fm/user/YOUR_USERNAME) to verify profile
- Check Recent Tracks section manually
- Verify music app is scrobbling (check Last.fm settings)

### 3. "Failed to fetch tracks"

**Problem**: API request failed  
**Fix**:

- Check internet connection
- Verify API key is correct
- Check browser console for error details
- Make sure Last.fm servers are up (check [status.last.fm](https://status.last.fm))

### 4. Tracks Not Updating

**Problem**: Old track showing even after playing new music  
**Causes**:

- Last.fm scrobble delay (normal, 1-2 minutes)
- Polling interval too long
- Music app not scrobbling

**Fix**:

- Wait 1-2 minutes after starting a new track
- Check music app scrobbler is active
- Verify on Last.fm website that scrobbles are coming through

### 5. No Album Art Showing

**Problem**: Track shows but no image  
**Cause**: Some tracks don't have artwork in Last.fm database  
**Fix**: This is normal, component shows music icon as fallback

---

## 🔒 Security & Privacy

### Safe to Share

✅ **API Key** - Safe to commit to public repo (it's a public read-only key)  
✅ **Username** - Already public on Last.fm

### What's Tracked

Your Last.fm profile shows:

- What you're currently listening to
- Your recent listening history
- Your music statistics

**Privacy Option**: You can set Last.fm profile to private in settings if needed.

### API Limits

- **Free Tier**: Unlimited requests! 🎉
- **Rate Limit**: No strict limits for reasonable use
- Component polls every 10 seconds = well within limits

---

## 🚀 Production Deployment

### Environment Variables Setup

Your credentials are now stored in `.env` file (recommended!). For production:

**For Vercel:**

1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_LASTFM_API_KEY` = your_api_key
   - `VITE_LASTFM_USERNAME` = your_username
3. Redeploy

**For Netlify:**

1. Site Settings → Environment Variables
2. Add same variables as above
3. Redeploy

**For other platforms:**
Set environment variables in your hosting dashboard.

**Note**: Component code already uses `import.meta.env` - no code changes needed! ✅

### Deploy Checklist

- [ ] Environment variables set in hosting platform
- [ ] API key correct (test locally first)
- [ ] Username correct
- [ ] Music scrobbling working (test at last.fm)
- [ ] Test on production URL after deploy
- [ ] Verify CORS (Last.fm API is CORS-friendly!)

---

## 🎨 Customization Ideas

### 1. Show Top Artists

Use Last.fm endpoint: `user.gettopartists`

```jsx
const response = await fetch(
  `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USERNAME}&api_key=${API_KEY}&format=json&period=7day`,
);
```

### 2. Show Top Tracks

Endpoint: `user.gettoptracks`
Shows your most played songs!

### 3. Music Taste Compatibility

Use `tasteometer.compare` to show compatibility with visitors

### 4. Listening Stats

Use `user.getweeklycharttimestamps` for listening analytics

### 5. Friend Activity

If visitors connect Last.fm, show friend activity feed

### 6. Recommendations

Based on your listening, show similar artists/tracks

---

## 📊 Data Available

Last.fm API provides rich data:

- Currently playing (real-time!)
- Recent tracks (with timestamps)
- Top artists (week/month/year/all time)
- Top tracks
- Top albums
- Total scrobbles
- Listening patterns
- Friend activity
- Similar artists
- Track info & tags
- Artist bio
- And much more!

[Full API Reference](https://www.last.fm/api/intro)

---

## 💡 Pro Tips

### 1. Scrobble Everything

Connect ALL your music services to Last.fm:

- Spotify on desktop → Native scrobbling
- Spotify on mobile → Enable in Spotify settings
- YouTube Music → Web Scrobbler extension
- Apple Music → Last.fm iOS app
- Local files → Local scrobbler app

Result: Complete picture of your music taste! 🎵

### 2. Private Listening

Last.fm has "Hide recent listening" option if you want privacy sometimes.

### 3. Custom Playlists

Last.fm can auto-generate playlists based on your taste!

### 4. Music Discovery

Last.fm recommendations are REALLY good, based on actual listening.

### 5. Stats Tracking

Last.fm keeps detailed stats forever - great for year-end reviews!

---

## 🎉 Comparison: Spotify API vs Last.fm

| Feature              | Spotify API        | Last.fm API        |
| -------------------- | ------------------ | ------------------ |
| **Cost**             | FREE               | FREE ✅            |
| **Requires Premium** | YES ❌             | NO ✅              |
| **Works with**       | Spotify only       | ALL platforms ✅   |
| **Setup Complexity** | Complex OAuth      | Simple API key ✅  |
| **Data Richness**    | Limited to Spotify | Cross-platform ✅  |
| **Historical Data**  | Limited            | Forever ✅         |
| **Public Access**    | Own account only   | Public profiles ✅ |
| **Scrobble Delay**   | Real-time          | 1-2 minutes        |
| **Rate Limits**      | Strict             | Generous ✅        |

**Winner**: Last.fm for public portfolios! 🏆

---

## 📚 Resources

- [Last.fm Homepage](https://www.last.fm)
- [API Documentation](https://www.last.fm/api/intro)
- [Get API Key](https://www.last.fm/api/account/create)
- [Scrobbling Guide](https://www.last.fm/about/trackmymusic)
- [Web Scrobbler Extension](https://web-scrobbler.github.io/)
- [Last.fm Mobile App](https://www.last.fm/about/apps)

---

## ✨ You're All Set!

Your website now shows:

- 🎵 What you're currently listening to (real-time!)
- 📜 Your recent listening history
- 📊 Your total scrobbles
- 🔗 Link to your Last.fm profile

**Perfect for**:

- Portfolio personal touch
- Music taste showcase
- Artist/musician websites
- Music blog/review sites
- Personal branding

**No Premium. No Limits. Just Music!** 🎧

---

## ❓ Still Need Help?

1. Check browser console for errors
2. Verify API key on Last.fm dashboard
3. Test API manually: `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=YOUR_USERNAME&api_key=YOUR_API_KEY&format=json`
4. Make sure scrobbling is working at [Last.fm](https://www.last.fm)

Happy scrobbling! 🎶
