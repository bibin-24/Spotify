

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import songs from "../data/songs";

const SAMPLE_AUDIO_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
];

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(() => {
    const first = songs[0];
    return {
      id: first.id,
      title: first.title,
      artist: first.artist,
      image: first.image,
      audioUrl: first.audioUrl || SAMPLE_AUDIO_URLS[0],
      duration: 215,
    };
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(215);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [likedTrackIds, setLikedTrackIds] = useState({});

  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);
  const volumeRef = useRef(0.7);
  const durationRef = useRef(215);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  const playTrack = useCallback((track) => {
    const audio = audioRef.current;
    const audioUrl =
      track.audioUrl ||
      SAMPLE_AUDIO_URLS[
        (typeof track.id === "number" ? track.id - 1 : 0) %
          SAMPLE_AUDIO_URLS.length
      ];

    const fullTrack = {
      id: track.id,
      title: track.title,
      artist: track.artist || "Unknown Artist",
      image: track.image || songs[0].image,
      audioUrl,
      duration: track.durationSeconds || 215,
    };

    setCurrentTrack(fullTrack);
    setCurrentTime(0);
    setDuration(fullTrack.duration);
    setIsPlaying(true);

    if (audio) {
      audio.src = audioUrl;
      audio.currentTime = 0;
      audio.volume = isMutedRef.current ? 0 : volumeRef.current;
      audio.play().catch(() => {});
    }
  }, []);

  const nextTrack = useCallback(() => {
    const currentIndex = songs.findIndex((s) => s.id === currentTrack.id);
    let nextIdx;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * songs.length);
    } else {
      nextIdx = (currentIndex + 1) % songs.length;
    }
    playTrack(songs[nextIdx]);
  }, [currentTrack.id, isShuffle, playTrack]);

  const seek = useCallback((time) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const prevTrack = useCallback(() => {
    if (currentTime > 3) {
      seek(0);
      return;
    }
    const currentIndex = songs.findIndex((s) => s.id === currentTrack.id);
    const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
    playTrack(songs[prevIdx]);
  }, [currentTime, currentTrack.id, playTrack, seek]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      setIsPlaying(false);
      if (audio) audio.pause();
    } else {
      setIsPlaying(true);
      if (audio && audio.src) {
        audio.play().catch(() => {});
      } else {
        playTrack(currentTrack);
      }
    }
  }, [currentTrack, isPlaying, playTrack]);

  const changeVolume = useCallback((newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    volumeRef.current = clamped;
    if (audioRef.current) audioRef.current.volume = clamped;
    setIsMuted(clamped === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volumeRef.current;
      }
      isMutedRef.current = next;
      return next;
    });
  }, []);

  const toggleLike = useCallback((trackId) => {
    setLikedTrackIds((prev) => ({ ...prev, [trackId]: !prev[trackId] }));
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volumeRef.current;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        durationRef.current = audio.duration;
      }
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextTrack();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, nextTrack]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        isRepeat,
        likedTrackIds,
        playTrack,
        togglePlay,
        seek,
        changeVolume,
        toggleMute,
        nextTrack,
        prevTrack,
        setIsShuffle,
        setIsRepeat,
        toggleLike,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
