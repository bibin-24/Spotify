export const initialLeaderboard = [
  { rank: 1, name: "DJ_Rhythm", score: 9840, badge: "🥇" },
  { rank: 2, name: "MelodyMaster", score: 9420, badge: "🥈" },
  { rank: 3, name: "BeatHunter", score: 8970, badge: "🥉" },
  { rank: 4, name: "TuneSeeker", score: 8610, badge: "4" },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Play a short clip",
    description: "A few seconds of a song are played.",
  },
  {
    step: "02",
    title: "Guess",
    description: "Choose the song or artist before time runs out.",
  },
  {
    step: "03",
    title: "Earn points",
    description: "Correct answers build your score and streak.",
  },
  {
    step: "04",
    title: "Climb the board",
    description: "Compete with other players for the top spots.",
  },
];

export const featureValues = [
  {
    icon: "🎧",
    title: "More engagement",
    description: "Gives users a reason to return and play daily.",
  },
  {
    icon: "🏆",
    title: "Healthy competition",
    description: "Leaderboard + streaks create high replay value.",
  },
  {
    icon: "🎁",
    title: "Reward loop",
    description: "Free 1-month subscription makes winning meaningful.",
  },
];

export const quizQuestions = [
  {
    id: 1,
    questionType: "Who is this artist?",
    hint: "Mastermind behind 'Kesariya', 'Tum Se Hi', and 'Channa Mereya'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pritam_Chakraborty_at_the_launch_of_his_music_album_Phantom.jpg/480px-Pritam_Chakraborty_at_the_launch_of_his_music_album_Phantom.jpg",
    options: ["A.R. Rahman", "Pritam", "Vishal-Shekhar", "Sachin-Jigar"],
    correctIndex: 1,
    melody: [261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 523.25],
    trivia: "Pritam has won multiple Filmfare and National Awards for best music direction!",
  },
  {
    id: 2,
    questionType: "Which composer created this track?",
    hint: "Two Academy Awards winner, famous for 'Kun Faya Kun' and 'Jai Ho'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/A._R._Rahman_at_the_50th_International_Film_Festival_of_India.jpg/480px-A._R._Rahman_at_the_50th_International_Film_Festival_of_India.jpg",
    options: ["Arijit Singh", "Sachin-Jigar", "A.R. Rahman", "Anirudh"],
    correctIndex: 2,
    melody: [293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 293.66],
    trivia: "A.R. Rahman is known globally as the 'Mozart of Madras'.",
  },
  {
    id: 3,
    questionType: "Who is the playback singer for this hit?",
    hint: "Over 42 million monthly listeners on Spotify with hits like 'Tum Hi Ho' and 'Chaleya'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Arijit_Singh_at_Filmfare_Awards.jpg/480px-Arijit_Singh_at_Filmfare_Awards.jpg",
    options: ["Arijit Singh", "Atif Aslam", "Armaan Malik", "Jubin Nautiyal"],
    correctIndex: 0,
    melody: [329.63, 392.00, 493.88, 659.25, 493.88, 392.00, 329.63],
    trivia: "Arijit Singh is one of the most followed artists on Spotify worldwide!",
  },
  {
    id: 4,
    questionType: "Which musical duo composed 'Phir Aur Kya Chahiye' and 'Saibo'?",
    hint: "Hit duo behind 'Stree', 'Zara Hatke Zara Bachke', and 'Badlapur'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sachin-Jigar.jpg/480px-Sachin-Jigar.jpg",
    options: ["Vishal-Shekhar", "Sachin-Jigar", "Meet Bros", "Salim-Sulaiman"],
    correctIndex: 1,
    melody: [349.23, 440.00, 523.25, 698.46, 523.25, 440.00, 349.23],
    trivia: "Sachin & Jigar began their journey composing for theater and Gujarati cinema.",
  },
  {
    id: 5,
    questionType: "Which blockbuster soundtrack duo composed 'Besharam Rang' and 'Ghungroo'?",
    hint: "Celebrated duo known for high-octane Bollywood hits and rock anthems.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Vishal_Dadlani_and_Shekhar_Ravjiani.jpg/480px-Vishal_Dadlani_and_Shekhar_Ravjiani.jpg",
    options: ["Shankar-Ehsaan-Loy", "Sachin-Jigar", "Ajay-Atul", "Vishal-Shekhar"],
    correctIndex: 3,
    melody: [392.00, 493.88, 587.33, 783.99, 587.33, 493.88, 392.00],
    trivia: "Vishal-Shekhar have delivered some of the highest grossing Bollywood dance anthems of all time!",
  },
];
