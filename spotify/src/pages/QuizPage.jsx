import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Trophy,
  Flame,
  Zap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Clock,
  Music,
  Gift,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  initialLeaderboard,
  howItWorksSteps,
  featureValues,
  quizQuestions,
} from "../data/quizData";
import {
  playMelody,
  playCorrectSound,
  playWrongSound,
  playStreakSound,
  playVictorySound,
  stopCurrentAudio,
} from "../utils/audioSynth";
import "./QuizPage.css";

const QUESTION_TIME_LIMIT = 20; // seconds per question

function QuizPage() {
  const navigate = useNavigate();

  // Screen state: "lobby" | "playing" | "results"
  const [gameState, setGameState] = useState("lobby");

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [playerName, setPlayerName] = useState("MusicFan_01");

  // Quiz game state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scorePopup, setScorePopup] = useState(null);

  const timerRef = useRef(null);
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Play audio clip for current question
  const playQuestionAudio = useCallback((qIndex) => {
    stopCurrentAudio();
    if (isMuted) return;
    const q = quizQuestions[qIndex];
    if (q && q.melody) {
      setIsPlayingAudio(true);
      playMelody(q.melody, () => {
        setIsPlayingAudio(false);
      });
    }
  }, [isMuted]);

  // Handle timeout (time ran out before user answered)
  const handleTimeOut = useCallback(() => {
    setIsAnswered(true);
    setSelectedOption(-1); // -1 indicates timeout
    setStreak(0);
    if (!isMuted) playWrongSound();
    stopCurrentAudio();
    setIsPlayingAudio(false);
  }, [isMuted]);

  // Start new game
  const startGame = () => {
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    playQuestionAudio(0);
  };

  // Handle countdown timer during game
  useEffect(() => {
    if (gameState !== "playing" || isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState, isAnswered, currentQuestionIndex, handleTimeOut]);

  // Handle option selection
  const handleSelectOption = (index) => {
    if (isAnswered) return;

    clearInterval(timerRef.current);
    setIsAnswered(true);
    setSelectedOption(index);
    stopCurrentAudio();
    setIsPlayingAudio(false);

    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      const basePoints = 1000;
      // Faster answers = bonus points! (⚡ Speed bonus)
      const speedBonus = timeLeft * 40;
      const streakMultiplier = 1 + streak * 0.2;
      const pointsEarned = Math.round((basePoints + speedBonus) * streakMultiplier);

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setScore((prev) => prev + pointsEarned);
      setCorrectCount((prev) => prev + 1);

      setScorePopup(`+${pointsEarned.toLocaleString()} PTS ⚡ (+${speedBonus} Speed Bonus)`);

      if (!isMuted) {
        if (nextStreak >= 3) {
          playStreakSound();
        } else {
          playCorrectSound();
        }
      }
    } else {
      setStreak(0);
      setScorePopup("0 PTS");
      if (!isMuted) playWrongSound();
    }
  };

  // Move to next question or finish
  const handleNextQuestion = () => {
    setScorePopup(null);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
      playQuestionAudio(nextIndex);
    } else {
      finishGame();
    }
  };

  // Complete game and calculate rank
  const finishGame = () => {
    setGameState("results");
    stopCurrentAudio();
    setIsPlayingAudio(false);

    if (!isMuted) playVictorySound();

    // Update leaderboard if user got a score
    setLeaderboard((prev) => {
      const existingUser = prev.find((p) => p.isCurrentUser);
      let updated;
      if (existingUser) {
        updated = prev.map((p) =>
          p.isCurrentUser ? { ...p, score: Math.max(p.score, score) } : p
        );
      } else {
        updated = [
          ...prev,
          {
            rank: 0,
            name: playerName.trim() || "You",
            score: score,
            isCurrentUser: true,
            badge: "⭐",
          },
        ];
      }
      // Re-sort leaderboard descending
      updated.sort((a, b) => b.score - a.score);
      return updated.map((item, idx) => ({
        ...item,
        rank: idx + 1,
        badge:
          idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}`,
      }));
    });
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopCurrentAudio();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="quiz-page">
      <Navbar />

      <div className="quiz-layout">
        <Sidebar />

        <main className="quiz-main-content">
          {/* LOBBY / INTRO VIEW */}
          {gameState === "lobby" && (
            <div className="quiz-lobby">
              {/* Hero Banner */}
              <div className="quiz-hero-banner">
                <div className="quiz-hero-badge">
                  <Sparkles size={16} /> SPOTIFY QUIZ
                </div>
                <h1 className="quiz-hero-title">
                  Guess the song. <br />
                  <span className="accent-text">Beat the leaderboard.</span>
                </h1>
                <p className="quiz-hero-subtitle">
                  A fast music-quiz feature for a Spotify clone
                </p>

                {/* Player Name Input */}
                <div className="player-input-row">
                  <span className="player-input-label">Gamer Tag:</span>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your nickname"
                    maxLength={16}
                    className="player-name-input"
                  />
                </div>

                {/* 30 Sec Challenge Showcase Card */}
                <div className="challenge-card">
                  <div className="challenge-header">
                    <div className="challenge-tag">
                      <Music size={18} /> 30 sec challenge
                    </div>
                    <div className="equalizer-bars">
                      <span className="bar bar1"></span>
                      <span className="bar bar2"></span>
                      <span className="bar bar3"></span>
                      <span className="bar bar4"></span>
                      <span className="bar bar5"></span>
                    </div>
                  </div>

                  <h3 className="challenge-prompt">Who is this artist?</h3>

                  <button className="challenge-play-btn" onClick={startGame}>
                    <span>PLAY</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* Grid: How It Works & Leaderboard */}
              <div className="quiz-lobby-grid">
                {/* How It Works Section */}
                <div className="quiz-section-box how-it-works-box">
                  <h2 className="box-title">HOW IT WORKS</h2>
                  <div className="steps-grid">
                    {howItWorksSteps.map((s) => (
                      <div key={s.step} className="step-card">
                        <span className="step-number">{s.step}</span>
                        <h4 className="step-title">{s.title}</h4>
                        <p className="step-desc">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard & Rewards Section */}
                <div className="quiz-section-box leaderboard-box">
                  <div className="leaderboard-header">
                    <div>
                      <h2 className="box-title">SCORING + LEADERBOARD</h2>
                      <p className="box-subtitle">
                        Reward speed, accuracy & consistency
                      </p>
                    </div>
                    <span className="speed-pill">
                      <Zap size={14} /> Faster answers = bonus points
                    </span>
                  </div>

                  <div className="leaderboard-list">
                    {leaderboard.slice(0, 5).map((player) => (
                      <div
                        key={player.name}
                        className={`leaderboard-item rank-${player.rank} ${
                          player.isCurrentUser ? "current-user-row" : ""
                        }`}
                      >
                        <span className="player-badge">{player.badge}</span>
                        <span className="player-name">
                          {player.name}{" "}
                          {player.isCurrentUser && (
                            <span className="you-tag">YOU</span>
                          )}
                        </span>
                        <span className="player-score">
                          {player.score.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 1st Place Reward Banner */}
                  <div className="reward-banner">
                    <div className="reward-icon-wrap">
                      <Gift size={24} color="#1ed760" />
                    </div>
                    <div className="reward-text">
                      <h4>1st place • 1 MONTH FREE</h4>
                      <p>
                        Top players win a free subscription at the end of the
                        competition period.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Value Section */}
              <div className="feature-value-section">
                <div className="feature-value-header">
                  <h3>FEATURE VALUE</h3>
                  <p>Turn listening into competition.</p>
                </div>

                <div className="feature-cards-row">
                  {featureValues.map((fv) => (
                    <div key={fv.title} className="feature-card">
                      <span className="feature-icon">{fv.icon}</span>
                      <h4>{fv.title}</h4>
                      <p>{fv.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE QUIZ GAME VIEW */}
          {gameState === "playing" && (
            <div className="quiz-game-container">
              {/* Game Nav Header */}
              <div className="game-top-bar">
                <button
                  className="exit-quiz-btn"
                  onClick={() => setGameState("lobby")}
                  title="Quit to lobby"
                >
                  <ArrowLeft size={18} /> Exit
                </button>

                {/* Progress Indicators */}
                <div className="progress-dots">
                  {quizQuestions.map((q, idx) => (
                    <span
                      key={q.id}
                      className={`dot ${
                        idx === currentQuestionIndex
                          ? "active"
                          : idx < currentQuestionIndex
                          ? "completed"
                          : ""
                      }`}
                    ></span>
                  ))}
                </div>

                {/* Audio Mute Toggle */}
                <button
                  className="mute-btn"
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (!isMuted) stopCurrentAudio();
                  }}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* Stats Bar (Score, Streak, Timer) */}
              <div className="game-stats-bar">
                <div className="stat-card">
                  <span className="stat-label">SCORE</span>
                  <span className="stat-value highlight-score">
                    {score.toLocaleString()}
                  </span>
                </div>

                <div className="stat-card streak-card">
                  <span className="stat-label">STREAK</span>
                  <span className="stat-value streak-value">
                    <Flame size={20} className={streak > 0 ? "flame-on" : ""} />
                    {streak}x
                    {streak >= 2 && (
                      <span className="multiplier-pill">
                        {(1 + streak * 0.2).toFixed(1)}x PTS
                      </span>
                    )}
                  </span>
                </div>

                <div className="stat-card timer-card">
                  <span className="stat-label">TIME</span>
                  <span
                    className={`stat-value ${
                      timeLeft <= 5 ? "timer-urgent" : ""
                    }`}
                  >
                    <Clock size={18} /> {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Time Progress Bar */}
              <div className="timer-bar-container">
                <div
                  className={`timer-bar-fill ${
                    timeLeft <= 5 ? "urgent" : timeLeft <= 10 ? "warning" : ""
                  }`}
                  style={{
                    width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Question Audio Box */}
              <div className="question-audio-card">
                <div className="audio-left">
                  <button
                    className="audio-play-toggle"
                    onClick={() => playQuestionAudio(currentQuestionIndex)}
                    title="Play Audio Clip"
                  >
                    {isPlayingAudio ? (
                      <Pause size={28} fill="black" color="black" />
                    ) : (
                      <Play
                        size={28}
                        fill="black"
                        color="black"
                        style={{ marginLeft: "3px" }}
                      />
                    )}
                  </button>

                  <div className="audio-equalizer">
                    <span
                      className={`eq-bar ${isPlayingAudio ? "animating" : ""}`}
                    ></span>
                    <span
                      className={`eq-bar ${isPlayingAudio ? "animating" : ""}`}
                    ></span>
                    <span
                      className={`eq-bar ${isPlayingAudio ? "animating" : ""}`}
                    ></span>
                    <span
                      className={`eq-bar ${isPlayingAudio ? "animating" : ""}`}
                    ></span>
                    <span
                      className={`eq-bar ${isPlayingAudio ? "animating" : ""}`}
                    ></span>
                  </div>
                </div>

                <div className="question-details">
                  <span className="question-counter">
                    QUESTION {currentQuestionIndex + 1} OF{" "}
                    {quizQuestions.length}
                  </span>
                  <h2 className="question-text">
                    {currentQuestion.questionType}
                  </h2>
                  <p className="question-hint">
                    💡 <em>Hint:</em> {currentQuestion.hint}
                  </p>
                </div>

                {currentQuestion.image && (
                  <div className="question-thumb-wrap">
                    <img
                      src={currentQuestion.image}
                      alt="Artist thumbnail"
                      className="question-thumb"
                    />
                  </div>
                )}
              </div>

              {/* Score Popup Notification */}
              {scorePopup && (
                <div
                  className={`score-popup ${
                    scorePopup.includes("0 PTS") ? "popup-zero" : "popup-win"
                  }`}
                >
                  {scorePopup}
                </div>
              )}

              {/* 4 Multiple Choice Options */}
              <div className="options-grid">
                {currentQuestion.options.map((option, idx) => {
                  let btnStateClass = "";
                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      btnStateClass = "correct-choice";
                    } else if (idx === selectedOption) {
                      btnStateClass = "wrong-choice";
                    } else {
                      btnStateClass = "faded-choice";
                    }
                  }

                  return (
                    <button
                      key={option}
                      className={`option-btn ${btnStateClass}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="option-text">{option}</span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <CheckCircle2 size={22} className="option-icon correct" />
                      )}
                      {isAnswered &&
                        idx === selectedOption &&
                        idx !== currentQuestion.correctIndex && (
                          <XCircle size={22} className="option-icon wrong" />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question / Explanation Footer */}
              {isAnswered && (
                <div className="question-footer">
                  <p className="trivia-text">
                    🎧 <strong>Did you know?</strong> {currentQuestion.trivia}
                  </p>
                  <button
                    className="next-question-btn"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex + 1 < quizQuestions.length ? (
                      <>
                        Next Question <ArrowRight size={18} />
                      </>
                    ) : (
                      <>
                        View Results <Trophy size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* RESULTS VIEW */}
          {gameState === "results" && (
            <div className="quiz-results-container">
              <div className="results-card">
                <div className="results-trophy-wrap">
                  <Trophy size={54} color="#1ed760" />
                </div>

                <h1 className="results-title">Challenge Complete!</h1>
                <p className="results-subtitle">
                  {score >= 8000
                    ? "Legendary music knowledge! You're on the podium!"
                    : score >= 4000
                    ? "Great performance! Keep practicing to claim #1 spot!"
                    : "Good effort! Try again to boost your score and win!"}
                </p>

                {/* Score Summary Row */}
                <div className="results-stats-row">
                  <div className="res-stat-box">
                    <span className="res-label">FINAL SCORE</span>
                    <span className="res-val highlight-score">
                      {score.toLocaleString()}
                    </span>
                  </div>

                  <div className="res-stat-box">
                    <span className="res-label">CORRECT</span>
                    <span className="res-val">
                      {correctCount} / {quizQuestions.length}
                    </span>
                  </div>

                  <div className="res-stat-box">
                    <span className="res-label">BEST STREAK</span>
                    <span className="res-val">
                      <Flame size={18} color="#ff7b00" /> {bestStreak}x
                    </span>
                  </div>

                  <div className="res-stat-box">
                    <span className="res-label">ACCURACY</span>
                    <span className="res-val">
                      {Math.round((correctCount / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* 1st Place / Reward Notice */}
                {leaderboard[0]?.isCurrentUser ? (
                  <div className="winner-reward-alert">
                    <Award size={28} color="#1ed760" />
                    <div>
                      <h4>🎉 YOU ARE RANK #1!</h4>
                      <p>
                        You qualify for <strong>1 MONTH FREE SPOTIFY PREMIUM</strong>!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="podium-status-alert">
                    <Zap size={22} color="#1ed760" />
                    <span>
                      You placed <strong>#{leaderboard.findIndex((p) => p.isCurrentUser) + 1}</strong> on the leaderboard!
                    </span>
                  </div>
                )}

                {/* Updated Leaderboard */}
                <div className="results-leaderboard-box">
                  <h3>CURRENT LEADERBOARD</h3>
                  <div className="leaderboard-list">
                    {leaderboard.slice(0, 5).map((player) => (
                      <div
                        key={player.name}
                        className={`leaderboard-item rank-${player.rank} ${
                          player.isCurrentUser ? "current-user-row" : ""
                        }`}
                      >
                        <span className="player-badge">{player.badge}</span>
                        <span className="player-name">
                          {player.name}{" "}
                          {player.isCurrentUser && (
                            <span className="you-tag">YOU</span>
                          )}
                        </span>
                        <span className="player-score">
                          {player.score.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="results-actions">
                  <button className="play-again-btn" onClick={startGame}>
                    <RotateCcw size={18} /> Play Again
                  </button>
                  <button
                    className="back-lobby-btn"
                    onClick={() => setGameState("lobby")}
                  >
                    Back to Lobby
                  </button>
                  <button
                    className="home-return-btn"
                    onClick={() => navigate("/")}
                  >
                    Home Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default QuizPage;
