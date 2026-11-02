import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, BadgeCheck, MoreHorizontal, Clock, ArrowLeft, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import artists from "../data/artists";
import { usePlayer } from "../context/PlayerContext";
import "./ArtistPage.css";

function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTrackIds, toggleLike } = usePlayer();

 
  const artist = artists.find((a) => a.id === id) || artists[0];

  const [isFollowing, setIsFollowing] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const isCurrentArtistPlaying =
    isPlaying && artist.popularTracks?.some((t) => t.title === currentTrack?.title);

  const handleMainPlay = () => {
    if (isCurrentArtistPlaying) {
      togglePlay();
    } else if (artist.popularTracks?.length > 0) {
      const first = artist.popularTracks[0];
      playTrack({
        id: first.id,
        title: first.title,
        artist: artist.name,
        image: first.image,
      });
    }
  };

  const handleTrackClick = (track) => {
    if (currentTrack?.title === track.title) {
      togglePlay();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        artist: artist.name,
        image: track.image,
      });
    }
  };

  return (
    <div className="artist-page-container">
      <Navbar />

      <div className="artist-layout">
        <Sidebar />

        <main className="artist-main-content">
         
          <div className="artist-nav-bar">
            <button
              className="back-circle-btn"
              onClick={() => navigate(-1)}
              title="Go back"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

      
          <div
            className="artist-hero-header"
            style={{
              backgroundImage: !bannerError
                ? `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(18,18,18,0.85) 85%, #121212 100%), url(${artist.banner || artist.image})`
                : artist.gradient || "linear-gradient(135deg, #222, #444)",
            }}
          >
            <img
              src={artist.banner || artist.image}
              alt=""
              style={{ display: "none" }}
              onError={() => setBannerError(true)}
            />
            <div className="artist-hero-info">
              {artist.verified && (
                <div className="verified-badge">
                  <BadgeCheck size={24} className="verified-icon" />
                  <span>Verified Artist</span>
                </div>
              )}
              <h1 className="artist-hero-title">{artist.name}</h1>
              <p className="monthly-listeners">{artist.monthlyListeners}</p>
            </div>
          </div>

          
          <div className="artist-action-bar">
            <button
              className="big-play-btn"
              onClick={handleMainPlay}
              aria-label={isCurrentArtistPlaying ? "Pause" : "Play"}
            >
              {isCurrentArtistPlaying ? (
                <Pause size={26} fill="black" color="black" />
              ) : (
                <Play size={26} fill="black" color="black" style={{ marginLeft: "3px" }} />
              )}
            </button>

            <button
              className={`follow-btn ${isFollowing ? "following" : ""}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button className="more-btn" aria-label="More options">
              <MoreHorizontal size={26} />
            </button>
          </div>

         
          <section className="artist-popular-section">
            <h2 className="section-title">Popular</h2>

            <div className="tracks-table">
              <div className="tracks-table-header">
                <span className="col-num">#</span>
                <span className="col-title">Title</span>
                <span className="col-plays">Plays</span>
                <span className="col-duration">
                  <Clock size={16} />
                </span>
              </div>

              <div className="tracks-list">
                {artist.popularTracks &&
                  artist.popularTracks.map((track, index) => {
                    const isTrackActive = currentTrack?.title === track.title;
                    const isTrackPlaying = isTrackActive && isPlaying;
                    const isLiked = likedTrackIds[track.id];

                    return (
                      <div
                        key={track.id}
                        className={`track-row ${isTrackActive ? "active" : ""}`}
                        onClick={() => handleTrackClick(track)}
                      >
                        <div className="col-num">
                          <span className={`track-number ${isTrackActive ? "active-text" : ""}`}>
                            {isTrackPlaying ? (
                              <Pause size={14} fill="#1ed760" color="#1ed760" />
                            ) : (
                              index + 1
                            )}
                          </span>
                          <button className="track-play-icon" aria-label="Play track">
                            {isTrackPlaying ? (
                              <Pause size={16} fill="#1ed760" color="#1ed760" />
                            ) : (
                              <Play size={16} fill="white" color="white" />
                            )}
                          </button>
                        </div>

                        <div className="col-title track-title-wrapper">
                          <img
                            src={track.image}
                            alt={track.title}
                            className="track-img"
                          />
                          <div className="track-names">
                            <span className={`track-name ${isTrackActive ? "active-text" : ""}`}>
                              {track.title}
                            </span>
                            <span className="track-album">{track.album}</span>
                          </div>
                        </div>

                        <div className="col-plays">{track.plays}</div>

                        <div className="col-duration">
                          <button
                            className={`track-heart-btn ${isLiked ? "liked" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(track.id);
                            }}
                            aria-label="Save to your Liked Songs"
                          >
                            <Heart
                              size={16}
                              fill={isLiked ? "#1ed760" : "none"}
                              color={isLiked ? "#1ed760" : "#b3b3b3"}
                            />
                          </button>
                          <span>{track.duration}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>

         
          <section className="artist-about-section">
            <h2 className="section-title">About</h2>
            <div
              className="about-card"
              style={{
                backgroundImage: !bannerError
                  ? `linear-gradient(rgba(0,0,0,0.3) 0%, rgba(18,18,18,0.95) 85%), url(${artist.banner || artist.image})`
                  : artist.gradient,
              }}
            >
              <div className="about-content">
                <span className="about-listeners">{artist.monthlyListeners}</span>
                <p className="about-bio">{artist.bio}</p>
              </div>
            </div>
          </section>

         
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default ArtistPage;
