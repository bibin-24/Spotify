import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
  Volume1,
  ListMusic,
  Mic2,
  Laptop2,
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import "./FooterPlayer.css";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function FooterPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    isRepeat,
    likedTrackIds,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    setIsShuffle,
    setIsRepeat,
    toggleLike,
  } = usePlayer();

  const [isHoveringSeek, setIsHoveringSeek] = useState(false);

  if (!currentTrack) return null;

  const isLiked = likedTrackIds[currentTrack.id];
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e) => {
    const val = parseFloat(e.target.value);
    seek(val);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    changeVolume(val);
  };

  return (
    <footer className="footer-player" aria-label="Now Playing Bar">
      {/* Mobile Top Thin Progress Bar */}
      <div className="mobile-mini-progress">
        <div
          className="mobile-mini-progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* LEFT: Current Track Info */}
      <div className="player-left">
        <img
          src={currentTrack.image}
          alt={currentTrack.title}
          className="player-thumb"
        />
        <div className="player-track-info">
          <span className="player-title" title={currentTrack.title}>
            {currentTrack.title}
          </span>
          <span className="player-artist" title={currentTrack.artist}>
            {currentTrack.artist}
          </span>
        </div>
        <button
          className={`player-heart-btn ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(currentTrack.id)}
          title={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
          aria-label="Save to Liked Songs"
        >
          <Heart
            size={18}
            fill={isLiked ? "#1ed760" : "none"}
            color={isLiked ? "#1ed760" : "#b3b3b3"}
          />
        </button>
      </div>

      {/* CENTER: Player Controls & Timeline */}
      <div className="player-center">
        <div className="player-controls">
          <button
            className={`control-btn ${isShuffle ? "active-green" : ""}`}
            onClick={() => setIsShuffle(!isShuffle)}
            title="Enable shuffle"
            aria-label="Shuffle"
          >
            <Shuffle size={18} />
          </button>

          <button
            className="control-btn"
            onClick={prevTrack}
            title="Previous track"
            aria-label="Previous"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            className="main-play-btn"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} fill="black" color="black" />
            ) : (
              <Play size={20} fill="black" color="black" style={{ marginLeft: "2px" }} />
            )}
          </button>

          <button
            className="control-btn"
            onClick={nextTrack}
            title="Next track"
            aria-label="Next"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            className={`control-btn ${isRepeat ? "active-green" : ""}`}
            onClick={() => setIsRepeat(!isRepeat)}
            title="Enable repeat"
            aria-label="Repeat"
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Playback Timeline */}
        <div className="playback-bar">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div
            className="seek-slider-wrap"
            onMouseEnter={() => setIsHoveringSeek(true)}
            onMouseLeave={() => setIsHoveringSeek(false)}
          >
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              value={currentTime}
              onChange={handleSeekChange}
              className={`seek-slider ${isHoveringSeek ? "hovering" : ""}`}
              style={{
                background: `linear-gradient(to right, ${
                  isHoveringSeek ? "#1ed760" : "#ffffff"
                } 0%, ${
                  isHoveringSeek ? "#1ed760" : "#ffffff"
                } ${progressPercent}%, #4d4d4d ${progressPercent}%, #4d4d4d 100%)`,
              }}
              aria-label="Seek time"
            />
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT: Extra Utilities & Volume */}
      <div className="player-right">
        <button className="extra-btn" title="Lyrics" aria-label="Lyrics">
          <Mic2 size={18} />
        </button>
        <button className="extra-btn" title="Queue" aria-label="Queue">
          <ListMusic size={18} />
        </button>
        <button className="extra-btn" title="Connect to a device" aria-label="Devices">
          <Laptop2 size={18} />
        </button>

        <div className="volume-bar-wrap">
          <button
            className="volume-btn"
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            aria-label="Volume"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : volume < 0.5 ? (
              <Volume1 size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={{
              background: `linear-gradient(to right, #ffffff 0%, #ffffff ${
                isMuted ? 0 : volume * 100
              }%, #4d4d4d ${isMuted ? 0 : volume * 100}%, #4d4d4d 100%)`,
            }}
            aria-label="Volume control"
          />
        </div>
      </div>
    </footer>
  );
}

export default FooterPlayer;

