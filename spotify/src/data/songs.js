import alfaaz from '../assets/images/Alfaaz.jpg'
import bari from '../assets/images/Baari.jpg'
import sammi from '../assets/images/Sammi.jpg'
import rathinam from '../assets/images/Spider.jpg'
import casa from '../assets/images/David.jpg'

export const trendingSongs = [
  {
    id: 1,
    title: "Alfaaz",
    artist: "Hamza Malik, Zain Zohaib",
    image: alfaaz,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Veezha Veera (From \"OM Chapter 1:...\")",
    artist: "Sai Abhyankkar, Tippu, Arun Srinivasan",
    image: rathinam,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Dilruba Dilnasheen",
    artist: "Rito Riba, Siddhant Kaushal",
    image: bari,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Chann (From \"Udta Teer\")",
    artist: "Sachin-Jigar, Arijit Singh, Amitabh...",
    image: sammi,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Roddy (From \"Jailer 2\")",
    artist: "Anirudh Ravichander",
    image: casa,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

export const popularAlbums = [
  {
    id: "aashiqui-2",
    title: "Aashiqui 2",
    artist: "Mithoon, Ankit Tiwari, Jeet Gannguli",
    image: alfaaz,
  },
  {
    id: "yjhd",
    title: "Yeh Jawaani Hai Deewani",
    artist: "Pritam",
    image: bari,
  },
  {
    id: "sanam-teri-kasam",
    title: "Sanam Teri Kasam",
    artist: "Himesh Reshammiya",
    image: sammi,
  },
  {
    id: "finding-her",
    title: "Finding Her",
    artist: "Karan Aujla",
    image: rathinam,
  },
  {
    id: "glory",
    title: "Glory",
    artist: "Yo Yo Honey Singh",
    image: casa,
  },
];

export const popularRadio = [
  {
    id: "radio-arijit",
    title: "Arijit Singh",
    desc: "With Pritam, Vishal-Shekhar, Shaarib Tos...",
    bg: "#f3cc77",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Arijit_Singh_at_Filmfare_Awards.jpg/480px-Arijit_Singh_at_Filmfare_Awards.jpg",
  },
  {
    id: "radio-kk",
    title: "KK",
    desc: "With Pritam, Roop Kumar Rathod,...",
    bg: "#80e1d1",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "radio-shreya",
    title: "Shreya Ghoshal",
    desc: "With Sachin-Jigar, A.R. Rahman, Vishal-...",
    bg: "#f89e7e",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "radio-alka",
    title: "Alka Yagnik",
    desc: "With Vinod Rathod, Kumar Sanu, Udit...",
    bg: "#f19aa5",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "radio-diljit",
    title: "Diljit Dosanjh",
    desc: "With Shubh, AP Dhillon, Karan Aujla...",
    bg: "#7bb9aa",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=300&auto=format&fit=crop&q=80",
  },
];

export const featuredCharts = [
  {
    id: "chart-top-songs-global",
    title: "Top Songs Global",
    subtitle: "Weekly Music Charts",
    bg: "#6a3b82",
  },
  {
    id: "chart-top-songs-india",
    title: "Top Songs India",
    subtitle: "Weekly Music Charts",
    bg: "#bf2b22",
  },
  {
    id: "chart-top-50-global",
    title: "Top 50",
    subtitle: "GLOBAL",
    bg: "#1e5b66",
  },
  {
    id: "chart-top-50-india",
    title: "Top 50",
    subtitle: "INDIA",
    bg: "#808a3f",
  },
];

export default trendingSongs;
