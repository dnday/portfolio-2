import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiClock, FiExternalLink, FiMusic, FiX } from "react-icons/fi";

// Last.fm API Configuration - Using Environment Variables
const LASTFM_CONFIG = {
  API_KEY: import.meta.env.VITE_LASTFM_API_KEY || "",
  USERNAME: import.meta.env.VITE_LASTFM_USERNAME || "",
};

// Spotify API Configuration
const SPOTIFY_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID || "",
  CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || "",
};

const FloatingMusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [spotifyUrl, setSpotifyUrl] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);

  // Fetch currently playing + recent tracks
  const fetchRecentTracks = async () => {
    if (!LASTFM_CONFIG.API_KEY || !LASTFM_CONFIG.USERNAME) {
      return;
    }

    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_CONFIG.USERNAME}&api_key=${LASTFM_CONFIG.API_KEY}&format=json&limit=6`,
      );

      if (!response.ok) return;

      const data = await response.json();
      if (data.error || !data.recenttracks?.track) return;

      const tracks = Array.isArray(data.recenttracks.track)
        ? data.recenttracks.track
        : [data.recenttracks.track];

      setRecentTracks(tracks);

      const nowPlaying = tracks.find(
        (track) => track["@attr"]?.nowplaying === "true",
      );

      if (nowPlaying) {
        setCurrentTrack(nowPlaying);
        setIsPlaying(true);
        setError(null);
      } else if (tracks.length > 0) {
        setCurrentTrack(tracks[0]);
        setIsPlaying(false);
        setError(null);
      }
    } catch (err) {
      setError("Failed to load");
      console.error("Error:", err);
    }
  };

  // Get Spotify Access Token
  const getSpotifyToken = async () => {
    if (!SPOTIFY_CONFIG.CLIENT_ID || !SPOTIFY_CONFIG.CLIENT_SECRET) return null;

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(SPOTIFY_CONFIG.CLIENT_ID + ":" + SPOTIFY_CONFIG.CLIENT_SECRET),
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();
      return data.access_token;
    } catch (err) {
      console.error("Spotify token error:", err);
      return null;
    }
  };

  // Search Spotify for track and get direct URL
  const getSpotifyTrackUrl = async (trackName, artistName) => {
    if (!trackName || !artistName) return null;

    try {
      let token = spotifyToken;
      if (!token) {
        token = await getSpotifyToken();
        if (!token) return null;
        setSpotifyToken(token);
      }

      const query = encodeURIComponent(
        `track:${trackName} artist:${artistName}`,
      );
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        // Token might be expired, try getting new one
        if (response.status === 401) {
          const newToken = await getSpotifyToken();
          if (newToken) {
            setSpotifyToken(newToken);
            return getSpotifyTrackUrl(trackName, artistName);
          }
        }
        return null;
      }

      const data = await response.json();
      if (data.tracks?.items?.length > 0) {
        return data.tracks.items[0].external_urls.spotify;
      }
      return null;
    } catch (err) {
      console.error("Spotify search error:", err);
      return null;
    }
  };

  useEffect(() => {
    fetchRecentTracks();
    const interval = setInterval(fetchRecentTracks, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Spotify URL when track changes
  useEffect(() => {
    if (
      currentTrack &&
      SPOTIFY_CONFIG.CLIENT_ID &&
      SPOTIFY_CONFIG.CLIENT_SECRET
    ) {
      const trackName = currentTrack.name;
      const artistName = currentTrack.artist?.["#text"] || currentTrack.artist;

      getSpotifyTrackUrl(trackName, artistName).then((url) => {
        setSpotifyUrl(url);
      });
    } else {
      setSpotifyUrl(null);
    }
  }, [currentTrack]);

  // Get track image - High quality
  const getTrackImage = (track) => {
    if (!track?.image) return null;
    const images = Array.isArray(track.image) ? track.image : [];

    // Priority: extralarge > large > medium (highest quality)
    const extraLarge = images.find((img) => img.size === "extralarge");
    if (extraLarge?.["#text"]) return extraLarge["#text"];

    const large = images.find((img) => img.size === "large");
    if (large?.["#text"]) return large["#text"];

    const medium = images.find((img) => img.size === "medium");
    if (medium?.["#text"]) return medium["#text"];

    // Fallback to last available
    return images[images.length - 1]?.["#text"] || null;
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "";
    const seconds = Math.floor(Date.now() / 1000 - parseInt(timestamp));
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // Don't render if no config
  if (!LASTFM_CONFIG.API_KEY || !LASTFM_CONFIG.USERNAME) {
    return null;
  }

  return (
    <>
      {/* Floating Button - Always Visible */}
      {!isOpen && currentTrack && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
        >
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            {/* Album Art Background */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-2xl border-2 border-red-400/30 relative">
              {getTrackImage(currentTrack) ? (
                <img
                  src={getTrackImage(currentTrack)}
                  alt="Now Playing"
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ imageRendering: "crisp-edges" }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <FiMusic className="w-8 h-8 text-white" />
                </div>
              )}

              {/* Playing indicator */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["4px", "12px", "4px"] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-0.5 bg-white rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live indicator dot */}
            {isPlaying && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}

            {/* Hover tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                {isPlaying ? "Now Playing" : "Recently Played"}
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Floating Card - Slides from bottom */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - prevents sidebar interaction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Music Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 md:right-8 z-[1000] w-72 sm:w-80 md:w-96 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/[0.1] rounded-2xl shadow-2xl scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 p-2 sm:p-2.5 bg-black/40 hover:bg-black/60 rounded-full transition-all backdrop-blur-sm border border-white/10"
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                {currentTrack ? (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Album Art */}
                    <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
                      {getTrackImage(currentTrack) ? (
                        <img
                          src={getTrackImage(currentTrack)}
                          alt={currentTrack.name}
                          className="w-full aspect-square object-cover"
                          loading="eager"
                          style={{ imageRendering: "auto" }}
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                          <FiMusic className="w-16 h-16 text-red-400/40" />
                        </div>
                      )}
                    </div>

                    {/* Track Info */}
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-base sm:text-lg font-bold text-white line-clamp-2">
                        {currentTrack.name}
                      </h4>
                      <p className="text-sm sm:text-base text-white/60 line-clamp-1">
                        {currentTrack.artist?.["#text"] || currentTrack.artist}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white/[0.05] rounded-lg">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${isPlaying ? "bg-red-400" : "bg-white/40"}`}
                        />
                        <span className="text-sm text-white/60">
                          {isPlaying
                            ? "Playing now"
                            : formatTimeAgo(currentTrack.date?.uts)}
                        </span>
                      </div>
                      <a
                        href={
                          spotifyUrl ||
                          `https://open.spotify.com/search/${encodeURIComponent(
                            currentTrack.name +
                              " " +
                              (currentTrack.artist?.["#text"] ||
                                currentTrack.artist),
                          )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 flex items-center gap-1"
                        title={
                          spotifyUrl ? "Open in Spotify" : "Search in Spotify"
                        }
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Recent Tracks */}
                    {recentTracks.length > 1 && (
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-white/40">
                          <FiClock className="w-3 h-3" />
                          <span>Recent</span>
                        </div>
                        {recentTracks.slice(1, 5).map((track, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-white/[0.03] hover:bg-white/[0.05] rounded-lg transition-all"
                          >
                            {getTrackImage(track) ? (
                              <img
                                src={getTrackImage(track)}
                                alt={track.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-white/[0.05] flex items-center justify-center">
                                <FiMusic className="w-3 h-3 sm:w-4 sm:h-4 text-white/20" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-white/80 truncate">
                                {track.name}
                              </p>
                              <p className="text-[10px] sm:text-xs text-white/40 truncate">
                                {track.artist?.["#text"] || track.artist}
                              </p>
                            </div>
                            <span className="text-[10px] sm:text-xs text-white/30 hidden sm:inline">
                              {formatTimeAgo(track.date?.uts)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiMusic className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">No music playing</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMusicPlayer;
