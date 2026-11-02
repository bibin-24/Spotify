import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

function SongCard({ id, title, artist, image }) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  const isCurrentPlaying = currentTrack?.title === title && isPlaying;
  const isThisTrack = currentTrack?.title === title;

  const handleCardClick = () => {
    if (isThisTrack) {
      togglePlay();
    } else {
      playTrack({ id, title, artist, image });
    }
  };

  const handlePlayBtnClick = (e) => {
    e.stopPropagation();
    handleCardClick();
  };

  return (
    <div
      className={`song-card ${isThisTrack ? "active-playing" : ""}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <div className="song-image-wrapper">
        <img src={image} alt={title} className="song-image" loading="lazy" />
        <button
          className={`song-play-btn ${isCurrentPlaying ? "btn-active" : ""}`}
          onClick={handlePlayBtnClick}
          aria-label={isCurrentPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isCurrentPlaying ? (
            <Pause size={20} fill="black" color="black" />
          ) : (
            <Play size={20} fill="black" color="black" style={{ marginLeft: "2px" }} />
          )}
        </button>
      </div>

      <h3 className={`song-title ${isThisTrack ? "title-green" : ""}`} title={title}>
        {title}
      </h3>
      <p className="song-artist" title={artist}>{artist}</p>
    </div>
  );
}

export default SongCard;
