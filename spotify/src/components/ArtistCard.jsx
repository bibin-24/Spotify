import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import "./ArtistCard.css";

function ArtistCard({ artist }) {
  const navigate = useNavigate();
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const [imageError, setImageError] = useState(false);

  const isThisArtistPlaying =
    isPlaying && artist.popularTracks?.some((t) => t.title === currentTrack?.title);

  const handleClick = () => {
    navigate(`/artist/${artist.id}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isThisArtistPlaying) {
      togglePlay();
    } else if (artist.popularTracks?.length > 0) {
      const topSong = artist.popularTracks[0];
      playTrack({
        id: topSong.id,
        title: topSong.title,
        artist: artist.name,
        image: topSong.image,
      });
    } else {
      navigate(`/artist/${artist.id}`);
    }
  };

  return (
    <div className="artist-card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="artist-image-wrapper">
        {!imageError ? (
          <img
            src={artist.image}
            alt={artist.name}
            className="artist-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="artist-fallback-avatar"
            style={{ background: artist.gradient || "linear-gradient(135deg, #333, #555)" }}
          >
            <span>{artist.name ? artist.name.charAt(0) : "A"}</span>
          </div>
        )}

        <button
          className={`artist-play-btn ${isThisArtistPlaying ? "btn-active" : ""}`}
          onClick={handlePlayClick}
          aria-label={isThisArtistPlaying ? `Pause ${artist.name}` : `Play ${artist.name}`}
        >
          {isThisArtistPlaying ? (
            <Pause size={22} fill="black" color="black" />
          ) : (
            <Play size={22} fill="black" color="black" style={{ marginLeft: "2px" }} />
          )}
        </button>
      </div>

      <h3 className="artist-name" title={artist.name}>
        {artist.name}
      </h3>
      <p className="artist-type">{artist.type || "Artist"}</p>
    </div>
  );
}

export default ArtistCard;
